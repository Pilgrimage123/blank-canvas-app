import React from "react";
import { EnemySprite } from "../sprites/EnemySprite";
import { HunterSprite } from "../sprites/HunterSprite";
import { LadaThematicIcon } from "../sprites/LadaThematicIcon";

interface SplashScreenProps {
  onPlay: () => void;
  onOptions: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onPlay, onOptions }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-parchment-pattern p-6 text-center select-none relative overflow-hidden">
      {/* Decorative Lada Background Vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#1c1308_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Main Folk Illustrated Book Cover Card */}
      <div className="lada-card max-w-xl w-full p-8 flex flex-col items-center relative z-10 border-4 shadow-[8px_10px_0_rgba(28,19,8,0.4)]">
        {/* Top Folk Header Ribbons */}
        <div className="flex items-center gap-3 mb-3">
          <LadaThematicIcon name="leaf" size={20} animated />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#734f24] bg-[#ebd5a0] px-3 py-1 rounded-full border border-[#1c1308]">
            Staročeské pověsti a vymítání
          </span>
          <LadaThematicIcon name="leaf" size={20} animated />
        </div>

        {/* Big Book Title */}
        <h1 className="font-title text-4xl sm:text-5xl font-black text-[#1c1308] leading-tight mb-1 drop-shadow-sm">
          Lovec bubáků
        </h1>
        <p className="font-title italic text-lg sm:text-xl text-[#7a481c] font-bold mb-6">
          podle obrázků a rozprávek mistra Josefa Lady
        </p>

        {/* Storybook Hero & Monster Confrontation Illustration */}
        <div className="relative w-full max-w-md h-40 bg-[#eedcae] rounded-2xl border-3 border-[#1c1308] flex items-center justify-around px-4 mb-6 shadow-inner overflow-hidden">
          {/* Subtle countryside hills background */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0 70 Q80 40 150 60 Q230 40 300 70 L300 120 L0 120 Z" fill="#7fa85b" />
              <circle cx="150" cy="30" r="14" fill="#f4c23c" />
            </svg>
          </div>

          {/* Hunter Pobuda Sprite */}
          <div className="relative z-10 flex flex-col items-center">
            <HunterSprite heroId="pobuda" size={100} />
            <span className="text-xs font-black bg-[#fff8e8] px-2 py-0.5 rounded border border-[#1c1308] mt-1">
              Lovec
            </span>
          </div>

          {/* VS Folk Crest */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="font-title font-black text-2xl text-[#b8331d] drop-shadow-sm">
              proti
            </span>
            <span className="text-xs font-bold text-[#5c3e21]">chásce</span>
          </div>

          {/* Hastrman / Devil Sprite */}
          <div className="relative z-10 flex flex-col items-center">
            <EnemySprite type="hastrman" size={100} />
            <span className="text-xs font-black bg-[#fff8e8] px-2 py-0.5 rounded border border-[#1c1308] mt-1">
              Hastrman
            </span>
          </div>
        </div>

        {/* Narrative introduction */}
        <p className="text-sm sm:text-base font-semibold text-[#3b2a1a] max-w-md mb-6 leading-relaxed">
          Venkovský slánkař, křížek po dědovi a čerstvý bylinkový odvar. Zdejší bubáci, čerti a
          vodníci nejsou krvelační netvoři — jsou mrzutí, zlomyslní a je třeba je řádně posolit!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            type="button"
            onClick={onPlay}
            className="lada-button lada-button-primary text-lg sm:text-xl py-3 px-8 shadow-[0_5px_0_#1c1308] inline-flex items-center gap-2.5"
          >
            <LadaThematicIcon name="book" size={24} animated />
            <span>Otevřít knížku & Hrát</span>
          </button>
          <button
            type="button"
            onClick={onOptions}
            className="lada-button text-base py-3 px-5 shadow-[0_4px_0_#1c1308] inline-flex items-center gap-2"
          >
            <LadaThematicIcon name="settings" size={20} animated />
            <span>Volby běhu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
