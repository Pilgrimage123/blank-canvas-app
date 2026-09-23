import React from "react";

export interface HunterSpriteProps {
  heroId: string;
  size?: number | string;
  isHit?: boolean;
  isAttacking?: boolean;
  attackFrame?: number; // 1 to 5 pro krokování animace
  className?: string;
}

/**
 * Autentické Ladovské sprity lovců (Josef Lada: Bubáci a hastrmani, České pohádky, Staročeské obrázky).
 *
 * Lovci v pohádkovém světě Josefa Lady:
 * 1. Pobuda z Hrusic ('pobuda'):
 *    - Veselý venkovský tulák v záplatovaném modrém kabátě, s vyřezávanou slánkou na opasku,
 *      sukovatou holí, fajfkou s bafajícím dýmem a otlučeným kloboukem s bažantím pírkem.
 * 2. Pobožný kostelník ('kostelnik'):
 *    - Důstojný hrusický kostelník v černém šosatém kabátě se zlatými knoflíky, drátěnými brýlemi,
 *      vyřezávaným dědovým křížem, kancionálem a kropáčem prýštícím kapky svěcené vody.
 * 3. Moudrá bylinkářka ('bylinkarka'):
 *    - Laskavá babička v lidovém kroji a červeném puntíkatém šátku, s proutěným košíkem
 *      plným heřmánku a mateřídoušky a kameninovým hrnkem s kouřícím bylinkovým odvarem.
 */
export const HunterSprite: React.FC<HunterSpriteProps> = ({
  heroId,
  size = 115,
  isHit = false,
  isAttacking = false,
  attackFrame,
  className = "",
}) => {
  const width = typeof size === "number" ? size : 115;
  const height = typeof size === "number" ? Math.round(size * 1.08) : 124;

  const getMotionClass = () => {
    if (isHit) return "anim-hit";
    if (typeof attackFrame === "number" && attackFrame >= 1 && attackFrame <= 5) {
      return `pose-hunter-atk-${attackFrame}`;
    }
    if (isAttacking) return "anim-attack-5frame-hunter";
    return "anim-lada-breathe";
  };

  return (
    <div
      key={
        isHit
          ? "hit"
          : typeof attackFrame === "number"
            ? `f-${attackFrame}`
            : isAttacking
              ? "atk"
              : "idle"
      }
      className={`relative inline-flex items-center justify-center select-none ${getMotionClass()} ${className}`}
      style={{ width, height }}
    >
      {renderHunterSvg(heroId, isHit, isAttacking, attackFrame)}
    </div>
  );
};

function renderHunterSvg(
  heroId: string,
  isHit: boolean = false,
  isAttacking: boolean = false,
  attackFrame?: number,
): React.ReactNode {
  switch (heroId) {
    case "kostelnik":
      return renderKostelnikSprite(isHit, isAttacking, attackFrame);
    case "bylinkarka":
      return renderBylinkarkaSprite(isHit, isAttacking, attackFrame);
    case "babicka":
      return renderBabickaSprite(isHit, isAttacking, attackFrame);
    case "pobuda":
    default:
      return renderPobudaSprite(isHit, isAttacking, attackFrame);
  }
}

/* =========================================================================
 * 1. POBUDA Z HRUSIC (Venkovský tulák s fajfkou, sukovicí a slánkou)
 * ========================================================================= */
function renderPobudaSprite(
  isHit: boolean = false,
  isAttacking: boolean = false,
  attackFrame?: number,
) {
  return (
    <svg
      viewBox="0 0 120 130"
      className="w-full h-full drop-shadow-md"
      aria-label="Pobuda z Hrusic"
    >
      {/* Měkký stín na zemi pod botami */}
      <ellipse cx="58" cy="122" rx="38" ry="6.5" fill="#1c1308" opacity="0.28" />

      {/* Robustní okované tulácké boty s dřevěnými kolíčky a shrnutými vlněnými ponožkami */}
      <g id="pobuda-boots">
        {/* Levá bota (poctivá hnědá useň s okovanou podrážkou) */}
        <path
          d="M40 106 L38 114 C36 117 32 118 27 119 C23 120 23 123 27 124 C33 125 45 125 47 123 C49 121 48 114 47 106 Z"
          fill="#3e2613"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Hřebíčky v podrážce */}
        <circle cx="28" cy="122" r="1" fill="#1c1308" />
        <circle cx="34" cy="123" r="1" fill="#1c1308" />
        <circle cx="41" cy="122.5" r="1" fill="#1c1308" />

        {/* Pravá bota vykročená dopředu */}
        <path
          d="M66 106 L67 114 C68 117 72 118 78 119 C82 120 83 123 79 124 C73 125 61 125 59 123 C57 121 58 114 60 106 Z"
          fill="#442a15"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="77" cy="122" r="1" fill="#1c1308" />
        <circle cx="71" cy="123" r="1" fill="#1c1308" />
        <circle cx="64" cy="122.5" r="1" fill="#1c1308" />

        {/* Shrnuté teplé vlněné ponožky v botách */}
        <ellipse cx="43" cy="106" rx="6" ry="3" fill="#ded3be" stroke="#1c1308" strokeWidth="2" />
        <ellipse cx="63" cy="106" rx="6" ry="3" fill="#ded3be" stroke="#1c1308" strokeWidth="2" />
      </g>

      {/* Kalhoty z hnědého manšestru se záplatou na pravém koleni */}
      <g id="pobuda-trousers">
        <path
          d="M36 78 C34 88 35 102 43 106 C48 106 51 98 52 86 C53 98 57 106 63 106 C71 102 72 88 70 78 Z"
          fill="#4d3520"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Záplata na levém kolínku se stehy */}
        <rect
          x="36"
          y="88"
          width="8"
          height="9"
          rx="2"
          fill="#2d1c10"
          stroke="#1c1308"
          strokeWidth="1.5"
          transform="rotate(-6 40 92)"
        />
        <line
          x1="38"
          y1="88"
          x2="38"
          y2="97"
          stroke="#e8c876"
          strokeWidth="1.2"
          strokeDasharray="1.5 2"
        />
        <line
          x1="42"
          y1="88"
          x2="42"
          y2="97"
          stroke="#e8c876"
          strokeWidth="1.2"
          strokeDasharray="1.5 2"
        />
      </g>

      {/* Sukovatá tulácká hůl (sukovice) v pravé ruce – opřená o zem nebo máchající v 5 fázích */}
      <g id="pobuda-walking-stick">
        {/* Dynamic stick path depending on attack frame */}
        <path
          d={
            attackFrame === 1
              ? "M76 52 L56 22 L60 20 L80 50 Z"
              : attackFrame === 2
                ? "M72 44 L58 10 L63 8 L77 42 Z"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "M82 40 L118 20 L121 24 L85 45 Z"
                  : attackFrame === 4
                    ? "M80 50 L115 65 L112 69 L77 54 Z"
                    : "M85 58 Q88 78 87 122 L82 122 Q84 78 81 58 Z"
          }
          fill="#6b4421"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Suky a letokruhy na holi v klidu */}
        {(!isAttacking || attackFrame === 5) && !attackFrame && (
          <>
            <circle cx="85" cy="74" r="2.2" fill="#4d3016" stroke="#1c1308" strokeWidth="1" />
            <circle cx="84" cy="98" r="1.8" fill="#4d3016" stroke="#1c1308" strokeWidth="1" />
            <path
              d="M82 62 Q77 68 81 72"
              fill="none"
              stroke="#a36528"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
        {/* 5-fázový komický sečný oblouk a Bác! hvězdičky pro 3. a 4. fázi */}
        {(attackFrame === 3 || attackFrame === 4 || (isAttacking && !attackFrame)) && (
          <g className="anim-comic-swoosh">
            <path
              d="M62 8 C95 12 122 36 114 68"
              fill="none"
              stroke="#ffd438"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M66 12 C96 16 118 38 112 64"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <polygon
              points="114,16 118,23 125,23 119,28 122,35 114,31 107,35 109,28 103,23 110,23"
              fill="#e63920"
              stroke="#1c1308"
              strokeWidth="1.2"
            />
            <circle cx="118" cy="42" r="2.2" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
            <circle cx="106" cy="56" r="1.8" fill="#ff8c38" stroke="#1c1308" strokeWidth="0.8" />
          </g>
        )}
      </g>

      {/* Plné bříško a modrý soukenný kabát s velkou loketní záplatou a dřevěnými knoflíky */}
      <g id="pobuda-coat">
        <path
          d="M34 50 C26 72 26 94 48 97 C54 98 62 98 68 97 C90 94 90 72 82 50 Z"
          fill="#254a73"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Vnitřní teplá venkovská vesta (okrová se lněným lemem) */}
        <path
          d="M48 50 L48 76 C54 78 62 78 68 76 L68 50 Z"
          fill="#cf9d46"
          stroke="#1c1308"
          strokeWidth="2"
        />
        {/* Dřevěné kolíkové knoflíky na vestě */}
        <circle cx="58" cy="56" r="2" fill="#543315" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="64" r="2" fill="#543315" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="72" r="2" fill="#543315" stroke="#1c1308" strokeWidth="1" />

        {/* Velká světlemodrá záplata na lokti levého rukávu s křížkovým stehem */}
        <path
          d="M26 66 C24 74 27 78 33 76 C35 70 33 64 26 66 Z"
          fill="#4673a3"
          stroke="#1c1308"
          strokeWidth="2"
        />
        {/* Křížky x x na záplatě */}
        <path
          d="M28 69 L30 73 M30 69 L28 73"
          stroke="#ffd95c"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M30 71 L32 75 M32 71 L30 75"
          stroke="#ffd95c"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Kožený opasek s mosaznou přezkou */}
        <path
          d="M30 76 C46 80 70 80 86 76 L86 82 C70 86 46 86 30 82 Z"
          fill="#523117"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <rect
          x="52"
          y="76"
          width="12"
          height="8"
          rx="1.5"
          fill="#f4c23c"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <rect x="55" y="78" width="6" height="4" fill="#523117" />
      </g>

      {/* Slavná vyřezávaná dřevěná slánka na řemínku (pohupuje se při chůzi) */}
      <g id="pobuda-slanka" className="anim-pouch-sway">
        {/* Kožený řemínek ze spony opasku */}
        <path
          d="M68 82 Q70 87 69 91"
          fill="none"
          stroke="#523117"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Vyřezávané tělíčko slánky s lidovým vzorem */}
        <rect
          x="64"
          y="91"
          width="12"
          height="15"
          rx="3"
          fill="#e0be82"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <line x1="64" y1="96" x2="76" y2="96" stroke="#1c1308" strokeWidth="1.2" />
        {/* Rytá hvězdička na slánce */}
        <polygon
          points="70,98 71,101 74,101 71.5,103 72.5,106 70,104 67.5,106 68.5,103 66,101 69,101"
          fill="#a36b2c"
        />
        {/* Dřevěný špuntík na vršku */}
        <rect
          x="67.5"
          y="88.5"
          width="5"
          height="3"
          rx="1"
          fill="#7a461b"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
      </g>

      {/* Plátěný žebrácký vak na chléb přes rameno */}
      <path
        d="M36 52 Q44 68 33 80"
        fill="none"
        stroke="#87673c"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Teplá červená vlněná šála kolem krku s třásněmi (vlaje v lehkém vánku) */}
      <g id="pobuda-scarf" className="anim-scarf-wave">
        <path
          d="M40 44 C46 48 70 48 76 44 C79 50 74 55 58 55 C42 55 37 50 40 44 Z"
          fill="#b8301d"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Volný cíp šály visící dolů */}
        <path
          d="M46 52 L44 67 L53 66 L52 52 Z"
          fill="#b8301d"
          stroke="#1c1308"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Třásně na šále */}
        <line
          x1="45"
          y1="67"
          x2="44"
          y2="71"
          stroke="#e8c876"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="48"
          y1="67"
          x2="48"
          y2="72"
          stroke="#e8c876"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="51"
          y1="66"
          x2="52"
          y2="71"
          stroke="#e8c876"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Hlava, veselý obličej s červeným nosem a bradou */}
      <g id="pobuda-head">
        {/* Baculatá hlava s podbradkem */}
        <circle cx="58" cy="34" r="16" fill="#eed2b1" stroke="#1c1308" strokeWidth="3.5" />
        {/* Druhá bradička */}
        <path
          d="M52 46 Q58 50 64 46"
          fill="none"
          stroke="#1c1308"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Vyfoukané růžové tváře */}
        <ellipse cx="44" cy="38" rx="4.5" ry="3.5" fill="#e06248" opacity="0.65" />
        <ellipse cx="72" cy="38" rx="4.5" ry="3.5" fill="#e06248" opacity="0.65" />

        {/* Typický Ladovský velký červený nos */}
        <circle cx="58" cy="35" r="5.5" fill="#cc3823" stroke="#1c1308" strokeWidth="2.5" />
        <circle cx="56" cy="33.5" r="1.4" fill="#ffffff" opacity="0.8" />

        {/* Šibalské mrkající oči (nebo vykulené při zásahu) */}
        {isHit ? (
          /* Zásah: stažené oči v komickém úleku > < */
          <g>
            <path
              d="M46 29 L51 32 L46 35"
              fill="none"
              stroke="#1c1308"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M70 29 L65 32 L70 35"
              fill="none"
              stroke="#1c1308"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Kapka potu hrůzy vedle hlavy */}
            <path
              d="M78 24 C82 24 84 28 80 32 C78 30 76 28 78 24 Z"
              fill="#6bb5ff"
              stroke="#1c1308"
              strokeWidth="1.5"
            />
          </g>
        ) : (
          /* Klidný / bojový pohled s mrkáním */
          <g className="anim-lada-blink">
            {/* Obočí – husté, trochu střapaté */}
            <path
              d="M45 26 Q51 24 54 27"
              fill="none"
              stroke="#52361e"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M62 27 Q65 24 71 26"
              fill="none"
              stroke="#52361e"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Oči se jiskřičkou */}
            <ellipse cx="49" cy="30" rx="2.8" ry="3.2" fill="#1c1308" />
            <ellipse cx="67" cy="30" rx="2.8" ry="3.2" fill="#1c1308" />
            <circle cx="50" cy="29" r="1.1" fill="#ffffff" />
            <circle cx="68" cy="29" r="1.1" fill="#ffffff" />
          </g>
        )}

        {/* Široký přátelský úsměv */}
        <path
          d={isHit ? "M52 44 Q58 39 64 44" : "M50 41 Q58 48 66 41"}
          fill="none"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Hravé strniště vousů (jemné tečky na bradě) */}
        <circle cx="53" cy="44" r="0.7" fill="#80562e" />
        <circle cx="56" cy="45" r="0.7" fill="#80562e" />
        <circle cx="60" cy="45" r="0.7" fill="#80562e" />
        <circle cx="63" cy="44" r="0.7" fill="#80562e" />

        {/* Kudrnaté zrzavo-hnědé vlasy vykukující zpod klobouku */}
        <path
          d="M39 30 C36 34 38 40 42 41"
          fill="none"
          stroke="#5e3c20"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M77 30 C80 34 78 40 74 41"
          fill="none"
          stroke="#5e3c20"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Tradiční hliněná fajfka (dýmka) v koutku úst s žhavým uhlíkem */}
      <g id="pobuda-pipe">
        {/* Troubel dýmky z koutku úst doprava */}
        <path
          d="M63 42 Q72 45 77 42"
          fill="none"
          stroke="#cfa672"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Hlavička dýmky z pálené hlíny s mosazným kováním */}
        <path
          d="M76 38 C76 36 82 36 83 38 L82 46 C81 48 77 48 76 46 Z"
          fill="#993d2b"
          stroke="#1c1308"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Mosazný kroužek */}
        <line x1="76" y1="40" x2="82.5" y2="40" stroke="#f4c23c" strokeWidth="1.5" />
        {/* Žhnoucí tabákový uhlík uvnitř hlavičky dýmky */}
        <circle cx="79" cy="37" r="2.2" className="anim-pipe-glow" />

        {/* Půvabná stoupající oblaka a kroužky dýmu */}
        <g>
          {/* První malý obláček z kotlíku */}
          <circle
            cx="81"
            cy="31"
            r="2.5"
            fill="#fdfbf7"
            stroke="#1c1308"
            strokeWidth="1"
            className="anim-lada-smoke-1"
          />
          {/* Druhý větší stoupající chomáček */}
          <circle
            cx="86"
            cy="22"
            r="3.8"
            fill="#f7f3ea"
            stroke="#1c1308"
            strokeWidth="1.2"
            className="anim-lada-smoke-2"
          />
          {/* Třetí velký Ladovský dýmový kroužek */}
          <circle
            cx="92"
            cy="12"
            r="5"
            fill="#eee7d8"
            stroke="#1c1308"
            strokeWidth="1.4"
            className="anim-lada-smoke-ring-1"
          />
        </g>
      </g>

      {/* Otlučený plstěný venkovský klobouk s promáčknutým dýnkem a bažantím perem */}
      <g id="pobuda-hat">
        {/* Zadní lem klobouku */}
        <ellipse cx="58" cy="23" rx="30" ry="7" fill="#423425" stroke="#1c1308" strokeWidth="3.5" />
        {/* Koruna / dýnko klobouku s promáčknutým vrškem */}
        <path
          d="M40 22 C41 8 48 5 57 8 C66 5 74 8 76 22 Z"
          fill="#544332"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Kožený pásek kolem klobouku */}
        <path
          d="M40 22 C48 25 68 25 76 22 L76 25 C68 28 48 28 40 25 Z"
          fill="#2d1c10"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        {/* Malá mosazná sponečka na pásku */}
        <rect
          x="68"
          y="21.5"
          width="4"
          height="4"
          rx="1"
          fill="#f4c23c"
          stroke="#1c1308"
          strokeWidth="1"
        />

        {/* Nádherné pestré bažantí pírko vetknuté za stuhu (animované, pohupuje se) */}
        <g className="anim-feather-sway">
          {/* Osa brku */}
          <path
            d="M71 22 Q84 14 88 1"
            fill="none"
            stroke="#e8c876"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Prapory pírka s hnědo-zlatými a tyrkysovými pruhy */}
          <path
            d="M71 22 Q78 17 84 10 Q88 3 88 1 Q86 6 81 14 Q74 20 71 22 Z"
            fill="#d97724"
            stroke="#1c1308"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Zelenkavý lesk bažantího pírka */}
          <path d="M78 15 Q82 10 85 5" stroke="#2b6b55" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/* =========================================================================
 * 2. POBOŽNÝ KOSTELNÍK (Černý šosák, kropáč, kancionál a drátěné brýle)
 * ========================================================================= */
function renderKostelnikSprite(
  isHit: boolean = false,
  isAttacking: boolean = false,
  attackFrame?: number,
) {
  return (
    <svg
      viewBox="0 0 120 130"
      className="w-full h-full drop-shadow-md"
      aria-label="Pobožný kostelník"
    >
      {/* Měkký stín na zemi */}
      <ellipse cx="58" cy="122" rx="36" ry="6.5" fill="#1c1308" opacity="0.28" />

      {/* Leštěné černé kostelnické boty s mosaznými přezkami */}
      <g id="kostelnik-shoes">
        <path
          d="M40 110 L38 116 C36 119 32 120 28 121 C24 122 25 124 29 124 C35 125 45 125 47 123 C48 121 47 115 46 110 Z"
          fill="#1c1e24"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect
          x="34"
          y="118"
          width="6"
          height="4"
          rx="1"
          fill="#f4c23c"
          stroke="#1c1308"
          strokeWidth="1.2"
        />

        <path
          d="M66 110 L67 116 C68 119 72 120 76 121 C80 122 79 124 75 124 C69 125 59 125 57 123 C56 121 57 115 58 110 Z"
          fill="#1c1e24"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect
          x="64"
          y="118"
          width="6"
          height="4"
          rx="1"
          fill="#f4c23c"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
      </g>

      {/* Důstojný černý soukenný kabát (šosák / kutna) s bohatým řasením */}
      <g id="kostelnik-cassock">
        <path
          d="M36 50 C30 76 26 104 46 110 C54 112 62 112 70 110 C90 104 86 76 80 50 Z"
          fill="#1b232e"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Šosové záhyby kabátu */}
        <path d="M44 80 Q45 98 48 108" fill="none" stroke="#12171e" strokeWidth="2.5" />
        <path d="M72 80 Q71 98 68 108" fill="none" stroke="#12171e" strokeWidth="2.5" />

        {/* Dlouhá řada lesklých zlatých knoflíků */}
        <circle cx="58" cy="56" r="2.2" fill="#f5c63d" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="64" r="2.2" fill="#f5c63d" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="72" r="2.2" fill="#f5c63d" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="80" r="2.2" fill="#f5c63d" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="88" r="2.2" fill="#f5c63d" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="96" r="2.2" fill="#f5c63d" stroke="#1c1308" strokeWidth="1" />
        <circle cx="58" cy="104" r="2.2" fill="#f5c63d" stroke="#1c1308" strokeWidth="1" />

        {/* Bílý kněžský kolárek / kazatelské tabulky pod krkem */}
        <g id="kostelnik-collar">
          <rect
            x="51"
            y="47"
            width="14"
            height="7"
            rx="1.5"
            fill="#ffffff"
            stroke="#1c1308"
            strokeWidth="2.2"
          />
          <line x1="58" y1="47" x2="58" y2="54" stroke="#1c1308" strokeWidth="1.5" />
        </g>
      </g>

      {/* Dědův velký vyřezávaný kříž na silné šňůrce (houpe se na prsou) */}
      <g id="kostelnik-cross" className="anim-pouch-sway">
        {/* Kroucená hnědá šňůra kolem krku */}
        <path
          d="M52 53 Q58 63 64 53"
          fill="none"
          stroke="#633918"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Svislé rameno kříže */}
        <rect
          x="55"
          y="60"
          width="6"
          height="18"
          rx="1.5"
          fill="#a6672a"
          stroke="#1c1308"
          strokeWidth="2"
        />
        {/* Vodorovné břevno kříže */}
        <rect
          x="49"
          y="64"
          width="18"
          height="6"
          rx="1.5"
          fill="#a6672a"
          stroke="#1c1308"
          strokeWidth="2"
        />
        {/* Vyřezávaný reliéf křížku */}
        <line x1="58" y1="62" x2="58" y2="76" stroke="#fce49d" strokeWidth="1.2" />
        <line x1="51" y1="67" x2="65" y2="67" stroke="#fce49d" strokeWidth="1.2" />
      </g>

      {/* Svazek velkých starých kostelních klíčů u pasu (cinká při chůzi) */}
      <g id="kostelnik-keys" className="anim-pouch-sway">
        {/* Kožený závěs z pasu vlevo */}
        <path
          d="M38 78 Q36 85 37 90"
          fill="none"
          stroke="#4d3016"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Mosazný kroužek */}
        <circle cx="37" cy="92" r="4.5" fill="none" stroke="#f4c23c" strokeWidth="2" />
        {/* První velký zubový klíč od hlavní brány kostela */}
        <path
          d="M37 96 L36 112 L40 112 L40 110 L38 110 L38 107 L41 107 L41 105 L38 105 L38 96 Z"
          fill="#d9a834"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
        {/* Druhý menší klíč od sakristie */}
        <path
          d="M34 94 L30 106 L33 107 L34 96 Z"
          fill="#b08121"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
      </g>

      {/* Červený vázaný kancionál (modlitební kniha se zlatým křížem a záložkou) pod paží */}
      <g id="kostelnik-book">
        <rect
          x="23"
          y="60"
          width="13"
          height="20"
          rx="2"
          fill="#8f2015"
          stroke="#1c1308"
          strokeWidth="2.4"
          transform="rotate(12 28 70)"
        />
        {/* Zlatá ražba na deskách */}
        <line x1="28" y1="66" x2="34" y2="67" stroke="#f4c23c" strokeWidth="1.5" />
        <line x1="31" y1="63" x2="31" y2="72" stroke="#f4c23c" strokeWidth="1.5" />
        {/* Zlatá ořízka listů */}
        <rect x="34" y="62" width="2" height="18" fill="#ffd95c" transform="rotate(12 28 70)" />
        {/* Žlutá hedvábná záložka visící z kancionálu */}
        <path
          d="M32 78 Q30 86 33 92"
          fill="none"
          stroke="#ffd95c"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Hlava, tvář s drátěnými brejličkami, lehkým podbradkem a laskavým výrazem */}
      <g id="kostelnik-head">
        {/* Hlava */}
        <circle cx="58" cy="33" r="15" fill="#edd2b1" stroke="#1c1308" strokeWidth="3.5" />
        {/* Růžové plné tváře */}
        <circle cx="45" cy="38" r="4.2" fill="#db5941" opacity="0.65" />
        <circle cx="71" cy="38" r="4.2" fill="#db5941" opacity="0.65" />

        {/* Baculatý nosík */}
        <circle cx="58" cy="34" r="4.2" fill="#e89880" stroke="#1c1308" strokeWidth="2" />

        {/* Kulaté mosazné drátěné brýle (Ladovské brejličky) */}
        <g id="kostelnik-glasses">
          {/* Levá očnice */}
          <circle
            cx="49"
            cy="30"
            r="5.2"
            fill="#ffffff"
            fillOpacity="0.45"
            stroke="#1c1308"
            strokeWidth="2.2"
          />
          {/* Pravá očnice */}
          <circle
            cx="67"
            cy="30"
            r="5.2"
            fill="#ffffff"
            fillOpacity="0.45"
            stroke="#1c1308"
            strokeWidth="2.2"
          />
          {/* Nosník brýlí */}
          <path d="M54.2 29.5 Q58 27.5 61.8 29.5" fill="none" stroke="#1c1308" strokeWidth="2.2" />
          {/* Nožičky brýlí k uším */}
          <line x1="43.8" y1="29.5" x2="41" y2="30" stroke="#1c1308" strokeWidth="1.8" />
          <line x1="72.2" y1="29.5" x2="75" y2="30" stroke="#1c1308" strokeWidth="1.8" />

          {/* Záblesk lesku na sklíčku */}
          <line
            x1="47"
            y1="27"
            x2="51"
            y2="31"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="65"
            y1="27"
            x2="69"
            y2="31"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>

        {/* Oči za brýlemi (při zásahu poplašené) */}
        {isHit ? (
          <g>
            <circle cx="49" cy="30" r="2.8" fill="#1c1308" />
            <circle cx="67" cy="30" r="2.8" fill="#1c1308" />
            <ellipse cx="49" cy="24" rx="3" ry="1" fill="#1c1308" />
            <ellipse cx="67" cy="24" rx="3" ry="1" fill="#1c1308" />
          </g>
        ) : (
          <g className="anim-lada-blink">
            {/* Klidné pobožné oči s leskem */}
            <circle cx="49" cy="30" r="2.2" fill="#1c1308" />
            <circle cx="67" cy="30" r="2.2" fill="#1c1308" />
            <circle cx="50" cy="29" r="0.9" fill="#ffffff" />
            <circle cx="68" cy="29" r="0.9" fill="#ffffff" />
            {/* Obočí */}
            <path
              d="M45 23 Q49 21 53 23"
              fill="none"
              stroke="#6e5037"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M63 23 Q67 21 71 23"
              fill="none"
              stroke="#6e5037"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Laskavý úsměv pod nosem */}
        <path
          d={isHit ? "M52 42 Q58 37 64 42" : "M51 40 Q58 45 65 40"}
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Prokvétající šedé vlasy a kotlety */}
        <path
          d="M41 28 C38 32 39 37 42 38"
          fill="none"
          stroke="#8c8279"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M75 28 C78 32 77 37 74 38"
          fill="none"
          stroke="#8c8279"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Kostelnický sametový biretek / aksamitová čapka */}
      <g id="kostelnik-cap">
        <path
          d="M39 24 C40 10 76 10 77 24 Z"
          fill="#232d3b"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Prošívané švy biretku */}
        <path d="M58 11 L58 24" stroke="#12171f" strokeWidth="1.8" />
        <path d="M48 14 Q58 19 68 14" fill="none" stroke="#12171f" strokeWidth="1.8" />
        {/* Sametový knoflíček nahoře uprostřed */}
        <circle cx="58" cy="10" r="2.5" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.5" />
      </g>

      {/* Masivní mosazný kropáč (aspergillum) s prýštící svěcenou vodou v 5 fázích */}
      <g id="kostelnik-aspergillum">
        {/* Soustružená dřevěná rukojeť podle fází */}
        <line
          x1={
            attackFrame === 1
              ? "70"
              : attackFrame === 2
                ? "76"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "78"
                  : attackFrame === 4
                    ? "76"
                    : "78"
          }
          y1={
            attackFrame === 1
              ? "62"
              : attackFrame === 2
                ? "56"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "54"
                  : attackFrame === 4
                    ? "60"
                    : "62"
          }
          x2={
            attackFrame === 1
              ? "60"
              : attackFrame === 2
                ? "82"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "108"
                  : attackFrame === 4
                    ? "104"
                    : "98"
          }
          y2={
            attackFrame === 1
              ? "40"
              : attackFrame === 2
                ? "18"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "28"
                  : attackFrame === 4
                    ? "56"
                    : "46"
          }
          stroke="#7a461b"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <line
          x1={
            attackFrame === 1
              ? "70"
              : attackFrame === 2
                ? "76"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "78"
                  : attackFrame === 4
                    ? "76"
                    : "78"
          }
          y1={
            attackFrame === 1
              ? "62"
              : attackFrame === 2
                ? "56"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "54"
                  : attackFrame === 4
                    ? "60"
                    : "62"
          }
          x2={
            attackFrame === 1
              ? "60"
              : attackFrame === 2
                ? "82"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "108"
                  : attackFrame === 4
                    ? "104"
                    : "98"
          }
          y2={
            attackFrame === 1
              ? "40"
              : attackFrame === 2
                ? "18"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "28"
                  : attackFrame === 4
                    ? "56"
                    : "46"
          }
          stroke="#1c1308"
          strokeWidth="1"
        />

        {/* Mosazná kropící koule s děrováním */}
        <circle
          cx={
            attackFrame === 1
              ? "58"
              : attackFrame === 2
                ? "84"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "112"
                  : attackFrame === 4
                    ? "108"
                    : "102"
          }
          cy={
            attackFrame === 1
              ? "36"
              : attackFrame === 2
                ? "14"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "24"
                  : attackFrame === 4
                    ? "56"
                    : "42"
          }
          r="8"
          fill="#f5c63d"
          stroke="#1c1308"
          strokeWidth="2.8"
        />
        {/* Otvory v kropáči */}
        <circle
          cx={
            attackFrame === 1
              ? "58"
              : attackFrame === 2
                ? "84"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "112"
                  : attackFrame === 4
                    ? "108"
                    : "102"
          }
          cy={
            attackFrame === 1
              ? "36"
              : attackFrame === 2
                ? "14"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "24"
                  : attackFrame === 4
                    ? "56"
                    : "42"
          }
          r="1.5"
          fill="#a87b13"
        />

        {/* Svěcená voda a komický oblouk pro 3. a 4. fázi (Bác! a požehnání) */}
        {(attackFrame === 3 || attackFrame === 4 || (isAttacking && !attackFrame)) && (
          <g className="anim-comic-swoosh">
            <path
              d="M84 14 C106 18 126 38 116 66"
              fill="none"
              stroke="#60baff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M86 16 C104 20 120 38 114 62"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="118" cy="18" r="3.2" fill="#60baff" stroke="#1c1308" strokeWidth="1" />
            <circle cx="124" cy="30" r="2.8" fill="#ffd438" stroke="#1c1308" strokeWidth="1" />
            <circle cx="122" cy="46" r="2.4" fill="#60baff" stroke="#1c1308" strokeWidth="0.8" />
            <polygon
              points="120,20 122,25 127,25 123,28 125,33 120,30 115,33 117,28 113,25 118,25"
              fill="#ffd438"
              stroke="#1c1308"
              strokeWidth="1"
            />
          </g>
        )}
      </g>
    </svg>
  );
}

/* =========================================================================
 * 3. MOUDRÁ BYLINKÁŘKA (Lidový kroj, proutěný košík, heřmánek a horký odvar)
 * ========================================================================= */
function renderBylinkarkaSprite(
  isHit: boolean = false,
  isAttacking: boolean = false,
  attackFrame?: number,
) {
  return (
    <svg
      viewBox="0 0 120 130"
      className="w-full h-full drop-shadow-md"
      aria-label="Moudrá bylinkářka"
    >
      {/* Měkký stín na zemi */}
      <ellipse cx="58" cy="122" rx="38" ry="6.5" fill="#1c1308" opacity="0.28" />

      {/* Červené lidové střevíčky s černým lemem */}
      <g id="bylinkarka-shoes">
        <path
          d="M41 112 L38 116 C36 119 32 120 28 121 C25 122 26 124 30 124 C36 125 45 125 47 123 C48 121 47 115 46 112 Z"
          fill="#ad2f1d"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M65 112 L66 116 C67 119 71 120 75 121 C78 122 77 124 73 124 C67 125 58 125 56 123 C55 121 56 115 57 112 Z"
          fill="#ad2f1d"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Bohatá řasená zelená lidová sukně z poctivého sukna */}
      <g id="bylinkarka-skirt">
        <path
          d="M34 56 C26 80 22 106 44 112 C52 114 64 114 72 112 C94 106 90 80 82 56 Z"
          fill="#2b5e28"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Zlatavá folklórní stuha na lemu sukně */}
        <path
          d="M26 104 C40 114 76 114 90 104 L89 108 C75 118 41 118 27 108 Z"
          fill="#e8b938"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
      </g>

      {/* Sněhobílý vyšívaný plátěný fěrtoch (zástěra) s lidovými ornamenty */}
      <g id="bylinkarka-apron">
        <path
          d="M40 58 C38 84 40 108 58 108 C76 108 78 84 76 58 Z"
          fill="#fffcf5"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Lidové výšivky – červené srdíčko a tulipány */}
        <g id="apron-embroidery">
          {/* Centrální červený tulipán */}
          <path
            d="M58 84 C55 80 52 84 55 88 C58 91 58 91 58 91 C58 91 58 91 61 88 C64 84 61 80 58 84 Z"
            fill="#c72f1e"
          />
          <circle cx="58" cy="85" r="2.2" fill="#ffd438" />
          {/* Stonky a lístky */}
          <path d="M58 91 L58 100" stroke="#3a7532" strokeWidth="2" strokeLinecap="round" />
          <path d="M54 96 Q58 94 58 97" stroke="#3a7532" strokeWidth="1.8" fill="none" />
          <path d="M62 96 Q58 94 58 97" stroke="#3a7532" strokeWidth="1.8" fill="none" />
          {/* Folklórní modré a žluté tečky */}
          <circle cx="48" cy="88" r="2" fill="#2d6cb5" />
          <circle cx="68" cy="88" r="2" fill="#2d6cb5" />
          <circle cx="51" cy="98" r="1.5" fill="#ffd438" />
          <circle cx="65" cy="98" r="1.5" fill="#ffd438" />
          {/* Spodní červený ozdobný zubový lem */}
          <path
            d="M43 103 L46 106 L49 103 L52 106 L55 103 L58 106 L61 103 L64 106 L67 103 L70 106 L73 103"
            fill="none"
            stroke="#c72f1e"
            strokeWidth="1.5"
          />
        </g>
      </g>

      {/* Lněné rukávce (nabírané rukávy) a černá vyšívaná kordulka (vestička) se šněrováním */}
      <g id="bylinkarka-bodice">
        {/* Bílé rukávce */}
        <ellipse cx="33" cy="56" rx="9" ry="11" fill="#fffcf5" stroke="#1c1308" strokeWidth="3" />
        <ellipse cx="83" cy="56" rx="9" ry="11" fill="#fffcf5" stroke="#1c1308" strokeWidth="3" />

        {/* Sametová černá kordulka */}
        <path
          d="M44 48 C38 60 40 72 44 76 C52 78 64 78 72 76 C76 72 78 60 72 48 Z"
          fill="#1c1721"
          stroke="#1c1308"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Červené šněrování kordulky na prsou */}
        <line
          x1="52"
          y1="54"
          x2="64"
          y2="60"
          stroke="#d43722"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="64"
          y1="54"
          x2="52"
          y2="60"
          stroke="#d43722"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="52"
          y1="62"
          x2="64"
          y2="68"
          stroke="#d43722"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="64"
          y1="62"
          x2="52"
          y2="68"
          stroke="#d43722"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="52" cy="54" r="1.2" fill="#ffd438" />
        <circle cx="64" cy="54" r="1.2" fill="#ffd438" />
        <circle cx="52" cy="62" r="1.2" fill="#ffd438" />
        <circle cx="64" cy="62" r="1.2" fill="#ffd438" />
      </g>

      {/* Proutěný košík na levé ruce s léčivými bylinkami (heřmánek, mateřídouška, kapradí) */}
      <g id="bylinkarka-basket" className="anim-flower-bob">
        {/* Proutěné tělo košíku s výpletem */}
        <path
          d="M18 72 C16 90 28 96 38 94 C46 92 48 84 46 72 Z"
          fill="#b07b41"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Vzor výpletu košíku */}
        <line x1="22" y1="76" x2="42" y2="90" stroke="#875827" strokeWidth="1.8" />
        <line x1="28" y1="74" x2="44" y2="85" stroke="#875827" strokeWidth="1.8" />
        <line x1="42" y1="76" x2="22" y2="90" stroke="#875827" strokeWidth="1.8" />
        <line x1="44" y1="74" x2="28" y2="85" stroke="#875827" strokeWidth="1.8" />
        {/* Proutěné ucho košíku přes předloktí */}
        <path
          d="M22 72 C18 56 34 52 38 72"
          fill="none"
          stroke="#875827"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Svěží bylinky kypící z košíku */}
        <g id="herbs-in-basket">
          {/* Zelené lístky kapradí a jitrocele */}
          <path
            d="M20 66 Q16 54 22 50 Q24 58 26 66"
            fill="#4d8c38"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
          <path
            d="M30 68 Q32 52 38 48 Q38 58 36 68"
            fill="#4d8c38"
            stroke="#1c1308"
            strokeWidth="1.5"
          />

          {/* Fialové kvítky voňavé mateřídoušky */}
          <circle cx="20" cy="56" r="2.5" fill="#9c54b8" stroke="#1c1308" strokeWidth="1" />
          <circle cx="23" cy="53" r="2" fill="#b976d4" />
          <circle cx="36" cy="54" r="2.5" fill="#9c54b8" stroke="#1c1308" strokeWidth="1" />

          {/* Rozkvetlý heřmánek pravý s bílými lístky a žlutým středem */}
          <g id="chamomile-flower">
            <circle cx="28" cy="58" r="4.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
            <circle cx="28" cy="58" r="2.4" fill="#f4c23c" />
            {/* Okvětní lístky */}
            <circle cx="24" cy="57" r="1.5" fill="#ffffff" />
            <circle cx="32" cy="57" r="1.5" fill="#ffffff" />
            <circle cx="28" cy="54" r="1.5" fill="#ffffff" />
            <circle cx="28" cy="62" r="1.5" fill="#ffffff" />
          </g>

          {/* Třpytivý pyl léčivých bylinek */}
          <circle cx="30" cy="46" r="1.5" fill="#ffd438" className="anim-sparkle-twinkle" />
        </g>
      </g>

      {/* Kameninový koflík s horkým léčivým odvarem v pravé ruce v 5 fázích */}
      <g id="bylinkarka-mug">
        {/* Ruka držící hrnek podle fází */}
        <circle
          cx={
            attackFrame === 1
              ? "78"
              : attackFrame === 2
                ? "76"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "88"
                  : attackFrame === 4
                    ? "86"
                    : "82"
          }
          cy={
            attackFrame === 1
              ? "76"
              : attackFrame === 2
                ? "66"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "60"
                  : attackFrame === 4
                    ? "68"
                    : "74"
          }
          r="5.5"
          fill="#edd2b1"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        {/* Glazovaný kameninový hrnek */}
        <rect
          x={
            attackFrame === 1
              ? "78"
              : attackFrame === 2
                ? "76"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "90"
                  : attackFrame === 4
                    ? "86"
                    : "82"
          }
          y={
            attackFrame === 1
              ? "70"
              : attackFrame === 2
                ? "60"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "54"
                  : attackFrame === 4
                    ? "62"
                    : "68"
          }
          width="13"
          height="14"
          rx="2.5"
          fill="#8c5127"
          stroke="#1c1308"
          strokeWidth="2.4"
        />
        {/* Modrý lidový proužek na hrnku */}
        <line
          x1={
            attackFrame === 1
              ? "78"
              : attackFrame === 2
                ? "76"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "90"
                  : attackFrame === 4
                    ? "86"
                    : "82"
          }
          y1={
            attackFrame === 1
              ? "74"
              : attackFrame === 2
                ? "64"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "58"
                  : attackFrame === 4
                    ? "66"
                    : "72"
          }
          x2={
            attackFrame === 1
              ? "91"
              : attackFrame === 2
                ? "89"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "103"
                  : attackFrame === 4
                    ? "99"
                    : "95"
          }
          y2={
            attackFrame === 1
              ? "74"
              : attackFrame === 2
                ? "64"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "58"
                  : attackFrame === 4
                    ? "66"
                    : "72"
          }
          stroke="#4287f5"
          strokeWidth="2"
        />

        {/* Horká stoupající voňavá pára z bylinkového čaje */}
        <g id="herbal-steam">
          <path
            d={
              attackFrame === 3 || (isAttacking && !attackFrame)
                ? "M94 50 Q90 38 98 28"
                : "M86 66 Q83 56 89 48"
            }
            fill="none"
            stroke="#f5ede1"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="anim-herbal-steam-1"
          />
          <path
            d={
              attackFrame === 3 || (isAttacking && !attackFrame)
                ? "M100 48 Q104 36 98 26"
                : "M91 64 Q95 54 89 44"
            }
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            className="anim-herbal-steam-2"
          />
        </g>

        {/* Šplouchající horký odvar a kvítky heřmánku pro 3. a 4. fázi (Bác!) */}
        {(attackFrame === 3 || attackFrame === 4 || (isAttacking && !attackFrame)) && (
          <g className="anim-comic-swoosh">
            <path
              d="M96 46 C112 32 126 40 120 68"
              fill="none"
              stroke="#e69818"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <path
              d="M98 48 C112 36 122 42 118 64"
              fill="none"
              stroke="#fff2b2"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Létající kvítky heřmánku */}
            <g transform="translate(114, 32)">
              <circle cx="0" cy="0" r="4.2" fill="#ffffff" stroke="#1c1308" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="1.8" fill="#f4c23c" />
            </g>
            <g transform="translate(122, 50)">
              <circle cx="0" cy="0" r="3.6" fill="#ffffff" stroke="#1c1308" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="1.5" fill="#f4c23c" />
            </g>
            <circle cx="108" cy="24" r="2.2" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
            <polygon
              points="114,24 116,28 121,28 117,31 119,35 114,32 110,35 112,31 108,28 113,28"
              fill="#e63920"
              stroke="#1c1308"
              strokeWidth="1"
            />
          </g>
        )}
      </g>

      {/* Červený turecký šátek (plachetka) kryjící hlavu zezadu a po stranách */}
      <g id="bylinkarka-scarf-hood">
        <path
          d="M35 34 C32 12 84 12 81 34 C83 45 76 52 58 52 C40 52 33 45 35 34 Z"
          fill="#c72f1e"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Tradiční bílé a zlaté lidové puntíky po obvodu šátku */}
        <circle cx="48" cy="18" r="1.8" fill="#ffffff" />
        <circle cx="68" cy="18" r="1.8" fill="#ffffff" />
        <circle cx="58" cy="14" r="2" fill="#ffd438" />
        <circle cx="39" cy="25" r="1.8" fill="#ffffff" />
        <circle cx="77" cy="25" r="1.8" fill="#ffffff" />
        <circle cx="36" cy="34" r="1.8" fill="#ffffff" />
        <circle cx="80" cy="34" r="1.8" fill="#ffffff" />
        <circle cx="38" cy="43" r="1.8" fill="#ffffff" />
        <circle cx="78" cy="43" r="1.8" fill="#ffffff" />
      </g>

      {/* Hlava, laskavá babičkovská tvář s jablíčkovými tvářemi a úsměvem */}
      <g id="bylinkarka-head">
        {/* Růžolící kulatý obličej */}
        <circle cx="58" cy="34" r="14.5" fill="#edd2b1" stroke="#1c1308" strokeWidth="3.2" />

        {/* Stříbrobílé vlasy sčesané z čela vykukující zpod šátku */}
        <path
          d="M46 25 Q58 20 70 25"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M49 24 Q58 21 67 24"
          fill="none"
          stroke="#dedede"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Červená jablíčka na tvářích */}
        <circle cx="46" cy="38" r="4.5" fill="#e3563b" opacity="0.75" />
        <circle cx="70" cy="38" r="4.5" fill="#e3563b" opacity="0.75" />

        {/* Drobný kulatý nosík s odleskem */}
        <circle cx="58" cy="35" r="3.6" fill="#e89880" stroke="#1c1308" strokeWidth="2" />
        <circle cx="56.5" cy="33.8" r="1" fill="#ffffff" opacity="0.6" />

        {/* Laskavé smějící se oči s vějířky vrásek */}
        {isHit ? (
          <g>
            <path
              d="M47 31 Q51 28 55 31"
              fill="none"
              stroke="#1c1308"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M61 31 Q65 28 69 31"
              fill="none"
              stroke="#1c1308"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <g className="anim-lada-blink">
            {/* Oči se šibalskými jiskřičkami */}
            <circle cx="50" cy="30" r="2.2" fill="#1c1308" />
            <circle cx="66" cy="30" r="2.2" fill="#1c1308" />
            <circle cx="51" cy="29" r="0.9" fill="#ffffff" />
            <circle cx="67" cy="29" r="0.9" fill="#ffffff" />
            {/* Jemné vějířky smíchu u očí */}
            <path
              d="M43 29 L46 30 M43 32 L46 31"
              stroke="#a36e45"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M73 29 L70 30 M73 32 L70 31"
              stroke="#a36e45"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Dobrosrdečný babičkovský úsměv a důlky ve tvářích */}
        <path
          d={isHit ? "M52 43 Q58 39 64 43" : "M51 41 Q58 46 65 41"}
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M49 40 Q50 42 49 43"
          stroke="#a36e45"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M67 40 Q66 42 67 43"
          stroke="#a36e45"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Červený uzel šátku pod bradičkou s vlajícími cípy a bílými puntíky */}
      <g id="bylinkarka-scarf-knot" className="anim-scarf-wave">
        {/* Uzel šátku */}
        <circle cx="58" cy="49" r="3.4" fill="#a82213" stroke="#1c1308" strokeWidth="2.2" />
        {/* Levý cíp šátku */}
        <polygon
          points="56,50 48,60 55,57"
          fill="#c72f1e"
          stroke="#1c1308"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Pravý cíp šátku */}
        <polygon
          points="60,50 68,60 61,57"
          fill="#c72f1e"
          stroke="#1c1308"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Bílé lidové puntíky na cípech šátku */}
        <circle cx="52" cy="56" r="1.2" fill="#ffffff" />
        <circle cx="64" cy="56" r="1.2" fill="#ffffff" />
      </g>
    </svg>
  );
}

/* =========================================================================
 * 4. BABIČKA & MLADÁ BARUNKA (Magdalena Novotná s vřetánkem a bystrá Barunka)
 * ========================================================================= */
function renderBabickaSprite(
  isHit: boolean = false,
  isAttacking: boolean = false,
  attackFrame?: number,
) {
  return (
    <svg
      viewBox="0 0 120 130"
      className="w-full h-full drop-shadow-md"
      aria-label="Babička a mladá Barunka"
    >
      {/* Měkký stín na zemi pro obě postavy */}
      <ellipse cx="56" cy="123" rx="44" ry="6.8" fill="#1c1308" opacity="0.28" />

      {/* ===================================================================
       * A. BABIČKA (Magdalena Novotná)
       * =================================================================== */}
      {/* 1. Pohodlné plstěné střevíce a vlněné punčochy */}
      <g id="babicka-shoes">
        <path
          d="M32 113 L29 117 C27 120 23 121 19 122 C17 123 18 125 22 125 C28 125 36 125 38 123 C39 121 38 116 37 113 Z"
          fill="#2b1a10"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M48 113 L47 117 C46 120 44 122 41 123 C39 124 40 125 44 125 C50 125 56 124 57 122 C58 120 56 116 54 113 Z"
          fill="#2b1a10"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Světlé vlněné ponožky */}
        <path d="M30 113 L37 113" stroke="#f4ede0" strokeWidth="3" strokeLinecap="round" />
        <path d="M47 113 L54 113" stroke="#f4ede0" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* 2. Dlouhá řasená sukně (tmavá vínově-hnědá s poctivými záhyby) */}
      <g id="babicka-skirt">
        <path
          d="M26 68 Q18 90 20 116 Q39 120 58 118 Q59 90 54 68 Z"
          fill="#4a2228"
          stroke="#1c1308"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Záhyby na sukni */}
        <path
          d="M26 84 Q27 100 27 115"
          stroke="#1c1308"
          strokeWidth="1.8"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M52 84 Q52 100 51 115"
          stroke="#1c1308"
          strokeWidth="1.8"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* 3. Velká bílá babičkovská zástěra s modrotiskovým lemem */}
      <g id="babicka-apron">
        <path
          d="M28 69 C36 69 46 69 52 69 C55 86 54 104 53 115 C44 117 35 117 26 115 C25 104 25 86 28 69 Z"
          fill="#fdfaf3"
          stroke="#1c1308"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        {/* Modrý dekorativní lidový lem na spodku zástěry */}
        <path d="M27 110 Q39 112 52 110" stroke="#2a5280" strokeWidth="2.2" fill="none" />
        <path
          d="M28 112 Q39 114 51 112"
          stroke="#2a5280"
          strokeWidth="1.2"
          strokeDasharray="2,2"
          fill="none"
        />
        {/* Kapsář na zástěře s vykukujícím kapesníčkem */}
        <rect
          x="34"
          y="86"
          width="13"
          height="13"
          rx="2"
          fill="#f4ecdc"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        <path d="M37 86 L41 81 L44 86" fill="#c72f1e" stroke="#1c1308" strokeWidth="1.2" />
      </g>

      {/* 4. Tmavomodrá kordulka (vestička) se šněrováním a bílé nabírané rukávy */}
      <g id="babicka-bodice">
        {/* Babiččina košilka */}
        <path
          d="M26 50 C23 54 22 62 25 68 C35 70 45 70 54 68 C57 62 56 54 53 50 Z"
          fill="#1d385c"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Bílá plátěná náprsenka */}
        <path d="M33 50 L46 50 L44 65 L35 65 Z" fill="#ffffff" stroke="#1c1308" strokeWidth="1.6" />
        {/* Červené šněrování vestičky */}
        <path
          d="M36 54 L43 58 M43 54 L36 58 M36 60 L43 64 M43 60 L36 64"
          stroke="#c72f1e"
          strokeWidth="1.5"
        />
      </g>

      {/* 5. Pravá ruka s vřetánkem nebo bochníkem chleba */}
      <g id="babicka-spindle-arm" className={isAttacking ? "anim-attack" : ""}>
        {/* Rukáv bílé košilky s řasením */}
        <path
          d={
            attackFrame === 1
              ? "M25 54 Q15 50 17 62 Q23 66 28 60 Z"
              : attackFrame === 2
                ? "M25 54 Q12 40 18 36 Q25 44 28 54 Z"
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? "M25 54 Q10 46 16 38 Q25 44 28 54 Z"
                  : "M25 54 Q16 62 18 72 Q24 73 28 62 Z"
          }
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="2.6"
        />
        {/* Zápěstí a ruka */}
        <circle
          cx={
            attackFrame === 1
              ? 17
              : attackFrame === 2
                ? 18
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? 16
                  : 18
          }
          cy={
            attackFrame === 1
              ? 64
              : attackFrame === 2
                ? 34
                : attackFrame === 3 || (isAttacking && !attackFrame)
                  ? 36
                  : 74
          }
          r="4.2"
          fill="#ffd2b8"
          stroke="#1c1308"
          strokeWidth="2"
        />

        {/* Dřevěné vřetánko s vlnou */}
        <g id="babicka-spindle">
          <line
            x1={
              attackFrame === 1
                ? 17
                : attackFrame === 2
                  ? 18
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 14
                    : 18
            }
            y1={
              attackFrame === 1
                ? 52
                : attackFrame === 2
                  ? 18
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 20
                    : 60
            }
            x2={
              attackFrame === 1
                ? 17
                : attackFrame === 2
                  ? 18
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 18
                    : 18
            }
            y2={
              attackFrame === 1
                ? 78
                : attackFrame === 2
                  ? 48
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 54
                    : 88
            }
            stroke="#6e4624"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Závažíčko / vřeteno z hruškového dřeva */}
          <ellipse
            cx={
              attackFrame === 1
                ? 17
                : attackFrame === 2
                  ? 18
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 16
                    : 18
            }
            cy={
              attackFrame === 1
                ? 68
                : attackFrame === 2
                  ? 38
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 42
                    : 77
            }
            rx="5.5"
            ry="3.2"
            fill="#d4a359"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          {/* Navinutá bílá ovečková vlna */}
          <ellipse
            cx={
              attackFrame === 1
                ? 17
                : attackFrame === 2
                  ? 18
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 16
                    : 18
            }
            cy={
              attackFrame === 1
                ? 64
                : attackFrame === 2
                  ? 33
                  : attackFrame === 3 || (isAttacking && !attackFrame)
                    ? 37
                    : 72
            }
            rx="4.2"
            ry="5.5"
            fill="#f7f3eb"
            stroke="#1c1308"
            strokeWidth="1.6"
          />
        </g>

        {/* Zlatá nitka osudu a jiskry při akci / útoku */}
        {(attackFrame === 3 || attackFrame === 4 || (isAttacking && !attackFrame)) && (
          <g className="anim-comic-swoosh">
            <path
              d="M16 38 C-4 28 6 4 36 12 C52 16 66 32 64 50"
              fill="none"
              stroke="#ffd438"
              strokeWidth="2.8"
              strokeDasharray="4,2"
            />
            <path d="M18 42 C-2 32 8 8 34 16" fill="none" stroke="#ffffff" strokeWidth="1.4" />
            {/* Jiskřivé hvězdičky */}
            <circle cx="8" cy="18" r="2.8" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
            <circle cx="38" cy="10" r="3.2" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
            <polygon
              points="24,14 26,19 31,19 27,22 29,27 24,24 19,27 21,22 17,19 22,19"
              fill="#ffffff"
              stroke="#1c1308"
              strokeWidth="0.8"
            />
          </g>
        )}
      </g>

      {/* 6. Levá ruka s čerstvým pecnem chleba a solničkou */}
      <g id="babicka-bread-arm">
        <path
          d="M52 54 Q58 64 54 74 Q48 76 46 66 Z"
          fill="#ffffff"
          stroke="#1c1308"
          strokeWidth="2.6"
        />
        <circle cx="52" cy="74" r="4" fill="#ffd2b8" stroke="#1c1308" strokeWidth="2" />
        {/* Voňavý pecen chleba s křupavou kůrkou a křížkem */}
        <ellipse
          cx="50"
          cy="79"
          rx="8.5"
          ry="6"
          fill="#a8602a"
          stroke="#1c1308"
          strokeWidth="2.2"
        />
        <ellipse cx="50" cy="78" rx="7" ry="4.5" fill="#c4793d" />
        {/* Naříznutý křížek na bochníku */}
        <line
          x1="47"
          y1="78"
          x2="53"
          y2="78"
          stroke="#6e3c15"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="75"
          x2="50"
          y2="81"
          stroke="#6e3c15"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Dřevěná vyřezávaná solnička */}
        <rect
          x="42"
          y="73"
          width="5"
          height="7"
          rx="1.5"
          fill="#f4ebd0"
          stroke="#1c1308"
          strokeWidth="1.4"
        />
        <circle cx="44.5" cy="74" r="0.8" fill="#1c1308" />
      </g>

      {/* 7. Babiččina hlava, bílý čepec a laskavá tvář */}
      <g id="babicka-head">
        {/* Bílý šátek - zadní lem */}
        <path
          d="M24 38 C22 22 34 14 42 14 C52 14 62 22 60 38 C59 48 53 54 42 54 C31 54 25 48 24 38 Z"
          fill="#fbf7ee"
          stroke="#1c1308"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Sněhobílé vlasy s pěšinkou uprostřed */}
        <path
          d="M29 32 Q42 27 55 32 Q54 39 42 37 Q30 39 29 32 Z"
          fill="#f0ece6"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        {/* Laskavá kulatá tvář */}
        <ellipse
          cx="42"
          cy="37"
          rx="11.5"
          ry="10"
          fill="#ffd2b8"
          stroke="#1c1308"
          strokeWidth="2.4"
        />
        {/* Růžové zdravé tvářičky */}
        <circle cx="35" cy="40" r="3.2" fill="#f59c8e" opacity="0.65" />
        <circle cx="49" cy="40" r="3.2" fill="#f59c8e" opacity="0.65" />

        {/* Oči a laskavé vrásky */}
        {isHit ? (
          <g>
            <circle cx="37" cy="35" r="2.8" fill="#ffffff" stroke="#1c1308" strokeWidth="1.8" />
            <circle cx="37" cy="35" r="1.2" fill="#1c1308" />
            <circle cx="47" cy="35" r="2.8" fill="#ffffff" stroke="#1c1308" strokeWidth="1.8" />
            <circle cx="47" cy="35" r="1.2" fill="#1c1308" />
          </g>
        ) : (
          <g>
            {/* Usměvavé babičkovské oči ve tvaru měsíčků */}
            <path
              d="M34 35 Q37 32 40 35"
              stroke="#1c1308"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M44 35 Q47 32 50 35"
              stroke="#1c1308"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Drobné vrásky štěstí u očí */}
            <path
              d="M33 34 L31 35 M33 36 L31 37"
              stroke="#b07d57"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M51 34 L53 35 M51 36 L53 37"
              stroke="#b07d57"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Ušlechtilý babičkovský nosík */}
        <path
          d="M42 34 Q43 38 41 39"
          stroke="#1c1308"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Hřejivý babiččin úsměv */}
        <path
          d={isHit ? "M38 44 Q42 41 46 44" : "M37 42 Q42 47 47 42"}
          fill="none"
          stroke="#1c1308"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Uzel bílého šátku pod bradou s cípy */}
        <g className="anim-scarf-wave">
          <circle cx="42" cy="49" r="3" fill="#eae4d8" stroke="#1c1308" strokeWidth="2" />
          <polygon points="40,50 34,58 39,56" fill="#fbf7ee" stroke="#1c1308" strokeWidth="1.8" />
          <polygon points="44,50 50,58 45,56" fill="#fbf7ee" stroke="#1c1308" strokeWidth="1.8" />
        </g>
      </g>

      {/* ===================================================================
       * B. MLADÁ BARUNKA (Barunka Panklová po boku babičky)
       * =================================================================== */}
      <g id="young-barunka">
        {/* 1. Malé černé botičky s bílými punčoškami */}
        <g id="barunka-shoes">
          <path
            d="M82 115 L80 118 C79 120 76 122 73 122 C71 123 72 124 75 124 C80 124 85 124 86 122 C87 121 86 117 85 115 Z"
            fill="#1c1308"
            stroke="#1c1308"
            strokeWidth="2"
          />
          <path
            d="M93 115 L92 118 C91 120 89 122 87 122 C86 123 87 124 90 124 C94 124 98 124 99 122 C100 121 99 117 98 115 Z"
            fill="#1c1308"
            stroke="#1c1308"
            strokeWidth="2"
          />
          {/* Bílé punčošky */}
          <path d="M81 114 L85 114" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M92 114 L97 114" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 2. Dívčí žlutá louková sukýnka s květinkami a bílou zástěrkou */}
        <g id="barunka-dress">
          <path
            d="M74 84 Q68 98 70 116 Q85 118 99 116 Q101 98 94 84 Z"
            fill="#f2c84b"
            stroke="#1c1308"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Jemná bílá dětská zástěrka */}
          <path
            d="M76 85 C82 85 88 85 92 85 C94 95 93 107 92 114 C86 115 80 115 75 114 C74 107 74 95 76 85 Z"
            fill="#ffffff"
            stroke="#1c1308"
            strokeWidth="2"
          />
          {/* Červené kvítky na lemu šatů */}
          <circle cx="73" cy="113" r="1.4" fill="#c72f1e" />
          <circle cx="96" cy="113" r="1.4" fill="#c72f1e" />
        </g>

        {/* 3. Modrá dětská vestička a bílá halenka s nabíranými rukávky */}
        <g id="barunka-bodice">
          <path
            d="M75 70 C72 74 72 80 74 84 C81 85 87 85 94 84 C96 80 96 74 93 70 Z"
            fill="#3a75a4"
            stroke="#1c1308"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M80 70 L88 70 L86 81 L82 81 Z"
            fill="#ffffff"
            stroke="#1c1308"
            strokeWidth="1.2"
          />
        </g>

        {/* 4. Ručky: jedna drží košík s jablíčky, druhá ukazuje nebo mává */}
        <g id="barunka-basket-arm">
          {/* Pravá ručka drží proutěný košíček */}
          <path
            d="M74 72 Q68 78 70 85"
            stroke="#ffffff"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="70" cy="85" r="3" fill="#ffd2b8" stroke="#1c1308" strokeWidth="1.5" />
          {/* Malý proutěný košíček */}
          <ellipse
            cx="68"
            cy="90"
            rx="6.5"
            ry="4.5"
            fill="#ba8c53"
            stroke="#1c1308"
            strokeWidth="1.8"
          />
          {/* Oblouk držadla košíku */}
          <path d="M63 88 Q68 82 73 88" stroke="#8a5e2f" strokeWidth="1.5" fill="none" />
          {/* Červená jablíčka v košíku */}
          <circle cx="66" cy="88" r="2.2" fill="#c72f1e" />
          <circle cx="70" cy="88" r="2" fill="#c72f1e" />
          <circle cx="68" cy="86" r="1.8" fill="#e8982c" />

          {/* Levá ručka - zvídavě ukazuje nebo mává */}
          <path
            d={isAttacking ? "M94 72 Q104 68 106 62" : "M94 72 Q100 78 96 84"}
            stroke="#ffffff"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={isAttacking ? 107 : 96}
            cy={isAttacking ? 61 : 85}
            r="3"
            fill="#ffd2b8"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
        </g>

        {/* 5. Barunčina hlavička, zvídavá tvář a copy s červenými mašlemi */}
        <g id="barunka-head">
          {/* Husté kaštanově hnědé vlásky */}
          <circle cx="84" cy="62" r="10" fill="#543319" stroke="#1c1308" strokeWidth="2.6" />
          {/* Dívčí tvářička */}
          <ellipse
            cx="84"
            cy="64"
            rx="8.5"
            ry="7.5"
            fill="#ffd2b8"
            stroke="#1c1308"
            strokeWidth="2"
          />
          {/* Růžový ruměnec děvčátka */}
          <circle cx="79" cy="66" r="2.6" fill="#f59c8e" opacity="0.75" />
          <circle cx="89" cy="66" r="2.6" fill="#f59c8e" opacity="0.75" />

          {/* Velké bystré zvídavé očička */}
          <circle cx="80.5" cy="63" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.4" />
          <circle cx="81" cy="63" r="1.1" fill="#2d170b" />
          <circle cx="87.5" cy="63" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.4" />
          <circle cx="88" cy="63" r="1.1" fill="#2d170b" />
          {/* Jiskřička v očích */}
          <circle cx="81.4" cy="62.4" r="0.4" fill="#ffffff" />
          <circle cx="88.4" cy="62.4" r="0.4" fill="#ffffff" />

          {/* Drobný zvědavý nosík a usměvavá pusinka */}
          <path d="M84 63 Q84.5 65 83.5 66" stroke="#1c1308" strokeWidth="1.2" fill="none" />
          <path
            d="M81.5 68 Q84 71 86.5 68"
            stroke="#1c1308"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Dva pletené hnědé copy splývající po ramenou */}
          {/* Levý cop */}
          <path
            d="M76 66 Q72 74 74 83 Q73 89 74 93"
            stroke="#543319"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Červená mašle na konci levého copu */}
          <circle cx="74" cy="94" r="2" fill="#c72f1e" stroke="#1c1308" strokeWidth="1" />
          <polygon points="72,94 67,91 68,97" fill="#c72f1e" stroke="#1c1308" strokeWidth="0.8" />
          <polygon points="76,94 81,91 80,97" fill="#c72f1e" stroke="#1c1308" strokeWidth="0.8" />

          {/* Pravý cop s mašlí */}
          <path
            d="M92 66 Q98 74 97 84 Q98 90 97 94"
            stroke="#543319"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="97" cy="95" r="2" fill="#c72f1e" stroke="#1c1308" strokeWidth="1" />
          <polygon points="95,95 90,92 91,98" fill="#c72f1e" stroke="#1c1308" strokeWidth="0.8" />
          <polygon points="99,95 104,92 103,98" fill="#c72f1e" stroke="#1c1308" strokeWidth="0.8" />
        </g>
      </g>
    </svg>
  );
}
