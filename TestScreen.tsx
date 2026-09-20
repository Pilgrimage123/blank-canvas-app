import React, { useState } from 'react';
import { HeroId, LocationId } from '../../types';
import { HEROES, LOCATIONS } from '../../data/gameData';
import { HunterSprite } from '../sprites/HunterSprite';
import { EnemySprite } from '../sprites/EnemySprite';

interface TestScreenProps {
  onStartFullFight: (heroId: HeroId, locId: LocationId) => void;
  onStartPresetFight: (count: number, heroId: HeroId, locId: LocationId) => void;
  onBack: () => void;
  onOpenBestiary?: () => void;
}

export const TestScreen: React.FC<TestScreenProps> = ({
  onStartFullFight,
  onStartPresetFight,
  onBack,
  onOpenBestiary
}) => {
  const [selectedHero, setSelectedHero] = useState<HeroId>('pobuda');
  const [selectedLoc, setSelectedLoc] = useState<LocationId>('vesnice');

  const eightEnemiesPreview = [
    { name: 'Bubák od stodoly', type: 'bubak', role: 'Linie (Přední řada)' },
    { name: 'Rarášek z pece', type: 'rarasek', role: 'Linie (Přední řada)' },
    { name: 'Starý kostlivec', type: 'kostlivec', role: 'Linie (Přední řada)' },
    { name: 'Divoch helkal', type: 'helkal', role: 'Linie (Přední řada)' },
    { name: 'Hastrman od stoky', type: 'vodnik', role: 'Dělostřelba (Zadní řada)' },
    { name: 'Polednice', type: 'polednice', role: 'Podpora (Zadní řada)' },
    { name: 'Mrtvák ze škarpy', type: 'mrtvak', role: 'Podpora (Zadní řada)' },
    { name: 'Klekánice z šera', type: 'klekanice', role: 'Podpora (Zadní řada)' }
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen bg-parchment-pattern p-2 sm:p-4 select-none overflow-y-auto justify-between">
      {/* 1. HEADER */}
      <div className="flex-none mb-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2 bg-[#eedcb0] px-4 py-2.5 rounded-2xl border-3 border-[#1c1308] shadow-[0_4px_0_#1c1308]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧪</span>
            <div>
              <h1 className="font-title font-black text-lg sm:text-xl text-[#1c1308] leading-tight">
                Zkušebna a testovací aréna
              </h1>
              <p className="text-xs text-[#5c3e21] font-bold">
                Testovací bitevní pole pro 8 bubáků ve dvou řadách
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenBestiary && (
              <button
                type="button"
                onClick={onOpenBestiary}
                className="bg-[#ffd438] hover:bg-[#ffe066] text-[#1c1308] border-2 border-[#1c1308] font-title font-black text-xs sm:text-sm px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Otevřít přehled všech rodin a členů bubáků"
              >
                <span>📖</span>
                <span>Přehled bubáků</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBack}
              className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              title="Vrátit se na titulní obrazovku"
            >
              <span>🔙</span>
              <span>Zpět do menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN TEST CONTENT */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col gap-3 sm:gap-4 justify-center">
        {/* HERO CARD: PRIMARY TEST BUTTON (PLNÝ POČET BUBÁKŮ) */}
        <div className="bg-gradient-to-br from-[#fff7dd] to-[#fceac4] p-4 sm:p-6 rounded-2xl border-3 border-[#1c1308] shadow-[0_5px_0_#1c1308] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-[#c4321d] text-white px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-[#1c1308]">
                ⚡ Hlavní testovací souboj
              </div>
              <h2 className="font-title font-black text-xl sm:text-2xl text-[#1c1308] mb-1">
                Souboj: Plný počet bubáků
              </h2>
              <p className="text-xs sm:text-sm text-[#4a3520] font-medium leading-relaxed max-w-xl">
                Rozpočet střetu je navýšen, aby pokryl <strong>všech 8 bubáků</strong>, 
                kde je <strong>každý jiného typu</strong>. Bubáci se rozestaví ve dvou řadách 
                po čtyřech (4 v přední řadě na cestě a 4 v zadní řadě na vyvýšeném travnatém břehu).
              </p>
            </div>

            <button
              type="button"
              onClick={() => onStartFullFight(selectedHero, selectedLoc)}
              className="flex-none bg-gradient-to-r from-[#e63e1e] to-[#c4321d] hover:from-[#f05030] hover:to-[#d63820] text-white font-title font-black text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-3 border-[#1c1308] shadow-[0_4px_0_#1c1308] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center gap-3 animate-pulse"
            >
              <span className="text-2xl">👹</span>
              <div className="text-left">
                <div className="leading-tight">Plný počet bubáků</div>
                <div className="text-[0.7rem] font-bold text-[#ffd438] opacity-95">
                  8 bubáků • 2 řady po 4 • 8 různých druhů
                </div>
              </div>
            </button>
          </div>

          {/* 8 BOGEY PREVIEW CAROUSEL */}
          <div className="mt-4 pt-3 border-t-2 border-[#1c1308]/20">
            <div className="text-xs font-black text-[#5c3e21] mb-2 flex items-center gap-1.5">
              <span>🎭 8 zúčastněných bubáků v sestavě:</span>
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
                    {b.name.split(' ')[0]}
                  </div>
                  <div className="text-[0.55rem] font-bold text-[#7a4f1d] leading-tight">
                    {idx < 4 ? '1. řada' : '2. řada'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CUSTOMIZATION ROW: HERO & LOCATION PICKER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* 1. CHOOSE HERO */}
          <div className="bg-[#fff8e8] p-3 sm:p-4 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308]">
            <div className="font-title font-black text-sm text-[#1c1308] mb-2 flex items-center gap-1.5">
              <span>🏹</span>
              <span>Zvolte lovce pro test:</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(HEROES).map((h) => {
                const isSelected = selectedHero === h.id;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHero(h.id)}
                    className={`
                      p-2 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center
                      ${isSelected
                        ? 'bg-[#ffd438] border-[#1c1308] ring-2 ring-[#e69818] shadow-sm'
                        : 'bg-[#fffaf0] border-[#d4be94] hover:bg-[#fff2cc]'
                      }
                    `}
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <HunterSprite heroId={h.id} size={48} />
                    </div>
                    <div className="font-title font-black text-xs text-[#1c1308] mt-1">
                      {h.name}
                    </div>
                    <div className="text-[0.62rem] text-[#5c3e21] font-bold">
                      {h.breath} nádech • {h.hp} HP
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. CHOOSE LANDSCAPE */}
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
                      ${isSelected
                        ? 'bg-[#ffd438] border-[#1c1308] ring-2 ring-[#e69818] text-[#1c1308] shadow-sm'
                        : 'bg-[#fffaf0] border-[#d4be94] text-[#4a3520] hover:bg-[#fff2cc]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-base">{loc.id === 'vesnice' ? '🏡' : loc.id === 'mlyn' ? '🌾' : loc.id === 'les' ? '🌲' : loc.id === 'rybnik' ? '🌊' : loc.id === 'zricenina' ? '🏰' : loc.id === 'hrbitov' ? '🪦' : '🌕'}</span>
                      <span className="truncate">{loc.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECONDARY TEST PRESETS & BESTIARY LINK */}
        <div className="bg-[#eedcb0]/60 p-3 rounded-2xl border-2 border-[#1c1308] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-[#5c3e21]">⚙️ Další sestavy:</span>
            <button
              type="button"
              onClick={() => onStartPresetFight(4, selectedHero, selectedLoc)}
              className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border border-[#1c1308] text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              👥 Hlídka (4)
            </button>
            <button
              type="button"
              onClick={() => onStartPresetFight(2, selectedHero, selectedLoc)}
              className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border border-[#1c1308] text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95"
            >
              ⚔️ Dvojice (2)
            </button>
            <button
              type="button"
              onClick={() => onStartPresetFight(-1, selectedHero, selectedLoc)}
              className="bg-[#ffeed1] hover:bg-[#ffd438] text-[#1c1308] border border-[#1c1308] text-xs font-black px-2.5 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center gap-1"
              title="Vyzkoušet loupežnickou bandu (Loupežník a Lupič)"
            >
              <span>🌲</span>
              <span>Loupežníci</span>
            </button>
            <button
              type="button"
              onClick={() => onStartPresetFight(-2, selectedHero, selectedLoc)}
              className="bg-[#e2f0d9] hover:bg-[#c5e0b4] text-[#1c1308] border border-[#1c1308] text-xs font-black px-2.5 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center gap-1"
              title="Vyzkoušet novou 1. úroveň: Ropucha, Ohnivý kohout, Černý pes (barghest)"
            >
              <span>🐸</span>
              <span>Úroveň 1 (3)</span>
            </button>
            <button
              type="button"
              onClick={() => onStartPresetFight(-3, selectedHero, selectedLoc)}
              className="bg-[#e8f1f5] hover:bg-[#cfe2f3] text-[#1c1308] border border-[#1c1308] text-xs font-black px-2.5 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center gap-1"
              title="Vyzkoušet novou 2. úroveň: Divoženka, Jeskyňka, Létající rarach, Lesní muž"
            >
              <span>🧚</span>
              <span>Úroveň 2 (4)</span>
            </button>
            <button
              type="button"
              onClick={() => onStartPresetFight(-4, selectedHero, selectedLoc)}
              className="bg-[#fce5cd] hover:bg-[#f9cb9c] text-[#1c1308] border border-[#1c1308] text-xs font-black px-2.5 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center gap-1"
              title="Vyzkoušet novou 3. úroveň: Rusalka a Permoník"
            >
              <span>🌊</span>
              <span>Úroveň 3 (2)</span>
            </button>
            <button
              type="button"
              onClick={() => onStartPresetFight(-5, selectedHero, selectedLoc)}
              className="bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#1c1308] border border-[#1c1308] text-xs font-black px-2.5 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center gap-1"
              title="Vyzkoušet celou rodinu Permoníků (všichni 4 členové s pastelovými čapkami a krumpáči)"
            >
              <span>⛏️</span>
              <span>Permoníci (4)</span>
            </button>
          </div>

          {onOpenBestiary && (
            <button
              type="button"
              onClick={onOpenBestiary}
              className="bg-[#ffd438] hover:bg-[#ffe066] text-[#1c1308] border border-[#1c1308] text-xs font-black px-3 py-1 rounded-xl shadow-xs cursor-pointer transition-transform active:scale-95 flex items-center gap-1"
            >
              <span>📖</span>
              <span>Přehled všech bubáků</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. FOOTER HINT & BACK BUTTON */}
      <div className="flex-none max-w-4xl mx-auto w-full flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#1c1308]/15">
        <button
          type="button"
          onClick={onBack}
          className="bg-[#eedcb0] hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] text-xs font-black px-3.5 py-1.5 rounded-xl cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
        >
          <span>⬅️</span>
          <span>Zpět do menu</span>
        </button>
        <div className="text-xs text-[#5c3e21] font-bold text-right">
          💡 Ve střetu můžete testovat zásahy jednotlivců i plošné karty (<span className="text-[#1c1308] underline">řada</span>), které zraní všechny bubáky v cílové řadě.
        </div>
      </div>
    </div>
  );
};
