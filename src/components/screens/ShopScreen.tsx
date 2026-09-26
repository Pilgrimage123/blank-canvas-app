import React from "react";
import { GameState } from "../../types";
import {
  CARD_DB,
  SHOP_PRICE,
  MAX_CARD_STARS,
  starEmoji,
  starPriceMult,
  getCardUpgradeCost,
  REMOVE_COST,
  REST_COST,
} from "../../data/gameData";
import { normalizeShopOffer } from "../../utils/gameEngine";
import { CardView } from "../CardView";

interface ShopScreenProps {
  state: GameState;
  onBuyCard: (cardId: string, price: number, offerIdx: number, stars?: number) => void;
  onUpgradeCard: (cardId: string, currentStars: number) => void;
  onRemoveCard: (cardId: string, currentStars: number) => void;
  onRest: () => void;
  onLeaveShop: () => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  state,
  onBuyCard,
  onUpgradeCard,
  onRemoveCard,
  onRest,
  onLeaveShop,
}) => {
  const offer = state.shopOffer || [];

  // Group cards in deck by ID and star rating
  interface DeckGroup {
    id: string;
    stars: number;
    count: number;
  }

  const deckGroups: DeckGroup[] = [];
  const groupIndexMap: Record<string, number> = {};

  state.deckAll.forEach((c) => {
    const stars = c.stars || 0;
    const key = `${c.id}__${stars}`;
    if (groupIndexMap[key] !== undefined) {
      deckGroups[groupIndexMap[key]].count += 1;
    } else {
      groupIndexMap[key] = deckGroups.length;
      deckGroups.push({ id: c.id, stars, count: 1 });
    }
  });

  // Sort groups: card name, then star rating
  deckGroups.sort((a, b) => {
    const nameA = CARD_DB[a.id]?.name || a.id;
    const nameB = CARD_DB[b.id]?.name || b.id;
    if (nameA !== nameB) return nameA.localeCompare(nameB, "cs");
    return a.stars - b.stars;
  });

  // Eligible upgrades (any card below MAX_CARD_STARS, excluding junk)
  const eligibleUpgrades = deckGroups.filter(
    (g) => g.stars < MAX_CARD_STARS && CARD_DB[g.id]?.type !== "junk",
  );

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

      {/* Section 1: New Cards for sale with stars */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎴</span>
            <h3 className="font-title text-xl font-bold text-[#1c1308]">Nové karty do brašny</h3>
          </div>
          <span className="text-xs font-semibold text-[#664c2c]">
            (Karty mohou nést řemeslné hvězdičky jakosti přímo ze šenku!)
          </span>
        </div>

        {offer.length === 0 ? (
          <p className="text-xs italic text-[#705638] bg-[#fffaf0] p-4 rounded-xl border-2 border-[#1c1308]">
            Všechny nabízené karty jste již skoupili.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {offer.map((rawItem, idx) => {
              const item = normalizeShopOffer(rawItem);
              const def = CARD_DB[item.id];
              if (!def) return null;
              const stars = item.stars || 0;
              const basePrice = SHOP_PRICE[def.shop || "stred"] || 10;
              const price = Math.round(basePrice * starPriceMult(stars));
              const canAfford = state.salt >= price;

              return (
                <div
                  key={`${item.id}_${idx}_${stars}`}
                  className="lada-card p-3 flex flex-col items-center justify-between bg-[#fffaf0]"
                >
                  <CardView card={item.id} stars={stars} />
                  {stars > 0 && (
                    <div className="mt-2 text-[0.68rem] font-black text-[#8c5614] bg-[#fffae8] px-2.5 py-0.5 rounded-full border border-[#d68b0e]/40 flex items-center gap-1 shadow-2xs">
                      <span>Jakost: {starEmoji(stars)}</span>
                      <span>(+{stars * 10} %)</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => onBuyCard(item.id, price, idx, stars)}
                    disabled={!canAfford}
                    className="lada-button lada-button-primary w-full mt-2.5 text-xs py-2"
                  >
                    Koupit za {price} krejcarů {stars > 0 ? `(${starEmoji(stars)})` : ""}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: Card Upgrades (Hvězdičkový systém jakosti) */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <h3 className="font-title text-xl font-bold text-[#1c1308]">
              Řemeslné vylepšení jakosti karet (Hvězdičkový systém)
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#664c2c]">
            (Každá hvězdička jakosti ⭐ trvale posiluje účinek karty o +10 %!)
          </span>
        </div>

        {eligibleUpgrades.length === 0 ? (
          <p className="text-xs italic text-[#705638] bg-[#fffaf0] p-4 rounded-xl border border-[#1c1308]">
            Všechny karty v brašně jsou již na nejvyšší mistrovské jakosti (⭐⭐⭐⭐⭐).
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {eligibleUpgrades.map((group) => {
              const def = CARD_DB[group.id];
              if (!def) return null;
              const currentStars = group.stars;
              const nextStars = currentStars + 1;
              const cost = getCardUpgradeCost(currentStars);
              const canAfford = state.salt >= cost;

              return (
                <div
                  key={`upgrade_${group.id}_${currentStars}`}
                  className="lada-card p-3 flex flex-col justify-between bg-[#fffaf0] border-2 border-[#1c1308]"
                >
                  <div className="flex items-center justify-around mb-2">
                    <div className="flex flex-col items-center">
                      <span className="text-[0.62rem] font-bold text-[#694825] mb-0.5">
                        Nyní {currentStars > 0 ? `(${starEmoji(currentStars)})` : "(základ)"}
                      </span>
                      <CardView card={group.id} stars={currentStars} className="scale-90" />
                    </div>
                    <div className="flex flex-col items-center px-1">
                      <span className="text-xl font-black text-[#8c5614]">➔</span>
                      <span className="text-[0.62rem] font-black text-[#b36b00] whitespace-nowrap bg-[#fff0cc] px-1 rounded border border-[#d68b0e]/30">
                        +10 %
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[0.62rem] font-black text-[#2d6328] mb-0.5">
                        Cíl ({starEmoji(nextStars)})
                      </span>
                      <CardView card={group.id} stars={nextStars} className="scale-90" />
                    </div>
                  </div>

                  <div className="text-center my-1">
                    <span className="text-[0.68rem] font-bold text-[#5c3e21]">
                      Máte v brašně: {group.count}×
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpgradeCard(group.id, currentStars)}
                    disabled={!canAfford}
                    className="lada-button lada-button-good w-full text-xs py-2 mt-1"
                  >
                    Vylepšit na {starEmoji(nextStars)} ({cost} k.)
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
          {deckGroups.map((group) => {
            const def = CARD_DB[group.id];
            if (!def) return null;
            const canAfford = state.salt >= REMOVE_COST;

            return (
              <div
                key={`remove_${group.id}_${group.stars}`}
                className="lada-card p-2.5 flex flex-col items-center bg-[#fffaf0]"
              >
                <CardView card={group.id} stars={group.stars} className="scale-90 -my-1" />
                <button
                  type="button"
                  onClick={() => onRemoveCard(group.id, group.stars)}
                  disabled={!canAfford}
                  className="lada-button lada-button-danger text-[0.7rem] py-1.5 px-3 mt-2"
                >
                  Vyhodit {group.stars > 0 ? starEmoji(group.stars) : ""} (máte {group.count}×)
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
            Za {REST_COST} krejcarů sundáte 5 Únavy nesené mezi zastávkami (nyní{" "}
            {state.fatigueOut || 0} Únavy).
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
