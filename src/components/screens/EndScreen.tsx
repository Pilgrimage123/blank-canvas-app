import React from "react";
import { GameState } from "../../types";
import { EnemySprite } from "../sprites/EnemySprite";
import { HunterSprite } from "../sprites/HunterSprite";

interface EndScreenProps {
  state: GameState;
  onReturnTitle: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ state, onReturnTitle }) => {
  const isVictory = state.hp > 0;
  const s = state.stats;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-parchment-pattern p-4 sm:p-6 select-none overflow-y-auto">
      <div className="lada-card max-w-xl w-full p-6 sm:p-8 flex flex-col items-center border-4 shadow-[8px_10px_0_rgba(28,19,8,0.4)] my-auto bg-[#fffdf7]">
        {/* Victory or Defeat Sprite & Header */}
        <div className="flex flex-col items-center mb-4">
          {isVictory ? (
            <div className="flex items-center gap-4 bg-[#e8f6de] p-3 rounded-2xl border-2 border-[#1c1308] shadow-inner mb-3">
              <HunterSprite heroId={state.hero} size={90} />
              <span className="text-4xl">🏆</span>
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-[#fde8e4] p-3 rounded-2xl border-2 border-[#1c1308] shadow-inner mb-3">
              <EnemySprite type="rarasek" size={90} />
              <span className="text-4xl">🪦</span>
            </div>
          )}

          <h2 className="font-title text-3xl sm:text-4xl font-black text-[#1c1308] text-center">
            {isVictory ? "Kraj si zhluboka oddychl!" : "Došly krejcary i dech"}
          </h2>
          <p className="text-sm font-semibold text-[#5c3e21] text-center mt-1 max-w-md">
            {isVictory
              ? "Černá tůň je tichá, hastrman se stáhl pod kořeny vrb a v Hrusicích zase bezpečně kokrhá ranní kohout!"
              : "Bubáci vás přečíhali a slánka se rozsypala ve strouze. Nic naplat, je třeba sebrat odvahu a zkusit to znovu!"}
          </p>
        </div>

        {/* Storybook Run Statistics Plaque */}
        <div className="w-full bg-[#f6ebd0] p-4 rounded-xl border-2 border-[#1c1308] shadow-inner mb-6 space-y-2 text-xs sm:text-sm font-bold text-[#1c1308]">
          <div className="text-center font-title text-base font-black text-[#8c5614] border-b border-[#dfcb9a] pb-1 mb-2">
            Pamětní zápis z tohoto putování
          </div>
          <div className="flex justify-between">
            <span>⚔️ Vybojované souboje:</span>
            <span className="font-black">{s.fights}</span>
          </div>
          <div className="flex justify-between">
            <span>✨ Přemožených bubáků a čertů:</span>
            <span className="font-black text-[#2e6629]">{s.kills}</span>
          </div>
          <div className="flex justify-between">
            <span>💥 Udělené poškození solí a holí:</span>
            <span className="font-black text-[#b8331d]">{s.dmgDealt} HP</span>
          </div>
          <div className="flex justify-between">
            <span>🛡️ Obdržené rány na kabát:</span>
            <span className="font-black">{s.dmgTaken} HP</span>
          </div>
          <div className="flex justify-between">
            <span>🪙 Utracené krejcary v šenku:</span>
            <span className="font-black text-[#d69818]">{s.saltSpent} k.</span>
          </div>
          <div className="flex justify-between">
            <span>📚 Nakoupené a vylepšené karty:</span>
            <span className="font-black">{s.buys}</span>
          </div>
          <div className="flex justify-between">
            <span>😴 Klidné spánky v mechu a seně:</span>
            <span className="font-black">{s.sleeps}</span>
          </div>
          <div className="flex justify-between">
            <span>🔥 Nejvyšší dosažená Únava:</span>
            <span className="font-black text-[#8c5614]">{s.maxFatigue}</span>
          </div>
          <div className="flex justify-between border-t border-[#dfcb9a] pt-1 text-sm">
            <span>🪙 Zbývající krejcary v měšci:</span>
            <span className="font-black text-[#8c5614]">{state.salt}</span>
          </div>
        </div>

        {/* Back to Title Button */}
        <button
          type="button"
          onClick={onReturnTitle}
          className="lada-button lada-button-primary text-base py-3 px-8 shadow-[0_4px_0_#1c1308]"
        >
          Návrat na titulní stranu ➔
        </button>
      </div>
    </div>
  );
};
