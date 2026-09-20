import React from 'react';
import { GameState } from '../../types';
import { CARD_DB, SHOP_PRICE, UPGRADE_MAP, UPGRADE_COST, REMOVE_COST, REST_COST } from '../../data/gameData';
import { CardView } from '../CardView';

interface ShopScreenProps {
  state: GameState;
  onBuyCard: (cardId: string, price: number, offerIdx: number) => void;
  onUpgradeCard: (cardId: string) => void;
  onRemoveCard: (cardId: string) => void;
  onRest: () => void;
  onLeaveShop: () => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  state,
  onBuyCard,
  onUpgradeCard,
  onRemoveCard,
  onRest,
  onLeaveShop
}) => {
  const offer = state.shopOffer || [];

  // Group cards in deck for removal
  const deckCounts: Record<string, number> = {};
  state.deckAll.forEach((c) => {
    deckCounts[c.id] = (deckCounts[c.id] || 0) + 1;
  });

  // Eligible upgrades
  const eligibleUpgrades = Object.keys(deckCounts).filter((id) => UPGRADE_MAP[id]);

  return (
    <div className="flex flex-col min-h-screen bg-parchment-pattern p-4 sm:p-6 select-none max-w-5xl mx-auto w-full">
      {/* Tavern Signboard Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#e8cd92] p-4 rounded-2xl border-3 border-[#1c1308] shadow-[3px_4px_0_rgba(28,19,8,0.25)] mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🍺</span>
          <div>
            <h2 className="font-title text-2xl sm:text-3xl font-black text-[#1c1308] leading-tight">
              Hospoda U Černého kocoura
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#5c3e21]">
              Cinkají džbánky a voní teplá kamna. Vyberte si karty, vylepšení či odpočinek.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#fff8e8] px-4 py-1.5 rounded-full border-2 border-[#1c1308] font-black text-base text-[#8c5614] shadow-[0_2px_0_rgba(28,19,8,0.2)]">
            🪙 {state.salt} krejcarů
          </div>
          <button
            type="button"
            onClick={onLeaveShop}
            className="lada-button lada-button-primary text-sm py-2 px-5"
          >
            Odejít ze šenku ➔
          </button>
        </div>
      </div>

      {/* Section 1: New Cards for sale */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🎴</span>
          <h3 className="font-title text-xl font-bold text-[#1c1308]">
            Nové karty do brašny
          </h3>
        </div>
        {offer.length === 0 ? (
          <p className="text-xs italic text-[#705638] bg-[#fffaf0] p-4 rounded-xl border-2 border-[#1c1308]">
            Všechny nabízené karty jste již skoupili.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {offer.map((cardId, idx) => {
              const def = CARD_DB[cardId];
              if (!def) return null;
              const price = SHOP_PRICE[def.shop || 'stred'] || 10;
              const canAfford = state.salt >= price;

              return (
                <div key={cardId + '_' + idx} className="lada-card p-3 flex flex-col items-center justify-between bg-[#fffaf0]">
                  <CardView card={cardId} />
                  <button
                    type="button"
                    onClick={() => onBuyCard(cardId, price, idx)}
                    disabled={!canAfford}
                    className="lada-button lada-button-primary w-full mt-3 text-xs py-2"
                  >
                    Koupit za {price} krejcarů
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: Card Upgrades */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">✨</span>
          <h3 className="font-title text-xl font-bold text-[#1c1308]">
            Vylepšit kartu ({UPGRADE_COST} krejcarů)
          </h3>
          <span className="text-xs font-semibold text-[#664c2c]">
            (Hozená sůl ➔ Ostřejší sůl, Kříž ➔ Velký kříž, Odvar ➔ Košík bylin)
          </span>
        </div>

        {eligibleUpgrades.length === 0 ? (
          <p className="text-xs italic text-[#705638] bg-[#fffaf0] p-3 rounded-xl border border-[#1c1308]">
            V balíčku nemáte žádnou základní kartu k vylepšení.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {eligibleUpgrades.map((fromId) => {
              const toId = UPGRADE_MAP[fromId];
              const fromDef = CARD_DB[fromId];
              const toDef = CARD_DB[toId];
              const canAfford = state.salt >= UPGRADE_COST;

              return (
                <div key={fromId} className="lada-card p-3 flex flex-col justify-between bg-[#fffaf0]">
                  <div className="flex items-center justify-around mb-2">
                    <CardView card={fromId} className="scale-90" />
                    <span className="text-lg font-black text-[#8c5614]">➔</span>
                    <CardView card={toId} className="scale-90" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onUpgradeCard(fromId)}
                    disabled={!canAfford}
                    className="lada-button lada-button-good w-full text-xs py-2 mt-2"
                  >
                    Vylepšit na {toDef.name} ({UPGRADE_COST} k.)
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 3: Remove Card from Deck */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🗑️</span>
          <h3 className="font-title text-xl font-bold text-[#1c1308]">
            Odhodit nepotřebnou kartu z brašny ({REMOVE_COST} krejcarů)
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {Object.entries(deckCounts).map(([cardId, count]) => {
            const def = CARD_DB[cardId];
            if (!def) return null;
            const canAfford = state.salt >= REMOVE_COST;

            return (
              <div key={cardId} className="lada-card p-2.5 flex flex-col items-center bg-[#fffaf0]">
                <CardView card={cardId} className="scale-90 -my-1" />
                <button
                  type="button"
                  onClick={() => onRemoveCard(cardId)}
                  disabled={!canAfford}
                  className="lada-button lada-button-danger text-[0.7rem] py-1.5 px-3 mt-2"
                >
                  Vyhodit (máte {count}×)
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4: Rest at the Tavern */}
      <div className="bg-[#eed59e] p-4 rounded-xl border-3 border-[#1c1308] flex flex-wrap items-center justify-between gap-4 mt-auto">
        <div>
          <h4 className="font-title text-lg font-bold text-[#1c1308]">
            Teplá lavice & džbánek u kamen
          </h4>
          <p className="text-xs font-semibold text-[#543b24]">
            Za {REST_COST} krejcarů sundáte 5 Únavy nesené mezi zastávkami (nyní {state.fatigueOut || 0} Únavy).
          </p>
        </div>
        <button
          type="button"
          onClick={onRest}
          disabled={state.salt < REST_COST || (state.fatigueOut || 0) === 0}
          className="lada-button text-sm py-2 px-4 shadow-[0_3px_0_#1c1308]"
        >
          😴 Odpočinout si (−5 Únavy za {REST_COST} k.)
        </button>
      </div>
    </div>
  );
};
