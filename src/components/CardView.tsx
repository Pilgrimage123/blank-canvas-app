import React, { useState } from "react";
import { CardDef, CardInstance } from "../types";
import { CARD_DB } from "../data/gameData";

interface CardViewProps {
  card: CardInstance | string;
  onClick?: () => void;
  disabled?: boolean;
  canAfford?: boolean;
  isTargeted?: boolean;
  isHighlighted?: boolean;
  showFullTextDefault?: boolean;
  onHoverEnter?: () => void;
  onHoverLeave?: () => void;
  className?: string;
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  onClick,
  disabled = false,
  canAfford = true,
  isTargeted = false,
  isHighlighted = false,
  showFullTextDefault = false,
  onHoverEnter,
  onHoverLeave,
  className = "",
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const cardId = typeof card === "string" ? card : card.id;
  const def: CardDef = CARD_DB[cardId] || CARD_DB.sul;

  const getBorderColor = () => {
    if (def.type === "attack") return "border-[#942718] bg-[#fff3ec]";
    if (def.type === "defend") return "border-[#1b4372] bg-[#eef5fc]";
    if (def.type === "junk") return "border-[#6e4e37] bg-[#f7f0e4]";
    return "border-[#2d6328] bg-[#f0f8ec]";
  };

  const getKindBadgeColor = () => {
    if (def.type === "attack") return "bg-[#f08a73] text-[#240c06]";
    if (def.type === "defend") return "bg-[#8ab6e8] text-[#06182e]";
    if (def.type === "junk") return "bg-[#cbb69e] text-[#2b1b0e]";
    return "bg-[#98d487] text-[#0f290a]";
  };

  const isFullOpen = showInfo || showFullTextDefault;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className={`
        relative select-none transition-all duration-150 rounded-xl border-[2.8px]
        flex flex-col justify-between p-1.5 pb-2 cursor-pointer shadow-[3px_4px_0_rgba(28,19,8,0.32)]
        ${getBorderColor()}
        ${isFullOpen ? "w-[148px] min-h-[170px]" : "w-[108px] min-h-[136px]"}
        ${disabled || !canAfford ? "opacity-65 grayscale-[20%]" : "hover:-translate-y-1.5 hover:shadow-[3px_6px_0_rgba(28,19,8,0.4)]"}
        ${isHighlighted ? "ring-4 ring-[#e69818] shadow-[0_0_12px_#e69818]" : ""}
        ${isTargeted ? "scale-105" : ""}
        ${className}
      `}
    >
      {/* Top Banner: Card Kind */}
      <div className="flex items-center justify-between border-b-[2px] border-[#1c1308] pb-1 -mx-1.5 -mt-1.5 px-2 pt-1 rounded-t-[9px] bg-[#eedcae]">
        <span
          className={`text-[0.62rem] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-[#1c1308] ${getKindBadgeColor()}`}
        >
          {def.type === "attack"
            ? "Útok"
            : def.type === "defend"
              ? "Obrana"
              : def.type === "junk"
                ? "Rušivá"
                : "Příprava"}
        </span>
        <span className="text-[0.62rem] font-bold text-[#4d3b24]">
          {def.pre > 0 ? `${def.pre} Aug` : "hned"}
        </span>
      </div>

      {/* Card Emblem Art Icon in Josef Lada style */}
      <div className="flex items-center justify-center my-1 h-9">{renderCardIcon(def.id)}</div>

      {/* Card Title */}
      <div className="text-center">
        <h4 className="font-title text-[0.82rem] font-bold leading-tight text-[#1c1308]">
          {def.name}
        </h4>
      </div>

      {/* Action Chips */}
      {!isFullOpen && (
        <div className="flex flex-wrap items-center justify-center gap-1 my-1">
          {def.dmg && (
            <span className="inline-flex items-center gap-0.5 text-[0.8rem] font-black px-1.5 py-0.5 rounded-full bg-[#fce0d8] border border-[#942718] text-[#942718]">
              ⚔️ {def.dmg}
            </span>
          )}
          {def.block && (
            <span className="inline-flex items-center gap-0.5 text-[0.8rem] font-black px-1.5 py-0.5 rounded-full bg-[#d8e8fc] border border-[#1b4372] text-[#1b4372]">
              🛡️ {def.block}
            </span>
          )}
          {def.dodge && (
            <span className="inline-flex items-center gap-0.5 text-[0.8rem] font-black px-1.5 py-0.5 rounded-full bg-[#ecdcd0] border border-[#593d25] text-[#593d25]">
              💨 {def.dodge}
            </span>
          )}
          {def.draw && (
            <span className="inline-flex items-center gap-0.5 text-[0.8rem] font-black px-1.5 py-0.5 rounded-full bg-[#e4f4d8] border border-[#2d6328] text-[#2d6328]">
              🃏 +{def.draw}
            </span>
          )}
          {def.fatigue && (
            <span className="inline-flex items-center gap-0.5 text-[0.8rem] font-black px-1.5 py-0.5 rounded-full bg-[#fff0d0] border border-[#d69818] text-[#825406]">
              😴 {def.fatigue}
            </span>
          )}
        </div>
      )}

      {/* Extended text & flavor */}
      {isFullOpen && (
        <div className="text-[0.72rem] leading-tight my-1 font-semibold text-[#1c1308] bg-[#fff8ea] p-1.5 rounded-lg border border-[#1c1308]">
          <div>{def.text}</div>
          {def.flavor && (
            <div className="text-[0.64rem] italic text-[#594432] mt-1 border-t border-[#dfcb9a] pt-1">
              "{def.flavor}"
            </div>
          )}
        </div>
      )}

      {/* Bottom Bar: Cost badge and Info toggle */}
      <div className="flex items-center justify-between pt-1 mt-auto">
        {/* Cost Bubble */}
        <div
          className={`
            w-6 h-6 rounded-full border-2 border-[#1c1308] flex items-center justify-center font-black text-[0.8rem]
            shadow-[0_2px_0_#1c1308]
            ${canAfford ? "bg-[#ffd438] text-[#1c1308]" : "bg-[#e0c896] text-[#786445]"}
          `}
          title={`Spotřebuje ${def.cost} Akce`}
        >
          {def.cost}
        </div>

        {/* Info Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(!showInfo);
          }}
          className="w-5 h-5 rounded-full bg-[#fff8ea] border border-[#1c1308] text-[0.7rem] font-serif font-black italic flex items-center justify-center text-[#1c1308] hover:bg-[#ffe39e] active:scale-95"
          title="Více informací o kartě"
        >
          i
        </button>
      </div>
    </div>
  );
};

function renderCardIcon(cardId: string) {
  switch (cardId) {
    case "sul":
    case "ostra":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Wooden salt cellar (slánka) */}
          <rect
            x="10"
            y="10"
            width="16"
            height="20"
            rx="3"
            fill="#ddb370"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          <polygon points="12,10 18,3 24,10" fill="#be904b" stroke="#1c1308" strokeWidth="2" />
          {/* Folk heart carving on cellar */}
          <path
            d="M18 16 C15 13 13 16 18 22 C23 16 21 13 18 16 Z"
            fill="#b8331d"
            stroke="#1c1308"
            strokeWidth="1"
          />
          {/* Spilling salt crystals */}
          <circle cx="28" cy="22" r="1.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
          <circle cx="32" cy="26" r="1.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
          <circle cx="29" cy="30" r="1.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
        </svg>
      );

    case "kriz":
    case "velkykriz":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Carved wooden cross */}
          <rect
            x="15"
            y="3"
            width="6"
            height="30"
            fill="#663e1d"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          <rect
            x="6"
            y="10"
            width="24"
            height="6"
            fill="#663e1d"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          {/* Golden ray halo */}
          <circle
            cx="18"
            cy="13"
            r="7"
            fill="none"
            stroke="#f4c23c"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />
        </svg>
      );

    case "odvar":
    case "kosik":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Earthenware herbal pot */}
          <path d="M9 16 C9 30 27 30 27 16 Z" fill="#8f5732" stroke="#1c1308" strokeWidth="2.5" />
          <ellipse cx="18" cy="16" rx="9" ry="3" fill="#6e3f1f" stroke="#1c1308" strokeWidth="2" />
          {/* Mint herb sprig */}
          <path
            d="M18 16 Q18 7 24 5 M18 16 Q14 8 10 9"
            stroke="#48823b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="5" r="2" fill="#88c474" />
          <circle cx="10" cy="9" r="2" fill="#88c474" />
        </svg>
      );

    case "kropac":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Brass church aspergillum */}
          <line
            x1="7"
            y1="29"
            x2="23"
            y2="13"
            stroke="#8a5624"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="26" cy="10" r="6.5" fill="#f4c23c" stroke="#1c1308" strokeWidth="2.5" />
          {/* Holy water droplet sprays */}
          <circle cx="32" cy="6" r="2" fill="#58a4e0" stroke="#1c1308" strokeWidth="1" />
          <circle cx="30" cy="17" r="1.8" fill="#58a4e0" stroke="#1c1308" strokeWidth="1" />
          <circle cx="21" cy="4" r="1.8" fill="#58a4e0" stroke="#1c1308" strokeWidth="1" />
        </svg>
      );

    case "rada":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Hand throwing grains of salt into wind */}
          <path
            d="M4 24 Q16 18 20 16 L22 20 Q16 23 4 28 Z"
            fill="#ebd2b0"
            stroke="#1c1308"
            strokeWidth="2"
          />
          {/* Salt flurry */}
          <circle cx="26" cy="11" r="1.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
          <circle cx="32" cy="14" r="2" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
          <circle cx="29" cy="22" r="1.8" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
          <circle cx="34" cy="26" r="1.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
        </svg>
      );

    case "ukrok":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Country boot stepping quickly */}
          <path
            d="M10 8 L10 24 L24 24 Q26 18 24 16 L17 16 L17 8 Z"
            fill="#54361e"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          {/* Movement lines */}
          <line
            x1="26"
            y1="20"
            x2="33"
            y2="20"
            stroke="#1c1308"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="25"
            y1="26"
            x2="31"
            y2="26"
            stroke="#1c1308"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "slofik":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Hat resting on fence */}
          <ellipse
            cx="18"
            cy="20"
            rx="14"
            ry="5"
            fill="#5c4837"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          <path d="M9 20 C10 11 26 11 27 20 Z" fill="#6e5642" stroke="#1c1308" strokeWidth="2.5" />
          {/* Zzz slumber */}
          <text x="25" y="10" fontSize="9" fontWeight="900" fill="#1c1308" fontFamily="Fraunces">
            Z
          </text>
        </svg>
      );

    case "leknuti":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Startled ghost / spook eyes and hair standing on end */}
          <path
            d="M10 28 C8 18 12 10 18 10 C24 10 28 18 26 28 C23 26 21 29 18 26 C15 29 13 26 10 28 Z"
            fill="#e8d8c3"
            stroke="#1c1308"
            strokeWidth="2.2"
          />
          {/* Big startled eyes */}
          <circle cx="15" cy="17" r="3.2" fill="#fff" stroke="#1c1308" strokeWidth="1.6" />
          <circle cx="15" cy="17" r="1.3" fill="#1c1308" />
          <circle cx="21" cy="17" r="3.2" fill="#fff" stroke="#1c1308" strokeWidth="1.6" />
          <circle cx="21" cy="17" r="1.3" fill="#1c1308" />
          {/* Gasp mouth */}
          <ellipse
            cx="18"
            cy="22.5"
            rx="2"
            ry="2.8"
            fill="#542c16"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          {/* Shock lines */}
          <line
            x1="8"
            y1="8"
            x2="11"
            y2="11"
            stroke="#b8331d"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="4"
            x2="18"
            y2="8"
            stroke="#b8331d"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="28"
            y1="8"
            x2="25"
            y2="11"
            stroke="#b8331d"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "smradek":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Mud puddle */}
          <ellipse
            cx="18"
            cy="28"
            rx="14"
            ry="5"
            fill="#5a452c"
            stroke="#1c1308"
            strokeWidth="2.2"
          />
          <ellipse cx="16" cy="27" rx="8" ry="2.5" fill="#755c3c" />
          {/* Stink fumes in green-yellow wavy ink */}
          <path
            d="M12 24 C10 18 16 16 13 10 C11 6 15 4 14 2"
            fill="none"
            stroke="#688a28"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="3,2"
          />
          <path
            d="M18 25 C16 19 22 17 19 11 C17 7 21 5 20 2"
            fill="none"
            stroke="#8cb034"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 24 C22 19 26 15 24 10 C23 7 25 5 25 3"
            fill="none"
            stroke="#688a28"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="2,2"
          />
          {/* Tiny flies */}
          <circle cx="8" cy="14" r="1.2" fill="#1c1308" />
          <circle cx="28" cy="12" r="1.2" fill="#1c1308" />
        </svg>
      );

    case "mokra_lumparna":
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Slime puddle / reeds */}
          <ellipse
            cx="18"
            cy="27"
            rx="13"
            ry="5"
            fill="#3a6452"
            stroke="#1c1308"
            strokeWidth="2.2"
          />
          {/* Dripping tangled pond weeds */}
          <path
            d="M11 26 C9 19 13 14 11 8 C15 12 13 20 15 26"
            fill="#528b46"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <path
            d="M25 26 C27 18 22 13 25 7 C21 11 22 19 20 26"
            fill="#3a7032"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          {/* Water drops splashed */}
          <path
            d="M18 13 C18 13 15 17 15 19 C15 21 17 22 18 22 C19 22 21 21 21 19 C21 17 18 13 18 13 Z"
            fill="#71b7db"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="22" r="1.5" fill="#71b7db" stroke="#1c1308" strokeWidth="1" />
          <circle cx="28" cy="21" r="1.5" fill="#71b7db" stroke="#1c1308" strokeWidth="1" />
        </svg>
      );

    case "hole":
    default:
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8">
          {/* Oak club / walking stick */}
          <line
            x1="8"
            y1="30"
            x2="26"
            y2="6"
            stroke="#694320"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Knots on stick */}
          <circle cx="15" cy="20" r="2" fill="#422710" />
          <circle cx="21" cy="12" r="2.5" fill="#422710" />
        </svg>
      );
  }
}
