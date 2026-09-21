import React, { useState } from "react";
import { GameState, CardDef, EnemyInstance } from "../../types";
import { HEROES, CARD_DB, ENEMY_ACTIONS, TRAITS, LOCATIONS } from "../../data/gameData";
import { cardDamageCalc } from "../../utils/gameEngine";
import { HunterSprite } from "../sprites/HunterSprite";
import { EnemySprite } from "../sprites/EnemySprite";
import { CombatLandscapeArena } from "../sprites/CombatLandscapeArena";
import { CardView } from "../CardView";

interface CombatScreenProps {
  state: GameState;
  onPlayCard: (handIdx: number) => void;
  onBlink: () => void;
  onBreath: () => void;
  onSleep: () => void;
  onIdea: () => void;
  onScenery: () => void;
  onSpecial: () => void;
  onSetFocus: (uid: string) => void;
  onOpenEnemyDetail: (uid: string) => void;
  onOpenHeroDetail?: () => void;
  onOpenPiles: (which: "deck" | "discard" | "all") => void;
  onOpenLog: () => void;
  onBackToMenu?: () => void;
  onOpenBestiary?: () => void;
}

export const CombatScreen: React.FC<CombatScreenProps> = ({
  state,
  onPlayCard,
  onBlink,
  onBreath,
  onSleep,
  onIdea,
  onScenery,
  onSpecial,
  onSetFocus,
  onOpenEnemyDetail,
  onOpenHeroDetail,
  onOpenPiles,
  onOpenLog,
  onBackToMenu,
  onOpenBestiary,
}) => {
  const [hoveredCardDef, setHoveredCardDef] = useState<CardDef | null>(null);
  const [selectedHandIdx, setSelectedHandIdx] = useState<number | null>(null);
  const [handFullText, setHandFullText] = useState(false);
  const [handHidden, setHandHidden] = useState(false);

  const combat = state.combat;
  if (!combat) return null;

  const hero = HEROES[state.hero] || HEROES.pobuda;
  const curLoc =
    LOCATIONS.find((l) => l.id === combat.locId) || LOCATIONS[state.locIndex] || LOCATIONS[0];
  const livingEnemies = combat.enemies.filter((e) => e.alive && e.hp > 0);
  const focusEnemy =
    livingEnemies.find((e) => e.uid === combat.focus) || livingEnemies[0] || combat.enemies[0];

  // Breath gain calculation
  const baseBreath = hero.breath || 6;
  const breathGain = Math.max(
    1,
    Math.round(baseBreath * (1 - 0.05 * combat.fatigue)) - combat.breathPen,
  );

  // Sleep reduction calculation
  const sleepDrop = hero.sleepFat || 7;

  // Can player spend time / take actions?
  const isPlayerTurn =
    combat.playerTimer <= 0 && !combat.pendingCard && !combat.pauseTime && state.hp > 0;

  // Incoming strike damage on player preview
  let incomingDamage = 0;
  if (focusEnemy && focusEnemy.nextAction === "uder" && focusEnemy.alive) {
    incomingDamage = focusEnemy.dmg + (focusEnemy.omen || 0);
  }
  const incomingThroughBlock = combat.dodge > 0 ? 0 : Math.max(0, incomingDamage - combat.block);

  // Active previewed card: either hovered in hand or selected
  const activePreviewCardDef =
    hoveredCardDef ||
    (selectedHandIdx !== null && combat.hand[selectedHandIdx]
      ? CARD_DB[combat.hand[selectedHandIdx].id]
      : null);

  // First playable attack card index in hand (for quick attack action directly on enemy)
  const firstPlayableAttackIdx = combat.hand.findIndex((c) => {
    const def = CARD_DB[c.id];
    return def && (def.dmg || 0) > 0 && combat.actions >= def.cost;
  });

  // Handle clicking directly on an enemy character
  const handleEnemyCharacterClick = (enemy: EnemyInstance) => {
    if (!enemy.alive) return;

    // If this enemy is not focused, focus them immediately
    if (combat.focus !== enemy.uid) {
      onSetFocus(enemy.uid);
    }

    // If a card is primed / selected in hand, play it now against this enemy
    if (selectedHandIdx !== null && isPlayerTurn) {
      const cardToPlay = combat.hand[selectedHandIdx];
      if (cardToPlay) {
        const def = CARD_DB[cardToPlay.id];
        if (def && combat.actions >= def.cost) {
          onPlayCard(selectedHandIdx);
          setSelectedHandIdx(null);
          return;
        }
      }
    }
  };

  // Quick attack directly on the focused enemy from the character sprite
  const handleQuickAttackOnEnemy = (e: React.MouseEvent, enemyUid: string) => {
    e.stopPropagation();
    if (!isPlayerTurn) return;

    if (combat.focus !== enemyUid) {
      onSetFocus(enemyUid);
    }

    if (selectedHandIdx !== null) {
      onPlayCard(selectedHandIdx);
      setSelectedHandIdx(null);
    } else if (firstPlayableAttackIdx !== -1) {
      onPlayCard(firstPlayableAttackIdx);
    }
  };

  // Helper to calculate damage on a specific enemy for card preview
  const getPreviewDamageForEnemy = (enemy: EnemyInstance) => {
    if (!activePreviewCardDef || !activePreviewCardDef.dmg || !enemy.alive) return 0;

    const isMainTarget = enemy.uid === focusEnemy?.uid;
    if (activePreviewCardDef.intent === "row") {
      const targetRow =
        focusEnemy?.row || (combat.enemies.indexOf(focusEnemy!) < 4 ? "front" : "back");
      const enemyRow = enemy.row || (combat.enemies.indexOf(enemy) < 4 ? "front" : "back");
      const hasBackRow = combat.enemies.some(
        (e) => (e.row === "back" || (!e.row && combat.enemies.indexOf(e) >= 4)) && e.alive,
      );
      if (hasBackRow) {
        return enemyRow === targetRow ? cardDamageCalc(activePreviewCardDef, enemy) : 0;
      }
      return cardDamageCalc(activePreviewCardDef, enemy);
    }
    if (activePreviewCardDef.intent === "splash") {
      return isMainTarget
        ? cardDamageCalc(activePreviewCardDef, enemy)
        : Math.round(cardDamageCalc(activePreviewCardDef, enemy) * 0.4);
    }
    if (isMainTarget) {
      return cardDamageCalc(activePreviewCardDef, enemy);
    }
    return 0;
  };

  // Two-row battle formation: front row (up to 4 on dirt road) and back row (up to 4 on upper ridge)
  const hasExplicitRows = combat.enemies.some((e) => e.row !== undefined);
  const frontRowEnemies = hasExplicitRows
    ? combat.enemies.filter((e) => e.row === "front" || !e.row)
    : combat.enemies.slice(0, Math.min(4, combat.enemies.length));
  const backRowEnemies = hasExplicitRows
    ? combat.enemies.filter((e) => e.row === "back")
    : combat.enemies.slice(4, 8);

  const renderEnemyItem = (enemy: EnemyInstance, rowIdx: number, rowType: "front" | "back") => {
    const isFocused = enemy.uid === focusEnemy?.uid;
    const previewDmg = getPreviewDamageForEnemy(enemy);
    const hpAfterPreview = Math.max(0, enemy.hp - Math.max(0, previewDmg - enemy.block));
    const isLethal = previewDmg > 0 && hpAfterPreview <= 0;

    const depthScale = rowType === "front" ? "scale-100" : "scale-90 sm:scale-95";
    const zIndexClass = isFocused ? "z-30" : rowType === "front" ? "z-25" : "z-15";
    const verticalOffset =
      rowType === "front" ? "translate-y-0" : "-translate-y-1 sm:-translate-y-2";

    return (
      <div
        key={enemy.uid}
        onClick={() => handleEnemyCharacterClick(enemy)}
        className={`
          relative flex flex-col items-center transition-all duration-200 cursor-pointer select-none
          ${depthScale} ${zIndexClass} ${verticalOffset}
          ${!enemy.alive ? "opacity-40 grayscale-[0.5]" : "hover:-translate-y-1"}
        `}
        style={{
          minWidth: rowType === "front" ? "98px" : "90px",
          maxWidth: rowType === "front" ? "145px" : "135px",
        }}
      >
        {/* 1. TARGET RETICLE & FOCUS FRAME */}
        {isFocused && enemy.alive && (
          <div className="absolute -top-11 z-30 flex flex-col items-center pointer-events-none animate-bounce">
            <div className="bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] font-title font-black text-[0.65rem] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              🎯 CÍL ÚTOKU
            </div>
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#1c1308]" />
          </div>
        )}

        {/* 2. FLOATING INTENT SPEECH BUBBLE ABOVE HEAD */}
        {enemy.alive ? (
          <div className="mb-0.5 flex flex-col items-center relative z-20">
            {/* Comic reaction pops */}
            {enemy.isHit && (
              <div className="absolute -top-5 right-0 z-30 anim-comic-pop bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] font-black text-[0.65rem] px-1.5 py-0.2 rounded-full shadow-md">
                {enemy.saltDot > 0 ? "Sssst! 🧂" : "Bác! 💥"}
              </div>
            )}
            {enemy.isAttacking && (
              <div className="absolute -top-5 left-0 z-30 anim-comic-pop bg-[#f06e56] text-white border-2 border-[#1c1308] font-black text-[0.65rem] px-1.5 py-0.2 rounded-full shadow-md">
                {enemy.nextAction === "bafnuti_z_dymky"
                  ? "Puf! ☁️"
                  : enemy.type === "vodnik"
                    ? "Šplouch! 💦"
                    : "Žuch! 👊"}
              </div>
            )}

            {/* Intent Pill */}
            <div
              className={`
                px-1.5 py-0.5 rounded-xl border-1.5 border-[#1c1308] shadow-xs flex items-center gap-1 text-[0.62rem] font-bold transition-all
                ${isFocused ? "bg-[#fff4cf] ring-2 ring-[#e69818]" : "bg-[#fffaf0]/95"}
              `}
              title={`Záměr: ${ENEMY_ACTIONS[enemy.nextAction || "uder"]?.name || enemy.nextAction} za ${Math.max(0, enemy.timer)} Aug`}
            >
              <span className="text-[0.65rem]">
                {(() => {
                  switch (enemy.nextAction) {
                    case "uder":
                      return "⚔️";
                    case "ukryt":
                      return "🛡️";
                    case "zlovest":
                      return "😤";
                    case "vabnicka":
                      return "📣";
                    case "odveta":
                      return "⚡";
                    case "zatuhnuti":
                      return "🧊";
                    case "skrek":
                      return "😱";
                    case "puch":
                      return "🦨";
                    case "vtipek":
                      return "🃏";
                    case "bafnuti_z_dymky":
                      return "💨";
                    case "kouzelna_polivcicka":
                      return "🍲";
                    case "rybnicni_mlha":
                      return "🌫️";
                    default:
                      return "💨";
                  }
                })()}
              </span>
              <span className="font-black text-[#1c1308] truncate max-w-[55px] sm:max-w-[70px]">
                {ENEMY_ACTIONS[enemy.nextAction || "uder"]?.name || enemy.nextAction}
              </span>
              <span className="bg-[#1c1308] text-[#ffd438] px-1 rounded-full text-[0.55rem] font-black ml-0.5">
                {Math.max(0, enemy.timer)}
              </span>
            </div>

            {/* Floating Damage Preview Tag directly over enemy */}
            {previewDmg > 0 && enemy.alive && (
              <div className="absolute -bottom-3.5 z-30 anim-comic-pop bg-[#c4321d] text-white border-2 border-[#1c1308] font-title font-black text-[0.68rem] px-1.5 py-0.2 rounded-full shadow-lg flex items-center gap-1">
                <span>💥 −{previewDmg} HP</span>
                {isLethal && <span className="text-yellow-300">💀 Dorazí!</span>}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-0.5 text-center font-bold text-[0.65rem] text-[#523e2a] italic">
            💨 Rozplynul se
          </div>
        )}

        {/* 3. ENEMY JOSEF LADA SPRITE */}
        <div className="relative flex flex-col items-center">
          {/* Ground Shadow */}
          <div className="absolute -bottom-1 w-20 sm:w-24 h-4 bg-[#1c1308]/30 rounded-full blur-[1.5px] pointer-events-none" />

          {/* Golden selection halo ring */}
          {isFocused && enemy.alive && (
            <div className="absolute inset-0 rounded-full bg-[#ffd438]/20 border-2 border-[#ffd438] animate-pulse pointer-events-none -m-1" />
          )}

          <EnemySprite
            type={enemy.tpl || enemy.type}
            variantIndex={enemy.variantIndex}
            variantName={enemy.name}
            variantLevel={enemy.level}
            size={rowType === "front" ? 108 : 92}
            isHit={enemy.isHit}
            isAttacking={enemy.isAttacking}
          />

          {/* Detail Inspect Button directly on character */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenEnemyDetail(enemy.uid);
            }}
            className="absolute top-1 right-1 bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border-1.5 border-[#1c1308] rounded-full w-5 h-5 flex items-center justify-center text-[0.62rem] font-black shadow-xs cursor-pointer transition-transform hover:scale-110"
            title={`Prohlédnout karty a slabiny: ${enemy.name}`}
          >
            🔍
          </button>

          {/* Status Badges on the sprite (Sůl, Zlověst, Odveta) */}
          <div className="absolute bottom-1 left-0 flex flex-col gap-0.5 pointer-events-none">
            {enemy.saltDot > 0 && (
              <span className="bg-[#fffdf2] border border-[#1c1308] text-[#8c5614] text-[0.55rem] font-black px-1 rounded-full shadow-xs">
                🧂 {enemy.saltDot}× Sůl
              </span>
            )}
            {enemy.omen > 0 && (
              <span className="bg-[#fce0d8] border border-[#1c1308] text-[#c4321d] text-[0.55rem] font-black px-1 rounded-full shadow-xs">
                😤 +{enemy.omen}
              </span>
            )}
            {enemy.revenge && (
              <span className="bg-[#ffd438] border border-[#1c1308] text-[#1c1308] text-[0.55rem] font-black px-1 rounded-full shadow-xs">
                ⚡ Odveta
              </span>
            )}
          </div>
        </div>

        {/* 4. ENEMY STATS PEDESTAL (HP, Block, Role, Direct Attack Action) */}
        <div
          className={`
            w-full mt-0.5 p-1 rounded-xl border-1.5 border-[#1c1308] text-center shadow-[0_2px_0_rgba(28,19,8,0.25)] transition-colors
            ${isFocused ? "bg-[#fffcf2] ring-2 ring-[#d69818]" : "bg-[#fff8e8]/95"}
          `}
        >
          <div className="font-title font-black text-[0.68rem] text-[#1c1308] truncate">
            {enemy.name}
          </div>

          {/* HP Bar */}
          <div className="mt-0.5">
            <div className="flex items-center justify-between text-[0.62rem] font-bold">
              <span className="text-[#b8331d]">
                ❤️ {enemy.hp}/{enemy.maxHp}
              </span>
              {enemy.block > 0 && (
                <span className="text-[#1c4b7d] font-black">🛡️ +{enemy.block}</span>
              )}
            </div>
            <div className="w-full h-1.5 bg-[#fce0d8] rounded-full border border-[#1c1308] overflow-hidden relative mt-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#f06e56] to-[#b8331d] transition-all duration-300"
                style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
              />
            </div>
          </div>

          {/* Role and Traits chips */}
          <div className="flex flex-wrap items-center justify-center gap-0.5 mt-0.5">
            <span className="bg-[#ebdcb9] px-1 py-0.2 rounded border border-[#1c1308] text-[0.55rem] font-black text-[#422915]">
              {enemy.role === "linie" ? "Linie" : enemy.role === "podpora" ? "Podpora" : "Dělostř."}
            </span>
            <span
              className="bg-[#edd8b0] px-1 py-0.2 rounded border border-[#1c1308] text-[0.55rem] font-bold text-[#422915]"
              title="Odolnost zkracuje odklad zranění"
            >
              {enemy.odolnost}%
            </span>
          </div>

          {/* Direct Quick Attack Button right on this character */}
          {isFocused && enemy.alive && isPlayerTurn && (
            <button
              type="button"
              onClick={(e) => handleQuickAttackOnEnemy(e, enemy.uid)}
              className="mt-1 w-full bg-gradient-to-r from-[#ffd438] to-[#f09a24] hover:from-[#ffe066] hover:to-[#ffa834] text-[#1c1308] border-1.5 border-[#1c1308] rounded-md py-0.5 text-[0.62rem] font-black shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center justify-center gap-0.5"
              title={
                selectedHandIdx !== null
                  ? "Zahrát vybranou kartu na tohoto bubáka"
                  : firstPlayableAttackIdx !== -1
                    ? `Zahrát ${CARD_DB[combat.hand[firstPlayableAttackIdx].id]?.name || "útok"} na tohoto bubáka`
                    : "Vyberte útočnou kartu níže"
              }
            >
              <span>⚔️</span>
              <span className="truncate max-w-[85px]">
                {selectedHandIdx !== null
                  ? `Zahrát (${CARD_DB[combat.hand[selectedHandIdx].id]?.name})`
                  : firstPlayableAttackIdx !== -1
                    ? `Útok (${CARD_DB[combat.hand[firstPlayableAttackIdx].id]?.name})`
                    : "Zacílit"}
              </span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-parchment-pattern p-2 sm:p-3 select-none overflow-hidden justify-between">
      {/* 1. TOP STATUS BAR */}
      <div className="flex-none mb-2">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#eedcb0] px-3 py-1.5 rounded-xl border-2 border-[#1c1308] shadow-[0_2px_0_rgba(28,19,8,0.25)]">
          <div className="flex items-center gap-2">
            <span className="bg-[#fff8e8] px-2.5 py-0.5 rounded-full border border-[#1c1308] text-xs font-black text-[#1c1308] flex items-center gap-1">
              📍 {curLoc.name}
            </span>
            <button
              type="button"
              onClick={onOpenHeroDetail}
              className="bg-[#fff8e8] hover:bg-[#ffeec2] px-2.5 py-0.5 rounded-full border border-[#1c1308] text-xs font-bold text-[#5c3e21] transition-colors cursor-pointer flex items-center gap-1"
              title="Klepněte pro zobrazení detailů, vlastností a balíčku hrdiny"
            >
              <span>{hero.name}</span>
              <span className="text-[0.65rem] text-[#8c5614]">ℹ️</span>
            </button>
            <span className="text-[0.7rem] text-[#6e502c] font-semibold hidden md:inline-block">
              👉 Klepněte přímo na bubáky pro zaměření cíle a útok!
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onBackToMenu && (
              <button
                type="button"
                onClick={onBackToMenu}
                className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border border-[#1c1308] px-2.5 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs active:scale-95"
                title="Vrátit se do nabídky / menu"
              >
                <span>🔙</span>
                <span>Zpět do menu</span>
              </button>
            )}
            {onOpenBestiary && (
              <button
                type="button"
                onClick={onOpenBestiary}
                className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border border-[#1c1308] px-2.5 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs active:scale-95"
                title="Zobrazit přehled všech bubáků a rodin"
              >
                <span>📖</span>
                <span>Přehled bubáků</span>
              </button>
            )}
            {combat.playerTimer > 0 && !combat.pendingCard && (
              <span
                className="bg-[#eaf5e1] px-2.5 py-0.5 rounded-full border border-[#2d6328] text-xs font-black text-[#1a4016] animate-pulse"
                title="Čas do prvního tahu obou stran běží 3× rychleji"
              >
                ⚡ 3× zrychlený rozběh
              </span>
            )}
            <span className="bg-[#fff3c9] px-3 py-0.5 rounded-full border border-[#1c1308] text-xs font-black text-[#8c5614]">
              ⏳ Aug {combat.time}
            </span>
            <button
              type="button"
              onClick={onOpenLog}
              className="lada-button text-xs py-0.5 px-2.5"
              title="Otevřít kroniku zápisů souboje"
            >
              📜 Záznam
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE MAIN BATTLEFIELD ARENA: JOSEF LADA LANDSCAPE STAGE */}
      <div className="flex-1 min-h-0 relative mb-2">
        <CombatLandscapeArena locId={curLoc.id}>
          {/* MAIN STAGE FIELD: Hunter stands on the left, Bubáci lined up on the right along the rustic path */}
          <div className="flex-1 w-full flex items-end justify-between px-2 sm:px-8 pb-3 sm:pb-6 relative min-h-0">
            {/* === HUNTER PLATFORM (Left side of the path) === */}
            <div className="flex flex-col items-center relative z-20 max-w-[160px] sm:max-w-[210px] flex-none">
              {/* Hunter State Bubble (Nápřah, Připraven, Au!) */}
              <div className="mb-1 flex flex-col items-center">
                {combat.playerBusy === "hit" && (
                  <div className="anim-comic-pop bg-[#f06e56] text-white border-2 border-[#1c1308] font-black text-xs px-2.5 py-0.5 rounded-full shadow-md -mb-2 z-30">
                    Au! 💥
                  </div>
                )}
                <div
                  className={`
                    text-[0.68rem] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border-2 border-[#1c1308] shadow-xs
                    ${combat.pendingCard ? "bg-[#ffd438] text-[#1c1308] animate-pulse" : combat.playerTimer > 0 ? "bg-[#ffd29e] text-[#703b0c]" : "bg-[#a3e082] text-[#0e3b05]"}
                  `}
                >
                  {combat.pendingCard
                    ? `Nápřah (${combat.playerTimer} Aug)`
                    : combat.playerTimer > 0
                      ? `Příprava (${combat.playerTimer} Aug)`
                      : "Připraven k akci"}
                </div>
              </div>

              {/* Hunter Interactive Character Sprite */}
              <div
                onClick={onOpenHeroDetail}
                className="group cursor-pointer relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
                title="Klepněte pro detail hrdiny, jeho slabiny, pasivní dary a karty"
              >
                {/* Soft ground shadow */}
                <div className="absolute -bottom-1 w-24 h-5 bg-[#1c1308]/30 rounded-full blur-[1.5px] pointer-events-none" />

                <HunterSprite
                  heroId={state.hero}
                  size={125}
                  isHit={combat.playerBusy === "hit"}
                  isAttacking={combat.playerBusy === "prep" || !!combat.pendingCard}
                />

                {/* Hero Info Inspect Pill */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 bg-[#1c1308] text-[#ffd438] text-[0.65rem] font-black px-1.5 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                  🔍 Info
                </div>
              </div>

              {/* Hunter Name & Defense Bar (Blok, Úhyb, HP) */}
              <div className="w-full mt-1 bg-[#fff8e8]/95 p-1.5 sm:p-2 rounded-xl border-2 border-[#1c1308] shadow-[0_3px_0_rgba(28,19,8,0.25)] space-y-1 text-center">
                <div className="flex items-center justify-between">
                  <span className="font-title font-black text-xs text-[#1c1308] truncate">
                    {hero.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {combat.dodge > 0 && (
                      <span
                        className="bg-[#dfcb9a] px-1.5 py-0.2 rounded border border-[#1c1308] text-[0.65rem] font-black text-[#5c3e21]"
                        title="Úhyb: vyhne se příštímu zásahu"
                      >
                        💨 {combat.dodge}
                      </span>
                    )}
                    {combat.block > 0 && (
                      <span
                        className="bg-[#c9e1f7] px-1.5 py-0.2 rounded border border-[#1c4b7d] text-[0.65rem] font-black text-[#1c4b7d]"
                        title="Blok zachytí poškození"
                      >
                        🛡️ {combat.block}
                      </span>
                    )}
                  </div>
                </div>

                {/* HP Bar */}
                <div>
                  <div className="flex items-center justify-between text-[0.68rem] font-bold text-[#b8331d] mb-0.5">
                    <span>❤️ Životy</span>
                    <span className="font-black">
                      {state.hp}/{state.maxHp}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#fce0d8] rounded-full border border-[#1c1308] overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#f06e56] to-[#b8331d] transition-all duration-300"
                      style={{
                        width: `${Math.max(0, Math.min(100, (state.hp / state.maxHp) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Threat warning from focused enemy */}
                {incomingThroughBlock > 0 && focusEnemy?.alive && (
                  <div className="text-[0.62rem] font-black text-[#c4321d] bg-[#fce0d8] rounded px-1 py-0.5 border border-[#c4321d] animate-pulse">
                    ⚠️ Hrozí {incomingThroughBlock} poškození!
                  </div>
                )}
              </div>
            </div>

            {/* === BUBÁCI FORMATION (Two rows of up to 4 bogeys facing the hunter, up to 8 total) === */}
            <div className="flex-1 flex flex-col justify-end items-end gap-1.5 sm:gap-3 pl-1 sm:pl-3 overflow-x-auto overflow-y-visible py-1 min-w-0">
              {/* BACK ROW (Zadní řada - up to 4 bogeys on the upper grassy ridge) */}
              {backRowEnemies.length > 0 && (
                <div className="flex items-end justify-end gap-2 sm:gap-3.5 relative z-15 pr-2 sm:pr-6">
                  <div className="hidden md:flex items-center text-[0.6rem] font-black text-[#523e2a] bg-[#ebdcb9]/85 border border-[#1c1308] px-1.5 py-0.5 rounded-full select-none shadow-xs whitespace-nowrap self-center mb-4">
                    🌾 Zadní řada ({backRowEnemies.filter((e) => e.alive).length})
                  </div>
                  {backRowEnemies.map((enemy, rowIdx) => renderEnemyItem(enemy, rowIdx, "back"))}
                </div>
              )}

              {/* FRONT ROW (Přední řada - up to 4 bogeys on the main dirt road) */}
              <div className="flex items-end justify-end gap-2 sm:gap-3.5 relative z-25">
                {backRowEnemies.length > 0 && (
                  <div className="hidden md:flex items-center text-[0.6rem] font-black text-[#523e2a] bg-[#ebdcb9]/85 border border-[#1c1308] px-1.5 py-0.5 rounded-full select-none shadow-xs whitespace-nowrap self-center mb-4">
                    🛤️ Přední řada ({frontRowEnemies.filter((e) => e.alive).length})
                  </div>
                )}
                {frontRowEnemies.map((enemy, rowIdx) => renderEnemyItem(enemy, rowIdx, "front"))}
              </div>
            </div>
          </div>
        </CombatLandscapeArena>
      </div>

      {/* 3. BATTLE DOCK (Bottom Controls, Quick Action Buttons & Hand) */}
      <div className="flex-none bg-[#f3e3b8] p-2 sm:p-2.5 rounded-2xl border-3 border-[#1c1308] shadow-[0_4px_0_rgba(28,19,8,0.3)]">
        {/* Action Pills & Hero Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          {/* Akce & Únava counters */}
          <div className="flex items-center gap-2">
            <div className="bg-[#ffd438] px-3 py-1 rounded-xl border-2 border-[#1c1308] flex items-center gap-1.5 shadow-[0_2px_0_#1c1308]">
              <span className="text-xs font-bold text-[#5c3e21]">Akce:</span>
              <span className="font-black text-base text-[#1c1308]">{combat.actions}</span>
            </div>

            <div className="bg-[#f0c39a] px-3 py-1 rounded-xl border-2 border-[#1c1308] flex items-center gap-1.5 shadow-[0_2px_0_#1c1308]">
              <span className="text-xs font-bold text-[#5c3e21]">Únava:</span>
              <span className="font-black text-base text-[#1c1308]">{combat.fatigue}</span>
            </div>
          </div>

          {/* Action Buttons: Mrknutí, Nádech, Spánek, Nápad, Kochání, Speciál */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={onBlink}
              disabled={!isPlayerTurn}
              className="lada-button text-xs py-1.5 px-3"
              title="Pustí čas o 1 Augenblick. Nic nestojí, jen čekáte na doběhnutí nápřahu či tahu bubáka."
            >
              😉 Mrknutí
            </button>

            <button
              type="button"
              onClick={onBreath}
              disabled={!isPlayerTurn || combat.cdBreath > 0}
              className="lada-button text-xs py-1.5 px-3 relative"
              title={`Nádech dobije +${breathGain} Akcí a přidá +2 Únavy. Stojí 1 Aug.`}
            >
              {combat.cdBreath > 0 && (
                <span className="absolute -top-2 -right-1 bg-[#f4c23c] border border-[#1c1308] rounded-full text-[0.62rem] font-black px-1.5">
                  {combat.cdBreath}
                </span>
              )}
              😮‍💨 Nádech +{breathGain}
            </button>

            <button
              type="button"
              onClick={onSleep}
              disabled={!isPlayerTurn || combat.cdSleep > 0}
              className="lada-button text-xs py-1.5 px-3 relative"
              title={`Spánek sundá −${sleepDrop} Únavy. Stojí 3 Aug.`}
            >
              {combat.cdSleep > 0 && (
                <span className="absolute -top-2 -right-1 bg-[#f4c23c] border border-[#1c1308] rounded-full text-[0.62rem] font-black px-1.5">
                  {combat.cdSleep}
                </span>
              )}
              😴 Spánek −{sleepDrop}
            </button>

            <button
              type="button"
              onClick={onIdea}
              disabled={!isPlayerTurn || combat.cdIdea > 0 || combat.actions < 2}
              className="lada-button text-xs py-1.5 px-3 relative"
              title="Nápad stojí 2 Akce a lízne 1 kartu. Stojí 1 Aug."
            >
              {combat.cdIdea > 0 && (
                <span className="absolute -top-2 -right-1 bg-[#f4c23c] border border-[#1c1308] rounded-full text-[0.62rem] font-black px-1.5">
                  {combat.cdIdea}
                </span>
              )}
              💡 Nápad
            </button>

            <button
              type="button"
              onClick={onScenery}
              disabled={!isPlayerTurn || combat.cdScenery > 0}
              className="lada-button text-xs py-1.5 px-3 relative"
              title="Kochání se krásou krajiny vyléčí 1 Únavu. Stojí 2 Aug."
            >
              {combat.cdScenery > 0 && (
                <span className="absolute -top-2 -right-1 bg-[#f4c23c] border border-[#1c1308] rounded-full text-[0.62rem] font-black px-1.5">
                  {combat.cdScenery}
                </span>
              )}
              🏞️ Kochání
            </button>

            <button
              type="button"
              onClick={onSpecial}
              disabled={!isPlayerTurn || combat.cdSpecial > 0}
              className="lada-button lada-button-primary text-xs py-1.5 px-3 relative"
              title={`${hero.special.name}: ${hero.special.draw ? `lízne ${hero.special.draw} karty, ` : ""}${hero.special.fat ? `Únava ${hero.special.fat}, ` : ""}${hero.special.dmg ? `zásah za ${hero.special.dmg} HP, ` : ""}${hero.special.block ? `+${hero.special.block} Blok, ` : ""}ochlazení ${hero.special.cd} Aug.`}
            >
              {combat.cdSpecial > 0 && (
                <span className="absolute -top-2 -right-1 bg-[#b8331d] text-white border border-[#1c1308] rounded-full text-[0.62rem] font-black px-1.5">
                  {combat.cdSpecial}
                </span>
              )}
              {hero.special.name}
            </button>
          </div>

          {/* View switches */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setHandFullText(!handFullText)}
              className="lada-button text-xs py-1.5 px-2.5"
              title="Přepnout zobrazení karet mezi čipy a plným textem"
            >
              {handFullText ? "ℹ️ Čipy" : "ℹ️ Text"}
            </button>
            <button
              type="button"
              onClick={() => onOpenPiles("all")}
              className="lada-button text-xs py-1.5 px-2.5"
              title="Zobrazit lízací balíček a odhozené karty"
            >
              📚 Balíček ({combat.draw.length})
            </button>
            <button
              type="button"
              onClick={() => setHandHidden(!handHidden)}
              className="lada-button text-xs py-1.5 px-2"
              title={handHidden ? "Ukázat ruku karet" : "Schovat ruku karet"}
            >
              {handHidden ? "🖐️" : "✋"}
            </button>
          </div>
        </div>

        {/* Hand of Cards Carousel */}
        {!handHidden && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 px-1 min-h-[142px]">
            {combat.hand.length === 0 ? (
              <div className="w-full text-center py-6 text-xs italic font-bold text-[#694825]">
                V ruce nemáte žádné karty. Použijte Nápad, Nádech nebo počkejte.
              </div>
            ) : (
              combat.hand.map((card, idx) => {
                const def = CARD_DB[card.id] || CARD_DB.sul;
                const canAfford = combat.actions >= def.cost;
                const isSelected = selectedHandIdx === idx;

                return (
                  <div
                    key={card.inst}
                    className={`transition-transform relative ${isSelected ? "ring-3 ring-[#1c1308] -translate-y-2 rounded-xl shadow-lg" : ""}`}
                    onClick={() => {
                      if (!isPlayerTurn || !canAfford) return;
                      // Clicking a card toggles selection or immediately plays if already selected
                      if (selectedHandIdx === idx) {
                        onPlayCard(idx);
                        setSelectedHandIdx(null);
                      } else {
                        setSelectedHandIdx(idx);
                      }
                    }}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-[#1c1308] text-[#ffd438] text-[0.62rem] font-black px-2 py-0.2 rounded-full whitespace-nowrap shadow-xs">
                        Zvoleno 👉 Klepněte na bubáka
                      </div>
                    )}
                    <CardView
                      card={card}
                      onClick={() => {
                        // Double click or direct action
                        if (selectedHandIdx === idx) {
                          onPlayCard(idx);
                          setSelectedHandIdx(null);
                        }
                      }}
                      canAfford={canAfford}
                      disabled={!isPlayerTurn || !canAfford}
                      showFullTextDefault={handFullText}
                      onHoverEnter={() => setHoveredCardDef(def)}
                      onHoverLeave={() => setHoveredCardDef(null)}
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
