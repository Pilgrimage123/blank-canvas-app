import React from "react";

/**
 * Autentické Ladovské sprity pro strašidla a pohádkové bytosti.
 * Obsahuje detailní zpracování a paletové swapy:
 * - Bubák (sláma, huňatá srst, vidle, dýmka) vs Hrobník (náhrobní plášť, břečťan, rýč, kostěná lucerna)
 * - Polednice (sluneční úžeh, srp, plátno) vs Klekanice (soumrak, nůše s bludičkami, zvonící kostelní zvonek)
 * - Mrtvák (mechový vesničan, kopáč, kopretina) vs Kostlivec (chřestící kosti, puntíkatý šátek, stehenní kost)
 * - Bytosti: Ohnivý muž (jiskry, plamenná hlava, lucerna), Bílá paní (závoj, klíče),
 *   Divoch Helkal (stromová kůra, haluz, uši), Upír (samet, netopýr), Pavouk (8 kmitajících nohou),
 *   Pekelné dudy (hrající noty), Svítící oko (pulzující aura), Netopýr (mávající křídla),
 *   Čertova babička (šátek s puntíky, vařečka, kotlík).
 */

export function renderLadaSpookySprite(type: string, stage: number = 2): React.ReactNode {
  switch (type) {
    case "bubak":
      return renderBubak(stage);
    case "hrobnik":
      return renderHrobnik(stage);
    case "polednice":
      return renderPolednice(stage);
    case "klekanice":
      return renderKlekanice(stage);
    case "mrtvak":
      return renderMrtvak(stage);
    case "kostlivec":
      return renderKostlivec(stage);
    case "ohnivy":
    case "ohnivy_muz":
      return renderOhnivy(stage);
    case "bila":
    case "bila_pani":
      return renderBilaPani(stage);
    case "helkal":
      return renderHelkal(stage);
    case "upir":
      return renderUpir(stage);
    case "pavouk":
      return renderPavouk(stage);
    case "pekelne_dudy":
      return renderPekelneDudy(stage);
    case "svitici_oko":
      return renderSviticiOko(stage);
    case "netopyr":
      return renderNetopyr(stage);
    case "certova_babicka":
      return renderCertovaBabicka(stage);
    default:
      return renderGenericSpooky();
  }
}

/* =========================================================================
 * 1. BUBÁK vs HROBNÍK (PALETTE SWAP & PROFILOVÉ ROZDÍLY)
 * ========================================================================= */

function renderBubak(stage: number): React.ReactNode {
  const furColor = stage === 0 ? "#684a30" : stage === 3 ? "#342114" : "#4a3726";
  const strawColor = stage === 3 ? "#ffd438" : "#e0aa28";

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Bubák od stodoly"
    >
      {/* Stín na mlatu */}
      <ellipse cx="60" cy="110" rx="38" ry="7" fill="#1c1308" opacity="0.35" />

      {/* Chvějící se stébla slámy čouhající z kožichu */}
      <g className="anim-straw-twitch">
        <line
          x1="28"
          y1="80"
          x2="14"
          y2="92"
          stroke={strawColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="90"
          y1="75"
          x2="110"
          y2="84"
          stroke={strawColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="84"
          y1="48"
          x2="104"
          y2="42"
          stroke={strawColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="45"
          x2="18"
          y2="40"
          stroke={strawColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Huňaté tělo s texturou srsti */}
      <path
        d="M60 25 C32 25 24 50 25 78 C26 98 40 108 60 108 C80 108 94 98 95 78 C96 50 88 25 60 25 Z"
        fill={furColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Chumáče chlupů */}
      <path d="M25 62 L18 68 L26 74" fill={furColor} stroke="#1c1308" strokeWidth="3" />
      <path d="M95 62 L102 68 L94 74" fill={furColor} stroke="#1c1308" strokeWidth="3" />
      <path d="M42 28 L40 18 L48 24" fill={furColor} stroke="#1c1308" strokeWidth="3" />
      <path d="M78 28 L80 18 L72 24" fill={furColor} stroke="#1c1308" strokeWidth="3" />

      {/* Veliké soví oči se žlutým duhovým okružím */}
      <circle cx="46" cy="54" r="14" fill="#f8e58a" stroke="#1c1308" strokeWidth="3.5" />
      <circle cx="74" cy="54" r="14" fill="#f8e58a" stroke="#1c1308" strokeWidth="3.5" />
      <circle cx="46" cy="54" r="11" fill="#facc15" />
      <circle cx="74" cy="54" r="11" fill="#facc15" />

      {/* Mrkající zorničky */}
      <g className="anim-lada-blink">
        <circle cx="48" cy="54" r="6.5" fill="#1c1308" />
        <circle cx="50" cy="52" r="2" fill="#ffffff" />
        <circle cx="72" cy="54" r="6.5" fill="#1c1308" />
        <circle cx="74" cy="52" r="2" fill="#ffffff" />
      </g>

      {/* Červený bramborový nos */}
      <ellipse cx="60" cy="65" rx="7.5" ry="6" fill="#c2442d" stroke="#1c1308" strokeWidth="2.8" />

      {/* Růžové tváře */}
      <circle cx="34" cy="66" r="6" fill="#e86b54" opacity="0.65" />
      <circle cx="86" cy="66" r="6" fill="#e86b54" opacity="0.65" />

      {/* Dýmka s dýmem stoupajícím vzhůru */}
      <g className="anim-pipe-smoke">
        <circle
          cx="34"
          cy="68"
          r="2.5"
          fill="#ffffff"
          opacity="0.8"
          stroke="#1c1308"
          strokeWidth="0.8"
        />
        <circle
          cx="30"
          cy="60"
          r="3.8"
          fill="#ffffff"
          opacity="0.65"
          stroke="#1c1308"
          strokeWidth="0.8"
        />
        <circle
          cx="26"
          cy="50"
          r="5"
          fill="#ffffff"
          opacity="0.4"
          stroke="#1c1308"
          strokeWidth="0.8"
        />
      </g>
      <line
        x1="52"
        y1="76"
        x2="38"
        y2="74"
        stroke="#d4ab74"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="34"
        y="70"
        width="5.5"
        height="7"
        rx="1.5"
        fill="#8f5b2e"
        stroke="#1c1308"
        strokeWidth="1.8"
      />

      {/* Ústa */}
      <path
        d="M50 78 Q60 84 70 78"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Tlapy */}
      <rect
        x="36"
        y="98"
        width="14"
        height="12"
        rx="5"
        fill="#38281a"
        stroke="#1c1308"
        strokeWidth="3"
      />
      <rect
        x="70"
        y="98"
        width="14"
        height="12"
        rx="5"
        fill="#38281a"
        stroke="#1c1308"
        strokeWidth="3"
      />

      {/* Dřevěné vidle na slámu se třemi hroty */}
      <g className="anim-weapon-sway" style={{ transformOrigin: "98px 90px" }}>
        <line
          x1="88"
          y1="104"
          x2="108"
          y2="38"
          stroke="#7a4d25"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M98 48 L108 32 L116 46"
          fill="none"
          stroke="#5a3818"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="108"
          y1="36"
          x2="108"
          y2="24"
          stroke="#5a3818"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function renderHrobnik(stage: number): React.ReactNode {
  const coatColor = stage === 3 ? "#16201b" : stage === 0 ? "#435248" : "#2b362f";

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Hrobník-bubák">
      {/* Hřbitovní stín a mlha */}
      <ellipse cx="60" cy="110" rx="38" ry="7" fill="#1c1308" opacity="0.4" />
      <ellipse cx="60" cy="110" rx="26" ry="4" fill="#a7f3d0" opacity="0.25" />

      {/* Dlouhý temný hřbitovní kabát se záplatami */}
      <path
        d="M36 50 C32 78 36 104 60 104 C84 104 88 78 84 50 Z"
        fill={coatColor}
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Šedá záplata s křížkem */}
      <rect
        x="44"
        y="78"
        width="12"
        height="12"
        fill="#526056"
        stroke="#1c1308"
        strokeWidth="2"
        transform="rotate(-6 50 84)"
      />
      <line x1="46" y1="84" x2="54" y2="84" stroke="#1c1308" strokeWidth="1.2" />
      <line x1="50" y1="80" x2="50" y2="88" stroke="#1c1308" strokeWidth="1.2" />

      {/* Opršený zplihlý plstěný klobouk s listem břečťanu */}
      <ellipse cx="60" cy="28" rx="34" ry="8" fill="#1f2723" stroke="#1c1308" strokeWidth="3.5" />
      <path d="M42 27 L46 12 L74 12 L78 27 Z" fill="#29332d" stroke="#1c1308" strokeWidth="3.5" />
      {/* Hřbitovní břečťan za stuhou */}
      <path
        d="M72 25 Q77 20 80 24 Q78 28 72 25 Z"
        fill="#52795d"
        stroke="#1c1308"
        strokeWidth="1.2"
      />

      {/* Mrzutý obličej s hustým šedým plnovousem */}
      <circle cx="60" cy="40" r="16" fill="#dbc5a4" stroke="#1c1308" strokeWidth="3.5" />

      {/* Huňaté šedivé obočí */}
      <path
        d="M46 32 Q52 28 57 33"
        fill="none"
        stroke="#8a8a86"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M74 32 Q68 28 63 33"
        fill="none"
        stroke="#8a8a86"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Očka hrobníka */}
      <circle cx="52" cy="37" r="3.5" fill="#1c1308" />
      <circle cx="68" cy="37" r="3.5" fill="#1c1308" />
      <circle cx="53" cy="36" r="1" fill="#ffffff" />
      <circle cx="69" cy="36" r="1" fill="#ffffff" />

      {/* Baňatý nos */}
      <circle cx="60" cy="43" r="5" fill="#c4533b" stroke="#1c1308" strokeWidth="2.5" />

      {/* Šedivý plnovous */}
      <path
        d="M48 46 C44 64 76 64 72 46 Z"
        fill="#a6a49c"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Hřbitovní rýč zapíchnutý v zemi (pohupování) */}
      <g className="anim-weapon-sway" style={{ transformOrigin: "98px 98px" }}>
        <line
          x1="86"
          y1="40"
          x2="98"
          y2="108"
          stroke="#5a3818"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M92 92 L106 88 L104 106 L90 108 Z"
          fill="#8f99a3"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Kostěná lucerna se zelenkavým plamínkem */}
      <g className="anim-sway-slow" style={{ transformOrigin: "28px 60px" }}>
        <line x1="38" y1="58" x2="28" y2="68" stroke="#5a3818" strokeWidth="2.5" />
        <rect
          x="22"
          y="68"
          width="12"
          height="16"
          rx="2"
          fill="#334155"
          stroke="#1c1308"
          strokeWidth="2"
        />
        <circle cx="28" cy="76" r="3.5" fill="#6ee7b7" className="anim-eye-pulse" />
      </g>
    </svg>
  );
}

/* =========================================================================
 * 2. POLEDNICE vs KLEKANICE (SLUNCE vs SOUMRAK)
 * ========================================================================= */

function renderPolednice(stage: number): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Polednice z pole"
    >
      {/* Žhnoucí polední stín na strništi */}
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#1c1308" opacity="0.3" />
      <ellipse cx="60" cy="112" rx="24" ry="4" fill="#f59e0b" opacity="0.25" />

      {/* Žlutavá sluneční aura */}
      <circle cx="60" cy="60" r="48" fill="#fef08a" opacity="0.15" className="anim-eye-pulse" />

      {/* Vlající potrhaná režná plátěná sukně */}
      <path
        d="M44 54 C34 76 30 102 38 106 C48 106 72 106 82 106 C90 102 86 76 76 54 Z"
        fill="#f4ecd0"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Vyprahlá pšeničně okrová zástěra */}
      <path d="M48 60 L44 104 L76 104 L72 60 Z" fill="#b08242" stroke="#1c1308" strokeWidth="2.5" />

      {/* Vychrtlé tělo a ruce */}
      <path d="M42 54 L30 76" stroke="#d4b490" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 54 L90 70" stroke="#d4b490" strokeWidth="4" strokeLinecap="round" />

      {/* Rozcuchané divoké bílé vlasy vlající ve větru */}
      <path
        d="M34 26 C22 42 20 60 28 66 C32 54 36 44 42 38 Z"
        fill="#f8fafc"
        stroke="#1c1308"
        strokeWidth="2.8"
      />
      <path
        d="M86 26 C98 42 100 60 92 66 C88 54 84 44 78 38 Z"
        fill="#f8fafc"
        stroke="#1c1308"
        strokeWidth="2.8"
      />

      {/* Vrásčitá vyhublá hlava */}
      <circle cx="60" cy="38" r="15" fill="#e8caa4" stroke="#1c1308" strokeWidth="3.5" />

      {/* Vrásky a vpadlé oči */}
      <path d="M50 30 Q60 26 70 30" fill="none" stroke="#a37851" strokeWidth="2" />
      <circle cx="53" cy="36" r="3.2" fill="#1c1308" />
      <circle cx="67" cy="36" r="3.2" fill="#1c1308" />
      <circle cx="54" cy="35" r="1" fill="#fef08a" />
      <circle cx="68" cy="35" r="1" fill="#fef08a" />

      {/* Bezzubý křičící škleb */}
      <ellipse cx="60" cy="46" rx="5" ry="3.5" fill="#1c1308" />

      {/* Ostrý blyštivý srp na pšenici (pohupování) */}
      <g className="anim-weapon-sway" style={{ transformOrigin: "92px 70px" }}>
        <line
          x1="88"
          y1="68"
          x2="98"
          y2="76"
          stroke="#5a3818"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M96 74 C104 66 108 50 96 38 C90 46 94 62 96 74 Z"
          fill="#e2e8f0"
          stroke="#1c1308"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function renderKlekanice(stage: number): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Klekanice s nůší"
    >
      {/* Soumračný temně fialový stín */}
      <ellipse cx="60" cy="112" rx="36" ry="6.5" fill="#1c1308" opacity="0.38" />

      {/* Velká proutěná nůše na zádech se svítícími bludičkami */}
      <path
        d="M32 46 L26 94 L50 94 L54 46 Z"
        fill="#785332"
        stroke="#1c1308"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Proutěný výplet */}
      <line x1="29" y1="58" x2="52" y2="58" stroke="#4d321d" strokeWidth="1.8" />
      <line x1="28" y1="70" x2="51" y2="70" stroke="#4d321d" strokeWidth="1.8" />
      <line x1="27" y1="82" x2="50" y2="82" stroke="#4d321d" strokeWidth="1.8" />
      {/* Zlaté bludičky v nůši */}
      <circle cx="34" cy="50" r="2.8" fill="#fde047" className="anim-spark-1" />
      <circle cx="44" cy="52" r="2.4" fill="#facc15" className="anim-spark-2" />

      {/* Těžký soumračný fialovo-černý plášť */}
      <path
        d="M44 48 C36 74 38 104 62 104 C86 104 88 74 80 48 Z"
        fill="#261e33"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Tradiční tmavě vínový šátek uvázaný pod bradou s puntíky */}
      <path
        d="M46 36 C44 20 76 20 74 36 C74 46 70 54 60 56 C50 54 46 46 46 36 Z"
        fill="#751d28"
        stroke="#1c1308"
        strokeWidth="3.2"
      />
      <circle cx="54" cy="28" r="1.5" fill="#fde047" />
      <circle cx="66" cy="28" r="1.5" fill="#fde047" />
      <circle cx="60" cy="34" r="1.5" fill="#fde047" />

      {/* Stařecká vrásčitá tvář klekanice */}
      <circle cx="60" cy="40" r="12" fill="#c9ad8b" stroke="#1c1308" strokeWidth="3" />
      <circle cx="55" cy="39" r="2.2" fill="#1c1308" />
      <circle cx="65" cy="39" r="2.2" fill="#1c1308" />
      <path
        d="M57 46 Q60 48 63 46"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sukovitá hůl v pravé ruce se zavěšeným kostelním zvonkem */}
      <line
        x1="84"
        y1="46"
        x2="94"
        y2="108"
        stroke="#5a3818"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Zvonící mosazný kostelní zvonek s animovaným klinkáním */}
      <g className="anim-bell-swing" style={{ transformOrigin: "88px 58px" }}>
        <line x1="84" y1="56" x2="88" y2="64" stroke="#d97706" strokeWidth="2" />
        <path d="M84 64 L92 64 L95 72 L81 72 Z" fill="#f59e0b" stroke="#1c1308" strokeWidth="2" />
        <circle cx="88" cy="74" r="1.5" fill="#78350f" />
        {/* Noty/vlny zvonění */}
        <path
          d="M96 66 Q100 68 98 72"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* =========================================================================
 * 3. MRTVÁK vs KOSTLIVEC
 * ========================================================================= */

function renderMrtvak(stage: number): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Mrtvák ze škarpy"
    >
      <ellipse cx="60" cy="110" rx="36" ry="6" fill="#1c1308" opacity="0.32" />

      {/* Mechově zelené vesnické tělo se záplatovanou vestou */}
      <path
        d="M40 52 C36 78 38 102 60 102 C82 102 84 78 80 52 Z"
        fill="#5a6b48"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Dřeváky */}
      <ellipse cx="46" cy="104" rx="8" ry="5" fill="#8f5b2e" stroke="#1c1308" strokeWidth="2" />
      <ellipse cx="74" cy="104" rx="8" ry="5" fill="#8f5b2e" stroke="#1c1308" strokeWidth="2" />

      {/* Mechová hlava s hloupoučkým šklebem */}
      <circle cx="60" cy="40" r="16" fill="#82956c" stroke="#1c1308" strokeWidth="3.5" />

      {/* Šikmý slaměný klobouk s bílou kopretinou */}
      <ellipse
        cx="60"
        cy="27"
        rx="26"
        ry="6"
        fill="#d4a34b"
        stroke="#1c1308"
        strokeWidth="2.8"
        transform="rotate(-8 60 27)"
      />
      <path d="M46 26 L50 12 L70 10 L74 24 Z" fill="#e5b869" stroke="#1c1308" strokeWidth="2.8" />
      {/* Bílá kopretina pohupující se ve větru */}
      <g className="anim-flower-bob">
        <circle cx="68" cy="22" r="3" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
        <circle cx="68" cy="22" r="1.5" fill="#facc15" />
      </g>

      {/* Různě velká vyvalená očka */}
      <circle cx="52" cy="38" r="4.5" fill="#ffffff" stroke="#1c1308" strokeWidth="2" />
      <circle cx="68" cy="38" r="3.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.8" />
      <circle cx="53" cy="38" r="2" fill="#1c1308" />
      <circle cx="68" cy="38" r="1.5" fill="#1c1308" />

      {/* Mezerovitý úsměv s jedním zubem */}
      <path
        d="M52 48 Q60 54 68 48"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="58" y="48" width="3" height="3.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />

      {/* Rezavý zahradnický rýč v ruce */}
      <g className="anim-weapon-sway" style={{ transformOrigin: "88px 90px" }}>
        <line
          x1="82"
          y1="50"
          x2="92"
          y2="106"
          stroke="#78350f"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect
          x="86"
          y="94"
          width="12"
          height="14"
          rx="2"
          fill="#9a3412"
          stroke="#1c1308"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

function renderKostlivec(stage: number): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Starý kostlivec"
    >
      <ellipse cx="60" cy="110" rx="34" ry="6" fill="#1c1308" opacity="0.32" />

      {/* Kostečky nohou a pánve */}
      <line
        x1="48"
        y1="84"
        x2="46"
        y2="106"
        stroke="#f7f1e1"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="84"
        x2="46"
        y2="106"
        stroke="#1c1308"
        strokeWidth="5.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      <line
        x1="72"
        y1="84"
        x2="74"
        y2="106"
        stroke="#f7f1e1"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Žebra a páteř */}
      <line
        x1="60"
        y1="52"
        x2="60"
        y2="82"
        stroke="#f7f1e1"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M48 60 Q60 64 72 60"
        fill="none"
        stroke="#f7f1e1"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M46 68 Q60 72 74 68"
        fill="none"
        stroke="#f7f1e1"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M50 76 Q60 80 70 76"
        fill="none"
        stroke="#f7f1e1"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Veselý červený puntíkatý šáteček kolem krku */}
      <path
        d="M52 50 Q60 56 68 50 Q60 46 52 50 Z"
        fill="#dc2626"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <circle cx="56" cy="49" r="1" fill="#ffffff" />
      <circle cx="64" cy="49" r="1" fill="#ffffff" />

      {/* Lebka s velkými očními důlky a planoucími knoty */}
      <ellipse cx="60" cy="36" rx="16" ry="14" fill="#f7f1e1" stroke="#1c1308" strokeWidth="3.5" />
      <rect
        x="52"
        y="44"
        width="16"
        height="8"
        rx="2"
        fill="#f7f1e1"
        stroke="#1c1308"
        strokeWidth="2.5"
      />

      {/* Oční důlky s plamínkem */}
      <ellipse cx="53" cy="36" rx="4.5" ry="5" fill="#1c1308" />
      <ellipse cx="67" cy="36" rx="4.5" ry="5" fill="#1c1308" />
      <circle cx="53" cy="36" r="1.8" fill="#f59e0b" className="anim-eye-pulse" />
      <circle cx="67" cy="36" r="1.8" fill="#f59e0b" className="anim-eye-pulse" />

      {/* Nosní dutina a zuby */}
      <polygon points="59,42 61,42 60,40" fill="#1c1308" />
      <line x1="55" y1="46" x2="55" y2="50" stroke="#1c1308" strokeWidth="1.5" />
      <line x1="60" y1="46" x2="60" y2="50" stroke="#1c1308" strokeWidth="1.5" />
      <line x1="65" y1="46" x2="65" y2="50" stroke="#1c1308" strokeWidth="1.5" />

      {/* Stehenní kost držená jako kyj */}
      <g className="anim-weapon-sway" style={{ transformOrigin: "86px 68px" }}>
        <line
          x1="78"
          y1="62"
          x2="96"
          y2="40"
          stroke="#f7f1e1"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle cx="98" cy="38" r="3.5" fill="#f7f1e1" stroke="#1c1308" strokeWidth="1.5" />
        <circle cx="94" cy="36" r="3.5" fill="#f7f1e1" stroke="#1c1308" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* =========================================================================
 * 4. POHÁDKOVÉ BYTOSTI (OHNIVÝ MUŽ, BÍLÁ PANÍ, HELKAL, UPÍR ATD.)
 * ========================================================================= */

function renderOhnivy(stage: number): React.ReactNode {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Ohnivý muž">
      <ellipse cx="60" cy="110" rx="36" ry="6.5" fill="#1c1308" opacity="0.4" />
      <ellipse cx="60" cy="110" rx="24" ry="4" fill="#f97316" opacity="0.3" />

      {/* Stoupající ohnivé jiskry */}
      <circle cx="48" cy="35" r="2.2" fill="#ffd438" className="anim-spark-1" />
      <circle cx="72" cy="30" r="2.5" fill="#f97316" className="anim-spark-2" />
      <circle cx="60" cy="15" r="1.8" fill="#ffd438" className="anim-spark-1" />

      {/* Uhelné tělo se žhavými prasklinami */}
      <path
        d="M38 54 C34 78 38 102 60 102 C82 102 86 78 82 54 Z"
        fill="#261712"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Praskliny lávy v hrudi */}
      <path
        d="M52 64 L60 72 L58 84 L64 92"
        fill="none"
        stroke="#f97316"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M68 62 L64 70 L72 78"
        fill="none"
        stroke="#ffd438"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Tancující plamenná hlava */}
      <g className="anim-lada-flicker">
        <path
          d="M36 44 C28 28 42 12 60 4 C78 12 92 28 84 44 C92 50 82 58 60 58 C38 58 28 50 36 44 Z"
          fill="#e11d48"
          stroke="#1c1308"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M44 42 C40 28 50 16 60 10 C70 16 80 28 76 42 C80 46 74 52 60 52 C46 52 40 46 44 42 Z"
          fill="#f97316"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
        <path
          d="M50 38 C48 28 54 20 60 15 C66 20 72 28 70 38 C70 44 50 44 50 38 Z"
          fill="#fde047"
        />
      </g>

      {/* Žhoucí uhlíky v očích */}
      <ellipse cx="50" cy="40" rx="5" ry="4" fill="#ffffff" stroke="#1c1308" strokeWidth="2" />
      <ellipse cx="70" cy="40" rx="5" ry="4" fill="#ffffff" stroke="#1c1308" strokeWidth="2" />
      <circle cx="50" cy="40" r="2.5" fill="#e11d48" />
      <circle cx="70" cy="40" r="2.5" fill="#e11d48" />

      {/* Bouřková lucerna v ruce (houpající se) */}
      <g className="anim-sway-slow" style={{ transformOrigin: "94px 74px" }}>
        <line
          x1="82"
          y1="64"
          x2="94"
          y2="82"
          stroke="#4a2c14"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect
          x="88"
          y="80"
          width="14"
          height="20"
          rx="3"
          fill="#facc15"
          stroke="#1c1308"
          strokeWidth="3"
        />
        <path d="M86 80 L104 80 L98 74 L92 74 Z" fill="#4a2c14" stroke="#1c1308" strokeWidth="2" />
        <line x1="95" y1="80" x2="95" y2="100" stroke="#1c1308" strokeWidth="2" />
      </g>
    </svg>
  );
}

function renderBilaPani(stage: number): React.ReactNode {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Bílá paní">
      {/* Éterická záře a stín */}
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#e0f2fe" opacity="0.4" />

      {/* Dlouhé sněhobílé šaty s perleťovými záhyby */}
      <path
        d="M44 48 C36 74 32 104 42 108 C54 108 66 108 78 108 C88 104 84 74 76 48 Z"
        fill="#f8fafc"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M46 72 Q50 94 48 106"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M74 72 Q70 94 72 106"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Vlající průsvitný závoj */}
      <path
        d="M38 28 C26 44 24 70 30 84 C34 68 36 48 44 34 Z"
        fill="#f1f5f9"
        stroke="#1c1308"
        strokeWidth="2.5"
        opacity="0.9"
        className="anim-lada-veil"
      />

      {/* Jemná šlechtická hlava */}
      <circle cx="60" cy="38" r="14" fill="#fce7d2" stroke="#1c1308" strokeWidth="3.2" />

      {/* Vysoký hradní čepec (hennin) se safírem */}
      <path d="M48 28 L60 4 L72 28 Z" fill="#e2e8f0" stroke="#1c1308" strokeWidth="3" />
      <circle cx="60" cy="14" r="2.5" fill="#0284c7" stroke="#1c1308" strokeWidth="1" />

      {/* Líbezné oči paní z hradu */}
      <circle cx="54" cy="36" r="2.8" fill="#1c1308" />
      <circle cx="66" cy="36" r="2.8" fill="#1c1308" />
      <circle cx="55" cy="35" r="0.9" fill="#ffffff" />
      <circle cx="67" cy="35" r="0.9" fill="#ffffff" />
      <circle cx="50" cy="40" r="3" fill="#fda4af" opacity="0.6" />
      <circle cx="70" cy="40" r="3" fill="#fda4af" opacity="0.6" />

      {/* Svazek starobylých hradních klíčů v ruce */}
      <g className="anim-sway-slow" style={{ transformOrigin: "82px 64px" }}>
        <line
          x1="76"
          y1="52"
          x2="84"
          y2="70"
          stroke="#fce7d2"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="86" cy="74" r="4" fill="none" stroke="#d97706" strokeWidth="2.5" />
        <line x1="86" y1="78" x2="86" y2="92" stroke="#d97706" strokeWidth="2.5" />
        <line x1="86" y1="88" x2="90" y2="88" stroke="#d97706" strokeWidth="2" />
        <line x1="86" y1="92" x2="90" y2="92" stroke="#d97706" strokeWidth="2" />
      </g>
    </svg>
  );
}

function renderHelkal(stage: number): React.ReactNode {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Divoch Helkal">
      <ellipse cx="60" cy="112" rx="42" ry="7" fill="#1c1308" opacity="0.38" />

      {/* Masivní tělo z kůry a mechu */}
      <path
        d="M32 46 C26 76 28 104 60 104 C92 104 94 76 88 46 Z"
        fill="#3f4d2a"
        stroke="#1c1308"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Špičaté uši kmitající v rytmu */}
      <g className="anim-ear-twitch" style={{ transformOrigin: "38px 36px" }}>
        <polygon points="38,36 24,24 36,44" fill="#3f4d2a" stroke="#1c1308" strokeWidth="2.5" />
      </g>
      <g className="anim-ear-twitch" style={{ transformOrigin: "82px 36px" }}>
        <polygon points="82,36 96,24 84,44" fill="#3f4d2a" stroke="#1c1308" strokeWidth="2.5" />
      </g>

      {/* Široká divošská hlava s listím */}
      <circle cx="60" cy="40" r="18" fill="#4d5f34" stroke="#1c1308" strokeWidth="3.8" />
      {/* Dubové listy ve vlasech */}
      <circle cx="50" cy="24" r="5" fill="#65a30d" stroke="#1c1308" strokeWidth="2" />
      <circle cx="68" cy="22" r="6" fill="#65a30d" stroke="#1c1308" strokeWidth="2" />

      {/* Huňaté mechové obočí a divoké žluté oči */}
      <path
        d="M46 32 Q54 28 58 34"
        fill="none"
        stroke="#223014"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M74 32 Q66 28 62 34"
        fill="none"
        stroke="#223014"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="52" cy="38" r="4.5" fill="#facc15" stroke="#1c1308" strokeWidth="2" />
      <circle cx="68" cy="38" r="4.5" fill="#facc15" stroke="#1c1308" strokeWidth="2" />
      <circle cx="52" cy="38" r="2" fill="#1c1308" />
      <circle cx="68" cy="38" r="2" fill="#1c1308" />

      {/* Řvoucí tlama s kly */}
      <ellipse cx="60" cy="48" rx="8" ry="6" fill="#1c1308" />
      <polygon points="54,44 56,48 58,44" fill="#ffffff" />
      <polygon points="62,44 64,48 66,44" fill="#ffffff" />

      {/* Obrovská dubová větev v ruce (pohupování) */}
      <g className="anim-weapon-sway" style={{ transformOrigin: "92px 84px" }}>
        <line
          x1="86"
          y1="52"
          x2="98"
          y2="106"
          stroke="#5a3818"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <ellipse
          cx="98"
          cy="46"
          rx="8"
          ry="12"
          fill="#4d7c0f"
          stroke="#1c1308"
          strokeWidth="2.5"
          transform="rotate(20 98 46)"
        />
      </g>
    </svg>
  );
}

function renderUpir(stage: number): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Nocležní upírák"
    >
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#1c1308" opacity="0.4" />

      {/* Černý plášť s vysokým sametovým stojáčkem a krvavě rudou podšívkou */}
      <path
        d="M38 52 C30 76 34 104 60 104 C86 104 90 76 82 52 Z"
        fill="#1e1422"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <polygon points="40,52 32,32 50,46" fill="#881337" stroke="#1c1308" strokeWidth="2" />
      <polygon points="80,52 88,32 70,46" fill="#881337" stroke="#1c1308" strokeWidth="2" />

      {/* Bílý krajkový žabó s rubínovou broží */}
      <path d="M52 50 L60 64 L68 50 Z" fill="#f8fafc" stroke="#1c1308" strokeWidth="2" />
      <circle cx="60" cy="54" r="2.5" fill="#dc2626" stroke="#1c1308" strokeWidth="1" />

      {/* Bledá tvář s havraními vlasy */}
      <circle cx="60" cy="38" r="14.5" fill="#f1f5f9" stroke="#1c1308" strokeWidth="3.2" />
      <path
        d="M46 32 C54 26 58 34 60 28 C62 34 66 26 74 32 Z"
        fill="#0f172a"
        stroke="#1c1308"
        strokeWidth="2"
      />

      {/* Pronikavé karmínové oči */}
      <circle cx="53" cy="37" r="3.2" fill="#e11d48" stroke="#1c1308" strokeWidth="1.8" />
      <circle cx="67" cy="37" r="3.2" fill="#e11d48" stroke="#1c1308" strokeWidth="1.8" />
      <circle cx="53" cy="37" r="1.5" fill="#1c1308" />
      <circle cx="67" cy="37" r="1.5" fill="#1c1308" />

      {/* Dva ostré bílé tesáky */}
      <path
        d="M52 46 Q60 50 68 46"
        fill="none"
        stroke="#1c1308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <polygon points="54,47 56,52 57,47" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
      <polygon points="63,47 64,52 66,47" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />

      {/* Malý netopýří společník na rameni kmitající křídly */}
      <g className="anim-wing-flap-left" style={{ transformOrigin: "32px 42px" }}>
        <ellipse cx="32" cy="42" rx="4" ry="5" fill="#0f172a" />
        <path d="M30 40 Q20 32 18 42 Z" fill="#0f172a" />
      </g>
    </svg>
  );
}

function renderPavouk(stage: number): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Pavouk ze seníku"
    >
      <ellipse cx="60" cy="108" rx="36" ry="6" fill="#1c1308" opacity="0.35" />

      {/* 8 animovaných kmitajících nohou */}
      <g className="anim-spider-leg-left-1">
        <path
          d="M42 62 Q16 48 10 70 Q14 86 16 98"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g className="anim-spider-leg-left-2">
        <path
          d="M44 68 Q20 62 14 84 Q18 96 24 104"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g className="anim-spider-leg-left-1">
        <path
          d="M46 76 Q26 78 22 96 Q24 104 32 108"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g className="anim-spider-leg-left-2">
        <path
          d="M48 82 Q34 92 32 106"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      <g className="anim-spider-leg-right-1">
        <path
          d="M78 62 Q104 48 110 70 Q106 86 104 98"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g className="anim-spider-leg-right-2">
        <path
          d="M76 68 Q100 62 106 84 Q102 96 96 104"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g className="anim-spider-leg-right-1">
        <path
          d="M74 76 Q94 78 98 96 Q96 104 88 108"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g className="anim-spider-leg-right-2">
        <path
          d="M72 82 Q86 92 88 106"
          fill="none"
          stroke="#1c1308"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      {/* Buclatý zadeček pavouka */}
      <ellipse cx="60" cy="74" rx="26" ry="24" fill="#3a2518" stroke="#1c1308" strokeWidth="4" />

      {/* Folklórní motiv na zadečku dle stádia */}
      {stage === 1 && (
        <path
          d="M56 57 L64 57 L64 67 L76 67 L76 75 L64 75 L64 91 L56 91 L56 75 L44 75 L44 67 L56 67 Z"
          fill="#c4241d"
          stroke="#1c1308"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
      )}
      {stage === 3 && (
        <g className="anim-eye-pulse">
          <circle cx="60" cy="74" r="14" fill="#4d3222" stroke="#1c1308" strokeWidth="2" />
          <path
            d="M60 60 L68.5 85.5 L46 70 L74 70 L51.5 85.5 Z"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="2.5"
          />
          <circle cx="60" cy="74" r="3" fill="#c4321d" />
        </g>
      )}

      {/* Hlavohruď s očkami */}
      <circle cx="60" cy="46" r="18" fill="#2d1d12" stroke="#1c1308" strokeWidth="4" />
      <circle cx="52" cy="42" r="6.5" fill="#ffffff" stroke="#1c1308" strokeWidth="3" />
      <circle cx="68" cy="42" r="6.5" fill="#ffffff" stroke="#1c1308" strokeWidth="3" />
      <circle cx="53" cy="42" r="3" fill="#1c1308" />
      <circle cx="67" cy="42" r="3" fill="#1c1308" />

      {/* Roztomilé bílé kusadélka */}
      <polygon points="56,54 58,60 60,54" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
      <polygon points="60,54 62,60 64,54" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
    </svg>
  );
}

function renderPekelneDudy(stage: number): React.ReactNode {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Pekelné dudy">
      <ellipse cx="60" cy="110" rx="34" ry="6" fill="#1c1308" opacity="0.35" />

      {/* Kopýtka chodící na zemi */}
      <path d="M46 96 L42 110" stroke="#1c1308" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M72 96 L76 110" stroke="#1c1308" strokeWidth="4.5" strokeLinecap="round" />

      {/* Nafukující se měch dud s animací pumpování */}
      <g className="anim-bagpipe-bellows" style={{ transformOrigin: "62px 74px" }}>
        <ellipse cx="62" cy="74" rx="28" ry="22" fill="#2d1c14" stroke="#1c1308" strokeWidth="4" />
        <ellipse cx="64" cy="72" rx="22" ry="16" fill="#3d271c" />
      </g>

      {/* Dronová píšťala se stoupajícím kouřem */}
      <line
        x1="42"
        y1="62"
        x2="16"
        y2="18"
        stroke="#d49b38"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="14"
        cy="16"
        rx="7"
        ry="5"
        fill="#ffd438"
        stroke="#1c1308"
        strokeWidth="3"
        transform="rotate(-35 14 16)"
      />

      {/* Melodická přednička a vyletující barevné hudební noty */}
      <g className="anim-bagpipe-chanter" style={{ transformOrigin: "78px 78px" }}>
        <line
          x1="78"
          y1="78"
          x2="104"
          y2="88"
          stroke="#7a4618"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M104 88 Q112 90 114 98 Q110 102 102 96 Z"
          fill="#ffd438"
          stroke="#1c1308"
          strokeWidth="2.5"
        />
      </g>

      {/* Barevné tancující noty */}
      <g transform="translate(108, 88)">
        <text
          x="0"
          y="0"
          fill="#ffd438"
          stroke="#1c1308"
          strokeWidth="0.8"
          fontSize="16"
          fontWeight="bold"
          className="anim-music-note-1"
        >
          ♪
        </text>
      </g>
      <g transform="translate(102, 80)">
        <text
          x="0"
          y="0"
          fill="#e11d48"
          stroke="#1c1308"
          strokeWidth="0.8"
          fontSize="18"
          fontWeight="bold"
          className="anim-music-note-2"
        >
          ♫
        </text>
      </g>
      <g transform="translate(112, 84)">
        <text
          x="0"
          y="0"
          fill="#22c55e"
          stroke="#1c1308"
          strokeWidth="0.8"
          fontSize="16"
          fontWeight="bold"
          className="anim-music-note-3"
        >
          ♬
        </text>
      </g>

      {/* Kozlí vyřezávaná hlava dud se svislými špičatými rohy */}
      <ellipse cx="50" cy="44" rx="16" ry="14" fill="#2d1c14" stroke="#1c1308" strokeWidth="4" />
      <path
        d="M40 37 C37 24 33 14 36 8 C41 14 44 24 45 34 Z"
        fill="#d49b38"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M60 37 C63 24 67 14 64 8 C59 14 56 24 55 34 Z"
        fill="#d49b38"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line
        x1="39"
        y1="23"
        x2="43"
        y2="24"
        stroke="#945014"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="61"
        y1="23"
        x2="57"
        y2="24"
        stroke="#945014"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="44" cy="42" r="4" fill="#ffd438" stroke="#1c1308" strokeWidth="2" />
      <circle cx="56" cy="42" r="4" fill="#ffd438" stroke="#1c1308" strokeWidth="2" />
      <circle cx="44" cy="42" r="1.8" fill="#1c1308" />
      <circle cx="56" cy="42" r="1.8" fill="#1c1308" />
    </svg>
  );
}

function renderSviticiOko(stage: number): React.ReactNode {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Svítící oko">
      <ellipse cx="60" cy="112" rx="28" ry="5" fill="#facc15" opacity="0.25" />

      {/* Pulzující magická ektoplazmatická aura */}
      <circle cx="60" cy="58" r="42" fill="#ffd438" opacity="0.2" className="anim-eye-pulse" />
      <circle cx="60" cy="58" r="32" fill="#f97316" opacity="0.25" className="anim-eye-pulse" />

      {/* Vlající světelné cáry */}
      <path
        d="M46 84 Q42 102 52 108"
        fill="none"
        stroke="#e8a838"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M60 88 Q62 106 58 112"
        fill="none"
        stroke="#ffd438"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M74 84 Q78 102 70 108"
        fill="none"
        stroke="#e8a838"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Bulva oka se silnou konturou a žilkami */}
      <ellipse cx="60" cy="58" rx="34" ry="28" fill="#fcf8ea" stroke="#1c1308" strokeWidth="4.5" />
      <path d="M28 58 Q36 54 42 56" fill="none" stroke="#dc2626" strokeWidth="1.8" opacity="0.7" />
      <path d="M92 58 Q84 54 78 56" fill="none" stroke="#dc2626" strokeWidth="1.8" opacity="0.7" />

      {/* Velká jiskřící jantarová duhovka */}
      <circle cx="60" cy="58" r="18" fill="#e68a19" stroke="#1c1308" strokeWidth="3.5" />
      <circle cx="60" cy="58" r="14" fill="#ffd438" />

      {/* Mrkající zornička */}
      <g className="anim-lada-blink">
        <ellipse cx="60" cy="58" rx="7" ry="11" fill="#1c1308" />
        <circle cx="56" cy="53" r="3.5" fill="#ffffff" />
        <circle cx="64" cy="62" r="1.8" fill="#ffffff" />
      </g>
    </svg>
  );
}

function renderNetopyr(stage: number): React.ReactNode {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Netopýr z půdy">
      <ellipse cx="60" cy="110" rx="28" ry="5" fill="#1c1308" opacity="0.32" />

      {/* Levá mávající blanitá křídla */}
      <g className="anim-wing-flap-left" style={{ transformOrigin: "48px 60px" }}>
        <path
          d="M48 60 Q28 32 10 38 Q18 60 8 78 Q26 72 32 84 Q42 76 46 80 Z"
          fill="#2c2226"
          stroke="#1c1308"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <path d="M48 60 Q30 46 10 38" fill="none" stroke="#1c1308" strokeWidth="2.2" />
        <path d="M48 60 Q32 64 8 78" fill="none" stroke="#1c1308" strokeWidth="2" />
      </g>

      {/* Pravá mávající blanitá křídla */}
      <g className="anim-wing-flap-right" style={{ transformOrigin: "72px 60px" }}>
        <path
          d="M72 60 Q92 32 110 38 Q102 60 112 78 Q94 72 88 84 Q78 76 74 80 Z"
          fill="#2c2226"
          stroke="#1c1308"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <path d="M72 60 Q90 46 110 38" fill="none" stroke="#1c1308" strokeWidth="2.2" />
        <path d="M72 60 Q88 64 112 78" fill="none" stroke="#1c1308" strokeWidth="2" />
      </g>

      {/* Huňaté tělíčko */}
      <ellipse cx="60" cy="68" rx="18" ry="22" fill="#3a2f34" stroke="#1c1308" strokeWidth="4" />
      <ellipse cx="60" cy="72" rx="12" ry="15" fill="#4d4046" />

      {/* Hlava se špičatýma ušima kmitajícíma do rytmu */}
      <circle cx="60" cy="46" r="16" fill="#3a2f34" stroke="#1c1308" strokeWidth="4" />
      <g className="anim-ear-twitch" style={{ transformOrigin: "48px 40px" }}>
        <polygon points="48,40 36,14 52,34" fill="#2c2226" stroke="#1c1308" strokeWidth="2.5" />
        <polygon points="45,34 39,20 48,31" fill="#f43f5e" />
      </g>
      <g className="anim-ear-twitch" style={{ transformOrigin: "72px 40px" }}>
        <polygon points="72,40 84,14 68,34" fill="#2c2226" stroke="#1c1308" strokeWidth="2.5" />
        <polygon points="75,34 81,20 72,31" fill="#f43f5e" />
      </g>

      {/* Zvědavá žlutá očka a bílé špičáčky */}
      <circle cx="53" cy="44" r="5" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="67" cy="44" r="5" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="53" cy="44" r="2.5" fill="#1c1308" />
      <circle cx="67" cy="44" r="2.5" fill="#1c1308" />

      <polygon points="56,52 57,56 58,52" fill="#ffffff" />
      <polygon points="62,52 63,56 64,52" fill="#ffffff" />
    </svg>
  );
}

function renderCertovaBabicka(stage: number): React.ReactNode {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-md"
      aria-label="Čertova babička"
    >
      <ellipse cx="60" cy="110" rx="36" ry="6" fill="#1c1308" opacity="0.35" />

      {/* Šaty babičky a kopyta */}
      <path
        d="M38 60 Q32 98 34 104 L86 104 Q88 98 82 60 Z"
        fill="#2d2226"
        stroke="#1c1308"
        strokeWidth="4"
      />
      {/* Bílá puntíkatá zástěra */}
      <path
        d="M44 66 Q42 96 44 102 L76 102 Q78 96 76 66 Z"
        fill="#fcf6ea"
        stroke="#1c1308"
        strokeWidth="3"
      />
      <circle cx="50" cy="74" r="1.5" fill="#dc2626" />
      <circle cx="62" cy="74" r="1.5" fill="#dc2626" />
      <circle cx="70" cy="74" r="1.5" fill="#dc2626" />
      <circle cx="56" cy="84" r="1.5" fill="#dc2626" />
      <circle cx="66" cy="84" r="1.5" fill="#dc2626" />

      {/* Velká dřevěná vařečka v ruce */}
      <line
        x1="28"
        y1="58"
        x2="16"
        y2="88"
        stroke="#8a5a22"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse
        cx="15"
        cy="90"
        rx="5"
        ry="7"
        fill="#d49b38"
        stroke="#1c1308"
        strokeWidth="2.5"
        transform="rotate(20 15 90)"
      />

      {/* Tradiční český červený puntíkatý šátek */}
      <path
        d="M42 36 C42 18 78 18 78 36 C78 44 76 52 72 56 L64 54 L60 58 L56 54 L48 56 C44 52 42 44 42 36 Z"
        fill="#dc2626"
        stroke="#1c1308"
        strokeWidth="3.5"
      />
      <circle cx="52" cy="24" r="1.5" fill="#ffffff" />
      <circle cx="64" cy="22" r="1.5" fill="#ffffff" />
      <circle cx="58" cy="30" r="1.5" fill="#ffffff" />

      {/* Svislé špičaté rohy prorážející šátek */}
      <path
        d="M40 28 C37 16 33 6 36 1 C42 6 46 16 47 26 Z"
        fill="#d49b38"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M80 28 C83 16 87 6 84 1 C78 6 74 16 73 26 Z"
        fill="#d49b38"
        stroke="#1c1308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line
        x1="39"
        y1="17"
        x2="44"
        y2="19"
        stroke="#945014"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="37"
        y1="10"
        x2="41"
        y2="12"
        stroke="#945014"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="81"
        y1="17"
        x2="76"
        y2="19"
        stroke="#945014"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="83"
        y1="10"
        x2="79"
        y2="12"
        stroke="#945014"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <ellipse cx="43" cy="27" rx="3.5" ry="2" fill="#1c1308" opacity="0.6" />
      <ellipse cx="77" cy="27" rx="3.5" ry="2" fill="#1c1308" opacity="0.6" />

      {/* Drátěné brýličky a kouřící dýmka */}
      <circle
        cx="54"
        cy="41"
        r="5"
        fill="#ffffff"
        opacity="0.85"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <circle
        cx="66"
        cy="41"
        r="5"
        fill="#ffffff"
        opacity="0.85"
        stroke="#1c1308"
        strokeWidth="2"
      />
      <line x1="59" y1="41" x2="61" y2="41" stroke="#1c1308" strokeWidth="2" />
      <circle cx="54" cy="41" r="2.2" fill="#1c1308" />
      <circle cx="66" cy="41" r="2.2" fill="#1c1308" />

      {/* Dýmka s kouřem */}
      <g className="anim-pipe-smoke">
        <circle
          cx="80"
          cy="44"
          r="2.8"
          fill="#ffffff"
          opacity="0.85"
          stroke="#1c1308"
          strokeWidth="1"
        />
        <circle
          cx="84"
          cy="36"
          r="4.2"
          fill="#ffffff"
          opacity="0.8"
          stroke="#1c1308"
          strokeWidth="1.2"
        />
      </g>
      <line
        x1="64"
        y1="48"
        x2="78"
        y2="52"
        stroke="#d4ab74"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="76"
        y="47"
        width="5.5"
        height="8"
        rx="2"
        fill="#8a5a22"
        stroke="#1c1308"
        strokeWidth="2"
      />
    </svg>
  );
}

function renderGenericSpooky(): React.ReactNode {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
      <ellipse cx="60" cy="110" rx="32" ry="6" fill="#1c1308" opacity="0.3" />
      <circle cx="60" cy="60" r="36" fill="#7a6a8a" stroke="#1c1308" strokeWidth="4" />
      <circle cx="50" cy="54" r="6" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="70" cy="54" r="6" fill="#ffd438" stroke="#1c1308" strokeWidth="2.5" />
      <circle cx="50" cy="54" r="2.5" fill="#1c1308" />
      <circle cx="70" cy="54" r="2.5" fill="#1c1308" />
      <path
        d="M52 74 Q60 82 68 74"
        fill="none"
        stroke="#1c1308"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
