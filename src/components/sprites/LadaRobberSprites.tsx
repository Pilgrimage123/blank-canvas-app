import React from "react";

/**
 * Autentické Ladovské sprity pro loupežníky (Josef Lada: Hrátky s čertem - Sarka Farka).
 *
 * Dvě hlavní větve s výrazným paletovým swapem a zbraněmi:
 * 1. Loupežník (Sarka Farka / lesní hejtman):
 *    - Lesní mechově zelený plášť (#284e27)
 *    - Okrové pytlovité nohavice (#a67848) s hrubou záplatou na koleni
 *    - Obrovský sukovitý kyj se železnými hřeby pohupující se v ruce
 *    - Hustý zrzavý vous, baňatý nos a pomačkaný klobouk s bažantím pírkem
 *
 * 2. Lupič (Lupič s bambitkami - Palette Swap):
 *    - Půlnoční šedomodrý až uhelný plášť (#1c2433) podšitý sytým karmínovým hedvábím (#801824)
 *    - Tmavé břidlicové kalhoty (#283244)
 *    - Kožená bandalírní šerpa s měděnými patronami
 *    - V obou rukách drží MOSAZNÉ BAMBITKY s trychtýřovým ústím chrlící jiskry a dým
 *    - Šibalská špičatá bradka a přimhouřené oči
 */

export function renderLadaRobberSprite(type: string, stage: number = 2): React.ReactNode {
  const isLupic = type === "lupic";

  if (isLupic) {
    return renderLupicBambitkas(stage);
  }
  return renderLoupeznikClassic(stage);
}

/**
 * LOUPEŽNÍK: Klasický lesní hromotluk s obřím sukovitým kyjem (Sarka Farka)
 */
function renderLoupeznikClassic(stage: number): React.ReactNode {
  const capeColor = stage === 3 ? "#1c3d1b" : "#284e27";
  const beardColor = stage === 0 ? "#b84d1c" : stage === 3 ? "#993008" : "#c8521d";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Loupežník Sarka Farka"
    >
      {/* Stín na lesní pěšině */}
      <ellipse cx="60" cy="112" rx="40" ry="7" fill="#1c1308" opacity="0.35" />

      {/* OBŘÍ SUKOVITÝ DŘEVĚNÝ KYJ za zády se železnými hřeby (animované pohupování) */}
      <g
        className="anim-weapon-sway"
        style={{ transformOrigin: "76px 75px", transformBox: "view-box" }}
      >
        <path
          d="M74 100 L76 75 L86 26 C87 18 96 14 105 20 C112 25 112 36 106 44 C100 52 90 62 86 75 L80 102 Z"
          fill="#5a3818"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Hrnky a suky na kyji */}
        <circle cx="95" cy="21" r="7" fill="#6d441e" stroke="#1c1308" strokeWidth="3" />
        <circle cx="107" cy="27" r="8" fill="#7a4d22" stroke="#1c1308" strokeWidth="3" />
        <circle cx="103" cy="39" r="7.5" fill="#6d441e" stroke="#1c1308" strokeWidth="3" />
        <circle cx="90" cy="34" r="6" fill="#875626" stroke="#1c1308" strokeWidth="2.5" />

        {/* Letokruhy a praskliny dřeva */}
        <ellipse
          cx="99"
          cy="29"
          rx="3.5"
          ry="2.5"
          fill="#3b220e"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        <path
          d="M84 56 Q88 64 82 72"
          fill="none"
          stroke="#3b220e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M80 78 Q83 88 78 95"
          fill="none"
          stroke="#3b220e"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Kované železné hřeby a páska */}
        <circle cx="108" cy="22" r="2.2" fill="#d9d2c5" stroke="#1c1308" strokeWidth="1.2" />
        <circle cx="102" cy="42" r="2.2" fill="#d9d2c5" stroke="#1c1308" strokeWidth="1.2" />
        <circle cx="89" cy="24" r="2.2" fill="#d9d2c5" stroke="#1c1308" strokeWidth="1.2" />
      </g>

      {/* Lesní zelený plášť vlající za rameny */}
      <path
        d="M32 52 C26 72 24 96 36 104 C46 95 74 95 84 104 C96 96 94 72 88 52 Z"
        fill={capeColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M30 68 Q36 86 38 100"
        fill="none"
        stroke="#1a351b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M90 68 Q84 86 82 100"
        fill="none"
        stroke="#1a351b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Masivní kožené boty loupežníka */}
      <rect
        x="36"
        y="96"
        width="16"
        height="15"
        rx="5"
        fill="#3a2517"
        stroke="#1c1308"
        strokeWidth="3"
      />
      <rect
        x="68"
        y="96"
        width="16"
        height="15"
        rx="5"
        fill="#3a2517"
        stroke="#1c1308"
        strokeWidth="3"
      />

      {/* Široké okrové pytlovité kalhoty */}
      <path
        d="M36 76 L32 98 L52 98 L60 84 L68 98 L88 98 L84 76 Z"
        fill="#a67c4e"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Záplata na koleni s křížkovými stehy */}
      <rect
        x="37"
        y="83"
        width="10"
        height="9"
        rx="1.5"
        fill="#f0ebd8"
        stroke="#1c1308"
        strokeWidth="2"
        transform="rotate(-6 42 87)"
      />
      <line x1="39" y1="81" x2="39" y2="94" stroke="#1c1308" strokeWidth="1.2" />
      <line x1="45" y1="81" x2="45" y2="94" stroke="#1c1308" strokeWidth="1.2" />

      {/* Selská režná košile s rozhalenkou a červenou vestou */}
      <path
        d="M30 46 C28 66 32 78 60 78 C88 78 92 66 90 46 C80 44 40 44 30 46 Z"
        fill="#ede2cb"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Červená vestička vykukující v rozhalence */}
      <path
        d="M52 46 L60 62 L68 46 Z"
        fill="#c4321d"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Široký kožený pás loupežníka s mosaznou přezkou a váčkem */}
      <rect
        x="34"
        y="70"
        width="52"
        height="10"
        rx="2"
        fill="#24170e"
        stroke="#1c1308"
        strokeWidth="3"
      />
      <rect
        x="54"
        y="68"
        width="12"
        height="14"
        rx="2.5"
        fill="#d49b38"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <rect x="57" y="71" width="6" height="8" rx="1" fill="#24170e" />
      <ellipse cx="40" cy="78" rx="4.5" ry="5" fill="#4d301b" stroke="#1c1308" strokeWidth="2" />

      {/* Silné paže - levá v bok, pravá drží kyj */}
      <path
        d="M30 48 Q20 58 24 72 Q30 76 35 68 L36 52 Z"
        fill="#ede2cb"
        stroke="#1c1308"
        strokeWidth="3"
      />
      <circle cx="25" cy="74" r="5.5" fill="#d9aa7e" stroke="#1c1308" strokeWidth="2.5" />

      <path
        d="M88 48 Q94 60 86 72 Q80 74 76 66 L82 50 Z"
        fill="#ede2cb"
        stroke="#1c1308"
        strokeWidth="3"
      />
      <circle cx="83" cy="73" r="5.5" fill="#d9aa7e" stroke="#1c1308" strokeWidth="2.5" />

      {/* Břichatá hlava a huňatý zrzavý plnovous */}
      <circle cx="60" cy="38" r="16" fill="#d9aa7e" stroke="#1c1308" strokeWidth="3.5" />

      {/* Sarka Farka zrzavý plnovous */}
      <path
        d="M44 38 C42 54 46 64 60 66 C74 64 78 54 76 38 C72 44 68 46 60 46 C52 46 48 44 44 38 Z"
        fill={beardColor}
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M46 52 Q44 62 50 63"
        fill="none"
        stroke="#9e3a10"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 54 Q60 66 58 68"
        fill="none"
        stroke="#9e3a10"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M74 52 Q76 62 70 63"
        fill="none"
        stroke="#9e3a10"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Mohutný knír */}
      <path
        d="M48 44 Q56 42 60 46 Q64 42 72 44 Q66 50 60 48 Q54 50 48 44 Z"
        fill="#d65e24"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Očka s divokým zrzavým obočím */}
      <path
        d="M48 31 Q53 28 57 32"
        fill="none"
        stroke="#8c2f0a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M63 32 Q67 28 72 31"
        fill="none"
        stroke="#8c2f0a"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="53" cy="35" r="3.5" fill="#fcf6ea" stroke="#1c1308" strokeWidth="2" />
      <circle cx="67" cy="35" r="3.5" fill="#fcf6ea" stroke="#1c1308" strokeWidth="2" />
      <g className="anim-lada-blink">
        <circle cx="54" cy="35" r="2.2" fill="#1c1308" />
        <circle cx="66" cy="35" r="2.2" fill="#1c1308" />
        <circle cx="55" cy="34" r="0.9" fill="#ffffff" />
        <circle cx="67" cy="34" r="0.9" fill="#ffffff" />
      </g>

      {/* Červený bambulovitý nos a ruměné tváře */}
      <circle cx="46" cy="38" r="4.5" fill="#d95b43" opacity="0.6" />
      <circle cx="74" cy="38" r="4.5" fill="#d95b43" opacity="0.6" />
      <ellipse
        cx="60"
        cy="39"
        rx="4.5"
        ry="3.8"
        fill="#c4432c"
        stroke="#1c1308"
        strokeWidth="2.2"
      />

      {/* Pomačkaný loupežnický klobouk s bažantím perem */}
      <path
        d="M30 32 C38 24 82 24 90 32 C96 36 88 38 60 36 C32 38 24 36 30 32 Z"
        fill="#292826"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M44 28 C42 16 52 4 58 4 C64 4 72 14 74 28 Z"
        fill="#333230"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M48 18 Q58 14 68 18" fill="none" stroke="#1c1308" strokeWidth="2.5" />
      {/* Bílá šňůra s pírkem */}
      <line x1="58" y1="5" x2="65" y2="18" stroke="#ffffff" strokeWidth="2" strokeDasharray="2,2" />
    </svg>
  );
}

/**
 * LUPIČ: Noční přepadávač s karmínově podšitým pláštěm a DVĚMA MOSAZNÝMI BAMBITKAMI (Palette Swap)
 */
function renderLupicBambitkas(stage: number): React.ReactNode {
  const cloakColor = stage === 3 ? "#0f172a" : "#1c2433";
  const liningColor = "#801824";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Lupič s bambitkami"
    >
      {/* Noční stín */}
      <ellipse cx="60" cy="112" rx="36" ry="6.5" fill="#1c1308" opacity="0.4" />

      {/* Půlnoční šedomodrý plášť s karmínově rudou hedvábnou podšívkou */}
      <path
        d="M38 52 C30 70 28 94 38 102 C48 94 72 94 82 102 C92 94 90 70 82 52 Z"
        fill={cloakColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Vlající karmínová podšívka na okrajích */}
      <path
        d="M38 102 Q34 88 32 74 Q30 92 38 102 Z"
        fill={liningColor}
        stroke="#1c1308"
        strokeWidth="1.8"
      />
      <path
        d="M82 102 Q86 88 88 74 Q90 92 82 102 Z"
        fill={liningColor}
        stroke="#1c1308"
        strokeWidth="1.8"
      />

      {/* Šedé břidlicové nohavice s botami */}
      <rect
        x="42"
        y="98"
        width="13"
        height="13"
        rx="4"
        fill="#1c1308"
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <rect
        x="65"
        y="98"
        width="13"
        height="13"
        rx="4"
        fill="#1c1308"
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      {/* Stříbrné přezky na botách */}
      <rect x="45" y="103" width="5" height="3" fill="#cbd5e1" stroke="#1c1308" strokeWidth="1" />
      <rect x="68" y="103" width="5" height="3" fill="#cbd5e1" stroke="#1c1308" strokeWidth="1" />

      {/* Tmavé nohavice s ocelově šedou záplatou */}
      <path
        d="M42 78 L38 99 L53 99 L60 86 L67 99 L82 99 L78 78 Z"
        fill="#283244"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <rect
        x="41"
        y="85"
        width="8"
        height="7"
        rx="1"
        fill="#64748b"
        stroke="#1c1308"
        strokeWidth="1.8"
        transform="rotate(-5 45 88)"
      />

      {/* Tmavá košile a černá kožená vesta */}
      <path
        d="M38 48 C36 65 38 78 60 78 C82 78 84 65 82 48 C74 46 46 46 38 48 Z"
        fill="#e2e8f0"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Černá kožená vesta se stříbrnými knoflíky */}
      <path d="M42 49 L46 72 L74 72 L78 49 Z" fill="#1e242d" stroke="#1c1308" strokeWidth="2.2" />
      <circle cx="58" cy="56" r="1.5" fill="#cbd5e1" />
      <circle cx="58" cy="64" r="1.5" fill="#cbd5e1" />

      {/* Kožená bandalírní šerpa s měděnými nábojkami */}
      <path d="M42 48 L76 76" stroke="#451a03" strokeWidth="5.5" strokeLinecap="square" />
      <path d="M42 48 L76 76" stroke="#1c1308" strokeWidth="6.5" opacity="0.2" />
      <circle cx="50" cy="55" r="1.8" fill="#f59e0b" stroke="#1c1308" strokeWidth="0.8" />
      <circle cx="58" cy="61" r="1.8" fill="#f59e0b" stroke="#1c1308" strokeWidth="0.8" />
      <circle cx="66" cy="68" r="1.8" fill="#f59e0b" stroke="#1c1308" strokeWidth="0.8" />

      {/* Hlava lupiče se špičatou bradkou */}
      <circle cx="60" cy="38" r="14.5" fill="#e3b588" stroke="#1c1308" strokeWidth="3.5" />

      {/* Šibalská zrzavá bradka a špičatý knírek */}
      <path
        d="M50 40 C48 52 52 62 60 63 C68 62 72 52 70 40 C66 44 64 46 60 46 C56 46 54 44 50 40 Z"
        fill="#b84818"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M50 45 Q56 42 60 46 Q64 42 70 45 Q65 49 60 48 Q55 49 50 45 Z"
        fill="#cf551f"
        stroke="#1c1308"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Přimhouřené vychytralé oči */}
      <path
        d="M50 32 Q54 30 58 33"
        fill="none"
        stroke="#8c2f0a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M62 33 Q66 30 70 32"
        fill="none"
        stroke="#8c2f0a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <ellipse
        cx="54"
        cy="35"
        rx="3.2"
        ry="2.8"
        fill="#fcf6ea"
        stroke="#1c1308"
        strokeWidth="1.8"
      />
      <ellipse
        cx="66"
        cy="35"
        rx="3.2"
        ry="2.8"
        fill="#fcf6ea"
        stroke="#1c1308"
        strokeWidth="1.8"
      />
      <g className="anim-lada-blink">
        <circle cx="55" cy="35" r="1.9" fill="#1c1308" />
        <circle cx="65" cy="35" r="1.9" fill="#1c1308" />
        <circle cx="55.6" cy="34.4" r="0.7" fill="#ffffff" />
        <circle cx="65.6" cy="34.4" r="0.7" fill="#ffffff" />
      </g>

      {/* Drobný nos a tváře */}
      <circle cx="48" cy="39" r="3.5" fill="#d95b43" opacity="0.45" />
      <circle cx="72" cy="39" r="3.5" fill="#d95b43" opacity="0.45" />
      <ellipse cx="60" cy="39" rx="3.8" ry="3" fill="#c4432c" stroke="#1c1308" strokeWidth="2" />

      {/* Noční klobouk s havraním perem */}
      <path
        d="M32 32 C40 25 80 25 88 32 C93 36 86 38 60 36 C34 38 27 36 32 32 Z"
        fill="#1e232a"
        stroke="#1c1308"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M45 28 C44 18 52 6 58 6 C64 6 70 16 73 28 Z"
        fill="#262c35"
        stroke="#1c1308"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Černé lesklé pero */}
      <path
        d="M58 8 Q65 14 70 24"
        fill="none"
        stroke="#0f172a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1="58" y1="8" x2="63" y2="18" stroke="#38bdf8" strokeWidth="1" />

      {/* =========================================================================
       * DVĚ LEŠTĚNÉ MOSAZNÉ BAMBITKY S ANIMOVANÝMI JISKRAMI A KOUŘEM
       * ========================================================================= */}

      {/* LEVÁ BAMBITKA */}
      <g style={{ transformOrigin: "42px 64px" }}>
        <path d="M40 50 Q32 58 38 66 L44 64" fill="#e2e8f0" stroke="#1c1308" strokeWidth="2.8" />
        <circle cx="41" cy="65" r="4" fill="#e3b588" stroke="#1c1308" strokeWidth="2" />

        {/* Dřevěná pažba pistole */}
        <path
          d="M42 66 L30 62 L20 61 L16 63"
          fill="none"
          stroke="#6d3f18"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Mosazný křesadlový zámek */}
        <rect
          x="31"
          y="58"
          width="6"
          height="5"
          rx="1"
          fill="#f59e0b"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        {/* Mosazná hlaveň rozšiřující se do trychtýře */}
        <line
          x1="32"
          y1="61"
          x2="16"
          y2="59"
          stroke="#b45309"
          strokeWidth="4"
          strokeLinecap="square"
        />
        <polygon
          points="16,55 5,49 5,69 16,63"
          fill="#f59e0b"
          stroke="#1c1308"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <ellipse
          cx="5"
          cy="59"
          rx="2.5"
          ry="9.5"
          fill="#1c1308"
          stroke="#ffd438"
          strokeWidth="1.8"
        />

        {/* Jiskry šlehající z levé hlavně */}
        <circle cx="0" cy="57" r="1.8" fill="#ffd438" className="anim-spark-1" />
        <circle cx="-3" cy="61" r="1.5" fill="#f97316" className="anim-spark-2" />

        {/* Šedobílý kouř stoupající z ústí */}
        <g className="anim-pipe-smoke">
          <circle
            cx="3"
            cy="54"
            r="2.5"
            fill="#ffffff"
            opacity="0.8"
            stroke="#1c1308"
            strokeWidth="0.8"
          />
          <circle
            cx="-1"
            cy="48"
            r="3.5"
            fill="#e2e8f0"
            opacity="0.65"
            stroke="#1c1308"
            strokeWidth="0.8"
          />
          <circle
            cx="-5"
            cy="40"
            r="5"
            fill="#cbd5e1"
            opacity="0.4"
            stroke="#1c1308"
            strokeWidth="0.8"
          />
        </g>
      </g>

      {/* PRAVÁ BAMBITKA */}
      <g style={{ transformOrigin: "78px 64px" }}>
        <path d="M80 50 Q88 58 82 66 L76 64" fill="#e2e8f0" stroke="#1c1308" strokeWidth="2.8" />
        <circle cx="79" cy="65" r="4" fill="#e3b588" stroke="#1c1308" strokeWidth="2" />

        {/* Dřevěná pažba pistole */}
        <path
          d="M78 66 L90 62 L100 61 L104 63"
          fill="none"
          stroke="#6d3f18"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Mosazný křesadlový zámek */}
        <rect
          x="83"
          y="58"
          width="6"
          height="5"
          rx="1"
          fill="#f59e0b"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        {/* Mosazná hlaveň rozšiřující se do trychtýře */}
        <line
          x1="88"
          y1="61"
          x2="104"
          y2="59"
          stroke="#b45309"
          strokeWidth="4"
          strokeLinecap="square"
        />
        <polygon
          points="104,55 115,49 115,69 104,63"
          fill="#f59e0b"
          stroke="#1c1308"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <ellipse
          cx="115"
          cy="59"
          rx="2.5"
          ry="9.5"
          fill="#1c1308"
          stroke="#ffd438"
          strokeWidth="1.8"
        />

        {/* Jiskry šlehající z pravé hlavně */}
        <circle cx="120" cy="57" r="1.8" fill="#ffd438" className="anim-spark-2" />
        <circle cx="123" cy="61" r="1.5" fill="#f97316" className="anim-spark-1" />

        {/* Šedobílý kouř stoupající z ústí */}
        <g className="anim-pipe-smoke">
          <circle
            cx="117"
            cy="54"
            r="2.5"
            fill="#ffffff"
            opacity="0.8"
            stroke="#1c1308"
            strokeWidth="0.8"
          />
          <circle
            cx="121"
            cy="48"
            r="3.5"
            fill="#e2e8f0"
            opacity="0.65"
            stroke="#1c1308"
            strokeWidth="0.8"
          />
          <circle
            cx="125"
            cy="40"
            r="5"
            fill="#cbd5e1"
            opacity="0.4"
            stroke="#1c1308"
            strokeWidth="0.8"
          />
        </g>
      </g>
    </svg>
  );
}
