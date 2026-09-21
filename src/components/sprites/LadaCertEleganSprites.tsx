import React from "react";

/**
 * Autentické Ladovské sprity pro rodinu "Čert elegán" (elitní, šviháčtí čerti ze světa
 * Josefa Lady a klasických českých pohádek – pekelný vyslanec a hrabě / kníže pekel).
 *
 * Charakteristika rodiny:
 * - Důmyslní, uhlazení a elegantně odění pekelní vyslanci specializovaní na svádění
 *   důvěřivých i lakomých lidí k podpisu pekelných úpisů krví.
 * - Každý člen má své vlastní charakteristické zbarvení šatu:
 *    • Stádium 0 (Úr. 4): Čert voják – Pruská modř (#284d7a), verbířský pekelný úpis s pečetí
 *    • Stádium 1 (Úr. 8): Čert myslivec – Lesní mechová zeleň (#225632), klobouk s pérem, brk a smlouva
 *    • Stádium 2 (Úr. 12): Čert džentlmen – Temně fialový frak (#422358), monokl, rozvinutý pentagramový úpis
 *    • Stádium 3 (Úr. 16): Čert hrabě – Výsostný purpurově rudý plášť s vysokým stojatým límcem,
 *                          legendární náprsenka s rohatým motivem,
 *                          kožený jezdecký karabáč/bičík v ruce a velký pergamen s pentagramem a rudou voskovou pečetí!
 */

const ink = "#1c1308";

export function renderLadaCertEleganSprite(
  stage: number = 2,
  isHit: boolean = false,
  isAttacking: boolean = false,
  variantName?: string,
): React.ReactNode {
  const normStage = Math.max(0, Math.min(3, stage));

  switch (normStage) {
    case 0:
      return renderCertVojak(isHit, isAttacking);
    case 1:
      return renderCertMyslivec(isHit, isAttacking);
    case 2:
      return renderCertDzentlmen(isHit, isAttacking);
    case 3:
    default:
      return renderCertHrabe(isHit, isAttacking);
  }
}

/* =========================================================================
 * SDÍLENÉ ANIMACE PRO RODINU ČERTŮ ELEGÁNŮ
 * ========================================================================= */
const eleganAnimationsStyle = `
  @keyframes eleganBreathe {
    0%, 100% { transform: translateY(0px) scale(1, 1); }
    50% { transform: translateY(-1.5px) scale(1.015, 0.985); }
  }
  @keyframes sealSwing {
    0%, 100% { transform: rotate(-8deg); }
    50% { transform: rotate(10deg); }
  }
  @keyframes sealSwingSlow {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(7deg); }
  }
  @keyframes capeFlutter {
    0%, 100% { transform: skewY(0deg) scaleX(1); }
    50% { transform: skewY(-1.5deg) scaleX(1.02); }
  }
  @keyframes tailSwish {
    0%, 100% { transform: rotate(-6deg); }
    50% { transform: rotate(8deg); }
  }
  @keyframes pentagramGaze {
    0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 1px #d92418); }
    50% { opacity: 1; filter: drop-shadow(0 0 3px #ff3826); }
  }
  @keyframes brimstonePuff {
    0% { opacity: 0; transform: translateY(0) scale(0.4); }
    40% { opacity: 0.75; transform: translateY(-6px) scale(0.9); }
    80% { opacity: 0.4; transform: translateY(-13px) scale(1.2); }
    100% { opacity: 0; transform: translateY(-18px) scale(1.4); }
  }
  @keyframes eyeGleam {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.15); }
  }
  @keyframes monocleShine {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.95; }
  }
`;

/* =========================================================================
 * 0. ČERT VOJÁK (Stádium 0, Úr. 4)
 * Barva: Císařská pruská modř (#284d7a), mosazné knoflíky, bílá šerpa.
 * Pekelný atribut: Verbířský pekelný úpis s pentagramem a pečetí lákající na 100 zlatých.
 * ========================================================================= */
function renderCertVojak(isHit: boolean, isAttacking: boolean) {
  const coatColor = "#284d7a";
  const coatShadow = "#1c385b";
  const redTrim = "#ba281e";
  const brassGold = "#e5b536";
  const parchmentBg = "#f7efd9";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md overflow-visible"
      aria-label="Čert voják"
    >
      <style>{eleganAnimationsStyle}</style>

      {/* Měkký stín pod kopyty */}
      <ellipse cx="60" cy="113" rx="34" ry="5.5" fill={ink} opacity="0.32" />

      {/* Společný dech celé postavy */}
      <g
        style={{
          animation: "eleganBreathe 3.4s ease-in-out infinite",
          transformOrigin: "60px 110px",
        }}
      >
        {/* Čertovský ocas s modrou vojenskou stužkou na špičce */}
        <g
          style={{ animation: "tailSwish 2.8s ease-in-out infinite", transformOrigin: "78px 84px" }}
        >
          <path
            d="M74 84 C88 88 101 80 102 68 C103 59 93 54 90 62"
            fill="none"
            stroke="#211d24"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Štětička na ocase */}
          <path
            d="M90 62 C86 60 84 66 88 68 C92 70 94 64 90 62 Z"
            fill="#18151a"
            stroke={ink}
            strokeWidth="1.5"
          />
          {/* Vojenská modrá mašlička na ocase */}
          <path
            d="M89 64 L84 60 L87 66 Z M89 64 L94 61 L92 67 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="1.2"
          />
        </g>

        {/* Nohy a naleštěná černá vojenská kopyta/holínky */}
        <g>
          {/* Levá noha v modrých rajtkách */}
          <path
            d="M44 80 L40 104 L52 104 L55 80 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M38 102 L52 102 L51 110 L37 110 Z"
            fill="#18151c"
            stroke={ink}
            strokeWidth="2.4"
          />
          {/* Zářez kopyta */}
          <line x1="44" y1="106" x2="44" y2="110" stroke="#f6efdc" strokeWidth="1.2" />

          {/* Pravá noha vykročená vpřed */}
          <path
            d="M65 80 L68 104 L80 104 L76 80 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M67 102 L81 102 L80 110 L66 110 Z"
            fill="#18151c"
            stroke={ink}
            strokeWidth="2.4"
          />
          <line x1="74" y1="106" x2="74" y2="110" stroke="#f6efdc" strokeWidth="1.2" />
        </g>

        {/* Trup v uniformním fraku */}
        <g>
          {/* Šosy kabátu */}
          <path
            d="M36 56 Q60 50 84 56 L82 86 Q60 92 38 86 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Červené lemování a podšívka šosů */}
          <path
            d="M38 84 Q60 90 82 84 L80 88 Q60 94 40 88 Z"
            fill={redTrim}
            stroke={ink}
            strokeWidth="1.8"
          />

          {/* Bílá bandalírová šerpa přes prsa */}
          <path d="M42 54 L76 82 L72 86 L38 58 Z" fill="#f8f4e6" stroke={ink} strokeWidth="2" />
          {/* Mosazná spona šerpy */}
          <circle cx="58" cy="70" r="4" fill={brassGold} stroke={ink} strokeWidth="1.6" />

          {/* Zlaté knoflíky na uniformě */}
          <circle cx="55" cy="56" r="2" fill={brassGold} stroke={ink} strokeWidth="1.2" />
          <circle cx="56" cy="62" r="2" fill={brassGold} stroke={ink} strokeWidth="1.2" />
          <circle cx="57" cy="68" r="2" fill={brassGold} stroke={ink} strokeWidth="1.2" />
          <circle cx="59" cy="76" r="2" fill={brassGold} stroke={ink} strokeWidth="1.2" />

          {/* Červený vojenský stojáček u krku */}
          <path
            d="M51 46 Q60 48 69 46 L68 52 Q60 54 52 52 Z"
            fill={redTrim}
            stroke={ink}
            strokeWidth="2"
          />
          {/* Zlaté porty na límci */}
          <line x1="53" y1="49" x2="57" y2="49" stroke={brassGold} strokeWidth="1.4" />
          <line x1="63" y1="49" x2="67" y2="49" stroke={brassGold} strokeWidth="1.4" />
        </g>

        {/* Levá paže – nese rozvinutý verbířský úpis */}
        <g>
          <path
            d="M39 55 Q26 62 26 73 Q26 78 33 76"
            fill="none"
            stroke={coatColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Červená manžeta se zlatým knoflíkem */}
          <rect
            x="25"
            y="70"
            width="8"
            height="5"
            rx="1.5"
            fill={redTrim}
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(-15 29 72)"
          />
          <circle cx="28" cy="72" r="1.2" fill={brassGold} />
          {/* Čertova černá ruka držící pergamen */}
          <circle cx="34" cy="74" r="3.2" fill="#211d24" stroke={ink} strokeWidth="1.5" />

          {/* VERBÍŘSKÝ PEKELNÝ ÚPIS S PENTAGRAMEM A RUDOU PEČETÍ */}
          <g transform="translate(13, 62) rotate(-6)">
            {/* Svinutý vrchní okraj */}
            <path
              d="M4 6 C6 3 16 3 18 6 L18 8 C16 5 6 5 4 8 Z"
              fill="#ebd9b5"
              stroke={ink}
              strokeWidth="1.5"
            />
            {/* Tělo pergamenu */}
            <path
              d="M4 7 L18 7 L19 32 Q11 35 3 32 Z"
              fill={parchmentBg}
              stroke={ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Tajemné řádky smlouvy */}
            <line
              x1="6"
              y1="11"
              x2="16"
              y2="11"
              stroke="#4a3728"
              strokeWidth="1"
              strokeDasharray="1.5 1"
            />
            <line
              x1="6"
              y1="14"
              x2="16"
              y2="14"
              stroke="#4a3728"
              strokeWidth="1"
              strokeDasharray="1.5 1"
            />
            {/* RUDÝ PENTAGRAM NA ÚPISU */}
            <g
              style={{
                animation: "pentagramGaze 2.5s ease-in-out infinite",
                transformOrigin: "11px 20px",
              }}
            >
              <circle cx="11" cy="20" r="4.2" fill="none" stroke="#ba281e" strokeWidth="1.1" />
              {/* 5-cípá hvězda pentagramu */}
              <polygon
                points="11,16.2 12.3,19.8 15.2,19.8 12.8,21.5 13.7,24 11,22.2 8.3,24 9.2,21.5 6.8,19.8 9.7,19.8"
                fill="none"
                stroke="#ba281e"
                strokeWidth="0.9"
              />
            </g>
            {/* Podpis krví */}
            <path
              d="M6 26 Q9 24 11 26 Q13 28 16 26"
              fill="none"
              stroke="#ba281e"
              strokeWidth="1.1"
            />

            {/* VISÍCÍ RUDÁ PEČEŤ NA ŠŇŮRCE */}
            <g
              style={{
                animation: "sealSwing 2.4s ease-in-out infinite",
                transformOrigin: "11px 32px",
              }}
            >
              {/* Červená visící šňůrka */}
              <line x1="11" y1="32" x2="11" y2="38" stroke="#ba281e" strokeWidth="1.4" />
              {/* Vosková pečeť */}
              <circle cx="11" cy="42" r="4" fill="#ba281e" stroke={ink} strokeWidth="1.6" />
              <circle cx="11" cy="42" r="2.6" fill="#8c1a12" />
              {/* Růžky v pečeti */}
              <path d="M9.5 41 Q11 43 12.5 41" fill="none" stroke="#f6ebd2" strokeWidth="0.8" />
            </g>
          </g>
        </g>

        {/* Pravá paže – salutuje nebo nabízí brk / láká rekruta */}
        <g>
          <path
            d="M81 55 Q92 62 90 73 Q88 77 82 75"
            fill="none"
            stroke={coatColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <rect
            x="83"
            y="70"
            width="8"
            height="5"
            rx="1.5"
            fill={redTrim}
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(20 87 72)"
          />
          <circle cx="86" cy="72" r="1.2" fill={brassGold} />
          {/* Čertova ruka držící zlatý krejcar za podpis */}
          <circle cx="81" cy="76" r="3.2" fill="#211d24" stroke={ink} strokeWidth="1.5" />
          <circle cx="82" cy="77" r="3" fill={brassGold} stroke={ink} strokeWidth="1.4" />
          <text x="82" y="79" fontSize="3.5" fontWeight="900" fill={ink} textAnchor="middle">
            ★
          </text>
        </g>

        {/* Hlava čerta vojáka – švihácká, ladovská, s uhlazenými růžky a vojenskou lodičkou/čapkou */}
        <g>
          {/* Obličej z černého sametu s růžovým nádechem na tvářích */}
          <ellipse cx="60" cy="35" rx="15" ry="16" fill="#252129" stroke={ink} strokeWidth="3.2" />

          {/* Růžky – úhledné, špičatě nabroušené, vojensky srovnané */}
          <path
            d="M48 24 C43 14 45 4 52 2 C53 8 54 16 53 21"
            fill="#eadcb8"
            stroke={ink}
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
          <path
            d="M72 24 C77 14 75 4 68 2 C67 8 66 16 67 21"
            fill="#eadcb8"
            stroke={ink}
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />

          {/* Vojenská čapka s kokardou posazená mezi rohy */}
          <path
            d="M46 22 Q60 16 74 22 L72 15 Q60 12 48 15 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="18" r="3" fill={brassGold} stroke={ink} strokeWidth="1.4" />
          <circle cx="60" cy="18" r="1.4" fill={redTrim} />

          {/* Oči – žlutá čertovská očka se šibalským leskem */}
          <g style={{ animation: "eyeGleam 4s infinite", transformOrigin: "60px 33px" }}>
            <ellipse
              cx="54"
              cy="33"
              rx="3.8"
              ry="4.5"
              fill="#f8e05b"
              stroke={ink}
              strokeWidth="1.6"
            />
            <circle cx="55" cy="33" r="1.8" fill={ink} />
            <circle cx="56" cy="31.8" r="0.8" fill="#fff" />

            <ellipse
              cx="66"
              cy="33"
              rx="3.8"
              ry="4.5"
              fill="#f8e05b"
              stroke={ink}
              strokeWidth="1.6"
            />
            <circle cx="67" cy="33" r="1.8" fill={ink} />
            <circle cx="68" cy="31.8" r="0.8" fill="#fff" />
          </g>

          {/* Švihácký vytočený vojenský knírek */}
          <path
            d="M52 42 Q60 39 60 41 Q60 39 68 42 Q64 45 60 43 Q56 45 52 42 Z"
            fill="#141117"
            stroke={ink}
            strokeWidth="1.8"
          />
          <path
            d="M49 41 Q52 43 54 42 M71 41 Q68 43 66 42"
            stroke={ink}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Malá špičatá bradka */}
          <path d="M58 45 L62 45 L60 49 Z" fill="#141117" stroke={ink} strokeWidth="1.4" />

          {/* Červený šibalský jazyk vykukující z koutku úst */}
          <path d="M62 42 Q64 45 63 46 Q61 45 61 43" fill="#e03628" stroke={ink} strokeWidth="1" />

          {/* Růžové líčko */}
          <ellipse cx="48" cy="38" rx="2.5" ry="1.8" fill="#e25345" opacity="0.6" />
          <ellipse cx="72" cy="38" rx="2.5" ry="1.8" fill="#e25345" opacity="0.6" />
        </g>
      </g>

      {/* Akční pop-up při útoku */}
      {isAttacking && (
        <g transform="translate(60, 15) scale(0.9)">
          <path d="M-18 -10 L18 -10 L12 8 L-12 8 Z" fill="#ffd438" stroke={ink} strokeWidth="2" />
          <text x="0" y="2" fontSize="10" fontWeight="900" fill={ink} textAnchor="middle">
            Podepiš!
          </text>
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 1. ČERT MYSLIVEC (Stádium 1, Úr. 8)
 * Barva: Hluboká lesní zeleň (#225632), klobouk se sojčím/bažantím pérem,
 *        jelení knoflíky, kožená vesta.
 * Pekelný atribut: Havraní brk s krví a svinutý lesní pakt na duši sedláka.
 * ========================================================================= */
function renderCertMyslivec(isHit: boolean, isAttacking: boolean) {
  const coatColor = "#225632";
  const lapelColor = "#153d22";
  const vestColor = "#ab6227";
  const featherOrange = "#d95f27";
  const parchmentBg = "#f6ebd2";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md overflow-visible"
      aria-label="Čert myslivec"
    >
      <style>{eleganAnimationsStyle}</style>

      {/* Měkký stín */}
      <ellipse cx="60" cy="113" rx="35" ry="5.8" fill={ink} opacity="0.32" />

      {/* Dech */}
      <g
        style={{
          animation: "eleganBreathe 3.6s ease-in-out infinite",
          transformOrigin: "60px 110px",
        }}
      >
        {/* Čertovský ocas s liščím hnědým kroužkem */}
        <g
          style={{ animation: "tailSwish 3.2s ease-in-out infinite", transformOrigin: "78px 84px" }}
        >
          <path
            d="M75 83 C90 86 103 76 104 64 C105 56 94 51 92 59"
            fill="none"
            stroke="#211d24"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <circle cx="97" cy="73" r="2.8" fill={vestColor} stroke={ink} strokeWidth="1.2" />
          {/* Štětka na ocase */}
          <path
            d="M92 59 C88 56 86 63 90 65 C94 67 96 61 92 59 Z"
            fill="#141117"
            stroke={ink}
            strokeWidth="1.5"
          />
        </g>

        {/* Nohy v mysliveckých zelených kalhotách a kožených holínkách */}
        <g>
          <path
            d="M43 79 L39 104 L52 104 L55 79 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M37 101 L52 101 L51 110 L36 110 Z"
            fill="#2d1c13"
            stroke={ink}
            strokeWidth="2.4"
          />
          <line x1="44" y1="105" x2="44" y2="110" stroke="#f6efdc" strokeWidth="1.2" />

          <path
            d="M65 79 L68 104 L81 104 L77 79 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M67 101 L82 101 L81 110 L66 110 Z"
            fill="#2d1c13"
            stroke={ink}
            strokeWidth="2.4"
          />
          <line x1="74" y1="105" x2="74" y2="110" stroke="#f6efdc" strokeWidth="1.2" />
        </g>

        {/* Trup v myslivecké kazajce a jelení vestě */}
        <g>
          {/* Zadní část kabátu */}
          <path
            d="M34 54 Q60 48 86 54 L84 86 Q60 93 36 86 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Jelení kožená vesta v rozhalence */}
          <path d="M50 52 L60 76 L70 52 Z" fill={vestColor} stroke={ink} strokeWidth="2" />
          {/* Parohové knoflíčky */}
          <circle cx="59" cy="58" r="1.8" fill="#f5eedc" stroke={ink} strokeWidth="1.1" />
          <circle cx="60" cy="65" r="1.8" fill="#f5eedc" stroke={ink} strokeWidth="1.1" />
          <circle cx="60.5" cy="72" r="1.8" fill="#f5eedc" stroke={ink} strokeWidth="1.1" />

          {/* Sametové lesní klopy */}
          <path d="M40 53 L50 72 L45 74 L36 55 Z" fill={lapelColor} stroke={ink} strokeWidth="2" />
          <path d="M80 53 L70 72 L75 74 L84 55 Z" fill={lapelColor} stroke={ink} strokeWidth="2" />

          {/* Myslivecká brašna na podepsané úpisy přes rameno */}
          <path d="M37 54 L76 83" stroke="#482d18" strokeWidth="3" strokeLinecap="round" />
          <rect
            x="70"
            y="78"
            width="13"
            height="11"
            rx="2.5"
            fill="#5a381e"
            stroke={ink}
            strokeWidth="2"
          />
          {/* Mosazná přezka na brašně */}
          <rect
            x="74"
            y="82"
            width="5"
            height="4"
            rx="1"
            fill="#e5b536"
            stroke={ink}
            strokeWidth="1.2"
          />
          {/* Z brašny vykukuje kousek pergamenu s pečetí */}
          <path
            d="M72 77 L78 77 L79 73 L73 73 Z"
            fill={parchmentBg}
            stroke={ink}
            strokeWidth="1.2"
          />
        </g>

        {/* Levá ruka – drží rozvinutou mysliveckou smlouvu s pentagramem */}
        <g>
          <path
            d="M38 54 Q25 61 27 74 Q29 79 34 76"
            fill="none"
            stroke={coatColor}
            strokeWidth="7.2"
            strokeLinecap="round"
          />
          {/* Tmavá manžeta s knoflíkem */}
          <rect
            x="25"
            y="71"
            width="8"
            height="5"
            rx="1.5"
            fill={lapelColor}
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(-15 29 73)"
          />
          <circle cx="34" cy="74" r="3.2" fill="#211d24" stroke={ink} strokeWidth="1.5" />

          {/* PERGAMEN S PENTAGRAMEM A RUDOU PEČETÍ */}
          <g transform="translate(10, 60) rotate(-4)">
            <path
              d="M3 5 Q11 2 20 5 L19 33 Q10 36 2 33 Z"
              fill={parchmentBg}
              stroke={ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line
              x1="5"
              y1="9"
              x2="17"
              y2="9"
              stroke="#4a3728"
              strokeWidth="1"
              strokeDasharray="1.5 1"
            />
            <line
              x1="5"
              y1="12"
              x2="17"
              y2="12"
              stroke="#4a3728"
              strokeWidth="1"
              strokeDasharray="1.5 1"
            />
            <line
              x1="5"
              y1="15"
              x2="17"
              y2="15"
              stroke="#4a3728"
              strokeWidth="1"
              strokeDasharray="1.5 1"
            />

            {/* PENTAGRAM KRVÍ */}
            <g
              style={{
                animation: "pentagramGaze 2.5s ease-in-out infinite",
                transformOrigin: "11px 22px",
              }}
            >
              <circle cx="11" cy="22" r="4.2" fill="none" stroke="#ba281e" strokeWidth="1.2" />
              <polygon
                points="11,18 12.3,21.8 15.2,21.8 12.8,23.5 13.7,26 11,24.2 8.3,26 9.2,23.5 6.8,21.8 9.7,21.8"
                fill="none"
                stroke="#ba281e"
                strokeWidth="1"
              />
            </g>

            {/* Červená visící pečeť na stužce */}
            <g
              style={{
                animation: "sealSwing 2.6s ease-in-out infinite",
                transformOrigin: "11px 33px",
              }}
            >
              <line x1="11" y1="33" x2="11" y2="39" stroke="#ba281e" strokeWidth="1.5" />
              <circle cx="11" cy="43" r="4.2" fill="#ba281e" stroke={ink} strokeWidth="1.6" />
              <circle cx="11" cy="43" r="2.8" fill="#88150e" />
              <path d="M9.5 42 Q11 44.5 12.5 42" fill="none" stroke="#f6ebd2" strokeWidth="0.9" />
            </g>
          </g>
        </g>

        {/* Pravá ruka – drží havraní brk smočený v sírovém inkoustu */}
        <g>
          <path
            d="M82 54 Q94 62 92 73 Q90 78 84 76"
            fill="none"
            stroke={coatColor}
            strokeWidth="7.2"
            strokeLinecap="round"
          />
          <rect
            x="84"
            y="71"
            width="8"
            height="5"
            rx="1.5"
            fill={lapelColor}
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(20 88 73)"
          />
          <circle cx="83" cy="76" r="3.2" fill="#211d24" stroke={ink} strokeWidth="1.5" />

          {/* HAVRANÍ BRK (černé pírko s červenou kapkou inkoustu) */}
          <g transform="translate(83, 72) rotate(-35)">
            <path
              d="M0 0 C4 -8 6 -18 2 -24 C-1 -18 0 -8 0 0 Z"
              fill="#18151c"
              stroke={ink}
              strokeWidth="1.6"
            />
            <line x1="0" y1="0" x2="1" y2="-23" stroke="#eadcb8" strokeWidth="1.1" />
            {/* Špička smočená v krvi/inkoustu */}
            <circle cx="0" cy="1" r="1.4" fill="#ba281e" stroke={ink} strokeWidth="0.8" />
            {/* Odkapávající kapka */}
            <circle cx="0" cy="4" r="0.9" fill="#ba281e" />
          </g>
        </g>

        {/* Hlava čerta myslivce – klobouk s bažantím pírkem, kroužky v rozích */}
        <g>
          <ellipse
            cx="60"
            cy="35"
            rx="15.5"
            ry="16"
            fill="#252129"
            stroke={ink}
            strokeWidth="3.2"
          />

          {/* Zahnuté, nabroušené čertí rohy s mosaznými kroužky */}
          <path
            d="M48 24 C41 12 43 2 51 0 C53 7 54 15 53 21"
            fill="#eadcb8"
            stroke={ink}
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
          <ellipse
            cx="47"
            cy="10"
            rx="2.4"
            ry="1.2"
            fill="#e5b536"
            stroke={ink}
            strokeWidth="1"
            transform="rotate(-30 47 10)"
          />

          <path
            d="M72 24 C79 12 77 2 69 0 C67 7 66 15 67 21"
            fill="#eadcb8"
            stroke={ink}
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
          <ellipse
            cx="73"
            cy="10"
            rx="2.4"
            ry="1.2"
            fill="#e5b536"
            stroke={ink}
            strokeWidth="1"
            transform="rotate(30 73 10)"
          />

          {/* Myslivecký klobouk s krempou */}
          <path
            d="M39 23 Q60 14 81 23 L77 28 Q60 21 43 28 Z"
            fill={lapelColor}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M45 22 Q60 11 75 22 L72 13 Q60 8 48 13 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Červená stuha kolem klobouku */}
          <path
            d="M46 21 Q60 14 74 21 L73 18 Q60 12 47 18 Z"
            fill="#ba281e"
            stroke={ink}
            strokeWidth="1.2"
          />

          {/* Dlouhé bažantí pírko zakroucené z klobouku */}
          <g
            style={{
              animation: "capeFlutter 3s ease-in-out infinite",
              transformOrigin: "73px 19px",
            }}
          >
            <path
              d="M73 19 C84 9 95 6 98 2 C94 9 86 17 75 20 Z"
              fill={featherOrange}
              stroke={ink}
              strokeWidth="1.8"
            />
            {/* Proužky na pírku */}
            <line x1="80" y1="13" x2="82" y2="16" stroke={ink} strokeWidth="1.4" />
            <line x1="87" y1="8" x2="89" y2="11" stroke={ink} strokeWidth="1.4" />
            <line x1="93" y1="5" x2="94" y2="7" stroke={ink} strokeWidth="1.2" />
          </g>

          {/* Oči – žlutá jiskřící očka myslivce */}
          <g style={{ animation: "eyeGleam 4.2s infinite", transformOrigin: "60px 33px" }}>
            <ellipse
              cx="54"
              cy="33"
              rx="3.8"
              ry="4.5"
              fill="#f8e05b"
              stroke={ink}
              strokeWidth="1.6"
            />
            <circle cx="55" cy="33" r="1.8" fill={ink} />
            <circle cx="56" cy="31.8" r="0.8" fill="#fff" />

            <ellipse
              cx="66"
              cy="33"
              rx="3.8"
              ry="4.5"
              fill="#f8e05b"
              stroke={ink}
              strokeWidth="1.6"
            />
            <circle cx="67" cy="33" r="1.8" fill={ink} />
            <circle cx="68" cy="31.8" r="0.8" fill="#fff" />
          </g>

          {/* Fikaný zatočený knírek a bradka */}
          <path
            d="M51 42 Q60 38 60 41 Q60 38 69 42 Q65 46 60 43 Q55 46 51 42 Z"
            fill="#141117"
            stroke={ink}
            strokeWidth="1.8"
          />
          <path
            d="M47 40 Q51 42 53 41 M73 40 Q69 42 67 41"
            stroke={ink}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M57 45 L63 45 L60 50 Z" fill="#141117" stroke={ink} strokeWidth="1.5" />

          {/* Tvářička */}
          <ellipse cx="47" cy="38" rx="2.5" ry="1.8" fill="#e25345" opacity="0.6" />
          <ellipse cx="73" cy="38" rx="2.5" ry="1.8" fill="#e25345" opacity="0.6" />
        </g>
      </g>

      {isAttacking && (
        <g transform="translate(60, 15) scale(0.9)">
          <path d="M-20 -10 L20 -10 L14 8 L-14 8 Z" fill="#ffd438" stroke={ink} strokeWidth="2" />
          <text x="0" y="2" fontSize="9" fontWeight="900" fill={ink} textAnchor="middle">
            Vem brk!
          </text>
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 2. ČERT DŽENTLMEN (Stádium 2, Úr. 12)
 * Barva: Aristokratická hluboká purpurová/fialová (#422358) se šarlatovou podšívkou,
 *        sněhobílá vázanka/cravat, zlatý monokl s řetízkem, cylindrická noblesa.
 * Pekelný atribut: Velký rozvinutý pergamenový pakt s planoucím pentagramem a rudou pečetí.
 * ========================================================================= */
function renderCertDzentlmen(isHit: boolean, isAttacking: boolean) {
  const coatColor = "#422358";
  const coatLining = "#ba2327";
  const goldAcc = "#e5b536";
  const cravatWhite = "#faf3e3";
  const parchmentBg = "#f7edd3";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md overflow-visible"
      aria-label="Čert džentlmen"
    >
      <style>{eleganAnimationsStyle}</style>

      {/* Měkký stín */}
      <ellipse cx="60" cy="113" rx="36" ry="6" fill={ink} opacity="0.32" />

      {/* Dech */}
      <g
        style={{
          animation: "eleganBreathe 3.4s ease-in-out infinite",
          transformOrigin: "60px 110px",
        }}
      >
        {/* Čertovský ocas s uvázanou rudou hedvábnou mašličkou */}
        <g style={{ animation: "tailSwish 3s ease-in-out infinite", transformOrigin: "78px 84px" }}>
          <path
            d="M75 83 C92 86 104 74 104 62 C104 53 93 49 90 57"
            fill="none"
            stroke="#211d24"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          {/* Rudá mašlička na ocase */}
          <path
            d="M96 66 L91 61 L93 68 Z M96 66 L101 62 L99 69 Z"
            fill={coatLining}
            stroke={ink}
            strokeWidth="1.2"
          />
          <circle cx="96" cy="66" r="1.4" fill={goldAcc} />
          {/* Štětka */}
          <path
            d="M90 57 C86 54 84 61 88 63 C92 65 94 59 90 57 Z"
            fill="#141117"
            stroke={ink}
            strokeWidth="1.5"
          />
        </g>

        {/* Nohy ve fialových panských kalhotách a lesklých lakýrkách */}
        <g>
          <path
            d="M43 78 L39 104 L52 104 L55 78 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M37 101 L52 101 L51 110 L36 110 Z"
            fill="#151218"
            stroke={ink}
            strokeWidth="2.4"
          />
          <line x1="44" y1="105" x2="44" y2="110" stroke="#f6efdc" strokeWidth="1.2" />

          <path
            d="M65 78 L68 104 L81 104 L77 78 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M67 101 L82 101 L81 110 L66 110 Z"
            fill="#151218"
            stroke={ink}
            strokeWidth="2.4"
          />
          <line x1="74" y1="105" x2="74" y2="110" stroke="#f6efdc" strokeWidth="1.2" />
        </g>

        {/* Frak s dlouhými šosy a šarlatovou hedvábnou podšívkou */}
        <g>
          {/* Vlající šosy fraku */}
          <path
            d="M33 52 Q60 44 87 52 L84 88 Q60 96 36 88 Z"
            fill={coatColor}
            stroke={ink}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          {/* Rozhalená šarlatová podšívka šosů */}
          <path
            d="M36 85 Q60 92 84 85 L82 89 Q60 96 38 89 Z"
            fill={coatLining}
            stroke={ink}
            strokeWidth="1.8"
          />

          {/* Tmavá brokátová vesta se zlatými knoflíky */}
          <path d="M48 50 L60 76 L72 50 Z" fill="#241e2b" stroke={ink} strokeWidth="2.2" />
          <circle cx="59.5" cy="58" r="1.8" fill={goldAcc} stroke={ink} strokeWidth="1.1" />
          <circle cx="60" cy="65" r="1.8" fill={goldAcc} stroke={ink} strokeWidth="1.1" />
          <circle cx="60.5" cy="72" r="1.8" fill={goldAcc} stroke={ink} strokeWidth="1.1" />

          {/* Zlatý řetízek od cibulových hodinek pnoucí se po vestě */}
          <path d="M53 66 Q60 72 67 66" fill="none" stroke={goldAcc} strokeWidth="1.8" />

          {/* Sněhobílá panská vázanka / fiží (cravat) s rubínovou jehlicí */}
          <path
            d="M52 46 L60 62 L68 46 Q60 48 52 46 Z"
            fill={cravatWhite}
            stroke={ink}
            strokeWidth="2"
          />
          <path d="M56 50 L60 58 L64 50" fill="none" stroke="#d5c7aa" strokeWidth="1.2" />
          {/* Rubínová spona na vázance */}
          <circle cx="60" cy="53" r="2.2" fill={coatLining} stroke={ink} strokeWidth="1.2" />
          <circle cx="60" cy="53" r="1" fill="#ff7a73" />
        </g>

        {/* Levá ruka – hrdě nabízí velkolepý rozvinutý pergamen s pentagramem */}
        <g>
          <path
            d="M37 53 Q22 60 25 74 Q27 80 34 77"
            fill="none"
            stroke={coatColor}
            strokeWidth="7.4"
            strokeLinecap="round"
          />
          {/* Manžeta s krajkou */}
          <rect
            x="23"
            y="71"
            width="8"
            height="5"
            rx="1.5"
            fill="#f8f4e6"
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(-15 27 73)"
          />
          <circle cx="33" cy="75" r="3.2" fill="#211d24" stroke={ink} strokeWidth="1.5" />

          {/* ROZVINUTÝ PEKELNÝ ÚPIS DŽENTLMENA */}
          <g transform="translate(8, 56) rotate(-5)">
            {/* Horní svitek */}
            <path
              d="M2 5 Q12 1 23 5 L22 35 Q11 39 1 35 Z"
              fill={parchmentBg}
              stroke={ink}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path
              d="M2 5 C4 2 21 2 23 5 L23 7 C21 4 4 4 2 7 Z"
              fill="#ebd7b0"
              stroke={ink}
              strokeWidth="1.5"
            />

            {/* Magické písmo smlouvy */}
            <line
              x1="5"
              y1="10"
              x2="20"
              y2="10"
              stroke="#4a3728"
              strokeWidth="1.1"
              strokeDasharray="2 1"
            />
            <line
              x1="5"
              y1="13"
              x2="20"
              y2="13"
              stroke="#4a3728"
              strokeWidth="1.1"
              strokeDasharray="2 1"
            />
            <line
              x1="5"
              y1="16"
              x2="20"
              y2="16"
              stroke="#4a3728"
              strokeWidth="1.1"
              strokeDasharray="2 1"
            />

            {/* VELKÝ PENTAGRAM KRVÍ S GLOW EFEKTEM */}
            <g
              style={{
                animation: "pentagramGaze 2.2s ease-in-out infinite",
                transformOrigin: "12px 24px",
              }}
            >
              <circle cx="12" cy="24" r="5" fill="none" stroke="#ba2327" strokeWidth="1.4" />
              <polygon
                points="12,19.2 13.5,23.8 17,23.8 14.1,25.8 15.2,28.8 12,26.6 8.8,28.8 9.9,25.8 7,23.8 10.5,23.8"
                fill="none"
                stroke="#ba2327"
                strokeWidth="1.2"
              />
            </g>

            {/* Zlatý řádek pro podpis */}
            <line x1="5" y1="32" x2="19" y2="32" stroke="#ba2327" strokeWidth="1.2" />

            {/* VISÍCÍ RUDÁ VOSKOVÁ PEČEŤ */}
            <g
              style={{
                animation: "sealSwing 2.2s ease-in-out infinite",
                transformOrigin: "12px 35px",
              }}
            >
              <line x1="12" y1="35" x2="12" y2="42" stroke={coatLining} strokeWidth="1.8" />
              <circle cx="12" cy="46" r="4.6" fill={coatLining} stroke={ink} strokeWidth="1.8" />
              <circle cx="12" cy="46" r="3" fill="#7d1316" />
              {/* Znak pečetidla – čertí rohy */}
              <path d="M10 45 Q12 48 14 45" fill="none" stroke="#f6ebd2" strokeWidth="1" />
            </g>
          </g>
        </g>

        {/* Pravá ruka – drží zlaté pero nebo panskou vycházkovou hůlku */}
        <g>
          <path
            d="M83 53 Q96 61 93 73 Q91 79 84 76"
            fill="none"
            stroke={coatColor}
            strokeWidth="7.4"
            strokeLinecap="round"
          />
          <rect
            x="85"
            y="71"
            width="8"
            height="5"
            rx="1.5"
            fill="#f8f4e6"
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(20 89 73)"
          />
          <circle cx="83" cy="76" r="3.2" fill="#211d24" stroke={ink} strokeWidth="1.5" />

          {/* Zlaté pero s jiskřícím hrotem nabízené k podpisu */}
          <g transform="translate(83, 73) rotate(-30)">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-22"
              stroke={goldAcc}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <polygon points="-2,-22 2,-22 0,-26" fill="#ba2327" stroke={ink} strokeWidth="1" />
            {/* Jiskřička na hrotu */}
            <circle cx="0" cy="-26" r="1.5" fill="#ffe066" />
          </g>
        </g>

        {/* Hlava čerta džentlmena – vyčesané sametové kadeře, pěstěný knír, zlatý monokl */}
        <g>
          <ellipse
            cx="60"
            cy="34"
            rx="16"
            ry="16.5"
            fill="#252129"
            stroke={ink}
            strokeWidth="3.4"
          />

          {/* Vysoce elegantní, ostré zahnuté rohy s perletí */}
          <path
            d="M47 23 C39 10 42 1 50 -1 C53 6 54 14 52 20"
            fill="#ede2c6"
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="miter"
          />
          <path
            d="M73 23 C81 10 78 1 70 -1 C67 6 66 14 68 20"
            fill="#ede2c6"
            stroke={ink}
            strokeWidth="2.6"
            strokeLinejoin="miter"
          />

          {/* Dandy vyčesané černé vlasy s vlnou mezi rohy */}
          <path
            d="M45 22 Q60 14 75 22 Q60 18 45 22 Z"
            fill="#141117"
            stroke={ink}
            strokeWidth="2.4"
          />
          <path d="M54 18 Q60 12 66 18" fill="none" stroke="#141117" strokeWidth="2.2" />

          {/* Oči – levé oko se zlatým monoklem! */}
          <g style={{ animation: "eyeGleam 4.2s infinite", transformOrigin: "60px 33px" }}>
            <ellipse
              cx="53"
              cy="33"
              rx="3.8"
              ry="4.5"
              fill="#f8e05b"
              stroke={ink}
              strokeWidth="1.6"
            />
            <circle cx="54" cy="33" r="1.8" fill={ink} />
            <circle cx="55" cy="31.8" r="0.8" fill="#fff" />

            {/* Pravé oko s MONOKLEM */}
            <ellipse
              cx="67"
              cy="33"
              rx="4"
              ry="4.7"
              fill="#f8e05b"
              stroke={ink}
              strokeWidth="1.6"
            />
            <circle cx="68" cy="33" r="1.8" fill={ink} />
            <circle cx="69" cy="31.8" r="0.8" fill="#fff" />

            {/* Zlatá obroučka monoklu se skleněným leskem a řetízkem */}
            <circle cx="67" cy="33" r="6" fill="none" stroke={goldAcc} strokeWidth="1.8" />
            <path
              d="M63 31 Q67 29 70 34"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              style={{ animation: "monocleShine 3s ease-in-out infinite" }}
            />
            <path
              d="M73 34 Q76 42 70 54"
              fill="none"
              stroke={goldAcc}
              strokeWidth="1.3"
              strokeDasharray="1.5 1"
            />
          </g>

          {/* Švihácký vytočený mravenčí knír a špičatá aristokratická bradka */}
          <path
            d="M50 42 Q60 38 60 41 Q60 38 70 42 Q65 46 60 43 Q55 46 50 42 Z"
            fill="#141117"
            stroke={ink}
            strokeWidth="1.8"
          />
          <path
            d="M46 39 Q50 41 53 41 M74 39 Q70 41 67 41"
            stroke={ink}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M57 45 L63 45 L60 51 Z" fill="#141117" stroke={ink} strokeWidth="1.5" />

          {/* Červený uhrančivý úsměv */}
          <path d="M56 42 Q60 44 64 42" fill="none" stroke="#ba2327" strokeWidth="1.2" />

          <ellipse cx="46" cy="37" rx="2.5" ry="1.8" fill="#e25345" opacity="0.6" />
          <ellipse cx="74" cy="37" rx="2.5" ry="1.8" fill="#e25345" opacity="0.6" />
        </g>
      </g>

      {isAttacking && (
        <g transform="translate(60, 15) scale(0.9)">
          <path d="M-22 -10 L22 -10 L16 8 L-16 8 Z" fill="#ffd438" stroke={ink} strokeWidth="2" />
          <text x="0" y="2" fontSize="9" fontWeight="900" fill={ink} textAnchor="middle">
            Váš podpis, pane!
          </text>
        </g>
      )}
    </svg>
  );
}

/* =========================================================================
 * 3. ČERT HRABĚ (Stádium 3, Úr. 16) – PŘÍMÁ INSPIRACE FOTOGRAFIÍ!
 * Pekelný vyslanec a hrabě / kníže pekel:
 * - Výsostný vínově rudý plášť (#ab1822) s dramatickým vysokým stojatým límcem
 *   s bílou/krémovou podšívkou (#f6efdc).
 * - Temný doublet s ikonickou rohatou čertovskou náprsenkou s mřížkou!
 * - Hraběcí zvlněný účes s ostrými rohy, dýčkovitý knírek a bradka.
 * - KLÍČOVÝ POŽADAVEK: V pravé ruce třímá KOŽENÝ JEZDECKÝ KARABÁČ / BIČÍK (vysoce kontrastní, s živým šleháním)!
 * - V levé ruce: Velkolepý císařský pekelný úpis s krvavým pentagramem a visící rudou pečetí na zlaté šňůrce!
 * ========================================================================= */
function renderCertHrabe(isHit: boolean, isAttacking: boolean) {
  const capeRed = "#ab1822";
  const capeShadow = "#781017";
  const collarWhite = "#f8f3e4";
  const doubletBlack = "#1a1720";
  const emblemOrange = "#d44b24";
  const emblemRed = "#962316";
  const goldAcc = "#e5b536";
  const parchmentBg = "#f8eed5";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-lg overflow-visible"
      aria-label="Čert hrabě"
    >
      <style>{eleganAnimationsStyle}</style>

      {/* Měkký stín */}
      <ellipse cx="60" cy="113" rx="38" ry="6.2" fill={ink} opacity="0.35" />

      {/* Pekelné jiskřičky a kouř stoupající kolem hraběte */}
      <circle
        cx="28"
        cy="98"
        r="1.4"
        fill="#e5b536"
        opacity="0.75"
        style={{ animation: "brimstonePuff 2.8s infinite" }}
      />
      <circle
        cx="94"
        cy="92"
        r="1.6"
        fill="#ba2327"
        opacity="0.8"
        style={{ animation: "brimstonePuff 3.4s infinite 0.9s" }}
      />
      <circle
        cx="36"
        cy="40"
        r="1.2"
        fill="#ffd438"
        opacity="0.7"
        style={{ animation: "brimstonePuff 2.5s infinite 1.4s" }}
      />

      {/* Hlavní dech těla */}
      <g
        style={{
          animation: "eleganBreathe 3.2s ease-in-out infinite",
          transformOrigin: "60px 110px",
        }}
      >
        {/* Aristokratický ocas s velkou zlatou hraběcí sponou */}
        <g
          style={{ animation: "tailSwish 2.6s ease-in-out infinite", transformOrigin: "78px 84px" }}
        >
          <path
            d="M75 83 C94 86 106 72 105 58 C104 48 92 45 89 54"
            fill="none"
            stroke="#211d24"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          {/* Zlatá spona a rubín na ocase */}
          <rect
            x="94"
            y="62"
            width="6"
            height="6"
            rx="1.5"
            fill={goldAcc}
            stroke={ink}
            strokeWidth="1.2"
            transform="rotate(25 97 65)"
          />
          <circle cx="97" cy="65" r="1.6" fill={capeRed} />
          {/* Ocasní štětka */}
          <path
            d="M89 54 C85 51 83 58 87 60 C91 62 93 56 89 54 Z"
            fill="#141117"
            stroke={ink}
            strokeWidth="1.6"
          />
        </g>

        {/* Nohy v černých sametových kalhotách a lesklých hraběcích botách s kopyty */}
        <g>
          <path
            d="M42 78 L38 104 L52 104 L55 78 Z"
            fill={doubletBlack}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M36 101 L52 101 L51 110 L35 110 Z"
            fill="#120f14"
            stroke={ink}
            strokeWidth="2.4"
          />
          <line x1="43" y1="105" x2="43" y2="110" stroke="#f6efdc" strokeWidth="1.2" />

          <path
            d="M65 78 L68 104 L82 104 L78 78 Z"
            fill={doubletBlack}
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M67 101 L83 101 L82 110 L66 110 Z"
            fill="#120f14"
            stroke={ink}
            strokeWidth="2.4"
          />
          <line x1="75" y1="105" x2="75" y2="110" stroke="#f6efdc" strokeWidth="1.2" />
        </g>

        {/* VLÁJÍCÍ RUDÝ HRABĚCÍ PLÁŠŤ (Zadní pláštěnka) */}
        <g
          style={{
            animation: "capeFlutter 3.4s ease-in-out infinite",
            transformOrigin: "60px 50px",
          }}
        >
          <path
            d="M30 48 Q14 70 20 95 Q38 100 46 88 L40 68 Z"
            fill={capeRed}
            stroke={ink}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Černé hedvábné podšití pláště */}
          <path
            d="M22 93 Q18 75 30 52 L32 58 Q23 75 26 92 Z"
            fill="#1b171c"
            stroke={ink}
            strokeWidth="1.5"
          />

          <path
            d="M90 48 Q106 70 100 95 Q82 100 74 88 L80 68 Z"
            fill={capeRed}
            stroke={ink}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M98 93 Q102 75 90 52 L88 58 Q97 75 94 92 Z"
            fill="#1b171c"
            stroke={ink}
            strokeWidth="1.5"
          />
        </g>

        {/* Trup: Černý sametový kabátec s ikonickou NÁPRSENKOU Z FILMU */}
        <g>
          <path
            d="M36 50 Q60 44 84 50 L82 86 Q60 93 38 86 Z"
            fill={doubletBlack}
            stroke={ink}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* IKONICKÁ ČERTOVSKÁ NÁPRSENKA PŘESNĚ DLE PŘEDLOHY:
              Oranžovo-červený kříž s rohatou maskou čerta a mřížkovaným rámem! */}
          <g transform="translate(60, 64)">
            {/* Široké horizontální rameno náprsenky */}
            <path
              d="M-22 -10 L22 -10 L18 -4 L-18 -4 Z"
              fill={emblemOrange}
              stroke={ink}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Tmavá vnitřní vsadka */}
            <path d="M-15 -9 L15 -9 L13 -5 L-13 -5 Z" fill={emblemRed} />

            {/* Dolů se zužující štít náprsenky s mřížkovaným lemováním */}
            <path
              d="M-16 -4 L16 -4 L11 16 L0 23 L-11 16 Z"
              fill="#221e27"
              stroke={ink}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Vnitřní lemování s kazetami jako na fotografii */}
            <path
              d="M-13 -3 L13 -3 L9 14 L0 20 L-9 14 Z"
              fill="none"
              stroke={emblemOrange}
              strokeWidth="2.5"
            />
            {/* Příčné dělicí čárky v rámu */}
            <line x1="-12" y1="2" x2="-8" y2="2" stroke={ink} strokeWidth="1.2" />
            <line x1="8" y1="2" x2="12" y2="2" stroke={ink} strokeWidth="1.2" />
            <line x1="-10" y1="8" x2="-6" y2="8" stroke={ink} strokeWidth="1.2" />
            <line x1="6" y1="8" x2="10" y2="8" stroke={ink} strokeWidth="1.2" />

            {/* STŘEDOVÁ ROHATÁ ČERTOVSKÁ MASKA NA PRSACH (jako na fotografii!) */}
            <g transform="translate(0, -6)">
              {/* Růžky emblému */}
              <path
                d="M-6 -6 Q-9 -10 -7 -12 Q-4 -9 -4 -5 M6 -6 Q9 -10 7 -12 Q4 -9 4 -5"
                fill={capeRed}
                stroke={ink}
                strokeWidth="1.4"
              />
              {/* Hlava masky */}
              <path
                d="M-5 -5 Q0 -8 5 -5 L4 4 L0 8 L-4 4 Z"
                fill={emblemOrange}
                stroke={ink}
                strokeWidth="1.6"
              />
              {/* Bílá šikmá očka emblému */}
              <ellipse
                cx="-2"
                cy="-1"
                rx="1.2"
                ry="2"
                fill="#fff"
                stroke={ink}
                strokeWidth="0.8"
                transform="rotate(-15 -2 -1)"
              />
              <ellipse
                cx="2"
                cy="-1"
                rx="1.2"
                ry="2"
                fill="#fff"
                stroke={ink}
                strokeWidth="0.8"
                transform="rotate(15 2 -1)"
              />
            </g>
          </g>

          {/* VYSOKÝ KRÁLOVSKÝ STOJATÝ LÍMEC (Španělské okruží / stoják z filmu) */}
          <path
            d="M38 46 C34 32 38 24 45 22 Q60 30 75 22 C82 24 86 32 82 46 Q60 52 38 46 Z"
            fill={collarWhite}
            stroke={ink}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Zlaté lemování vysokého límce */}
          <path d="M45 22 Q60 30 75 22" fill="none" stroke={goldAcc} strokeWidth="2.2" />
          {/* Rudé vnější klopy stojáku */}
          <path
            d="M37 45 C34 33 37 25 44 23 L42 27 C37 34 36 41 37 45 Z"
            fill={capeRed}
            stroke={ink}
            strokeWidth="1.2"
          />
          <path
            d="M83 45 C86 33 83 25 76 23 L78 27 C83 34 84 41 83 45 Z"
            fill={capeRed}
            stroke={ink}
            strokeWidth="1.2"
          />
        </g>

        {/* LEVÁ RUKA – DRŽÍ VELKOLEPÝ CÍSAŘSKÝ ÚPIS S PENTAGRAMEM A RUDOU PEČETÍ */}
        <g>
          <path
            d="M36 52 Q20 60 22 74 Q24 81 32 78"
            fill="none"
            stroke={doubletBlack}
            strokeWidth="7.6"
            strokeLinecap="round"
          />
          {/* Rudá hraběcí manžeta se zlatým knoflíkem */}
          <rect
            x="20"
            y="72"
            width="9"
            height="5"
            rx="1.5"
            fill={capeRed}
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(-15 24 74)"
          />
          <circle cx="23" cy="74" r="1.2" fill={goldAcc} />
          {/* Čertova černá aristokratická ruka se zlatým prstenem */}
          <circle cx="31" cy="76" r="3.4" fill="#211d24" stroke={ink} strokeWidth="1.6" />
          <ellipse cx="32" cy="75" rx="1.6" ry="1.2" fill={goldAcc} />

          {/* VELKÝ PEKELNÝ ÚPIS S PENTAGRAMEM A RUDOU PEČETÍ */}
          <g transform="translate(6, 53) rotate(-6)">
            {/* Samotný starobylý pergamen */}
            <path
              d="M1 5 Q12 1 25 5 L24 37 Q12 41 0 37 Z"
              fill={parchmentBg}
              stroke={ink}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Horní kroucený okraj pergamenu */}
            <path
              d="M1 5 C4 1 22 1 25 5 L25 7 C22 3 4 3 1 7 Z"
              fill="#e7d3a8"
              stroke={ink}
              strokeWidth="1.6"
            />

            {/* Magické runy a řádky paktu */}
            <line
              x1="5"
              y1="10"
              x2="21"
              y2="10"
              stroke="#4a3728"
              strokeWidth="1.2"
              strokeDasharray="2 1"
            />
            <line
              x1="5"
              y1="13"
              x2="21"
              y2="13"
              stroke="#4a3728"
              strokeWidth="1.2"
              strokeDasharray="2 1"
            />
            <line
              x1="5"
              y1="16"
              x2="21"
              y2="16"
              stroke="#4a3728"
              strokeWidth="1.2"
              strokeDasharray="2 1"
            />

            {/* VELKÝ PLANOUCÍ RUDÝ PENTAGRAM */}
            <g
              style={{
                animation: "pentagramGaze 2s ease-in-out infinite",
                transformOrigin: "13px 25px",
              }}
            >
              <circle cx="13" cy="25" r="5.5" fill="none" stroke="#ba2327" strokeWidth="1.6" />
              <circle
                cx="13"
                cy="25"
                r="6.6"
                fill="none"
                stroke="#ba2327"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
              />
              <polygon
                points="13,19.8 14.7,24.8 18.8,24.8 15.5,27.1 16.7,30.4 13,28 9.3,30.4 10.5,27.1 7.2,24.8 11.3,24.8"
                fill="none"
                stroke="#ba2327"
                strokeWidth="1.3"
              />
            </g>

            {/* Zlaté místo pro podpis duše */}
            <line x1="4" y1="34" x2="21" y2="34" stroke="#ba2327" strokeWidth="1.3" />

            {/* VISÍCÍ RUDÁ PEČEŤ NA ZLATÉ ŠŇŮRCE (plynulé fyzikální kyvadlo) */}
            <g
              style={{
                animation: "sealSwing 2s ease-in-out infinite",
                transformOrigin: "13px 37px",
              }}
            >
              <line x1="13" y1="37" x2="13" y2="45" stroke={goldAcc} strokeWidth="1.8" />
              <line x1="12.5" y1="37" x2="12.5" y2="45" stroke="#ba2327" strokeWidth="1.2" />

              {/* Vosková pečeť Luciferova dvora */}
              <circle cx="13" cy="50" r="5" fill="#ba2327" stroke={ink} strokeWidth="2" />
              <circle cx="13" cy="50" r="3.4" fill="#750f14" />
              {/* Plastický reliéf pečetidla – velká rohatá koruna */}
              <path
                d="M10.5 49 L13 52 L15.5 49 L15 51 L11 51 Z"
                fill="#ffd438"
                stroke={ink}
                strokeWidth="0.6"
              />
            </g>
          </g>
        </g>

        {/* PRAVÁ RUKA – TŘÍMÁ KOŽENÝ JEZDECKÝ KARABÁČ / BIČÍK (V POPŘEDÍ PŘED TĚLEM A PLÁŠTĚM) */}
        <g>
          {/* Paže napřažená s bičíkem – v popředí před tělem i pláštěm */}
          <path
            d="M84 52 Q98 59 96 72 Q94 79 86 76"
            fill="none"
            stroke={doubletBlack}
            strokeWidth="7.6"
            strokeLinecap="round"
          />
          {/* Rudá manžeta */}
          <rect
            x="87"
            y="71"
            width="9"
            height="5"
            rx="1.5"
            fill={capeRed}
            stroke={ink}
            strokeWidth="1.8"
            transform="rotate(20 91 73)"
          />
          <circle cx="90" cy="73" r="1.2" fill={goldAcc} />

          {/* RUKOJEŤ KARABÁČE V RUCE HRABĚTE (z lakovaného dřeva se zlatým kováním) */}
          <line
            x1="81.5"
            y1="82"
            x2="88"
            y2="67"
            stroke="#5a2e12"
            strokeWidth="4.4"
            strokeLinecap="round"
          />
          <line
            x1="82"
            y1="81.5"
            x2="87.5"
            y2="67.5"
            stroke="#d49339"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Zlatá hlavice / hruška na spodku rukojeti */}
          <circle cx="81.5" cy="82" r="2.6" fill={goldAcc} stroke={ink} strokeWidth="1.2" />
          {/* Zlatý kroužek pod bištěm */}
          <circle cx="88" cy="67" r="2.2" fill={goldAcc} stroke={ink} strokeWidth="1.2" />
          {/* Kožené poutko na zápěstí visící z rukojeti */}
          <path
            d="M81.5 82 Q77 86 80 90 Q84 88 82.5 83"
            fill="none"
            stroke="#5a2e12"
            strokeWidth="1.4"
          />

          {/* PLETENÝ JEZDECKÝ KARABÁČ – PŘED TĚLEM HRABĚTE (VYSOKÝ KONTRAST) */}
          {/* Světlý podkladový lem zaručující dokonalou čitelnost proti černému kabátci i rudému plášti */}
          <path
            d="M88 67 C99 63 105 76 101 88 C97 100 91 107 88 114"
            fill="none"
            stroke="#fff8e6"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Vnější silný Lada ink obrys biče */}
          <path
            d="M88 67 C99 63 105 76 101 88 C97 100 91 107 88 114"
            fill="none"
            stroke={ink}
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          {/* Hlavní kožené tělo biče v teplé koňakové kůži */}
          <path
            d="M88 67 C99 63 105 76 101 88 C97 100 91 107 88 114"
            fill="none"
            stroke="#c86d26"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Pletená spirála na biči (střídání zlatavé a karmínově rudé nitě) */}
          <path
            d="M90 66 L93 68 M96 68 L99 71 M101 75 L102 79 M101 84 L99 87 M97 93 L95 96 M93 101 L91 104 M89 108 L88 112"
            stroke="#ffd15c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M92 67 L95 69 M98 70 L101 73 M102 77 L101 81 M100 86 L98 89 M96 95 L94 98 M92 103 L90 106 M88 110 L87 113"
            stroke="#ba2327"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Dvojité třásně / šlehátko na konci bičíku */}
          <path
            d="M88 114 L93 120 M88 114 L86 121 M88 114 L89 122"
            stroke="#ba2327"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M88 114 L93 120 M88 114 L86 121"
            stroke="#ffd15c"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Čertova černá ruka sevřená v pěst PEVNĚ OBEMKÁVAJÍCÍ RUKOJEŤ KARABÁČE */}
          <circle cx="85" cy="75" r="3.8" fill="#211d24" stroke={ink} strokeWidth="1.6" />
          {/* Prsty svírající rukojeť */}
          <path d="M83 73 Q86 72 87 75 Q86 78 83 77" fill="none" stroke={ink} strokeWidth="1.2" />
          {/* Zlatý pečetní prsten na prstu */}
          <ellipse
            cx="85"
            cy="74"
            rx="1.6"
            ry="1.2"
            fill={goldAcc}
            stroke={ink}
            strokeWidth="0.8"
          />
        </g>

        {/* HLAVA ČERTA HRABĚTE
            Černé havraní vlny tvořící ostré růžky, uhrančivé oči, dýčkovitý knírek a bradka */}
        <g>
          {/* Obličej s bledým aristokratickým nádechem na černém sametu */}
          <ellipse
            cx="60"
            cy="34"
            rx="16.5"
            ry="17"
            fill="#252129"
            stroke={ink}
            strokeWidth="3.5"
          />

          {/* ČERTÍ ROHY – NABRÓŠENÉ, ŠPIČATÉ, DŮMYSLNĚ SPLYVŠÍ S ÚČESEM */}
          <path
            d="M46 22 C37 9 40 -1 49 -3 C53 4 54 13 52 20"
            fill="#ead8b0"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="miter"
          />
          {/* Zlaté rytí na rohu */}
          <ellipse
            cx="45"
            cy="8"
            rx="2.4"
            ry="1.2"
            fill={goldAcc}
            stroke={ink}
            strokeWidth="1"
            transform="rotate(-35 45 8)"
          />

          <path
            d="M74 22 C83 9 80 -1 71 -3 C67 4 66 13 68 20"
            fill="#ead8b0"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinejoin="miter"
          />
          <ellipse
            cx="75"
            cy="8"
            rx="2.4"
            ry="1.2"
            fill={goldAcc}
            stroke={ink}
            strokeWidth="1"
            transform="rotate(35 75 8)"
          />

          {/* VLASOVÁ VLNA (černé lesklé kudrny tvořící rohy) */}
          <path
            d="M44 22 C48 14 54 13 60 16 C66 13 72 14 76 22 C70 17 65 17 60 19 C55 17 50 17 44 22 Z"
            fill="#120f15"
            stroke={ink}
            strokeWidth="2.6"
          />
          {/* Lesk na havraních vlasech */}
          <path d="M50 16 Q60 13 70 16" fill="none" stroke="#483f54" strokeWidth="1.6" />

          {/* OČI – UHRANČIVÝ, PRONIKAVÝ POHLED */}
          <g style={{ animation: "eyeGleam 3.8s infinite", transformOrigin: "60px 33px" }}>
            {/* Obočí vytažené vzhůru do ďábelského oblouku */}
            <path
              d="M48 27 Q53 25 57 28"
              fill="none"
              stroke="#120f15"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M72 27 Q67 25 63 28"
              fill="none"
              stroke="#120f15"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Oči se žluto-oranžovým ohněm a rudým zábleskem */}
            <ellipse
              cx="53"
              cy="33"
              rx="4"
              ry="4.8"
              fill="#f8d63b"
              stroke={ink}
              strokeWidth="1.8"
            />
            <circle cx="54" cy="33" r="2" fill={ink} />
            <circle cx="55" cy="31.6" r="0.9" fill="#fff" />

            <ellipse
              cx="67"
              cy="33"
              rx="4"
              ry="4.8"
              fill="#f8d63b"
              stroke={ink}
              strokeWidth="1.8"
            />
            <circle cx="68" cy="33" r="2" fill={ink} />
            <circle cx="69" cy="31.6" r="0.9" fill="#fff" />
          </g>

          {/* ŠVIHÁCKÝ ZATOČENÝ KNÍREK PŘESNĚ JAKO NA FOTCE */}
          <path
            d="M48 42 Q60 37 60 41 Q60 37 72 42 Q66 46 60 43 Q54 46 48 42 Z"
            fill="#120f15"
            stroke={ink}
            strokeWidth="2.2"
          />
          {/* Zvednuté špičky kníru */}
          <path
            d="M44 39 Q48 42 51 41 M76 39 Q72 42 69 41"
            stroke={ink}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* ŠPIČATÁ BRADKA S DŮLKEM POD RTY */}
          <path d="M57 45 L63 45 L60 52 Z" fill="#120f15" stroke={ink} strokeWidth="1.8" />

          {/* Sardonický rudý úsměv hraběte */}
          <path
            d="M54 42 Q60 45 66 42"
            fill="none"
            stroke={capeRed}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Tváře */}
          <ellipse cx="46" cy="37" rx="2.8" ry="2" fill="#d93b2a" opacity="0.6" />
          <ellipse cx="74" cy="37" rx="2.8" ry="2" fill="#d93b2a" opacity="0.6" />
        </g>
      </g>

      {/* RÁZNÉ PRÁSKNUTÍ KARABÁČEM PŘI ÚTOKU! */}
      {isAttacking && (
        <g transform="translate(60, 10) scale(1)">
          <path
            d="M-28 -12 L28 -12 L20 10 L-20 10 Z"
            fill="#ffd438"
            stroke={ink}
            strokeWidth="2.4"
          />
          <text x="0" y="3" fontSize="11" fontWeight="900" fill="#ba2327" textAnchor="middle">
            PRÁSK! Smlouva platí!
          </text>
        </g>
      )}

      {/* Reakce na zásah */}
      {isHit && (
        <g transform="translate(60, 20)">
          <text
            x="0"
            y="0"
            fontSize="13"
            fontWeight="900"
            fill="#ffd438"
            textAnchor="middle"
            stroke={ink}
            strokeWidth="1"
          >
            U všech všudy!
          </text>
        </g>
      )}
    </svg>
  );
}
