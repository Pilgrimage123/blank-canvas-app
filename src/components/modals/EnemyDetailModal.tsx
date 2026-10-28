import React from "react";
import { EnemyInstance, LocationId } from "../../types";
import { ENEMY_DB, ENEMY_BY_ID, ENEMY_ACTIONS, TRAITS, LOCATION_BY_ID } from "../../data/gameData";
import { EnemySprite } from "../sprites/EnemySprite";
import { getStagePercent } from "../../utils/spriteUtils";
import { LadaThematicIcon } from "../sprites/LadaThematicIcon";

interface EnemyDetailModalProps {
  enemy: EnemyInstance;
  onClose: () => void;
}

export const EnemyDetailModal: React.FC<EnemyDetailModalProps> = ({ enemy, onClose }) => {
  const tpl = ENEMY_BY_ID[enemy.tpl] || ENEMY_BY_ID[enemy.type] || ENEMY_DB[0];

  const pool = Array.from(
    new Set([...(tpl.pool || []), enemy.nextAction].filter(Boolean)),
  ) as string[];
  const stageIdx = enemy.variantIndex ?? 2;
  const stageSizePct = getStagePercent(stageIdx, tpl.id || tpl.type);

  const hpPct =
    enemy.maxHp > 0 ? Math.max(0, Math.min(100, Math.round((enemy.hp / enemy.maxHp) * 100))) : 0;
  const totalAttackPower = enemy.dmg + (enemy.omen || 0);

  const getActionIcon = (actId?: string | null) => {
    switch (actId) {
      case "uder":
        return <LadaThematicIcon name="attack" size={20} />;
      case "ukryt":
        return <LadaThematicIcon name="block" size={20} />;
      case "zlovest":
        return <LadaThematicIcon name="omen" size={20} />;
      case "vabnicka":
        return <LadaThematicIcon name="buff" size={20} />;
      case "odveta":
        return <LadaThematicIcon name="speed" size={20} />;
      case "zatuhnuti":
        return <LadaThematicIcon name="freeze" size={20} />;
      case "skrek":
        return <LadaThematicIcon name="fear" size={20} />;
      case "puch":
        return <LadaThematicIcon name="stink" size={20} />;
      case "vtipek":
        return <LadaThematicIcon name="draw" size={20} />;
      case "bafnuti_z_dymky":
        return <LadaThematicIcon name="dodge" size={20} />;
      case "kouzelna_polivcicka":
        return <LadaThematicIcon name="soup" size={20} />;
      case "rybnicni_mlha":
        return <LadaThematicIcon name="fog" size={20} />;
      default:
        return <LadaThematicIcon name="dodge" size={20} />;
    }
  };

  const getStageTitle = (idx: number) => {
    switch (idx) {
      case 0:
        return "Mládě / Učeň";
      case 1:
        return "Zkušený";
      case 2:
        return "Klasický (Původní)";
      case 3:
        return "Elitní / Pán";
      default:
        return `Stádium ${idx + 1}`;
    }
  };

  const getLocationName = (locId: string) => {
    return LOCATION_BY_ID[locId as LocationId]?.name || locId;
  };

  const currentActionDef = enemy.nextAction ? ENEMY_ACTIONS[enemy.nextAction] : null;

  return (
    <div
      id="enemy-detail-backdrop"
      className="fixed inset-0 z-50 bg-[#1c1308]/70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs select-none animate-fade-in"
      onClick={onClose}
    >
      <div
        id="enemy-detail-card"
        className="lada-card max-w-xl w-full max-h-[90vh] flex flex-col p-4 sm:p-5 bg-[#fffdf7] border-4 shadow-[8px_10px_0_rgba(28,19,8,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Accurate Sprite and Stage Badge */}
        <div className="flex items-start justify-between border-b-2 border-[#1c1308] pb-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center p-1 bg-gradient-to-b from-[#fbf5e6] to-[#ecdcba] rounded-2xl border-2 border-[#1c1308] shadow-inner shrink-0 w-20 h-20 sm:w-22 sm:h-22">
              <EnemySprite
                type={enemy.tpl || enemy.type}
                variantIndex={stageIdx}
                variantName={enemy.name}
                variantLevel={enemy.level}
                size={74}
              />
              <span className="absolute -bottom-2 bg-[#1c1308] text-[#ffd438] text-[0.6rem] font-black px-1.5 py-0.2 rounded-full border border-[#ffd438] shadow-xs">
                {stageSizePct} %
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-title text-xl sm:text-2xl font-black text-[#1c1308] leading-tight">
                  {enemy.name}
                </h3>
                {enemy.level && (
                  <span className="bg-[#1c1308] text-[#ffd438] text-[0.65rem] font-black px-2 py-0.5 rounded-full shadow-2xs">
                    Úr. {enemy.level}
                  </span>
                )}
              </div>

              <div className="text-xs font-bold text-[#694825] flex flex-wrap items-center gap-1.5 mt-1">
                <span className="bg-[#f0dfb6] text-[#4a2e12] px-1.5 py-0.2 rounded border border-[#d6be96] inline-flex items-center gap-1">
                  {enemy.role === "linie" ? (
                    <>
                      <LadaThematicIcon name="block" size={12} /> Linie
                    </>
                  ) : enemy.role === "podpora" ? (
                    <>
                      <LadaThematicIcon name="buff" size={12} /> Podpora
                    </>
                  ) : (
                    <>
                      <LadaThematicIcon name="target" size={12} /> Dělostřelba
                    </>
                  )}
                </span>
                <span>·</span>
                <span className="text-[#3b2713]">
                  {getStageTitle(stageIdx)} ({stageIdx + 1}/4)
                </span>
                <span>·</span>
                <span className={enemy.alive ? "text-[#2d6328]" : "text-[#8c3220]"}>
                  {enemy.alive ? `${enemy.hp}/${enemy.maxHp} HP` : "Rozplynul se"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-enemy-detail"
            onClick={onClose}
            className="lada-button text-xs py-1 px-2.5 shrink-0 flex items-center justify-center"
            title="Zavřít detail"
          >
            <LadaThematicIcon name="close" size={13} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
          {/* Health Bar */}
          <div className="bg-[#f7eed9] p-2.5 rounded-xl border border-[#1c1308]">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="font-title font-black text-[#1c1308] flex items-center gap-1">
                <LadaThematicIcon name="hp" size={13} /> Životy bubáka
              </span>
              <span className="font-black text-[#1c1308]">
                {enemy.hp} / {enemy.maxHp} HP ({hpPct} %)
              </span>
            </div>
            <div className="w-full h-3.5 bg-[#e0ceab] rounded-full border-1.5 border-[#1c1308] overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  hpPct > 50
                    ? "bg-gradient-to-r from-[#5ea33c] to-[#7ec953]"
                    : hpPct > 25
                      ? "bg-gradient-to-r from-[#d99429] to-[#f4b638]"
                      : "bg-gradient-to-r from-[#b8331d] to-[#e65239]"
                }`}
                style={{ width: `${hpPct}%` }}
              />
            </div>
          </div>

          {/* Active Intent / Next Action Banner */}
          {enemy.alive && (
            <div className="bg-[#fff3c9] border-2 border-[#1c1308] rounded-xl p-3 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl flex items-center justify-center">
                    {getActionIcon(enemy.nextAction)}
                  </span>
                  <div>
                    <div className="text-[0.65rem] uppercase font-black text-[#8c5614] tracking-wider">
                      Chystaný tah bubáka:
                    </div>
                    <div className="font-title font-black text-base text-[#1c1308]">
                      {currentActionDef?.name || enemy.nextAction || "Úder"}
                    </div>
                  </div>
                </div>
                <div className="bg-[#1c1308] text-[#ffd438] font-title font-black text-xs px-2.5 py-1 rounded-full shadow-2xs shrink-0 flex items-center gap-1">
                  <LadaThematicIcon name="hourglass" size={12} />
                  <span>za {Math.max(0, enemy.timer)} Aug</span>
                </div>
              </div>
              <p className="text-[0.75rem] font-semibold text-[#4a3420] mt-2 leading-snug">
                {currentActionDef?.text || "Připravuje úder na lovce."}
              </p>
            </div>
          )}

          {/* Key Numerical Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f4ebd0] p-3 rounded-xl border border-[#1c1308] text-center text-xs font-bold text-[#1c1308]">
            <div title="Základní síla úderu a bonus ze Zlověsti">
              <span className="text-[#694825] block text-[0.68rem] uppercase">Útok / Síla</span>
              <span className="font-title text-base font-black text-[#b8331d]">
                {totalAttackPower}
                {enemy.omen > 0 && (
                  <span className="text-[0.65rem] text-[#c4321d] ml-0.5">(+{enemy.omen})</span>
                )}
              </span>
              <span className="text-[0.62rem] text-[#694825] block">
                {enemy.omen > 0 ? `Základ ${enemy.dmg}` : "přímé zranění"}
              </span>
            </div>

            <div title="Iniciativa bubáka — nástup za (50 − Připravenost) Aug. Vyšší hodnota = dřívější tah!">
              <span className="text-[#694825] block text-[0.68rem] uppercase">Připravenost</span>
              <span className="font-title text-base font-black text-[#2d6328]">{enemy.ready}</span>
              <span className="text-[0.62rem] text-[#694825] block">({50 - enemy.ready} Aug)</span>
            </div>

            <div title="Procento zranění pohlcené při odkladu odpočtu (1 zranění = 1 Aug odklad, poníženo o odolnost)">
              <span className="text-[#694825] block text-[0.68rem] uppercase">Odolnost</span>
              <span className="font-title text-base font-black text-[#1c4b7d]">
                {enemy.odolnost}%
              </span>
              <span className="text-[0.62rem] text-[#694825] block">pohlcení odkladu</span>
            </div>

            <div title="Jak často bubák provádí své akce">
              <span className="text-[#694825] block text-[0.68rem] uppercase">Interval</span>
              <span className="font-title text-base font-black text-[#8c5614]">
                {enemy.interval} Aug
              </span>
              <span className="text-[0.62rem] text-[#694825] block">mezi údery</span>
            </div>
          </div>

          {/* Active Combat Status Effects (Buffs / Debuffs) */}
          {(enemy.saltDot > 0 ||
            enemy.omen > 0 ||
            enemy.block > 0 ||
            enemy.revenge ||
            enemy.uskokDodge ||
            enemy.stiffen > 0) && (
            <div className="bg-[#fff9ed] p-2.5 rounded-xl border border-[#1c1308]">
              <h4 className="font-title text-xs font-black text-[#1c1308] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <LadaThematicIcon name="star" size={13} /> Aktivní bojové stavy:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {enemy.saltDot > 0 && (
                  <span className="bg-[#fffdf2] border border-[#1c1308] text-[#8c5614] text-xs font-black px-2 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
                    <LadaThematicIcon name="salt" size={12} /> {enemy.saltDot}× Sůl na kůži (pálí
                    při každém zásahu)
                  </span>
                )}
                {enemy.omen > 0 && (
                  <span className="bg-[#fce0d8] border border-[#1c1308] text-[#c4321d] text-xs font-black px-2 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
                    <LadaThematicIcon name="omen" size={12} /> +{enemy.omen} Zlověst / Nadechnutí
                    (bonus k příští ráně)
                  </span>
                )}
                {enemy.block > 0 && (
                  <span className="bg-[#dcf0fc] border border-[#1c1308] text-[#1c4b7d] text-xs font-black px-2 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
                    <LadaThematicIcon name="block" size={12} /> {enemy.block} Blok (kryje před
                    zraněním)
                  </span>
                )}
                {enemy.revenge && (
                  <span className="bg-[#fff2be] border border-[#1c1308] text-[#825b0f] text-xs font-black px-2 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
                    <LadaThematicIcon name="speed" size={12} /> Odveta aktivní (při zásahu okamžitě
                    sekne zpět!)
                  </span>
                )}
                {enemy.uskokDodge && (
                  <span className="bg-[#e4f7d7] border border-[#1c1308] text-[#2d6328] text-xs font-black px-2 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
                    <LadaThematicIcon name="dodge" size={12} /> Úskok připraven (vyhne se příštímu
                    útoku)
                  </span>
                )}
                {enemy.stiffen > 0 && (
                  <span className="bg-[#e2eaf5] border border-[#1c1308] text-[#23456b] text-xs font-black px-2 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
                    <LadaThematicIcon name="freeze" size={12} /> Zatuhnutí ({enemy.stiffen} Aug)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Traits & Nature */}
          <div>
            <h4 className="font-title text-sm font-bold text-[#1c1308] mb-1.5 flex items-center gap-1">
              <LadaThematicIcon name="theater" size={14} /> Povaha a zvláštní traity:
            </h4>

            {enemy.traits.length === 0 ? (
              <p className="text-xs italic text-[#705638] bg-[#fffaf0] p-2 rounded-lg border border-[#1c1308]">
                Nemá žádné zvláštní traity — chová se podle obyčejů svého druhu.
              </p>
            ) : (
              <div className="space-y-1.5">
                {enemy.traits.map((t) => {
                  const tr = TRAITS[t];
                  if (!tr) return null;
                  return (
                    <div
                      key={t}
                      className="bg-[#fff8e8] p-2 rounded-lg border border-[#1c1308] flex items-start gap-2 text-xs shadow-2xs"
                    >
                      <span className="bg-[#fce3a8] px-2 py-0.5 rounded font-black text-[#7a4816] border border-[#1c1308] shrink-0">
                        {tr.name}
                      </span>
                      <span className="font-semibold text-[#3b2a1a]">{tr.desc}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Enemy Actions / Cards in Pool */}
          <div>
            <h4 className="font-title text-sm font-bold text-[#1c1308] mb-1.5 flex items-center gap-1">
              <LadaThematicIcon name="draw" size={14} /> Akce v arzenálu bubáka:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pool.map((actId) => {
                const act = ENEMY_ACTIONS[actId] || { name: actId, kind: "Karta", text: "" };
                const isCurrent = actId === enemy.nextAction;

                return (
                  <div
                    key={actId}
                    className={`
                      p-2.5 rounded-xl border-2 flex flex-col justify-between text-xs transition-colors
                      ${isCurrent ? "bg-[#ffd438]/45 border-[#b8331d] shadow-sm ring-1 ring-[#b8331d]" : "bg-[#fffaf0] border-[#1c1308]"}
                    `}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="font-title font-black text-[#1c1308] flex items-center gap-1">
                          <span className="flex items-center">{getActionIcon(actId)}</span>
                          <span>{act.name}</span>
                        </span>
                        <span
                          className={`text-[0.62rem] font-black uppercase px-1.5 py-0.5 rounded border border-[#1c1308] flex items-center gap-0.5 ${
                            isCurrent ? "bg-[#b8331d] text-white" : "bg-[#ebd5a0] text-[#1c1308]"
                          }`}
                        >
                          {isCurrent ? (
                            <>
                              <LadaThematicIcon name="star" size={10} /> Chystá teď
                            </>
                          ) : (
                            act.kind
                          )}
                        </span>
                      </div>
                      <p className="text-[0.72rem] text-[#4a3420] font-semibold leading-tight">
                        {act.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Family Evolutionary Stages (Mládě -> Pokročilý -> Původní -> Elitní) */}
          {tpl.variants && tpl.variants.length > 0 && (
            <div className="bg-[#fcf5e5] p-3 rounded-xl border border-[#1c1308]">
              <h4 className="font-title text-xs font-black text-[#1c1308] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <LadaThematicIcon name="party" size={14} /> Stádia vývoje rodiny:
                </span>
                <span className="text-[0.65rem] text-[#7a5833] font-bold">
                  12 % změna velikosti za stádium
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {tpl.variants.map((v, vidx) => {
                  const isThisOne = vidx === stageIdx;
                  return (
                    <div
                      key={vidx}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        isThisOne
                          ? "bg-[#ffd438]/40 border-[#b8331d] shadow-xs font-black"
                          : "bg-[#fffdf7] border-[#d8c59f] opacity-80"
                      }`}
                    >
                      <div className="text-[0.6rem] font-bold text-[#7a4816] uppercase">
                        {getStageTitle(vidx)}
                      </div>
                      <div className="font-title text-xs text-[#1c1308] truncate" title={v.name}>
                        {v.name}
                      </div>
                      <div className="text-[0.62rem] text-[#543b24] font-bold mt-0.5">
                        Úr. {v.level} · {v.hp} HP · {v.dmg} Útok
                      </div>
                      {isThisOne && (
                        <div className="mt-1 bg-[#1c1308] text-[#ffd438] text-[0.55rem] font-black px-1 rounded-full">
                          ⭐ TENTO BUBÁK
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Habitats / Lore Locations */}
          {tpl.loc && tpl.loc.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap text-[0.72rem] text-[#543b24] font-bold">
              <span className="inline-flex items-center gap-1">
                <LadaThematicIcon name="village" size={13} animated />
                <span>Přirozený výskyt:</span>
              </span>
              {tpl.loc.map((locId) => (
                <span
                  key={locId}
                  className="bg-[#ebd9b5] text-[#1c1308] px-2 py-0.5 rounded-full border border-[#1c1308]/60 text-[0.65rem]"
                >
                  {getLocationName(locId)}
                </span>
              ))}
            </div>
          )}

          {/* Hunter Tip */}
          <div className="bg-[#f0dfb6] p-2.5 rounded-xl border border-[#1c1308] text-[0.72rem] font-semibold text-[#543b24] leading-relaxed flex items-start gap-1.5">
            <LadaThematicIcon name="idea" size={16} animated className="flex-shrink-0 mt-0.5" />
            <div>
              <b>Rada starého lovce:</b> Každé zranění ze soli nebo hole, které projde skrz Blok,
              posune odpočet bubáka o Augenblick dál (1 bod = 1 Aug). Jeho{" "}
              <b>Odolnost ({enemy.odolnost} %)</b> z toho však procento sežere. Sledujte bedlivě
              odpočty a nenechte je dokončit mocné výpady!
            </div>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="mt-3 pt-3 border-t border-[#dfcb9a] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="lada-button lada-button-primary text-xs py-1.5 px-6 shadow-sm"
          >
            Rozumím
          </button>
        </div>
      </div>
    </div>
  );
};
