import React, { useState } from 'react';
import { ENEMY_DB, TRAITS, ENEMY_ACTIONS, LOCATIONS } from '../../data/gameData';
import { EnemySprite, getStagePercent } from '../sprites/EnemySprite';

interface BestiaryModalProps {
  onClose: () => void;
}

export const BestiaryModal: React.FC<BestiaryModalProps> = ({ onClose }) => {
  const [selectedLocFilter, setSelectedLocFilter] = useState<string>('all');
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [inspectedMember, setInspectedMember] = useState<{
    family: (typeof uniqueFamilies)[0];
    variantIndex: number;
  } | null>(null);

  // Group enemies so certik and rarasek don't duplicate needlessly, or show unique archetypes
  const uniqueFamilies = ENEMY_DB.filter((e, idx, arr) => arr.findIndex((x) => x.id === e.id) === idx);

  const filteredFamilies = uniqueFamilies.filter((family) => {
    if (selectedLocFilter !== 'all' && !family.loc.includes(selectedLocFilter as any)) {
      return false;
    }
    if (selectedFamilyId && family.id !== selectedFamilyId) {
      return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1308]/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 select-none animate-fade-in">
      <div className="bg-[#fff8e8] w-full max-w-4xl max-h-[92vh] rounded-2xl sm:rounded-3xl border-3 border-[#1c1308] shadow-[0_10px_0_#1c1308] flex flex-col overflow-hidden">
        {/* MODAL HEADER */}
        <div className="flex-none bg-[#eedcb0] px-4 py-3 sm:px-6 sm:py-4 border-b-3 border-[#1c1308] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">📖</span>
            <div>
              <h2 className="font-title font-black text-lg sm:text-xl text-[#1c1308] leading-tight">
                Přehled všech bubáků (Pohádkový bestiář)
              </h2>
              <p className="text-xs sm:text-sm text-[#5c3e21] font-bold">
                Kompletní soupis všech rodin strašidel, jejich členů, úrovní a záludností
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95"
            title="Zavřít bestiář (ESC)"
          >
            ✕
          </button>
        </div>

        {/* CONTROLS & FILTER BAR */}
        <div className="flex-none bg-[#f5e9ce] px-4 py-2.5 border-b-2 border-[#1c1308]/20 flex flex-wrap items-center justify-between gap-2">
          {/* Location filter pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-[#4a3219] mr-1">📍 Krajina:</span>
            <button
              type="button"
              onClick={() => setSelectedLocFilter('all')}
              className={`px-2 py-0.8 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                selectedLocFilter === 'all'
                  ? 'bg-[#1c1308] text-[#ffd438] border-[#1c1308]'
                  : 'bg-[#fffaf0] text-[#1c1308] border-[#d4be94] hover:bg-[#fff2cc]'
              }`}
            >
              Všechny ({uniqueFamilies.length})
            </button>
            {LOCATIONS.map((loc) => {
              const count = uniqueFamilies.filter((e) => e.loc.includes(loc.id)).length;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocFilter(loc.id)}
                  className={`px-2 py-0.8 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    selectedLocFilter === loc.id
                      ? 'bg-[#1c1308] text-[#ffd438] border-[#1c1308]'
                      : 'bg-[#fffaf0] text-[#1c1308] border-[#d4be94] hover:bg-[#fff2cc]'
                  }`}
                >
                  {loc.name.split(' ')[0]} ({count})
                </button>
              );
            })}
          </div>

          {/* Reset family selection filter if active */}
          {selectedFamilyId && (
            <button
              type="button"
              onClick={() => setSelectedFamilyId(null)}
              className="text-xs bg-[#c4321d] text-white px-2 py-0.5 rounded-md font-bold hover:bg-[#d63d26] cursor-pointer"
            >
              Zobrazit všechny rodiny ✕
            </button>
          )}
        </div>

        {/* SCROLLABLE BESTIARY CONTENT */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          {filteredFamilies.length === 0 ? (
            <div className="text-center py-10 font-bold text-[#664b30]">
              V této vybrané krajině se žádní bubáci nezdržují.
            </div>
          ) : (
            filteredFamilies.map((family) => {
              const locNames = family.loc
                .map((lid) => LOCATIONS.find((l) => l.id === lid)?.name || lid)
                .join(' • ');

              const familySpriteType = family.id === 'hrobnik' ? 'hrobnik' : (family.id === 'rarasek' ? 'rarasek' : family.type || family.id);

              return (
                <div
                  key={family.id}
                  className="bg-[#fffdf7] rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] overflow-hidden p-3 sm:p-4"
                >
                  {/* FAMILY HEADER */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#ecd4a8]">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#eedcb0] rounded-xl border-2 border-[#1c1308] flex items-center justify-center p-1 relative shadow-inner shrink-0">
                        <EnemySprite type={familySpriteType} size={64} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-title font-black text-base sm:text-lg text-[#1c1308]">
                            {family.name}
                          </h3>
                          <span className="bg-[#ecd9b5] text-[#4a2e12] border border-[#1c1308] px-2 py-0.2 rounded-full text-[0.65rem] font-black uppercase tracking-wider">
                            Druh: {family.type}
                          </span>
                        </div>
                        <div className="text-xs text-[#5c3e21] font-bold mt-0.5">
                          📍 Výskyt: {locNames}
                        </div>
                        {/* Traits */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {family.traits.length === 0 ? (
                            <span className="text-[0.68rem] text-[#856545] italic">Bez zvláštní slabiny či daru</span>
                          ) : (
                            family.traits.map((traitKey) => {
                              const tr = TRAITS[traitKey];
                              return (
                                <span
                                  key={traitKey}
                                  className="bg-[#ffe8b3] text-[#1c1308] border border-[#1c1308] text-[0.65rem] font-bold px-1.5 py-0.2 rounded-md"
                                  title={tr?.desc}
                                >
                                  ✨ {tr?.name || traitKey}: {tr?.desc}
                                </span>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Basic combat baseline */}
                    <div className="bg-[#eedcb0]/60 px-3 py-1.5 rounded-xl border border-[#1c1308]/40 text-left sm:text-right shrink-0 text-xs text-[#4a3520] font-bold">
                      <div>Základní interval: <span className="font-black text-[#1c1308]">{family.interval} Aug</span></div>
                      <div>Připravenost: <span className="font-black text-[#1c1308]">{family.ready} Aug</span></div>
                      <div>Odolnost: <span className="font-black text-[#1c1308]">{family.odolnost} %</span></div>
                    </div>
                  </div>

                  {/* ACTION POOL */}
                  <div className="mt-2.5 pt-2 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="font-black text-[#4a3219]">Zásobník lstí a útoků:</span>
                    {family.pool.map((actKey) => {
                      const act = ENEMY_ACTIONS[actKey];
                      return (
                        <span
                          key={actKey}
                          className="bg-[#fff4d1] border border-[#b88c42] text-[#3d270c] px-2 py-0.5 rounded-lg text-[0.68rem] font-bold"
                          title={act?.text}
                        >
                          {actKey === 'uder' ? '⚔️' : actKey === 'vabnicka' ? '📣' : actKey === 'odveta' ? '⚡' : actKey === 'bafnuti_z_dymky' ? '💨' : actKey === 'rybnicni_mlha' ? '🌫️' : actKey === 'kouzelna_polivcicka' ? '🍲' : '🃏'}{' '}
                          {act?.name || actKey}
                        </span>
                      );
                    })}
                  </div>

                  {/* ALL FAMILY MEMBERS / VARIANTS CARDS WITH LARGE DEDICATED PICTURES */}
                  <div className="mt-3">
                    <div className="font-title font-black text-xs text-[#1c1308] uppercase tracking-wider mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">👥</span>
                        <span>Členové rodiny ({family.variants?.length || 0} vývojové stupně):</span>
                      </div>
                      <span className="text-[0.68rem] text-[#7a5833] font-bold hidden sm:inline">
                        Každý člen má své vlastní vyobrazení a vlastnosti
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {family.variants?.map((v, vidx) => {
                        const memberSpriteType = family.id === 'hrobnik' ? 'hrobnik' : (family.id === 'rarasek' ? 'rarasek' : family.type || family.id);
                        return (
                          <div
                            key={vidx}
                            id={`bestiary-member-${family.id}-${vidx}`}
                            onClick={() => setInspectedMember({ family, variantIndex: vidx })}
                            className="bg-[#fff8e8] hover:bg-[#fffdf7] p-2.5 sm:p-3 rounded-2xl border-2 border-[#1c1308] flex flex-col justify-between shadow-[0_3px_0_#1c1308] hover:shadow-[0_5px_0_#1c1308] hover:-translate-y-1 transition-all duration-150 cursor-pointer group relative"
                            title={`Zobrazit velký portrét pro ${v.name}`}
                          >
                            {/* Member header */}
                            <div>
                              <div className="flex items-center justify-between gap-1 border-b border-[#eedcb0] pb-1.5 mb-1">
                                <span className="font-title font-black text-xs sm:text-sm text-[#1c1308] group-hover:text-[#b8331d] transition-colors truncate" title={v.name}>
                                  {v.name}
                                </span>
                                <span className="bg-[#1c1308] text-[#ffd438] text-[0.62rem] font-black px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
                                  Úr. {v.level}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-[0.65rem] font-bold text-[#7a5833] mb-1">
                                <span className="bg-[#f0e3ca] text-[#4a2e12] px-1.5 py-0.2 rounded border border-[#d6be96]">
                                  {getStageBadge(vidx)} ({getStagePercent(vidx)} %)
                                </span>
                                <span className="text-[0.62rem] text-[#8c6b45] group-hover:text-[#1c1308] font-black transition-colors flex items-center gap-0.5">
                                  <span>🔍</span> Portrét
                                </span>
                              </div>
                            </div>

                            {/* DEDICATED SUFFICIENTLY LARGE PICTURE FRAME */}
                            <div className="w-full h-34 sm:h-38 bg-gradient-to-b from-[#fbf4e4] via-[#f6ebcf] to-[#ecd7b2] rounded-xl border-1.5 border-[#1c1308] flex items-center justify-center relative my-1.5 overflow-hidden shadow-inner group-hover:border-[#b88c42] transition-colors">
                              {/* Soft folklore canvas corners */}
                              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#1c1308]/30" />
                              <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#1c1308]/30" />
                              <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#1c1308]/30" />
                              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#1c1308]/30" />

                              {/* Ambient ground shadow */}
                              <div className="absolute bottom-2 w-20 sm:w-24 h-3.5 bg-[#1c1308]/20 rounded-full blur-[1.5px] pointer-events-none" />

                              {/* Member Sprite with custom variant accessories */}
                              <EnemySprite
                                type={memberSpriteType}
                                variantIndex={vidx}
                                variantName={v.name}
                                variantLevel={v.level}
                                size={96}
                                className="transition-transform duration-200 group-hover:scale-105"
                              />

                              {/* Hover inspect hint */}
                              <div className="absolute inset-x-2 bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-center">
                                <span className="bg-[#1c1308]/85 text-[#ffd438] text-[0.62rem] font-black px-2 py-0.5 rounded-md shadow-xs backdrop-blur-2xs">
                                  Klikni pro detail
                                </span>
                              </div>
                            </div>

                            {/* Combat stats */}
                            <div className="grid grid-cols-2 gap-1.5 text-xs text-[#4a3520] font-bold mt-1">
                              <div className="bg-[#fee8e3] text-[#912313] px-1.5 py-1 rounded-lg text-center border border-[#e8a397] flex items-center justify-center gap-1 shadow-2xs">
                                <span>❤️</span> <span>{v.hp} HP</span>
                              </div>
                              <div className="bg-[#fcf2d9] text-[#784e12] px-1.5 py-1 rounded-lg text-center border border-[#e3c481] flex items-center justify-center gap-1 shadow-2xs">
                                <span>⚔️</span> <span>{v.dmg} Zranění</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="flex-none bg-[#eedcb0] px-4 py-2.5 sm:px-6 sm:py-3 border-t-3 border-[#1c1308] flex items-center justify-between">
          <div className="text-xs text-[#5c3e21] font-bold">
            Celkem evidováno: <span className="font-black text-[#1c1308]">{uniqueFamilies.length} rodin</span> •{' '}
            <span className="font-black text-[#1c1308]">
              {uniqueFamilies.reduce((acc, f) => acc + (f.variants?.length || 0), 0)} strašidel
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#ffd438] hover:bg-[#ffe066] text-[#1c1308] border-2 border-[#1c1308] font-title font-black text-xs sm:text-sm px-4 py-1.5 rounded-xl shadow-[0_2px_0_#1c1308] cursor-pointer transition-transform active:scale-95"
          >
            Rozumím, zavřít
          </button>
        </div>
      </div>

      {/* ENLARGED MEMBER INSPECTION PORTRAIT MODAL */}
      {inspectedMember && inspectedMember.family.variants && (
        <div
          className="fixed inset-0 z-60 bg-[#1c1308]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in"
          onClick={() => setInspectedMember(null)}
        >
          <div
            className="bg-[#fff8e8] w-full max-w-2xl rounded-3xl border-3 border-[#1c1308] shadow-[0_12px_0_#1c1308] flex flex-col overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* INSPECTION HEADER */}
            {(() => {
              const { family, variantIndex } = inspectedMember;
              const v = family.variants[variantIndex] || family.variants[0];
              const memberSpriteType = family.id === 'hrobnik' ? 'hrobnik' : (family.id === 'rarasek' ? 'rarasek' : family.type || family.id);
              const maxVariants = family.variants.length;

              return (
                <>
                  <div className="bg-[#eedcb0] px-4 py-3 sm:px-6 sm:py-3.5 border-b-3 border-[#1c1308] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-title font-black text-lg sm:text-xl text-[#1c1308]">
                          {v.name}
                        </h3>
                        <span className="bg-[#1c1308] text-[#ffd438] text-xs font-black px-2 py-0.5 rounded-full shadow-2xs">
                          Úr. {v.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#5c3e21] font-bold">
                        Rodina: {family.name} • {getStageBadge(variantIndex)} (Stupeň {variantIndex + 1}/{maxVariants} · Velikost {getStagePercent(variantIndex)} %)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInspectedMember(null)}
                      className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95"
                    >
                      ✕
                    </button>
                  </div>

                  {/* INSPECTION BODY */}
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* ENLARGED PORTRAIT FRAME */}
                    <div className="w-48 h-52 sm:w-56 sm:h-60 bg-gradient-to-b from-[#fbf4e4] via-[#f7ebd1] to-[#ecd6ab] rounded-2xl border-2 border-[#1c1308] flex items-center justify-center relative shadow-md shrink-0 overflow-hidden">
                      {/* Photo corners */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#1c1308]/40" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#1c1308]/40" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#1c1308]/40" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#1c1308]/40" />

                      {/* Ground shadow */}
                      <div className="absolute bottom-3 w-32 h-5 bg-[#1c1308]/20 rounded-full blur-[2px] pointer-events-none" />

                      {/* Large Sprite */}
                      <EnemySprite
                        type={memberSpriteType}
                        variantIndex={variantIndex}
                        variantName={v.name}
                        variantLevel={v.level}
                        size={160}
                      />
                    </div>

                    {/* DETAILS & LORE */}
                    <div className="flex-1 space-y-3">
                      {/* Lore blurb */}
                      <div className="bg-[#fffdf7] p-3 rounded-xl border-1.5 border-[#ecd4a8] text-xs sm:text-sm text-[#4a3219] italic leading-relaxed shadow-2xs">
                        "{getMemberLore(family.id, variantIndex, v.name)}"
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                        <div className="bg-[#fee8e3] text-[#912313] p-2 rounded-xl border border-[#e8a397] flex items-center justify-between">
                          <span>❤️ Životy:</span>
                          <span className="font-black text-sm">{v.hp} HP</span>
                        </div>
                        <div className="bg-[#fcf2d9] text-[#784e12] p-2 rounded-xl border border-[#e3c481] flex items-center justify-between">
                          <span>⚔️ Zranění:</span>
                          <span className="font-black text-sm">{v.dmg}</span>
                        </div>
                      </div>

                      {/* Family combat rhythm */}
                      <div className="bg-[#eedcb0]/50 p-2.5 rounded-xl border border-[#1c1308]/20 text-xs text-[#4a3520] space-y-1 font-bold">
                        <div className="flex justify-between">
                          <span>Základní interval akce:</span>
                          <span className="font-black text-[#1c1308]">{family.interval} Aug</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Výchozí připravenost:</span>
                          <span className="font-black text-[#1c1308]">{family.ready} Aug</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Přirozená odolnost:</span>
                          <span className="font-black text-[#1c1308]">{family.odolnost} %</span>
                        </div>
                      </div>

                      {/* Family members selector pills */}
                      <div className="pt-1">
                        <div className="text-[0.68rem] font-black text-[#7a5833] uppercase tracking-wider mb-1">
                          Přepnout vývojový stupeň:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {family.variants.map((varItem, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setInspectedMember({ family, variantIndex: idx })}
                              className={`px-2 py-1 rounded-lg border text-xs font-black cursor-pointer transition-all ${
                                idx === variantIndex
                                  ? 'bg-[#1c1308] text-[#ffd438] border-[#1c1308] scale-105 shadow-2xs'
                                  : 'bg-[#fffdf7] text-[#1c1308] border-[#eedcb0] hover:bg-[#ffeec7]'
                              }`}
                            >
                              {idx + 1}. {varItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INSPECTION FOOTER NAV */}
                  <div className="bg-[#eedcb0] px-4 py-2.5 sm:px-6 sm:py-3 border-t-3 border-[#1c1308] flex items-center justify-between">
                    <button
                      type="button"
                      disabled={variantIndex === 0}
                      onClick={() => setInspectedMember({ family, variantIndex: variantIndex - 1 })}
                      className="bg-[#fff8e8] disabled:opacity-40 disabled:pointer-events-none hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] text-xs font-black px-3 py-1.5 rounded-xl shadow-2xs cursor-pointer transition-transform active:scale-95"
                    >
                      ⬅ Předchozí člen
                    </button>

                    <button
                      type="button"
                      onClick={() => setInspectedMember(null)}
                      className="bg-[#ffd438] hover:bg-[#ffe066] text-[#1c1308] border-2 border-[#1c1308] font-title font-black text-xs px-4 py-1.5 rounded-xl shadow-2xs cursor-pointer transition-transform active:scale-95"
                    >
                      Zpět do přehledu
                    </button>

                    <button
                      type="button"
                      disabled={variantIndex === maxVariants - 1}
                      onClick={() => setInspectedMember({ family, variantIndex: variantIndex + 1 })}
                      className="bg-[#fff8e8] disabled:opacity-40 disabled:pointer-events-none hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] text-xs font-black px-3 py-1.5 rounded-xl shadow-2xs cursor-pointer transition-transform active:scale-95"
                    >
                      Další člen ➔
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

function getStageBadge(vidx: number): string {
  switch (vidx) {
    case 0:
      return '🌱 I. Mládě / Neduživý';
    case 1:
      return '🌿 II. Poutník / Výrostek';
    case 2:
      return '⭐ III. Původní strašidlo';
    case 3:
      return '🔥 IV. Běs / Pán kraje';
    default:
      return `Stupeň ${vidx + 1}`;
  }
}

function getMemberLore(familyId: string, vidx: number, name: string): string {
  const map: Record<string, string[]> = {
    rarasek: [
      'Drobný rozcuchaný rarášek – černé opeřené kuře s vykulenýma očima, co se vyklubalo pod pecí a ještě se sotva drží na pařátkách.',
      'Vyhublý opeřený šotek s rozpřaženými křídly a špičatým zobáčkem, co rád splaší slepice a schovává hospodyním lesklé knoflíky.',
      'Klasický rarášek z českých pohádek – strašidelně roztomilý černý opeřenec s vykulenýma očima, pekelnými růžky ve kštici a dlouhými pařáty.',
      'Pekelný rarášek s ohnivými jiskrami na koncích rozcuchaných per, žhnoucím pohledem a zlatavými spáry, z něhož jde strach i v pravé poledne.'
    ],
    mrtvak: [
      'Ospalý nebožtík, kterému se po obědě nechce vstávat ze škarpy a jen si rovná modrou sedmikrásku za kloboukem.',
      'Zarostlý mechem a lesními houbičkami, trousí za sebou tlející listí a loudá se okolo polních cest.',
      'Klasické strašidlo z ladovských pohádek. Starý kabát se záplatami, v ruce rýč a v ústech dva křivé zuby.',
      'Nese na zádech ulomený náhrobní kámen a v očích mu strašidelně světélkuje tyrkysový bludičkový svit.'
    ],
    bubak: [
      'Malé chlupaté klubíčko ze slámy s náplastí na oušku, které se bojí i hlasitějšího zakokrhání kohouta.',
      'Huňatý výrostek s červeným šátkem a vykukujícíma sovíma očima, co po setmění šramotí v seníku.',
      'Správný ladovský postrach s dřevěnými vidlemi a bramborovým nosem, co hlídá stodolu před zloději obilí.',
      'Obrovitý huňatý běs s havraními pery ve kštici a železnými vidlemi, před nímž utíkají i sousedovic psi.'
    ],
    kostlivec: [
      'Veselý kostitřas s modrým puntíkovaným šátkem a chrastící stehenní kůstkou v ruce.',
      'Ovinutý hřbitovním břečťanem a lesním mechem, klepe kostmi do taktu podzimního větru.',
      'Léty prověřený kostlivec s velkou sukovicí a chřestícími zuby, co rád straší opozdilé koledníky.',
      'Starý pamětník hrusických hrobů s trnovou korunou a nablýskaným zlatým zubem v lebce.'
    ],
    polednice: [
      'Tichý polední vánek v bělostném závoji, co se neslyšně míhá nad zvlněným obilným lánem.',
      'Se snopečkem zralých pšeničných klasů u pasu obchází meze a pole přesně v pravé poledne.',
      'Tradiční babice s rozcuchanými bílými vlasy, záplatovanou zástěrou a ostře nabroušeným srpem.',
      'Rozpálená letním poledním žárem se sluneční korónou za hlavou a rudě planoucím srpem.'
    ],
    helkal: [
      'Rozpustilý lesní skřítek v žaludové čapce, co na pocestné pokřikuje z křoví všelijaké posměšky.',
      'Zahalený v dubovém listí a borovém jehličí, umí dokonale napodobit houkání sýčka i praskot větví.',
      'Obrovitý mechový lesní chasník s dubovým kyjem, který dokáže zařvat přes tři celá polesí.',
      'Lesní vládce s mohutným parožím z dubových větví, jehož řev rozvlní hladinu rybníků i komíny v údolí.'
    ],
    klekanice: [
      'Nenápadná stařenka v šerém fialovém šátku s proutěným košíkem na zbloudilá lesní jablka.',
      'S puntíkovaným šátkem a hůlkou obchází vesnice, jakmile na zvonici odbije večerní klekání.',
      'Hrbatá postava s nůší na zlobivé děti, co nechtěly jít včas domů z návsi na teplou večeři.',
      'Zahalená v nočním šátku posetém hvězdami, na hůlce jí sedí havran a z nůše svítí žlutá lucerna.'
    ],
    hastrman: [
      'Mladý zelený vodníček se žlutým blatouchem za kloboukem a živou rybkou vykukující z kapsy.',
      'V zeleném fraku se šosíky, ze kterých kape čistá voda, bafá z hliněné dýmčičky u mlýnského náhonu.',
      'Ctihodný vodní pán s mosaznými hodinkami na červené stuze, co rád rozmlouvá s panem mlynářem.',
      'Kníže z hlubin se zlatou leknínovou korunou a kapřími šupinami, z dýmky pouští obří kouřové kruhy.'
    ],
    upir: [
      'Plachý noční návštěvník s malými netopýřími křidélky, co chodí potají loudit do maštale teplé podmáslí.',
      'Elegán v černém plášti s rudým hedvábným podšitím, co s oblibou přespává v suchých senících.',
      'S rubínovým přívěskem a kroužícími netopýry rád vypráví strašidelné historky u nočního ohně.',
      'Hradní hrabě se stříbrnou korunkou a zlatým lemováním pláště, nejvznešenější noční strašidlo kraje.'
    ],
    bila: [
      'Mladičký průsvitný duch s modrou hedvábnou mašlí v závoji, co tiše prochází chodbami staré tvrze.',
      'Šlechtična ve špičatém henninu se stříbrnou korunkou a svazkem starobylých hradních klíčů.',
      'Legendární paní hradu s perlovým náhrdelníkem, dlouhým vlajícím závojem a těžkými klíči od komnat.',
      'Vznešená vládkyně v rouchu posetém zlatými hvězdami, obklopená tajuplnou modravou aurou věčnosti.'
    ],
    hrobnik: [
      'Poklidný hřbitovní správce v ošuntělém kabátě, co si u hrobů pokuřuje ze staré hliněné dýmky.',
      'S havraním pérem za kloboukem a pevnou lopatou hlídá večerní klid na starém vesnickém hřbitůvku.',
      'Klasický ladovský hrobník se šedivým plnovousem, červeným nosem a rýčem zaraženým do země.',
      'Tajemný strážce kostnice s lucerničkou z kostí a mlhou plížící se kolem těžkých bot.'
    ],
    ohnivy: [
      'Hravý ohníček poletující nad mezemi, co hází veselé žluté jiskřičky a ohřívá ruce promrzlým pocestným.',
      'Dřevěné uhlí se žhavými puklinami, z něhož líně stoupají tmavé obláčky voňavého březového dýmu.',
      'Planoucí postava s vířící ohnivou hlavou a starou bouřkovou lucernou v ruce.',
      'Vroucí infernální běs se zářící ohnivou korunou a obíhajícími plamennými koulemi.'
    ],
    vodnik: [
      'Mladý správce rákosí s proutěnou píšťalkou a vodnickou čepicí, co hlídá líhně pulců.',
      'Sbírá dušičky do malovaných hrnečků pod starou vrbou u temného hlubokého jezu.',
      'Legendární vládce tůně s mosaznými knoflíky, leknínovým cylindrem a chladivou vodní mlhou.',
      'Pravý král všech českých rybníků se zlatou korunou z leknínů a posvátným zlatým kaprem po boku.'
    ],
    cert: [
      'Čertovský tovaryš v modré zástěře, co v hospodě nalévá pěnivý mok a rovná dubové stoly.',
      'Fikaný karbaník se srdcovým esem za rohem a zlatým řetízkem od cibulových hodinek.',
      'Mocný hospodský pán s mohutnými beraními rohy, červenou vestou a velkým korbelem piva.',
      'Vládce všech čertů s rubínovými kroužky v rozích, zlatou korunou a planoucím pohárem.'
    ],
    pavouk: [
      'Drobný koutníček zpoza kachlových kamen, co tichounce tká jemné pavučinky a chytá mouchy.',
      'Žlutohnědý křižák z trámů stodoly s karmínovým křížem na zádech, co střehne hromadu suchého sena.',
      'Huňatý lesní pavouk s legračními kukadly, co natahuje lepkavá vlákna mezi borůvkami a kapradím.',
      'Vznešený Král sklípkanů z hradní černé hůry s chlupatýma nožkama a magickým Lado-pentagramem na zádech.'
    ],
    pekelne_dudy: [
      'Vyřezávané dudy s malou kozlí hlavičkou, co samy od sebe pískají pod lavicí, jakmile někdo začne tancovat.',
      'Ožehlé kozí dudy ze šenku, co bez dudáka vyfukují dým z měchu a hrají divokou čertovskou polku.',
      'Pověstné čertovy dudy z černého měchu s pravou kozí lebkou, co dupou dřevěnými nožkami do taktu.',
      'Knížecí pekelné dudy se zlatými rohy a planoucíma očima, které hrají tak řízně, až skáčou hrnce z polic.'
    ],
    svitici_oko: [
      'Zvědavé žluté očko vykukující ze škvíry v kamenné zdi, co mrká a zvědavě sleduje každého pocestného.',
      'Zelenkavé bludné světélko vznášející se nad hřbitovní zídkou, co láká opozdilce z bezpečné cesty.',
      'Velké zářící magické oko s obočím z pavučin a mechu, které hlídá zapomenutý hradní poklad.',
      'Vševidoucí běsné oko s hypnotizující plamennou aurou, před jehož uhrančivým pohledem tuhnou nohy.'
    ],
    netopyr: [
      'Malý ušatý netopýrek z půdy s hebkým kožíškem, co přes den spí zavěšený na starém trámu a v noci švitoří.',
      'Hbitý hradní netopýr s širokými křídly a špičatými oušky, co krouží kolem věží a plaší sovy.',
      'Lesní noční letec, co se střemhlav vrhá z větví starých dubů a sviští vzduchem tišeji než padající listí.',
      'Vampýří král netopýrů s rudýma očkama, ostrými drápky na křídlech a majestátním nočním letem.'
    ],
    certova_babicka: [
      'Pekelná babička chůva v puntíkované zástěře s vařečkou v ruce, co fouká malým čertíkům na odřená kopýtka.',
      'Hospodyně z pekla s kulatými brýlemi na špičce nosu a kouřící hliněnou dýmkou, co vymetá saze z pece.',
      'Moudrá čertova babička ve vázaném šátku, co má pod čepcem víc rozumu a pekelných kouzel než celé peklo.',
      'Prastará pekelná vládkyně se zlatými rohy a velkým bublajícím kotlíkem kouzelné polévky pro všechna čerťata.'
    ],
    loupeznik: [
      'Neduživý loupežnický učeň s křivou bukovou větví, co se učí strašit pocestné zpod mostku a pořád mu padá velký klobouk do očí.',
      'Rázný hvozdový loupežník se sukovitým kyjem a pírkem za širokým kloboukem, co číhá v borůvčí na panský kočár.',
      'Pověstný svalnatý loupežník Sarka Farka z hlubokých hvozdů s obřím vyřezávaným sukovitým dubovým kyjem, širokým opaskem a zrzavým plnovousem.',
      'Obávaný loupežnický hejtman s okovaným dubovým kmenem pobitým železnými hřeby a zlatými krejcary v měšci, před nímž třesou kolena i královští drábové.'
    ],
    lupic: [
      'Štíhlý a hbitý kapsář ze stezky se dvěma kapesními bambitkami, co se neslyšně míhá mezi smrky a mizí dřív, než se otočíte.',
      'Úskočný lesní lupič v zeleném plášti s mosaznými bambitkami, co umí bleskurychle uskočit před každou ranou za kmen staré lípy.',
      'Klasický štíhlý lupič s dvěma bambitkami s trychtýřovitými hlavněmi napřaženými před sebe, v plandavém klobouku a se zrzavým knírem po vzoru Sarky Farky.',
      'Legendární bambitkový pistolník s nablýskanými dvouhlavňovými bambitkami, z nichž se valí oblaka štiplavého dýmu a sype se olověná krupice.'
    ],
    ropucha: [
      'Drobná zelená ropuška z kaluže u cesty, co zvědavě kouká na svět a ještě jí neodpadl pulčí ocásek.',
      'Bradavičnatá ropucha usazená na vlhkém kameni pod lávkou, co spokojeně kváká a loví noční můry.',
      'Urostlá bahenní ropucha z rákosí s blatouchovým kvítkem za uchem, co z nafouknutého hrdla vydává hluboké hučení.',
      'Velebná královna blátivých ropuch se zlatou leknínovou korunkou, jejíž bradavice se lesknou jak drahokamy.'
    ],
    ohnivy_kohout: [
      'Drobné jiskřivé kuřátko se zvědavým zobáčkem, co z peříček trousí zlatavé plamínky a jiskry do slámy.',
      'Ožehlý kohoutek se zvednutým plamenným hřebínkem, co se učí kokrhat tak divoce, až praskají třísky v plotě.',
      'Pověstný ohnivý kohout vysedávající na doškové střeše stodoly, z jehož ocasních per šlehá opravdový oheň.',
      'Pekelný plamenný kohout se zlatými ostruhami a ohnivou září, jehož ranní zakokrhání vzbudí i spící uhlíky v krbu.'
    ],
    cerny_pes: [
      'Černý voříšek ze hřbitova s huňatým kožíškem a zvědavýma očima, co hlídá hroby a těší se na suchou kůrku chleba.',
      'Hbitý hřbitovní černý chrt s bystrým čenichem a žhnoucíma očkama, co neslyšně obíhá kamenné zídky za soumraku.',
      'Obávaný černý pes s ohnivýma planoucíma očima a kovaným obojkem, z něhož visí přetržený řetěz staré kletby.',
      'Běsný hvozdový barghest opředený děsivou rudou aurou a obřími tesáky, před jehož zavytím tuhne krev v žilách.'
    ],
    divozenka: [
      'Plachá mladá divoženka v šatech z mechového lýka, co vykukuje z lískového keře a hází po pocestných žaludy.',
      'Lesní žínka tanečnice s věnečkem z lesních jahod a jeřabin ve vlasech, co bosýma nohama vydupává kruhy v ranní rose.',
      'Divoženka z hlubokého hvozdu s divokými kaštanovými kadeřemi, co umí přivolat lesní vánek i splašit koně v zápřahu.',
      'Stará matka divoženek s korunou z březových větviček, která zná tajemství všech kořenů a bylin v celém kraji.'
    ],
    jeskynka: [
      'Drobounká modravá jeskyňka s něžnýma špičatýma ušima, co zvědavě prosí za pootevřenými dveřmi: Jen dva prstíčky strčíme...',
      'Lstivá skalní víla s ledově modrou pletí a stříbrnými kadeřemi, co láká neopatrné poutníky k hlubokým skalním propastem.',
      'Jeskyňka s modrou pletí a pronikavýma tyrkysovýma očima, která vládne ostrým křemenným nožem a tichým krokem stínů.',
      'Královna podzemních slují se třpytivou korunou z horských křišťálů a krápníků, vládkyně ticha a chladného kamene.'
    ],
    letajici_rarach: [
      'Prchlivý poletuch velikosti vrabce s netopýřími křídly, co vyletuje z komína a zanechává na bílém prádle černé saze.',
      'Větrný rarach s rohy a špičatým ocáskem, co se točí v meluzíně na střeše a schválně shazuje staré hliněné tašky.',
      'Létající rarach s mosaznými vidličkami a vykulenýma žlutýma očima, co metá jiskry a s chechtotem kličkuje mezi stromy.',
      'Pekelný vichřičný rarach s planoucími křídly a vířivým plamenným ocasem, schopný rozfoukat i vyhaslou kovárnu.'
    ],
    lesni_muz: [
      'Malý mechový mužík obrostlý mladým lišejníkem a borůvčím, co sedí na pařezu a rád louská lískové oříšky.',
      'Kůrový lesní divoch s plnovousem ze suchého jehličí a velkým bramborovým nosem, co hlídá houbařská zákoutí.',
      'Statný lesní muž z doubravy s vyvráceným mladým březovým kmenem v ruce, jehož mohutný krok rozechvívá mech pod nohama.',
      'Prastarý ochránce hvozdu s korunou ze živého dubového větví a mohutnými choroši na uších, nejstarší pamětník lesa.'
    ],
    rusalka: [
      'Plachá rusalenka ze strouhy s jemnými zelenými vlásky, co si u tůňky čepelem leknínu češe své pramínky.',
      'Tančící rusalka od mlýnského jezu v lehkém vodním závoji, co za měsíčního svitu láká rybáře do chladivé hlubiny.',
      'Zrádná rusalka z Olšového rybníka se smaragdovýma očima a leknínovým věncem, jejíž líbezný zpěv uspává unavené poutníky.',
      'Vládkyně leknínových vod se zlatou čelenkou a perlovými kapkami rosy, paní všech tichých jezer a lesních pramenů.'
    ],
    permonik: [
      'Drobný důlní permoníček ze štoly s dlouhou špičatou pomněnkovou čapkou s rolničkou a lehkým jasanovým krumpáčkem, co varovným ťukáním pomáhá poctivým havířům.',
      'Pracovitý havířský permoník s dlouhou špičatou meruňkovou čapkou, zrzavým knírem a oboustranným kovaným krumpáčem v poctivé havířské zástěře (flekli).',
      'Zkušený skalní permoník s dlouhou špičatou šalvějovou čapkou, bělostným vousem po pás, těžkým skalním krumpáčem a mosazným kahancem, bafající z fajfky.',
      'Velebný starohorský důlní mistr s dlouhou špičatou levandulovou čapkou se zlatým lemem, zapleteným stříbrným vousem a mistrovským vyřezávaným krumpáčem z černého dubu.'
    ]
  };

  const list = map[familyId];
  if (list && list[vidx]) return list[vidx];
  return `Člen rodiny strašidel ${name} (vývojový stupeň ${vidx + 1}), známý svými svébytnými kousky v okolních vesnicích.`;
}

