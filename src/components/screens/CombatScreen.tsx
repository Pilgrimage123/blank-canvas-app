import React, { useState, useEffect, useRef } from "react";
import { GameState, CardDef, EnemyInstance } from "../../types";
import { HEROES, CARD_DB, ENEMY_ACTIONS, TRAITS, LOCATIONS } from "../../data/gameData";
import { cardDamageCalc } from "../../utils/gameEngine";
import { HunterSprite } from "../sprites/HunterSprite";
import { EnemySprite } from "../sprites/EnemySprite";
import { CombatLandscapeArena } from "../sprites/CombatLandscapeArena";
import { LadaHitParticles, LadaDizzyHalo } from "../sprites/LadaHitParticles";
import { SurrenderWhiteFlag } from "../sprites/SurrenderWhiteFlag";
import { sound } from "../../lib/sound";
import { CardView } from "../CardView";

interface CombatScreenProps {
  state: GameState;
  onPlayCard: (handIdx: number, targetUid?: string) => void;
  onBlink: () => void;
  onBreath: () => void;
  onSleep: () => void;
  onIdea: () => void;
  onScenery: () => void;
  onSpecial: () => void;
  onShiftRowQueue?: (rowType: "horni" | "dolni" | "front" | "back", defeatedUid: string) => void;
  onSetFocus: (uid: string) => void;
  onOpenEnemyDetail: (uid: string) => void;
  onOpenHeroDetail?: () => void;
  onOpenPiles: (which: "deck" | "discard" | "all") => void;
  onOpenLog: () => void;
  onBackToMenu?: () => void;
  onOpenBestiary?: () => void;
  isTestFight?: boolean;
  onEliminateEnemy?: (uid: string) => void;
  onRestartTestFight?: () => void;
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
  onShiftRowQueue,
  onSetFocus,
  onOpenEnemyDetail,
  onOpenHeroDetail,
  onOpenPiles,
  onOpenLog,
  onBackToMenu,
  onOpenBestiary,
  isTestFight = false,
  onEliminateEnemy,
  onRestartTestFight,
}) => {
  const [hoveredCardDef, setHoveredCardDef] = useState<CardDef | null>(null);
  const [selectedHandIdx, setSelectedHandIdx] = useState<number | null>(null);
  const [handFullText, setHandFullText] = useState(false);
  const [handHidden, setHandHidden] = useState(false);
  const [screenWobble, setScreenWobble] = useState(false);
  const [eliminateMode, setEliminateMode] = useState(false);
  const [lastEliminatedName, setLastEliminatedName] = useState<string | null>(null);
  const [recentlyDefeatedUids, setRecentlyDefeatedUids] = useState<Set<string>>(new Set());
  const prevAliveMapRef = useRef<Record<string, boolean>>({});

  // Rezervovaná místa po poražených bubácích v příslušné řadě (čeká se 3 sekundy na posun bojovníků za ním)
  const [pendingRowShifts, setPendingRowShifts] = useState<
    Record<string, { rowType: "horni" | "dolni"; defIdx: number }>
  >({});
  const rowShiftTimersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const combat = state.combat;

  // Vyčištění běžících časovačů posunů při odchodu ze scény
  useEffect(() => {
    return () => {
      Object.values(rowShiftTimersRef.current).forEach((t) => clearTimeout(t));
      rowShiftTimersRef.current = {};
    };
  }, []);

  // Sledování čerstvě poražených bubáků pro spuštění ústupové animace
  // a následného posunu stále bojujících bubáků za ním přesně po 3 sekundách
  useEffect(() => {
    if (!combat) return;
    const newlyDefeated: EnemyInstance[] = [];
    combat.enemies.forEach((e) => {
      const wasAlive = prevAliveMapRef.current[e.uid];
      if (wasAlive === true && !e.alive) {
        newlyDefeated.push(e);
      }
      prevAliveMapRef.current[e.uid] = e.alive;
    });

    if (newlyDefeated.length > 0) {
      // 1. Spuštění klouzavé ústupové animace směrem doprava do prostoru pro vzdávající se
      setRecentlyDefeatedUids((prev) => {
        const next = new Set(prev);
        newlyDefeated.forEach((e) => next.add(e.uid));
        return next;
      });
      const retreatClearTimer = setTimeout(() => {
        setRecentlyDefeatedUids((prev) => {
          const next = new Set(prev);
          newlyDefeated.forEach((e) => next.delete(e.uid));
          return next;
        });
      }, 2400);

      // 2. Pravidla pro posun bojovníků:
      // - Bubáci z horní nebo dolní řady se při úprku bubáka z té druhé řady VŮBEC nepohybují!
      // - V téže řadě: bubáci PŘED ustupujícím bubákem se nehýbou vůbec.
      // - Stále bojující bubáci, kteří stáli ZA poraženým bubákem (např. za Raráškem Kostlivec a Helkal)
      //   přesně po 3 sekundách od začátku ústupu animovaným pohybem zaplní jeho uvolněné místo.
      newlyDefeated.forEach((defEnemy) => {
        const isUpper =
          defEnemy.row === "back" ||
          defEnemy.row === "top" ||
          defEnemy.row === "horni" ||
          (!defEnemy.row && combat.enemies.indexOf(defEnemy) >= 4);
        const rowType: "horni" | "dolni" = isUpper ? "horni" : "dolni";

        const rowEnemies = combat.enemies.filter((e) => {
          const eUpper =
            e.row === "back" ||
            e.row === "top" ||
            e.row === "horni" ||
            (!e.row && combat.enemies.indexOf(e) >= 4);
          return isUpper ? eUpper : !eUpper;
        });

        const defIdx = rowEnemies.findIndex((e) => e.uid === defEnemy.uid);
        const hasFollowersBehind =
          defIdx !== -1 && rowEnemies.slice(defIdx + 1).some((e) => e.alive);

        // Rezervujeme uvolněné místo v řadě, aby se řada nikdy neposunula dozadu
        setPendingRowShifts((prev) => ({
          ...prev,
          [defEnemy.uid]: { rowType, defIdx },
        }));

        if (hasFollowersBehind) {
          const shiftTimer = setTimeout(() => {
            onShiftRowQueue?.(rowType, defEnemy.uid);
            setPendingRowShifts((prev) => {
              const next = { ...prev };
              delete next[defEnemy.uid];
              return next;
            });
            delete rowShiftTimersRef.current[defEnemy.uid];
          }, 3000);

          rowShiftTimersRef.current[defEnemy.uid] = shiftTimer;
        } else {
          // Poslední bubák v řadě - podržíme jeho slot během ústupu (2,4 s), žádný posun dopředu není třeba
          const clearTimer = setTimeout(() => {
            setPendingRowShifts((prev) => {
              const next = { ...prev };
              delete next[defEnemy.uid];
              return next;
            });
            delete rowShiftTimersRef.current[defEnemy.uid];
          }, 2400);

          rowShiftTimersRef.current[defEnemy.uid] = clearTimer;
        }
      });

      return () => {
        clearTimeout(retreatClearTimer);
      };
    }
  }, [combat, combat?.enemies, onShiftRowQueue]);

  // Zvukový a vizuální screen juice při zásahu bubáka či hrdiny
  const anyEnemyHit = Boolean(combat?.enemies.some((e) => e.isHit && e.alive));
  const hunterHit = Boolean(combat?.playerBusy === "hit");

  useEffect(() => {
    if (anyEnemyHit || hunterHit) {
      setScreenWobble(true);
      const timer = setTimeout(() => setScreenWobble(false), 380);
      try {
        const hitWater = Boolean(
          combat?.enemies.some(
            (e) => e.isHit && (e.tpl === "vodnik" || e.type === "vodnik" || e.tpl === "rusalka"),
          ),
        );
        if (hitWater) {
          sound.playSplash();
        } else {
          sound.playComicPop(hunterHit ? 1.25 : 1.0);
        }
      } catch {
        // Audio fallback
      }
      return () => clearTimeout(timer);
    }
  }, [anyEnemyHit, hunterHit, combat?.enemies]);

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
    if (eliminateMode) {
      if (enemy.alive) {
        onEliminateEnemy?.(enemy.uid);
        setLastEliminatedName(enemy.name);
        try {
          sound.playComicPop(1.15);
        } catch {}
      }
      return;
    }

    if (!enemy.alive) {
      // Otevře detail a informace o poraženém bubákovi pro prohlížení
      onOpenEnemyDetail(enemy.uid);
      return;
    }

    // Set focus on this enemy
    if (combat.focus !== enemy.uid) {
      onSetFocus(enemy.uid);
    }

    // If a card is primed / selected in hand, play it now against this enemy
    if (selectedHandIdx !== null && isPlayerTurn) {
      const cardToPlay = combat.hand[selectedHandIdx];
      if (cardToPlay) {
        const def = CARD_DB[cardToPlay.id];
        if (def && combat.actions >= def.cost) {
          onPlayCard(selectedHandIdx, enemy.uid);
          setSelectedHandIdx(null);
          return;
        }
      }
    }

    // Open full detail modal when clicking his body
    onOpenEnemyDetail(enemy.uid);
  };

  // Quick attack directly on the focused enemy from the character sprite
  const handleQuickAttackOnEnemy = (e: React.MouseEvent, enemyUid: string) => {
    e.stopPropagation();
    if (eliminateMode) {
      onEliminateEnemy?.(enemyUid);
      const targetEnemy = combat.enemies.find((em) => em.uid === enemyUid);
      if (targetEnemy) setLastEliminatedName(targetEnemy.name);
      try {
        sound.playComicPop(1.15);
      } catch {}
      return;
    }

    if (!isPlayerTurn) return;

    if (combat.focus !== enemyUid) {
      onSetFocus(enemyUid);
    }

    if (selectedHandIdx !== null) {
      onPlayCard(selectedHandIdx, enemyUid);
      setSelectedHandIdx(null);
    } else if (firstPlayableAttackIdx !== -1) {
      onPlayCard(firstPlayableAttackIdx, enemyUid);
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

  // Dvě řady na bojišti:
  // Horní řada (na vyvýšeném travnatém břehu) a Dolní řada (na polní cestě)
  const isEnemyUpperRow = (e: EnemyInstance) =>
    e.row === "back" ||
    e.row === "top" ||
    e.row === "horni" ||
    (!e.row && combat.enemies.indexOf(e) >= 4);

  const horniRadaEnemies = combat.enemies.filter(isEnemyUpperRow);
  const dolniRadaEnemies = combat.enemies.filter((e) => !isEnemyUpperRow(e));

  const horniRadaAlive = horniRadaEnemies.filter((e) => e.alive);
  const dolniRadaAlive = dolniRadaEnemies.filter((e) => e.alive);
  const defeatedEnemies = combat.enemies.filter((e) => !e.alive);

  // Poražení už nerespektují bojové řady. Stabilně se rozsadí po volném terénu,
  // přičemž každý bod značí úroveň země pod nohama daného bubáka.
  const getSurrenderedClusterOffset = (enemyUid: string, idx: number) => {
    let hash = 0;
    for (let i = 0; i < enemyUid.length; i++) {
      hash = (hash << 5) - hash + enemyUid.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const places = [
      { right: 8, bottom: 3, scale: 1 },
      { right: 92, bottom: 12, scale: 0.96 },
      { right: 174, bottom: 5, scale: 1.02 },
      { right: 38, bottom: 82, scale: 0.9 },
      { right: 126, bottom: 94, scale: 0.87 },
      { right: 216, bottom: 76, scale: 0.92 },
      { right: 4, bottom: 157, scale: 0.82 },
      { right: 90, bottom: 164, scale: 0.8 },
    ];
    const place = places[idx % places.length];
    const layer = Math.floor(idx / places.length);
    const jitterX = (absHash % 11) - 5;
    const jitterY = ((absHash >> 3) % 7) - 3;
    return {
      right: place.right + jitterX + layer * 12,
      bottom: place.bottom + jitterY,
      scale: Math.max(0.72, place.scale - layer * 0.05),
      rot: ((absHash % 9) - 4) * 0.55,
      z: 42 + Math.round(180 - place.bottom),
    };
  };

  const renderEnemyItem = (
    enemy: EnemyInstance,
    rowIdx: number,
    rowType: "horni" | "dolni" | "front" | "back",
    isClusterItem = false,
  ) => {
    const isFocused = enemy.uid === focusEnemy?.uid;
    const isDefeated = !enemy.alive;
    const isRetreating = recentlyDefeatedUids.has(enemy.uid);
    const isDefeatedAnimating = isDefeated && (enemy.isHit || isRetreating);

    const previewDmg = getPreviewDamageForEnemy(enemy);
    const hpAfterPreview = Math.max(0, enemy.hp - Math.max(0, previewDmg - enemy.block));
    const isLethal = previewDmg > 0 && hpAfterPreview <= 0;

    const isLower = rowType === "dolni" || rowType === "front";
    const depthScale = isLower ? "scale-100" : "scale-90 sm:scale-95";
    const zIndexClass = isFocused ? "z-30" : isLower ? "z-20" : "z-10 hover:z-25";
    const verticalOffset = "translate-y-0";

    // Vzdálenost v px z bojové linie do prostoru poražených (o velikost bubáka víc vzadu)
    const originalSlot = pendingRowShifts[enemy.uid]?.defIdx ?? Math.max(0, 3 - rowIdx);
    const slotsFromEnd = Math.max(0, 3 - originalSlot);
    const retreatStartX = -(140 + slotsFromEnd * 88);

    const itemWidth = isClusterItem ? undefined : isLower ? "96px" : "86px";

    return (
      <div
        key={enemy.uid}
        onClick={() => handleEnemyCharacterClick(enemy)}
        className={`
          relative flex flex-col items-center transition-all duration-500 cursor-pointer select-none
          ${depthScale} ${zIndexClass} ${verticalOffset}
          ${isRetreating ? "anim-enemy-surrender-glide z-30" : ""}
          ${isDefeated ? "opacity-100" : "hover:-translate-y-1"}
          ${eliminateMode && enemy.alive ? "ring-2 sm:ring-3 ring-[#c4321d] rounded-2xl bg-[#c4321d]/15 hover:bg-[#c4321d]/25 hover:scale-105 cursor-crosshair shadow-lg" : ""}
        `}
        style={
          {
            minWidth: isClusterItem ? undefined : isLower ? "74px" : "66px",
            maxWidth: isClusterItem ? undefined : isLower ? "115px" : "105px",
            width: itemWidth,
            "--retreat-from-x": `${retreatStartX}px`,
          } as React.CSSProperties
        }
        title={
          eliminateMode && enemy.alive
            ? `🎯 Klepnutím vyřadíte: ${enemy.name}`
            : isDefeated
              ? `${enemy.name} (Vzdal se! Klepnutím otevřete kompletní informace a karty)`
              : `${enemy.name} (Klepnutím otevřete kompletní informace a karty)`
        }
      >
        {/* 1. TARGET RETICLE & FOCUS FRAME */}
        {isFocused && enemy.alive && (
          <div className="absolute -top-7 z-30 flex flex-col items-center pointer-events-none animate-bounce">
            <div className="bg-[#ffd438] text-[#1c1308] border-1.5 border-[#1c1308] font-title font-black text-[0.6rem] px-2 py-0.2 rounded-full shadow-md flex items-center gap-1">
              🎯 CÍL
            </div>
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#1c1308]" />
          </div>
        )}

        {/* 2. REACTION POPS & FLOATING DAMAGE PREVIEW */}
        {enemy.alive || isDefeatedAnimating ? (
          <div className="relative w-full flex justify-center pointer-events-none">
            {/* Comic reaction pops */}
            {enemy.isHit && (
              <div
                key={enemy.hitNonce ? `pop-${enemy.hitNonce}` : "pop-hit"}
                className="absolute -top-5 right-0 z-30 anim-comic-pop bg-[#ffd438] text-[#1c1308] border-1.5 border-[#1c1308] font-black text-[0.62rem] px-1.5 py-0.2 rounded-full shadow-md"
              >
                {enemy.saltDot > 0 ? "Sssst! 🧂" : "Bác! 💥"}
              </div>
            )}
            {enemy.alive && enemy.isAttacking && (
              <div className="absolute -top-5 left-0 z-30 anim-comic-pop bg-[#f06e56] text-white border-1.5 border-[#1c1308] font-black text-[0.62rem] px-1.5 py-0.2 rounded-full shadow-md">
                {enemy.nextAction === "bafnuti_z_dymky"
                  ? "Puf! ☁️"
                  : enemy.type === "vodnik"
                    ? "Šplouch! 💦"
                    : "Žuch! 👊"}
              </div>
            )}

            {/* Floating Damage Preview Tag */}
            {enemy.alive && previewDmg > 0 && (
              <div className="absolute -top-4 z-30 anim-comic-pop bg-[#c4321d] text-white border-1.5 border-[#1c1308] font-title font-black text-[0.65rem] px-1.5 py-0.2 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                <span>💥 −{previewDmg}</span>
                {isLethal && <span className="text-yellow-300">💀</span>}
              </div>
            )}
          </div>
        ) : null}

        {/* 3. MÁVAJÍCÍ BÍLÁ VLAJKA KUS NAD PORAŽENÝM BUBÁKEM (JAKOŽE SE VZDÁVAJÍ) */}
        {isDefeated && (
          <div className="absolute -top-11 sm:-top-13 z-35 flex flex-col items-center pointer-events-none">
            <SurrenderWhiteFlag size={rowType === "front" ? 38 : 34} />
            <span className="bg-[#fffdf5] border border-[#1c1308] text-[#5c3e21] text-[0.52rem] sm:text-[0.56rem] font-black px-1.5 py-0.2 rounded-full shadow-xs -mt-1 select-none whitespace-nowrap">
              Vzdal se
            </span>
          </div>
        )}

        {/* 4. ENEMY JOSEF LADA SPRITE WITH VERTICAL MINIMALIST INFO BAR */}
        <div className="relative flex flex-col items-center">
          {/* Ground Shadow */}
          <div
            className={`absolute -bottom-1 pointer-events-none transition-all duration-300 ${
              isDefeated
                ? "w-20 sm:w-24 h-4 bg-[#1c1308]/40 blur-[1px]"
                : "w-16 sm:w-20 h-3 bg-[#1c1308]/30 blur-[1.5px]"
            }`}
          />

          {/* MINIMALIST VERTICAL INFO BAR: Shifted ~40% further back (-right-2.5 sm:-right-3.5) and into layer z-20 in front of the bogey so plump figures never cover it */}
          {enemy.alive && (
            <div
              className={`
                absolute top-1 sm:top-2 -right-2.5 sm:-right-3.5 z-20 flex flex-col items-center gap-1 py-1 px-1 rounded-xl border border-[#1c1308] shadow-md select-none transition-all
                ${
                  isFocused
                    ? "bg-[#fff2be] border-[#1c1308] ring-2 ring-[#e69818] shadow-lg"
                    : "bg-[#fffaf0]/95"
                }
              `}
              title={`Odpočet: ${Math.max(0, enemy.timer)} Augenblicků | Životy: ${enemy.hp}/${enemy.maxHp}${enemy.block > 0 ? ` (+${enemy.block} blok)` : ""}`}
            >
              {/* Aug delay indicator (vertical) */}
              <div
                className="flex flex-col items-center bg-[#1c1308] text-[#ffd438] px-1 py-0.5 rounded-lg text-[0.55rem] font-black leading-tight shadow-2xs min-w-[20px] text-center"
                title={`Zbývá ${Math.max(0, enemy.timer)} Augenblicků do akce`}
              >
                <span className="text-[0.6rem] leading-none">⏳</span>
                <span className="leading-none mt-0.5 whitespace-nowrap tabular-nums">
                  {Math.max(0, enemy.timer)}
                </span>
              </div>

              {/* Vertical divider */}
              <div className="w-3 h-[1px] bg-[#1c1308]/20" />

              {/* HP indicator (vertical) */}
              <div
                className="flex flex-col items-center text-[#b8331d] font-black text-[0.58rem] leading-tight min-w-[20px] text-center"
                title={`Životy: ${enemy.hp}/${enemy.maxHp}`}
              >
                <span className="text-[0.6rem] leading-none">❤️</span>
                <span className="leading-none mt-0.5 whitespace-nowrap tabular-nums">
                  {enemy.hp}
                </span>
                {enemy.block > 0 && (
                  <span className="text-[#1c4b7d] text-[0.5rem] font-bold mt-0.5 leading-none bg-[#c9e1f7] px-0.5 rounded border border-[#1c4b7d]/40 whitespace-nowrap tabular-nums">
                    +{enemy.block}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Golden selection halo ring */}
          {isFocused && enemy.alive && (
            <div className="absolute inset-0 rounded-full bg-[#ffd438]/20 border-2 border-[#ffd438] animate-pulse pointer-events-none -m-1 z-15" />
          )}

          {/* The Sprite itself (z-10, in front of the HP/Aug delay pill directly behind him) */}
          <div
            className={`relative z-10 flex items-center justify-center transition-transform duration-500 ${
              isDefeated && !isRetreating
                ? "translate-y-3.5 sm:translate-y-4 scale-y-[0.80] sm:scale-y-[0.76] scale-x-[0.92]"
                : ""
            }`}
          >
            <EnemySprite
              type={enemy.tpl || enemy.type}
              variantIndex={enemy.variantIndex}
              variantName={enemy.name}
              variantLevel={enemy.level}
              size={rowType === "front" ? 104 : 88}
              isHit={enemy.isHit}
              hitNonce={enemy.hitNonce}
              hitFrame={enemy.hitFrame}
              isAttacking={enemy.alive && enemy.isAttacking}
              attackFrame={enemy.attackFrame}
              isMoving={enemy.isMoving || isRetreating}
              moveFrame={enemy.moveFrame}
              moveDirection={isRetreating ? "backward" : enemy.moveDirection}
              isDefeated={isDefeated}
            />

            {/* Ladovské částicové efekty při zásahu bubáka */}
            <LadaHitParticles
              active={!!enemy.isHit}
              hitNonce={enemy.hitNonce}
              isSalt={enemy.saltDot > 0}
              subType={enemy.tpl || enemy.type}
              size={rowType === "front" ? 120 : 100}
            />

            {/* Točící se komická aureola hvězdiček nad hlavou zasaženého bubáka */}
            <LadaDizzyHalo active={!!enemy.isHit} hitNonce={enemy.hitNonce} />
          </div>

          {/* Status Badges on sprite (Sůl, Zlověst, Odveta) */}
          {enemy.alive && (
            <div className="absolute bottom-1 left-0 flex flex-col gap-0.5 pointer-events-none z-20">
              {enemy.saltDot > 0 && (
                <span className="bg-[#fffdf2] border border-[#1c1308] text-[#8c5614] text-[0.52rem] font-black px-1 rounded-full shadow-xs">
                  🧂 {enemy.saltDot}
                </span>
              )}
              {enemy.omen > 0 && (
                <span className="bg-[#fce0d8] border border-[#1c1308] text-[#c4321d] text-[0.52rem] font-black px-1 rounded-full shadow-xs">
                  😤 +{enemy.omen}
                </span>
              )}
              {enemy.revenge && (
                <span className="bg-[#ffd438] border border-[#1c1308] text-[#1c1308] text-[0.52rem] font-black px-1 rounded-full shadow-xs">
                  ⚡
                </span>
              )}
            </div>
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
              👉 Klepněte na tělo bubáka pro detailní informace a zacílení útoků!
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isTestFight && (
              <button
                type="button"
                onClick={() => setEliminateMode((prev) => !prev)}
                className={`px-3 py-1 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 border-2 ${
                  eliminateMode
                    ? "bg-[#c4321d] text-white border-[#1c1308] ring-2 ring-[#ffd438] animate-pulse"
                    : "bg-[#ffd438] hover:bg-[#ffe066] text-[#1c1308] border-[#1c1308]"
                }`}
                title="Klepněte sem a poté klikněte na libovolného bubáka, kterého chcete vyřadit z boje pro otestování ústupu"
              >
                <span>{eliminateMode ? "🎯" : "🏳️"}</span>
                <span>{eliminateMode ? "Zrušit výběr ✕" : "Vyřaď bubáka"}</span>
              </button>
            )}
            {isTestFight && onRestartTestFight && (
              <button
                type="button"
                onClick={onRestartTestFight}
                className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border border-[#1c1308] px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs active:scale-95"
                title="Restartovat tento testovací souboj znovu od začátku"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">Restart</span>
              </button>
            )}
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
        {/* Floating eliminate mode banner */}
        {eliminateMode && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 bg-[#c4321d] text-white border-2 border-[#1c1308] px-4 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 max-w-[95%] text-center animate-bounce">
            <span className="text-base">🎯</span>
            <span className="text-xs sm:text-sm font-black">
              {lastEliminatedName
                ? `Vyřazen ${lastEliminatedName}! Klikněte na dalšího bubáka nebo režim ukončete:`
                : "Klikněte na libovolného bubáka na bojišti a ten bude okamžitě vyřazen:"}
            </span>
            <button
              type="button"
              onClick={() => setEliminateMode(false)}
              className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] px-2 py-0.5 rounded-lg text-xs font-black border border-[#1c1308] cursor-pointer ml-1 active:scale-95"
            >
              Hotovo ✕
            </button>
          </div>
        )}
        <CombatLandscapeArena
          locId={curLoc.id}
          className={screenWobble ? "anim-screen-wobble" : ""}
        >
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

                {/* Ladovské částicové efekty při zásahu lovce */}
                <LadaHitParticles
                  active={combat.playerBusy === "hit"}
                  theme="hero"
                  subType={state.hero}
                  size={145}
                />

                {/* Točící se komická aureola hvězdiček nad kloboukem lovce */}
                <LadaDizzyHalo active={combat.playerBusy === "hit"} />

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

            {/* Poražení jsou nad všemi kulisami, volně rozesazení po viditelném terénu. */}
            <div className="absolute inset-y-0 right-1 sm:right-3 w-[42%] min-w-[250px] pointer-events-none z-40 overflow-visible">
              {defeatedEnemies.map((enemy, defIdx) => {
                const offset = getSurrenderedClusterOffset(enemy.uid, defIdx);
                return (
                  <div
                    key={`surrendered-${enemy.uid}`}
                    className="absolute origin-bottom transition-all duration-700 pointer-events-auto"
                    style={{
                      right: `${offset.right}px`,
                      bottom: `${offset.bottom}px`,
                      transform: `rotate(${offset.rot}deg) scale(${offset.scale})`,
                      zIndex: offset.z,
                    }}
                  >
                    {renderEnemyItem(enemy, defIdx, "dolni", true)}
                  </div>
                );
              })}
            </div>

            {/* === BUBÁCI FORMATION (bojovníci nadále drží horní a dolní řadu) === */}
            <div className="flex-1 flex flex-col justify-end items-start gap-0 pl-2 sm:pl-4 md:pl-8 pr-1 sm:pr-2 overflow-x-auto overflow-y-visible py-1 min-w-0">
              {/* HORNÍ ŘADA (Vyvýšený břeh) */}
              {horniRadaEnemies.length > 0 && (
                <div className="flex items-end justify-start gap-2 sm:gap-3 relative z-10 pr-1 sm:pr-2 mb-1 sm:mb-2 md:mb-3">
                  <div className="hidden md:flex items-center text-[0.6rem] font-black text-[#523e2a] bg-[#ebdcb9]/85 border border-[#1c1308] px-1.5 py-0.5 rounded-full select-none shadow-xs whitespace-nowrap self-center mb-2 mr-1">
                    🌾 Horní řada ({horniRadaAlive.length})
                  </div>

                  {/* 1. Neporažení bojující bubáci v horní řadě s trvalou délkou řady */}
                  <div
                    className="flex items-end justify-start gap-2 sm:gap-3.5 transition-all duration-500"
                    style={{
                      minWidth: `${horniRadaEnemies.length * 96}px`,
                    }}
                  >
                    {horniRadaEnemies.map((enemy, rowIdx) => {
                      if (enemy.alive) {
                        return renderEnemyItem(enemy, rowIdx, "horni");
                      }
                      if (pendingRowShifts[enemy.uid]) {
                        return (
                          <div
                            key={`reserved-horni-slot-${enemy.uid}`}
                            className="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-500"
                            style={{
                              minWidth: "66px",
                              maxWidth: "105px",
                              width: "86px",
                              height: "95px",
                            }}
                          >
                            {/* Prázdný stín uvolněného místa držící pozici řady před posunem */}
                            <div className="w-14 sm:w-16 h-2.5 bg-[#1c1308]/15 rounded-full blur-[1px] mb-1" />
                          </div>
                        );
                      }
                      // Již vyřazený a odsunutý bubák - drží prázdné místo na konci řady, aby se zóna poražených nikdy neposunula blíže k hrdinovi
                      return (
                        <div
                          key={`empty-horni-slot-${enemy.uid}`}
                          className="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-500"
                          style={{
                            minWidth: "66px",
                            maxWidth: "105px",
                            width: "86px",
                            height: "95px",
                          }}
                          aria-hidden="true"
                        />
                      );
                    })}
                  </div>

                </div>
              )}

              {/* DOLNÍ ŘADA (Polní cesta) */}
              <div className="flex items-end justify-start gap-2 sm:gap-3 relative z-20 pr-1 sm:pr-2">
                {horniRadaEnemies.length > 0 && (
                  <div className="hidden md:flex items-center text-[0.6rem] font-black text-[#523e2a] bg-[#ebdcb9]/85 border border-[#1c1308] px-1.5 py-0.5 rounded-full select-none shadow-xs whitespace-nowrap self-center mb-4 mr-1">
                    🛤️ Dolní řada ({dolniRadaAlive.length})
                  </div>
                )}

                {/* 1. Neporažení bojující bubáci v dolní řadě s trvalou délkou řady */}
                <div
                  className="flex items-end justify-start gap-2 sm:gap-3.5 transition-all duration-500"
                  style={{
                    minWidth: `${dolniRadaEnemies.length * 106}px`,
                  }}
                >
                  {dolniRadaEnemies.map((enemy, rowIdx) => {
                    if (enemy.alive) {
                      return renderEnemyItem(enemy, rowIdx, "dolni");
                    }
                    if (pendingRowShifts[enemy.uid]) {
                      return (
                        <div
                          key={`reserved-dolni-slot-${enemy.uid}`}
                          className="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-500"
                          style={{
                            minWidth: "74px",
                            maxWidth: "115px",
                            width: "96px",
                            height: "105px",
                          }}
                        >
                          {/* Prázdný stín uvolněného místa držící pozici řady před posunem */}
                          <div className="w-16 sm:w-20 h-3 bg-[#1c1308]/15 rounded-full blur-[1.5px] mb-1" />
                        </div>
                      );
                    }
                    // Již vyřazený a odsunutý bubák - drží prázdné místo na konci řady, aby se zóna poražených nikdy neposunula blíže k hrdinovi
                    return (
                      <div
                        key={`empty-dolni-slot-${enemy.uid}`}
                        className="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-500"
                        style={{
                          minWidth: "74px",
                          maxWidth: "115px",
                          width: "96px",
                          height: "105px",
                        }}
                        aria-hidden="true"
                      />
                    );
                  })}
                </div>

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

            {isTestFight && (
              <button
                type="button"
                onClick={() => setEliminateMode((prev) => !prev)}
                className={`lada-button text-xs py-1.5 px-3 relative border-2 ${
                  eliminateMode
                    ? "!bg-[#c4321d] !text-white ring-2 ring-[#ffd438] animate-pulse"
                    : "!bg-[#ffd438] !text-[#1c1308]"
                }`}
                title="Aktivuje režim vyřazení: poté stačí kliknout na libovolného bubáka na bojišti"
              >
                <span>{eliminateMode ? "🎯" : "🏳️"}</span>
                <span>{eliminateMode ? "Zvolte bubáka (Zrušit ✕)" : "Vyřaď bubáka"}</span>
              </button>
            )}
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
