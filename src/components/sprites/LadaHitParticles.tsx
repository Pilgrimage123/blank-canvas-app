import React from "react";

export type HitParticleTheme = "default" | "salt" | "water" | "devil" | "hero";

export interface LadaHitParticlesProps {
  active: boolean;
  theme?: HitParticleTheme;
  subType?: string; // e.g. "vodnik", "cert", "bubak", "pobuda", "babicka", "bylinkarka", "kostelnik"
  isSalt?: boolean;
  size?: number;
  className?: string;
}

/**
 * Autentické Ladovské částicové efekty při zásahu (On-Hit Particles)
 * Inspirace: Pohádkový styl Josefa Lady (Bubáci a hastrmani, Hrusické pohádky)
 *
 * Charakteristické prvky:
 * - Tlustá černá tušová kontura (stroke="#1c1308")
 * - Oblé, baculaté komické tvary (hvězdičky, obláčky prachu, krystalky soli, kapky vody)
 * - Teplé pohádkové barvy (zlatá žluť, cinobrová červeň, běloba soli, rybniční modř)
 * - Hravý pohyb: rozlétnutí do stran, rotace, jemné zhoupnutí a rozplynutí
 */
export const LadaHitParticles: React.FC<LadaHitParticlesProps> = ({
  active,
  theme = "default",
  subType,
  isSalt = false,
  size = 140,
  className = "",
}) => {
  if (!active) return null;

  // Resolve theme automatically if not explicitly given
  let resolvedTheme: HitParticleTheme = theme;
  if (isSalt) {
    resolvedTheme = "salt";
  } else if (subType) {
    const s = subType.toLowerCase();
    if (
      s.includes("vodnik") ||
      s.includes("hastrman") ||
      s.includes("rusalka") ||
      s.includes("ropucha")
    ) {
      resolvedTheme = "water";
    } else if (
      s.includes("cert") ||
      s.includes("rarasek") ||
      s.includes("pekeln") ||
      s.includes("dudy")
    ) {
      resolvedTheme = "devil";
    } else if (s === "pobuda" || s === "babicka" || s === "bylinkarka" || s === "kostelnik") {
      resolvedTheme = "hero";
    }
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-visible select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ladovský černý tušový filtr pro mírné organické zvlnění */}
          <filter id="lada-ink-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="0.5"
              floodColor="#1c1308"
              floodOpacity="0.4"
            />
          </filter>
        </defs>

        {/* 1. CENTRÁLNÍ KOMICKÝ ZÁBLESK / RÁZOVÝ PAPRSEK */}
        <g className="anim-hit-center-burst" style={{ transformOrigin: "80px 80px" }}>
          {/* Centrální nárazový obláček */}
          <path
            d="M 80 62 C 90 55, 102 62, 100 74 C 110 80, 106 94, 96 96 C 92 106, 78 108, 70 100 C 60 104, 52 92, 56 82 C 50 72, 62 60, 72 65 Z"
            fill="#fff9e6"
            stroke="#1c1308"
            strokeWidth="3"
            strokeLinejoin="round"
            className="anim-hit-puff-main"
          />
          {/* Vnitřní žlutý nárazový záblesk */}
          <path
            d="M 80 68 C 86 64, 94 68, 93 76 C 99 80, 97 90, 89 91 C 86 97, 77 98, 72 93 C 65 96, 60 88, 63 81 C 59 75, 68 67, 75 70 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Komické paprsky úderu */}
          <path
            d="M 52 52 L 40 40 M 108 52 L 120 40 M 112 108 L 124 120 M 48 108 L 36 120 M 80 44 L 80 32 M 116 80 L 128 80 M 80 116 L 80 128 M 44 80 L 32 80"
            stroke="#1c1308"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="anim-hit-spikes"
          />
        </g>

        {/* 2. HLAVNÍ LADOVSKÉ KOMICKÉ HVĚZDIČKY (4cípé tučné hvězdy s černou tuší) */}
        {/* Hvězdička 1: Horní vpravo - velká zlatá */}
        <g className="anim-hit-star-1" style={{ transformOrigin: "80px 80px" }}>
          <path
            d="M 115 45 Q 115 55 125 55 Q 115 55 115 65 Q 115 55 105 55 Q 115 55 115 45 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="2.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Bílý odlesk v oku hvězdičky */}
          <circle cx="114" cy="54" r="2.2" fill="#ffffff" />
        </g>

        {/* Hvězdička 2: Vlevo nahoře - střední teplá oranžová */}
        <g className="anim-hit-star-2" style={{ transformOrigin: "80px 80px" }}>
          <path
            d="M 45 48 Q 45 56 53 56 Q 45 56 45 64 Q 45 56 37 56 Q 45 56 45 48 Z"
            fill="#f79c24"
            stroke="#1c1308"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="44.2" cy="55.2" r="1.8" fill="#fff5d0" />
        </g>

        {/* Hvězdička 3: Vpravo dole - veselá žlutá */}
        <g className="anim-hit-star-3" style={{ transformOrigin: "80px 80px" }}>
          <path
            d="M 120 105 Q 120 113 128 113 Q 120 113 120 121 Q 120 113 112 113 Q 120 113 120 105 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="119" cy="112" r="1.7" fill="#ffffff" />
        </g>

        {/* Hvězdička 4: Vlevo dole - drobnější jiskřivá */}
        <g className="anim-hit-star-4" style={{ transformOrigin: "80px 80px" }}>
          <path
            d="M 40 108 Q 40 114 46 114 Q 40 114 40 120 Q 40 114 34 114 Q 40 114 40 108 Z"
            fill="#ffe873"
            stroke="#1c1308"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* Hvězdička 5: Přímo nahoře - malá vyskakující */}
        <g className="anim-hit-star-5" style={{ transformOrigin: "80px 80px" }}>
          <path
            d="M 80 25 Q 80 31 86 31 Q 80 31 80 37 Q 80 31 74 31 Q 80 31 80 25 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* 3. KOMICKÉ OBLÁČKY PRACHU / DÝMU (Puf! ☁️) */}
        <g className="anim-hit-dust-1" style={{ transformOrigin: "80px 80px" }}>
          <ellipse
            cx="32"
            cy="76"
            rx="11"
            ry="9"
            fill="#f7edd4"
            stroke="#1c1308"
            strokeWidth="2.4"
          />
          <ellipse cx="26" cy="74" rx="6" ry="5" fill="#fdfaf3" />
        </g>

        <g className="anim-hit-dust-2" style={{ transformOrigin: "80px 80px" }}>
          <ellipse
            cx="128"
            cy="74"
            rx="12"
            ry="10"
            fill="#f7edd4"
            stroke="#1c1308"
            strokeWidth="2.4"
          />
          <ellipse cx="132" cy="72" rx="6" ry="5" fill="#fdfaf3" />
        </g>

        {/* 4. TÉMATICKY SPECIFICKÉ ČÁSTICE (Voda / Sůl / Peklo / Hrdina) */}

        {/* TÉMA: VODNÍ KAPKY (Hastrman, Rusalka, Ropucha - Šplouch! 💦) */}
        {resolvedTheme === "water" && (
          <g className="anim-hit-theme-water">
            {/* Kapka 1: Vystříknutí vlevo nahoru */}
            <g className="anim-hit-drop-1" style={{ transformOrigin: "80px 80px" }}>
              <path
                d="M 52 42 C 47 48 45 56 50 60 C 55 64 63 62 64 56 C 65 48 56 38 52 42 Z"
                fill="#58b5e6"
                stroke="#1c1308"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <circle cx="52" cy="54" r="2.2" fill="#ffffff" opacity="0.9" />
            </g>
            {/* Kapka 2: Vystříknutí vpravo nahoru */}
            <g className="anim-hit-drop-2" style={{ transformOrigin: "80px 80px" }}>
              <path
                d="M 108 42 C 113 48 115 56 110 60 C 105 64 97 62 96 56 C 95 48 104 38 108 42 Z"
                fill="#42a5f5"
                stroke="#1c1308"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <circle cx="107" cy="54" r="2.2" fill="#ffffff" opacity="0.9" />
            </g>
            {/* Kapka 3: Drobná kapička vpravo */}
            <g className="anim-hit-drop-3" style={{ transformOrigin: "80px 80px" }}>
              <circle cx="135" cy="85" r="4.5" fill="#72c5f7" stroke="#1c1308" strokeWidth="2" />
              <circle cx="134" cy="83" r="1.5" fill="#ffffff" />
            </g>
            {/* Kapka 4: Drobná kapička vlevo */}
            <g className="anim-hit-drop-4" style={{ transformOrigin: "80px 80px" }}>
              <circle cx="25" cy="88" r="4" fill="#72c5f7" stroke="#1c1308" strokeWidth="2" />
              <circle cx="24" cy="86" r="1.4" fill="#ffffff" />
            </g>
          </g>
        )}

        {/* TÉMA: SŮL A KRYSTALKY (Při zásahu solí / Solný spálenec - Sssst! 🧂) */}
        {resolvedTheme === "salt" && (
          <g className="anim-hit-theme-salt">
            {/* Krystal 1: Bílý diamant vpravo nahoře */}
            <g className="anim-hit-salt-1" style={{ transformOrigin: "80px 80px" }}>
              <polygon
                points="112,48 122,42 128,52 118,58"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <line x1="112" y1="48" x2="128" y2="52" stroke="#d5e8f7" strokeWidth="1.2" />
            </g>
            {/* Krystal 2: Bílý diamant vlevo nahoře */}
            <g className="anim-hit-salt-2" style={{ transformOrigin: "80px 80px" }}>
              <polygon
                points="48,46 38,40 32,50 42,56"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <line x1="48" y1="46" x2="32" y2="50" stroke="#d5e8f7" strokeWidth="1.2" />
            </g>
            {/* Krystal 3: Šestiúhelník dole vpravo */}
            <g className="anim-hit-salt-3" style={{ transformOrigin: "80px 80px" }}>
              <polygon
                points="120,110 126,106 130,112 126,118 120,118 116,112"
                fill="#fffdec"
                stroke="#1c1308"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </g>
            {/* Krystal 4: Drobná sůl dole vlevo */}
            <g className="anim-hit-salt-4" style={{ transformOrigin: "80px 80px" }}>
              <polygon
                points="40,112 45,108 49,113 45,117"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
            {/* Jiskřivá zrnka soli */}
            <circle cx="70" cy="38" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
            <circle cx="92" cy="38" r="2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
            <circle cx="130" cy="80" r="2.4" fill="#ffffff" stroke="#1c1308" strokeWidth="1.4" />
          </g>
        )}

        {/* TÉMA: PEKELNÉ SAZE A JISKRY (Čert, Rarášek, Dudy - Žuch! 🔥) */}
        {resolvedTheme === "devil" && (
          <g className="anim-hit-theme-devil">
            {/* Pekelná černá saze vlevo */}
            <g className="anim-hit-soot-1" style={{ transformOrigin: "80px 80px" }}>
              <ellipse
                cx="44"
                cy="52"
                rx="7"
                ry="5.5"
                fill="#2d1e15"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="36" cy="46" r="3" fill="#1c1308" />
            </g>
            {/* Pekelná saze vpravo */}
            <g className="anim-hit-soot-2" style={{ transformOrigin: "80px 80px" }}>
              <ellipse
                cx="116"
                cy="54"
                rx="7.5"
                ry="6"
                fill="#2d1e15"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="124" cy="48" r="3.2" fill="#1c1308" />
            </g>
            {/* Žhavá uhlíková jiskra 1 */}
            <g className="anim-hit-spark-1" style={{ transformOrigin: "80px 80px" }}>
              <circle cx="56" cy="36" r="3.5" fill="#ff5722" stroke="#1c1308" strokeWidth="1.8" />
              <circle cx="55" cy="35" r="1.3" fill="#ffeb3b" />
            </g>
            {/* Žhavá uhlíková jiskra 2 */}
            <g className="anim-hit-spark-2" style={{ transformOrigin: "80px 80px" }}>
              <circle cx="104" cy="34" r="3.5" fill="#ff5722" stroke="#1c1308" strokeWidth="1.8" />
              <circle cx="103" cy="33" r="1.3" fill="#ffeb3b" />
            </g>
          </g>
        )}

        {/* TÉMA: HRDINA ZASAŽEN (Pobuda, Kostelník, Bylinkářka, Babička - Au! 💢) */}
        {resolvedTheme === "hero" && (
          <g className="anim-hit-theme-hero">
            {/* Pobuda: Poletující bažantí pírko a tabákový chomáček */}
            {subType === "pobuda" && (
              <g className="anim-hit-hero-feather" style={{ transformOrigin: "80px 80px" }}>
                <path
                  d="M 112 36 C 118 30 126 34 130 42 C 124 48 116 46 112 36 Z"
                  fill="#8c4820"
                  stroke="#1c1308"
                  strokeWidth="2"
                />
                <line x1="112" y1="36" x2="128" y2="44" stroke="#ffd438" strokeWidth="1.2" />
              </g>
            )}
            {/* Bylinkářka: Lístek heřmánku a kvítek */}
            {subType === "bylinkarka" && (
              <g className="anim-hit-hero-herb" style={{ transformOrigin: "80px 80px" }}>
                <path
                  d="M 114 38 C 120 32 128 36 128 44 C 122 46 116 44 114 38 Z"
                  fill="#7cb342"
                  stroke="#1c1308"
                  strokeWidth="2"
                />
                {/* Heřmánkový kvítek */}
                <circle cx="46" cy="48" r="3.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.6" />
                <circle cx="46" cy="42" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
                <circle cx="51" cy="46" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
                <circle cx="48" cy="52" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
                <circle cx="41" cy="50" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
              </g>
            )}
            {/* Babička: Drobky chlebové kůrky a zrnko soli */}
            {subType === "babicka" && (
              <g className="anim-hit-hero-bread" style={{ transformOrigin: "80px 80px" }}>
                <polygon
                  points="112,42 120,40 122,48 114,47"
                  fill="#c68a4c"
                  stroke="#1c1308"
                  strokeWidth="1.8"
                />
                <polygon
                  points="46,46 52,43 54,49 48,50"
                  fill="#a46830"
                  stroke="#1c1308"
                  strokeWidth="1.8"
                />
                <circle
                  cx="126"
                  cy="56"
                  r="2.4"
                  fill="#ffffff"
                  stroke="#1c1308"
                  strokeWidth="1.2"
                />
                <circle cx="38" cy="54" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
              </g>
            )}
            {/* Kostelník: Kapičky svěcené vody a zlatý záblesk */}
            {subType === "kostelnik" && (
              <g className="anim-hit-hero-holy" style={{ transformOrigin: "80px 80px" }}>
                <circle cx="118" cy="44" r="4.2" fill="#80d8ff" stroke="#1c1308" strokeWidth="2" />
                <circle cx="42" cy="46" r="3.8" fill="#80d8ff" stroke="#1c1308" strokeWidth="2" />
                <line
                  x1="80"
                  y1="28"
                  x2="80"
                  y2="40"
                  stroke="#ffd438"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="74"
                  y1="32"
                  x2="86"
                  y2="32"
                  stroke="#ffd438"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Komická točící se aureola z hvězdiček nad hlavou zasaženého lovce či omráčeného bubáka
 * („Vidí všechny svaté“, „Zatočila se mu hlava“)
 */
export const LadaDizzyHalo: React.FC<{ active: boolean; className?: string }> = ({
  active,
  className = "",
}) => {
  if (!active) return null;

  return (
    <div
      className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-35 flex items-center justify-center w-24 h-12 select-none anim-dizzy-halo-container ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 90 45"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Elipsa oběhu hvězdiček (jemná přerušovaná tušová linka) */}
        <ellipse
          cx="45"
          cy="24"
          rx="34"
          ry="11"
          fill="none"
          stroke="#1c1308"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.5"
        />

        {/* Hvězdička A: Obíhá po elipse */}
        <g className="anim-dizzy-star-a">
          <path
            d="M 20 18 Q 20 23 25 23 Q 20 23 20 28 Q 20 23 15 23 Q 20 23 20 18 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="19.5" cy="22.5" r="1.2" fill="#ffffff" />
        </g>

        {/* Hvězdička B: Druhá obíhající s posunem */}
        <g className="anim-dizzy-star-b">
          <path
            d="M 68 16 Q 68 21 73 21 Q 68 21 68 26 Q 68 21 63 21 Q 68 21 68 16 Z"
            fill="#ffe066"
            stroke="#1c1308"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="67.5" cy="20.5" r="1.2" fill="#ffffff" />
        </g>

        {/* Hvězdička C: Třetí obíhající uprostřed vpředu */}
        <g className="anim-dizzy-star-c">
          <path
            d="M 45 28 Q 45 32 49 32 Q 45 32 45 36 Q 45 32 41 32 Q 45 32 45 28 Z"
            fill="#f79c24"
            stroke="#1c1308"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
