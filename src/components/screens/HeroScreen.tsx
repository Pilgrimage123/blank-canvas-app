import React, { useState } from "react";
import { HEROES } from "../../data/gameData";
import { HunterSprite } from "../sprites/HunterSprite";
import { HeroDetailModal } from "../modals/HeroDetailModal";

interface HeroScreenProps {
  onSelectHero: (heroId: string) => void;
  onBack: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ onSelectHero, onBack }) => {
  const [detailHeroId, setDetailHeroId] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-parchment-pattern p-4 sm:p-6 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full mb-6">
        <div>
          <h2 className="font-title text-3xl font-black text-[#1c1308]">Kdo jde na bubáky</h2>
          <p className="text-sm font-bold text-[#694825]">
            Klikněte na libovolnou kartu pro kompletní informace, rozpis balíčku a taktické rady.
          </p>
        </div>
        <button type="button" onClick={onBack} className="lada-button text-sm py-2 px-4">
          ⬅️ Zpět
        </button>
      </div>

      {/* Hero Selection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full my-auto pb-6">
        {Object.values(HEROES).map((h) => {
          return (
            <div
              key={h.id}
              onClick={() => setDetailHeroId(h.id)}
              className="lada-card p-5 flex flex-col justify-between cursor-pointer border-3 hover:-translate-y-2 hover:shadow-[6px_8px_0_rgba(28,19,8,0.4)] transition-all bg-[#fffaf0] group relative"
            >
              <div>
                {/* Hero Header & Sprite - Interactive Expandable Box */}
                <div className="relative flex flex-col items-center bg-[#f0dfb6] rounded-xl p-3 border-2 border-[#1c1308] mb-4 group-hover:bg-[#ebd39e] transition-colors shadow-xs">
                  <span className="absolute -top-2.5 right-2 bg-[#ffd438] text-[#1c1308] text-[0.62rem] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#1c1308] shadow-xs flex items-center gap-1">
                    <span>🔍</span> Podrobnosti
                  </span>
                  <HunterSprite heroId={h.id} size={110} />
                  <h3 className="font-title text-xl font-bold text-[#1c1308] mt-1 text-center">
                    {h.name}
                  </h3>
                  <span className="text-[0.68rem] text-[#694825] font-bold mt-0.5 flex items-center gap-1">
                    <span>📖</span> Klikněte pro rozkliknutí
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-semibold text-[#3b2a1a] mb-3 leading-relaxed">
                  {h.desc}
                </p>

                {/* Combat Stats Breakdown */}
                <div className="bg-[#f6ebd0] p-3 rounded-lg border border-[#1c1308] text-xs font-bold text-[#2a1c10] space-y-1.5 mb-3">
                  <div className="flex justify-between">
                    <span>❤️ Životy:</span>
                    <span className="font-black text-[#b8331d]">{h.hp} HP</span>
                  </div>
                  <div
                    className="flex justify-between"
                    title="Nástup před bojem: 50 − Připravenost (vyšší = dřívější tah!)"
                  >
                    <span>⚡ Připravenost:</span>
                    <span className="font-black text-[#1c4b7d]">
                      {h.ready}{" "}
                      <span className="text-[0.68rem] text-[#4d3621] font-normal">
                        ({50 - h.ready} Aug)
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>🪙 Počáteční krejcary:</span>
                    <span className="font-black text-[#d69818]">{h.salt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>😮‍💨 Nádech / Spánek:</span>
                    <span>
                      +{h.breath} Akcí / −{h.sleepFat} Únavy
                    </span>
                  </div>
                  {h.krizBonus && (
                    <div className="flex justify-between text-[#1c4b7d]">
                      <span>✝️ Křížový bonus:</span>
                      <span className="font-black">+{h.krizBonus} Blok navíc</span>
                    </div>
                  )}
                </div>

                {/* Special Ability Pill */}
                <div className="bg-[#fdeed6] p-2.5 rounded-lg border border-[#d69818] text-xs font-bold mb-3">
                  <div className="text-[#8c5614] uppercase tracking-wider text-[0.65rem] font-black mb-0.5">
                    Unikátní speciál
                  </div>
                  <div className="text-[#1c1308] font-black">{h.special.name}</div>
                  <div className="text-[0.7rem] text-[#543b24] font-semibold mt-0.5">
                    {h.special.dmg
                      ? `Zásah ${h.special.dmg} HP ${h.special.dot ? `+ Sůl na kůži ${h.special.dot}` : ""} · `
                      : ""}
                    {h.special.block ? `Získá +${h.special.block} Blok · ` : ""}
                    {h.special.draw ? `Lízne ${h.special.draw} karty · ` : ""}
                    {h.special.fat ? `Únava ${h.special.fat} · ` : ""}
                    Ochlazení {h.special.cd} Aug.
                  </div>
                </div>
              </div>

              {/* Action Buttons: Detail Inspection & Direct Selection */}
              <div className="flex gap-2 pt-2 border-t border-[#ebd8b0]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailHeroId(h.id);
                  }}
                  className="lada-button py-2 px-3 text-xs font-bold flex-1 bg-[#fff8e8] hover:bg-[#ffefc2]"
                  title="Rozkliknout kompletní informace o postavě"
                >
                  🔍 Podrobnosti
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHero(h.id);
                  }}
                  className="lada-button lada-button-primary py-2 px-3 text-xs font-black shadow-[0_2px_0_#1c1308] flex-1"
                >
                  ⚔️ Vybrat
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Hero Detail Modal */}
      {detailHeroId && HEROES[detailHeroId] && (
        <HeroDetailModal
          hero={HEROES[detailHeroId]}
          onSelect={(heroId) => {
            setDetailHeroId(null);
            onSelectHero(heroId);
          }}
          onClose={() => setDetailHeroId(null)}
        />
      )}
    </div>
  );
};
