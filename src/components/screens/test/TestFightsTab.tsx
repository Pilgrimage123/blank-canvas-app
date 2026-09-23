import React from "react";
import { HeroId, LocationId } from "../../../types";
import { HEROES, LOCATIONS } from "../../../data/gameData";
import { HunterSprite } from "../../sprites/HunterSprite";
import { EnemySprite } from "../../sprites/EnemySprite";

interface TestFightsTabProps {
  selectedHero: HeroId;
  setSelectedHero: (hero: HeroId) => void;
  selectedLoc: LocationId;
  setSelectedLoc: (loc: LocationId) => void;
  onStartFullFight: (heroId: HeroId, locId: LocationId) => void;
  onStartPresetFight: (count: number, heroId: HeroId, locId: LocationId) => void;
}

export const TestFightsTab: React.FC<TestFightsTabProps> = ({
  selectedHero,
  setSelectedHero,
  selectedLoc,
  setSelectedLoc,
  onStartFullFight,
  onStartPresetFight,
}) => {
  const eightEnemiesPreview = [
    { name: "Bubák od stodoly", type: "bubak", role: "Linie (Dolní řada)" },
    { name: "Rarášek z pece", type: "rarasek", role: "Linie (Dolní řada)" },
    { name: "Starý kostlivec", type: "kostlivec", role: "Linie (Dolní řada)" },
    { name: "Divoch hejkal", type: "helkal", role: "Linie (Dolní řada)" },
    { name: "Hastrman od stoky", type: "vodnik", role: "Dělostřelba (Horní řada)" },
    { name: "Polednice", type: "polednice", role: "Podpora (Horní řada)" },
    { name: "Mrtvák ze škarpy", type: "mrtvak", role: "Podpora (Horní řada)" },
    { name: "Klekánice z šera", type: "klekanice", role: "Podpora (Horní řada)" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto w-full pb-4">
      {/* 1. HERO BANNER: HLAVNÍ TESTOVACÍ SOUBOJ (PLNÝ POČET 8 BUBÁKŮ) */}
      <div className="bg-gradient-to-br from-[#fff7dd] to-[#fceac4] p-4 sm:p-5 rounded-2xl border-3 border-[#1c1308] shadow-[0_5px_0_#1c1308] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#c4321d] text-white px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-[#1c1308]">
              ⚡ Hlavní testovací souboj
            </div>
            <h2 className="font-title font-black text-xl sm:text-2xl text-[#1c1308] mb-1">
              Plný počet bubáků (8 protivníků)
            </h2>
            <p className="text-xs sm:text-sm text-[#4a3520] font-medium leading-relaxed max-w-xl">
              Rozpočet střetu je navýšen, aby pokryl <strong>všech 8 bubáků</strong>, kde je{" "}
              <strong>každý jiného druhu</strong>. Rozestaví se ve dvou řadách po čtyřech: 4 v dolní
              řadě na cestě a 4 v horní řadě na vyvýšeném břehu.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onStartFullFight(selectedHero, selectedLoc)}
            className="flex-none bg-gradient-to-r from-[#e63e1e] to-[#c4321d] hover:from-[#f05030] hover:to-[#d63820] text-white font-title font-black text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-3 border-[#1c1308] shadow-[0_4px_0_#1c1308] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center gap-3 animate-pulse"
          >
            <span className="text-2xl">👹</span>
            <div className="text-left">
              <div className="leading-tight">Spustit plný střet</div>
              <div className="text-[0.7rem] font-bold text-[#ffd438] opacity-95">
                8 bubáků • 2 řady po 4 • 8 různých druhů
              </div>
            </div>
          </button>
        </div>

        {/* 8 BOGEY PREVIEW ROW */}
        <div className="mt-4 pt-3 border-t-2 border-[#1c1308]/20">
          <div className="text-xs font-black text-[#5c3e21] mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>🎭</span>
              <span>8 zúčastněných bubáků v sestavě:</span>
            </span>
            <span className="text-[0.65rem] text-[#8c5614] font-bold">
              Dolní řada (cesta) + Horní řada (vyvýšený břeh)
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {eightEnemiesPreview.map((b, idx) => (
              <div
                key={b.name}
                className="bg-[#fffdf5] p-1.5 rounded-xl border border-[#1c1308] flex flex-col items-center text-center shadow-xs"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <EnemySprite type={b.type} size={42} />
                </div>
                <div className="font-title font-black text-[0.65rem] text-[#1c1308] truncate w-full mt-0.5">
                  {b.name.split(" ")[0]}
                </div>
                <div
                  className={`text-[0.55rem] font-black px-1 rounded-sm mt-0.5 ${
                    idx < 4 ? "bg-[#eedcb0] text-[#5c3e21]" : "bg-[#dbeafe] text-[#1e3a8a]"
                  }`}
                >
                  {idx < 4 ? "Dolní řada" : "Horní řada"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 bg-[#fff8e8] border border-[#1c1308] p-2.5 rounded-xl flex items-center gap-2.5 text-xs text-[#5c3e21]">
            <span className="text-xl flex-none">🏳️</span>
            <div>
              <strong className="text-[#1c1308]">Nové tlačítko v boji: „Vyřaď bubáka“</strong>
              <p className="text-[0.72rem] text-[#6e502c] mt-0.5 leading-snug">
                Přímo v testovacím boji můžete kdykoliv kliknout na tlačítko{" "}
                <strong>„Vyřaď bubáka“</strong> a následně kliknout na libovolného bubáka na bojišti
                — ten se ihned vzdá a můžete detailně otestovat jeho ústup a 3sekundový posun
                následovníků v řadě!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CUSTOMIZATION: HERO & LOCATION PICKER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* CHOOSE HERO */}
        <div className="bg-[#fff8e8] p-3 sm:p-4 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308]">
          <div className="font-title font-black text-sm text-[#1c1308] mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span>🏹</span>
              <span>Zvolte lovce pro test:</span>
            </div>
            <span className="text-[0.68rem] bg-[#ffd438] text-[#1c1308] px-2 py-0.5 rounded-full border border-[#1c1308] font-black">
              {HEROES[selectedHero]?.name || selectedHero}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.values(HEROES).map((h) => {
              const isSelected = selectedHero === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setSelectedHero(h.id)}
                  className={`
                    p-2 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between
                    ${
                      isSelected
                        ? "bg-[#ffd438] border-[#1c1308] ring-2 ring-[#e69818] shadow-sm"
                        : "bg-[#fffaf0] border-[#d4be94] hover:bg-[#fff2cc]"
                    }
                  `}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <HunterSprite heroId={h.id} size={46} />
                  </div>
                  <div className="font-title font-black text-[0.72rem] text-[#1c1308] mt-1 leading-tight line-clamp-1">
                    {h.name.split(" ")[0]}
                  </div>
                  <div className="text-[0.6rem] text-[#5c3e21] font-bold mt-0.5">
                    {h.hp} HP • {h.breath} dech
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CHOOSE LANDSCAPE */}
        <div className="bg-[#fff8e8] p-3 sm:p-4 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308]">
          <div className="font-title font-black text-sm text-[#1c1308] mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span>🏞️</span>
              <span>Zvolte krajinu pro test:</span>
            </div>
            <span className="text-[0.68rem] bg-[#ffd438] text-[#1c1308] px-2 py-0.5 rounded-full border border-[#1c1308] font-black">
              {LOCATIONS.find((l) => l.id === selectedLoc)?.name || selectedLoc}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {LOCATIONS.map((loc) => {
              const isSelected = selectedLoc === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLoc(loc.id)}
                  className={`
                    px-2.5 py-2 rounded-xl border-2 text-xs font-black transition-all cursor-pointer text-left flex items-center justify-between gap-1
                    ${
                      isSelected
                        ? "bg-[#ffd438] border-[#1c1308] ring-2 ring-[#e69818] text-[#1c1308] shadow-sm"
                        : "bg-[#fffaf0] border-[#d4be94] text-[#4a3520] hover:bg-[#fff2cc]"
                    }
                  `}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-base">
                      {loc.id === "vesnice"
                        ? "🏡"
                        : loc.id === "mlyn"
                          ? "🌾"
                          : loc.id === "les"
                            ? "🌲"
                            : loc.id === "rybnik"
                              ? "🌊"
                              : loc.id === "zricenina"
                                ? "🏰"
                                : loc.id === "hrbitov"
                                  ? "🪦"
                                  : "🌑"}
                    </span>
                    <span className="truncate">{loc.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. QUICK FIGHT PRESETS */}
      <div className="bg-[#fff9ea] p-3 sm:p-4 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308]">
        <div className="font-title font-black text-sm text-[#1c1308] mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span>⚙️</span>
            <span>Rychlé tematické sestavy střetů:</span>
          </div>
          <span className="text-[0.68rem] text-[#6b4721] font-bold">
            Spustí střet s vybraným hrdinou a krajinou
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => onStartPresetFight(4, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#fffdf7] hover:bg-[#ffd438] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>👥</span>
              <span>Hlídka (4)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">
              Klasická 4-členná četa bubáků
            </div>
          </button>

          <button
            type="button"
            onClick={() => onStartPresetFight(2, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#fffdf7] hover:bg-[#ffd438] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>⚔️</span>
              <span>Dvojice (2)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">Rychlý souboj 1 na 2</div>
          </button>

          <button
            type="button"
            onClick={() => onStartPresetFight(-1, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#ffeed1] hover:bg-[#ffd438] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>🌲</span>
              <span>Loupežníci (2)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">
              Sarka Farka & Lupič s bambitkou
            </div>
          </button>

          <button
            type="button"
            onClick={() => onStartPresetFight(-2, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#e2f0d9] hover:bg-[#c5e0b4] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>🐸</span>
              <span>Úroveň 1 (3)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">
              Ropucha, Ohnivý kohout, Černý pes
            </div>
          </button>

          <button
            type="button"
            onClick={() => onStartPresetFight(-3, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#e8f1f5] hover:bg-[#cfe2f3] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>🧚</span>
              <span>Úroveň 2 (4)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">
              Divoženka, Jeskyňka, Rarach, Lesní muž
            </div>
          </button>

          <button
            type="button"
            onClick={() => onStartPresetFight(-4, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#fce5cd] hover:bg-[#f9cb9c] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>🌊</span>
              <span>Úroveň 3 (2)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">
              Půvabná Rusalka & Permoník
            </div>
          </button>

          <button
            type="button"
            onClick={() => onStartPresetFight(-5, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#dbeafe] hover:bg-[#bfdbfe] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>⛏️</span>
              <span>Permoníci (4)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">
              Celá havířská rodinka permoníků
            </div>
          </button>

          <button
            type="button"
            onClick={() => onStartPresetFight(-6, selectedHero, selectedLoc)}
            className="p-2.5 rounded-xl border-2 border-[#1c1308] bg-[#f6e3cf] hover:bg-[#eed0b2] text-left transition-all cursor-pointer shadow-xs active:scale-95 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 font-title font-black text-xs text-[#1c1308]">
              <span>🦊</span>
              <span>Nové rodiny (3)</span>
            </div>
            <div className="text-[0.62rem] text-[#6b4721] font-bold mt-1">
              Kmotra liška, Čert elegán, Lotr intelektuál
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
