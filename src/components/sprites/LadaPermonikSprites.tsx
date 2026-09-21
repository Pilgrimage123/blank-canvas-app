import React from "react";

/**
 * Autentické Ladovské sprity pro rodinu PERMONÍKŮ (Josef Lada: Bubáci a hastrmani, České pohádky).
 *
 * Podle zadání:
 * - Všichni jsou docela malí (trpasličí zavalité proporce, buclaté tváře, krátké nožky v poctivých botách).
 * - Dlouhá špičatá čapka různých pastelových barev (každý člen má svou svébytnou pastelovou barvu):
 *   1. Stádium 0 (Důlní permoníček ze štoly): Pastelová pomněnkově modrá (#93c5fd / #bfdbfe)
 *   2. Stádium 1 (Havířský permoník s kladívkem): Pastelová meruňkovo-korálová (#fca5a5 / #fdba74)
 *   3. Stádium 2 (Skalní permoník s kahancem): Pastelová šalvějově zelená (#86efac / #a7f3d0)
 *   4. Stádium 3 (Starohorský důlní mistr): Pastelová levandulově šeříková (#c4b5fd / #ddd6fe)
 * - Poctivý kovaný KRUMPÁČ 19. století (topůrko ze dřeva, ocelová čepel s hrotem a klínem).
 * - ŽÁDNÉ VÝBUŠNINY (žádný dynamit, bomby ani moderní prach – pouze poctivé nářadí, flekl, kahanec a dýmka).
 * - Ladovský styl: silná inkoustová kontura (#1c1308, strokeWidth 3–4), kulaté tvary, buclatý červený nos,
 *   folklórní havířská zástěra (flekl) a havířská kazajka z 19. století.
 */

export interface PermonikSpriteProps {
  stage?: number;
  isHit?: boolean;
  isAttacking?: boolean;
  variantName?: string;
  className?: string;
}

export function renderLadaPermonikSprite(
  stage: number = 2,
  isHit: boolean = false,
  isAttacking: boolean = false,
  variantName?: string,
): React.ReactNode {
  let resolvedStage = Math.max(0, Math.min(3, stage));

  if (variantName) {
    const vn = variantName.toLowerCase();
    if (vn.includes("ze štoly") || vn.includes("permoníček") || vn.includes("permonicek")) {
      resolvedStage = 0;
    } else if (vn.includes("s kladívkem") || vn.includes("kladivk")) {
      resolvedStage = 1;
    } else if (vn.includes("s kahancem") || vn.includes("skalní")) {
      resolvedStage = 2;
    } else if (vn.includes("mistr") || vn.includes("starohorský") || vn.includes("starohorsky")) {
      resolvedStage = 3;
    }
  }

  switch (resolvedStage) {
    case 0:
      return renderDulniPermonicek(isHit, isAttacking);
    case 1:
      return renderHavirskyPermonik(isHit, isAttacking);
    case 2:
    default:
      return renderSkalniPermonik(isHit, isAttacking);
    case 3:
      return renderDulniMistr(isHit, isAttacking);
  }
}

/* =========================================================================
 * 1. STÁDIUM 0: DŮLNÍ PERMONÍČEK ZE ŠTOLY (Nejmenší učeň)
 * - Velmi malý, roztomilý skřítek bez vousů, s pihami a růžovými tvářičkami
 * - Dlouhá špičatá čapka: pastelová blankytná / pomněnkově modrá (#93c5fd) s rolničkou
 * - Menší učeňský krumpáček s jasanovým topůrkem
 * - Režná havířská halena, malý kožený flekl, krystal křemene u nohou
 * ========================================================================= */
function renderDulniPermonicek(isHit: boolean, isAttacking: boolean): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Důlní permoníček ze štoly"
    >
      <defs>
        <radialGradient id="permo0-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Kamenná drť a stín pod nožkami */}
      <ellipse cx="60" cy="112" rx="30" ry="5.5" fill="#1c1308" opacity="0.35" />
      {/* Třpytivý křemenný krystal v podzemí */}
      <polygon points="20,111 23,103 26,111" fill="#bae6fd" stroke="#1c1308" strokeWidth="1.5" />
      <polygon points="24,112 28,100 32,112" fill="#e0f2fe" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="28" cy="100" r="1.5" fill="#ffffff" />

      {/* Krátké zavalité nožky v učeňských kožených botkách */}
      <g>
        {/* Levá botka */}
        <path
          d="M46 92 L42 108 L52 109 L53 92"
          fill="#5c3e21"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <ellipse
          cx="46"
          cy="108"
          rx="6.5"
          ry="3"
          fill="#3e2714"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        {/* Pravá botka */}
        <path
          d="M66 92 L67 108 L78 109 L74 92"
          fill="#5c3e21"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <ellipse
          cx="73"
          cy="108"
          rx="6.5"
          ry="3"
          fill="#3e2714"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
      </g>

      {/* Malé buclaté tělíčko ve světlé lněné kazajce */}
      <path
        d="M42 62 C38 74 39 92 48 94 C57 95 63 95 72 94 C81 92 82 74 78 62 Z"
        fill="#e2e8f0"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Učeňská kožená zástěrka (flekl) */}
      <path
        d="M47 70 C46 86 52 92 60 92 C68 92 74 86 73 70 Z"
        fill="#854d0e"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Kapsička s kouskem bílé křídy na značení štoly */}
      <rect
        x="56"
        y="74"
        width="8"
        height="8"
        rx="2"
        fill="#a16207"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <rect
        x="58"
        y="71"
        width="3"
        height="5"
        rx="1"
        fill="#ffffff"
        stroke="#1c1308"
        strokeWidth="1.2"
      />

      {/* DROBNÝ UČEŇSKÝ KRUMPÁČEK (světlé jasanové topůrko, kované železo - ŽÁDNÉ VÝBUŠNINY) */}
      <g
        transform={
          isAttacking
            ? "rotate(-25 80 75) translate(4 -6)"
            : isHit
              ? "rotate(20 80 75) translate(-4 3)"
              : "rotate(0 80 75)"
        }
      >
        {/* Dřevěná násada krumpáčku */}
        <line
          x1="72"
          y1="58"
          x2="94"
          y2="104"
          stroke="#ca8a04"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="72"
          y1="58"
          x2="94"
          y2="104"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
          className="opacity-40"
        />
        {/* Železná kovaná oboustranná hlavice krumpáče (zahnutá špička a plochý sekáček) */}
        <path
          d="M62 52 Q72 58 84 66 L83 62 Q72 55 64 49 Z"
          fill="#94a3b8"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Kovová objímka se zpevňujícím nýtem */}
        <rect
          x="71"
          y="57"
          width="5"
          height="4"
          rx="1"
          fill="#cbd5e1"
          stroke="#1c1308"
          strokeWidth="1.8"
        />
        <circle cx="73.5" cy="59" r="0.8" fill="#1c1308" />
      </g>

      {/* Ručky držící krumpáček */}
      <circle cx="71" cy="65" r="4.5" fill="#fed7aa" stroke="#1c1308" strokeWidth="2.2" />
      <circle cx="77" cy="74" r="4" fill="#fed7aa" stroke="#1c1308" strokeWidth="2" />

      {/* Levá zvědavě zdvižená ručka */}
      <path
        d="M43 65 Q33 66 31 72"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="31" cy="72" r="4" fill="#fed7aa" stroke="#1c1308" strokeWidth="2.2" />

      {/* Hlava permoníčka - mladá, buclatá, bez vousů */}
      <circle cx="60" cy="46" r="16" fill="#fed7aa" stroke="#1c1308" strokeWidth="3.5" />

      {/* Červené tvářičky a zvídavé pihy od uhelného prachu */}
      <circle cx="49" cy="50" r="3.5" fill="#f87171" opacity="0.6" />
      <circle cx="71" cy="50" r="3.5" fill="#f87171" opacity="0.6" />
      <circle cx="51" cy="46" r="0.7" fill="#5c3e21" />
      <circle cx="69" cy="46" r="0.7" fill="#5c3e21" />

      {/* Kulatý knoflíkový nosík */}
      <circle cx="60" cy="48" r="4" fill="#fb923c" stroke="#1c1308" strokeWidth="2" />

      {/* Velká roztomilá černá kukadla se stříbrným leskem */}
      <ellipse cx="53" cy="42" rx="3" ry="3.5" fill="#1c1308" />
      <circle cx="54" cy="41" r="1.2" fill="#ffffff" />
      <ellipse cx="67" cy="42" rx="3" ry="3.5" fill="#1c1308" />
      <circle cx="68" cy="41" r="1.2" fill="#ffffff" />

      {/* Veselý zvědavý úsměv permoníčka */}
      <path
        d="M55 54 Q60 58 65 54"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* DLOUHÁ ŠPIČATÁ ČAPKA: PASTELOVÁ POMNĚNKOVĚ MODRÁ (#93c5fd / #bae6fd) */}
      {/* Ozdobný ohrnutý lem čapky */}
      <ellipse cx="60" cy="36" rx="17" ry="5.5" fill="#bfdbfe" stroke="#1c1308" strokeWidth="3" />

      {/* Vlající dlouhé špičaté tělo čapky spadající s hravým záhybem vpravo */}
      <path
        d="M45 35 Q40 18 58 10 Q78 4 84 15 Q92 26 95 38 Q88 38 82 30 Q74 18 64 18 Q55 20 50 35 Z"
        fill="#93c5fd"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Měkký pastelový záhyb látky */}
      <path
        d="M60 14 Q74 13 80 24"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Dřevěná rolnička / bambulka na samém špičatém konci čapky */}
      <circle cx="95" cy="40" r="4" fill="#facc15" stroke="#1c1308" strokeWidth="2" />
      <circle cx="95" cy="40" r="1.2" fill="#a16207" />
    </svg>
  );
}

/* =========================================================================
 * 2. STÁDIUM 1: HAVÍŘSKÝ PERMONÍK S KLADÍVKEM A KRUMPÁČEM (Pracovitý tovaryš)
 * - Svalnatější trpaslík s pěstěným zrzavo-hnědým knírem a odhodlaným pohledem
 * - Dlouhá špičatá čapka: pastelová meruňkovo-korálová (#fca5a5 / #fdba74)
 * - Poctivý pracovní oboustranný kovaný krumpáč v pohotovostním nápřahu
 * - Šedivá havířská vesta, široký řemen, kožený flekl se zavěšeným želízkem
 * ========================================================================= */
function renderHavirskyPermonik(isHit: boolean, isAttacking: boolean): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Havířský permoník"
    >
      {/* Stín a kamenná hromádka */}
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#1c1308" opacity="0.4" />
      <circle cx="28" cy="111" r="2.5" fill="#78716c" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="34" cy="110" r="3.5" fill="#a8a29e" stroke="#1c1308" strokeWidth="1.5" />

      {/* Pevné havířské kožené škorně */}
      <g>
        <path
          d="M42 90 L37 109 L50 110 L52 90"
          fill="#44403c"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="43"
          cy="109"
          rx="8"
          ry="3.5"
          fill="#292524"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <path
          d="M68 90 L70 109 L83 110 L78 90"
          fill="#44403c"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="77"
          cy="109"
          rx="8"
          ry="3.5"
          fill="#292524"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
      </g>

      {/* Havířský kabátec v petrolejově šedé */}
      <path
        d="M38 58 C34 72 36 92 46 94 C56 96 66 96 76 94 C86 92 86 72 82 58 Z"
        fill="#475569"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Tradiční havířská zástěra (flekl) z tmavé volské usně */}
      <path
        d="M44 68 C42 88 48 94 60 94 C72 94 78 88 76 68 Z"
        fill="#713f12"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Široký kožený řemen s mosaznou přezkou */}
      <rect
        x="42"
        y="66"
        width="36"
        height="6"
        rx="1.5"
        fill="#451a03"
        stroke="#1c1308"
        strokeWidth="2.2"
      />
      <rect
        x="56"
        y="65"
        width="8"
        height="8"
        rx="1.5"
        fill="#facc15"
        stroke="#1c1308"
        strokeWidth="2"
      />
      {/* Železné havířské klínky (želízka) visící u boku */}
      <polygon points="46,72 48,82 45,82" fill="#94a3b8" stroke="#1c1308" strokeWidth="1.5" />
      <polygon points="50,72 52,80 49,80" fill="#cbd5e1" stroke="#1c1308" strokeWidth="1.5" />

      {/* VELKÝ PRACOVNÍ OBOUSTRANNÝ KRUMPÁČ (ŽÁDNÉ VÝBUŠNINY) */}
      <g
        transform={
          isAttacking
            ? "rotate(35 88 65) translate(8 -10)"
            : isHit
              ? "rotate(-25 88 65) translate(-6 4)"
              : "rotate(8 88 65)"
        }
      >
        {/* Masivní topůrko z tmavého jasanu */}
        <line
          x1="84"
          y1="36"
          x2="100"
          y2="108"
          stroke="#b45309"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Oboustranná ocelová kovaná hlavice krumpáče (obloukový hrot vlevo, plochý klín vpravo) */}
        <path
          d="M68 34 Q84 37 98 44 L96 40 Q84 33 70 30 Z"
          fill="#94a3b8"
          stroke="#1c1308"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M96 40 Q106 45 110 52 L107 54 Q102 47 94 43 Z"
          fill="#cbd5e1"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Kované zpevnění a objímka */}
        <rect
          x="85"
          y="36"
          width="6"
          height="6"
          rx="1.5"
          fill="#475569"
          stroke="#1c1308"
          strokeWidth="2"
        />
      </g>

      {/* Ruce svírající krumpáč v pohotovostním nápřahu */}
      <circle cx="84" cy="52" r="5" fill="#fed7aa" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="89" cy="64" r="4.8" fill="#fed7aa" stroke="#1c1308" strokeWidth="2.5" />

      {/* Levá ruka opřená v bok */}
      <path
        d="M40 62 Q30 68 34 76"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="35" cy="76" r="4.5" fill="#fed7aa" stroke="#1c1308" strokeWidth="2.2" />

      {/* Hlava havířského permoníka */}
      <circle cx="60" cy="44" r="16.5" fill="#fed7aa" stroke="#1c1308" strokeWidth="3.5" />

      {/* Zrzavo-hnědý pěstěný knír pod nosem a kotletky */}
      <path
        d="M48 50 C48 57 56 56 60 52 C64 56 72 57 72 50 C68 49 64 50 60 50 C56 50 52 49 48 50 Z"
        fill="#b45309"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Kotlety */}
      <path
        d="M44 42 Q45 50 48 52"
        stroke="#b45309"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M76 42 Q75 50 72 52"
        stroke="#b45309"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Rázovitý havířský nos s červeným leskem */}
      <circle cx="60" cy="46" r="4.5" fill="#fb923c" stroke="#1c1308" strokeWidth="2" />

      {/* Šibalské, odhodlané oči */}
      <ellipse cx="53" cy="40" rx="2.8" ry="3.2" fill="#1c1308" />
      <circle cx="54" cy="39" r="1.2" fill="#ffffff" />
      <ellipse cx="67" cy="40" rx="2.8" ry="3.2" fill="#1c1308" />
      <circle cx="68" cy="39" r="1.2" fill="#ffffff" />
      {/* Zvídavé obočí */}
      <path
        d="M50 35 Q54 33 57 36"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M70 35 Q66 33 63 36"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* DLOUHÁ ŠPIČATÁ ČAPKA: PASTELOVÁ MERUŇKOVO-KORÁLOVÁ (#fca5a5 / #fdba74) */}
      <ellipse cx="60" cy="34" rx="17.5" ry="5.5" fill="#fed7aa" stroke="#1c1308" strokeWidth="3" />

      {/* Tělo čapky spadající ladně přes rameno doleva */}
      <path
        d="M44 33 C42 16 56 8 70 8 C84 8 82 22 76 33 Q68 31 60 31 Q52 31 44 33 Z"
        fill="#fca5a5"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Špička čapky přepadající do strany s elegantním zlomem */}
      <path
        d="M44 32 C38 28 32 26 28 32 C24 38 22 48 24 58 L28 56 C26 48 28 40 32 36 C36 32 40 32 44 32 Z"
        fill="#fca5a5"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Pastelové záhyby látky */}
      <path
        d="M52 14 Q64 12 74 20"
        stroke="#f87171"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M38 32 Q32 38 28 46"
        stroke="#f87171"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Drobný zelený lístek kapradí vetknutý za lem čapky pro štěstí v podzemí */}
      <path
        d="M72 32 Q78 22 84 20 Q80 28 75 33 Z"
        fill="#4ade80"
        stroke="#1c1308"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/* =========================================================================
 * 3. STÁDIUM 2: SKALNÍ PERMONÍK S KAHANCEM (Zkušený skalní předák)
 * - Pověstný klasický Ladovský permoník s dlouhým sněhobílým vousem po pás
 * - Dlouhá špičatá čapka: pastelová šalvějově / lipově zelená (#86efac / #a7f3d0)
 * - Těžký skalní kovaný krumpáč opřený o zem v pravé ruce (ŽÁDNÉ VÝBUŠNINY)
 * - V levé ruce starobylý mosazný kahanec s teplým žlutým plamínkem
 * - Hliněná fajfka v koutku úst s jemným bílým kouřem
 * ========================================================================= */
function renderSkalniPermonik(isHit: boolean, isAttacking: boolean): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Skalní permoník s kahancem"
    >
      {/* Hřejivá záře z kahance */}
      <circle cx="26" cy="80" r="16" fill="#fef08a" opacity="0.3" pointerEvents="none" />
      <circle cx="26" cy="80" r="8" fill="#fde047" opacity="0.45" pointerEvents="none" />

      {/* Kamenná drť a stín pod botami */}
      <ellipse cx="60" cy="112" rx="36" ry="6" fill="#1c1308" opacity="0.45" />

      {/* Těžké havířské boty s tlustou podrážkou */}
      <g>
        <path
          d="M42 90 L38 110 L50 111 L52 90"
          fill="#27272a"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="44"
          cy="110"
          rx="8"
          ry="3.5"
          fill="#18181b"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <path
          d="M68 90 L70 110 L82 111 L78 90"
          fill="#27272a"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="76"
          cy="110"
          rx="8"
          ry="3.5"
          fill="#18181b"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
      </g>

      {/* Zavalitý trpasličí kabátec z 19. století */}
      <path
        d="M38 56 C34 72 36 92 48 94 C60 96 70 96 80 94 C88 90 86 72 82 56 Z"
        fill="#334155"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Vyšívaný havířský znak zkřížených kladívek na hrudi */}
      <g stroke="#facc15" strokeWidth="2.5" strokeLinecap="round">
        <line x1="54" y1="62" x2="66" y2="74" />
        <line x1="66" y1="62" x2="54" y2="74" />
      </g>

      {/* Hlava permoníka s buclatými tvářemi */}
      <circle cx="60" cy="42" r="17" fill="#fed7aa" stroke="#1c1308" strokeWidth="3.5" />

      {/* BĚLOSTNÝ HUŇATÝ LADOVSKÝ PLNOVIOUS PO PÁS */}
      <path
        d="M44 46 C40 68 48 88 60 90 C72 88 80 68 76 46 Z"
        fill="#f8fafc"
        stroke="#1c1308"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Vousem prosvítající pramínky */}
      <path
        d="M52 56 Q50 72 56 82"
        stroke="#e2e8f0"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M68 56 Q70 72 64 82"
        stroke="#e2e8f0"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Staročeská hliněná fajfka vykukující z vousů */}
      <g>
        <path
          d="M54 52 L44 50 L42 45"
          stroke="#1c1308"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="40"
          y="41"
          width="6"
          height="7"
          rx="1.5"
          fill="#a16207"
          stroke="#1c1308"
          strokeWidth="1.6"
        />
        <path d="M40 41 Q43 39 46 41" fill="#facc15" stroke="#1c1308" strokeWidth="1.2" />
        {/* Pokojné obláčky dýmu z dýmky */}
        <circle
          cx="40"
          cy="34"
          r="3"
          fill="#ffffff"
          opacity="0.7"
          stroke="#1c1308"
          strokeWidth="1"
        />
        <circle
          cx="36"
          cy="27"
          r="4.2"
          fill="#ffffff"
          opacity="0.5"
          stroke="#1c1308"
          strokeWidth="1"
        />
      </g>

      {/* Kulatý havířský nos a laskavé oči */}
      <circle cx="60" cy="44" r="5" fill="#fb923c" stroke="#1c1308" strokeWidth="2.2" />
      <circle cx="53" cy="38" r="2.8" fill="#1c1308" />
      <circle cx="54" cy="37" r="1.2" fill="#ffffff" />
      <circle cx="67" cy="38" r="2.8" fill="#1c1308" />
      <circle cx="68" cy="37" r="1.2" fill="#ffffff" />

      {/* DLOUHÁ ŠPIČATÁ ČAPKA: PASTELOVÁ ŠALVĚJOVĚ / LIPOVĚ ZELENÁ (#86efac / #a7f3d0) */}
      <ellipse cx="60" cy="33" rx="18" ry="6" fill="#dcfce7" stroke="#1c1308" strokeWidth="3" />

      {/* Dlouhé splývající tělo čapky směřující do špičky a padající vzad a vpravo */}
      <path
        d="M43 32 C42 14 56 4 72 4 C86 4 94 12 96 24 C98 38 88 46 84 50 L80 46 C84 42 90 36 88 26 C86 16 80 12 70 12 C58 12 48 18 47 32 Z"
        fill="#86efac"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Vnitřní stín a záhyby pastelové plsti */}
      <path
        d="M56 12 Q70 10 82 18"
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M86 24 Q88 34 84 42"
        stroke="#4ade80"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stříbrná jehlice s horským křišťálem vetknutá do čapky */}
      <line
        x1="50"
        y1="28"
        x2="62"
        y2="18"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon points="62,18 65,15 67,19 64,21" fill="#e0f2fe" stroke="#1c1308" strokeWidth="1.5" />

      {/* TĚŽKÝ SKALNÍ KOVANÝ KRUMPÁČ OPŘENÝ O ZEM (ŽÁDNÉ VÝBUŠNINY) */}
      <g
        transform={
          isAttacking
            ? "rotate(25 92 78) translate(6 -8)"
            : isHit
              ? "rotate(-20 92 78) translate(-6 2)"
              : "rotate(0 92 78)"
        }
      >
        {/* Dřevěné topůrko opřené o kamennou zem */}
        <line
          x1="88"
          y1="48"
          x2="98"
          y2="110"
          stroke="#a16207"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Kovaná hlavice skalního krumpáče */}
        <path
          d="M74 46 Q88 48 102 54 L100 50 Q88 44 76 42 Z"
          fill="#64748b"
          stroke="#1c1308"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M100 50 Q108 55 112 62 L109 64 Q104 57 98 52 Z"
          fill="#cbd5e1"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Železná kovaná objímka */}
        <rect
          x="88"
          y="47"
          width="6"
          height="5"
          rx="1.5"
          fill="#334155"
          stroke="#1c1308"
          strokeWidth="2"
        />
        {/* Ruka držící krumpáč */}
        <circle cx="89" cy="62" r="5" fill="#fed7aa" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* LEVÁ RUKA: MOSAZNÝ BEZPEČNÝ DŮLNÍ KAHANEC Z 19. STOLETÍ */}
      <g>
        {/* Ruka nesoucí kahanec */}
        <path
          d="M42 62 Q32 68 28 74"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="28" cy="74" r="4.5" fill="#fed7aa" stroke="#1c1308" strokeWidth="2.2" />

        {/* Mosazný řetízek s háčkem */}
        <line
          x1="28"
          y1="74"
          x2="26"
          y2="82"
          stroke="#1c1308"
          strokeWidth="2"
          strokeDasharray="2,2"
        />

        {/* Tělo mosazného kahance */}
        <rect
          x="20"
          y="82"
          width="13"
          height="17"
          rx="3"
          fill="#ca8a04"
          stroke="#1c1308"
          strokeWidth="2.2"
        />
        <ellipse
          cx="26.5"
          cy="82"
          rx="6.5"
          ry="2.5"
          fill="#eab308"
          stroke="#1c1308"
          strokeWidth="1.5"
        />

        {/* Skleněný průhled s plamínkem */}
        <rect
          x="23"
          y="86"
          width="7"
          height="9"
          rx="1.5"
          fill="#fef08a"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
        <ellipse cx="26.5" cy="90" rx="2" ry="3.5" fill="#f97316" />
        <circle cx="26.5" cy="91" r="1.2" fill="#ef4444" />
      </g>
    </svg>
  );
}

/* =========================================================================
 * 4. STÁDIUM 3: STAROHORSKÝ DŮLNÍ MISTR (Velebný staršina a pán podzemí)
 * - Nejstarší a nejváženější člen rodiny, vládce štol a podzemních pokladů
 * - Dlouhá špičatá čapka: ušlechtilá pastelová levandulová (#c4b5fd / #ddd6fe)
 *   se zlatým lemováním a reliéfním mosazným odznakem zkřížených kladívek
 * - Dvojitě zapletený stříbrný plnovous se stříbrnými kroužky, zlaté obroučky brýlí
 * - Mistrovský vyřezávaný krumpáč z černého dubu s leštěnou rytou čepelí (ŽÁDNÉ VÝBUŠNINY)
 * - Slavnostní černý havířský oblek s mosaznými knoflíky a broušeným českým granátem
 * ========================================================================= */
function renderDulniMistr(isHit: boolean, isAttacking: boolean): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Starohorský důlní mistr"
    >
      <defs>
        {/* Zlatavá aura starého důlního pána */}
        <radialGradient id="mistr-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Podzemní klenoty u nohou a stín */}
      <ellipse cx="60" cy="112" rx="38" ry="6.5" fill="#1c1308" opacity="0.45" />
      {/* Třpytivé drahokamy a krystaly na podlaze síně */}
      <polygon points="18,111 22,102 26,111" fill="#dc2626" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="22" cy="103" r="1" fill="#ffffff" />
      <polygon points="98,112 102,104 106,112" fill="#22c55e" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="102" cy="105" r="1" fill="#ffffff" />

      {/* Slavnostní havířské boty se stříbrnými přezkami */}
      <g>
        <path
          d="M40 88 L36 110 L49 111 L51 88"
          fill="#18181b"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="42"
          cy="110"
          rx="8"
          ry="3.5"
          fill="#09090b"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <rect
          x="40"
          y="106"
          width="5"
          height="4"
          rx="1"
          fill="#cbd5e1"
          stroke="#1c1308"
          strokeWidth="1.5"
        />

        <path
          d="M70 88 L72 110 L85 111 L81 88"
          fill="#18181b"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="78"
          cy="110"
          rx="8"
          ry="3.5"
          fill="#09090b"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <rect
          x="76"
          y="106"
          width="5"
          height="4"
          rx="1"
          fill="#cbd5e1"
          stroke="#1c1308"
          strokeWidth="1.5"
        />
      </g>

      {/* Slavnostní černá havířská uniforma mistra s mosaznými knoflíky */}
      <path
        d="M36 54 C32 72 34 92 46 94 C58 96 72 96 84 94 C94 92 92 72 88 54 Z"
        fill="#0f172a"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Dvojitá řada zlatých knoflíků */}
      <g fill="#facc15" stroke="#1c1308" strokeWidth="1.5">
        <circle cx="56" cy="62" r="2" />
        <circle cx="56" cy="72" r="2" />
        <circle cx="56" cy="82" r="2" />
        <circle cx="68" cy="62" r="2" />
        <circle cx="68" cy="72" r="2" />
        <circle cx="68" cy="82" r="2" />
      </g>

      {/* Těžký hornický řetěz s broušeným českým granátem na krku */}
      <path
        d="M48 58 Q62 68 76 58"
        fill="none"
        stroke="#facc15"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <polygon points="62,67 66,72 62,77 58,72" fill="#dc2626" stroke="#1c1308" strokeWidth="1.8" />
      <circle cx="62" cy="72" r="1.2" fill="#ffffff" />

      {/* Hlava velebného mistra */}
      <circle cx="62" cy="40" r="17" fill="#fed7aa" stroke="#1c1308" strokeWidth="3.5" />

      {/* DVOJITĚ ZAPLETENÝ STŘÍBRNÝ PLNOVIOUS SE STŘÍBRNÝMI KROUŽKY */}
      {/* Levý zapletený cop plnovousu */}
      <path
        d="M50 48 C46 64 48 84 53 92 C56 94 58 90 56 82 C55 74 57 60 55 48 Z"
        fill="#f1f5f9"
        stroke="#1c1308"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <rect
        x="49"
        y="74"
        width="7"
        height="3.5"
        rx="1"
        fill="#94a3b8"
        stroke="#1c1308"
        strokeWidth="1.5"
      />

      {/* Pravý zapletený cop plnovousu */}
      <path
        d="M68 48 C72 64 70 84 65 92 C62 94 60 90 62 82 C63 74 61 60 63 48 Z"
        fill="#f1f5f9"
        stroke="#1c1308"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <rect
        x="62"
        y="74"
        width="7"
        height="3.5"
        rx="1"
        fill="#94a3b8"
        stroke="#1c1308"
        strokeWidth="1.5"
      />

      {/* Moudrý velký bílý knír nad vousy */}
      <path
        d="M48 46 Q62 52 76 46 Q62 48 48 46 Z"
        fill="#ffffff"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Bramborový červený nos a zlaté obroučky brýliček */}
      <circle cx="62" cy="42" r="5" fill="#fb923c" stroke="#1c1308" strokeWidth="2" />
      {/* Kulaté brýličky 19. století */}
      <circle cx="53" cy="38" r="5.5" fill="none" stroke="#facc15" strokeWidth="2.2" />
      <circle cx="53" cy="38" r="2.5" fill="#1c1308" />
      <circle cx="54" cy="37" r="1" fill="#ffffff" />
      <circle cx="71" cy="38" r="5.5" fill="none" stroke="#facc15" strokeWidth="2.2" />
      <circle cx="71" cy="38" r="2.5" fill="#1c1308" />
      <circle cx="72" cy="37" r="1" fill="#ffffff" />
      <line x1="58.5" y1="38" x2="65.5" y2="38" stroke="#facc15" strokeWidth="2.2" />

      {/* MISTROVSKÝ VYŘEZÁVANÝ KRUMPÁČ (ŽÁDNÉ VÝBUŠNINY) */}
      <g
        transform={
          isAttacking
            ? "rotate(30 92 68) translate(8 -10)"
            : isHit
              ? "rotate(-25 92 68) translate(-8 4)"
              : "rotate(5 92 68)"
        }
      >
        {/* Násada z černého bahenního dubu vykládaná zlatými pruhy */}
        <line
          x1="88"
          y1="30"
          x2="102"
          y2="108"
          stroke="#291807"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line x1="89" y1="44" x2="91" y2="48" stroke="#facc15" strokeWidth="2.5" />
        <line x1="93" y1="62" x2="95" y2="66" stroke="#facc15" strokeWidth="2.5" />
        <line x1="97" y1="80" x2="99" y2="84" stroke="#facc15" strokeWidth="2.5" />

        {/* Gravírovaná stříbrná čepel mistrovského krumpáče / havířského čakanu */}
        <path
          d="M72 28 Q88 32 104 38 L102 33 Q88 27 74 24 Z"
          fill="#e2e8f0"
          stroke="#1c1308"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Zadní zlatá kovaná korunka čakanu */}
        <path
          d="M102 33 L110 38 L108 42 L100 37 Z"
          fill="#facc15"
          stroke="#1c1308"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Zlatá objímka s rytinou */}
        <rect
          x="88"
          y="30"
          width="7"
          height="6"
          rx="1.5"
          fill="#eab308"
          stroke="#1c1308"
          strokeWidth="2"
        />
        {/* Ruka v bílé slavnostní rukavičce */}
        <circle cx="89" cy="54" r="5.5" fill="#f8fafc" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* Levá ruka s pozlaceným klenotem */}
      <path
        d="M40 58 Q28 66 32 76"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="76" r="5" fill="#f8fafc" stroke="#1c1308" strokeWidth="2.2" />
      {/* Zlatá slavnostní lucernička na kroužku */}
      <line x1="32" y1="76" x2="30" y2="84" stroke="#facc15" strokeWidth="2" />
      <rect
        x="24"
        y="84"
        width="13"
        height="18"
        rx="3"
        fill="#facc15"
        stroke="#1c1308"
        strokeWidth="2.2"
      />
      <rect
        x="27"
        y="88"
        width="7"
        height="10"
        rx="1.5"
        fill="#ffffff"
        stroke="#1c1308"
        strokeWidth="1.2"
      />
      <circle cx="30.5" cy="93" r="2.5" fill="#f59e0b" />

      {/* DLOUHÁ ŠPIČATÁ ČAPKA: UŠLECHTILÁ PASTELOVÁ LEVANDULOVÁ (#c4b5fd / #ddd6fe) */}
      <ellipse cx="62" cy="30" rx="19" ry="6" fill="#fef08a" stroke="#1c1308" strokeWidth="3" />
      {/* Zlatý vyšitý lem čapky */}
      <ellipse cx="62" cy="30" rx="16" ry="4.5" fill="#fde047" />

      {/* Tělo čapky: velmi dlouhá špičatá čapka s královskou křivkou */}
      <path
        d="M44 30 C42 12 56 0 74 0 C92 0 102 10 104 22 C106 36 96 46 90 54 L86 50 C92 44 98 36 96 24 C94 14 86 8 74 8 C60 8 50 16 48 30 Z"
        fill="#c4b5fd"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Pastelové záhyby šeříkové látky */}
      <path
        d="M58 8 Q74 6 88 15"
        stroke="#a78bfa"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M92 24 Q96 34 90 44"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Reliéfní zlatý havířský odznak mistra na čapce (mlátek a želízko s korunkou) */}
      <g>
        <circle cx="62" cy="18" r="5" fill="#facc15" stroke="#1c1308" strokeWidth="1.8" />
        <line
          x1="59"
          y1="15"
          x2="65"
          y2="21"
          stroke="#1c1308"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="65"
          y1="15"
          x2="59"
          y2="21"
          stroke="#1c1308"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Zlatá korunka nad odznakem */}
        <path
          d="M58 13 L60 10 L62 12 L64 10 L66 13 Z"
          fill="#ffd438"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
}
