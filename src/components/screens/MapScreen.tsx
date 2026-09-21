import React from 'react';
import { GameState } from '../../types';
import { LOCATIONS, NODE_DB, FLAVOR_BY_LOC, NODE_EFFECTS } from '../../data/gameData';
import { LadaLandscape } from '../sprites/LadaLandscape';

interface MapScreenProps {
  state: GameState;
  onSelectNode: (nodeId: string) => void;
  onOpenDeck: () => void;
  onAbandon: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  state,
  onSelectNode,
  onOpenDeck,
  onAbandon
}) => {
  const curLoc = LOCATIONS[state.locIndex] || LOCATIONS[0];
  const step = state.path[state.locIndex] || { before: [], after: [], cleared: false };
  const pool = state.awaitingAfter ? step.after : step.before;

  return (
    <div className="flex flex-col min-h-screen bg-parchment-pattern p-4 sm:p-6 select-none max-w-5xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#eedcb0] p-3.5 rounded-2xl border-3 border-[#1c1308] shadow-[3px_4px_0_rgba(28,19,8,0.25)] mb-4">
        <div>
          <h2 className="font-title text-2xl sm:text-3xl font-black text-[#1c1308] leading-tight">
            {curLoc.name}
          </h2>
          <div className="text-xs sm:text-sm font-bold text-[#5c3e21] flex flex-wrap gap-2 items-center mt-0.5">
            <span>Zastávka {state.locIndex + 1} z {LOCATIONS.length}</span>
            <span>·</span>
            <span className="text-[#b8331d]">❤️ {state.hp}/{state.maxHp} HP</span>
            <span>·</span>
            <span className="text-[#8c5614]">😴 Únava {state.fatigueOut || 0}</span>
            <span>·</span>
            <span>🃏 {state.deckAll.length} karet</span>
          </div>
        </div>

        {/* Currency & Actions */}
        <div className="flex items-center gap-3">
          <div className="bg-[#fff8e8] px-3.5 py-1.5 rounded-full border-2 border-[#1c1308] font-black text-sm text-[#8c5614] shadow-[0_2px_0_rgba(28,19,8,0.2)]">
            🪙 {state.salt} krejcarů
          </div>
          <button type="button" onClick={onOpenDeck} className="lada-button text-xs py-1.5 px-3">
            📚 Balíček
          </button>
          <button
            type="button"
            onClick={onAbandon}
            className="lada-button lada-button-danger text-xs py-1.5 px-3"
            title="Vzdát putování a začít znovu"
          >
            Vzdát
          </button>
        </div>
      </div>

      {/* Lada Bohemian Landscape Panorama */}
      <div className="mb-4">
        <LadaLandscape locId={curLoc.id} height={105} />
      </div>

      {/* Itinerary Road Stepper */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4">
        {LOCATIONS.map((loc, i) => {
          const isCurrent = i === state.locIndex;
          const isPast = i < state.locIndex;
          return (
            <div
              key={loc.id}
              className={`
                flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#1c1308] text-xs font-bold whitespace-nowrap shadow-[0_2px_0_rgba(28,19,8,0.2)]
                ${isCurrent ? 'bg-[#ffd438] text-[#1c1308] scale-105 ring-2 ring-[#e69818]' : ''}
                ${isPast ? 'bg-[#c2dcb5] text-[#2d5225] opacity-75' : ''}
                ${!isCurrent && !isPast ? 'bg-[#f4ebd0] text-[#705638]' : ''}
              `}
            >
              <span>{isPast ? '✓' : isCurrent ? '📍' : `${i + 1}.`}</span>
              <span>{loc.name.split(' ')[0]}</span>
            </div>
          );
        })}
      </div>

      {/* Crossroad Prompt Header */}
      <div className="mb-3">
        <h3 className="font-title text-lg font-bold text-[#1c1308]">
          {state.awaitingAfter ? '🌟 Odbočka po vítězném souboji:' : '🧭 Křižovatka před vámi — zvolte cestu:'}
        </h3>
        <p className="text-xs font-semibold text-[#664929]">
          {state.awaitingAfter
            ? 'Po rozprášení bubáků můžete využít jednu z místních událostí.'
            : 'Vyberte uzel, který ovlivní nadcházející souboj nebo vám nabídne zastávku.'}
        </p>
      </div>

      {/* Node Choices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
        {pool.map((nodeId) => {
          const node = NODE_DB[nodeId];
          if (!node) return null;
          const flav = (FLAVOR_BY_LOC[nodeId] && FLAVOR_BY_LOC[nodeId][curLoc.id]) || node.flavor;
          const isPositive = node.polarity === 'kladny';
          const effectDesc = NODE_EFFECTS[nodeId] || '';

          return (
            <div
              key={nodeId}
              onClick={() => onSelectNode(nodeId)}
              className={`
                lada-card p-4 flex flex-col justify-between cursor-pointer border-3 hover:-translate-y-1.5 transition-all
                ${isPositive ? 'bg-[#f2faea] border-[#2c6126]' : 'bg-[#fff2ee] border-[#9c2b18]'}
              `}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#1c1308] pb-1.5 mb-2">
                  <h4 className="font-title text-base font-bold text-[#1c1308]">
                    {node.name}
                  </h4>
                  <span
                    className={`
                      text-[0.68rem] font-black uppercase px-2 py-0.5 rounded-full border border-[#1c1308]
                      ${isPositive ? 'bg-[#98d487] text-[#0f290a]' : 'bg-[#f08a73] text-[#240c06]'}
                    `}
                  >
                    {node.timing === 'misto' ? 'Místo boje' : node.timing === 'pred' ? 'Před bojem' : 'Po boji'}
                  </span>
                </div>

                <p className="text-xs italic text-[#4a3420] mb-2 leading-relaxed">
                  "{flav}"
                </p>

                <div className="text-xs font-bold text-[#1c1308] bg-[#ffffff] p-2 rounded-lg border border-[#1c1308] mb-3">
                  {effectDesc}
                </div>
              </div>

              <button
                type="button"
                className={`lada-button w-full text-xs py-2 ${isPositive ? 'lada-button-good' : 'lada-button-primary'}`}
              >
                {node.timing === 'misto' ? 'Vydat se sem' : 'Vybrat tuto cestu'} ➔
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
