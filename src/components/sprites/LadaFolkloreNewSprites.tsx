import React from "react";
import { renderLadaPermonikSprite } from "./LadaPermonikSprites";

/**
 * Autentické Ladovské sprity pro novou družinu pohádkových bytostí:
 * - Level 1:
 *   1. Ropucha (zavalitá, bradavičnatá, lekníny, bublinky, žabí kukadla)
 *   2. Ohnivý kohout (pyšný hrdořez, plamenný hřebínek a ocas, peří v ohni, jiskry)
 *   3. Černý pes / Barghest (strašlivý černý hřbitovní pes s ohnivýma planoucíma očima, ostnatý obojek, přetržený řetěz)
 * - Level 2:
 *   4. Divoženka (rozpustilá lesní žínka, vlasy s jeřabinami, tančící krok, mechové šaty)
 *   5. Jeskyňka (překrásná modravá skalní elfka / víla, špičaté uši, stříbrné vlasy, rampouchy, zlomyslný úsměv)
 *   6. Létající rarach (poletující čertík s netopýřími křídly, rohy, kouř ze sazí, jiskry)
 *   7. Lesní muž (mohutný mechový divoch z kůry a lišejníku, plnovous z jehličí, vyvrácený kmen)
 * - Level 3:
 *   8. Rusalka (půvabná vodní víla, smaragdové vlasy s lekníny, průsvitné vodní roucho, rákosí)
 *   9. Permoník (starobylý důlní skřítek, havířská kápě se zkříženými kladívky, svítící kahanec, dýmka, želízko)
 */

export function renderLadaFolkloreNewSprite(type: string, stage: number = 2): React.ReactNode {
  switch (type) {
    case "ropucha":
      return renderRopucha(stage);
    case "ohnivy_kohout":
      return renderOhnivyKohout(stage);
    case "cerny_pes":
      return renderCernyPes(stage);
    case "divozenka":
      return renderDivozenka(stage);
    case "jeskynka":
      return renderJeskynka(stage);
    case "letajici_rarach":
      return renderLetajiciRarach(stage);
    case "lesni_muz":
      return renderLesniMuz(stage);
    case "rusalka":
      return renderRusalka(stage);
    case "permonik":
      return renderPermonik(stage);
    default:
      return null;
  }
}

/* =========================================================================
 * 1. ROPUCHA (Level 1) - Zavalitá, bradavičnatá, leknínové listy, bubliny
 * ========================================================================= */
function renderRopucha(stage: number): React.ReactNode {
  const bodyColor = stage === 0 ? "#6e8f48" : stage === 3 ? "#2d4d25" : "#4f7336";
  const bellyColor = stage === 3 ? "#d8e69e" : "#e4eda8";
  const wartColor = stage === 3 ? "#b08a28" : "#335222";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Ropucha">
      {/* Vlhký stín pod kamenem */}
      <ellipse cx="60" cy="110" rx="38" ry="7" fill="#1c1308" opacity="0.3" />

      {/* Mechový kámen či leknínový list */}
      <path
        d="M20 108 C20 98 40 95 60 95 C80 95 100 98 100 108 Z"
        fill="#5a684b"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="60" cy="103" rx="36" ry="6" fill="#75885f" />

      {/* Zadní pokrčené žabí nohy */}
      <path
        d="M24 102 C15 90 16 76 26 74 C34 72 38 84 36 100"
        fill={bodyColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M96 102 C105 90 104 76 94 74 C86 72 82 84 84 100"
        fill={bodyColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Ploutvičky s prsty */}
      <path d="M14 104 Q22 104 28 102" stroke="#1c1308" strokeWidth="3" strokeLinecap="round" />
      <path d="M106 104 Q98 104 92 102" stroke="#1c1308" strokeWidth="3" strokeLinecap="round" />

      {/* Zavalité tělo ropuchy */}
      <ellipse
        cx="60"
        cy="78"
        rx="36"
        ry="28"
        fill={bodyColor}
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* Světlé pupkaté bříško */}
      <ellipse cx="60" cy="85" rx="24" ry="17" fill={bellyColor} />

      {/* Bradavice a skvrny */}
      <circle cx="38" cy="74" r="3.5" fill={wartColor} />
      <circle cx="82" cy="74" r="3.5" fill={wartColor} />
      <circle cx="48" cy="65" r="2.5" fill={wartColor} />
      <circle cx="72" cy="65" r="2.5" fill={wartColor} />
      <circle cx="34" cy="86" r="3" fill={wartColor} />
      <circle cx="86" cy="86" r="3" fill={wartColor} />

      {/* Široká žabí tlama */}
      <path
        d="M36 68 Q60 80 84 68"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Dvě nozdry */}
      <circle cx="56" cy="58" r="1.5" fill="#1c1308" />
      <circle cx="64" cy="58" r="1.5" fill="#1c1308" />

      {/* Přední tlapky položené na kameni */}
      <path
        d="M44 86 Q40 98 36 102 M40 102 L44 102"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M76 86 Q80 98 84 102 M80 102 L76 102"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Vykoulená žabí očka */}
      <g>
        <circle cx="44" cy="46" r="13" fill={bodyColor} stroke="#1c1308" strokeWidth="3.5" />
        <circle cx="76" cy="46" r="13" fill={bodyColor} stroke="#1c1308" strokeWidth="3.5" />
        <circle cx="44" cy="46" r="9" fill="#facc15" stroke="#1c1308" strokeWidth="2" />
        <circle cx="76" cy="46" r="9" fill="#facc15" stroke="#1c1308" strokeWidth="2" />

        {/* Vodorovné obojživelné zorničky */}
        <g className="anim-lada-blink">
          <ellipse cx="44" cy="46" rx="6" ry="2.5" fill="#1c1308" />
          <circle cx="46" cy="44" r="1.5" fill="#ffffff" />
          <ellipse cx="76" cy="46" rx="6" ry="2.5" fill="#1c1308" />
          <circle cx="78" cy="44" r="1.5" fill="#ffffff" />
        </g>
      </g>

      {/* Tier doplňky */}
      {stage === 0 && (
        <g>
          {/* Malý zelený pulčí ocásek co ještě neodpadl */}
          <path
            d="M58 104 Q50 112 44 108"
            fill="none"
            stroke="#4f7336"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}

      {stage === 2 && (
        <g>
          {/* Žlutý blatouchový kvítek za uchem */}
          <circle cx="86" cy="38" r="5" fill="#ffd438" stroke="#1c1308" strokeWidth="2" />
          <circle cx="86" cy="38" r="2" fill="#e65100" />
        </g>
      )}

      {stage === 3 && (
        <g>
          {/* Zlatá leknínová korunka */}
          <path
            d="M50 34 L54 22 L60 28 L66 22 L70 34 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="24" r="2" fill="#e63e1e" />
          {/* Lesklé kapky vody */}
          <circle cx="28" cy="62" r="3" fill="#67e8f9" opacity="0.8" />
          <circle cx="92" cy="64" r="2.5" fill="#67e8f9" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 2. OHNIVÝ KOHOUT (Level 1) - Pyšný hřebínek, plamenná pera, jiskry
 * ========================================================================= */
function renderOhnivyKohout(stage: number): React.ReactNode {
  const bodyColor = stage === 0 ? "#f59e0b" : stage === 3 ? "#b91c1c" : "#dc2626";
  const flameTail = stage === 3 ? "#ea580c" : "#f97316";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Ohnivý kohout">
      {/* Ožehlá zem / stín */}
      <ellipse cx="60" cy="112" rx="32" ry="6" fill="#1c1308" opacity="0.35" />

      {/* Dřevěný plaňkový plotek / hřeben střechy */}
      <line
        x1="25"
        y1="110"
        x2="95"
        y2="110"
        stroke="#78350f"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Plamenný ocas kohouta – mocná vlnící se pera */}
      <g className="anim-straw-twitch">
        <path
          d="M45 68 C25 60 10 40 12 18 C22 36 34 48 50 60 Z"
          fill={flameTail}
          stroke="#1c1308"
          strokeWidth="3"
        />
        <path
          d="M40 72 C18 68 6 52 4 30 C16 48 30 58 46 66 Z"
          fill="#ffd438"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <path
          d="M42 78 C24 82 12 70 8 50 C20 66 32 72 44 76 Z"
          fill="#ef4444"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
      </g>

      {/* Plné hrdé tělo kohouta */}
      <path
        d="M45 65 C45 50 60 48 72 50 C86 52 92 68 88 84 C84 96 66 100 52 94 C44 88 45 76 45 65 Z"
        fill={bodyColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Puffed hrudníček plný zlatých per */}
      <path
        d="M68 55 C78 60 84 70 82 82 C76 86 68 86 64 78 C62 68 64 58 68 55 Z"
        fill="#fbbf24"
        stroke="#1c1308"
        strokeWidth="2"
      />

      {/* Krk a hlava vzpřímená vzhůru */}
      <path
        d="M68 56 L72 35 C74 30 82 28 86 33 C90 38 88 48 84 56 Z"
        fill={bodyColor}
        stroke="#1c1308"
        strokeWidth="3.5"
      />

      {/* Plamenný hřebínek – plápolající ohýnky */}
      <path
        d="M74 30 Q72 15 78 12 Q82 20 84 15 Q88 10 92 14 Q92 24 86 32 Z"
        fill="#ef4444"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Podbradek / laloky */}
      <path
        d="M92 42 C96 46 96 52 90 54 C88 52 88 44 92 42 Z"
        fill="#ef4444"
        stroke="#1c1308"
        strokeWidth="2.5"
      />

      {/* Žlutý ostrý zobák */}
      <polygon
        points="88,36 104,41 88,46"
        fill="#ffd438"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Jiskřivé zvědavé očko */}
      <circle cx="82" cy="36" r="4.5" fill="#facc15" stroke="#1c1308" strokeWidth="2" />
      <g className="anim-lada-blink">
        <circle cx="83" cy="36" r="2.5" fill="#1c1308" />
        <circle cx="84" cy="35" r="1" fill="#ffffff" />
      </g>

      {/* Kohoutí nohy s ostruhami na dřevě */}
      <g stroke="#1c1308" strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="96" x2="56" y2="109" />
        <line x1="56" y1="109" x2="48" y2="110" />
        <line x1="56" y1="109" x2="62" y2="110" />
        {/* Ostruha */}
        <line x1="58" y1="104" x2="64" y2="102" stroke="#ffd438" />

        <line x1="72" y1="94" x2="74" y2="109" />
        <line x1="74" y1="109" x2="68" y2="110" />
        <line x1="74" y1="109" x2="80" y2="110" />
      </g>

      {/* Jiskry stoupající do povětří */}
      <circle cx="34" cy="26" r="2" fill="#ffd438" />
      <circle cx="48" cy="18" r="2.5" fill="#f97316" />
      <circle cx="100" cy="22" r="2" fill="#ffd438" />
      <circle cx="106" cy="34" r="1.5" fill="#ef4444" />

      {stage === 3 && (
        <g>
          {/* Zlaté pekelné ostruhy */}
          <polygon
            points="56,104 68,100 58,106"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <polygon
            points="74,104 86,100 76,106"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          {/* Kouřové kroužky ze zobáku */}
          <circle
            cx="106"
            cy="38"
            r="3"
            fill="#ffffff"
            opacity="0.6"
            stroke="#1c1308"
            strokeWidth="1"
          />
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 3. ČERNÝ PES / BARGHEST (Level 1) - Huňatý, černé rouno, rudě žhnoucí oči, řetěz
 * ========================================================================= */
function renderCernyPes(stage: number): React.ReactNode {
  const eyeGlow = stage === 3 ? "#ff2200" : "#ff9900";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Černý pes barghest"
    >
      {/* Olověná mlha / stín pod tlapami */}
      <ellipse cx="60" cy="112" rx="42" ry="7" fill="#1c1308" opacity="0.45" />

      {/* Ocas s naježenou černou srstí */}
      <path
        d="M26 78 C12 70 8 50 16 38 C18 48 24 60 34 70"
        fill="#181310"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Mohutné shaggy tělo velkého černého psa */}
      <path
        d="M32 75 C30 58 45 52 64 54 C82 56 94 68 92 86 C90 98 70 102 46 98 C36 94 32 86 32 75 Z"
        fill="#1f1813"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Chuchvalce naježené srsti pod krkem a na zádech */}
      <path d="M42 54 L46 46 L52 53" fill="#1f1813" stroke="#1c1308" strokeWidth="3" />
      <path d="M58 54 L62 45 L68 53" fill="#1f1813" stroke="#1c1308" strokeWidth="3" />
      <path d="M30 68 L22 72 L32 78" fill="#1f1813" stroke="#1c1308" strokeWidth="3" />

      {/* Zadní a přední svalnaté tlapy */}
      <path
        d="M38 88 L34 108 L44 110 L46 96"
        fill="#181310"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M52 92 L50 108 L58 110 L60 94"
        fill="#181310"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M74 90 L76 109 L86 110 L84 92"
        fill="#1f1813"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Psí hlava – široká čenichová partie, zlověstný profil */}
      <path
        d="M68 58 C68 44 76 36 90 38 C98 40 104 48 106 56 C108 64 98 72 84 72 C74 72 68 66 68 58 Z"
        fill="#1f1813"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Špičatá naježená ouška */}
      <polygon
        points="72,42 66,24 80,35"
        fill="#181310"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon
        points="84,36 88,22 95,35"
        fill="#181310"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Tlama s vyceněnými bílými zuby */}
      <path d="M88 64 Q98 62 108 58" stroke="#1c1308" strokeWidth="3" fill="none" />
      <polygon points="94,63 97,69 100,63" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
      <polygon points="102,61 105,67 107,60" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />

      {/* Černý lesklý čenich */}
      <ellipse cx="106" cy="54" rx="4" ry="3" fill="#0d0a08" stroke="#1c1308" strokeWidth="1.5" />

      {/* ŽHNOUCÍ OČI BARGHESTA – legendární strašidelný svit */}
      <ellipse cx="88" cy="46" rx="6" ry="5" fill="#1c1308" stroke="#1c1308" strokeWidth="2" />
      <ellipse cx="88" cy="46" rx="5" ry="4" fill={eyeGlow} />
      <g className="anim-lada-blink">
        <circle cx="89" cy="46" r="2" fill="#fffb00" />
        <circle cx="90" cy="45" r="0.8" fill="#ffffff" />
      </g>

      {/* Obojek – kovaný s hřeby nebo přetržený řetěz */}
      <path
        d="M68 64 Q76 72 84 66"
        stroke="#8d99ae"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <polygon points="72,67 71,73 75,69" fill="#edf2f4" stroke="#1c1308" strokeWidth="1" />
      <polygon points="78,69 78,76 82,70" fill="#edf2f4" stroke="#1c1308" strokeWidth="1" />

      {/* Přetržený řetěz visící k zemi */}
      <g stroke="#8d99ae" strokeWidth="2.5" fill="none">
        <ellipse cx="78" cy="78" rx="2.5" ry="4" transform="rotate(15 78 78)" />
        <ellipse cx="81" cy="85" rx="2.5" ry="4" transform="rotate(-15 81 85)" />
      </g>

      {stage === 3 && (
        <g>
          {/* Pekelná rudá aura kolem očí a hřbetu */}
          <circle
            cx="88"
            cy="46"
            r="9"
            fill="none"
            stroke="#ff2200"
            strokeWidth="1.5"
            strokeDasharray="2,2"
            opacity="0.8"
          />
          <path
            d="M46 44 Q50 34 56 46 M62 44 Q66 32 72 46"
            stroke="#ff4400"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 4. DIVOŽENKA (Level 2) - Lesní žínka, vlasy s jeřabinami, tančící krok
 * ========================================================================= */
function renderDivozenka(stage: number): React.ReactNode {
  const dressColor = stage === 0 ? "#86a873" : stage === 3 ? "#2d5a27" : "#588157";
  const hairColor = stage === 3 ? "#5c2c16" : "#8c4824";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Divoženka">
      {/* Stín tančících nožek v mechu */}
      <ellipse cx="60" cy="112" rx="30" ry="5" fill="#1c1308" opacity="0.3" />

      {/* Bohaté rozpuštěné vlasy divoženky – vlající kadeře */}
      <path
        d="M60 22 C34 22 28 45 26 70 C24 88 34 94 40 82 C44 70 45 50 50 40 Z"
        fill={hairColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M60 22 C86 22 92 45 94 70 C96 88 86 94 80 82 C76 70 75 50 70 40 Z"
        fill={hairColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Bosé tančící nožky */}
      <path
        d="M52 96 L48 110 L42 110"
        stroke="#1c1308"
        strokeWidth="3"
        fill="#ffd8be"
        strokeLinecap="round"
      />
      <path
        d="M68 96 L74 108 L80 106"
        stroke="#1c1308"
        strokeWidth="3"
        fill="#ffd8be"
        strokeLinecap="round"
      />

      {/* Jednoduché plátěné lesní šaty z lnu a mechu */}
      <path
        d="M48 52 L42 96 C50 100 70 100 78 96 L72 52 Z"
        fill={dressColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Pásek z lýka s mašlí */}
      <line x1="45" y1="68" x2="75" y2="68" stroke="#d4a373" strokeWidth="3" />
      <circle cx="60" cy="68" r="3" fill="#c4321d" />

      {/* Hlava divoženky s tvářičkami */}
      <circle cx="60" cy="38" r="16" fill="#ffe3cf" stroke="#1c1308" strokeWidth="3.5" />

      {/* Rozpustilá ofina */}
      <path
        d="M46 32 Q60 25 74 32 Q60 36 46 32 Z"
        fill={hairColor}
        stroke="#1c1308"
        strokeWidth="2.5"
      />

      {/* Věneček z lesního kvítí a jeřabin ve vlasech */}
      <g>
        <circle cx="48" cy="24" r="3.5" fill="#c4321d" stroke="#1c1308" strokeWidth="1.5" />
        <circle cx="56" cy="22" r="3.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />
        <circle cx="64" cy="22" r="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
        <circle cx="72" cy="24" r="3.5" fill="#c4321d" stroke="#1c1308" strokeWidth="1.5" />
      </g>

      {/* Zvědavá očka a růžové tváře */}
      <circle cx="52" cy="37" r="2.5" fill="#3a5a40" />
      <circle cx="68" cy="37" r="2.5" fill="#3a5a40" />
      <circle cx="48" cy="43" r="3" fill="#f43f5e" opacity="0.45" />
      <circle cx="72" cy="43" r="3" fill="#f43f5e" opacity="0.45" />

      {/* Šibalský úsměv */}
      <path
        d="M55 45 Q60 49 65 45"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Ruce v tančícím gestu */}
      <path
        d="M48 56 Q36 62 30 52"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M72 56 Q84 62 90 52"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Větvička v ruce */}
      <line
        x1="28"
        y1="54"
        x2="22"
        y2="44"
        stroke="#78350f"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="21" cy="43" r="2" fill="#588157" />

      {stage === 3 && (
        <g>
          {/* Parůžky z březových větviček ve vlasech */}
          <path
            d="M46 22 L40 10 M40 10 L34 12 M40 10 L42 4"
            stroke="#78350f"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M74 22 L80 10 M80 10 L86 12 M80 10 L78 4"
            stroke="#78350f"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 5. JESKYŇKA (Level 2) - Krásná modravá skalní elfka, špičaté uši, rampouchy
 * ========================================================================= */
function renderJeskynka(stage: number): React.ReactNode {
  const skinTone = stage === 0 ? "#a5c4d4" : stage === 3 ? "#5089a8" : "#7baec7";
  const dressTone = stage === 3 ? "#1e293b" : "#334155";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Jeskyňka">
      {/* Chladný stín na skalním podloží */}
      <ellipse cx="60" cy="112" rx="32" ry="5" fill="#0f172a" opacity="0.4" />

      {/* Dlouhé splývavé stříbřitě bílé vlasy jako krystalický led */}
      <path
        d="M60 20 C40 20 32 45 28 76 C26 96 36 102 44 88 C48 74 48 50 52 38 Z"
        fill="#e2e8f0"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M60 20 C80 20 88 45 92 76 C94 96 84 102 76 88 C72 74 72 50 68 38 Z"
        fill="#e2e8f0"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Štíhlé tělo ve skalním tmavém rouchu */}
      <path
        d="M50 50 L42 100 C52 104 68 104 78 100 L70 50 Z"
        fill={dressTone}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Stříbrný náhrdelník se stalaktitovým krystalem */}
      <polygon points="60,56 56,66 60,74 64,66" fill="#38bdf8" stroke="#1c1308" strokeWidth="1.5" />

      {/* Hlava s modrou pletí a aristokratickým tvarem */}
      <ellipse cx="60" cy="38" rx="14" ry="17" fill={skinTone} stroke="#1c1308" strokeWidth="3.5" />

      {/* Dlouhé špičaté elfí uši */}
      <path
        d="M47 38 L30 30 L45 44 Z"
        fill={skinTone}
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M73 38 L90 30 L75 44 Z"
        fill={skinTone}
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Stříbrná ofinka kryjící čelo */}
      <path
        d="M48 28 Q60 36 72 28 Q60 22 48 28 Z"
        fill="#cbd5e1"
        stroke="#1c1308"
        strokeWidth="2.5"
      />

      {/* Pronikavé chladné tyrkysové oči a tenké temné obočí */}
      <ellipse cx="53" cy="36" rx="4" ry="3" fill="#0284c7" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="54" cy="35" r="1" fill="#ffffff" />
      <ellipse cx="67" cy="36" rx="4" ry="3" fill="#0284c7" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="68" cy="35" r="1" fill="#ffffff" />

      {/* Záludný, zlomyslně přitažlivý úsměv */}
      <path
        d="M54 46 Q62 51 68 45"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Ruce natažené dopředu: "dva prstíčky strčíme..." */}
      <path
        d="M48 56 Q36 64 34 76"
        stroke="#1c1308"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72 56 Q84 64 86 76"
        stroke="#1c1308"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ostré krystalové nehty / dýka z obsidiánu */}
      <polygon points="86,76 96,80 88,83" fill="#0284c7" stroke="#1c1308" strokeWidth="1.5" />

      {stage === 3 && (
        <g>
          {/* Koruna z horských krystalů */}
          <polygon points="52,24 54,12 58,22" fill="#7dd3fc" stroke="#1c1308" strokeWidth="1.5" />
          <polygon points="58,22 60,8 62,22" fill="#38bdf8" stroke="#1c1308" strokeWidth="1.5" />
          <polygon points="62,22 66,12 68,24" fill="#7dd3fc" stroke="#1c1308" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 6. LÉTAJÍCÍ RARACH (Level 2) - Poletující šotek, netopýří křídla, vidle, saze
 * ========================================================================= */
function renderLetajiciRarach(stage: number): React.ReactNode {
  const impColor = stage === 0 ? "#42281d" : stage === 3 ? "#881337" : "#2b1b17";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md anim-lada-float"
      aria-label="Létající rarach"
    >
      {/* Rotující stín na zemi pod letícím rarachem */}
      <ellipse cx="60" cy="112" rx="24" ry="4" fill="#1c1308" opacity="0.25" />

      {/* Široká roztažená netopýří křídla mávající ve vzduchu */}
      <g className="anim-straw-twitch">
        <path
          d="M50 50 C36 30 18 28 8 36 C14 46 22 52 24 64 C32 60 40 58 50 56 Z"
          fill="#1c1308"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M70 50 C84 30 102 28 112 36 C106 46 98 52 96 64 C88 60 80 58 70 56 Z"
          fill="#1c1308"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Dlouhý švihající pekelný ocásek s trojúhelníkovým hrotem */}
      <path
        d="M60 82 Q46 94 48 106 Q58 108 52 114"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <polygon points="52,114 44,118 48,110" fill="#dc2626" stroke="#1c1308" strokeWidth="2" />

      {/* Kulaté buclaté tělíčko čertíka */}
      <circle cx="60" cy="62" r="22" fill={impColor} stroke="#1c1308" strokeWidth="3.5" />

      {/* Hlava s rozcuchanou kšticí a pekelnými růžky */}
      <circle cx="60" cy="42" r="18" fill={impColor} stroke="#1c1308" strokeWidth="3.5" />

      {/* Svislé špičaté pekelné růžky */}
      <path
        d="M49 31 C46 19 41 9 43 4 C48 9 52 19 54 28 Z"
        fill="#facc15"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M71 31 C74 19 79 9 77 4 C72 9 68 19 66 28 Z"
        fill="#facc15"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line
        x1="47"
        y1="20"
        x2="51"
        y2="21"
        stroke="#ca8a04"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="73"
        y1="20"
        x2="69"
        y2="21"
        stroke="#ca8a04"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Rozcuchané zrzavé či černé peří/vlasy */}
      <path d="M54 26 L60 18 L66 26" fill="#e11d48" stroke="#1c1308" strokeWidth="2" />

      {/* Vykulená zvědavá žlutá kukadla */}
      <circle cx="53" cy="42" r="6.5" fill="#facc15" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="67" cy="42" r="6.5" fill="#facc15" stroke="#1c1308" strokeWidth="2.5" />
      <g className="anim-lada-blink">
        <circle cx="54" cy="42" r="3" fill="#1c1308" />
        <circle cx="55" cy="41" r="1" fill="#ffffff" />
        <circle cx="66" cy="42" r="3" fill="#1c1308" />
        <circle cx="67" cy="41" r="1" fill="#ffffff" />
      </g>

      {/* Zubatý škleb od ucha k uchu */}
      <path
        d="M50 52 Q60 60 70 52"
        fill="#e11d48"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <polygon points="56,53 58,56 60,53" fill="#ffffff" />
      <polygon points="62,53 64,56 66,53" fill="#ffffff" />

      {/* Kopýtka pokrčená v letu */}
      <ellipse cx="52" cy="84" rx="4" ry="6" fill="#1c1308" />
      <ellipse cx="68" cy="84" rx="4" ry="6" fill="#1c1308" />

      {/* Malé mosazné vidličky v pařátku */}
      <line
        x1="72"
        y1="62"
        x2="88"
        y2="48"
        stroke="#78350f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M88 48 L94 42 M88 48 L96 46 M88 48 L92 52"
        stroke="#facc15"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Oblačka dýmu a sazí ze komína */}
      <circle cx="34" cy="74" r="4" fill="#64748b" opacity="0.6" stroke="#1c1308" strokeWidth="1" />
      <circle cx="28" cy="82" r="5" fill="#64748b" opacity="0.4" />
    </svg>
  );
}

/* =========================================================================
 * 7. LESNÍ MUŽ (Level 2) - Mechový divoch, kůra, plnovous z jehličí, kláda
 * ========================================================================= */
function renderLesniMuz(stage: number): React.ReactNode {
  const mossColor = stage === 0 ? "#65a30d" : stage === 3 ? "#14532d" : "#3f6212";
  const barkColor = stage === 3 ? "#451a03" : "#713f12";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Lesní muž">
      {/* Masivní stín v mechu */}
      <ellipse cx="60" cy="112" rx="42" ry="7" fill="#1c1308" opacity="0.4" />

      {/* Obrovité nohy s kůrou a mechem jako staré pařezy */}
      <path
        d="M40 88 L34 110 L48 111 L52 88"
        fill={barkColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M68 88 L72 110 L86 111 L80 88"
        fill={barkColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Mohutné trupové tělo obrostlé mechem a lišejníkem */}
      <path
        d="M32 45 C28 65 30 90 42 94 C54 98 66 98 78 94 C90 90 92 65 88 45 C80 38 40 38 32 45 Z"
        fill={mossColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Skvrny lišejníku na břiše */}
      <circle cx="48" cy="76" r="5" fill="#a3e635" opacity="0.7" />
      <circle cx="70" cy="80" r="6" fill="#a3e635" opacity="0.7" />
      <circle cx="58" cy="88" r="4" fill="#a3e635" opacity="0.7" />

      {/* Hlava s bujným plnovousem z jehličí a březového mechu */}
      <circle cx="60" cy="40" r="20" fill={barkColor} stroke="#1c1308" strokeWidth="3.5" />

      {/* Plnovous z borového jehličí sahající na hruď */}
      <path
        d="M44 46 C40 68 50 82 60 84 C70 82 80 68 76 46 Z"
        fill={mossColor}
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Větvičky a šiška zapletená ve vousech */}
      <polygon points="58,74 62,80 54,80" fill="#78350f" stroke="#1c1308" strokeWidth="1.5" />

      {/* Veliký bramborový nos jako z Lada pohádek */}
      <ellipse cx="60" cy="44" rx="7" ry="5.5" fill="#d97706" stroke="#1c1308" strokeWidth="2.5" />

      {/* Laskavé i divoké lesní oči pod huňatým obočím z mechu */}
      <path d="M48 34 L56 36" stroke="#1c1308" strokeWidth="4" strokeLinecap="round" />
      <path d="M72 34 L64 36" stroke="#1c1308" strokeWidth="4" strokeLinecap="round" />
      <circle cx="52" cy="38" r="3" fill="#1c1308" />
      <circle cx="68" cy="38" r="3" fill="#1c1308" />
      <circle cx="53" cy="37" r="1" fill="#ffffff" />
      <circle cx="69" cy="37" r="1" fill="#ffffff" />

      {/* Uši z chorošů na bocích hlavy */}
      <path d="M40 38 C34 36 34 46 40 44" fill="#a16207" stroke="#1c1308" strokeWidth="2.5" />
      <path d="M80 38 C86 36 86 46 80 44" fill="#a16207" stroke="#1c1308" strokeWidth="2.5" />

      {/* Masivní sukovitý kmen v ruce */}
      <g>
        <line
          x1="86"
          y1="30"
          x2="94"
          y2="108"
          stroke="#78350f"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <line
          x1="86"
          y1="30"
          x2="94"
          y2="108"
          stroke="#a16207"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Zelené lístečky rašící z kyje */}
        <circle cx="88" cy="45" r="3" fill="#65a30d" />
        <circle cx="92" cy="65" r="3" fill="#65a30d" />
      </g>

      {/* Ruka držící kmen */}
      <circle cx="86" cy="55" r="6" fill={barkColor} stroke="#1c1308" strokeWidth="3" />

      {stage === 3 && (
        <g>
          {/* Koruna z živého dubového větvoví a žaludů */}
          <path
            d="M46 22 Q40 8 46 4 Q54 12 56 6 Q64 12 66 4 Q72 8 74 22"
            stroke="#78350f"
            strokeWidth="3"
            fill="#3f6212"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="14" r="2" fill="#f59e0b" />
          <circle cx="70" cy="14" r="2" fill="#f59e0b" />
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 8. RUSALKA (Level 3) - Vodní víla, smaragdové vlasy, vodní závoj, lekníny
 * ========================================================================= */
function renderRusalka(stage: number): React.ReactNode {
  const hairTone = stage === 0 ? "#34d399" : stage === 3 ? "#065f46" : "#059669";
  const gownTone = stage === 3 ? "#0284c7" : "#38bdf8";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md anim-lada-float"
      aria-label="Rusalka"
    >
      {/* Vodní kruhy na hladině */}
      <ellipse
        cx="60"
        cy="108"
        rx="36"
        ry="6"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2.5"
        opacity="0.6"
      />
      <ellipse
        cx="60"
        cy="112"
        rx="22"
        ry="4"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        opacity="0.4"
      />

      {/* Dlouhé vlnité smaragdové vlasy sahající až do vody */}
      <path
        d="M60 22 C35 22 24 50 20 80 C18 100 28 108 36 94 C42 78 44 54 50 38 Z"
        fill={hairTone}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M60 22 C85 22 96 50 100 80 C102 100 92 108 84 94 C78 78 76 54 70 38 Z"
        fill={hairTone}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Průsvitné vodní roucho z lehkého závoje */}
      <path
        d="M50 52 L42 104 C54 108 66 108 78 104 L70 52 Z"
        fill={gownTone}
        fillOpacity="0.8"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Hlava rusalky s alabastrovou bělostnou tváří */}
      <circle cx="60" cy="38" r="15" fill="#fdf4ff" stroke="#1c1308" strokeWidth="3.5" />

      {/* Leknínový věneček ve vlasech */}
      <circle cx="60" cy="22" r="5" fill="#ffffff" stroke="#1c1308" strokeWidth="2" />
      <circle cx="60" cy="22" r="2" fill="#facc15" />
      <circle cx="50" cy="25" r="4" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="70" cy="25" r="4" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />

      {/* Svůdné hluboké smaragdové oči */}
      <ellipse cx="53" cy="37" rx="3.5" ry="4" fill="#059669" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="54" cy="36" r="1.2" fill="#ffffff" />
      <ellipse cx="67" cy="37" rx="3.5" ry="4" fill="#059669" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="68" cy="36" r="1.2" fill="#ffffff" />

      {/* Jemný lákavý úsměv vodní víly */}
      <path
        d="M56 46 Q60 49 64 46"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Ruce zvoucí pocestného do hlubiny */}
      <path
        d="M48 56 Q34 62 26 56"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M72 56 Q86 62 94 56"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Kapky vody kapající z prstů */}
      <circle cx="25" cy="62" r="2" fill="#38bdf8" />
      <circle cx="95" cy="62" r="2" fill="#38bdf8" />

      {stage === 3 && (
        <g>
          {/* Zlatá leknínová čelenka královen tůní */}
          <path
            d="M52 24 L56 12 L60 18 L64 12 L68 24 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="2"
          />
          {/* Zářící vodní kapky kolem celé postavy */}
          <circle cx="36" cy="34" r="2.5" fill="#67e8f9" opacity="0.9" />
          <circle cx="84" cy="34" r="2.5" fill="#67e8f9" opacity="0.9" />
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 9. PERMONÍK (Level 3) - Havířský skřítek, dlouhá špičatá pastelová čapka, krumpáč
 * ========================================================================= */
function renderPermonik(stage: number): React.ReactNode {
  return renderLadaPermonikSprite(stage);
}
