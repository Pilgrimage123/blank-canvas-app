import React from "react";
import { LocationId } from "../../types";

interface CombatLandscapeArenaProps {
  locId: LocationId | string;
  className?: string;
  children?: React.ReactNode;
}

export const CombatLandscapeArena: React.FC<CombatLandscapeArenaProps> = ({
  locId,
  className = "",
  children,
}) => {
  return (
    <div
      className={`relative w-full h-full min-h-[300px] overflow-hidden rounded-2xl border-3 border-[#1c1308] bg-[#f2e7cc] shadow-[0_4px_0_rgba(28,19,8,0.35)] select-none flex flex-col justify-between ${className}`}
    >
      {/* 1. SCENIC BACKGROUND ARTWORK */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {renderScenicLandscape(locId)}
      </div>

      {/* 2. GROUND PLANE / DIRT PATH - TWO-TIERED LANDSCAPE FOR 2 ROWS OF COMBATANTS */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 md:h-64 z-0 pointer-events-none">
        {/* Two-tiered ground gradient and path in Josef Lada folk style */}
        <svg viewBox="0 0 1000 240" preserveAspectRatio="none" className="w-full h-full">
          {/* Upper Grassy Bank / Terrace where the back row of 4 bogeys stands */}
          <path
            d="M0 50 Q240 22 500 38 Q760 20 1000 45 L1000 240 L0 240 Z"
            fill={getGroundColor(locId)}
            stroke="#1c1308"
            strokeWidth="3.5"
          />

          {/* Upper rustic earthen ridge for the rear line */}
          <path
            d="M260 72 Q520 54 780 62 Q900 68 1000 78 L1000 140 Q800 120 550 115 Q360 110 240 125 Z"
            fill={getPathColor(locId)}
            opacity="0.75"
            stroke="#1c1308"
            strokeWidth="2.5"
          />

          {/* Rustic wooden fence & hedge between upper and lower tiers */}
          <g stroke="#1c1308" strokeWidth="2.5" fill="none" strokeLinecap="round">
            {/* Wooden posts on the upper ridge */}
            <line x1="380" y1="52" x2="380" y2="84" stroke="#523820" strokeWidth="4.5" />
            <line x1="520" y1="46" x2="520" y2="78" stroke="#523820" strokeWidth="4.5" />
            <line x1="680" y1="50" x2="680" y2="82" stroke="#523820" strokeWidth="4.5" />
            <line x1="840" y1="56" x2="840" y2="88" stroke="#523820" strokeWidth="4.5" />
            {/* Fence rails */}
            <path d="M370 64 Q530 55 690 60 Q760 62 850 68" stroke="#694825" strokeWidth="3" />
            <path d="M370 76 Q530 68 690 72 Q760 74 850 80" stroke="#694825" strokeWidth="3" />
          </g>

          {/* Lower Main Road / Beaten path where hunter and front row stand */}
          <path
            d="M0 120 Q280 95 540 110 Q780 98 1000 128 L1000 240 L0 240 Z"
            fill={getPathColor(locId)}
            stroke="#1c1308"
            strokeWidth="3"
          />

          {/* Rustic grass tufts, daisies, and cobblestones along the paths */}
          <g stroke="#1c1308" strokeWidth="2.5" fill="none" strokeLinecap="round">
            {/* Upper bank grass */}
            <path d="M90 42 Q94 30 90 20 M90 42 Q98 32 106 36" stroke="#244519" />
            <path d="M310 50 Q314 38 310 28 M310 50 Q318 40 326 44" stroke="#244519" />
            <path d="M610 46 Q614 34 610 24 M610 46 Q618 36 626 40" stroke="#244519" />
            <path d="M920 48 Q924 36 920 26 M920 48 Q928 38 936 42" stroke="#244519" />

            {/* Daisies / Wildflowers on upper bank */}
            <circle cx="210" cy="40" r="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
            <circle cx="450" cy="42" r="3.5" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.5" />
            <circle cx="750" cy="44" r="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />

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
            {/* 3rd Cobblestone with Lada Pentagram etching */}
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
                fillOpacity="0.45"
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
        </svg>
      </div>

      {/* 3. FOREGROUND ACTORS (HUNTER & BUBÁCI) */}
      <div className="relative z-10 flex-1 w-full h-full flex flex-col justify-between p-2 sm:p-4">
        {children}
      </div>
    </div>
  );
};

function getGroundColor(locId: string): string {
  switch (locId) {
    case "les":
      return "#2f572a";
    case "rybnik":
    case "boss":
      return "#24453a";
    case "zricenina":
      return "#4e5442";
    case "hrbitov":
      return "#2b332d";
    case "mlyn":
      return "#588c42";
    case "vesnice":
    default:
      return "#5f9644";
  }
}

function getPathColor(locId: string): string {
  switch (locId) {
    case "les":
      return "#5c432a";
    case "rybnik":
    case "boss":
      return "#3a5250";
    case "zricenina":
      return "#665c4d";
    case "hrbitov":
      return "#3d3842";
    case "mlyn":
      return "#826543";
    case "vesnice":
    default:
      return "#94754d";
  }
}

function renderScenicLandscape(locId: string) {
  switch (locId) {
    case "mlyn":
      return (
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Morning Sky with soft blue and ivory haze */}
          <rect width="1000" height="400" fill="#a4cde8" />
          <circle
            cx="850"
            cy="70"
            r="32"
            fill="#fff5cc"
            stroke="#1c1308"
            strokeWidth="2.5"
            opacity="0.9"
          />

          {/* Lada Fluffy Clouds */}
          <g fill="#ffffff" stroke="#1c1308" strokeWidth="2.5" opacity="0.9">
            <path d="M120 70 Q140 45 170 55 Q200 40 230 60 Q260 55 270 75 Q270 95 240 95 L140 95 Q115 95 120 70 Z" />
            <path d="M520 85 Q545 60 575 70 Q605 55 635 75 Q660 70 670 90 Q665 110 635 110 L540 110 Q515 110 520 85 Z" />
          </g>

          {/* Distant Bohemian hills */}
          <path
            d="M0 240 Q250 170 520 220 Q780 160 1000 230 L1000 400 L0 400 Z"
            fill="#6da84f"
            stroke="#1c1308"
            strokeWidth="3"
          />
          <path
            d="M0 270 Q280 210 600 260 Q820 220 1000 275 L1000 400 L0 400 Z"
            fill="#528e3b"
            stroke="#1c1308"
            strokeWidth="3"
          />

          {/* Millpond & Water stream */}
          <path
            d="M300 400 Q420 260 620 270 Q780 280 920 400 Z"
            fill="#42789e"
            stroke="#1c1308"
            strokeWidth="3"
          />
          <line
            x1="440"
            y1="310"
            x2="520"
            y2="310"
            stroke="#79aed4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="680"
            y1="330"
            x2="780"
            y2="330"
            stroke="#79aed4"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Watermill Cottage */}
          <g transform="translate(380, 160)">
            {/* Cottage walls */}
            <rect
              x="0"
              y="45"
              width="130"
              height="75"
              fill="#f6eedb"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
            {/* Red shingle roof */}
            <polygon points="-15,48 65,5 145,48" fill="#c4381f" stroke="#1c1308" strokeWidth="4" />
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
              cy="-6"
              r="7.5"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="1.5"
              className="anim-chimney-smoke-2"
            />
            <circle
              cx="46"
              cy="-18"
              r="10.5"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="1.5"
              className="anim-chimney-smoke-3"
            />
            {/* Windows */}
            <rect
              x="20"
              y="65"
              width="26"
              height="26"
              fill="#385878"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <line x1="33" y1="65" x2="33" y2="91" stroke="#f6eedb" strokeWidth="2" />
            <line x1="20" y1="78" x2="46" y2="78" stroke="#f6eedb" strokeWidth="2" />
            <rect
              x="75"
              y="65"
              width="26"
              height="26"
              fill="#385878"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <line x1="88" y1="65" x2="88" y2="91" stroke="#f6eedb" strokeWidth="2" />
            <line x1="75" y1="78" x2="101" y2="78" stroke="#f6eedb" strokeWidth="2" />
            {/* Wooden door */}
            <rect
              x="110"
              y="70"
              width="16"
              height="50"
              fill="#664324"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
          </g>

          {/* Wooden Waterwheel (Otáčející se mlýnské kolo) */}
          <g transform="translate(535, 255)">
            <circle cx="0" cy="0" r="38" fill="#4d321c" stroke="#1c1308" strokeWidth="4" />
            <circle cx="0" cy="0" r="22" fill="#a4cde8" stroke="#1c1308" strokeWidth="3" />
            <line x1="-36" y1="0" x2="36" y2="0" stroke="#1c1308" strokeWidth="3.5" />
            <line x1="0" y1="-36" x2="0" y2="36" stroke="#1c1308" strokeWidth="3.5" />
            <line x1="-25" y1="-25" x2="25" y2="25" stroke="#1c1308" strokeWidth="3" />
            <line x1="-25" y1="25" x2="25" y2="-25" stroke="#1c1308" strokeWidth="3" />
            {/* Water splashes and bubbles */}
            <circle
              cx="34"
              cy="22"
              r="3.2"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="0.8"
              className="anim-lada-bubble-1"
            />
            <circle
              cx="30"
              cy="32"
              r="4.2"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="0.8"
              className="anim-lada-bubble-2"
            />
            <circle
              cx="-32"
              cy="25"
              r="3.5"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="0.8"
              className="anim-lada-bubble-3"
            />
            <circle
              cx="20"
              cy="36"
              r="2.8"
              fill="#bfe3fa"
              stroke="#1c1308"
              strokeWidth="0.8"
              className="anim-lada-bubble-4"
            />
          </g>

          {/* Characteristic Pollarded Willow (Hlavatá vrba) */}
          <g transform="translate(180, 180)">
            <path
              d="M20 90 C24 45 10 20 26 0 C40 20 30 45 34 90 Z"
              fill="#523820"
              stroke="#1c1308"
              strokeWidth="4"
            />
            <path
              d="M26 4 Q4 8 0 45 M26 4 Q12 -16 6 -24 M26 4 Q42 -20 50 -16 M26 4 Q54 10 60 48"
              fill="none"
              stroke="#467832"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    case "les":
      return (
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Deep Forest Dusk Sky */}
          <rect width="1000" height="400" fill="#75a6a6" />
          {/* Distant pine silhouettes */}
          <path
            d="M0 200 Q200 160 400 185 Q650 150 1000 180 L1000 400 L0 400 Z"
            fill="#1b3d22"
            stroke="#1c1308"
            strokeWidth="3"
          />

          {/* Majestic Josef Lada Pine Trees */}
          <g transform="translate(120, 90)">
            <polygon points="35,0 8,70 62,70" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
            <polygon
              points="35,-30 14,35 56,35"
              fill="#1e4726"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
            <polygon points="35,-60 20,0 50,0" fill="#295932" stroke="#1c1308" strokeWidth="3.5" />
            <rect
              x="29"
              y="70"
              width="12"
              height="60"
              fill="#4a2e16"
              stroke="#1c1308"
              strokeWidth="3"
            />
          </g>

          <g transform="translate(260, 110)">
            <polygon points="30,0 8,60 52,60" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
            <polygon
              points="30,-25 14,30 46,30"
              fill="#1e4726"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
            <rect
              x="25"
              y="60"
              width="10"
              height="50"
              fill="#4a2e16"
              stroke="#1c1308"
              strokeWidth="3"
            />
          </g>

          <g transform="translate(680, 80)">
            <polygon points="38,0 8,75 68,75" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
            <polygon
              points="38,-35 14,38 62,38"
              fill="#1e4726"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
            <polygon points="38,-65 22,2 54,2" fill="#295932" stroke="#1c1308" strokeWidth="3.5" />
            <rect
              x="32"
              y="75"
              width="12"
              height="65"
              fill="#4a2e16"
              stroke="#1c1308"
              strokeWidth="3"
            />
          </g>

          <g transform="translate(820, 105)">
            <polygon points="32,0 8,65 56,65" fill="#16381d" stroke="#1c1308" strokeWidth="3.5" />
            <polygon
              points="32,-28 14,32 50,32"
              fill="#1e4726"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
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

          {/* Mossy knolls */}
          <path
            d="M0 250 Q300 210 600 240 Q800 220 1000 255 L1000 400 L0 400 Z"
            fill="#2d5726"
            stroke="#1c1308"
            strokeWidth="3.5"
          />

          {/* Fairy-tale Amanita Toadstools (Muchomůrky červené s puntíky) */}
          <g transform="translate(460, 220)">
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
            <ellipse
              cx="22"
              cy="18"
              rx="18"
              ry="13"
              fill="#d4371e"
              stroke="#1c1308"
              strokeWidth="3"
            />
            <circle cx="14" cy="14" r="3" fill="#ffffff" />
            <circle cx="24" cy="12" r="3" fill="#ffffff" />
            <circle cx="30" cy="19" r="2.5" fill="#ffffff" />
            <circle cx="16" cy="22" r="2" fill="#ffffff" />
          </g>

          <g transform="translate(495, 230)">
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
              rx="13"
              ry="9"
              fill="#d4371e"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <circle cx="10" cy="11" r="2" fill="#ffffff" />
            <circle cx="18" cy="10" r="2" fill="#ffffff" />
            <circle cx="21" cy="15" r="1.5" fill="#ffffff" />
          </g>
        </svg>
      );

    case "rybnik":
    case "boss":
      return (
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Night Sky with Deep Navy and Moon Glow */}
          <rect width="1000" height="400" fill={locId === "boss" ? "#141d2b" : "#33485e"} />

          {/* Huge Lada Full Moon (Měsíc v úplňku) */}
          <circle cx="780" cy="90" r="42" fill="#ffea94" stroke="#1c1308" strokeWidth="3.5" />
          <circle cx="780" cy="90" r="36" fill="#ffe270" opacity="0.4" />
          {/* Subtle lunar face / crater spots */}
          <ellipse cx="768" cy="82" rx="4" ry="3" fill="#e8c248" />
          <ellipse cx="792" cy="85" rx="5" ry="4" fill="#e8c248" />
          <path
            d="M774 98 Q782 102 790 98"
            fill="none"
            stroke="#d6ac38"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Twinkling Stars */}
          <g fill="#ffea94">
            <circle cx="120" cy="50" r="2.5" />
            <circle cx="280" cy="40" r="3" />
            <circle cx="440" cy="70" r="2" />
            <circle cx="590" cy="35" r="3" />
            <circle cx="920" cy="65" r="2.5" />
          </g>

          {/* Dark rolling hills & Church silhouette */}
          <path
            d="M0 210 Q280 160 550 195 Q800 165 1000 205 L1000 400 L0 400 Z"
            fill="#1b2e27"
            stroke="#1c1308"
            strokeWidth="3"
          />
          {/* Baroque Church onion spire */}
          <g transform="translate(340, 120)">
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
            <line x1="17" y1="-4" x2="25" y2="-4" stroke="#1c1308" strokeWidth="2" />
          </g>

          {/* Deep Pond Water (Hladina rybníka) */}
          <path
            d="M0 240 Q300 205 600 230 Q800 210 1000 235 L1000 400 L0 400 Z"
            fill="#1c3447"
            stroke="#1c1308"
            strokeWidth="3.5"
          />
          {/* Moon reflection on water */}
          <line
            x1="740"
            y1="260"
            x2="820"
            y2="260"
            stroke="#79a7c7"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="720"
            y1="280"
            x2="840"
            y2="280"
            stroke="#79a7c7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="750"
            y1="300"
            x2="810"
            y2="300"
            stroke="#79a7c7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Bulrushes & Reeds (Orobinec) */}
          <g transform="translate(140, 180)">
            <line x1="12" y1="70" x2="10" y2="10" stroke="#2d4f24" strokeWidth="3.5" />
            <rect
              x="7"
              y="14"
              width="6"
              height="24"
              rx="3"
              fill="#4d3018"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <line x1="28" y1="70" x2="30" y2="18" stroke="#2d4f24" strokeWidth="3.5" />
            <rect
              x="27"
              y="22"
              width="6"
              height="22"
              rx="3"
              fill="#4d3018"
              stroke="#1c1308"
              strokeWidth="2"
            />
          </g>

          {/* Huge Willow Tree (Stará vrba nad vodou) */}
          <g transform="translate(850, 140)">
            <path
              d="M30 110 C36 60 22 25 36 0 C52 25 40 60 44 110 Z"
              fill="#382515"
              stroke="#1c1308"
              strokeWidth="4"
            />
            <path
              d="M36 2 Q4 15 0 60 M36 2 Q16 -16 10 -28 M36 2 Q56 -18 64 -10 M36 2 Q72 15 80 65"
              fill="none"
              stroke="#2b4724"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    case "zricenina":
      return (
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Sunset Crimson Sky */}
          <rect width="1000" height="400" fill="#c46a49" />
          <circle cx="200" cy="110" r="38" fill="#fadc7a" stroke="#1c1308" strokeWidth="3" />

          {/* Craggy Hillside */}
          <path
            d="M0 240 Q280 170 540 180 Q780 160 1000 230 L1000 400 L0 400 Z"
            fill="#4a523e"
            stroke="#1c1308"
            strokeWidth="3.5"
          />

          {/* Gothic Castle Ruins (Hradní zřícenina) */}
          <g transform="translate(540, 90)">
            {/* Main ruined stone tower */}
            <rect
              x="25"
              y="30"
              width="110"
              height="100"
              fill="#696052"
              stroke="#1c1308"
              strokeWidth="4"
            />
            {/* Crenellations (Cimbuří) */}
            <rect
              x="22"
              y="10"
              width="25"
              height="24"
              fill="#696052"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
            <rect
              x="68"
              y="10"
              width="25"
              height="24"
              fill="#696052"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
            <rect
              x="112"
              y="10"
              width="25"
              height="24"
              fill="#696052"
              stroke="#1c1308"
              strokeWidth="3.5"
            />
            {/* Arched Gothic Loophole Window */}
            <path
              d="M68 55 C68 40 92 40 92 55 L92 90 L68 90 Z"
              fill="#1c1610"
              stroke="#1c1308"
              strokeWidth="3"
            />
            {/* Ivy tendrils */}
            <path
              d="M30 115 Q40 85 32 65 Q45 70 38 95"
              fill="none"
              stroke="#2b4724"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Raven on signpost */}
          <g transform="translate(240, 180)">
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="65"
              stroke="#4a2e16"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse cx="20" cy="-4" rx="9" ry="6" fill="#1c1308" />
            <polygon points="29,-4 36,-6 29,-2" fill="#c48a25" />
          </g>
        </svg>
      );

    case "hrbitov":
      return (
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Spooky Violet Twilight Sky */}
          <rect width="1000" height="400" fill="#2d3345" />

          {/* Twinkling yellow stars */}
          <g fill="#ffea94">
            <circle cx="160" cy="50" r="2.5" />
            <circle cx="340" cy="35" r="3" />
            <circle cx="520" cy="60" r="2" />
            <circle cx="700" cy="40" r="3" />
            <circle cx="880" cy="55" r="2.5" />
          </g>

          {/* Grassy Cemetery mounds */}
          <path
            d="M0 240 Q250 190 500 220 Q750 195 1000 235 L1000 400 L0 400 Z"
            fill="#263027"
            stroke="#1c1308"
            strokeWidth="3.5"
          />

          {/* Stone & Wooden Memorial Crosses */}
          <g transform="translate(220, 160)">
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="60"
              stroke="#757e87"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="16"
              x2="32"
              y2="16"
              stroke="#757e87"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          <g transform="translate(420, 150)">
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="65"
              stroke="#523820"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="18"
              x2="34"
              y2="18"
              stroke="#523820"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          <g transform="translate(640, 155)">
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="62"
              stroke="#757e87"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="16"
              x2="32"
              y2="16"
              stroke="#757e87"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>

          {/* Stone cemetery wall */}
          <path
            d="M750 200 L950 200 L950 260 L750 260 Z"
            fill="#474d57"
            stroke="#1c1308"
            strokeWidth="3.5"
          />
          <line x1="810" y1="200" x2="810" y2="260" stroke="#1c1308" strokeWidth="2" />
          <line x1="880" y1="200" x2="880" y2="260" stroke="#1c1308" strokeWidth="2" />
        </svg>
      );

    case "vesnice":
    default:
      return (
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Pure Sunny Bohemian Sky */}
          <rect width="1000" height="400" fill="#8bc2e8" />
          {/* Lada Golden Sun with rays */}
          <circle cx="160" cy="80" r="35" fill="#f4c23c" stroke="#1c1308" strokeWidth="3.5" />
          <line
            x1="160"
            y1="35"
            x2="160"
            y2="20"
            stroke="#f4c23c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="125"
            x2="160"
            y2="140"
            stroke="#f4c23c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="115"
            y1="80"
            x2="100"
            y2="80"
            stroke="#f4c23c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="205"
            y1="80"
            x2="220"
            y2="80"
            stroke="#f4c23c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Gentle Bohemian Green Hills */}
          <path
            d="M0 230 Q280 160 550 210 Q780 160 1000 220 L1000 400 L0 400 Z"
            fill="#629e48"
            stroke="#1c1308"
            strokeWidth="3.5"
          />

          {/* Distant Hrusice Church of St. Havel Spire */}
          <g transform="translate(720, 110)">
            <rect
              x="8"
              y="24"
              width="24"
              height="46"
              fill="#f4ecdc"
              stroke="#1c1308"
              strokeWidth="3"
            />
            <polygon points="6,24 20,0 34,24" fill="#bd3620" stroke="#1c1308" strokeWidth="3" />
            <line x1="20" y1="0" x2="20" y2="-6" stroke="#1c1308" strokeWidth="2.5" />
            <line x1="16" y1="-3" x2="24" y2="-3" stroke="#1c1308" strokeWidth="2" />
          </g>

          {/* Cozy Whitewashed Roubenka Cottage with smoking chimney */}
          <g transform="translate(360, 130)">
            {/* Wall */}
            <rect
              x="0"
              y="32"
              width="130"
              height="68"
              fill="#fcf6e8"
              stroke="#1c1308"
              strokeWidth="4"
            />
            {/* Red shingle roof */}
            <polygon points="-12,34 65,-8 142,34" fill="#c4321d" stroke="#1c1308" strokeWidth="4" />
            {/* Chimney with cute rounded smoke puffs */}
            <rect
              x="25"
              y="-2"
              width="16"
              height="24"
              fill="#8f4a38"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <circle
              cx="33"
              cy="-8"
              r="6.5"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="1.5"
              className="anim-chimney-smoke-1"
            />
            <circle
              cx="40"
              cy="-20"
              r="9"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="1.5"
              className="anim-chimney-smoke-2"
            />
            <circle
              cx="48"
              cy="-34"
              r="12"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="1.5"
              className="anim-chimney-smoke-3"
            />
            {/* Windows with blue frames */}
            <rect
              x="20"
              y="48"
              width="26"
              height="26"
              fill="#4d7296"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <line x1="33" y1="48" x2="33" y2="74" stroke="#ffffff" strokeWidth="2" />
            <line x1="20" y1="61" x2="46" y2="61" stroke="#ffffff" strokeWidth="2" />
            <rect
              x="75"
              y="48"
              width="26"
              height="26"
              fill="#4d7296"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <line x1="88" y1="48" x2="88" y2="74" stroke="#ffffff" strokeWidth="2" />
            <line x1="75" y1="61" x2="101" y2="61" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Wooden Picket Fence (Plaňkový plot) */}
          <g transform="translate(200, 205)">
            <line x1="0" y1="18" x2="110" y2="18" stroke="#1c1308" strokeWidth="3" />
            <line x1="0" y1="34" x2="110" y2="34" stroke="#1c1308" strokeWidth="3" />
            <polygon points="10,44 16,8 22,44" fill="#dba864" stroke="#1c1308" strokeWidth="2" />
            <polygon points="34,44 40,6 46,44" fill="#dba864" stroke="#1c1308" strokeWidth="2" />
            <polygon points="58,44 64,8 70,44" fill="#dba864" stroke="#1c1308" strokeWidth="2" />
            <polygon points="82,44 88,6 94,44" fill="#dba864" stroke="#1c1308" strokeWidth="2" />
          </g>
        </svg>
      );
  }
}
