import React, { useState, useRef } from "react";
import { LocationId } from "../../types";
import { sound } from "../../lib/sound";
import { LadaThematicIcon, renderLadaText } from "./LadaThematicIcon";

interface CombatLandscapeArenaProps {
  locId: LocationId | string;
  className?: string;
  children?: React.ReactNode;
}

export type TriggerEasterEgg = (
  e: React.MouseEvent,
  targetKey: string,
  soundFn: () => void,
  text: string,
  icon: string,
) => void;

interface ScenicPopup {
  id: number;
  x: number;
  y: number;
  text: string;
  icon: string;
}

export const CombatLandscapeArena: React.FC<CombatLandscapeArenaProps> = ({
  locId,
  className = "",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [popups, setPopups] = useState<ScenicPopup[]>([]);
  const [bouncingTarget, setBouncingTarget] = useState<string | null>(null);

  const triggerEasterEgg: TriggerEasterEgg = (e, targetKey, soundFn, text, icon) => {
    e.stopPropagation();
    try {
      soundFn();
    } catch {
      // Audio fallback
    }
    setBouncingTarget(targetKey);
    setTimeout(() => {
      setBouncingTarget((curr) => (curr === targetKey ? null : curr));
    }, 650);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
      const clickY = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
      const newPopup: ScenicPopup = {
        id: Date.now() + Math.random(),
        x: Math.max(8, Math.min(90, clickX)),
        y: Math.max(8, Math.min(85, clickY)),
        text,
        icon,
      };
      setPopups((prev) => [...prev.slice(-4), newPopup]);
      setTimeout(() => {
        setPopups((prev) => prev.filter((p) => p.id !== newPopup.id));
      }, 1200);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] overflow-hidden rounded-2xl border-3 border-[#1c1308] bg-[#f2e7cc] shadow-[0_4px_0_rgba(28,19,8,0.35)] select-none flex flex-col justify-between ${className}`}
    >
      {/* 1. SCENIC BACKGROUND ARTWORK WITH INTERACTIVE FOLK EASTER EGGS */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {renderScenicLandscape(locId, triggerEasterEgg, bouncingTarget)}
      </div>

      {/* 4. COMIC EASTER EGG POPUPS & PARTICLES */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {popups.map((p) => (
          <div
            key={p.id}
            className="absolute anim-comic-pop-float flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff8e7] border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] text-[#1c1308] font-bold text-xs sm:text-sm whitespace-nowrap z-50"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <LadaThematicIcon
              name={p.icon}
              size={22}
              animated
              className="select-none flex-shrink-0"
            />
            <span className="font-serif tracking-wide">{renderLadaText(p.text, 18, true)}</span>
          </div>
        ))}
      </div>

      {/* 2. FOREGROUND ACTORS (HUNTER & BUBÁCI) */}
      <div className="relative z-10 flex-1 w-full h-full flex flex-col justify-between p-2 sm:p-4">
        {children}
      </div>
    </div>
  );
};

function getGroundColor(locId: string): string {
  switch (locId) {
    case "les":
      return "#244a20"; // Deep mossy spruce forest turf
    case "rybnik":
      return "#1e3e32"; // Dark waterside marsh green
    case "boss":
      return "#15201a"; // Pitch-dark bog peat & swamp moss
    case "zricenina":
      return "#464d3c"; // Mountain cliff turf & scree
    case "hrbitov":
      return "#252e27"; // Somber graveyard turf
    case "mlyn":
      return "#4d853b"; // River meadow green
    case "vesnice":
    default:
      return "#5e9643"; // Sunny Bohemian meadow green
  }
}

function getPathColor(locId: string): string {
  switch (locId) {
    case "les":
      return "#563e26"; // Brown pine loam & exposed roots
    case "rybnik":
      return "#344c4a"; // Damp muddy pond trail
    case "boss":
      return "#222c2a"; // Slick black bog muck & wet stone
    case "zricenina":
      return "#615749"; // Mountain crushed castle stone
    case "hrbitov":
      return "#39353f"; // Slate gravel & ash path
    case "mlyn":
      return "#7a5e3c"; // Sandy riverbank road
    case "vesnice":
    default:
      return "#92744b"; // Golden Bohemian dirt highway
  }
}

function renderGroundDetails(locId: string) {
  switch (locId) {
    case "les":
      return (
        <g stroke="#1c1308" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Pine needles & deep woodland grass */}
          <path d="M80 42 Q84 30 80 20 M80 42 Q88 32 96 36" stroke="#183614" />
          <path d="M320 48 Q324 36 320 26 M320 48 Q328 38 336 42" stroke="#183614" />
          <path d="M620 46 Q624 34 620 24 M620 46 Q628 36 636 40" stroke="#183614" />
          <path d="M910 46 Q914 34 910 24 M910 46 Q918 36 926 40" stroke="#183614" />

          {/* Tiny red amanitas and acorns on upper bank */}
          <g transform="translate(200, 32)">
            <rect x="3" y="6" width="3" height="7" fill="#fff" stroke="#1c1308" strokeWidth="1" />
            <ellipse
              cx="4.5"
              cy="5"
              rx="6"
              ry="4"
              fill="#c4321d"
              stroke="#1c1308"
              strokeWidth="1.2"
            />
            <circle cx="3" cy="4" r="0.9" fill="#fff" />
            <circle cx="6" cy="4.5" r="0.9" fill="#fff" />
          </g>
          <g transform="translate(740, 34)">
            <ellipse
              cx="4"
              cy="5"
              rx="4"
              ry="5.5"
              fill="#6e4620"
              stroke="#1c1308"
              strokeWidth="1.2"
            />
            <path d="M1 3 Q4 1 7 3" stroke="#1c1308" strokeWidth="1.2" fill="#422912" />
          </g>

          {/* Lower path pine roots & stones */}
          <path d="M60 126 Q64 114 60 104 M60 126 Q68 116 76 120" stroke="#22421c" />
          <path d="M470 120 Q474 108 470 98 M470 120 Q478 110 486 114" stroke="#22421c" />
          <path d="M760 124 Q764 112 760 102 M760 124 Q768 114 776 118" stroke="#22421c" />

          {/* Mossy stones */}
          <ellipse
            cx="140"
            cy="182"
            rx="9"
            ry="5"
            fill="#4d3b2a"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="340"
            cy="196"
            rx="11"
            ry="5.5"
            fill="#584330"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="580"
            cy="178"
            rx="10"
            ry="5"
            fill="#4d3b2a"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="820"
            cy="192"
            rx="12"
            ry="6"
            fill="#584330"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
        </g>
      );

    case "rybnik":
      return (
        <g stroke="#1c1308" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Reeds & marsh grass on bank */}
          <path d="M70 40 Q74 25 70 15 M70 40 Q78 28 86 32" stroke="#16382b" strokeWidth="2.5" />
          <path
            d="M300 46 Q304 32 300 20 M300 46 Q308 34 316 38"
            stroke="#16382b"
            strokeWidth="2.5"
          />
          <path
            d="M630 44 Q634 30 630 18 M630 44 Q638 32 646 36"
            stroke="#16382b"
            strokeWidth="2.5"
          />
          <path
            d="M920 44 Q924 30 920 18 M920 44 Q928 32 936 36"
            stroke="#16382b"
            strokeWidth="2.5"
          />

          {/* Marsh marigolds / Blatouchy on upper bank */}
          <circle cx="210" cy="38" r="3.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="480" cy="40" r="3.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="770" cy="42" r="3.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />

          {/* Lower trail wet mud & water puddles with animated ripples */}
          <ellipse
            cx="130"
            cy="180"
            rx="16"
            ry="6"
            fill="#20353c"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="130"
            cy="180"
            rx="10"
            ry="3.5"
            fill="#2c4c57"
            className="anim-water-ripple"
          />
          <ellipse
            cx="370"
            cy="192"
            rx="14"
            ry="5.5"
            fill="#20353c"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="610"
            cy="176"
            rx="18"
            ry="6.5"
            fill="#20353c"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="610"
            cy="176"
            rx="11"
            ry="3.8"
            fill="#2c4c57"
            className="anim-water-ripple-2"
          />
          <ellipse
            cx="850"
            cy="188"
            rx="15"
            ry="5.5"
            fill="#20353c"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
        </g>
      );

    case "boss":
      return (
        <g stroke="#1c1308" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Gnarled dark roots & bog marsh */}
          <path d="M80 40 Q95 25 110 38 Q125 50 140 35" stroke="#2b1e16" strokeWidth="3" />
          <path d="M600 44 Q615 28 630 42 Q645 54 660 38" stroke="#2b1e16" strokeWidth="3" />

          {/* Supernatural glowing fissure on upper bank */}
          <path d="M350 48 Q370 42 390 47 Q410 44 430 49" stroke="#9e2815" strokeWidth="3" />
          <path
            d="M350 48 Q370 42 390 47 Q410 44 430 49"
            stroke="#ffd438"
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Bubbling bog puddle with animated sparks */}
          <ellipse
            cx="150"
            cy="182"
            rx="18"
            ry="7"
            fill="#131d1b"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <circle cx="146" cy="180" r="3" fill="#692415" className="anim-lada-bubble-1" />
          <circle cx="154" cy="183" r="2" fill="#c43818" className="anim-spark-1" />

          {/* Pentagram runic marker stone in center */}
          <ellipse
            cx="560"
            cy="176"
            rx="13"
            ry="6.5"
            fill="#303b38"
            stroke="#1c1308"
            strokeWidth="2"
          />
          <path
            d="M560 171.5 L563 180 L555.5 174.5 L564.5 174.5 L557 180 Z"
            fill="#e63e1e"
            fillOpacity="0.75"
            stroke="#1c1308"
            strokeWidth="1.4"
            className="anim-eye-pulse"
          />

          <ellipse
            cx="820"
            cy="190"
            rx="15"
            ry="6"
            fill="#131d1b"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <circle cx="824" cy="188" r="2.5" fill="#692415" className="anim-lada-bubble-2" />
        </g>
      );

    case "zricenina":
      return (
        <g stroke="#1c1308" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Mountain grass & thistle flowers */}
          <path d="M90 42 Q94 30 90 20 M90 42 Q98 32 106 36" stroke="#323d2b" />
          <path d="M310 50 Q314 38 310 28 M310 50 Q318 40 326 44" stroke="#323d2b" />
          <path d="M610 46 Q614 34 610 24 M610 46 Q618 36 626 40" stroke="#323d2b" />
          <path d="M920 48 Q924 36 920 26 M920 48 Q928 38 936 42" stroke="#323d2b" />

          {/* Purple mountain thistles on upper ridge */}
          <circle cx="210" cy="40" r="3.5" fill="#8f4a86" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="450" cy="42" r="3.5" fill="#8f4a86" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="750" cy="44" r="3.5" fill="#8f4a86" stroke="#1c1308" strokeWidth="1.5" />

          {/* Fallen castle masonry & flagstones on lower road */}
          <rect
            x="110"
            y="174"
            width="18"
            height="10"
            rx="2"
            fill="#585244"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <rect
            x="310"
            y="188"
            width="22"
            height="12"
            rx="2"
            fill="#686050"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <rect
            x="540"
            y="170"
            width="26"
            height="12"
            rx="3"
            fill="#585244"
            stroke="#1c1308"
            strokeWidth="2"
          />
          <rect
            x="770"
            y="184"
            width="20"
            height="11"
            rx="2"
            fill="#686050"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <rect
            x="920"
            y="178"
            width="16"
            height="9"
            rx="2"
            fill="#585244"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
        </g>
      );

    case "hrbitov":
      return (
        <g stroke="#1c1308" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Somber cemetery turf & creeping low mist */}
          <path d="M80 42 Q84 30 80 20 M80 42 Q88 32 96 36" stroke="#1e261f" />
          <path d="M300 48 Q304 36 300 26 M300 48 Q308 38 316 42" stroke="#1e261f" />
          <path d="M620 46 Q624 34 620 24 M620 46 Q628 36 636 40" stroke="#1e261f" />
          <path d="M910 46 Q914 34 910 24 M910 46 Q918 36 926 40" stroke="#1e261f" />

          {/* Pale immortelle flowers on upper mounds */}
          <circle cx="190" cy="38" r="3" fill="#e8dcc4" stroke="#1c1308" strokeWidth="1.2" />
          <circle cx="490" cy="42" r="3" fill="#c49ac7" stroke="#1c1308" strokeWidth="1.2" />
          <circle cx="780" cy="44" r="3" fill="#e8dcc4" stroke="#1c1308" strokeWidth="1.2" />

          {/* Old slate stones with carved crosses on lower path */}
          <ellipse
            cx="130"
            cy="180"
            rx="10"
            ry="5"
            fill="#4d4752"
            stroke="#1c1308"
            strokeWidth="1.6"
          />
          <ellipse
            cx="350"
            cy="194"
            rx="12"
            ry="6"
            fill="#4d4752"
            stroke="#1c1308"
            strokeWidth="1.6"
          />
          <ellipse
            cx="570"
            cy="174"
            rx="13"
            ry="6.5"
            fill="#59525f"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          {/* Folk heart carved into center gravestone */}
          <path d="M568 172 Q570 170 572 172 Q574 174 570 177 Q566 174 568 172 Z" fill="#c43b22" />
          <ellipse
            cx="800"
            cy="190"
            rx="11"
            ry="5.5"
            fill="#4d4752"
            stroke="#1c1308"
            strokeWidth="1.6"
          />
        </g>
      );

    case "mlyn":
      return (
        <g stroke="#1c1308" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Riverbank grass */}
          <path d="M90 42 Q94 30 90 20 M90 42 Q98 32 106 36" stroke="#244519" />
          <path d="M310 50 Q314 38 310 28 M310 50 Q318 40 326 44" stroke="#244519" />
          <path d="M610 46 Q614 34 610 24 M610 46 Q618 36 626 40" stroke="#244519" />
          <path d="M920 48 Q924 36 920 26 M920 48 Q928 38 936 42" stroke="#244519" />

          {/* Yellow buttercups on bank */}
          <circle cx="210" cy="40" r="3.5" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="450" cy="42" r="3.5" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="750" cy="44" r="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />

          {/* Sandy road cobblestones & wet puddle */}
          <ellipse
            cx="120"
            cy="180"
            rx="8"
            ry="4"
            fill="#7a6955"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="320"
            cy="195"
            rx="10"
            ry="5"
            fill="#8c7860"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="560"
            cy="175"
            rx="14"
            ry="5"
            fill="#4d6f85"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse cx="560" cy="175" rx="8" ry="3" fill="#729cb5" className="anim-water-ripple" />
          <ellipse
            cx="780"
            cy="190"
            rx="11"
            ry="5.5"
            fill="#8c7860"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="940"
            cy="185"
            rx="8"
            ry="4"
            fill="#7a6955"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
        </g>
      );

    case "vesnice":
    default:
      return (
        <g stroke="#1c1308" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Upper bank grass */}
          <path d="M90 42 Q94 30 90 20 M90 42 Q98 32 106 36" stroke="#244519" />
          <path d="M310 50 Q314 38 310 28 M310 50 Q318 40 326 44" stroke="#244519" />
          <path d="M610 46 Q614 34 610 24 M610 46 Q618 36 626 40" stroke="#244519" />
          <path d="M920 48 Q924 36 920 26 M920 48 Q928 38 936 42" stroke="#244519" />

          {/* Daisies & Red Wild Poppies (Vlčí máky) */}
          <circle cx="170" cy="38" r="3.5" fill="#d4321d" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="240" cy="42" r="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="450" cy="42" r="3.5" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="710" cy="40" r="3.5" fill="#d4321d" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="780" cy="44" r="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />

          {/* Lower path grass & cobblestones */}
          <path d="M50 124 Q54 112 50 102 M50 124 Q58 114 66 118" stroke="#325424" />
          <path d="M240 116 Q244 104 240 94 M240 116 Q248 106 254 110" stroke="#325424" />
          <path d="M490 118 Q494 106 490 96 M490 118 Q498 108 506 112" stroke="#325424" />
          <path d="M740 122 Q744 110 740 100 M740 122 Q748 112 756 116" stroke="#325424" />
          <path d="M930 130 Q934 118 930 108 M930 130 Q938 120 946 124" stroke="#325424" />

          {/* Road Cobblestones */}
          <ellipse
            cx="120"
            cy="180"
            rx="8"
            ry="4"
            fill="#7a6955"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="320"
            cy="195"
            rx="10"
            ry="5"
            fill="#8c7860"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          {/* Lada folk pentagram cobblestone */}
          <g id="lada-pentagram-cobblestone">
            <ellipse
              cx="560"
              cy="175"
              rx="10"
              ry="5"
              fill="#8c7860"
              stroke="#1c1308"
              strokeWidth="1.6"
            />
            <path
              d="M560 171.5 L562.5 178 L556.5 173.8 L563.5 173.8 L557.5 178 Z"
              fill="#ffd438"
              fillOpacity="0.5"
              stroke="#1c1308"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <ellipse
            cx="780"
            cy="190"
            rx="11"
            ry="5.5"
            fill="#8c7860"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="940"
            cy="185"
            rx="8"
            ry="4"
            fill="#7a6955"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
        </g>
      );
  }
}

function renderScenicLandscape(locId: string, trigger: TriggerEasterEgg, bounce: string | null) {
  switch (locId) {
    case "vesnice":
      return renderVesnice(trigger, bounce);
    case "mlyn":
      return renderMlyn(trigger, bounce);
    case "les":
      return renderLes(trigger, bounce);
    case "rybnik":
      return renderRybnik(trigger, bounce);
    case "zricenina":
      return renderZricenina(trigger, bounce);
    case "hrbitov":
      return renderHrbitov(trigger, bounce);
    case "boss":
      return renderBoss(trigger, bounce);
    default:
      return renderVesnice(trigger, bounce);
  }
}

/* =========================================================================
   1. VESNICE HRUSICE (Sunny Bohemian Homeland with Animated Sun)
   ========================================================================= */
function renderVesnice(trigger: TriggerEasterEgg, bounce: string | null) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Sunny Sky */}
      <rect width="1000" height="400" fill="#7fc2eb" />

      {/* ===================================================================
          ANIMATED JOSEF LADA SUN (Sluníčko s paprsky, pulzem a mrkáním)
          Interactive Clickable Folk Easter Egg
          =================================================================== */}
      <g
        transform="translate(160, 75)"
        className={`anim-lada-sun-pulse interactive-scenic ${bounce === "vesnice-sun" ? "anim-easter-bounce" : ""}`}
        style={{ transformOrigin: "160px 75px" }}
        onClick={(e) =>
          trigger(e, "vesnice-sun", () => sound.playChime(), "Sluníčko se usmívá!", "sun")
        }
      >
        {/* Soft Golden Outer Halo */}
        <circle cx="0" cy="0" r="48" fill="#ffeaa0" opacity="0.35" />

        {/* Continuous Rotating Decorative Sun Rays */}
        <g className="anim-lada-sun-rays" style={{ transformOrigin: "0px 0px" }}>
          {/* 12 Radiant Flame & Pointed Rays radiating from center */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
            const isLong = idx % 2 === 0;
            return (
              <g key={angle} transform={`rotate(${angle})`}>
                {isLong ? (
                  // Curved flame ray
                  <path
                    d="M-5 -34 Q0 -52 6 -56 Q2 -44 5 -34 Z"
                    fill="#f4c23c"
                    stroke="#1c1308"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                ) : (
                  // Straight needle ray
                  <polygon
                    points="-3,-34 0,-48 3,-34"
                    fill="#ffd966"
                    stroke="#1c1308"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Central Sun Disk */}
        <circle cx="0" cy="0" r="33" fill="#f4c23c" stroke="#1c1308" strokeWidth="3.5" />
        {/* Golden internal warm gradient rim */}
        <circle cx="0" cy="0" r="28" fill="#ffd447" opacity="0.6" />

        {/* Friendly Folk Face of the Sun */}
        {/* Rosy blushing cheeks */}
        <circle cx="-13" cy="7" r="5.5" fill="#f07258" opacity="0.75" />
        <circle cx="13" cy="7" r="5.5" fill="#f07258" opacity="0.75" />

        {/* Cheerful Nose Curve */}
        <path
          d="M-2 -3 Q3 1 0 6"
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Warm Smiling Mouth with laugh corner dots */}
        <path
          d="M-10 10 Q0 20 10 10"
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="-10" cy="10" r="1" fill="#1c1308" />
        <circle cx="10" cy="10" r="1" fill="#1c1308" />

        {/* Eyebrows */}
        <path
          d="M-13 -9 Q-8 -13 -3 -9"
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M3 -9 Q8 -13 13 -9"
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Animated Blinking Eyes */}
        <g className="anim-lada-sun-wink" style={{ transformOrigin: "0px -5px" }}>
          <circle cx="-8" cy="-5" r="2.8" fill="#1c1308" />
          <circle cx="8" cy="-5" r="2.8" fill="#1c1308" />
          {/* Tiny cute eye catchlight */}
          <circle cx="-7" cy="-6" r="0.9" fill="#ffffff" />
          <circle cx="9" cy="-6" r="0.9" fill="#ffffff" />
        </g>
      </g>

      {/* ===================================================================
          ANIMATED DRIFTING CLOUDS
          =================================================================== */}
      <g className="anim-cloud-drift-1">
        <g
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="2.8"
          opacity="0.95"
          transform="translate(340, 50)"
        >
          <path d="M0 25 Q20 5 50 15 Q80 0 110 18 Q140 12 155 35 Q150 55 120 55 L20 55 Q-10 55 0 25 Z" />
        </g>
      </g>

      <g className="anim-cloud-drift-2">
        <g
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="2.8"
          opacity="0.92"
          transform="translate(680, 65)"
        >
          <path d="M0 20 Q18 2 45 12 Q70 -2 95 15 Q120 8 135 28 Q130 48 105 48 L18 48 Q-8 48 0 20 Z" />
        </g>
      </g>

      {/* ===================================================================
          FLYING SWALLOWS (Jiřičky nad Hrusicemi)
          =================================================================== */}
      <g className="anim-bird-glide-1" transform="translate(480, 85)">
        <g className="anim-wing-flap">
          {/* Swallow silhouette in folk black ink */}
          <path d="M0 0 Q8 -8 16 -3 Q8 0 6 6 Q4 0 0 0 Z" fill="#1c1308" />
          <path d="M0 0 Q-8 -8 -16 -3 Q-8 0 -6 6 Q-4 0 0 0 Z" fill="#1c1308" />
          <polygon points="0,0 2,12 -2,12" fill="#1c1308" />
        </g>
      </g>

      {/* Distant Rolling Bohemian Hills (Hrusické kopečky) */}
      <path
        d="M0 230 Q280 155 550 205 Q780 150 1000 215 L1000 400 L0 400 Z"
        fill="#66a34c"
        stroke="#1c1308"
        strokeWidth="3.5"
      />
      <path
        d="M0 260 Q320 200 620 240 Q840 195 1000 250 L1000 400 L0 400 Z"
        fill="#518c39"
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* Distant Hrusice Church of St. Havel Spire */}
      <g transform="translate(730, 105)">
        <rect x="8" y="24" width="26" height="50" fill="#f6eedc" stroke="#1c1308" strokeWidth="3" />
        {/* Church clock */}
        <circle cx="21" cy="38" r="6" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
        <line
          x1="21"
          y1="38"
          x2="21"
          y2="34"
          stroke="#1c1308"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="21"
          y1="38"
          x2="24"
          y2="38"
          stroke="#1c1308"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Church bell swinging */}
        <g className="anim-bell-swing" style={{ transformOrigin: "21px 54px" }}>
          <path
            d="M18 52 Q21 48 24 52 L25 57 L17 57 Z"
            fill="#c48a25"
            stroke="#1c1308"
            strokeWidth="1.2"
          />
        </g>
        {/* Red onion spire & cross */}
        <polygon points="5,24 21,-2 37,24" fill="#bd3620" stroke="#1c1308" strokeWidth="3" />
        <line x1="21" y1="-2" x2="21" y2="-9" stroke="#1c1308" strokeWidth="2.5" />
        <line x1="17" y1="-5" x2="25" y2="-5" stroke="#1c1308" strokeWidth="2" />
        {/* Animated rooster weathervane */}
        <path
          d="M21 -9 Q26 -11 25 -14 Q23 -11 21 -11"
          fill="#f4c23c"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>

      {/* ===================================================================
          EXTRA VILLAGE HOUSES & TREES (Roubenka, Stodola, Lípa, Jabloň, Studna)
          =================================================================== */}
      {/* 1. Second Rustic Roubenka Cottage on the left hillside */}
      <g transform="translate(60, 145)">
        {/* Timber log walls */}
        <rect
          x="0"
          y="24"
          width="95"
          height="52"
          fill="#c49a62"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        {/* Horizontal log lines */}
        <line x1="0" y1="36" x2="95" y2="36" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="0" y1="48" x2="95" y2="48" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="0" y1="60" x2="95" y2="60" stroke="#1c1308" strokeWidth="1.5" />
        {/* Overhanging dark thatch/shingle roof */}
        <polygon points="-10,26 48,-6 105,26" fill="#8f4625" stroke="#1c1308" strokeWidth="3.5" />
        {/* Small chimney with smoke puff */}
        <rect
          x="18"
          y="-4"
          width="12"
          height="18"
          fill="#5c2b18"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="-8"
          r="4.5"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1.2"
          className="anim-chimney-smoke-1"
        />
        {/* Multi-pane window with green shutters */}
        <rect
          x="16"
          y="34"
          width="20"
          height="20"
          fill="#4d7296"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <line x1="26" y1="34" x2="26" y2="54" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="16" y1="44" x2="36" y2="44" stroke="#ffffff" strokeWidth="1.5" />
        <rect
          x="8"
          y="34"
          width="8"
          height="20"
          fill="#2d5e2e"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        <rect
          x="36"
          y="34"
          width="8"
          height="20"
          fill="#2d5e2e"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        {/* Wooden door */}
        <rect
          x="62"
          y="38"
          width="16"
          height="38"
          fill="#523214"
          stroke="#1c1308"
          strokeWidth="2"
        />
        {/* Woodpile stacked under the eave (Hranice dříví) */}
        <g stroke="#1c1308" strokeWidth="1.2">
          <ellipse cx="86" cy="68" rx="4.5" ry="3.5" fill="#d99f57" />
          <ellipse cx="91" cy="63" rx="4" ry="3" fill="#d99f57" />
          <ellipse cx="88" cy="57" rx="3.5" ry="3" fill="#d99f57" />
        </g>
      </g>

      {/* 2. Village Barn (Stodola s doškovou střechou) on upper ridge */}
      <g transform="translate(530, 142)">
        <rect
          x="0"
          y="26"
          width="105"
          height="54"
          fill="#8f6b47"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        <polygon points="-8,28 52,-8 114,28" fill="#d49b4b" stroke="#1c1308" strokeWidth="3.5" />
        {/* Mossy straw thatch ridge */}
        <path d="M-8 28 Q52 -10 114 28" fill="none" stroke="#3b6928" strokeWidth="3" />
        {/* Double barn doors */}
        <rect
          x="32"
          y="36"
          width="40"
          height="44"
          fill="#4d2f16"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="52" y1="36" x2="52" y2="80" stroke="#1c1308" strokeWidth="2" />
        <line x1="32" y1="36" x2="52" y2="80" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="72" y1="36" x2="52" y2="80" stroke="#1c1308" strokeWidth="1.5" />
      </g>

      {/* 3. Grand Leafy Linden Tree (Mohutná lípa) on right hill */}
      <g transform="translate(865, 80)">
        {/* Tree trunk with gnarled Lada bark */}
        <path
          d="M38 150 C32 100 24 50 35 0 C46 50 48 100 44 150 Z"
          fill="#4d3018"
          stroke="#1c1308"
          strokeWidth="4"
        />
        {/* Spreading cloud-like foliage crowns */}
        <circle cx="36" cy="-10" r="42" fill="#2d6e2e" stroke="#1c1308" strokeWidth="3.5" />
        <circle cx="0" cy="10" r="32" fill="#388c3a" stroke="#1c1308" strokeWidth="3" />
        <circle cx="68" cy="15" r="34" fill="#388c3a" stroke="#1c1308" strokeWidth="3" />
        <circle cx="36" cy="18" r="36" fill="#48a64a" stroke="#1c1308" strokeWidth="3" />
        {/* Wooden bench under the linden (Lavička pod lípou) */}
        <rect
          x="15"
          y="145"
          width="48"
          height="6"
          fill="#754b23"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <line x1="20" y1="151" x2="20" y2="162" stroke="#1c1308" strokeWidth="2.5" />
        <line x1="58" y1="151" x2="58" y2="162" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* 4. Apple Orchard Tree with ripe red apples (Jabloň se zralými jablky) */}
      <g transform="translate(265, 155)">
        <path
          d="M22 65 Q25 35 20 18 Q30 35 28 65 Z"
          fill="#4d3018"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <circle cx="24" cy="10" r="26" fill="#388c3a" stroke="#1c1308" strokeWidth="3" />
        <circle cx="10" cy="14" r="18" fill="#48a64a" stroke="#1c1308" strokeWidth="2.5" />
        <circle cx="36" cy="16" r="18" fill="#48a64a" stroke="#1c1308" strokeWidth="2.5" />
        {/* Red apples */}
        <circle cx="16" cy="6" r="3" fill="#d92b1a" stroke="#1c1308" strokeWidth="1" />
        <circle cx="28" cy="2" r="3" fill="#d92b1a" stroke="#1c1308" strokeWidth="1" />
        <circle cx="32" cy="18" r="3" fill="#d92b1a" stroke="#1c1308" strokeWidth="1" />
        <circle cx="18" cy="20" r="2.8" fill="#d92b1a" stroke="#1c1308" strokeWidth="1" />
      </g>

      {/* 5. Village Well with Sweep & Wooden Roof (Roubená studna) */}
      <g transform="translate(660, 185)">
        <rect
          x="0"
          y="16"
          width="34"
          height="24"
          fill="#8f6b47"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="0" y1="24" x2="34" y2="24" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="0" y1="32" x2="34" y2="32" stroke="#1c1308" strokeWidth="1.5" />
        {/* Well posts and shingle roof */}
        <line x1="6" y1="16" x2="6" y2="2" stroke="#1c1308" strokeWidth="2.5" />
        <line x1="28" y1="16" x2="28" y2="2" stroke="#1c1308" strokeWidth="2.5" />
        <polygon points="0,4 17,-8 34,4" fill="#a64d26" stroke="#1c1308" strokeWidth="2" />
        {/* Bucket */}
        <rect
          x="13"
          y="12"
          width="8"
          height="10"
          fill="#4d3018"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
      </g>

      {/* 6. Wayside Shrine (Boží muka) on meadow knoll */}
      <g transform="translate(775, 185)">
        <rect
          x="0"
          y="14"
          width="14"
          height="32"
          fill="#fcf6e8"
          stroke="#1c1308"
          strokeWidth="2.2"
        />
        <polygon points="-3,14 7,4 17,14" fill="#8f4625" stroke="#1c1308" strokeWidth="2" />
        <line x1="7" y1="4" x2="7" y2="-2" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="4" y1="0" x2="10" y2="0" stroke="#1c1308" strokeWidth="1.2" />
        {/* Niche with tiny folk saint depiction */}
        <circle cx="7" cy="22" r="3" fill="#ffd438" stroke="#1c1308" strokeWidth="1" />
      </g>

      {/* Cozy Whitewashed Roubenka Cottage with smoking chimney */}
      <g transform="translate(360, 125)">
        {/* Wall */}
        <rect
          x="0"
          y="34"
          width="135"
          height="70"
          fill="#fcf6e8"
          stroke="#1c1308"
          strokeWidth="4"
        />
        {/* Red shingle roof */}
        <polygon points="-14,36 67,-10 148,36" fill="#c4321d" stroke="#1c1308" strokeWidth="4" />
        {/* Chimney */}
        <rect
          x="25"
          y="-4"
          width="17"
          height="26"
          fill="#8f4a38"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        {/* Multi-stage animated billowing chimney smoke puffs */}
        <circle
          cx="33"
          cy="-10"
          r="6.5"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1.5"
          className="anim-chimney-smoke-1"
        />
        <circle
          cx="40"
          cy="-22"
          r="9"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1.5"
          className="anim-chimney-smoke-2"
        />
        <circle
          cx="49"
          cy="-36"
          r="12"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1.5"
          className="anim-chimney-smoke-3"
        />

        {/* Windows with blue frames & red geranium flower boxes */}
        <rect
          x="20"
          y="50"
          width="28"
          height="28"
          fill="#4d7296"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="34" y1="50" x2="34" y2="78" stroke="#ffffff" strokeWidth="2" />
        <line x1="20" y1="64" x2="48" y2="64" stroke="#ffffff" strokeWidth="2" />
        <rect
          x="18"
          y="76"
          width="32"
          height="5"
          fill="#8f4a38"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        <circle cx="23" cy="76" r="2.5" fill="#d4321d" />
        <circle cx="34" cy="75" r="2.5" fill="#d4321d" />
        <circle cx="45" cy="76" r="2.5" fill="#d4321d" />

        <rect
          x="78"
          y="50"
          width="28"
          height="28"
          fill="#4d7296"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="92" y1="50" x2="92" y2="78" stroke="#ffffff" strokeWidth="2" />
        <line x1="78" y1="64" x2="106" y2="64" stroke="#ffffff" strokeWidth="2" />
        <rect
          x="76"
          y="76"
          width="32"
          height="5"
          fill="#8f4a38"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        <circle cx="81" cy="76" r="2.5" fill="#d4321d" />
        <circle cx="92" cy="75" r="2.5" fill="#d4321d" />
        <circle cx="103" cy="76" r="2.5" fill="#d4321d" />

        {/* Wooden Door */}
        <rect
          x="114"
          y="58"
          width="16"
          height="46"
          fill="#694322"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <circle cx="118" cy="80" r="2" fill="#ffd438" />
      </g>

      {/* Wooden Picket Fence with Swaying Sunflowers */}
      <g transform="translate(180, 195)">
        {/* Fence rails */}
        <line x1="0" y1="20" x2="120" y2="20" stroke="#1c1308" strokeWidth="3" />
        <line x1="0" y1="36" x2="120" y2="36" stroke="#1c1308" strokeWidth="3" />
        {/* Pickets */}
        {[10, 32, 54, 76, 98, 115].map((x) => (
          <polygon
            key={x}
            points={`${x},48 ${x + 6},8 ${x + 12},48`}
            fill="#dba864"
            stroke="#1c1308"
            strokeWidth="2"
          />
        ))}
        {/* Swaying Sunflower with interactive chime */}
        <g
          className={`anim-wind-sway interactive-scenic ${bounce === "vesnice-slunecnice" ? "anim-easter-bounce" : ""}`}
          style={{ transformOrigin: "42px 48px" }}
          onClick={(e) =>
            trigger(e, "vesnice-slunecnice", () => sound.playChime(), "Cink-cink!", "sunflower")
          }
        >
          <line x1="42" y1="48" x2="42" y2="-6" stroke="#2b5e1e" strokeWidth="4" />
          <path d="M42 20 Q54 15 52 28" fill="#326e24" stroke="#1c1308" strokeWidth="1.5" />
          {/* Flower head */}
          <circle cx="42" cy="-6" r="14" fill="#f4c23c" stroke="#1c1308" strokeWidth="2" />
          <circle cx="42" cy="-6" r="7" fill="#4d2f16" stroke="#1c1308" strokeWidth="1.8" />
        </g>
        {/* Černý kocour sitting on fence post with animated swishing tail - CLICKABLE EASTER EGG */}
        <g
          transform="translate(106, -10)"
          className={`interactive-scenic ${bounce === "vesnice-kocour" ? "anim-easter-bounce" : ""}`}
          onClick={(e) => trigger(e, "vesnice-kocour", () => sound.playMeow(), "Mňáááu!", "cat")}
        >
          {/* Kocourův kroutící se ocásek */}
          <g className="anim-cat-tail" style={{ transformOrigin: "6px 14px" }}>
            <path
              d="M6 14 Q-2 18 -4 26 Q-2 32 4 30"
              fill="none"
              stroke="#1c1308"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          {/* Plump black body & paws */}
          <ellipse cx="6" cy="10" rx="9" ry="7" fill="#1c1308" />
          {/* Red ribbon collar with bell */}
          <ellipse cx="6" cy="4" rx="7" ry="2" fill="#d4321d" />
          <circle cx="6" cy="5" r="1.5" fill="#ffd438" />
          {/* Head & perked ears */}
          <circle cx="6" cy="0" r="6" fill="#1c1308" />
          <polygon points="1,0 3,-6 7,-1" fill="#1c1308" />
          <polygon points="11,0 9,-6 5,-1" fill="#1c1308" />
          {/* Glowing emerald green blinking eyes & pink nose */}
          <g className="anim-eye-pulse">
            <circle cx="3.8" cy="-1" r="1.6" fill="#42f584" />
            <circle cx="8.2" cy="-1" r="1.6" fill="#42f584" />
            <circle cx="3.8" cy="-1" r="0.7" fill="#1c1308" />
            <circle cx="8.2" cy="-1" r="0.7" fill="#1c1308" />
          </g>
          <polygon points="6,1 5,3 7,3" fill="#fca5a5" />
          {/* White whiskers */}
          <line x1="2" y1="2" x2="-4" y2="1" stroke="#ffffff" strokeWidth="0.9" opacity="0.8" />
          <line x1="2" y1="3" x2="-4" y2="4" stroke="#ffffff" strokeWidth="0.9" opacity="0.8" />
          <line x1="10" y1="2" x2="16" y2="1" stroke="#ffffff" strokeWidth="0.9" opacity="0.8" />
          <line x1="10" y1="3" x2="16" y2="4" stroke="#ffffff" strokeWidth="0.9" opacity="0.8" />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: KOZIČKA BĚLUŠE (White Nanny Goat Grazing on Hill)
          =================================================================== */}
      <g
        transform="translate(65, 172)"
        className={`anim-animal-graze interactive-scenic ${bounce === "vesnice-koza" ? "anim-easter-bounce" : ""}`}
        style={{ transformOrigin: "12px 35px" }}
        onClick={(e) => trigger(e, "vesnice-koza", () => sound.playChime(), "Bééé-mééé!", "goat")}
      >
        {/* Goat Legs */}
        <line
          x1="14"
          y1="26"
          x2="12"
          y2="42"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="26"
          x2="19"
          y2="42"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="26"
          x2="34"
          y2="42"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="42"
          y1="26"
          x2="43"
          y2="42"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Plump Body */}
        <ellipse cx="28" cy="20" rx="18" ry="12" fill="#f8f4eb" stroke="#1c1308" strokeWidth="3" />
        {/* Little Tail */}
        <path
          d="M44 14 Q50 10 47 18"
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Neck and Head dipping down to nibble green grass */}
        <path d="M14 20 L5 12 Q1 16 7 26 Z" fill="#f8f4eb" stroke="#1c1308" strokeWidth="2.5" />
        <ellipse cx="5" cy="18" rx="7" ry="5" fill="#f8f4eb" stroke="#1c1308" strokeWidth="2.5" />
        {/* Horns */}
        <path
          d="M9 12 Q13 4 19 6"
          fill="none"
          stroke="#69533c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Ear & Eye */}
        <ellipse
          cx="11"
          cy="16"
          rx="3.5"
          ry="2"
          fill="#e8dcc8"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
        <circle cx="4" cy="16" r="1.3" fill="#1c1308" />
        {/* Little Brass Goat Bell around neck */}
        <circle cx="11" cy="24" r="2.2" fill="#f4c23c" stroke="#1c1308" strokeWidth="1" />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: BÍLÁ HUSA S HOUSÁTKEM (Goose & Gosling on meadow verge)
          =================================================================== */}
      <g
        transform="translate(25, 224)"
        className={`anim-goose-waddle interactive-scenic ${bounce === "vesnice-husa" ? "anim-easter-bounce" : ""}`}
        style={{ transformOrigin: "15px 25px" }}
        onClick={(e) =>
          trigger(e, "vesnice-husa", () => sound.playComicPop(0.8), "Gá-gá-gá!", "duck")
        }
      >
        {/* Mother Goose */}
        <line
          x1="14"
          y1="22"
          x2="12"
          y2="30"
          stroke="#f4982c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="22"
          x2="22"
          y2="30"
          stroke="#f4982c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse cx="18" cy="16" rx="12" ry="8" fill="#ffffff" stroke="#1c1308" strokeWidth="2.5" />
        {/* Upright neck & head */}
        <path
          d="M10 16 Q8 6 12 2"
          fill="none"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="12" cy="3" rx="4.5" ry="3" fill="#ffffff" stroke="#1c1308" strokeWidth="2" />
        <polygon points="16,2 22,4 16,6" fill="#f4982c" stroke="#1c1308" strokeWidth="1" />
        <circle cx="11" cy="2" r="0.8" fill="#1c1308" />
        {/* Tiny Gosling trailing behind */}
        <g transform="translate(26, 12)">
          <ellipse
            cx="6"
            cy="6"
            rx="5"
            ry="3.5"
            fill="#fadc55"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="4" r="2.5" fill="#fadc55" stroke="#1c1308" strokeWidth="1.2" />
          <polygon points="12,4 15,4.5 12,5.5" fill="#f4982c" stroke="#1c1308" strokeWidth="0.8" />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: BABOČKA PAVÍ OKO (Folk Butterfly Dancing over Flowers)
          =================================================================== */}
      <g className="anim-butterfly-flutter" transform="translate(225, 135)">
        <g className="anim-butterfly-wings">
          <path
            d="M0 0 Q-8 -10 -2 -14 Q6 -10 0 0 Z"
            fill="#c4321d"
            stroke="#1c1308"
            strokeWidth="1.2"
          />
          <circle cx="-1" cy="-10" r="1.8" fill="#ffd438" />
          <circle cx="-1" cy="-10" r="0.8" fill="#1c4b7d" />
          <path
            d="M0 0 Q8 -10 2 -14 Q-6 -10 0 0 Z"
            fill="#c4321d"
            stroke="#1c1308"
            strokeWidth="1.2"
          />
          <circle cx="1" cy="-10" r="1.8" fill="#ffd438" />
          <circle cx="1" cy="-10" r="0.8" fill="#1c4b7d" />
          <line
            x1="0"
            y1="-2"
            x2="0"
            y2="6"
            stroke="#1c1308"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

/* =========================================================================
   2. KLAPÁČŮV MLÝN (Watermill with Animated Spinning Waterwheel & Splashes)
   ========================================================================= */
function renderMlyn(trigger: TriggerEasterEgg, bounce: string | null) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Morning Sky with Soft Blue and Golden Haze */}
      <rect width="1000" height="400" fill="#a4cde8" />

      {/* Early Morning Sun behind Hill - Clickable */}
      <g
        className={`interactive-scenic ${bounce === "mlyn-sun" ? "anim-easter-bounce" : ""}`}
        onClick={(e) => trigger(e, "mlyn-sun", () => sound.playChime(), "Ranní sluníčko!", "sun")}
      >
        <circle
          cx="860"
          cy="70"
          r="32"
          fill="#fff6d1"
          stroke="#1c1308"
          strokeWidth="2.5"
          opacity="0.95"
        />
        <circle cx="860" cy="70" r="45" fill="#ffeaa3" opacity="0.25" />
      </g>

      {/* Lada Fluffy Clouds */}
      <g className="anim-cloud-drift-1">
        <g
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="2.6"
          opacity="0.9"
          transform="translate(120, 60)"
        >
          <path d="M0 20 Q20 -5 50 5 Q80 -10 110 10 Q140 5 150 25 Q150 45 120 45 L20 45 Q-5 45 0 20 Z" />
        </g>
      </g>

      {/* Distant Bohemian Hills & River Bank */}
      <path
        d="M0 235 Q250 165 520 215 Q780 155 1000 225 L1000 400 L0 400 Z"
        fill="#6da84f"
        stroke="#1c1308"
        strokeWidth="3"
      />
      <path
        d="M0 265 Q280 205 600 255 Q820 215 1000 270 L1000 400 L0 400 Z"
        fill="#528e3b"
        stroke="#1c1308"
        strokeWidth="3"
      />

      {/* Millpond & Water Stream */}
      <path
        d="M280 400 Q400 255 620 265 Q800 275 940 400 Z"
        fill="#42789e"
        stroke="#1c1308"
        strokeWidth="3"
      />
      {/* Moving water flow ripples */}
      <line
        x1="420"
        y1="305"
        x2="510"
        y2="305"
        stroke="#79aed4"
        strokeWidth="3"
        strokeLinecap="round"
        className="anim-water-ripple"
      />
      <line
        x1="670"
        y1="325"
        x2="770"
        y2="325"
        stroke="#79aed4"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="anim-water-ripple-2"
      />

      {/* ===================================================================
          EXTRA MILL HOUSES & TREES (Špejchar, Pekařství, Vrby, Lávka, Žebřiňák)
          =================================================================== */}
      {/* 1. Baker's Cottage on the left grassy bank */}
      <g transform="translate(75, 160)">
        <rect x="0" y="24" width="85" height="46" fill="#fcf6e8" stroke="#1c1308" strokeWidth="3" />
        <polygon points="-8,26 42,-4 92,26" fill="#b83820" stroke="#1c1308" strokeWidth="3" />
        <rect
          x="15"
          y="-2"
          width="12"
          height="16"
          fill="#693424"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        <circle
          cx="21"
          cy="-6"
          r="4"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-chimney-smoke-1"
        />
        {/* Windows and door */}
        <rect
          x="14"
          y="32"
          width="18"
          height="18"
          fill="#4d7296"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        <line x1="23" y1="32" x2="23" y2="50" stroke="#ffffff" strokeWidth="1.2" />
        <rect
          x="52"
          y="34"
          width="14"
          height="36"
          fill="#5c381c"
          stroke="#1c1308"
          strokeWidth="2"
        />
      </g>

      {/* 2. Miller's Granary & Storehouse (Špejchar / sýpka) next to the mill */}
      <g transform="translate(230, 145)">
        <rect
          x="0"
          y="25"
          width="80"
          height="60"
          fill="#c49e68"
          stroke="#1c1308"
          strokeWidth="3.2"
        />
        {/* Timber beams */}
        <line x1="0" y1="45" x2="80" y2="45" stroke="#1c1308" strokeWidth="2" />
        <line x1="0" y1="65" x2="80" y2="65" stroke="#1c1308" strokeWidth="2" />
        <polygon points="-6,26 40,-6 86,26" fill="#753d20" stroke="#1c1308" strokeWidth="3.2" />
        {/* Hoist beam & attic window */}
        <rect
          x="32"
          y="10"
          width="16"
          height="14"
          fill="#2b1a10"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        <line x1="40" y1="-2" x2="40" y2="12" stroke="#5c381c" strokeWidth="3" />
        {/* Stack of firewood */}
        <ellipse cx="72" cy="78" rx="5" ry="3.5" fill="#e0a35c" stroke="#1c1308" strokeWidth="1" />
        <ellipse cx="75" cy="73" rx="4.5" ry="3" fill="#e0a35c" stroke="#1c1308" strokeWidth="1" />
      </g>

      {/* 3. Row of Pollarded Willows (Hlavaté vrby) & Birches along the mill stream */}
      <g transform="translate(690, 155)">
        {/* Willow 2 */}
        <path
          d="M16 65 Q18 35 12 18 Q22 35 24 65 Z"
          fill="#4d321c"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <circle cx="15" cy="16" r="11" fill="#4d321c" stroke="#1c1308" strokeWidth="2.5" />
        <g className="anim-wind-sway" style={{ transformOrigin: "15px 16px" }}>
          <path
            d="M15 16 Q-2 2 -8 18 M15 16 Q8 -8 4 -22 M15 16 Q28 -6 32 10 M15 16 Q35 8 40 24"
            fill="none"
            stroke="#3b6928"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g transform="translate(810, 160)">
        {/* Willow 3 */}
        <path
          d="M14 60 Q16 30 10 15 Q20 30 20 60 Z"
          fill="#4d321c"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <circle cx="14" cy="14" r="10" fill="#4d321c" stroke="#1c1308" strokeWidth="2.5" />
        <g className="anim-wind-sway" style={{ transformOrigin: "14px 14px" }}>
          <path
            d="M14 14 Q-4 2 -6 16 M14 14 Q10 -6 8 -18 M14 14 Q26 -4 28 8 M14 14 Q32 6 36 20"
            fill="none"
            stroke="#3b6928"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </g>
      {/* Riverbank Birch Tree (Břízka s bílou kůrou) */}
      <g transform="translate(890, 125)">
        <path
          d="M12 90 Q15 45 10 0 Q20 45 18 90 Z"
          fill="#f0ebe1"
          stroke="#1c1308"
          strokeWidth="3"
        />
        {/* Birch black notches */}
        <line x1="11" y1="20" x2="16" y2="22" stroke="#1c1308" strokeWidth="2" />
        <line x1="12" y1="42" x2="18" y2="44" stroke="#1c1308" strokeWidth="2" />
        <line x1="13" y1="65" x2="19" y2="67" stroke="#1c1308" strokeWidth="2" />
        {/* Light leafy canopy */}
        <circle cx="14" cy="-5" r="22" fill="#529e44" stroke="#1c1308" strokeWidth="2.5" />
        <circle cx="2" cy="10" r="16" fill="#62b552" stroke="#1c1308" strokeWidth="2" />
        <circle cx="26" cy="12" r="16" fill="#62b552" stroke="#1c1308" strokeWidth="2" />
      </g>

      {/* 4. Wooden Footbridge across the mill stream (Dřevěná lávka) */}
      <g transform="translate(605, 215)">
        {/* Arched wooden plank bridge */}
        <path
          d="M0 24 Q30 14 60 24"
          fill="none"
          stroke="#5c381c"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Handrail posts */}
        <line x1="10" y1="22" x2="10" y2="8" stroke="#1c1308" strokeWidth="2" />
        <line x1="30" y1="18" x2="30" y2="4" stroke="#1c1308" strokeWidth="2" />
        <line x1="50" y1="22" x2="50" y2="8" stroke="#1c1308" strokeWidth="2" />
        <path
          d="M8 9 Q30 2 52 9"
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* 5. Flour Wagon / Cart (Žebřiňák na mouku s loukoťovými koly) */}
      <g transform="translate(325, 218)">
        {/* Wooden cart bed */}
        <polygon points="0,6 44,0 48,16 2,20" fill="#8f633d" stroke="#1c1308" strokeWidth="2" />
        {/* Spoked wheels */}
        <circle cx="10" cy="20" r="11" fill="#4d3018" stroke="#1c1308" strokeWidth="2" />
        <circle cx="10" cy="20" r="4" fill="#baa084" />
        <circle cx="40" cy="18" r="11" fill="#4d321c" stroke="#1c1308" strokeWidth="2" />
        <circle cx="40" cy="18" r="4" fill="#baa084" />
        {/* Flour sacks loaded in cart */}
        <ellipse cx="20" cy="4" rx="7" ry="5.5" fill="#f0e6d2" stroke="#1c1308" strokeWidth="1.2" />
        <ellipse cx="32" cy="2" rx="7" ry="5.5" fill="#f0e6d2" stroke="#1c1308" strokeWidth="1.2" />
      </g>

      {/* Watermill Cottage */}
      <g transform="translate(380, 155)">
        {/* Cottage walls */}
        <rect
          x="0"
          y="45"
          width="135"
          height="75"
          fill="#f6eedb"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        {/* Timber framing beam */}
        <line x1="0" y1="80" x2="135" y2="80" stroke="#704b2b" strokeWidth="3" />
        {/* Red shingle roof */}
        <polygon points="-16,48 68,5 150,48" fill="#c4381f" stroke="#1c1308" strokeWidth="4" />
        {/* Smoking chimney */}
        <rect
          x="25"
          y="10"
          width="16"
          height="28"
          fill="#8c4735"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <circle
          cx="33"
          cy="4"
          r="5"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1.5"
          className="anim-chimney-smoke-1"
        />
        <circle
          cx="38"
          cy="-8"
          r="8"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1.5"
          className="anim-chimney-smoke-2"
        />
        <circle
          cx="46"
          cy="-22"
          r="11"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1.5"
          className="anim-chimney-smoke-3"
        />

        {/* Windows */}
        <rect
          x="20"
          y="62"
          width="26"
          height="26"
          fill="#385878"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="33" y1="62" x2="33" y2="88" stroke="#f6eedb" strokeWidth="2" />
        <line x1="20" y1="75" x2="46" y2="75" stroke="#f6eedb" strokeWidth="2" />
        <rect
          x="75"
          y="62"
          width="26"
          height="26"
          fill="#385878"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="88" y1="62" x2="88" y2="88" stroke="#f6eedb" strokeWidth="2" />
        <line x1="75" y1="75" x2="101" y2="75" stroke="#f6eedb" strokeWidth="2" />

        {/* Wooden door with flour sack */}
        <rect
          x="110"
          y="68"
          width="18"
          height="52"
          fill="#664324"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        {/* Flour sack */}
        <ellipse
          cx="104"
          cy="112"
          rx="7"
          ry="9"
          fill="#e8dcc4"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
      </g>

      {/* Wooden Water Sluice Gate (Stavidlo) pouring water */}
      <g transform="translate(515, 230)">
        <rect x="0" y="0" width="12" height="35" fill="#4d321c" stroke="#1c1308" strokeWidth="2" />
        {/* Cascading blue water stream */}
        <path d="M12 10 Q22 15 24 35 L12 35 Z" fill="#79aed4" stroke="#1c1308" strokeWidth="1.5" />
      </g>

      {/* ===================================================================
          ANIMATED SPINNING WATERWHEEL (Otáčející se mlýnské kolo) - Clickable
          =================================================================== */}
      <g
        transform="translate(545, 260)"
        className={`interactive-scenic ${bounce === "mlyn-kolo" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "mlyn-kolo", () => sound.playSplash(), "Klap-klap-klap!", "water")
        }
      >
        {/* Spinning wheel structure */}
        <g
          className="anim-waterwheel-spin"
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        >
          {/* Outer wood wheel */}
          <circle cx="0" cy="0" r="42" fill="#4d321c" stroke="#1c1308" strokeWidth="4" />
          <circle cx="0" cy="0" r="26" fill="#a4cde8" stroke="#1c1308" strokeWidth="3" />
          {/* Wheel spokes and 8 paddle blades */}
          <line x1="-40" y1="0" x2="40" y2="0" stroke="#1c1308" strokeWidth="3.5" />
          <line x1="0" y1="-40" x2="0" y2="40" stroke="#1c1308" strokeWidth="3.5" />
          <line x1="-28" y1="-28" x2="28" y2="28" stroke="#1c1308" strokeWidth="3" />
          <line x1="-28" y1="28" x2="28" y2="-28" stroke="#1c1308" strokeWidth="3" />
          {/* Paddles */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="-4"
              y="-42"
              width="8"
              height="16"
              fill="#694825"
              stroke="#1c1308"
              strokeWidth="1.5"
              transform={`rotate(${deg})`}
            />
          ))}
          {/* Central iron axle hub */}
          <circle cx="0" cy="0" r="8" fill="#1c1308" />
        </g>

        {/* Animated Water Splashes & Frothing Foam Spray */}
        <circle
          cx="38"
          cy="24"
          r="4.2"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-lada-bubble-1"
        />
        <circle
          cx="32"
          cy="34"
          r="5.5"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-lada-bubble-2"
        />
        <circle
          cx="-34"
          cy="28"
          r="4"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-lada-bubble-3"
        />
        <circle
          cx="22"
          cy="38"
          r="3.5"
          fill="#bfe3fa"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-lada-bubble-4"
        />
      </g>

      {/* Characteristic Pollarded Willow (Hlavatá vrba) with Swaying Green Shoots */}
      <g transform="translate(180, 175)">
        <path
          d="M20 95 C24 50 10 25 26 0 C40 25 30 50 34 95 Z"
          fill="#523820"
          stroke="#1c1308"
          strokeWidth="4"
        />
        {/* Swaying leafy branches */}
        <g className="anim-wind-sway" style={{ transformOrigin: "26px 0px" }}>
          <path
            d="M26 4 Q4 8 0 45 M26 4 Q12 -16 6 -26 M26 4 Q42 -20 50 -16 M26 4 Q54 10 60 50"
            fill="none"
            stroke="#467832"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Swallow mud nest under mill cottage eave with hungry chicks */}
      <g transform="translate(485, 195)">
        <path d="M0 0 C4 10 16 10 20 0 Z" fill="#523d2b" stroke="#1c1308" strokeWidth="1.8" />
        <polygon points="6,0 8,-4 10,0" fill="#f4c23c" stroke="#1c1308" strokeWidth="0.8" />
        <polygon points="11,0 13,-5 15,0" fill="#f4c23c" stroke="#1c1308" strokeWidth="0.8" />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: ROSNIČKA (Green Tree Frog on Sluice Riverbank) - Clickable
          =================================================================== */}
      <g
        transform="translate(230, 222)"
        className={`interactive-scenic ${bounce === "mlyn-zaba" ? "anim-easter-bounce" : ""}`}
        onClick={(e) => trigger(e, "mlyn-zaba", () => sound.playCroak(), "Kuňk-kuňk!", "frog")}
      >
        {/* River stone */}
        <ellipse cx="14" cy="22" rx="16" ry="7" fill="#697682" stroke="#1c1308" strokeWidth="2" />
        {/* Frog Body */}
        <ellipse
          cx="14"
          cy="14"
          rx="9"
          ry="6.5"
          fill="#388c3a"
          stroke="#1c1308"
          strokeWidth="2.2"
        />
        {/* Pulsing Creamy Vocal Sac */}
        <circle
          cx="14"
          cy="17"
          r="4.2"
          fill="#fff4b8"
          stroke="#1c1308"
          strokeWidth="0.9"
          className="anim-frog-croak"
        />
        {/* Frog legs */}
        <path
          d="M6 16 Q2 18 5 22"
          fill="none"
          stroke="#256e27"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M22 16 Q26 18 23 22"
          fill="none"
          stroke="#256e27"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Big Blinking Frog Eyes */}
        <circle cx="9" cy="8" r="3" fill="#ffd438" stroke="#1c1308" strokeWidth="1.3" />
        <circle cx="19" cy="8" r="3" fill="#ffd438" stroke="#1c1308" strokeWidth="1.3" />
        <g className="anim-eye-pulse">
          <circle cx="9" cy="8" r="1.4" fill="#1c1308" />
          <circle cx="19" cy="8" r="1.4" fill="#1c1308" />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: KACHNÍ RODINKA (Mallard Mother & Ducklings) - Clickable
          =================================================================== */}
      <g
        className={`interactive-scenic ${bounce === "mlyn-kachny" ? "anim-easter-bounce" : ""}`}
        onClick={(e) => trigger(e, "mlyn-kachny", () => sound.playBubblePop(), "Káč-káč!", "duck")}
      >
        <g transform="translate(210, 290)" className="anim-water-bob">
          <ellipse cx="12" cy="8" rx="14" ry="8" fill="#7a5832" stroke="#1c1308" strokeWidth="2" />
          <circle cx="24" cy="3" r="6" fill="#1b4d24" stroke="#1c1308" strokeWidth="2" />
          <polygon points="29,3 36,5 29,7" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="23" cy="2" r="1" fill="#ffffff" />
        </g>
        {/* Duckling 1 */}
        <g
          transform="translate(250, 305)"
          className="anim-water-bob"
          style={{ animationDelay: "-0.8s" }}
        >
          <ellipse
            cx="6"
            cy="5"
            rx="7"
            ry="4.5"
            fill="#fad74b"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <circle cx="11" cy="3" r="3" fill="#fad74b" stroke="#1c1308" strokeWidth="1.2" />
          <polygon points="13,3 17,4 13,5" fill="#f4982c" stroke="#1c1308" strokeWidth="0.8" />
        </g>
        {/* Duckling 2 */}
        <g
          transform="translate(275, 318)"
          className="anim-water-bob"
          style={{ animationDelay: "-1.6s" }}
        >
          <ellipse cx="6" cy="5" rx="6" ry="4" fill="#fad74b" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="11" cy="3" r="2.8" fill="#fad74b" stroke="#1c1308" strokeWidth="1.2" />
          <polygon points="13,3 16,4 13,5" fill="#f4982c" stroke="#1c1308" strokeWidth="0.8" />
        </g>
      </g>

      {/* Jumping Trout arching out of the mill water - Clickable */}
      <g
        transform="translate(485, 290)"
        className={`anim-catfish-dive interactive-scenic ${bounce === "mlyn-pstruh" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "mlyn-pstruh", () => sound.playSplash(), "Šplouch! Pstruh!", "fish")
        }
      >
        <path d="M0 8 Q8 -8 18 0 Q10 8 0 8 Z" fill="#8cb9db" stroke="#1c1308" strokeWidth="1.8" />
        <polygon points="0,8 -5,4 -4,12" fill="#5c8faa" stroke="#1c1308" strokeWidth="1.2" />
        <circle cx="14" cy="0" r="1.2" fill="#1c1308" />
      </g>
    </svg>
  );
}

/* =========================================================================
   3. HLUBOKÝ BOR (Mystical Pine Forest with Owl, Mist & Glowing Fireflies)
   ========================================================================= */
function renderLes(trigger: TriggerEasterEgg, bounce: string | null) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Deep Forest Dusk Teal Sky */}
      <rect width="1000" height="400" fill="#47736b" />

      {/* Amber dusk horizon glow */}
      <path d="M0 240 Q500 180 1000 240 L1000 400 L0 400 Z" fill="#69856f" opacity="0.5" />

      {/* Distant pine silhouettes (Back row) */}
      <path
        d="M0 190 Q200 150 400 175 Q650 140 1000 170 L1000 400 L0 400 Z"
        fill="#13331b"
        stroke="#1c1308"
        strokeWidth="3"
      />

      {/* ===================================================================
          ANIMATED TRANSLUCENT FOREST MIST
          =================================================================== */}
      <g className="anim-mist-1" opacity="0.45">
        <path
          d="M0 210 Q200 190 450 205 Q700 195 1000 215 L1000 260 Q700 240 450 250 Q200 235 0 255 Z"
          fill="#cce8e0"
        />
      </g>
      <g className="anim-mist-2" opacity="0.35">
        <path
          d="M50 240 Q300 220 550 235 Q800 225 1000 245 L1000 280 Q800 265 550 270 Q300 260 50 275 Z"
          fill="#cce8e0"
        />
      </g>

      {/* Majestic Josef Lada Pine Trees (Swaying in mountain wind) */}
      <g
        transform="translate(120, 85)"
        className="anim-wind-sway"
        style={{ transformOrigin: "35px 130px" }}
      >
        <polygon points="35,0 8,70 62,70" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
        <polygon points="35,-30 14,35 56,35" fill="#1e4726" stroke="#1c1308" strokeWidth="3.5" />
        <polygon points="35,-60 20,0 50,0" fill="#295932" stroke="#1c1308" strokeWidth="3.5" />
        <rect
          x="29"
          y="70"
          width="12"
          height="65"
          fill="#4a2e16"
          stroke="#1c1308"
          strokeWidth="3"
        />
      </g>

      <g
        transform="translate(260, 105)"
        className="anim-wind-sway"
        style={{ transformOrigin: "30px 110px" }}
      >
        <polygon points="30,0 8,60 52,60" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
        <polygon points="30,-25 14,30 46,30" fill="#1e4726" stroke="#1c1308" strokeWidth="3.5" />
        <rect
          x="25"
          y="60"
          width="10"
          height="55"
          fill="#4a2e16"
          stroke="#1c1308"
          strokeWidth="3"
        />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: VEVERKA (Red Squirrel on Pine Trunk with Acorn) - Clickable
          =================================================================== */}
      <g
        transform="translate(152, 125)"
        className={`interactive-scenic ${bounce === "les-veverka" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "les-veverka", () => sound.playChime(), "Čip-čip! Veverka!", "squirrel")
        }
      >
        {/* Animated Bushy Tail */}
        <g className="anim-squirrel-tail" style={{ transformOrigin: "0px 18px" }}>
          <path
            d="M-2 18 C-12 12 -18 0 -8 -12 C-2 -18 10 -12 2 -4 C-2 2 -2 12 -2 18 Z"
            fill="#d45b24"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
        </g>
        {/* Plump Body clinging to pine trunk */}
        <ellipse cx="6" cy="12" rx="7" ry="10" fill="#d45b24" stroke="#1c1308" strokeWidth="2.5" />
        <ellipse cx="8" cy="12" rx="4" ry="7" fill="#fcf2dc" />
        {/* Head & pointy tufted ears */}
        <circle cx="8" cy="2" r="5" fill="#d45b24" stroke="#1c1308" strokeWidth="2" />
        <polygon points="6,-2 8,-7 10,-2" fill="#d45b24" stroke="#1c1308" strokeWidth="1.2" />
        <polygon points="10,-2 12,-7 13,-1" fill="#d45b24" stroke="#1c1308" strokeWidth="1.2" />
        <circle cx="10" cy="1" r="1.2" fill="#1c1308" />
        {/* Hands holding a brown acorn */}
        <ellipse
          cx="13"
          cy="8"
          rx="3.5"
          ry="4.5"
          fill="#694322"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
        <rect x="11.5" y="5" width="3" height="2" fill="#422812" />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: STRAKAPOUD (Woodpecker pecking into bark) - Clickable
          =================================================================== */}
      <g
        transform="translate(282, 135)"
        className={`anim-woodpecker-peck interactive-scenic ${bounce === "les-strakapoud" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "les-strakapoud", () => sound.playWoodpeckerPeck(), "Ťuk-ťuk-ťuk!", "feather")
        }
      >
        {/* Stiff tail brace against bark */}
        <polygon points="0,20 -4,28 4,28" fill="#1c1308" />
        {/* Black and white piebald body */}
        <ellipse cx="2" cy="12" rx="6" ry="9" fill="#1c1308" />
        <ellipse cx="5" cy="12" rx="2.5" ry="6" fill="#ffffff" />
        {/* Head with crimson red nape patch */}
        <circle cx="2" cy="2" r="4.5" fill="#1c1308" />
        <path d="M-1 -1 Q2 -4 5 -1 Z" fill="#d42618" stroke="#1c1308" strokeWidth="1" />
        {/* Sharp beak tapping into tree */}
        <polygon points="-2,1 -10,3 -2,4" fill="#6b7280" stroke="#1c1308" strokeWidth="1" />
        <circle cx="0" cy="1" r="0.9" fill="#ffffff" />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: ZAJÍČEK (Hare peeking from behind mossy knoll) - Clickable
          =================================================================== */}
      <g
        transform="translate(45, 215)"
        className={`interactive-scenic ${bounce === "les-zajic" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "les-zajic", () => sound.playChime(), "Hop-hop! Zajíček!", "hare")
        }
      >
        {/* Wiggling Long Ears */}
        <g className="anim-hare-ears" style={{ transformOrigin: "8px 12px" }}>
          <ellipse
            cx="5"
            cy="2"
            rx="2.5"
            ry="9"
            fill="#9e6e44"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <ellipse cx="5" cy="2" rx="1.2" ry="6" fill="#f0c2a8" />
          <ellipse
            cx="11"
            cy="3"
            rx="2.5"
            ry="8.5"
            fill="#9e6e44"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          <ellipse cx="11" cy="3" rx="1.2" ry="5.5" fill="#f0c2a8" />
        </g>
        {/* Cute Hare Head & Paws */}
        <circle cx="8" cy="14" r="7" fill="#9e6e44" stroke="#1c1308" strokeWidth="2.2" />
        {/* Paws resting on moss */}
        <ellipse cx="4" cy="20" rx="3.5" ry="2" fill="#9e6e44" stroke="#1c1308" strokeWidth="1.2" />
        <ellipse
          cx="12"
          cy="20"
          rx="3.5"
          ry="2"
          fill="#9e6e44"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
        {/* Blinking eyes & twitchy pink nose */}
        <g className="anim-eye-pulse">
          <circle cx="5" cy="12" r="1.3" fill="#1c1308" />
          <circle cx="11" cy="12" r="1.3" fill="#1c1308" />
        </g>
        <polygon points="8,15 7,17 9,17" fill="#fca5a5" />
      </g>

      {/* ===================================================================
          EXTRA FOREST HOUSES & TREES (Hájovna, Dřevorubecká bouda, Břízy, Dub)
          =================================================================== */}
      {/* 1. Forester's Secluded Lodge (Hájovna pod lesem) */}
      <g transform="translate(360, 135)">
        {/* Dark timber log walls */}
        <rect
          x="0"
          y="28"
          width="90"
          height="52"
          fill="#5c3f25"
          stroke="#1c1308"
          strokeWidth="3.2"
        />
        <line x1="0" y1="42" x2="90" y2="42" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="0" y1="56" x2="90" y2="56" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="0" y1="70" x2="90" y2="70" stroke="#1c1308" strokeWidth="1.5" />
        {/* Steep mossy wood shingle roof */}
        <polygon points="-10,30 45,-8 100,30" fill="#382515" stroke="#1c1308" strokeWidth="3.5" />
        <path d="M-8 30 Q45 -6 98 30" fill="none" stroke="#2d5e24" strokeWidth="2.5" />
        {/* Fieldstone chimney with smoke */}
        <rect
          x="18"
          y="-4"
          width="14"
          height="22"
          fill="#52585c"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <circle
          cx="25"
          cy="-8"
          r="4.5"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-chimney-smoke-1"
        />
        {/* Antler crest mounted over door */}
        <path
          d="M40 24 Q45 18 42 12 M45 24 Q50 18 48 12"
          fill="none"
          stroke="#d9d2c5"
          strokeWidth="1.5"
        />
        {/* Warm glowing window */}
        <rect
          x="15"
          y="38"
          width="20"
          height="20"
          fill="#ffd447"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <line x1="25" y1="38" x2="25" y2="58" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="15" y1="48" x2="35" y2="48" stroke="#1c1308" strokeWidth="1.5" />
        {/* Rustic plank door */}
        <rect
          x="52"
          y="42"
          width="16"
          height="38"
          fill="#3b2615"
          stroke="#1c1308"
          strokeWidth="2"
        />
      </g>

      {/* 2. Woodcutter's Lean-to Shelter (Dřevorubecká bouda) */}
      <g transform="translate(560, 155)">
        {/* Slanted open wooden roof */}
        <polygon points="0,15 50,0 52,8 2,23" fill="#694323" stroke="#1c1308" strokeWidth="2.5" />
        <line x1="8" y1="21" x2="8" y2="48" stroke="#1c1308" strokeWidth="3" />
        <line x1="46" y1="8" x2="46" y2="48" stroke="#1c1308" strokeWidth="3" />
        {/* Stacked split pine logs under shelter */}
        <g stroke="#1c1308" strokeWidth="1.2">
          <ellipse cx="18" cy="42" rx="5" ry="4" fill="#d49b5b" />
          <ellipse cx="26" cy="42" rx="5" ry="4" fill="#d49b5b" />
          <ellipse cx="34" cy="42" rx="5" ry="4" fill="#d49b5b" />
          <ellipse cx="22" cy="35" rx="4.5" ry="3.5" fill="#d49b5b" />
          <ellipse cx="30" cy="35" rx="4.5" ry="3.5" fill="#d49b5b" />
        </g>
      </g>

      {/* 3. White Birch Trees (Břízky v boru) */}
      <g transform="translate(485, 115)">
        <path
          d="M10 85 Q13 40 8 0 Q17 40 15 85 Z"
          fill="#f4efe6"
          stroke="#1c1308"
          strokeWidth="2.8"
        />
        <line x1="9" y1="22" x2="14" y2="24" stroke="#1c1308" strokeWidth="1.8" />
        <line x1="10" y1="46" x2="16" y2="48" stroke="#1c1308" strokeWidth="1.8" />
        <line x1="11" y1="68" x2="17" y2="70" stroke="#1c1308" strokeWidth="1.8" />
        {/* Birch leaves */}
        <circle cx="12" cy="-4" r="20" fill="#4d9e3f" stroke="#1c1308" strokeWidth="2.5" />
        <circle cx="2" cy="12" r="14" fill="#5cb54c" stroke="#1c1308" strokeWidth="2" />
        <circle cx="24" cy="10" r="14" fill="#5cb54c" stroke="#1c1308" strokeWidth="2" />
      </g>

      {/* 4. Ancient Gnarled Oak (Starý vykotlaný dub) on right edge */}
      <g transform="translate(895, 90)">
        <path
          d="M30 140 C24 90 14 40 26 0 C38 40 42 90 38 140 Z"
          fill="#3d2a1b"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        <circle cx="28" cy="-8" r="34" fill="#2d5e2a" stroke="#1c1308" strokeWidth="3" />
        <circle cx="0" cy="12" r="24" fill="#3b7a38" stroke="#1c1308" strokeWidth="2.5" />
        <circle cx="54" cy="14" r="26" fill="#3b7a38" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* Hollow Tree with Wise Forest Owl (Sova) - Clickable */}
      <g
        transform="translate(730, 80)"
        className={`interactive-scenic ${bounce === "les-sova" ? "anim-easter-bounce" : ""}`}
        onClick={(e) => trigger(e, "les-sova", () => sound.playOwlHoot(), "Húúú-húúú!", "owl")}
      >
        {/* Pine Tree */}
        <polygon points="38,0 8,75 68,75" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
        <polygon points="38,-35 14,38 62,38" fill="#1e4726" stroke="#1c1308" strokeWidth="3.5" />
        <polygon points="38,-65 22,2 54,2" fill="#295932" stroke="#1c1308" strokeWidth="3.5" />
        <rect
          x="30"
          y="75"
          width="16"
          height="75"
          fill="#4a2e16"
          stroke="#1c1308"
          strokeWidth="3.5"
        />

        {/* Tree hollow knot */}
        <ellipse
          cx="38"
          cy="115"
          rx="10"
          ry="14"
          fill="#1a1208"
          stroke="#1c1308"
          strokeWidth="2.5"
        />

        {/* Blinking Owl inside hollow */}
        <g transform="translate(38, 114)">
          {/* Owl body & ear tufts */}
          <ellipse cx="0" cy="0" rx="7" ry="9" fill="#694d30" />
          <polygon points="-5,-8 -8,-14 -3,-9" fill="#694d30" />
          <polygon points="5,-8 8,-14 3,-9" fill="#694d30" />
          {/* Owl beak */}
          <polygon points="0,-1 1.5,3 -1.5,3" fill="#f4c23c" />
          {/* Owl eyes blinking */}
          <g className="anim-eye-pulse">
            <circle cx="-3.5" cy="-3" r="3.2" fill="#ffd438" stroke="#1c1308" strokeWidth="1" />
            <circle cx="3.5" cy="-3" r="3.2" fill="#ffd438" stroke="#1c1308" strokeWidth="1" />
            <circle cx="-3.5" cy="-3" r="1.5" fill="#1c1308" />
            <circle cx="3.5" cy="-3" r="1.5" fill="#1c1308" />
          </g>
        </g>
      </g>

      <g
        transform="translate(860, 100)"
        className="anim-wind-sway"
        style={{ transformOrigin: "32px 120px" }}
      >
        <polygon points="32,0 8,65 56,65" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
        <polygon points="32,-28 14,32 50,32" fill="#1e4726" stroke="#1c1308" strokeWidth="3.5" />
        <rect
          x="27"
          y="65"
          width="10"
          height="55"
          fill="#4a2e16"
          stroke="#1c1308"
          strokeWidth="3"
        />
      </g>

      {/* ===================================================================
          ANIMATED GLOWING FIREFLIES (Světlušky v lese) - Clickable
          =================================================================== */}
      <g
        className={`interactive-scenic ${bounce === "les-svetlusky" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "les-svetlusky", () => sound.playChime(), "Blik-blik! Světlušky!", "sparkle")
        }
      >
        <g transform="translate(220, 160)" className="anim-firefly-1">
          <circle cx="0" cy="0" r="7" fill="#ffff80" opacity="0.3" />
          <circle cx="0" cy="0" r="3.5" fill="#dfff4f" stroke="#1c1308" strokeWidth="1" />
        </g>
        <g transform="translate(420, 140)" className="anim-firefly-2">
          <circle cx="0" cy="0" r="7" fill="#ffff80" opacity="0.3" />
          <circle cx="0" cy="0" r="3.5" fill="#dfff4f" stroke="#1c1308" strokeWidth="1" />
        </g>
        <g transform="translate(630, 175)" className="anim-firefly-3">
          <circle cx="0" cy="0" r="6" fill="#ffff80" opacity="0.3" />
          <circle cx="0" cy="0" r="3" fill="#dfff4f" stroke="#1c1308" strokeWidth="1" />
        </g>
        <g transform="translate(810, 150)" className="anim-firefly-1">
          <circle cx="0" cy="0" r="6" fill="#ffff80" opacity="0.3" />
          <circle cx="0" cy="0" r="3" fill="#dfff4f" stroke="#1c1308" strokeWidth="1" />
        </g>
      </g>

      {/* Mossy Knolls & Ferns */}
      <path
        d="M0 245 Q300 205 600 235 Q800 215 1000 250 L1000 400 L0 400 Z"
        fill="#264720"
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* Fairy-tale Amanita Toadstools (Muchomůrky červené s bílými puntíky) - Clickable */}
      <g
        className={`interactive-scenic ${bounce === "les-muchomurka" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "les-muchomurka", () => sound.playSneezePuff(), "Hepčík!", "mushroom")
        }
      >
        <g transform="translate(460, 215)">
          <rect
            x="18"
            y="18"
            width="8"
            height="24"
            rx="3"
            fill="#ffffff"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          {/* Collar ring */}
          <ellipse
            cx="22"
            cy="24"
            rx="6"
            ry="2"
            fill="#ffffff"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <ellipse
            cx="22"
            cy="18"
            rx="19"
            ry="14"
            fill="#d4371e"
            stroke="#1c1308"
            strokeWidth="3"
          />
          <circle cx="14" cy="14" r="3" fill="#ffffff" />
          <circle cx="24" cy="12" r="3" fill="#ffffff" />
          <circle cx="31" cy="19" r="2.5" fill="#ffffff" />
          <circle cx="16" cy="22" r="2" fill="#ffffff" />
          {/* Tiny rising spore motes */}
          <circle cx="18" cy="8" r="1.5" fill="#ffd438" className="anim-spark-1" />
          <circle cx="26" cy="5" r="1.5" fill="#ffd438" className="anim-spark-2" />
        </g>

        <g transform="translate(498, 225)">
          <rect
            x="12"
            y="14"
            width="6"
            height="18"
            rx="2"
            fill="#ffffff"
            stroke="#1c1308"
            strokeWidth="2"
          />
          <ellipse
            cx="15"
            cy="14"
            rx="14"
            ry="9.5"
            fill="#d4371e"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          <circle cx="10" cy="11" r="2" fill="#ffffff" />
          <circle cx="18" cy="10" r="2" fill="#ffffff" />
          <circle cx="21" cy="15" r="1.5" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}

/* =========================================================================
   4. OLŠOVÝ RYBNÍK (Moonlit Pond with Halo, Lekníny, Reeds & Will-o'-Wisps)
   ========================================================================= */
function renderRybnik(trigger: TriggerEasterEgg, bounce: string | null) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Night Sky with Serene Midnight Indigo */}
      <rect width="1000" height="400" fill="#20364d" />

      {/* ===================================================================
          ANIMATED HUGE LADA FULL MOON (Měsíc v úplňku s pulzujícím halem) - Clickable
          =================================================================== */}
      <g
        transform="translate(780, 85)"
        className={`interactive-scenic ${bounce === "rybnik-mesic" ? "anim-easter-bounce" : ""}`}
        onClick={(e) => trigger(e, "rybnik-mesic", () => sound.playChime(), "Dobrou noc!", "moon")}
      >
        {/* Atmospheric Pulsing Halo */}
        <circle cx="0" cy="0" r="64" fill="#ffea94" opacity="0.3" className="anim-moon-glow" />
        <circle cx="0" cy="0" r="50" fill="#ffea94" opacity="0.5" className="anim-moon-glow" />

        {/* Full Moon Disk */}
        <circle cx="0" cy="0" r="42" fill="#ffea94" stroke="#1c1308" strokeWidth="3.5" />
        <circle cx="0" cy="0" r="36" fill="#ffe270" opacity="0.4" />

        {/* Benevolent Sleepy Folk Moon Face */}
        <path
          d="M-12 -6 Q-8 -10 -4 -6"
          fill="none"
          stroke="#bfa038"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 -6 Q8 -10 12 -6"
          fill="none"
          stroke="#bfa038"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M-2 0 Q3 3 0 8"
          fill="none"
          stroke="#bfa038"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M-8 14 Q0 22 8 14"
          fill="none"
          stroke="#bfa038"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: NOČNÍ NETOPÝR (Bat fluttering across the moon) - Clickable
          =================================================================== */}
      <g
        transform="translate(735, 68)"
        className={`anim-bat-flutter interactive-scenic ${bounce === "rybnik-netopyr" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "rybnik-netopyr", () => sound.playPipeSmoke(), "Fííí! Netopýr!", "bat")
        }
      >
        <ellipse cx="0" cy="0" rx="3" ry="4.5" fill="#1c1308" />
        <path
          d="M0 -1 Q-8 -10 -16 -4 Q-12 2 -8 1 Q-4 4 0 2 Q4 4 8 1 Q12 2 16 -4 Q8 -10 0 -1 Z"
          fill="#1c1308"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
        <polygon points="-2,-3 -3,-6 -1,-3" fill="#1c1308" />
        <polygon points="2,-3 3,-6 1,-3" fill="#1c1308" />
      </g>

      {/* Twinkling Stars */}
      <g fill="#ffea94">
        <circle cx="120" cy="50" r="2.5" className="anim-eye-pulse" />
        <circle cx="280" cy="40" r="3" />
        <circle cx="440" cy="70" r="2" />
        <circle cx="590" cy="35" r="3" className="anim-eye-pulse" />
        <circle cx="920" cy="65" r="2.5" />
      </g>

      {/* Dark Rolling Bohemian Hills & Distant Village Church */}
      <path
        d="M0 205 Q280 155 550 190 Q800 160 1000 200 L1000 400 L0 400 Z"
        fill="#182c24"
        stroke="#1c1308"
        strokeWidth="3"
      />
      {/* Baroque Church onion spire */}
      <g transform="translate(340, 115)">
        <rect
          x="10"
          y="30"
          width="22"
          height="45"
          fill="#d9d0ba"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <path
          d="M21 0 C15 10 9 14 12 28 L30 28 C33 14 27 10 21 0 Z"
          fill="#9e3a24"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="21" y1="0" x2="21" y2="-7" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* ===================================================================
          EXTRA POND SHORE BUILDINGS & TREES (Rybářská bašta, Chaloupky, Vrby, Pramička)
          =================================================================== */}
      {/* 1. Fisherman's Hut / Thatched Bašta (Rybářská bašta) on left shore */}
      <g transform="translate(70, 150)">
        <rect x="0" y="24" width="85" height="46" fill="#3a4b42" stroke="#1c1308" strokeWidth="3" />
        <polygon points="-8,26 42,-4 92,26" fill="#694d2c" stroke="#1c1308" strokeWidth="3" />
        {/* Warm yellow candlelit window */}
        <rect
          x="18"
          y="34"
          width="18"
          height="18"
          fill="#ffd447"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        <line x1="27" y1="34" x2="27" y2="52" stroke="#1c1308" strokeWidth="1.2" />
        <line x1="18" y1="43" x2="36" y2="43" stroke="#1c1308" strokeWidth="1.2" />
        <rect
          x="54"
          y="34"
          width="14"
          height="36"
          fill="#291b10"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        {/* Fishnet drying on posts */}
        <line x1="-12" y1="38" x2="-12" y2="65" stroke="#1c1308" strokeWidth="2" />
        <line x1="-2" y1="35" x2="-2" y2="65" stroke="#1c1308" strokeWidth="2" />
        <path
          d="M-12 42 Q-7 50 -2 42"
          fill="none"
          stroke="#948465"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      </g>

      {/* 2. Cozy Hillside Village Cottages glowing in twilight */}
      <g transform="translate(195, 168)">
        <rect x="0" y="16" width="45" height="26" fill="#2d3d34" stroke="#1c1308" strokeWidth="2" />
        <polygon points="-4,18 22,2 50,18" fill="#522b1c" stroke="#1c1308" strokeWidth="2" />
        <rect
          x="10"
          y="22"
          width="10"
          height="10"
          fill="#ffd447"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>
      <g transform="translate(420, 162)">
        <rect x="0" y="18" width="50" height="28" fill="#2d3d34" stroke="#1c1308" strokeWidth="2" />
        <polygon points="-4,20 25,4 54,20" fill="#753822" stroke="#1c1308" strokeWidth="2" />
        <rect
          x="12"
          y="24"
          width="10"
          height="10"
          fill="#ffd447"
          stroke="#1c1308"
          strokeWidth="1"
        />
        <rect
          x="30"
          y="24"
          width="10"
          height="10"
          fill="#ffd447"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>

      {/* 3. Old Pollarded Willow with water goblin ribbons (Stará vrba s pentlemi) */}
      <g transform="translate(870, 140)">
        <path
          d="M18 75 Q22 40 14 18 Q26 40 28 75 Z"
          fill="#291c12"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <circle cx="18" cy="18" r="14" fill="#291c12" stroke="#1c1308" strokeWidth="2.5" />
        {/* Willow branches swaying */}
        <g className="anim-wind-sway" style={{ transformOrigin: "18px 18px" }}>
          <path
            d="M18 18 Q-4 4 -8 26 M18 18 Q8 -8 4 -24 M18 18 Q32 -6 36 14 M18 18 Q42 10 46 32"
            fill="none"
            stroke="#254a22"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Ribbons fluttering (Vodnické pentličky) */}
          <path
            d="M-6 24 Q-12 34 -4 42"
            fill="none"
            stroke="#e02828"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M36 14 Q44 26 38 36"
            fill="none"
            stroke="#36d936"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 4. Wooden Fishing Pier & Moored Rowboat (Molo a rybářská pramička) */}
      <g transform="translate(560, 215)">
        {/* Pier planks */}
        <rect x="0" y="8" width="60" height="8" fill="#4d321c" stroke="#1c1308" strokeWidth="2" />
        <line x1="8" y1="16" x2="8" y2="35" stroke="#1c1308" strokeWidth="3" />
        <line x1="50" y1="16" x2="50" y2="35" stroke="#1c1308" strokeWidth="3" />
        {/* Moored wooden rowboat bobbing */}
        <g transform="translate(45, 14)">
          <path d="M0 6 Q20 18 42 6 Q38 -2 0 6 Z" fill="#694626" stroke="#1c1308" strokeWidth="2" />
          <line x1="12" y1="8" x2="28" y2="8" stroke="#3b2512" strokeWidth="2" />
        </g>
      </g>

      {/* Deep Pond Water (Hladina rybníka) */}
      <path
        d="M0 235 Q300 200 600 225 Q800 205 1000 230 L1000 400 L0 400 Z"
        fill="#193345"
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* Shimmering Moon reflection on water */}
      <line
        x1="740"
        y1="255"
        x2="820"
        y2="255"
        stroke="#79a7c7"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="anim-water-ripple"
      />
      <line
        x1="720"
        y1="275"
        x2="840"
        y2="275"
        stroke="#79a7c7"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="anim-water-ripple-2"
      />
      <line
        x1="750"
        y1="295"
        x2="810"
        y2="295"
        stroke="#79a7c7"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Leaping Carp / Ryba skákající nad hladinu */}
      <g transform="translate(775, 240)">
        <path d="M0 0 Q6 -8 14 -4 Q8 2 0 0 Z" fill="#9ec4de" stroke="#1c1308" strokeWidth="1.8" />
      </g>

      {/* ===================================================================
          ANIMATED WILL-O'-THE-WISPS (Bludičky nad rybníkem)
          =================================================================== */}
      <g transform="translate(240, 210)" className="anim-bludicka-1">
        <circle cx="0" cy="0" r="10" fill="#a4f0ff" opacity="0.3" />
        <circle cx="0" cy="0" r="5" fill="#70e5ff" stroke="#1c1308" strokeWidth="1.2" />
        <circle cx="-1" cy="-1" r="1.8" fill="#ffffff" />
      </g>
      <g transform="translate(620, 215)" className="anim-bludicka-2">
        <circle cx="0" cy="0" r="9" fill="#a4f0ff" opacity="0.3" />
        <circle cx="0" cy="0" r="4.5" fill="#70e5ff" stroke="#1c1308" strokeWidth="1.2" />
      </g>

      {/* Swaying Bulrushes & Reeds (Orobince v rákosí) */}
      <g
        transform="translate(140, 175)"
        className="anim-reeds-sway"
        style={{ transformOrigin: "15px 75px" }}
      >
        <line x1="12" y1="75" x2="10" y2="10" stroke="#254d1f" strokeWidth="3.5" />
        <rect
          x="7"
          y="14"
          width="6"
          height="25"
          rx="3"
          fill="#4d3018"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <line x1="28" y1="75" x2="30" y2="18" stroke="#254d1f" strokeWidth="3.5" />
        <rect
          x="27"
          y="22"
          width="6"
          height="23"
          rx="3"
          fill="#4d3018"
          stroke="#1c1308"
          strokeWidth="2"
        />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: MODRÁ VÁŽKA (Dragonfly hovering over bulrushes) - Clickable
          =================================================================== */}
      <g
        transform="translate(180, 150)"
        className={`anim-dragonfly-hover interactive-scenic ${bounce === "rybnik-vazka" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "rybnik-vazka", () => sound.playChime(), "Bzzzk! Vážka!", "sparkle")
        }
      >
        <line
          x1="12"
          y1="4"
          x2="12"
          y2="24"
          stroke="#2585c4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="4" r="2.5" fill="#165b8c" stroke="#1c1308" strokeWidth="1" />
        <g opacity="0.85">
          <ellipse
            cx="4"
            cy="8"
            rx="8"
            ry="2.2"
            fill="#bfe9ff"
            stroke="#1c1308"
            strokeWidth="0.8"
            transform="rotate(-15 4 8)"
          />
          <ellipse
            cx="20"
            cy="8"
            rx="8"
            ry="2.2"
            fill="#bfe9ff"
            stroke="#1c1308"
            strokeWidth="0.8"
            transform="rotate(15 20 8)"
          />
          <ellipse
            cx="5"
            cy="13"
            rx="7"
            ry="2"
            fill="#bfe9ff"
            stroke="#1c1308"
            strokeWidth="0.8"
            transform="rotate(-10 5 13)"
          />
          <ellipse
            cx="19"
            cy="13"
            rx="7"
            ry="2"
            fill="#bfe9ff"
            stroke="#1c1308"
            strokeWidth="0.8"
            transform="rotate(10 19 13)"
          />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: ŽABKA NA LEKNÍNU (Green frog croaking on water lily) - Clickable
          =================================================================== */}
      <g
        transform="translate(75, 240)"
        className={`anim-water-bob interactive-scenic ${bounce === "rybnik-zaba" ? "anim-easter-bounce" : ""}`}
        onClick={(e) => trigger(e, "rybnik-zaba", () => sound.playCroak(), "Kuňk-kuňk!", "frog")}
      >
        <ellipse cx="16" cy="14" rx="15" ry="6" fill="#2d5e2a" stroke="#1c1308" strokeWidth="1.8" />
        {/* Frog body */}
        <ellipse cx="16" cy="8" rx="8" ry="5.5" fill="#388c3a" stroke="#1c1308" strokeWidth="2" />
        {/* Vocal Sac */}
        <circle
          cx="16"
          cy="11"
          r="3.5"
          fill="#fff4b8"
          stroke="#1c1308"
          strokeWidth="0.8"
          className="anim-frog-croak"
        />
        {/* Big eyes */}
        <circle cx="12" cy="4" r="2.8" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />
        <circle cx="20" cy="4" r="2.8" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />
        <g className="anim-eye-pulse">
          <circle cx="12" cy="4" r="1.2" fill="#1c1308" />
          <circle cx="20" cy="4" r="1.2" fill="#1c1308" />
        </g>
      </g>

      {/* Bobbing Water Lily Pads (Lekníny) */}
      <g transform="translate(420, 250)" className="anim-water-bob">
        <ellipse cx="20" cy="10" rx="18" ry="7" fill="#2d5e2a" stroke="#1c1308" strokeWidth="2" />
        {/* Water lily blossom */}
        <polygon points="20,10 14,0 20,4 26,0" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
        <circle cx="20" cy="6" r="2" fill="#ffd438" />
      </g>

      {/* Huge Weeping Willow (Stará vrba nad vodou) with Hastrman's Soul Pots */}
      <g transform="translate(860, 135)">
        <path
          d="M30 115 C36 65 22 28 36 0 C52 28 40 65 44 115 Z"
          fill="#352212"
          stroke="#1c1308"
          strokeWidth="4"
        />
        {/* Swaying drooping willow branches */}
        <g className="anim-wind-sway" style={{ transformOrigin: "36px 0px" }}>
          <path
            d="M36 2 Q4 15 0 65 M36 2 Q16 -16 10 -30 M36 2 Q56 -18 64 -10 M36 2 Q74 15 82 70"
            fill="none"
            stroke="#25421f"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
        {/* Hastrman's clay soul-pots on root shelf with ribbons - Clickable */}
        <g
          transform="translate(18, 95)"
          className={`interactive-scenic ${bounce === "rybnik-hrnicky" ? "anim-easter-bounce" : ""}`}
          onClick={(e) =>
            trigger(
              e,
              "rybnik-hrnicky",
              () => sound.playBubblePop(),
              "Žbluňk! Dušička v hrnečku!",
              "pot",
            )
          }
        >
          <rect
            x="0"
            y="4"
            width="10"
            height="9"
            rx="2"
            fill="#c44327"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <polygon points="-2,4 5,-1 12,4" fill="#529949" stroke="#1c1308" strokeWidth="1.5" />
          {/* Floating soul bubble */}
          <circle
            cx="5"
            cy="-8"
            r="2.5"
            fill="#a4f0ff"
            stroke="#1c1308"
            strokeWidth="0.8"
            className="anim-lada-bubble-1"
          />
        </g>
      </g>
    </svg>
  );
}

/* =========================================================================
   5. HRADNÍ ZŘÍCENINA (Sunset Gothic Fortress with Ravens, Banner & Torch)
   ========================================================================= */
function renderZricenina(trigger: TriggerEasterEgg, bounce: string | null) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Dramatic Sunset Crimson-Purple Sky */}
      <rect width="1000" height="400" fill="#c45d39" />
      <path d="M0 0 L1000 0 L1000 180 Q500 240 0 180 Z" fill="#522b40" opacity="0.45" />

      {/* Sinking Golden Dusk Sun - Clickable */}
      <circle
        cx="210"
        cy="110"
        r="38"
        fill="#fad76d"
        stroke="#1c1308"
        strokeWidth="3.5"
        className={`interactive-scenic ${bounce === "zricenina-slunce" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "zricenina-slunce", () => sound.playChime(), "Západ slunce!", "sun")
        }
      />

      {/* Craggy Mountain Hillside with rocky scree */}
      <path
        d="M0 235 Q280 165 540 175 Q780 155 1000 225 L1000 400 L0 400 Z"
        fill="#464e3a"
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* ===================================================================
          EXTRA CASTLE BUILDINGS & TREES (Hláska, Hradba, Poustevna, Pokroucené borovice)
          =================================================================== */}
      {/* 1. Ruined Watchtower (Hláska) on the left cliff */}
      <g transform="translate(100, 130)">
        <polygon points="10,65 14,0 46,0 50,65" fill="#544c40" stroke="#1c1308" strokeWidth="3" />
        <rect x="22" y="15" width="16" height="20" fill="#1c1308" />
        {/* Jagged broken top */}
        <polygon
          points="12,0 20,-10 28,0 36,-12 48,0"
          fill="#544c40"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
      </g>

      {/* 2. Lower Outer Castle Wall (Hradební zeď) on the right ridge */}
      <g transform="translate(730, 155)">
        <rect
          x="0"
          y="20"
          width="130"
          height="45"
          fill="#5c5446"
          stroke="#1c1308"
          strokeWidth="3.2"
        />
        {/* Crenellations */}
        <rect
          x="10"
          y="4"
          width="20"
          height="18"
          fill="#5c5446"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <rect
          x="50"
          y="4"
          width="20"
          height="18"
          fill="#5c5446"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <rect
          x="90"
          y="4"
          width="20"
          height="18"
          fill="#5c5446"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        {/* Arrow slit windows */}
        <line x1="20" y1="30" x2="20" y2="44" stroke="#1c1308" strokeWidth="3" />
        <line x1="60" y1="30" x2="60" y2="44" stroke="#1c1308" strokeWidth="3" />
        <line x1="100" y1="30" x2="100" y2="44" stroke="#1c1308" strokeWidth="3" />
      </g>

      {/* 3. Mountain Hermit's Stone Cell (Kamenná poustevna pod hradem) */}
      <g transform="translate(290, 160)">
        <rect
          x="0"
          y="18"
          width="55"
          height="34"
          fill="#695f50"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <polygon points="-6,20 28,0 61,20" fill="#4a2e1c" stroke="#1c1308" strokeWidth="2.5" />
        {/* Wooden cross on roof */}
        <line x1="28" y1="0" x2="28" y2="-10" stroke="#1c1308" strokeWidth="2" />
        <line x1="24" y1="-6" x2="32" y2="-6" stroke="#1c1308" strokeWidth="2" />
        {/* Warm window and small chimney */}
        <rect
          x="10"
          y="26"
          width="12"
          height="14"
          fill="#ffd447"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
        <rect
          x="38"
          y="2"
          width="8"
          height="12"
          fill="#3a2517"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
      </g>

      {/* 4. Weathered Mountain Pines (Pokroucené horské borovice) on cliffs */}
      <g transform="translate(45, 145)">
        <path
          d="M12 60 Q22 35 15 15 Q28 35 24 60 Z"
          fill="#3b2818"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <polygon points="18,0 2,24 34,24" fill="#1e3d22" stroke="#1c1308" strokeWidth="2.2" />
        <polygon points="18,-15 6,6 30,6" fill="#29522e" stroke="#1c1308" strokeWidth="2.2" />
      </g>
      <g transform="translate(440, 140)">
        <path
          d="M10 55 Q18 30 12 12 Q24 30 20 55 Z"
          fill="#3b2818"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <polygon points="15,0 0,22 30,22" fill="#1e3d22" stroke="#1c1308" strokeWidth="2.2" />
        <polygon points="15,-12 4,4 26,4" fill="#29522e" stroke="#1c1308" strokeWidth="2.2" />
      </g>

      {/* Gothic Castle Ruins (Hradní zřícenina) */}
      <g transform="translate(540, 85)">
        {/* Main ruined stone tower with stone block lines */}
        <rect
          x="25"
          y="30"
          width="115"
          height="105"
          fill="#695f50"
          stroke="#1c1308"
          strokeWidth="4"
        />
        <line x1="25" y1="65" x2="140" y2="65" stroke="#1c1308" strokeWidth="2" />
        <line x1="25" y1="100" x2="140" y2="100" stroke="#1c1308" strokeWidth="2" />
        <line x1="60" y1="30" x2="60" y2="65" stroke="#1c1308" strokeWidth="1.5" />
        <line x1="105" y1="65" x2="105" y2="100" stroke="#1c1308" strokeWidth="1.5" />

        {/* Crenellations (Cimbuří) */}
        <rect
          x="22"
          y="10"
          width="25"
          height="24"
          fill="#695f50"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        <rect
          x="70"
          y="10"
          width="25"
          height="24"
          fill="#695f50"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        <rect
          x="115"
          y="10"
          width="25"
          height="24"
          fill="#695f50"
          stroke="#1c1308"
          strokeWidth="3.5"
        />

        {/* Flagpole with Violent Fluttering Red Banner - Clickable */}
        <g
          className={`interactive-scenic ${bounce === "zricenina-prapor" ? "anim-easter-bounce" : ""}`}
          onClick={(e) =>
            trigger(
              e,
              "zricenina-prapor",
              () => sound.playPipeSmoke(),
              "Fí-fí! Prapor vlaje!",
              "flag",
            )
          }
        >
          <line x1="34" y1="10" x2="34" y2="-32" stroke="#4a2e16" strokeWidth="3.5" />
          <g className="anim-banner-wave" style={{ transformOrigin: "34px -22px" }}>
            <polygon
              points="34,-30 82,-22 72,-14 82,-6 34,-14"
              fill="#bd321e"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
          </g>
        </g>

        {/* Wall Sconce Iron Torch with Flickering Animated Fire - Clickable */}
        <g
          transform="translate(48, 80)"
          className={`interactive-scenic ${bounce === "zricenina-pochoden" ? "anim-easter-bounce" : ""}`}
          onClick={(e) =>
            trigger(
              e,
              "zricenina-pochoden",
              () => sound.playFireCrackle(),
              "Prásk! Pochodeň praská!",
              "fire",
            )
          }
        >
          <rect
            x="-4"
            y="0"
            width="8"
            height="14"
            fill="#241a12"
            stroke="#1c1308"
            strokeWidth="2"
          />
          <line x1="0" y1="14" x2="0" y2="24" stroke="#241a12" strokeWidth="3" />
          {/* Torch flame */}
          <g className="anim-lada-flicker" style={{ transformOrigin: "0px 0px" }}>
            <polygon points="-5,0 0,-16 5,0" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.8" />
            <polygon points="-2,0 0,-10 2,0" fill="#c43818" />
          </g>
        </g>

        {/* Arched Gothic Loophole Window */}
        <path
          d="M78 52 C78 38 98 38 98 52 L98 85 L78 85 Z"
          fill="#1c150e"
          stroke="#1c1308"
          strokeWidth="3"
        />

        {/* Creeping Ivy Tendrils */}
        <path
          d="M30 120 Q40 90 32 70 Q45 75 38 100"
          fill="none"
          stroke="#24451c"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* ===================================================================
          ANIMATED FLYING RAVENS / CROWS (Hradní krkavci)
          =================================================================== */}
      <g className="anim-bird-glide-2" transform="translate(460, 60)">
        <g className="anim-wing-flap">
          <path d="M0 0 Q10 -12 22 -6 Q12 0 8 8 Q4 0 0 0 Z" fill="#1c1308" />
          <path d="M0 0 Q-10 -12 -22 -6 Q-12 0 -8 8 Q-4 0 0 0 Z" fill="#1c1308" />
          <polygon points="0,0 3,14 -3,14" fill="#1c1308" />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: NETOPÝŘI ZA SOUMRAKU (Dusk bats darting by ruins)
          =================================================================== */}
      <g transform="translate(320, 75)" className="anim-bat-flutter">
        <ellipse cx="0" cy="0" rx="3.5" ry="5" fill="#1c1308" />
        <path
          d="M0 -1 Q-8 -10 -16 -4 Q-12 2 -8 1 Q-4 4 0 2 Q4 4 8 1 Q12 2 16 -4 Q8 -10 0 -1 Z"
          fill="#1c1308"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
        <polygon points="-2,-3 -3,-6 -1,-3" fill="#1c1308" />
        <polygon points="2,-3 3,-6 1,-3" fill="#1c1308" />
      </g>

      {/* Perched Raven on Signpost - Clickable */}
      <g
        transform="translate(240, 175)"
        className={`interactive-scenic ${bounce === "zricenina-krkavec" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(
            e,
            "zricenina-krkavec",
            () => sound.playRavenCroak(),
            "Krá-krá! Krkavec!",
            "raven",
          )
        }
      >
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="70"
          stroke="#4a2e16"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Raven with animated beak preening */}
        <g className="anim-woodpecker-peck" style={{ transformOrigin: "20px -6px" }}>
          <ellipse cx="20" cy="-6" rx="9" ry="7" fill="#1c1308" />
          <circle cx="25" cy="-10" r="4.5" fill="#1c1308" />
          <polygon points="28,-10 37,-12 28,-7" fill="#c48a25" />
          <circle cx="26" cy="-11" r="1" fill="#ffffff" />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: HRADNÍ JEŠTĚRKA (Lizard basking on warm flagstone) - Clickable
          =================================================================== */}
      <g
        transform="translate(68, 230)"
        className={`interactive-scenic ${bounce === "zricenina-jesterka" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "zricenina-jesterka", () => sound.playChime(), "Hbitá ještěrka!", "lizard")
        }
      >
        <ellipse cx="12" cy="10" rx="14" ry="6" fill="#696556" stroke="#1c1308" strokeWidth="2" />
        {/* Slender green lizard body */}
        <path
          d="M4 10 Q12 7 18 10 Q24 13 28 8"
          fill="none"
          stroke="#3b6928"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="5" cy="10" r="2.2" fill="#3b6928" />
        <line
          x1="9"
          y1="8"
          x2="7"
          y2="4"
          stroke="#3b6928"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="12"
          x2="16"
          y2="15"
          stroke="#3b6928"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* =========================================================================
   6. STARÝ HŘBITOV (Spooky Twilight Cemetery with Mist & Dancing Wisps)
   ========================================================================= */
function renderHrbitov(trigger: TriggerEasterEgg, bounce: string | null) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Spooky Violet Twilight Sky */}
      <rect width="1000" height="400" fill="#292538" />

      {/* Pale Crescent Moon - Clickable */}
      <g
        transform="translate(860, 65)"
        className={`interactive-scenic ${bounce === "hrbitov-mesic" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "hrbitov-mesic", () => sound.playChime(), "Mrazivý srpek měsíce...", "moon")
        }
      >
        <path
          d="M20 0 A24 24 0 0 0 20 48 A32 32 0 0 1 20 0 Z"
          fill="#ffea94"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
      </g>

      {/* Twinkling Cold Stars */}
      <g fill="#ffea94">
        <circle cx="160" cy="50" r="2.5" />
        <circle cx="340" cy="35" r="3" className="anim-eye-pulse" />
        <circle cx="520" cy="60" r="2" />
        <circle cx="700" cy="40" r="3" />
      </g>

      {/* Distant Cemetery Mounds */}
      <path
        d="M0 235 Q250 185 500 215 Q750 190 1000 230 L1000 400 L0 400 Z"
        fill="#222b23"
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* ===================================================================
          ANIMATED GRAVEYARD MIST (Hřbitovní mlha)
          =================================================================== */}
      <g className="anim-mist-1" opacity="0.4">
        <path
          d="M0 220 Q200 200 480 215 Q750 200 1000 225 L1000 270 Q750 250 480 260 Q200 245 0 265 Z"
          fill="#94a8bc"
        />
      </g>
      <g className="anim-mist-2" opacity="0.35">
        <path
          d="M40 250 Q280 230 560 245 Q820 235 1000 255 L1000 290 Q820 275 560 280 Q280 270 40 285 Z"
          fill="#94a8bc"
        />
      </g>

      {/* ===================================================================
          EXTRA CEMETERY BUILDINGS & TREES (Hrobníkova chýše, Hrobka, Tisy, Zeď)
          =================================================================== */}
      {/* 1. Gravedigger's Old Stone Hut (Hrobníkova chýše) on left hill */}
      <g transform="translate(65, 145)">
        <rect x="0" y="24" width="75" height="42" fill="#3f4547" stroke="#1c1308" strokeWidth="3" />
        <polygon points="-6,26 38,-4 81,26" fill="#26272b" stroke="#1c1308" strokeWidth="3" />
        <rect
          x="12"
          y="-2"
          width="10"
          height="14"
          fill="#2e3033"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        {/* Dim candle glowing */}
        <rect
          x="14"
          y="34"
          width="14"
          height="14"
          fill="#ffd447"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        <circle cx="21" cy="41" r="2.2" fill="#e07228" />
        <rect
          x="44"
          y="34"
          width="14"
          height="32"
          fill="#201b16"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        {/* Gravedigger's spade leaning against wall */}
        <line x1="-5" y1="35" x2="-2" y2="65" stroke="#754b23" strokeWidth="2.5" />
        <rect
          x="-8"
          y="55"
          width="8"
          height="10"
          fill="#757e87"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
      </g>

      {/* 2. Ancient Family Stone Crypt (Stará rodinná kamenná hrobka) */}
      <g transform="translate(340, 155)">
        <rect
          x="0"
          y="16"
          width="60"
          height="42"
          fill="#4d535a"
          stroke="#1c1308"
          strokeWidth="2.8"
        />
        <polygon points="-4,18 30,2 64,18" fill="#353842" stroke="#1c1308" strokeWidth="2.8" />
        <line x1="30" y1="2" x2="30" y2="-6" stroke="#1c1308" strokeWidth="2" />
        <line x1="26" y1="-3" x2="34" y2="-3" stroke="#1c1308" strokeWidth="2" />
        {/* Wrought iron gate on crypt */}
        <rect x="18" y="26" width="24" height="32" fill="#1c1308" />
        <line x1="24" y1="26" x2="24" y2="58" stroke="#757e87" strokeWidth="1.5" />
        <line x1="30" y1="26" x2="30" y2="58" stroke="#757e87" strokeWidth="1.5" />
        <line x1="36" y1="26" x2="36" y2="58" stroke="#757e87" strokeWidth="1.5" />
      </g>

      {/* 3. Dark Cemetery Yew Trees (Smuteční tisy a cypřiše) */}
      <g transform="translate(155, 135)">
        <path
          d="M14 65 Q18 35 12 10 Q22 35 22 65 Z"
          fill="#2b2016"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <polygon points="17,-15 4,30 30,30" fill="#18291b" stroke="#1c1308" strokeWidth="2.2" />
        <polygon points="17,-35 8,0 26,0" fill="#233b28" stroke="#1c1308" strokeWidth="2.2" />
      </g>
      <g transform="translate(815, 125)">
        <path
          d="M14 75 Q18 40 12 12 Q22 40 22 75 Z"
          fill="#2b2016"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <polygon points="17,-10 4,35 30,35" fill="#18291b" stroke="#1c1308" strokeWidth="2.2" />
        <polygon points="17,-30 8,5 26,5" fill="#233b28" stroke="#1c1308" strokeWidth="2.2" />
      </g>

      {/* 4. Mossy Stone Wall with Wrought Iron Fence (Kamenná zídka) */}
      <g transform="translate(480, 190)">
        <rect x="0" y="10" width="70" height="22" fill="#4d5354" stroke="#1c1308" strokeWidth="2" />
        <path d="M0 10 Q35 6 70 10" fill="none" stroke="#253822" strokeWidth="2" />
      </g>

      {/* Mortuary Chapel (Márnice / Kostnice) with Candlelit Arched Window - Clickable */}
      <g
        transform="translate(680, 110)"
        className={`interactive-scenic ${bounce === "hrbitov-kaple" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(
            e,
            "hrbitov-kaple",
            () => sound.playFireCrackle(),
            "V kapličce plápolá svíčka...",
            "candle",
          )
        }
      >
        <rect
          x="0"
          y="45"
          width="85"
          height="75"
          fill="#4d535a"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        <polygon points="-10,48 42,12 95,48" fill="#353842" stroke="#1c1308" strokeWidth="3.5" />
        {/* Arched Window with Candlelight */}
        <path
          d="M30 68 C30 55 48 55 48 68 L48 95 L30 95 Z"
          fill="#ffd438"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <circle cx="39" cy="74" r="3.5" fill="#f4982c" className="anim-lada-flicker" />
      </g>

      {/* Stone & Wooden Memorial Crosses */}
      <g transform="translate(220, 155)">
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="65"
          stroke="#757e87"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="18"
          x2="32"
          y2="18"
          stroke="#757e87"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      <g transform="translate(420, 145)">
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="70"
          stroke="#523820"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="20"
          x2="34"
          y2="20"
          stroke="#523820"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Small wooden shingle cap */}
        <polygon points="4,14 20,4 36,14" fill="#382514" stroke="#1c1308" strokeWidth="2" />
      </g>

      <g transform="translate(560, 150)">
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="65"
          stroke="#757e87"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="18"
          x2="32"
          y2="18"
          stroke="#757e87"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Bare Gnarled Dead Tree */}
      <g transform="translate(100, 130)">
        <path
          d="M20 90 Q26 45 15 20 Q10 0 25 -10 Q35 15 28 45 Q32 70 30 90 Z"
          fill="#30241b"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        <path
          d="M25 -10 Q10 -25 0 -20 M25 -10 Q40 -30 55 -25 M28 25 Q45 10 60 15"
          fill="none"
          stroke="#30241b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* ===================================================================
            LADA FOLK FAUNA: VÝR VELKÝ (Horned Owl Perched on Gnarled Branch) - Clickable
            =================================================================== */}
        <g
          transform="translate(50, -42)"
          className={`interactive-scenic ${bounce === "hrbitov-vyr" ? "anim-easter-bounce" : ""}`}
          onClick={(e) =>
            trigger(e, "hrbitov-vyr", () => sound.playOwlHoot(), "Húúú-húúú! Výr velký!", "owl")
          }
        >
          {/* Owl body */}
          <ellipse cx="6" cy="14" rx="8" ry="11" fill="#4a3622" stroke="#1c1308" strokeWidth="2" />
          <ellipse cx="6" cy="15" rx="5" ry="8" fill="#a8896a" stroke="#1c1308" strokeWidth="1" />
          {/* Ear tufts */}
          <polygon points="0,5 2,-2 5,5" fill="#4a3622" stroke="#1c1308" strokeWidth="1" />
          <polygon points="7,5 10,-2 12,5" fill="#4a3622" stroke="#1c1308" strokeWidth="1" />
          {/* Round head */}
          <circle cx="6" cy="6" r="6" fill="#4a3622" stroke="#1c1308" strokeWidth="1.8" />
          {/* Glowing round eyes */}
          <g className="anim-eye-pulse">
            <circle cx="3.5" cy="5.5" r="2.4" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
            <circle cx="8.5" cy="5.5" r="2.4" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
            <circle cx="3.5" cy="5.5" r="1.1" fill="#1c1308" />
            <circle cx="8.5" cy="5.5" r="1.1" fill="#1c1308" />
          </g>
          {/* Hook beak */}
          <polygon points="5,7 6,10 7,7" fill="#1c1308" />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: HŘBITOVNÍ MYŠKA (Churchyard mouse peeking from moss) - Clickable
          =================================================================== */}
      <g
        transform="translate(60, 238)"
        className={`interactive-scenic ${bounce === "hrbitov-myska" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "hrbitov-myska", () => sound.playChime(), "Písk-písk! Myška!", "mouse")
        }
      >
        {/* Twitching long tail */}
        <g className="anim-cat-tail" style={{ transformOrigin: "0px 8px" }}>
          <path
            d="M0 8 Q-6 6 -8 2 Q-10 -2 -14 0"
            fill="none"
            stroke="#948b81"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        {/* Grey plump body */}
        <ellipse cx="6" cy="6" rx="6" ry="4" fill="#756f68" stroke="#1c1308" strokeWidth="1.5" />
        {/* Round pinkish ears */}
        <circle cx="9" cy="2" r="2.2" fill="#d99f9c" stroke="#1c1308" strokeWidth="1" />
        {/* Beady eye & nose */}
        <circle cx="10" cy="5" r="0.8" fill="#1c1308" />
        <circle cx="12" cy="6" r="0.6" fill="#fca5a5" />
      </g>

      {/* ===================================================================
          ANIMATED WILL-O'-THE-WISPS (Hřbitovní bludičky / plamínky) - Clickable
          =================================================================== */}
      <g
        className={`interactive-scenic ${bounce === "hrbitov-bludicky" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "hrbitov-bludicky", () => sound.playChime(), "Tajemná bludička!", "ghost")
        }
      >
        <g transform="translate(320, 175)" className="anim-bludicka-1">
          <circle cx="0" cy="0" r="10" fill="#75ffd4" opacity="0.3" />
          <circle cx="0" cy="0" r="4.5" fill="#42f5b9" stroke="#1c1308" strokeWidth="1.2" />
        </g>
        <g transform="translate(500, 185)" className="anim-bludicka-2">
          <circle cx="0" cy="0" r="12" fill="#75ffd4" opacity="0.3" />
          <circle cx="0" cy="0" r="5" fill="#42f5b9" stroke="#1c1308" strokeWidth="1.2" />
        </g>
        <g transform="translate(850, 195)" className="anim-bludicka-3">
          <circle cx="0" cy="0" r="9" fill="#75ffd4" opacity="0.3" />
          <circle cx="0" cy="0" r="4" fill="#42f5b9" stroke="#1c1308" strokeWidth="1.2" />
        </g>
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: NETOPÝR NAD HŘBITOVNÍ ZDÍ
          =================================================================== */}
      <g transform="translate(875, 140)" className="anim-bat-flutter">
        <ellipse cx="0" cy="0" rx="3" ry="4" fill="#1c1308" />
        <path
          d="M0 -1 Q-7 -8 -14 -3 Q-10 2 -7 1 Q-3 3 0 2 Q3 3 7 1 Q10 2 14 -3 Q7 -8 0 -1 Z"
          fill="#1c1308"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>

      {/* Stone Cemetery Wall with Iron Spikes */}
      <path
        d="M780 195 L980 195 L980 260 L780 260 Z"
        fill="#474d57"
        stroke="#1c1308"
        strokeWidth="3.5"
      />
      <line x1="840" y1="195" x2="840" y2="260" stroke="#1c1308" strokeWidth="2" />
      <line x1="910" y1="195" x2="910" y2="260" stroke="#1c1308" strokeWidth="2" />
      {/* Iron spikes */}
      {[795, 825, 855, 885, 915, 945, 970].map((x) => (
        <polygon key={x} points={`${x},195 ${x + 4},178 ${x + 8},195`} fill="#1c1308" />
      ))}
    </svg>
  );
}

/* =========================================================================
   7. ČERNÁ TŮŇ (Climax Boss Arena: Storm Sky, Giant Swirling Whirlpool & Sparks)
   ========================================================================= */
function renderBoss(trigger: TriggerEasterEgg, bounce: string | null) {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {/* Ominous Storm Sky: Bruised Charcoal & Toxic Violet */}
      <rect width="1000" height="400" fill="#13141f" />

      {/* Atmospheric Thunder & Lightning Flash Pulse */}
      <rect
        width="1000"
        height="400"
        fill="#7d66a8"
        className="anim-thunder-pulse"
        pointerEvents="none"
      />

      {/* Sinister Toxic Swamp Clouds */}
      <g fill="#27182e" stroke="#1c1308" strokeWidth="3" opacity="0.8">
        <path d="M0 60 Q150 10 320 45 Q500 5 700 40 Q880 15 1000 50 L1000 120 L0 120 Z" />
      </g>

      {/* Distant Menacing Crags & Sinister Forest Silhouettes */}
      <path
        d="M0 200 Q260 145 520 185 Q780 140 1000 195 L1000 400 L0 400 Z"
        fill="#0e1713"
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* Dreaded Deep Black Pool (Černá tůň) */}
      <path
        d="M0 230 Q280 195 560 215 Q820 195 1000 225 L1000 400 L0 400 Z"
        fill="#0b171c"
        stroke="#1c1308"
        strokeWidth="4"
      />

      {/* ===================================================================
          EXTRA CLIMAX ARENA SCENERY (Zatopený mlýn, Bleskem rozštípnutý dub, Bažinné vrby, Vrak)
          =================================================================== */}
      {/* 1. Drowned Old Watermill Ruins (Zatopený starý mlýn) on the bog shore */}
      <g transform="translate(80, 150)">
        <polygon
          points="0,55 10,18 70,12 85,55"
          fill="#2d2729"
          stroke="#1c1308"
          strokeWidth="3.2"
        />
        <polygon points="5,20 40,-8 75,14" fill="#1c1819" stroke="#1c1308" strokeWidth="3" />
        {/* Broken millwheel half submerged */}
        <path
          d="M-15 48 A32 32 0 0 1 25 18 L15 48 Z"
          fill="#3d2b1f"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <line x1="5" y1="48" x2="-8" y2="28" stroke="#1c1308" strokeWidth="2" />
        <line x1="5" y1="48" x2="16" y2="28" stroke="#1c1308" strokeWidth="2" />
        {/* Sinister green glow in broken window */}
        <rect
          x="28"
          y="24"
          width="16"
          height="18"
          fill="#184a32"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        <circle cx="36" cy="33" r="3" fill="#32d98a" className="anim-eye-pulse" />
      </g>

      {/* 2. Charred Lightning-Struck Ancient Oak (Bleskem rozštípnutý dub) */}
      <g transform="translate(265, 125)">
        <path
          d="M25 90 Q30 50 15 20 Q5 0 20 -15 Q26 20 28 50 Q32 70 35 90 Z"
          fill="#140f0c"
          stroke="#1c1308"
          strokeWidth="3.5"
        />
        {/* Split charred limbs */}
        <path
          d="M20 -15 Q5 -30 -10 -25 M20 -15 Q35 -35 50 -25 M22 25 Q40 10 55 15"
          fill="none"
          stroke="#140f0c"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Lingering ember spark */}
        <circle cx="20" cy="-12" r="2.5" fill="#f44336" className="anim-lada-flicker" />
      </g>

      {/* 3. Spooky Twisted Bog Willows (Zkroucené bažinné vrby) */}
      <g transform="translate(775, 140)">
        <path
          d="M16 80 Q22 45 12 18 Q26 45 28 80 Z"
          fill="#1b1d1c"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <circle cx="16" cy="18" r="13" fill="#1b1d1c" stroke="#1c1308" strokeWidth="2.5" />
        <path
          d="M16 18 Q-6 6 -10 32 M16 18 Q6 -10 2 -26 M16 18 Q34 -8 38 18 M16 18 Q46 12 50 36"
          fill="none"
          stroke="#23362a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g transform="translate(910, 145)">
        <path
          d="M14 75 Q20 40 10 16 Q24 40 24 75 Z"
          fill="#1b1d1c"
          stroke="#1c1308"
          strokeWidth="2.8"
        />
        <circle cx="14" cy="16" r="11" fill="#1b1d1c" stroke="#1c1308" strokeWidth="2.2" />
        <path
          d="M14 16 Q-4 4 -6 26 M14 16 Q6 -8 4 -22 M14 16 Q30 -6 32 14"
          fill="none"
          stroke="#23362a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* 4. Sunken Rowboat Ribs & Decaying Pier (Vrak pramičky a polámaná lávka) */}
      <g transform="translate(860, 215)">
        {/* Ribs of sunken boat protruding from black water */}
        <path
          d="M0 12 Q20 22 45 12"
          fill="none"
          stroke="#3d2516"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="13"
          x2="8"
          y2="4"
          stroke="#3d2516"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="16"
          x2="20"
          y2="6"
          stroke="#3d2516"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="15"
          x2="32"
          y2="5"
          stroke="#3d2516"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="42"
          y1="13"
          x2="42"
          y2="4"
          stroke="#3d2516"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* ===================================================================
          THE GIANT VORTEX / WHIRLPOOL OF THE DEEP (Otáčející se vodní vír) - Clickable
          =================================================================== */}
      <g
        transform="translate(520, 265)"
        className={`interactive-scenic ${bounce === "boss-vir" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "boss-vir", () => sound.playBubblePop(), "Huuu! Hluboký vír!", "vortex")
        }
      >
        {/* Outer dark water eddy ring */}
        <ellipse cx="0" cy="0" rx="145" ry="54" fill="#071216" stroke="#1c1308" strokeWidth="3.5" />
        <ellipse
          cx="0"
          cy="0"
          rx="110"
          ry="40"
          fill="#0b1e1d"
          stroke="#1c1308"
          strokeWidth="2"
          opacity="0.75"
        />

        {/* Flat perspective-squashed rotating whirlpool */}
        <g transform="scale(1, 0.42)">
          <g
            className="anim-whirlpool-spin"
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          >
            {/* Concentric froth rings */}
            <circle
              cx="0"
              cy="0"
              r="115"
              fill="none"
              stroke="#1c4844"
              strokeWidth="4.5"
              strokeDasharray="25 18"
              opacity="0.6"
            />
            <circle
              cx="0"
              cy="0"
              r="85"
              fill="none"
              stroke="#256b64"
              strokeWidth="4"
              strokeDasharray="20 14"
              opacity="0.8"
            />
            <circle
              cx="0"
              cy="0"
              r="55"
              fill="none"
              stroke="#48a89d"
              strokeWidth="3"
              strokeDasharray="14 10"
              opacity="0.9"
            />
            <circle
              cx="0"
              cy="0"
              r="32"
              fill="none"
              stroke="#80ffe8"
              strokeWidth="2.5"
              strokeDasharray="10 8"
              opacity="0.95"
            />

            {/* 4 symmetric logarithmic swirl arms radiating inward to (0,0) */}
            <path
              d="M0 -120 Q55 -110 85 -60 Q110 0 85 60 Q55 110 0 120 Q-55 110 -85 60 Q-110 0 -85 -60 Q-55 -110 0 -120"
              fill="none"
              stroke="#1b3f3c"
              strokeWidth="4"
              strokeDasharray="28 20"
              opacity="0.5"
            />
            <path
              d="M-105 0 Q-90 -75 0 -75 Q75 -65 65 0 Q50 50 0 45 Q-38 38 -30 0 Q-24 -22 0 -18 Q18 -12 12 0"
              fill="none"
              stroke="#388b83"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M105 0 Q90 75 0 75 Q-75 65 -65 0 Q-50 -50 0 -45 Q38 -38 30 0 Q24 22 0 18 Q-18 12 -12 0"
              fill="none"
              stroke="#388b83"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M0 -95 Q75 -70 55 0 Q38 45 0 32 Q-25 20 -15 0 Q-8 -10 0 -6"
              fill="none"
              stroke="#75ffd4"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M0 95 Q-75 70 -55 0 Q-38 -45 0 -32 Q25 -20 15 0 Q8 10 0 6"
              fill="none"
              stroke="#75ffd4"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>
        </g>

        {/* Abyss Center - Pitch Black Eye of the Deep */}
        <ellipse cx="0" cy="0" rx="24" ry="10" fill="#000000" stroke="#1c1308" strokeWidth="2.5" />

        {/* Boiling Sulfur & Infernal Bubbles Rising */}
        <circle
          cx="-50"
          cy="-14"
          r="5"
          fill="#692415"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-spark-1"
        />
        <circle
          cx="65"
          cy="12"
          r="4.5"
          fill="#e63e1e"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-spark-2"
        />
        <circle
          cx="10"
          cy="-22"
          r="4"
          fill="#692415"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-lada-bubble-1"
        />
        <circle
          cx="-25"
          cy="18"
          r="5"
          fill="#e63e1e"
          stroke="#1c1308"
          strokeWidth="1"
          className="anim-lada-bubble-2"
        />
      </g>

      {/* Menacing Weeping Willows (Reaching claws into the abyss) */}
      <g
        transform="translate(160, 130)"
        className="anim-wind-sway"
        style={{ transformOrigin: "30px 100px" }}
      >
        <path
          d="M25 100 C32 50 15 20 30 0 C44 20 35 50 40 100 Z"
          fill="#2b1a10"
          stroke="#1c1308"
          strokeWidth="4"
        />
        <path
          d="M30 0 Q-10 20 -20 70 M30 0 Q5 -20 -5 -30 M30 0 Q60 -20 75 -10 M30 0 Q80 25 90 75"
          fill="none"
          stroke="#1c2b1a"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      <g
        transform="translate(860, 130)"
        className="anim-wind-sway"
        style={{ transformOrigin: "30px 100px" }}
      >
        <path
          d="M25 100 C32 50 15 20 30 0 C44 20 35 50 40 100 Z"
          fill="#2b1a10"
          stroke="#1c1308"
          strokeWidth="4"
        />
        <path
          d="M30 0 Q-10 20 -20 70 M30 0 Q5 -20 -5 -30 M30 0 Q60 -20 75 -10 M30 0 Q80 25 90 75"
          fill="none"
          stroke="#1c2b1a"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      {/* Sunken Boat Ribs protruding from the Black Pool */}
      <g transform="translate(740, 235)">
        <path
          d="M0 25 Q10 0 24 -15"
          fill="none"
          stroke="#3d2a1c"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M12 28 Q22 5 36 -10"
          fill="none"
          stroke="#3d2a1c"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M24 30 Q34 10 48 -5"
          fill="none"
          stroke="#3d2a1c"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Devilish Ancient Stone Totem with Glowing Red Eyes - Clickable */}
      <g
        transform="translate(320, 150)"
        className={`interactive-scenic ${bounce === "boss-totem" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "boss-totem", () => sound.playRavenCroak(), "Tajemný bůžek hledí!", "totem")
        }
      >
        <rect
          x="0"
          y="20"
          width="28"
          height="55"
          rx="3"
          fill="#2d2d38"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <polygon points="-4,22 14,0 32,22" fill="#202028" stroke="#1c1308" strokeWidth="3" />
        {/* Glowing Red Eyes of the Idol */}
        <circle cx="8" cy="34" r="3.2" fill="#ff2a14" className="anim-eye-pulse" />
        <circle cx="20" cy="34" r="3.2" fill="#ff2a14" className="anim-eye-pulse" />
        {/* Carved Rune Mouth */}
        <path d="M6 50 L14 44 L22 50" fill="none" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* Warning Signpost: "POZOR – ČERNÁ TŮŇ!" - Clickable */}
      <g
        transform="translate(230, 185)"
        className={`interactive-scenic ${bounce === "boss-cedule" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(
            e,
            "boss-cedule",
            () => sound.playWoodpeckerPeck(),
            "Pozor! Černá tůň!",
            "warning",
          )
        }
      >
        <line
          x1="15"
          y1="0"
          x2="15"
          y2="55"
          stroke="#4a2e16"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Leaning wooden warning board */}
        <polygon
          points="-8,4 38,-4 42,24 -4,32"
          fill="#8f5726"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        {/* Skull and crossed bones sketch */}
        <circle cx="17" cy="12" r="5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
        <line x1="8" y1="6" x2="26" y2="18" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="26" y1="6" x2="8" y2="18" stroke="#ffffff" strokeWidth="1.5" />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: STARÝ SUMEC ZE DNA TŮNĚ (Giant Catfish Surfacing) - Clickable
          =================================================================== */}
      <g
        transform="translate(460, 230)"
        className={`anim-catfish-dive interactive-scenic ${bounce === "boss-sumec" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "boss-sumec", () => sound.playSplash(), "Šplouch! Vousatý sumec!", "fish")
        }
      >
        {/* Catfish body diving down */}
        <path
          d="M0 12 Q14 -12 28 -2 Q36 6 42 16 Q28 14 16 18 Q6 16 0 12 Z"
          fill="#1c2b29"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        {/* Long sensitive whisker barbel */}
        <path
          d="M4 14 Q-4 18 -10 12"
          fill="none"
          stroke="#25423f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 16 Q-2 24 -6 26"
          fill="none"
          stroke="#25423f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Cold yellow deep-water eye */}
        <circle cx="10" cy="10" r="2.2" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
        <circle cx="10" cy="10" r="1.1" fill="#1c1308" />
      </g>

      {/* ===================================================================
          LADA FOLK FAUNA: TEMNÁ VÁŽKA (Storm dragonfly over churning water) - Clickable
          =================================================================== */}
      <g
        transform="translate(190, 160)"
        className={`anim-dragonfly-hover interactive-scenic ${bounce === "boss-vazka" ? "anim-easter-bounce" : ""}`}
        onClick={(e) =>
          trigger(e, "boss-vazka", () => sound.playChime(), "Bzzzk! Bouřková vážka!", "speed")
        }
      >
        <line
          x1="10"
          y1="2"
          x2="10"
          y2="20"
          stroke="#ff473a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="10" cy="2" r="2" fill="#ff473a" stroke="#1c1308" strokeWidth="0.8" />
        <g opacity="0.8">
          <ellipse
            cx="4"
            cy="6"
            rx="7"
            ry="2"
            fill="#ffa8a1"
            stroke="#1c1308"
            strokeWidth="0.8"
            transform="rotate(-15 4 6)"
          />
          <ellipse
            cx="16"
            cy="6"
            rx="7"
            ry="2"
            fill="#ffa8a1"
            stroke="#1c1308"
            strokeWidth="0.8"
            transform="rotate(15 16 6)"
          />
        </g>
      </g>
    </svg>
  );
}
