import React from 'react';
import { CardInstance } from '../../types';
import { CardView } from '../CardView';

interface DiscardOverflowModalProps {
  hand: CardInstance[];
  handCap: number;
  onDiscardCard: (cardIdx: number) => void;
}

export const DiscardOverflowModal: React.FC<DiscardOverflowModalProps> = ({
  hand,
  handCap,
  onDiscardCard
}) => {
  const excess = hand.length - handCap;

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1308]/70 flex items-center justify-center p-4 backdrop-blur-xs select-none">
      <div className="lada-card max-w-2xl w-full p-6 bg-[#fffdf7] border-4 shadow-[8px_10px_0_rgba(28,19,8,0.4)] flex flex-col items-center text-center">
        <span className="text-3xl mb-1">✋</span>
        <h3 className="font-title text-2xl font-black text-[#1c1308]">
          Ruka je plná — odhoďte přebytek
        </h3>
        <p className="text-sm font-semibold text-[#5c3e21] mb-4">
          Strop vaší ruky je <span className="font-black text-[#b8331d]">{handCap}</span> karet.
          Odhoďte ještě <span className="font-black text-[#b8331d]">{excess}</span> {excess === 1 ? 'kartu' : 'karty'}. Čas během výběru stojí.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 overflow-y-auto max-h-[50vh] p-2 bg-[#f4ebd0] rounded-2xl border border-[#1c1308] w-full mb-4">
          {hand.map((card, idx) => (
            <div key={card.inst + '_' + idx} className="flex flex-col items-center">
              <CardView card={card} />
              <button
                type="button"
                onClick={() => onDiscardCard(idx)}
                className="lada-button lada-button-danger text-xs py-1 px-3 mt-1.5"
              >
                Odhodit tuto
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
