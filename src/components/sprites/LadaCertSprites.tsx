import React from 'react';

/**
 * Autentické Ladovské sprity pro rodinu čertů (Josef Lada: Bubáci a hastrmani, Hrátky s čertem, Čert a Káča).
 * 
 * Rodina čertů obsahuje 2 hlavní větve s 4 stádii:
 * 1. Rarášek / Čertík z pece (typ 'rarasek' / 'certik'):
 *    - Stádium 0 (Úr. 2): Churavý rarášek (ubohý malý čertík se zavázaným růžkem a puntíkatou šálou)
 *    - Stádium 1 (Úr. 6): Vyhublý rarášek (vychytralý uličník s mašlí na ocase, vyplazeným jazykem a metlou)
 *    - Stádium 2 (Úr. 10): Rarášek z pece (klasický Ladovský čertík v červené vestičce kouřící dřevěnou dýmku)
 *    - Stádium 3 (Úr. 14): Pekelný rarášek (jiskřící čert s planoucími rohy, vidlemi a pekelným plamínkem)
 * 
 * 2. Hospodský čert / Kníže pekel (typ 'cert'):
 *    - Stádium 0 (Úr. 8): Šenkýřský čertík (hospodský čertí učeň v modrobílé kostkované zástěře s korbelíkem)
 *    - Stádium 1 (Úr. 12): Karbanický čert (hospodský hráč karet s mariáškami, esem žaludským za uchem a fajfkou)
 *    - Stádium 2 (Úr. 16): Hospodský čert (pořádný břichatý čert se zlatým řetízkem a tuplákem piva s bílou pěnou)
 *    - Stádium 3 (Úr. 20): Rohatý kníže (impozantní pekelný Lucifer se zlatou korunou, černou knihou hříchů a pláštěm)
 */

export function renderLadaCertSprite(
  type: string,
  variantIndex: number = 2,
  isHit: boolean = false,
  isAttacking: boolean = false
): React.ReactNode {
  const isBranchRarasek = type === 'rarasek' || type === 'certik';
  const stage = Math.max(0, Math.min(3, variantIndex));

  if (isBranchRarasek) {
    switch (stage) {
      case 0:
        return renderChuravyRarasek(isHit, isAttacking);
      case 1:
        return renderVyhublyRarasek(isHit, isAttacking);
      case 2:
      default:
        return renderLadaRarasekClassic(isHit, isAttacking);
      case 3:
        return renderPekelnyRarasek(isHit, isAttacking);
    }
  } else {
    // Branch Hospodský čert ('cert') - zachován v tradiční Ladovské podobě
    switch (stage) {
      case 0:
        return renderSenkyrskyCertik();
      case 1:
        return renderKarbanickyCert();
      case 2:
      default:
        return renderHospodskyCertClassic();
      case 3:
        return renderRohatyKnize();
    }
  }
}

/* =========================================================================
 * 1. RARÁŠEK BRANCH (Černý opeřený skřítek / kuře – inspirováno rarasek.jpg)
 * ========================================================================= */

/** Stádium 0: Churavý rarášek (Úr. 2 - Rozcuchané pekelné kuřátko po pádu z komína) */
function renderChuravyRarasek(isHit: boolean = false, isAttacking: boolean = false) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Churavý rarášek">
      {/* Měkký stín na zemi */}
      <ellipse cx="60" cy="112" rx="30" ry="5.5" fill="#1c1308" opacity="0.28" />

      {/* Raráškovy nožky – tenké scvrklé kuřecí pařátky s obvazem */}
      <g>
        {/* Levá nožka */}
        <path d="M48 84 L46 95 L44 103" fill="none" stroke="#68643c" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 103 C39 104 35 106 31 108" fill="none" stroke="#68643c" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M44 103 C44 107 43 111 44 114" fill="none" stroke="#68643c" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M44 103 C48 105 52 107 55 108" fill="none" stroke="#68643c" strokeWidth="2.4" strokeLinecap="round" />
        {/* Černé drápky */}
        <polygon points="31,108 28,110 32,109" fill="#141316" />
        <polygon points="44,114 43,117 45,115" fill="#141316" />
        <polygon points="55,108 57,109 55,107" fill="#141316" />

        {/* Pravá nožka s bílou náplastí na kolínku */}
        <path d="M72 84 L74 95 L76 103" fill="none" stroke="#68643c" strokeWidth="3" strokeLinecap="round" />
        <rect x="71" y="91" width="6" height="5" rx="1.5" fill="#fdfcf7" stroke="#1c1308" strokeWidth="1.2" transform="rotate(-10 74 93)" />
        <line x1="74" y1="91" x2="74" y2="96" stroke="#c4321d" strokeWidth="1" transform="rotate(-10 74 93)" />
        <path d="M76 103 C72 105 68 107 65 108" fill="none" stroke="#68643c" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M76 103 C76 107 77 111 76 114" fill="none" stroke="#68643c" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M76 103 C81 104 85 106 89 108" fill="none" stroke="#68643c" strokeWidth="2.4" strokeLinecap="round" />
        {/* Černé drápky */}
        <polygon points="65,108 63,109 65,107" fill="#141316" />
        <polygon points="76,114 77,117 75,115" fill="#141316" />
        <polygon points="89,108 92,110 88,109" fill="#141316" />
      </g>

      {/* Krátký střapatý ocásek vzadu */}
      <path d="M42 74 L28 72 L32 77 L22 80 L30 83 L26 87 L38 84 Z" fill="#181719" stroke="#1c1308" strokeWidth="2" strokeLinejoin="round" />

      {/* Rozcuchaná křidélka raráška */}
      <g>
        {/* Levé křidélko */}
        <path
          d="M45 50 C37 46 26 46 16 52 C14 55 16 57 20 58 C24 59 28 57 30 59 C25 62 20 66 23 68 C26 70 32 67 34 70 C30 73 28 77 32 79 C35 80 40 76 43 78 C42 81 44 83 47 81 Z"
          fill="#1c1b1f"
          stroke="#1c1308"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Pravé křidélko */}
        <path
          d="M75 50 C83 46 94 46 104 52 C106 55 104 57 100 58 C96 59 92 57 90 59 C95 62 100 66 97 68 C94 70 88 67 86 70 C90 73 92 77 88 79 C85 80 80 76 77 78 C78 81 76 83 73 81 Z"
          fill="#1c1b1f"
          stroke="#1c1308"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </g>

      {/* Chmýřovité černé tělíčko */}
      <path
        d="M48 40 C43 47 40 57 42 68 C43 78 48 84 60 84 C72 84 77 78 78 68 C80 57 77 47 72 40 Z"
        fill="#141316"
        stroke="#1c1308"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* Vystrčené střapaté peří na hrudníčku */}
      <path d="M40 60 L36 63 L41 65 L37 70 L43 71" fill="#141316" stroke="#1c1308" strokeWidth="1.6" />
      <path d="M80 60 L84 63 L79 65 L83 70 L77 71" fill="#141316" stroke="#1c1308" strokeWidth="1.6" />
      <path d="M52 64 L50 70 L55 70 M68 64 L70 70 L65 70" fill="none" stroke="#36323d" strokeWidth="1.6" strokeLinecap="round" />

      {/* Hlava rozcuchaného ptáčka */}
      <path
        d="M51 38 C44 34 44 19 52 16 C56 14 64 14 68 16 C76 19 76 34 69 38 Z"
        fill="#141316"
        stroke="#1c1308"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* Střapaté tvářičky */}
      <path d="M45 28 L39 30 L45 33 L42 36 L48 37" fill="#141316" stroke="#1c1308" strokeWidth="1.8" />
      <path d="M75 28 L81 30 L75 33 L78 36 L72 37" fill="#141316" stroke="#1c1308" strokeWidth="1.8" />

      {/* Pekelné růžky ve kštici – svislé, špičaté; levému růžku chudáčka raráška dali obvaz po pádu z komína! */}
      <path d="M47 17 C46 10 43 5 44 2 C48 5 51 10 53 16 Z" fill="#141316" stroke="#1c1308" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="41.5" y="7.5" width="8.5" height="5.5" rx="1.5" fill="#fdfcf7" stroke="#1c1308" strokeWidth="1.3" transform="rotate(-4 45.5 10)" />
      <line x1="45.5" y1="7.5" x2="45.5" y2="13" stroke="#c4321d" strokeWidth="1" transform="rotate(-4 45.5 10)" />

      {/* Pravý růžek raráška – svislý a špičatý */}
      <path d="M67 16 C69 10 72 5 76 2 C77 5 74 10 73 17 Z" fill="#141316" stroke="#1c1308" strokeWidth="2.2" strokeLinejoin="round" />

      {/* Chocholka mezi růžky */}
      <path d="M54 15 L57 7 L60 14 L63 6 L66 14" fill="#141316" stroke="#1c1308" strokeWidth="1.8" />

      {/* Vykulené kulaté oči s udiveným pohledem churavého kuřátka */}
      <circle cx="53" cy="24" r="7.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2.4" />
      <circle cx="67" cy="24" r="7.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2.4" />

      {isHit ? (
        <g>
          {/* Spirálky / křížky při zásahu */}
          <path d="M50 21 L56 27 M56 21 L50 27" stroke="#1c1308" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M64 21 L70 27 M70 21 L64 27" stroke="#1c1308" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : (
        <g className="anim-lada-blink">
          {/* Udivené trochu šilhavé panenky */}
          <circle cx="53" cy="24" r="3.2" fill="#141316" />
          <circle cx="68" cy="24.5" r="3.2" fill="#141316" />
          <circle cx="54.2" cy="22.5" r="1.1" fill="#ffffff" />
          <circle cx="69.2" cy="23" r="1.1" fill="#ffffff" />
        </g>
      )}

      {/* Špičatý žlutavý ptačí zobáček dolů */}
      {isAttacking ? (
        <g>
          <polygon points="54,29 66,29 60,38" fill="#d49b28" stroke="#1c1308" strokeWidth="2.2" />
          <polygon points="56,35 64,35 60,45" fill="#9e2a18" stroke="#1c1308" strokeWidth="2" />
          <polygon points="58,37 62,37 60,42" fill="#e65a3c" />
        </g>
      ) : (
        <g>
          <polygon points="54,29 66,29 60,41" fill="#d49b28" stroke="#1c1308" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="60" y1="29" x2="60" y2="41" stroke="#1c1308" strokeWidth="1.5" />
          <circle cx="58" cy="32" r="0.8" fill="#1c1308" />
          <circle cx="62" cy="32" r="0.8" fill="#1c1308" />
        </g>
      )}

      {/* Malý obláček sazí od kýchnutí */}
      <circle cx="58" cy="46" r="2.2" fill="#524d54" opacity="0.6" />
      <circle cx="54" cy="49" r="1.5" fill="#524d54" opacity="0.4" />
    </svg>
  );
}

/** Stádium 1: Vyhublý rarášek (Úr. 6 - Hbitý, šibalský opeřený šotek s ukradenou červenou mašlí) */
function renderVyhublyRarasek(isHit: boolean = false, isAttacking: boolean = false) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Vyhublý rarášek">
      {/* Stín na zemi */}
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#1c1308" opacity="0.3" />

      {/* Štíhlé pružné ptačí pařáty raráška */}
      <g>
        {/* Levá noha */}
        <path d="M46 82 L43 95 L40 104" fill="none" stroke="#68643c" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M40 104 C34 105 28 107 24 109" fill="none" stroke="#68643c" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M40 104 C40 108 39 113 40 116" fill="none" stroke="#68643c" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M40 104 C45 106 50 108 54 109" fill="none" stroke="#68643c" strokeWidth="2.6" strokeLinecap="round" />
        {/* Drápky */}
        <polygon points="24,109 21,111 25,110" fill="#141316" />
        <polygon points="40,116 39,119 41,117" fill="#141316" />
        <polygon points="54,109 56,110 54,108" fill="#141316" />

        {/* Pravá noha */}
        <path d="M74 82 L77 95 L80 104" fill="none" stroke="#68643c" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M80 104 C75 106 70 108 66 109" fill="none" stroke="#68643c" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M80 104 C81 108 81 113 80 116" fill="none" stroke="#68643c" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M80 104 C86 105 92 107 96 109" fill="none" stroke="#68643c" strokeWidth="2.6" strokeLinecap="round" />
        {/* Drápky */}
        <polygon points="66,109 64,110 66,108" fill="#141316" />
        <polygon points="80,116 81,119 79,117" fill="#141316" />
        <polygon points="96,109 99,111 95,110" fill="#141316" />
      </g>

      {/* Špičatý střapatý ptačí ocásek se zapletenou lidovou červenou stuhou */}
      <g>
        <path d="M38 72 L22 69 L27 75 L15 78 L26 82 L18 87 L34 84 Z" fill="#161517" stroke="#1c1308" strokeWidth="2.4" strokeLinejoin="round" />
        {/* Červená pentle ukradená hospodyni */}
        <path d="M22 69 C16 64 12 70 10 74 C14 73 18 71 22 69 Z" fill="#c42c17" stroke="#1c1308" strokeWidth="1.5" />
        <path d="M10 74 C6 80 14 84 18 80" fill="none" stroke="#c42c17" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Roztažená rozcuchaná křídla s ostrými pery */}
      <g>
        {/* Levé křídlo */}
        <path
          d="M44 48 C34 43 22 41 11 49 C9 52 11 55 15 56 C19 57 25 55 27 57 C21 60 15 64 18 67 C21 69 28 66 30 69 C25 72 21 77 25 80 C29 82 34 76 37 79 C35 83 38 86 43 83 C47 80 49 75 47 71 Z"
          fill="#1c1b1f"
          stroke="#1c1308"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <line x1="42" y1="50" x2="16" y2="53" stroke="#383440" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="44" y1="58" x2="22" y2="64" stroke="#383440" strokeWidth="1.6" strokeLinecap="round" />

        {/* Pravé křídlo */}
        <path
          d="M76 48 C86 43 98 41 109 49 C111 52 109 55 105 56 C101 57 95 55 93 57 C99 60 105 64 102 67 C99 69 92 66 90 69 C95 72 99 77 95 80 C91 82 86 76 83 79 C85 83 82 86 77 83 C73 80 71 75 73 71 Z"
          fill="#1c1b1f"
          stroke="#1c1308"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <line x1="78" y1="50" x2="104" y2="53" stroke="#383440" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="76" y1="58" x2="98" y2="64" stroke="#383440" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Štíhlejší rozcuchané černé tělo */}
      <path
        d="M46 36 C40 44 36 56 38 70 C40 82 46 86 60 86 C74 86 80 82 82 70 C84 56 80 44 74 36 Z"
        fill="#141316"
        stroke="#1c1308"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Opeřené záhyby a peříčka */}
      <path d="M37 60 L32 64 L38 67 L34 72 L40 74" fill="#141316" stroke="#1c1308" strokeWidth="2" />
      <path d="M83 60 L88 64 L82 67 L86 72 L80 74" fill="#141316" stroke="#1c1308" strokeWidth="2" />
      <path d="M50 56 L46 62 L52 63 L48 69 L54 69" fill="#1c1b1f" stroke="#1c1308" strokeWidth="1.4" />
      <path d="M70 56 L74 62 L68 63 L72 69 L66 69" fill="#1c1b1f" stroke="#1c1308" strokeWidth="1.4" />

      {/* Hlava šotka */}
      <path
        d="M50 36 C42 32 42 16 52 14 C56 12 64 12 68 14 C78 16 78 32 70 36 Z"
        fill="#141316"
        stroke="#1c1308"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Vystrčené pírka z lící */}
      <path d="M43 26 L37 28 L43 32 L39 36 L46 37" fill="#141316" stroke="#1c1308" strokeWidth="1.8" />
      <path d="M77 26 L83 28 L77 32 L81 36 L74 37" fill="#141316" stroke="#1c1308" strokeWidth="1.8" />

      {/* Pekelné ptačí růžky nahoře na hlavě – svislé a špičaté */}
      <path d="M47 16 C45 9 42 3 43 0 C47 4 51 9 53 15 Z" fill="#141316" stroke="#1c1308" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M67 15 C69 9 73 4 77 0 C78 3 75 9 73 16 Z" fill="#141316" stroke="#1c1308" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M53 13 L56 5 L59 12 L61 4 L64 12 L67 6 L68 13" fill="#141316" stroke="#1c1308" strokeWidth="2" />

      {/* Velké udivené kulaté oči s lišáckým pohledem */}
      <circle cx="53" cy="22" r="7.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="67" cy="22" r="7.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2.5" />

      {isHit ? (
        <g>
          <path d="M50 19 L56 25 M56 19 L50 25" stroke="#1c1308" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M64 19 L70 25 M70 19 L64 25" stroke="#1c1308" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : (
        <g className="anim-lada-blink">
          <circle cx="54.5" cy="22.5" r="3.4" fill="#141316" />
          <circle cx="68" cy="22.5" r="3.4" fill="#141316" />
          <circle cx="56" cy="21" r="1.3" fill="#ffffff" />
          <circle cx="69.5" cy="21" r="1.3" fill="#ffffff" />
        </g>
      )}

      {/* Ostrý ptačí zobáček směřující dolů */}
      {isAttacking ? (
        <g>
          <polygon points="54,27 66,27 60,37" fill="#d49b28" stroke="#1c1308" strokeWidth="2.4" />
          <polygon points="56,34 64,34 60,45" fill="#9e2a18" stroke="#1c1308" strokeWidth="2" />
          <polygon points="58,36 62,36 60,42" fill="#e65a3c" />
          {/* Útočné linky zvuku */}
          <line x1="46" y1="41" x2="40" y2="45" stroke="#c42c17" strokeWidth="2" strokeLinecap="round" />
          <line x1="74" y1="41" x2="80" y2="45" stroke="#c42c17" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <polygon points="54,27 66,27 60,40" fill="#d49b28" stroke="#1c1308" strokeWidth="2.4" strokeLinejoin="round" />
          <polygon points="56,28 60,28 60,38" fill="#f0b63a" opacity="0.6" />
          <line x1="60" y1="27" x2="60" y2="40" stroke="#1c1308" strokeWidth="1.6" />
          <circle cx="58" cy="30" r="0.8" fill="#1c1308" />
          <circle cx="62" cy="30" r="0.8" fill="#1c1308" />
        </g>
      )}
    </svg>
  );
}

/** Stádium 2: Rarášek (Úr. 10 - Věrná reprodukce předlohy rarasek.jpg: černý rozcuchaný ptáček s růžky a pařátky) */
function renderLadaRarasekClassic(isHit: boolean = false, isAttacking: boolean = false) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Rarášek">
      {/* Měkký stín na zemi */}
      <ellipse cx="60" cy="112" rx="38" ry="6" fill="#1c1308" opacity="0.32" />

      {/* Dlouhé šupinaté ptačí pařáty s ostrými zahnutými drápy (přesně jako na předloze) */}
      <g>
        {/* Levá noha */}
        <path d="M42 80 L38 86 L43 85 L46 88 L48 82 Z" fill="#18171a" stroke="#1c1308" strokeWidth="2" />
        <path d="M45 84 L42 96 L40 104" fill="none" stroke="#706b43" strokeWidth="4" strokeLinecap="round" />
        <line x1="41" y1="91" x2="44" y2="92" stroke="#484428" strokeWidth="1.8" />
        <line x1="39" y1="98" x2="43" y2="99" stroke="#484428" strokeWidth="1.8" />
        {/* Zadní drápek / ostruha */}
        <path d="M41 102 C44 99 47 98 48 99" fill="none" stroke="#706b43" strokeWidth="2.5" strokeLinecap="round" />
        {/* Prsty */}
        <path d="M40 104 C34 105 28 107 24 109" fill="none" stroke="#706b43" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 109 C21 110 20 113 22 113 C23 113 25 111 26 109 Z" fill="#141316" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M40 104 C39 108 39 113 40 116" fill="none" stroke="#706b43" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M40 116 C39 118 41 119 42 118 C43 117 42 115 41 114 Z" fill="#141316" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M40 104 C45 106 50 108 54 109" fill="none" stroke="#706b43" strokeWidth="3" strokeLinecap="round" />
        <path d="M54 109 C56 110 57 108 55 107 Z" fill="#141316" stroke="#1c1308" strokeWidth="1.2" />

        {/* Pravá noha */}
        <path d="M72 82 L74 88 L77 85 L82 86 L78 80 Z" fill="#18171a" stroke="#1c1308" strokeWidth="2" />
        <path d="M75 84 L78 96 L80 104" fill="none" stroke="#706b43" strokeWidth="4" strokeLinecap="round" />
        <line x1="76" y1="91" x2="79" y2="92" stroke="#484428" strokeWidth="1.8" />
        <line x1="77" y1="98" x2="81" y2="99" stroke="#484428" strokeWidth="1.8" />
        {/* Zadní ostruha */}
        <path d="M79 102 C76 99 73 98 72 99" fill="none" stroke="#706b43" strokeWidth="2.5" strokeLinecap="round" />
        {/* Prsty */}
        <path d="M80 104 C75 106 70 108 66 109" fill="none" stroke="#706b43" strokeWidth="3" strokeLinecap="round" />
        <path d="M66 109 C64 110 63 108 65 107 Z" fill="#141316" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M80 104 C81 108 81 113 80 116" fill="none" stroke="#706b43" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M80 116 C81 118 79 119 78 118 C77 117 78 115 79 114 Z" fill="#141316" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M80 104 C86 105 92 107 96 109" fill="none" stroke="#706b43" strokeWidth="3" strokeLinecap="round" />
        <path d="M96 109 C99 110 100 113 98 113 C97 113 95 111 94 109 Z" fill="#141316" stroke="#1c1308" strokeWidth="1.2" />
      </g>

      {/* Špičatý vějíř ocasního peří na levém boku vzadu */}
      <g>
        <path d="M38 72 L22 68 L27 74 L14 77 L25 82 L17 87 L34 84 Z" fill="#161517" stroke="#1c1308" strokeWidth="2.4" strokeLinejoin="round" />
        <line x1="26" y1="73" x2="34" y2="76" stroke="#322f36" strokeWidth="1.2" />
        <line x1="20" y1="80" x2="32" y2="80" stroke="#322f36" strokeWidth="1.2" />
      </g>

      {/* Široce rozpřažená rozčepýřená černá křídla (charakteristická silueta z přílohy!) */}
      <g>
        {/* Levé křídlo */}
        <path
          d="M44 48 C34 44 22 42 10 50 C8 53 10 56 14 57 C18 58 24 56 26 58 C20 61 14 65 17 68 C20 70 27 67 29 70 C24 73 20 78 24 81 C28 83 33 77 36 80 C34 84 37 87 42 84 C46 81 48 76 46 72 Z"
          fill="#1a191c"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <line x1="42" y1="50" x2="16" y2="53" stroke="#322f38" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="44" y1="58" x2="22" y2="64" stroke="#322f38" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="42" y1="68" x2="28" y2="74" stroke="#322f38" strokeWidth="1.6" strokeLinecap="round" />

        {/* Pravé křídlo */}
        <path
          d="M76 48 C86 44 98 42 110 50 C112 53 110 56 106 57 C102 58 96 56 94 58 C100 61 106 65 103 68 C100 70 93 67 91 70 C96 73 100 78 96 81 C92 83 87 77 84 80 C86 84 83 87 78 84 C74 81 72 76 74 72 Z"
          fill="#1a191c"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <line x1="78" y1="50" x2="104" y2="53" stroke="#322f38" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="76" y1="58" x2="98" y2="64" stroke="#322f38" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="78" y1="68" x2="92" y2="74" stroke="#322f38" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Huňaté, silně rozčepýřené tělo s pery */}
      <path
        d="M46 36 C40 44 36 56 38 70 C40 82 46 88 60 88 C74 88 80 82 82 70 C84 56 80 44 74 36 Z"
        fill="#141316"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Vystrčené pírka na bocích těla */}
      <path d="M37 60 L32 64 L38 67 L34 72 L40 74" fill="#141316" stroke="#1c1308" strokeWidth="2" />
      <path d="M83 60 L88 64 L82 67 L86 72 L80 74" fill="#141316" stroke="#1c1308" strokeWidth="2" />
      <path d="M48 56 L44 62 L50 63 L46 70 L52 70" fill="#1f1d22" stroke="#1c1308" strokeWidth="1.5" />
      <path d="M72 56 L76 62 L70 63 L74 70 L68 70" fill="#1f1d22" stroke="#1c1308" strokeWidth="1.5" />
      <path d="M54 74 L60 80 L66 74" fill="none" stroke="#33303a" strokeWidth="2" strokeLinecap="round" />

      {/* Hlava raráška s rozčepýřenou kšticí */}
      <path
        d="M50 36 C42 32 42 16 52 14 C56 12 64 12 68 14 C78 16 78 32 70 36 Z"
        fill="#141316"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Střapaté tváře z per */}
      <path d="M43 26 L37 28 L43 32 L39 36 L46 37" fill="#141316" stroke="#1c1308" strokeWidth="2" />
      <path d="M77 26 L83 28 L77 32 L81 36 L74 37" fill="#141316" stroke="#1c1308" strokeWidth="2" />

      {/* Špičaté svislé růžky nahoře na hlavě */}
      <path d="M47 16 C45 9 42 3 43 0 C47 4 51 9 53 15 Z" fill="#141316" stroke="#1c1308" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M67 15 C69 9 73 4 77 0 C78 3 75 9 73 16 Z" fill="#141316" stroke="#1c1308" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="48" y1="13" x2="44" y2="4" stroke="#33303a" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="72" y1="13" x2="76" y2="4" stroke="#33303a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M53 13 L56 5 L59 12 L61 4 L64 12 L67 6 L68 13" fill="#141316" stroke="#1c1308" strokeWidth="2" />

      {/* Dvě obrovské vykulené bílé oči s černými zorničkami (středobod výrazu raráška z přílohy) */}
      <circle cx="53" cy="22" r="7.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="67" cy="22" r="7.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2.5" />

      {isHit ? (
        <g>
          {/* Zasažený / omráčený výraz */}
          <path d="M49 18 L57 26 M57 18 L49 26" stroke="#1c1308" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M63 18 L71 26 M71 18 L63 26" stroke="#1c1308" strokeWidth="2.4" strokeLinecap="round" />
          {/* Odletující pírka */}
          <path d="M18 36 Q14 30 18 26 Q22 30 18 36" fill="#1a191c" stroke="#1c1308" strokeWidth="1.2" transform="rotate(-15 18 31)" />
          <path d="M102 38 Q106 32 102 28 Q98 32 102 38" fill="#1a191c" stroke="#1c1308" strokeWidth="1.2" transform="rotate(20 102 33)" />
        </g>
      ) : (
        <g className="anim-lada-blink">
          <circle cx="53.5" cy="22.5" r="3.4" fill="#141316" />
          <circle cx="66.5" cy="22.5" r="3.4" fill="#141316" />
          <circle cx="55" cy="21" r="1.3" fill="#ffffff" />
          <circle cx="68" cy="21" r="1.3" fill="#ffffff" />
        </g>
      )}

      {/* Špičatý trojúhelníkový žlutookrový zobáček dolů */}
      {isAttacking ? (
        <g>
          <polygon points="54,27 66,27 60,37" fill="#d49b28" stroke="#1c1308" strokeWidth="2.4" />
          <polygon points="55,34 65,34 60,46" fill="#9e2a18" stroke="#1c1308" strokeWidth="2.2" />
          <polygon points="57,36 63,36 60,42" fill="#e65a3c" />
          {/* Útočný skřek z přílohy */}
          <line x1="45" y1="42" x2="38" y2="47" stroke="#c42c17" strokeWidth="2" strokeLinecap="round" />
          <line x1="75" y1="42" x2="82" y2="47" stroke="#c42c17" strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <polygon points="54,27 66,27 60,40" fill="#d49b28" stroke="#1c1308" strokeWidth="2.4" strokeLinejoin="round" />
          <polygon points="56,28 60,28 60,38" fill="#f0b63a" opacity="0.6" />
          <line x1="60" y1="27" x2="60" y2="40" stroke="#1c1308" strokeWidth="1.6" />
          <circle cx="58" cy="30" r="0.8" fill="#1c1308" />
          <circle cx="62" cy="30" r="0.8" fill="#1c1308" />
        </g>
      )}
    </svg>
  );
}

/** Stádium 3: Pekelný rarášek (Úr. 14 - Hrozivý opeřený vládce pece s plamennými jiskrami a žhnoucíma očima) */
function renderPekelnyRarasek(isHit: boolean = false, isAttacking: boolean = false) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Pekelný rarášek">
      {/* Žhnoucí pekelný stín */}
      <ellipse cx="60" cy="112" rx="40" ry="6.5" fill="#b82618" opacity="0.4" />

      {/* Silné pařáty se žhnoucími zlatavými drápy */}
      <g>
        {/* Levá noha */}
        <path d="M42 80 L38 86 L43 85 L46 88 L48 82 Z" fill="#141012" stroke="#1c1308" strokeWidth="2" />
        <path d="M45 84 L42 96 L40 104" fill="none" stroke="#524a2c" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M40 104 C34 105 28 107 24 109" fill="none" stroke="#524a2c" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 109 C21 110 20 113 22 113 C23 113 25 111 26 109 Z" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M40 104 C39 108 39 113 40 116" fill="none" stroke="#524a2c" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M40 116 C39 118 41 119 42 118 C43 117 42 115 41 114 Z" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M40 104 C45 106 50 108 54 109" fill="none" stroke="#524a2c" strokeWidth="3" strokeLinecap="round" />
        <path d="M54 109 C56 110 57 108 55 107 Z" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />

        {/* Pravá noha */}
        <path d="M72 82 L74 88 L77 85 L82 86 L78 80 Z" fill="#141012" stroke="#1c1308" strokeWidth="2" />
        <path d="M75 84 L78 96 L80 104" fill="none" stroke="#524a2c" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M80 104 C75 106 70 108 66 109" fill="none" stroke="#524a2c" strokeWidth="3" strokeLinecap="round" />
        <path d="M66 109 C64 110 63 108 65 107 Z" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M80 104 C81 108 81 113 80 116" fill="none" stroke="#524a2c" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M80 116 C81 118 79 119 78 118 C77 117 78 115 79 114 Z" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />
        <path d="M80 104 C86 105 92 107 96 109" fill="none" stroke="#524a2c" strokeWidth="3" strokeLinecap="round" />
        <path d="M96 109 C99 110 100 113 98 113 C97 113 95 111 94 109 Z" fill="#ffd438" stroke="#1c1308" strokeWidth="1.2" />
      </g>

      {/* Špičatý vějíř ocasního peří s ohnivými špičkami */}
      <g>
        <path d="M38 72 L22 68 L27 74 L14 77 L25 82 L17 87 L34 84 Z" fill="#141012" stroke="#1c1308" strokeWidth="2.4" strokeLinejoin="round" />
        {/* Plamenné jiskry na ocase */}
        <polygon points="14,77 10,75 12,79" fill="#ff4d00" />
        <polygon points="17,87 13,88 15,85" fill="#ffd438" />
      </g>

      {/* Rozpřažená pekelná křídla s planoucími konečky per */}
      <g>
        {/* Levé křídlo */}
        <path
          d="M44 48 C34 44 22 42 10 50 C8 53 10 56 14 57 C18 58 24 56 26 58 C20 61 14 65 17 68 C20 70 27 67 29 70 C24 73 20 78 24 81 C28 83 33 77 36 80 C34 84 37 87 42 84 C46 81 48 76 46 72 Z"
          fill="#141012"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Plamínky na špičkách per */}
        <polygon points="10,50 6,48 8,53" fill="#ff4d00" />
        <polygon points="17,68 12,69 15,66" fill="#ffd438" />
        <polygon points="24,81 20,84 22,79" fill="#ff4d00" />

        {/* Pravé křídlo */}
        <path
          d="M76 48 C86 44 98 42 110 50 C112 53 110 56 106 57 C102 58 96 56 94 58 C100 61 106 65 103 68 C100 70 93 67 91 70 C96 73 100 78 96 81 C92 83 87 77 84 80 C86 84 83 87 78 84 C74 81 72 76 74 72 Z"
          fill="#141012"
          stroke="#1c1308"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Plamínky na špičkách pravých per */}
        <polygon points="110,50 114,48 112,53" fill="#ff4d00" />
        <polygon points="103,68 108,69 105,66" fill="#ffd438" />
        <polygon points="96,81 100,84 98,79" fill="#ff4d00" />
      </g>

      {/* Tělo pekelného raráška s ohnivými žilkami */}
      <path
        d="M46 36 C40 44 36 56 38 70 C40 82 46 88 60 88 C74 88 80 82 82 70 C84 56 80 44 74 36 Z"
        fill="#120e10"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M37 60 L32 64 L38 67 L34 72 L40 74" fill="#120e10" stroke="#1c1308" strokeWidth="2" />
      <path d="M83 60 L88 64 L82 67 L86 72 L80 74" fill="#120e10" stroke="#1c1308" strokeWidth="2" />
      <path d="M52 66 Q60 74 68 66" fill="none" stroke="#e63e1e" strokeWidth="2" strokeDasharray="3,2" />

      {/* Hlava pekelného raráška */}
      <path
        d="M50 36 C42 32 42 16 52 14 C56 12 64 12 68 14 C78 16 78 32 70 36 Z"
        fill="#120e10"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Svislé špičaté planoucí růžky se zlatým kroužkem a plamennými hroty */}
      <path d="M47 16 C45 9 42 3 43 0 C47 4 51 9 53 15 Z" fill="#120e10" stroke="#1c1308" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M67 15 C69 9 73 4 77 0 C78 3 75 9 73 16 Z" fill="#120e10" stroke="#1c1308" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Plamínky na špičkách svislých rohů */}
      <path d="M43 0 Q38 -7 43 -11 Q48 -7 44 0 Z" fill="#ff4d00" stroke="#ffd438" strokeWidth="1.2" />
      <path d="M77 0 Q72 -7 77 -11 Q82 -7 78 0 Z" fill="#ff4d00" stroke="#ffd438" strokeWidth="1.2" />

      {/* Zlatý kroužek na levém růžku */}
      <ellipse cx="45" cy="7" rx="3.5" ry="2" fill="none" stroke="#ffd438" strokeWidth="2" transform="rotate(-15 45 7)" />

      {/* Žhnoucí vykulené oči – s planoucí rudou duhovkou */}
      <circle cx="53" cy="22" r="7.5" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="67" cy="22" r="7.5" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="53" cy="22" r="5" fill="#e63e1e" />
      <circle cx="67" cy="22" r="5" fill="#e63e1e" />

      {isHit ? (
        <g>
          <path d="M49 18 L57 26 M57 18 L49 26" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M63 18 L71 26 M71 18 L63 26" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ) : (
        <g className="anim-lada-blink">
          <circle cx="53.5" cy="22.5" r="2.8" fill="#120e10" />
          <circle cx="66.5" cy="22.5" r="2.8" fill="#120e10" />
          <circle cx="55" cy="21" r="1.2" fill="#ffffff" />
          <circle cx="68" cy="21" r="1.2" fill="#ffffff" />
        </g>
      )}

      {/* Tmavý obsidiánový zobák se zlatou žhnoucí špičkou */}
      {isAttacking ? (
        <g>
          <polygon points="54,27 66,27 60,37" fill="#241b12" stroke="#1c1308" strokeWidth="2.4" />
          <polygon points="55,34 65,34 60,46" fill="#8f1a0e" stroke="#1c1308" strokeWidth="2.2" />
          <polygon points="57,36 63,36 60,42" fill="#ffd438" />
        </g>
      ) : (
        <g>
          <polygon points="54,27 66,27 60,40" fill="#241b12" stroke="#1c1308" strokeWidth="2.4" strokeLinejoin="round" />
          <polygon points="58,34 62,34 60,40" fill="#ffd438" />
          <line x1="60" y1="27" x2="60" y2="40" stroke="#1c1308" strokeWidth="1.6" />
        </g>
      )}

      {/* Žhavé uhlíky vznášející se kolem */}
      <circle cx="34" cy="40" r="1.5" fill="#ffd438" />
      <circle cx="86" cy="38" r="1.8" fill="#ff4d00" />
      <circle cx="28" cy="62" r="1.2" fill="#ffd438" />
      <circle cx="92" cy="65" r="1.5" fill="#ff4d00" />
    </svg>
  );
}

/* =========================================================================
 * 2. HOSPODSKÝ ČERT & KNÍŽE PEKEL (Branch 'cert')
 * ========================================================================= */

/** Stádium 0: Šenkýřský čertík (Úr. 8) */
function renderSenkyrskyCertik() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Šenkýřský čertík">
      {/* Hospodský stín */}
      <ellipse cx="60" cy="111" rx="36" ry="7" fill="#1c1308" opacity="0.35" />

      {/* Zatočený švihající ocas */}
      <g className="anim-lada-tail" style={{ transformOrigin: '44px 86px', transformBox: 'view-box' }}>
        <path d="M44 86 C28 92 12 80 12 58 C12 44 22 38 26 40" fill="none" stroke="#24150b" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M26 40 C20 30 26 22 34 24 C32 34 36 36 26 40 Z" fill="#b82618" stroke="#1c1308" strokeWidth="2.2" />
      </g>

      {/* Chlupaté nohy s kopýtky */}
      <rect x="42" y="91" width="12" height="19" rx="4" fill="#24150b" stroke="#1c1308" strokeWidth="3.2" />
      <rect x="66" y="91" width="12" height="19" rx="4" fill="#24150b" stroke="#1c1308" strokeWidth="3.2" />
      <ellipse cx="48" cy="109" rx="7.5" ry="4" fill="#4d321c" stroke="#1c1308" strokeWidth="2.5" />
      <ellipse cx="72" cy="109" rx="7.5" ry="4" fill="#4d321c" stroke="#1c1308" strokeWidth="2.5" />

      {/* Kulaté břicho hospodského čertíka */}
      <path
        d="M34 48 C32 78 36 96 60 96 C84 96 88 78 86 48 C86 42 78 40 60 40 C42 40 34 42 34 48 Z"
        fill="#24150b"
        stroke="#1c1308"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />

      {/* HOSPODSKÁ KOSTKOVANÁ ZÁSTĚRA (Modro-bílá lidová šenkýřská) */}
      <path d="M42 58 L38 90 L82 90 L78 58 Z" fill="#2d527c" stroke="#1c1308" strokeWidth="2.8" />
      {/* Kostkované pruhy */}
      <line x1="52" y1="58" x2="50" y2="90" stroke="#f4efe6" strokeWidth="2" strokeDasharray="3,3" />
      <line x1="68" y1="58" x2="70" y2="90" stroke="#f4efe6" strokeWidth="2" strokeDasharray="3,3" />
      <line x1="40" y1="74" x2="80" y2="74" stroke="#f4efe6" strokeWidth="2" strokeDasharray="3,3" />

      {/* Svislé špičaté čertovské rohy s vroubkováním */}
      <path d="M46 28 C43 17 38 9 40 4 C46 8 50 17 53 26 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M74 28 C77 17 82 9 80 4 C74 8 70 17 67 26 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="3.2" strokeLinejoin="round" />
      <line x1="43" y1="18" x2="49" y2="20" stroke="#945014" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="41" y1="12" x2="46" y2="14" stroke="#945014" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="77" y1="18" x2="71" y2="20" stroke="#945014" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="79" y1="12" x2="74" y2="14" stroke="#945014" strokeWidth="1.8" strokeLinecap="round" />

      {/* Hlava s usměvavou tváří */}
      <circle cx="60" cy="38" r="18" fill="#24150b" stroke="#1c1308" strokeWidth="3.5" />

      {/* Šibalské mrkající oči (jedno mrká!) */}
      <circle cx="52" cy="35" r="6" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="52" cy="35" r="2.8" fill="#1c1308" />
      <circle cx="53" cy="33" r="1" fill="#ffffff" />
      {/* Pravé mrkající oko */}
      <path d="M64 36 Q68 31 72 36" fill="none" stroke="#1c1308" strokeWidth="3.2" strokeLinecap="round" />

      {/* Červené hospodské tvářičky */}
      <circle cx="45" cy="42" r="5" fill="#c42c17" opacity="0.8" />
      <circle cx="75" cy="42" r="5" fill="#c42c17" opacity="0.8" />

      {/* Veselý úsměv s zoubkem */}
      <path d="M52 45 Q60 52 68 45" fill="none" stroke="#1c1308" strokeWidth="3.2" strokeLinecap="round" />
      <polygon points="55,46 57,50 59,46" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />

      {/* DŘEVĚNÉ PRKÉNKO S MALÝM KORBELÍKEM PIVA S PĚNOU */}
      <line x1="76" y1="70" x2="106" y2="70" stroke="#7a481c" strokeWidth="4.5" strokeLinecap="round" />
      {/* Půllitřík s pěnou */}
      <rect x="85" y="56" width="12" height="14" rx="2" fill="#8f6336" stroke="#1c1308" strokeWidth="2" />
      <ellipse cx="91" cy="56" rx="7" ry="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="95" cy="53" r="2" fill="#ffffff" />
    </svg>
  );
}

/** Stádium 1: Karbanický čert (Úr. 12 - Hráč mariáše z hospody) */
function renderKarbanickyCert() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Karbanický čert">
      {/* Stín */}
      <ellipse cx="60" cy="111" rx="38" ry="7" fill="#1c1308" opacity="0.35" />

      {/* Ocas zatočený kolem nohy stolu */}
      <g className="anim-lada-tail" style={{ transformOrigin: '44px 86px', transformBox: 'view-box' }}>
        <path d="M44 86 C26 92 10 78 8 54 C6 36 20 30 24 32" fill="none" stroke="#221208" strokeWidth="6" strokeLinecap="round" />
        <path d="M24 32 C18 22 22 12 32 16 C30 28 36 30 24 32 Z" fill="#b82618" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* Nohy s kopyty */}
      <rect x="42" y="90" width="12" height="20" rx="4" fill="#221208" stroke="#1c1308" strokeWidth="3.2" />
      <rect x="66" y="90" width="12" height="20" rx="4" fill="#221208" stroke="#1c1308" strokeWidth="3.2" />
      <ellipse cx="48" cy="109" rx="7.5" ry="4" fill="#4d321c" stroke="#1c1308" strokeWidth="2.5" />
      <ellipse cx="72" cy="109" rx="7.5" ry="4" fill="#4d321c" stroke="#1c1308" strokeWidth="2.5" />

      {/* Pořádný trup v zelené sametové vestě */}
      <path
        d="M34 46 C32 78 36 96 60 96 C84 96 88 78 86 46 C86 40 78 38 60 38 C42 38 34 40 34 46 Z"
        fill="#221208"
        stroke="#1c1308"
        strokeWidth="3.8"
        strokeLinejoin="round"
      />

      {/* ZELENÁ SAMETOVÁ HOSPODSKÁ VESTA S MOSAZNÝMI KNOFLÍKY */}
      <path d="M40 48 C40 80 44 92 60 92 C76 92 80 80 80 48 Z" fill="#2d5e38" stroke="#1c1308" strokeWidth="3" />
      <circle cx="60" cy="58" r="2.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="60" cy="70" r="2.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />
      <circle cx="60" cy="82" r="2.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1.5" />

      {/* Velké svislé a špičaté čertí rohy */}
      <path d="M45 28 C41 16 35 7 38 2 C45 7 50 17 54 26 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M75 28 C79 16 85 7 82 2 C75 7 70 17 66 26 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="3.5" strokeLinejoin="round" />
      <line x1="43" y1="18" x2="49" y2="20" stroke="#945014" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="11" x2="45" y2="13" stroke="#945014" strokeWidth="2" strokeLinecap="round" />
      <line x1="77" y1="18" x2="71" y2="20" stroke="#945014" strokeWidth="2" strokeLinecap="round" />
      <line x1="80" y1="11" x2="75" y2="13" stroke="#945014" strokeWidth="2" strokeLinecap="round" />

      {/* KARTA ZA LEVÝM UCHEM / ROHY (Eso žaludské / Červené eso za kloboukem či rohem) */}
      <rect x="76" y="14" width="11" height="16" rx="2" fill="#ffffff" stroke="#1c1308" strokeWidth="2" transform="rotate(18 80 22)" />
      <circle cx="81" cy="22" r="2.5" fill="#c42c17" />
      <polygon points="81,19 78,24 84,24" fill="#c42c17" />

      {/* Hlava čerta karbaníka */}
      <circle cx="60" cy="38" r="19" fill="#221208" stroke="#1c1308" strokeWidth="3.5" />

      {/* Potutelné žluté oči s lišáckým pohledem */}
      <circle cx="52" cy="35" r="6.5" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="68" cy="35" r="6.5" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <g className="anim-lada-blink">
        <ellipse cx="53" cy="35" rx="2.5" ry="4.5" fill="#1c1308" />
        <ellipse cx="69" cy="35" rx="2.5" ry="4.5" fill="#1c1308" />
      </g>

      {/* Lišácký široký úsměv s kouřící dýmkou */}
      <path d="M50 46 Q60 54 70 46" fill="none" stroke="#1c1308" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="53,47 55,52 57,47" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />

      {/* Dýmka s kouřem */}
      <path d="M68 47 L82 50" stroke="#7a481c" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="81" y="45" width="8" height="10" rx="2" fill="#b86923" stroke="#1c1308" strokeWidth="2" />
      <circle cx="88" cy="44" r="2.8" fill="#f4efe6" stroke="#1c1308" strokeWidth="1" className="anim-lada-smoke-1" />
      <circle cx="92" cy="38" r="4.2" fill="#f4efe6" stroke="#1c1308" strokeWidth="1.2" className="anim-lada-smoke-2" />
      <circle cx="98" cy="30" r="5.6" fill="#f4efe6" stroke="#1c1308" strokeWidth="1.2" className="anim-lada-smoke-3" />

      {/* VĚJÍŘ MARIÁŠOVÝCH KARET V TLAPCE (Eso žaludské a červený král) */}
      <g transform="translate(18, 56) rotate(-12)">
        <rect x="0" y="0" width="13" height="19" rx="2" fill="#ffffff" stroke="#1c1308" strokeWidth="2" />
        {/* Žalud (zelený mariášový žalud) */}
        <ellipse cx="6.5" cy="9.5" rx="3" ry="4" fill="#3a7536" />
        <rect x="5.5" y="13" width="2" height="3" fill="#6e421c" />
      </g>
      <g transform="translate(26, 54) rotate(8)">
        <rect x="0" y="0" width="13" height="19" rx="2" fill="#ffffff" stroke="#1c1308" strokeWidth="2" />
        {/* Srdce / Červená barva */}
        <path d="M6.5 7 Q4 4 2 7 Q2 12 6.5 15 Q11 12 11 7 Q9 4 6.5 7 Z" fill="#c42c17" />
      </g>
    </svg>
  );
}

/** Stádium 2: Hospodský čert (Úr. 16 - Velký mistr hospody s tuplákem piva) */
function renderHospodskyCertClassic() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Hospodský čert">
      {/* Mohutný stín na podlaze */}
      <ellipse cx="60" cy="112" rx="40" ry="7.5" fill="#1c1308" opacity="0.4" />

      {/* Majestátní svislé a špičaté rohy hospodského čerta s vroubky */}
      <path d="M44 30 C39 16 32 6 36 0 C44 6 51 17 55 28 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="3.8" strokeLinejoin="round" />
      <path d="M76 30 C81 16 88 6 84 0 C76 6 69 17 65 28 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="3.8" strokeLinejoin="round" />
      {/* Vroubkování rohů */}
      <line x1="42" y1="20" x2="49" y2="22" stroke="#945014" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="39" y1="14" x2="46" y2="16" stroke="#945014" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="37" y1="8" x2="42" y2="10" stroke="#945014" strokeWidth="2" strokeLinecap="round" />
      <line x1="78" y1="20" x2="71" y2="22" stroke="#945014" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="81" y1="14" x2="74" y2="16" stroke="#945014" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="83" y1="8" x2="78" y2="10" stroke="#945014" strokeWidth="2" strokeLinecap="round" />

      {/* Zlatý kroužek na svislém rohu */}
      <ellipse cx="37.5" cy="11" rx="5" ry="2.8" fill="none" stroke="#ffd438" strokeWidth="3" transform="rotate(-20 37.5 11)" />

      {/* Silný zatočený ocas s bujným plamenným štětcem */}
      <g className="anim-lada-tail" style={{ transformOrigin: '44px 88px', transformBox: 'view-box' }}>
        <path d="M44 88 C32 92 10 86 8 60 C6 38 18 34 20 34" fill="none" stroke="#1c1008" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M20 34 C14 24 18 14 30 18 C28 30 34 32 20 34 Z" fill="#b82618" stroke="#1c1308" strokeWidth="2.8" />
      </g>

      {/* Pořádné silné nohy se zářivými černými kopýtky */}
      <rect x="38" y="90" width="14" height="20" rx="5" fill="#1c1008" stroke="#1c1308" strokeWidth="3.5" />
      <rect x="68" y="90" width="14" height="20" rx="5" fill="#1c1008" stroke="#1c1308" strokeWidth="3.5" />
      <ellipse cx="45" cy="109" rx="8.5" ry="4.5" fill="#4d321c" stroke="#1c1308" strokeWidth="2.8" />
      <ellipse cx="75" cy="109" rx="8.5" ry="4.5" fill="#4d321c" stroke="#1c1308" strokeWidth="2.8" />

      {/* Veliké zavalité tělo s pořádným pupkem */}
      <path
        d="M30 46 C28 80 34 98 60 98 C86 98 92 80 90 46 C90 38 80 36 60 36 C40 36 30 38 30 46 Z"
        fill="#1c1008"
        stroke="#1c1308"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* ČERVENÁ SOUKENNÁ VESTA S MOSAZNÝMI KNOFLÍKY A ZLATÝM ŘETÍZKEM */}
      <path d="M38 50 C38 84 42 94 60 94 C78 94 82 84 82 50 Z" fill="#b82414" stroke="#1c1308" strokeWidth="3.2" />
      {/* Zlatý řetízek od kapesních hodinek napnutý přes pupek */}
      <path d="M44 70 Q60 84 76 70" fill="none" stroke="#ffd438" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="44" cy="70" r="2.5" fill="#ffd438" />
      <circle cx="76" cy="70" r="2.5" fill="#ffd438" />

      {/* Hlava s rozverným a hrozivým čertovským výrazem */}
      <circle cx="60" cy="38" r="21" fill="#221208" stroke="#1c1308" strokeWidth="4" />

      {/* Tváře červené od piva */}
      <circle cx="43" cy="46" r="6.5" fill="#b82414" opacity="0.85" />
      <circle cx="77" cy="46" r="6.5" fill="#b82414" opacity="0.85" />

      {/* Žluté svítící kočičí oči */}
      <circle cx="51" cy="35" r="7.5" fill="#ffd438" stroke="#1c1308" strokeWidth="3" />
      <circle cx="69" cy="35" r="7.5" fill="#ffd438" stroke="#1c1308" strokeWidth="3" />
      <g className="anim-lada-blink">
        <ellipse cx="51" cy="35" rx="2.8" ry="6" fill="#1c1308" />
        <ellipse cx="69" cy="35" rx="2.8" ry="6" fill="#1c1308" />
        <circle cx="52" cy="32" r="1.2" fill="#ffffff" />
        <circle cx="70" cy="32" r="1.2" fill="#ffffff" />
      </g>

      {/* Široká huba s tesáky a bujným smíchem */}
      <path d="M48 48 Q60 58 72 48" fill="none" stroke="#1c1308" strokeWidth="4" strokeLinecap="round" />
      <polygon points="52,48 55,54 58,48" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
      <polygon points="62,48 65,54 68,48" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />

      {/* MOHUTNÝ KAMENINOVÝ KORBEL S NAPĚNĚNÝM PIVEM V RUCE */}
      <rect x="83" y="64" width="18" height="22" rx="3" fill="#8f6336" stroke="#1c1308" strokeWidth="3.2" />
      <line x1="88" y1="70" x2="88" y2="82" stroke="#6e421c" strokeWidth="2" />
      {/* Ucho korbelu */}
      <path d="M101 68 C110 68 110 82 101 82" fill="none" stroke="#1c1308" strokeWidth="3.2" strokeLinecap="round" />
      {/* Přetékající hustá bílá pěna s animovanými pivními bublinami a pěnovým šumem */}
      <ellipse cx="92" cy="64" rx="10" ry="5.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2.2" />
      <circle cx="98" cy="60" r="3.6" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" className="anim-beer-bubble-1" />
      <circle cx="86" cy="61" r="2.8" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" className="anim-beer-bubble-2" />
      <circle cx="92" cy="58" r="2.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1" className="anim-beer-bubble-3" />
      <circle cx="102" cy="63" r="1.8" fill="#ffffff" stroke="#1c1308" strokeWidth="0.8" className="anim-beer-bubble-2" />
      <circle cx="83" cy="65" r="1.6" fill="#ffffff" stroke="#1c1308" strokeWidth="0.8" className="anim-beer-bubble-1" />
      {/* Kapka pěny stékající po korbelu */}
      <path d="M96 68 Q98 73 96 76 Q94 73 96 68 Z" fill="#ffffff" className="anim-lada-drip-1" />
    </svg>
  );
}

/** Stádium 3: Rohatý kníže (Úr. 20 - Nejvyšší Lucifer z pekelné říše) */
function renderRohatyKnize() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Rohatý kníže">
      {/* Pekelný plamenný stín se žhavými uhlíky */}
      <ellipse cx="60" cy="112" rx="42" ry="8" fill="#b82618" opacity="0.45" />

      {/* Obrovské majestátní svislé a špičaté rohy se zlatými prstenci a rubíny */}
      <path d="M44 30 C38 14 30 2 33 -5 C43 3 50 16 55 28 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="4" strokeLinejoin="round" />
      <path d="M76 30 C82 14 90 2 87 -5 C77 3 70 16 65 28 Z" fill="#cf7a2b" stroke="#1c1308" strokeWidth="4" strokeLinejoin="round" />
      {/* Vroubkování rohů */}
      <line x1="42" y1="19" x2="49" y2="21" stroke="#945014" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="38" y1="12" x2="45" y2="14" stroke="#945014" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="35" y1="5" x2="41" y2="7" stroke="#945014" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="78" y1="19" x2="71" y2="21" stroke="#945014" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="82" y1="12" x2="75" y2="14" stroke="#945014" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="85" y1="5" x2="79" y2="7" stroke="#945014" strokeWidth="2.2" strokeLinecap="round" />
      {/* Zlaté kroužky a vykládané rubíny na obou svislých rozích */}
      <ellipse cx="35" cy="8" rx="5" ry="2.6" fill="none" stroke="#ffd438" strokeWidth="3" transform="rotate(-22 35 8)" />
      <circle cx="35" cy="8" r="2.2" fill="#e63e1e" stroke="#1c1308" strokeWidth="1" />
      <ellipse cx="85" cy="8" rx="5" ry="2.6" fill="none" stroke="#ffd438" strokeWidth="3" transform="rotate(22 85 8)" />
      <circle cx="85" cy="8" r="2.2" fill="#e63e1e" stroke="#1c1308" strokeWidth="1" />

      {/* ZLATÁ PEKELNÁ ŠPIČATÁ KORUNA S RUBÍNEM */}
      <polygon points="48,18 53,6 60,13 67,6 72,18" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="60" cy="14" r="2.5" fill="#c42c17" />
      <circle cx="53" cy="15" r="1.5" fill="#1c1308" />
      <circle cx="67" cy="15" r="1.5" fill="#1c1308" />

      {/* Hrozivý královský ocas s plamenným hrotem */}
      <g className="anim-lada-tail" style={{ transformOrigin: '44px 88px', transformBox: 'view-box' }}>
        <path d="M44 88 C30 94 8 86 6 58 C4 34 16 28 18 28" fill="none" stroke="#140b05" strokeWidth="7" strokeLinecap="round" />
        <path d="M18 28 C10 16 16 4 30 8 C26 22 34 26 18 28 Z" fill="#e63e1e" stroke="#1c1308" strokeWidth="3" />
        <circle cx="20" cy="16" r="3" fill="#ffd438" />
      </g>

      {/* Silné nohy v temné srsti s těžkými kopyty */}
      <rect x="36" y="90" width="14" height="21" rx="5" fill="#140b05" stroke="#1c1308" strokeWidth="3.8" />
      <rect x="70" y="90" width="14" height="21" rx="5" fill="#140b05" stroke="#1c1308" strokeWidth="3.8" />
      <ellipse cx="43" cy="110" rx="9" ry="5" fill="#382112" stroke="#1c1308" strokeWidth="3" />
      <ellipse cx="77" cy="110" rx="9" ry="5" fill="#382112" stroke="#1c1308" strokeWidth="3" />

      {/* VLÁDCOVSKÝ PURPUROVÝ PLÁŠŤ S ČERNÝM HERMELÍNEM */}
      <path
        d="M26 44 C22 78 28 104 60 104 C92 104 98 78 94 44 Z"
        fill="#661414"
        stroke="#1c1308"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Hermelínový kožešinový límec kolem krku */}
      <path d="M36 46 Q60 56 84 46 Q60 38 36 46 Z" fill="#242121" stroke="#1c1308" strokeWidth="3" />
      <circle cx="48" cy="48" r="1.5" fill="#ffd438" />
      <circle cx="60" cy="50" r="1.5" fill="#ffd438" />
      <circle cx="72" cy="48" r="1.5" fill="#ffd438" />

      {/* Temná vesta se zlatým lemem a řetězem */}
      <path d="M42 52 C42 82 46 94 60 94 C74 94 78 82 78 52 Z" fill="#1c1008" stroke="#1c1308" strokeWidth="3" />
      <path d="M46 68 Q60 80 74 68" fill="none" stroke="#ffd438" strokeWidth="3.5" strokeLinecap="round" />

      {/* Impozantní pekelná hlava s bradkou */}
      <circle cx="60" cy="38" r="22" fill="#1c1008" stroke="#1c1308" strokeWidth="4" />

      {/* Kozí bradka na bradě knížete */}
      <polygon points="56,54 64,54 60,65" fill="#140b05" stroke="#1c1308" strokeWidth="2" />

      {/* Zlověstné planoucí rudé oči s kočičí zřítelnicí */}
      <circle cx="51" cy="36" r="7.5" fill="#ffd438" stroke="#1c1308" strokeWidth="3" />
      <circle cx="69" cy="36" r="7.5" fill="#ffd438" stroke="#1c1308" strokeWidth="3" />
      <ellipse cx="51" cy="36" rx="2.5" ry="6.5" fill="#b81d13" />
      <ellipse cx="69" cy="36" rx="2.5" ry="6.5" fill="#b81d13" />
      <circle cx="52" cy="33" r="1.2" fill="#ffffff" />
      <circle cx="70" cy="33" r="1.2" fill="#ffffff" />

      {/* Majestátní úšklebek s velkými ostrými tesáky */}
      <path d="M48 48 Q60 58 72 48" fill="none" stroke="#1c1308" strokeWidth="4" strokeLinecap="round" />
      <polygon points="51,48 54,56 57,48" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
      <polygon points="63,48 66,56 69,48" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />

      {/* ČERNÁ KNIHA HŘÍCHŮ S ČERVENOU PEČETÍ V JEDNÉ RUCE */}
      <g transform="translate(80, 60) rotate(10)">
        <rect x="0" y="0" width="18" height="26" rx="2" fill="#241710" stroke="#1c1308" strokeWidth="2.5" />
        {/* Zlaté kování rohů */}
        <polygon points="0,0 6,0 0,6" fill="#ffd438" />
        <polygon points="18,0 12,0 18,6" fill="#ffd438" />
        <polygon points="0,26 6,26 0,20" fill="#ffd438" />
        <polygon points="18,26 12,26 18,20" fill="#ffd438" />
        {/* Červená visící pečeť na stuze */}
        <line x1="9" y1="20" x2="9" y2="31" stroke="#c42c17" strokeWidth="3" />
        <circle cx="9" cy="31" r="3.5" fill="#c42c17" stroke="#1c1308" strokeWidth="1.5" />
      </g>

      {/* Havraní pero na zápis duší v druhé ruce */}
      <path d="M30 65 Q22 55 18 42 Q28 48 30 65 Z" fill="#1c1308" stroke="#ffd438" strokeWidth="1.2" />
      <line x1="30" y1="65" x2="33" y2="72" stroke="#f4efe6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
