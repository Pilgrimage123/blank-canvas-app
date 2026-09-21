import React from "react";

/**
 * Autentické Ladovské sprity pro vodní bytosti (Josef Lada: Bubáci a hastrmani, Vodník Brčál).
 *
 * Dvě hlavní větve s výrazným paletovým swapem a detaily:
 * 1. Hastrman (Hastrman Brčál / potoční hastrmánek):
 *    - Svěží luční zeleň fraku (#2e7834), zlaté knoflíky, červené klopy a mašle
 *    - Sytě červené kalhoty (#d93d25) a červené střevíce s otočeným nosem
 *    - Klobouk s čerstvými blatouchy a orobincem
 *    - Světle zelená kůže, růžové tváře, kulaté brýličky, hliněná fajfka s bílým kouřem
 *    - Kapky vody stékající ze šosů a stoupající bublinky
 *
 * 2. Vodník (Vodník z černé tůně / Pán hlubin - Palette Swap):
 *    - Temný hlubinný smaragdovo-modrý až noční šedomodrý kabát (#12434d / #16535e)
 *    - Cuffs s duhovými rybími šupinami (#228594), temně fialová/černá sametová vesta (#2d1833)
 *    - Půlnoční modročerné kalhoty (#1c2838)
 *    - Tmavší tajemná vodní kůže (#3d7a6e)
 *    - Klobouk s leknínem a safírovým středem
 *    - Hluboké tyrkysové a safírové kruhy na hladině, modravý dým z dýmky
 */

export function renderLadaWaterSprite(type: string, stage: number = 2): React.ReactNode {
  const isVodnik = type === "vodnik";

  if (isVodnik) {
    return renderVodnikDeep(stage);
  }
  return renderHastrmanMeadow(stage);
}

/**
 * HASTRMAN: Potoční a rybniční hastrmánek ve veselém Ladovském pojetí
 */
function renderHastrmanMeadow(stage: number): React.ReactNode {
  // Barevné nuance dle stádia
  const coatColor = stage === 0 ? "#3ba042" : stage === 3 ? "#236128" : "#2e7834";
  const hatTrim = stage === 3 ? "#e0aa28" : "#c4321d";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Hastrman ze stoky"
    >
      {/* Vodní kaluž a stříkající kapky pod nohama */}
      <ellipse
        cx="60"
        cy="112"
        rx="42"
        ry="7"
        fill="#388ea8"
        opacity="0.45"
        className="anim-water-ripple"
      />
      <ellipse cx="60" cy="112" rx="28" ry="4.5" fill="#58bad6" opacity="0.35" />

      {/* Stoupající vodní bublinky ze dna */}
      <circle
        cx="28"
        cy="106"
        r="2.8"
        fill="#e0f4fc"
        stroke="#1c1308"
        strokeWidth="1"
        className="anim-lada-bubble-1"
      />
      <circle
        cx="34"
        cy="98"
        r="2"
        fill="#e0f4fc"
        stroke="#1c1308"
        strokeWidth="0.8"
        className="anim-lada-bubble-2"
      />
      <circle
        cx="88"
        cy="108"
        r="3.2"
        fill="#e0f4fc"
        stroke="#1c1308"
        strokeWidth="1"
        className="anim-lada-bubble-3"
      />
      <circle
        cx="94"
        cy="100"
        r="1.8"
        fill="#e0f4fc"
        stroke="#1c1308"
        strokeWidth="0.8"
        className="anim-lada-bubble-4"
      />

      {/* Červené střevíce s prohnutými špičkami */}
      <path
        d="M42 104 L34 110 Q28 111 26 109 Q28 106 36 104 Z"
        fill="#b82a18"
        stroke="#1c1308"
        strokeWidth="2.5"
      />
      <path
        d="M78 104 L86 110 Q92 111 94 109 Q92 106 84 104 Z"
        fill="#b82a18"
        stroke="#1c1308"
        strokeWidth="2.5"
      />

      {/* Jasně červené hastrmanské nohavice */}
      <path
        d="M40 82 L38 105 L48 105 L54 88 L60 88 L66 105 L76 105 L74 82 Z"
        fill="#d93d25"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Záplata na koleni */}
      <rect
        x="40"
        y="90"
        width="7"
        height="6"
        rx="1.5"
        fill="#f4c23c"
        stroke="#1c1308"
        strokeWidth="1.5"
        transform="rotate(4 43 93)"
      />

      {/* Kape voda ze šosu */}
      <g className="anim-lada-drip-1">
        <path
          d="M30 94 Q29 99 30 101 Q31 99 30 94 Z"
          fill="#4ea9c4"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>
      <g className="anim-lada-drip-2">
        <path
          d="M84 94 Q85 99 84 101 Q83 99 84 94 Z"
          fill="#4ea9c4"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>

      {/* Svěží zelený frak (šosy) */}
      <path
        d="M34 52 C26 70 24 92 32 96 C38 92 48 86 52 82 L62 82 C66 86 76 92 82 96 C90 92 88 70 80 52 Z"
        fill={coatColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Žlutá vestička s lesklými mosaznými knoflíky */}
      <path
        d="M46 54 C46 76 50 82 57 82 L60 82 L67 82 C74 82 78 76 78 54 Z"
        fill="#f4c23c"
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <circle cx="57" cy="62" r="1.8" fill="#1c1308" />
      <circle cx="57" cy="70" r="1.8" fill="#1c1308" />
      <circle cx="57" cy="77" r="1.8" fill="#1c1308" />

      {/* Červená vázanka / mašle pod krkem */}
      <path
        d="M52 54 Q57 58 60 55 Q63 58 68 54 Q64 51 60 53 Q56 51 52 54 Z"
        fill="#d93d25"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <circle cx="60" cy="54" r="2.5" fill="#b82a18" />

      {/* Ruce v zelených rukávech s bílými manžetami */}
      <path
        d="M34 54 Q24 64 28 78 L34 76 Q32 64 38 56 Z"
        fill={coatColor}
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <rect
        x="25"
        y="74"
        width="7"
        height="4"
        rx="1"
        fill="#fcf8ea"
        stroke="#1c1308"
        strokeWidth="1.5"
        transform="rotate(-20 28 76)"
      />
      {/* Zelená dlaň s blánou */}
      <circle cx="27" cy="80" r="4.5" fill="#6ba85b" stroke="#1c1308" strokeWidth="2" />

      <path
        d="M80 54 Q90 64 86 78 L80 76 Q82 64 76 56 Z"
        fill={coatColor}
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <rect
        x="82"
        y="74"
        width="7"
        height="4"
        rx="1"
        fill="#fcf8ea"
        stroke="#1c1308"
        strokeWidth="1.5"
        transform="rotate(20 85 76)"
      />
      <circle cx="87" cy="80" r="4.5" fill="#6ba85b" stroke="#1c1308" strokeWidth="2" />

      {/* Kulatá zelená hastrmanská hlava */}
      <circle cx="60" cy="40" r="16.5" fill="#6ba85b" stroke="#1c1308" strokeWidth="3.5" />

      {/* Růžové buclaté tvářičky */}
      <circle cx="48" cy="44" r="4" fill="#e86b54" opacity="0.65" />
      <circle cx="72" cy="44" r="4" fill="#e86b54" opacity="0.65" />

      {/* Drátěné kulaté brejličky */}
      <circle cx="53" cy="38" r="5" fill="#ffffff" opacity="0.8" stroke="#1c1308" strokeWidth="2" />
      <circle cx="67" cy="38" r="5" fill="#ffffff" opacity="0.8" stroke="#1c1308" strokeWidth="2" />
      <line x1="58" y1="38" x2="62" y2="38" stroke="#1c1308" strokeWidth="2" />

      {/* Mrkající očka za brejličkami */}
      <g className="anim-lada-blink">
        <circle cx="53" cy="38" r="2.4" fill="#1c1308" />
        <circle cx="67" cy="38" r="2.4" fill="#1c1308" />
        <circle cx="54" cy="37" r="0.8" fill="#ffffff" />
        <circle cx="68" cy="37" r="0.8" fill="#ffffff" />
      </g>

      {/* Široký žabí úsměv s hliněnou fajfkou */}
      <path
        d="M50 47 Q60 53 70 47"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Dřevěná/hliněná dýmka v koutku */}
      <g className="anim-pipe-smoke">
        <circle
          cx="78"
          cy="36"
          r="2.5"
          fill="#ffffff"
          opacity="0.85"
          stroke="#1c1308"
          strokeWidth="0.8"
        />
        <circle
          cx="82"
          cy="28"
          r="4"
          fill="#ffffff"
          opacity="0.75"
          stroke="#1c1308"
          strokeWidth="1"
        />
        <circle
          cx="87"
          cy="20"
          r="5.5"
          fill="#ffffff"
          opacity="0.5"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>
      <line
        x1="68"
        y1="48"
        x2="77"
        y2="44"
        stroke="#8f5b2e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="76"
        y="40"
        width="5"
        height="7"
        rx="1.5"
        fill="#b83823"
        stroke="#1c1308"
        strokeWidth="1.8"
      />

      {/* Hastrmanský cylindr s mašlí a blatouchy */}
      <ellipse cx="60" cy="28" rx="24" ry="5.5" fill="#1e4422" stroke="#1c1308" strokeWidth="3" />
      <path d="M46 27 L48 10 L72 10 L74 27 Z" fill="#24542a" stroke="#1c1308" strokeWidth="3" />
      {/* Stuha na klobouku */}
      <rect x="47" y="22" width="26" height="5" fill={hatTrim} stroke="#1c1308" strokeWidth="1.8" />

      {/* Čerstvý blatouch (žlutý květ s lístkem) za stuhou */}
      <circle cx="71" cy="22" r="3.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="71" cy="22" r="1.5" fill="#f48222" />
      <ellipse
        cx="75"
        cy="24"
        rx="3.5"
        ry="2"
        fill="#58a34d"
        stroke="#1c1308"
        strokeWidth="1.2"
        transform="rotate(25 75 24)"
      />
    </svg>
  );
}

/**
 * VODNÍK: Temný tůňový pán hlubin - Paletový swap do hlubinného smaragdu, petroleje a temné modři
 */
function renderVodnikDeep(stage: number): React.ReactNode {
  // Temná hlubinná paleta
  const coatColor = stage === 0 ? "#1b5663" : stage === 3 ? "#0c2e36" : "#14424a";
  const vestColor = stage === 3 ? "#1f1026" : "#2d1833";
  const skinColor = "#3d7a6e";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Vodník z černé tůně"
    >
      {/* Hluboká temně safírová tůň s animovanými kruhy */}
      <ellipse
        cx="60"
        cy="112"
        rx="44"
        ry="7"
        fill="#0f2b38"
        opacity="0.6"
        className="anim-water-ripple"
      />
      <ellipse cx="60" cy="112" rx="30" ry="4.5" fill="#1b4d61" opacity="0.45" />

      {/* Hlubinné fosforeskující bubliny */}
      <circle
        cx="26"
        cy="104"
        r="3"
        fill="#6ee7b7"
        stroke="#1c1308"
        strokeWidth="1"
        opacity="0.85"
        className="anim-lada-bubble-1"
      />
      <circle
        cx="32"
        cy="96"
        r="2.2"
        fill="#38bdf8"
        stroke="#1c1308"
        strokeWidth="0.8"
        opacity="0.85"
        className="anim-lada-bubble-2"
      />
      <circle
        cx="90"
        cy="106"
        r="3.5"
        fill="#6ee7b7"
        stroke="#1c1308"
        strokeWidth="1"
        opacity="0.85"
        className="anim-lada-bubble-3"
      />
      <circle
        cx="96"
        cy="98"
        r="2"
        fill="#38bdf8"
        stroke="#1c1308"
        strokeWidth="0.8"
        opacity="0.85"
        className="anim-lada-bubble-4"
      />

      {/* Půlnoční boty se stříbrnou přezkou */}
      <path
        d="M42 104 L34 110 Q28 111 26 109 Q28 106 36 104 Z"
        fill="#0d1821"
        stroke="#1c1308"
        strokeWidth="2.5"
      />
      <path
        d="M78 104 L86 110 Q92 111 94 109 Q92 106 84 104 Z"
        fill="#0d1821"
        stroke="#1c1308"
        strokeWidth="2.5"
      />
      <rect x="33" y="105" width="4" height="3" fill="#93c5fd" stroke="#1c1308" strokeWidth="1" />
      <rect x="83" y="105" width="4" height="3" fill="#93c5fd" stroke="#1c1308" strokeWidth="1" />

      {/* Půlnočně modročerné kalhoty (Midnight Navy) */}
      <path
        d="M40 82 L38 105 L48 105 L54 88 L60 88 L66 105 L76 105 L74 82 Z"
        fill="#1c2838"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Šupinatá záplata z jesetera */}
      <rect
        x="40"
        y="90"
        width="7"
        height="6"
        rx="1.5"
        fill="#2d4a5e"
        stroke="#1c1308"
        strokeWidth="1.5"
        transform="rotate(-4 43 93)"
      />

      {/* Kape černá tůňová voda ze šosů */}
      <g className="anim-lada-drip-1">
        <path
          d="M30 94 Q29 99 30 101 Q31 99 30 94 Z"
          fill="#38bdf8"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>
      <g className="anim-lada-drip-2">
        <path
          d="M84 94 Q85 99 84 101 Q83 99 84 94 Z"
          fill="#38bdf8"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>

      {/* Temně petrolejový frak s rybími šupinami */}
      <path
        d="M34 52 C26 70 24 92 32 96 C38 92 48 86 52 82 L62 82 C66 86 76 92 82 96 C90 92 88 70 80 52 Z"
        fill={coatColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Tmavě fialová sametová vesta s perleťovými knoflíky */}
      <path
        d="M46 54 C46 76 50 82 57 82 L60 82 L67 82 C74 82 78 76 78 54 Z"
        fill={vestColor}
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <circle cx="57" cy="62" r="1.8" fill="#e0f2fe" stroke="#1c1308" strokeWidth="0.8" />
      <circle cx="57" cy="70" r="1.8" fill="#e0f2fe" stroke="#1c1308" strokeWidth="0.8" />
      <circle cx="57" cy="77" r="1.8" fill="#e0f2fe" stroke="#1c1308" strokeWidth="0.8" />

      {/* Indigová hedvábná vázanka se safírem */}
      <path
        d="M52 54 Q57 58 60 55 Q63 58 68 54 Q64 51 60 53 Q56 51 52 54 Z"
        fill="#312e81"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <circle cx="60" cy="54" r="2.8" fill="#0284c7" stroke="#1c1308" strokeWidth="1" />

      {/* Ruce v petrolejových rukávech s duhově šupinatými manžetami */}
      <path
        d="M34 54 Q24 64 28 78 L34 76 Q32 64 38 56 Z"
        fill={coatColor}
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <rect
        x="25"
        y="74"
        width="7"
        height="4"
        rx="1"
        fill="#228594"
        stroke="#1c1308"
        strokeWidth="1.5"
        transform="rotate(-20 28 76)"
      />
      <circle cx="27" cy="80" r="4.5" fill={skinColor} stroke="#1c1308" strokeWidth="2" />

      <path
        d="M80 54 Q90 64 86 78 L80 76 Q82 64 76 56 Z"
        fill={coatColor}
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <rect
        x="82"
        y="74"
        width="7"
        height="4"
        rx="1"
        fill="#228594"
        stroke="#1c1308"
        strokeWidth="1.5"
        transform="rotate(20 85 76)"
      />
      <circle cx="87" cy="80" r="4.5" fill={skinColor} stroke="#1c1308" strokeWidth="2" />

      {/* Tmavší vodní hlava tůňového pána */}
      <circle cx="60" cy="40" r="16.5" fill={skinColor} stroke="#1c1308" strokeWidth="3.5" />

      {/* Stříbro-zelené lícní stíny */}
      <circle cx="48" cy="44" r="4" fill="#275950" opacity="0.6" />
      <circle cx="72" cy="44" r="4" fill="#275950" opacity="0.6" />

      {/* Mosazné brýličky s modravým odleskem */}
      <circle
        cx="53"
        cy="38"
        r="5"
        fill="#bae6fd"
        opacity="0.75"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <circle
        cx="67"
        cy="38"
        r="5"
        fill="#bae6fd"
        opacity="0.75"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <line x1="58" y1="38" x2="62" y2="38" stroke="#1c1308" strokeWidth="2" />

      {/* Pronikavé žlutozelené kočičí oči pána tůní */}
      <g className="anim-lada-blink">
        <circle cx="53" cy="38" r="2.5" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
        <circle cx="67" cy="38" r="2.5" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
        <ellipse cx="53" cy="38" rx="1" ry="2" fill="#1c1308" />
        <ellipse cx="67" cy="38" rx="1" ry="2" fill="#1c1308" />
      </g>

      {/* Vážený tůňový knír a ústa */}
      <path
        d="M52 46 Q60 50 68 46"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M49 46 Q45 52 42 54"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M71 46 Q75 52 78 54"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Dlouhá černá fajfka s modrým magickým dýmem */}
      <g className="anim-pipe-smoke">
        <circle
          cx="79"
          cy="35"
          r="2.5"
          fill="#a5f3fc"
          opacity="0.85"
          stroke="#1c1308"
          strokeWidth="0.8"
        />
        <circle
          cx="83"
          cy="27"
          r="4"
          fill="#67e8f9"
          opacity="0.7"
          stroke="#1c1308"
          strokeWidth="1"
        />
        <circle
          cx="88"
          cy="18"
          r="5.5"
          fill="#38bdf8"
          opacity="0.45"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>
      <line
        x1="68"
        y1="48"
        x2="78"
        y2="43"
        stroke="#1e293b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="77"
        y="39"
        width="5.5"
        height="7.5"
        rx="1.5"
        fill="#0f766e"
        stroke="#1c1308"
        strokeWidth="1.8"
      />
      {/* Žhnoucí tyrkysový ohýnek ve fajfce */}
      <circle cx="80" cy="40" r="1.5" fill="#67e8f9" />

      {/* Vysoký tůňový cylindr s leknínem */}
      <ellipse cx="60" cy="28" rx="24" ry="5.5" fill="#0f2930" stroke="#1c1308" strokeWidth="3" />
      <path d="M46 27 L48 9 L72 9 L74 27 Z" fill="#14363f" stroke="#1c1308" strokeWidth="3" />
      {/* Tmavě indigová stuha */}
      <rect x="47" y="21" width="26" height="6" fill="#312e81" stroke="#1c1308" strokeWidth="1.8" />

      {/* Bílý tůňový leknín se safírovým středem za stuhou */}
      <path d="M70 23 L73 17 L76 23 Z" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
      <path d="M67 24 L70 19 L72 24 Z" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
      <circle cx="71" cy="23" r="2.2" fill="#0284c7" stroke="#1c1308" strokeWidth="1" />
    </svg>
  );
}
