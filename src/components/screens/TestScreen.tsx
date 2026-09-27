import React, { useState } from "react";
import { HeroId, LocationId } from "../../types";
import { TestFightsTab } from "./test/TestFightsTab";
import { TestAnimationsTab } from "./test/TestAnimationsTab";
import { TestLandscapesTab } from "./test/TestLandscapesTab";
import { LadaThematicIcon } from "../sprites/LadaThematicIcon";

export type TestScreenTab = "fights" | "animations" | "landscapes";

interface TestScreenProps {
  onStartFullFight: (heroId: HeroId, locId: LocationId) => void;
  onStartPresetFight: (count: number, heroId: HeroId, locId: LocationId) => void;
  onBack: () => void;
  onOpenBestiary?: () => void;
  initialTab?: TestScreenTab;
}

export const TestScreen: React.FC<TestScreenProps> = ({
  onStartFullFight,
  onStartPresetFight,
  onBack,
  onOpenBestiary,
  initialTab = "fights",
}) => {
  const [activeTab, setActiveTab] = useState<TestScreenTab>(initialTab);
  const [selectedHero, setSelectedHero] = useState<HeroId>("pobuda");
  const [selectedLoc, setSelectedLoc] = useState<LocationId>("vesnice");

  return (
    <div className="flex flex-col min-h-screen bg-parchment-pattern p-2 sm:p-4 select-none overflow-y-auto">
      {/* 1. TOP HEADER & MAIN NAVIGATION TABS */}
      <header className="flex-none mb-3 sm:mb-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-2.5 bg-[#eedcb0] p-3 sm:p-3.5 rounded-2xl border-3 border-[#1c1308] shadow-[0_4px_0_#1c1308]">
          {/* Title row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <LadaThematicIcon name="flask" size={28} animated />
              <div>
                <h1 className="font-title font-black text-lg sm:text-xl text-[#1c1308] leading-tight">
                  Zkušebna a testovací studio
                </h1>
                <p className="text-xs text-[#5c3e21] font-bold">
                  Autentický pohádkový svět Josefa Lady — zkoušení střetů, animací a malebných
                  krajin
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
                  <LadaThematicIcon name="book" size={16} animated />
                  <span className="hidden sm:inline">Přehled bubáků</span>
                </button>
              )}
              <button
                type="button"
                onClick={onBack}
                className="bg-[#fff8e8] hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                title="Vrátit se do hlavního menu"
              >
                <LadaThematicIcon name="back" size={14} />
                <span>Zpět do menu</span>
              </button>
            </div>
          </div>

          {/* TAB SWITCHER BUTTONS (PODČÁSTI TESTU) */}
          <nav
            aria-label="Podčásti zkušebny"
            className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t-2 border-[#1c1308]/20"
          >
            <button
              type="button"
              onClick={() => setActiveTab("fights")}
              className={`py-2 px-2 sm:px-4 rounded-xl border-2 font-title font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                activeTab === "fights"
                  ? "bg-[#1c1308] text-[#ffd438] border-[#1c1308] shadow-[0_2px_0_rgba(0,0,0,0.3)] scale-101"
                  : "bg-[#fffdf7] hover:bg-[#ffeec2] text-[#4a3520] border-[#ded4be]"
              }`}
            >
              <LadaThematicIcon name="attack" size={16} animated />
              <span className="truncate">Testovací souboje</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("animations")}
              className={`py-2 px-2 sm:px-4 rounded-xl border-2 font-title font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                activeTab === "animations"
                  ? "bg-[#1c1308] text-[#ffd438] border-[#1c1308] shadow-[0_2px_0_rgba(0,0,0,0.3)] scale-101"
                  : "bg-[#fffdf7] hover:bg-[#ffeec2] text-[#4a3520] border-[#ded4be]"
              }`}
            >
              <LadaThematicIcon name="devil" size={16} animated />
              <span className="truncate">Animace bubáků</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("landscapes")}
              className={`py-2 px-2 sm:px-4 rounded-xl border-2 font-title font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                activeTab === "landscapes"
                  ? "bg-[#1c1308] text-[#ffd438] border-[#1c1308] shadow-[0_2px_0_rgba(0,0,0,0.3)] scale-101"
                  : "bg-[#fffdf7] hover:bg-[#ffeec2] text-[#4a3520] border-[#ded4be]"
              }`}
            >
              <LadaThematicIcon name="picture" size={16} animated />
              <span className="truncate">Pozadí boje</span>
            </button>
          </nav>
        </div>
      </header>

      {/* 2. TAB CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full">
        {activeTab === "fights" && (
          <TestFightsTab
            selectedHero={selectedHero}
            setSelectedHero={setSelectedHero}
            selectedLoc={selectedLoc}
            setSelectedLoc={setSelectedLoc}
            onStartFullFight={onStartFullFight}
            onStartPresetFight={onStartPresetFight}
          />
        )}

        {activeTab === "animations" && <TestAnimationsTab />}

        {activeTab === "landscapes" && <TestLandscapesTab />}
      </main>

      {/* 3. FOOTER */}
      <footer className="flex-none max-w-4xl mx-auto w-full flex items-center justify-between gap-2 mt-auto pt-3 border-t border-[#1c1308]/20">
        <button
          type="button"
          onClick={onBack}
          className="bg-[#eedcb0] hover:bg-[#ffd438] text-[#1c1308] border-2 border-[#1c1308] text-xs font-black px-3.5 py-1.5 rounded-xl cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
        >
          <LadaThematicIcon name="back" size={14} />
          <span>Zpět do menu</span>
        </button>

        <div className="text-[0.72rem] text-[#5c3e21] font-bold text-right">
          Pohádkový svět Josefa Lady • Polovina 19. století • <em>Bubáci a hastrmani</em>
        </div>
      </footer>
    </div>
  );
};
