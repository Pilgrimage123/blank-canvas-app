import React, { useState } from "react";
import { CardInstance } from "../../types";
import { CardView } from "../CardView";

interface PilesModalProps {
  drawPile: CardInstance[];
  discardPile: CardInstance[];
  handPile?: CardInstance[];
  initialTab?: "deck" | "discard" | "all";
  onClose: () => void;
}

export const PilesModal: React.FC<PilesModalProps> = ({
  drawPile,
  discardPile,
  handPile = [],
  initialTab = "deck",
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"deck" | "discard" | "all">(initialTab);

  let list: CardInstance[] = [];
  if (activeTab === "deck") list = drawPile;
  else if (activeTab === "discard") list = discardPile;
  else list = [...drawPile, ...handPile, ...discardPile];

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1308]/60 flex items-center justify-center p-4 backdrop-blur-xs select-none">
      <div className="lada-card max-w-3xl w-full max-h-[85vh] flex flex-col p-5 bg-[#fffdf5] border-4 shadow-[8px_10px_0_rgba(28,19,8,0.4)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#1c1308] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h3 className="font-title text-2xl font-black text-[#1c1308]">
              Prohlížeč brašny a karet
            </h3>
          </div>
          <button type="button" onClick={onClose} className="lada-button text-xs py-1.5 px-3">
            Zavřít ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("deck")}
            className={`lada-button text-xs py-1.5 px-3.5 ${activeTab === "deck" ? "lada-button-primary" : ""}`}
          >
            Lízací balíček ({drawPile.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("discard")}
            className={`lada-button text-xs py-1.5 px-3.5 ${activeTab === "discard" ? "lada-button-primary" : ""}`}
          >
            Odhozené karty ({discardPile.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`lada-button text-xs py-1.5 px-3.5 ${activeTab === "all" ? "lada-button-primary" : ""}`}
          >
            Všechny karty dohromady ({drawPile.length + handPile.length + discardPile.length})
          </button>
        </div>

        {/* Card Grid Container */}
        <div className="flex-1 overflow-y-auto pr-1">
          {list.length === 0 ? (
            <div className="py-12 text-center text-sm font-semibold text-[#705638]">
              V tomto balíčku se momentálně nenachází žádné karty.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1 justify-items-center">
              {list.map((c, i) => (
                <CardView key={c.inst + "_" + i} card={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
