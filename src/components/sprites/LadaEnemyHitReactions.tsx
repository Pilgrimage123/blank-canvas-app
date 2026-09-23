import React from "react";

export interface EnemyHitReactionOverlayProps {
  type: string;
  frame?: number; // 1 = Impact / Hitstop, 2 = Peak Recoil, 3 = Recovery / Cushion
  isHit?: boolean;
  hitNonce?: number;
  duration?: number; // Duration of fluid 3-frame sequence in ms (default 320ms)
}

/**
 * 3-fázové Ladovské vizuální reakce na zásah pro všech 33 nepřátel z herní soupisky.
 *
 * Specifikace (10–12 FPS, 80–100ms / fáze):
 * - Fáze 1 (Zásah / Hitstop): Bleskový záblesk, komické smrštění/splácnutí, vyletující předměty.
 * - Fáze 2 (Vrchol záklonu / Peak Recoil): Maximální deformace siluety (-5px až -8px vzad), vlající prvky.
 * - Fáze 3 (Odpružení & Návrat / Recovery): Překmitnutí (cushion), došlápnutí/dopad a návrat do střehu.
 */
export const LadaEnemyHitReactionOverlay: React.FC<EnemyHitReactionOverlayProps> = ({
  type,
  frame,
  isHit = false,
  hitNonce,
  duration = 320,
}) => {
  const [fluidFrame, setFluidFrame] = React.useState<number | null>(frame ?? (isHit ? 1 : null));

  React.useEffect(() => {
    if (typeof frame === "number") {
      setFluidFrame(frame);
      return;
    }
    if (!isHit) {
      setFluidFrame(null);
      return;
    }
    // Fluid 3-phase hit reaction timing (matching 10-12 FPS / ~90-100ms per frame)
    setFluidFrame(1);
    const f1Duration = Math.round(duration * 0.3);
    const f2Duration = Math.round(duration * 0.65);
    const t1 = setTimeout(() => setFluidFrame(2), f1Duration);
    const t2 = setTimeout(() => setFluidFrame(3), f2Duration);
    const t3 = setTimeout(() => setFluidFrame(null), duration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isHit, hitNonce, frame, duration]);

  const activeFrame = typeof frame === "number" ? frame : fluidFrame;
  if (!activeFrame) return null;

  // Normalizace typu nepřítele
  const t = (type || "").toLowerCase();
  const normType =
    t === "bila_pani" ? "bila" : t === "ohnivy_muz" ? "ohnivy" : t === "certik" ? "rarasek" : t;

  return (
    <svg
      viewBox="0 0 120 120"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-25 select-none"
    >
      <defs>
        <filter id="hit-flash-filter">
          <feColorMatrix type="matrix" values="1 0 0 0 1   0 1 0 0 1   0 0 1 0 1   0 0 0 1 0" />
        </filter>
      </defs>

      {/* Render bespoke 3-frame hit reaction per roster enemy */}
      {renderEnemyHitDetails(normType, activeFrame)}
    </svg>
  );
};

function renderEnemyHitDetails(type: string, f: number): React.ReactNode {
  switch (type) {
    // 1. Rarášek (Little Imp)
    case "rarasek":
      if (f === 1) {
        return (
          <g id="hit-rarasek-f1">
            {/* Hliněná dýmka vyletující z pusy šikmo vzhůru */}
            <g transform="translate(68, 30) rotate(-35)">
              <rect
                x="0"
                y="0"
                width="14"
                height="3"
                rx="1.5"
                fill="#f4ebd0"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <ellipse
                cx="14"
                cy="-2"
                rx="4"
                ry="5"
                fill="#a4532d"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <circle cx="16" cy="-8" r="2.5" fill="#e63e1e" opacity="0.85" />
            </g>
            {/* Vyboulené vyplašené oči (bílé kruhy) */}
            <circle cx="53" cy="42" r="6" fill="#ffffff" stroke="#1c1308" strokeWidth="1.8" />
            <circle cx="53" cy="42" r="1.5" fill="#1c1308" />
            <circle cx="67" cy="42" r="6" fill="#ffffff" stroke="#1c1308" strokeWidth="1.8" />
            <circle cx="67" cy="42" r="1.5" fill="#1c1308" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-rarasek-f2">
            {/* Ocas vylekaně vystřelený dopředu mezi nohy */}
            <path
              d="M 52 82 Q 42 96 32 94 Q 24 92 28 84"
              fill="none"
              stroke="#241408"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Obláčky žhavého dýmu a sazí za ušima */}
            <circle cx="36" cy="30" r="3.5" fill="#3a2216" opacity="0.75" />
            <circle cx="32" cy="22" r="4.5" fill="#4a2c1d" opacity="0.6" />
            <circle cx="84" cy="30" r="3.5" fill="#3a2216" opacity="0.75" />
            <circle cx="90" cy="24" r="4.5" fill="#4a2c1d" opacity="0.6" />
            <circle cx="86" cy="18" r="1.5" fill="#ffd438" />
          </g>
        );
      }
      return (
        <g id="hit-rarasek-f3">
          {/* Chytá dýmku zpátky k hrudi, ocas zpět do esíčka */}
          <ellipse cx="60" cy="62" rx="5" ry="3" fill="#a4532d" stroke="#1c1308" strokeWidth="1" />
          <path
            d="M 50 84 Q 38 78 35 68 Q 32 60 40 58"
            fill="none"
            stroke="#241408"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );

    // 2. Mrtvák ze škarpy (Ditch Zombie)
    case "mrtvak":
      if (f === 1) {
        return (
          <g id="hit-mrtvak-f1">
            {/* Vykloubená spodní čelist visící v nepřirozeném šikmém úhlu */}
            <path d="M 54 48 L 50 58 L 62 57 Z" fill="#6d8065" stroke="#1c1308" strokeWidth="1.8" />
            {/* Odlétající hroudy suchého bahna a hlíny z ramen */}
            <circle cx="38" cy="46" r="3" fill="#543c25" stroke="#1c1308" strokeWidth="1" />
            <polygon points="32,40 36,44 30,46" fill="#3b2b1a" />
            <circle cx="82" cy="48" r="2.8" fill="#543c25" stroke="#1c1308" strokeWidth="1" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-mrtvak-f2">
            {/* Hlava zvrácená na jedno rameno, ochablé ruce jako provazy */}
            <line
              x1="42"
              y1="58"
              x2="30"
              y2="76"
              stroke="#4d5f47"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="78"
              y1="58"
              x2="88"
              y2="74"
              stroke="#4d5f47"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse
              cx="64"
              cy="38"
              rx="8"
              ry="6"
              fill="#758c6e"
              stroke="#1c1308"
              strokeWidth="1.8"
              transform="rotate(18 64 38)"
            />
          </g>
        );
      }
      return (
        <g id="hit-mrtvak-f3">
          {/* Zadupnutí nohy do bláta a narovnání trupu */}
          <ellipse cx="48" cy="112" rx="10" ry="3.5" fill="#3d2a1b" opacity="0.6" />
          <path d="M 44 108 L 40 102 M 52 108 L 56 102" stroke="#543c25" strokeWidth="1.5" />
        </g>
      );

    // 3. Bubák od stodoly (Barn Boggart)
    case "bubak":
      if (f === 1) {
        return (
          <g id="hit-bubak-f1">
            {/* Široce vytřeštěné žluté štěrbiny očí */}
            <ellipse
              cx="46"
              cy="50"
              rx="9"
              ry="7"
              fill="#ffd438"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <line
              x1="46"
              y1="44"
              x2="46"
              y2="56"
              stroke="#1c1308"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse
              cx="74"
              cy="50"
              rx="9"
              ry="7"
              fill="#ffd438"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <line
              x1="74"
              y1="44"
              x2="74"
              y2="56"
              stroke="#1c1308"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Odlétající sláma ve vějíři ze švů pytloviny */}
            <line
              x1="30"
              y1="62"
              x2="14"
              y2="54"
              stroke="#f4c23c"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1="28"
              y1="72"
              x2="10"
              y2="76"
              stroke="#f4c23c"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1="90"
              y1="62"
              x2="106"
              y2="54"
              stroke="#f4c23c"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1="92"
              y1="72"
              x2="110"
              y2="76"
              stroke="#f4c23c"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-bubak-f2">
            {/* Záklon trupu o 25°, šosy pytloviny vlající dopředu, drápy u hrdla */}
            <path
              d="M 40 85 Q 50 78 60 88 Q 70 78 80 85"
              stroke="#8c6239"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 48 56 Q 52 50 60 52 Q 68 50 72 56"
              stroke="#1c1308"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="24" cy="40" r="2" fill="#f4c23c" />
            <circle cx="98" cy="38" r="2" fill="#f4c23c" />
          </g>
        );
      }
      return (
        <g id="hit-bubak-f3">
          {/* Usazení do hlubokého podřepu s obláčkem prachu */}
          <ellipse cx="60" cy="110" rx="34" ry="6" fill="#1c1308" opacity="0.3" />
          <circle cx="36" cy="108" r="3.5" fill="#eedcb0" opacity="0.75" />
          <circle cx="84" cy="108" r="3.5" fill="#eedcb0" opacity="0.75" />
        </g>
      );

    // 4. Starý kostlivec (Old Skeleton)
    case "kostlivec":
      if (f === 1) {
        return (
          <g id="hit-kostlivec-f1">
            {/* Lebka naražená mezi lopatky, čelist doširoka otevřená */}
            <path
              d="M 52 46 C 52 56 68 56 68 46 Z"
              fill="#1c1308"
              stroke="#1c1308"
              strokeWidth="1.5"
            />
            <rect x="55" y="47" width="10" height="3" fill="#ffffff" />
            {/* Zvukové chřestění kostí (vibrační rázové linky) */}
            <path
              d="M 38 48 L 32 44 M 38 56 L 30 56 M 82 48 L 88 44 M 82 56 L 90 56"
              stroke="#ffd438"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-kostlivec-f2">
            {/* Rozestoupená žebra a pánev, meč/kost padající špičkou do hlíny */}
            <line
              x1="42"
              y1="62"
              x2="30"
              y2="78"
              stroke="#f4ecd8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="78"
              y1="62"
              x2="90"
              y2="82"
              stroke="#f4ecd8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="88"
              y1="78"
              x2="98"
              y2="108"
              stroke="#7a8288"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        );
      }
      return (
        <g id="hit-kostlivec-f3">
          {/* Zaklapnutí páteře a narovnání lebky do bojového střehu */}
          <line
            x1="60"
            y1="46"
            x2="60"
            y2="78"
            stroke="#1c1308"
            strokeWidth="2"
            strokeDasharray="3,3"
          />
        </g>
      );

    // 5. Polednice (Noon Hag)
    case "polednice":
      if (f === 1) {
        return (
          <g id="hit-polednice-f1">
            {/* Prudké trhnutí krku, cáry šátku letící před obličej */}
            <path
              d="M 44 32 Q 54 24 68 28 L 76 42 Q 62 46 48 38 Z"
              fill="#eedcb0"
              stroke="#1c1308"
              strokeWidth="1.6"
            />
            {/* Ztuhlá ruka se srpem v křečovitém napětí */}
            <path
              d="M 82 54 Q 96 46 94 36"
              fill="none"
              stroke="#7d8a93"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-polednice-f2">
            {/* Vlající šedivé vlasy a cáry plachty, srp táhnutý za sebou po zemi */}
            <path
              d="M 38 42 Q 22 48 16 62"
              fill="none"
              stroke="#ded8cc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 42 50 Q 26 58 20 74"
              fill="none"
              stroke="#ded8cc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse cx="60" cy="40" rx="4" ry="7" fill="#1c1308" />
          </g>
        );
      }
      return (
        <g id="hit-polednice-f3">
          {/* Zadupnutí bosé paty a odhrnutí šátku drápem */}
          <line x1="56" y1="108" x2="56" y2="114" stroke="#1c1308" strokeWidth="2.5" />
          <path d="M 64 36 L 58 44" stroke="#4a3726" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    // 6. Divoch helkal (Wild Forest Howler)
    case "helkal":
      if (f === 1) {
        return (
          <g id="hit-helkal-f1">
            {/* Hlava zaražená do ramen, kyj prudce poklesne */}
            <ellipse
              cx="60"
              cy="42"
              rx="20"
              ry="12"
              fill="#54371e"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <line
              x1="88"
              y1="58"
              x2="96"
              y2="92"
              stroke="#3b2210"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-helkal-f2">
            {/* Záklon mohutného trupu, vousy vyletující přes prsa, řvoucí tlama */}
            <ellipse cx="60" cy="54" rx="14" ry="10" fill="#1c1308" />
            <polygon points="53,49 56,56 50,56" fill="#ffffff" />
            <polygon points="67,49 70,56 64,56" fill="#ffffff" />
            <path d="M 46 62 Q 38 72 32 82" stroke="#54371e" strokeWidth="4" fill="none" />
          </g>
        );
      }
      return (
        <g id="hit-helkal-f3">
          {/* Pevný předkročený postoj se zvednutým kyjem */}
          <ellipse cx="44" cy="112" rx="8" ry="3" fill="#3b2210" opacity="0.6" />
        </g>
      );

    // 7. Klekánice z šera (Dusk Hag)
    case "klekanice":
      if (f === 1) {
        return (
          <g id="hit-klekanice-f1">
            {/* Schrbení do klubíčka, vyhrnutá zástěra, zvonek narazí do boku */}
            <ellipse
              cx="60"
              cy="68"
              rx="22"
              ry="18"
              fill="#44344f"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <circle cx="82" cy="74" r="5" fill="#d49b28" stroke="#1c1308" strokeWidth="1.5" />
            <line x1="80" y1="68" x2="84" y2="76" stroke="#ffd438" strokeWidth="2" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-klekanice-f2">
            {/* Plášť vlaje za ní, zvonek odlétá na provaze, bolavě přivřené oči */}
            <path
              d="M 38 60 Q 22 66 14 54"
              fill="none"
              stroke="#32243d"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line x1="84" y1="72" x2="98" y2="64" stroke="#7a542b" strokeWidth="1.8" />
            <circle cx="102" cy="62" r="5.5" fill="#d49b28" stroke="#1c1308" strokeWidth="1.5" />
          </g>
        );
      }
      return (
        <g id="hit-klekanice-f3">
          {/* Sebrání ze země a návrat do shrbeného kroku */}
          <line
            x1="38"
            y1="104"
            x2="44"
            y2="104"
            stroke="#1c1308"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );

    // 8. Hastrman od stoky (Ditch Water Goblin)
    case "hastrman":
      if (f === 1) {
        return (
          <g id="hit-hastrman-f1">
            {/* Rosolovitý squash, cylindr sjetý do čela, výstřik kapek */}
            <ellipse
              cx="60"
              cy="34"
              rx="14"
              ry="6"
              fill="#1e3f20"
              stroke="#1c1308"
              strokeWidth="2"
              transform="rotate(8 60 34)"
            />
            {/* Radiální sprška kapek */}
            <circle cx="28" cy="46" r="3" fill="#6ec6ff" stroke="#1c1308" strokeWidth="1" />
            <circle cx="34" cy="32" r="2.2" fill="#6ec6ff" />
            <circle cx="88" cy="42" r="3.2" fill="#6ec6ff" stroke="#1c1308" strokeWidth="1" />
            <circle cx="94" cy="52" r="2.5" fill="#6ec6ff" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-hastrman-f2">
            {/* Pentle na šosu vlají dopředu, zelené vlasy dozadu, vypláznutý jazyk */}
            <path
              d="M 72 82 Q 86 86 98 78"
              fill="none"
              stroke="#e63e1e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 68 86 Q 82 92 92 88"
              fill="none"
              stroke="#f4c23c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M 62 54 Q 68 58 64 64" fill="#e63e1e" stroke="#1c1308" strokeWidth="1.2" />
          </g>
        );
      }
      return (
        <g id="hit-hastrman-f3">
          {/* Hluboký podřep a posunutí cylindru zpět palcem */}
          <ellipse cx="60" cy="110" rx="30" ry="5" fill="#2d6cb5" opacity="0.35" />
        </g>
      );

    // 9. Nocležní upírák (Bed-and-Breakfast Vampire)
    case "upir":
      if (f === 1) {
        return (
          <g id="hit-upir-f1">
            {/* Ztuhlý náraz, brada vzhůru, plášť semknutý jako netopýří křídla */}
            <path d="M 40 46 L 60 76 L 80 46 Z" fill="#221526" stroke="#1c1308" strokeWidth="2" />
            <line
              x1="52"
              y1="36"
              x2="68"
              y2="36"
              stroke="#1c1308"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-upir-f2">
            {/* Plášť se rozevře, bledá ústa vycení tesáky, uši k lebce */}
            <ellipse cx="60" cy="46" rx="6" ry="7" fill="#1c1308" />
            <polygon points="56,43 58,47 55,47" fill="#ffffff" />
            <polygon points="64,43 66,47 63,47" fill="#ffffff" />
            <path d="M 32 48 Q 18 56 22 78" fill="none" stroke="#221526" strokeWidth="3" />
            <path d="M 88 48 Q 102 56 98 78" fill="none" stroke="#221526" strokeWidth="3" />
          </g>
        );
      }
      return (
        <g id="hit-upir-f3">
          {/* Švih cípem pláště přes spodní polovinu obličeje, návrat do vzpřímení */}
          <path
            d="M 46 54 Q 60 48 74 54 L 68 64 L 52 64 Z"
            fill="#361f3d"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
        </g>
      );

    // 10. Bílá paní (White Lady)
    case "bila":
      if (f === 1) {
        return (
          <g id="hit-bila-f1">
            {/* Spektrální zvlnění jako kapka vody, klíče cinkají vodorovně */}
            <ellipse
              cx="60"
              cy="60"
              rx="24"
              ry="32"
              fill="#ffffff"
              opacity="0.3"
              stroke="#9bbacf"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <line
              x1="72"
              y1="78"
              x2="88"
              y2="76"
              stroke="#3b4b57"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="90" cy="76" r="3" fill="#3b4b57" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-bila-f2">
            {/* Odplutí šikmo vzhůru (-5px X, -4px Y), závoj vlaje dopředu, ruce chrání tvář */}
            <path
              d="M 44 48 Q 60 42 76 48 L 70 56 Q 60 52 50 56 Z"
              fill="#eaf2f8"
              stroke="#1c1308"
              strokeWidth="1.2"
            />
            <ellipse cx="60" cy="46" rx="5" ry="8" fill="#1c2738" />
          </g>
        );
      }
      return (
        <g id="hit-bila-f3">
          {/* Hladké sklouznutí zpět do klidového vznášení */}
          <path
            d="M 46 88 Q 60 96 74 88"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>
      );

    // 11. Hrobník-bubák (Gravedigger Boggart)
    case "hrobnik":
      if (f === 1) {
        return (
          <g id="hit-hrobnik-f1">
            {/* Rukojeť rýče prudce narazí pod paži, lucerna se vychýlí na řetězu */}
            <line
              x1="78"
              y1="52"
              x2="88"
              y2="28"
              stroke="#54371e"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line x1="38" y1="62" x2="22" y2="72" stroke="#1c1308" strokeWidth="1.5" />
            <rect
              x="18"
              y="70"
              width="8"
              height="12"
              fill="#ffd438"
              stroke="#1c1308"
              strokeWidth="1.5"
              transform="rotate(25 22 76)"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-hrobnik-f2">
            {/* Rýč se zasekne do země, lucerna ve vrcholu kyvu, bezzubý škleb */}
            <line
              x1="84"
              y1="68"
              x2="94"
              y2="108"
              stroke="#68737a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="60" cy="50" rx="8" ry="4" fill="#1c1308" />
          </g>
        );
      }
      return (
        <g id="hit-hrobnik-f3">
          {/* Přenesení váhy zpět z rýče, lucerna visí svisle */}
          <line x1="32" y1="64" x2="32" y2="80" stroke="#1c1308" strokeWidth="1.5" />
          <rect
            x="28"
            y="80"
            width="8"
            height="12"
            fill="#ffd438"
            stroke="#1c1308"
            strokeWidth="1.5"
          />
        </g>
      );

    // 12. Ohnivý muž (Fire Man / Will-o'-the-Wisp)
    case "ohnivy":
      if (f === 1) {
        return (
          <g id="hit-ohnivy-f1">
            {/* Jádro plamene imploduje dovnitř, vnější jazyky vyrazí jako supernova */}
            <circle cx="60" cy="54" r="8" fill="#1c1308" stroke="#e63e1e" strokeWidth="2.5" />
            <line
              x1="42"
              y1="54"
              x2="24"
              y2="54"
              stroke="#ffd438"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="78"
              y1="54"
              x2="96"
              y2="54"
              stroke="#ffd438"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="36"
              x2="60"
              y2="18"
              stroke="#ffd438"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="72"
              x2="60"
              y2="90"
              stroke="#ffd438"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-ohnivy-f2">
            {/* Ohnivé tělo prohnuté vzad (-7px X), plamenný chvost s kouřem */}
            <path
              d="M 64 54 Q 78 40 92 36 Q 84 48 70 60 Z"
              fill="#ff7a1c"
              stroke="#1c1308"
              strokeWidth="1.5"
            />
            <circle cx="36" cy="48" r="2.5" fill="#ffd438" />
            <circle cx="44" cy="38" r="1.8" fill="#ffd438" />
          </g>
        );
      }
      return (
        <g id="hit-ohnivy-f3">
          {/* Plamen znovu naběhne na plný objem a teplou zář */}
          <circle cx="60" cy="54" r="18" fill="#ffd438" opacity="0.35" />
        </g>
      );

    // 13. Vodník z černé tůně (High Water Goblin Boss)
    case "vodnik":
      if (f === 1) {
        return (
          <g id="hit-vodnik-f1">
            {/* Těžký náraz, kabát se nafoukne vodou, cylindr zakolísá */}
            <ellipse
              cx="60"
              cy="62"
              rx="28"
              ry="24"
              fill="#1b4d24"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            {/* Vystřelené kapky vody a kusy vodních travin */}
            <circle cx="26" cy="48" r="4.2" fill="#52a7e0" stroke="#1c1308" strokeWidth="1.2" />
            <circle cx="94" cy="50" r="4.5" fill="#52a7e0" stroke="#1c1308" strokeWidth="1.2" />
            <line
              x1="30"
              y1="36"
              x2="18"
              y2="28"
              stroke="#3b7a32"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-vodnik-f2">
            {/* Zakolísání na zadní patu (-7px X), červené pentle vlají dopředu, rozevřená kuňkající huba */}
            <path
              d="M 74 76 Q 88 74 98 68"
              fill="none"
              stroke="#c4321d"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <ellipse cx="60" cy="52" rx="14" ry="8" fill="#1c1308" />
          </g>
        );
      }
      return (
        <g id="hit-vodnik-f3">
          {/* Dupnutí přední boty na břeh, setřesení vody a uražené naražení klobouku */}
          <ellipse cx="50" cy="112" rx="14" ry="4" fill="#1c1308" opacity="0.45" />
        </g>
      );

    // 14. Hospodský čert (Tavern Devil)
    case "cert":
      if (f === 1) {
        return (
          <g id="hit-cert-f1">
            {/* Tlustý krk zajede do ramen, pivo z tupláku komicky vyšplíchne */}
            <path
              d="M 88 56 Q 96 42 86 32"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="84" cy="28" r="3.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1" />
            <circle cx="92" cy="24" r="2.5" fill="#ffffff" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-cert-f2">
            {/* Těžké zaškobrtnutí kopyty vzad (-7px X), ocas mezi nohama, břicho napíná vestu */}
            <path
              d="M 52 88 Q 42 98 32 94"
              fill="none"
              stroke="#1c1308"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <circle cx="60" cy="68" r="14" fill="#a8281b" stroke="#1c1308" strokeWidth="2" />
          </g>
        );
      }
      return (
        <g id="hit-cert-f3">
          {/* Hlasité zadupnutí kopytem do podlahy (+2px X) a zatřepání hlavou */}
          <ellipse cx="56" cy="112" rx="8" ry="4" fill="#1c1308" opacity="0.5" />
        </g>
      );

    // 15. Pavouk (Cellar Spider)
    case "pavouk":
      if (f === 1) {
        return (
          <g id="hit-pavouk-f1">
            {/* Všech 8 nohou se křečovitě stáhne k hlavohrudi, zadeček se přitiskne k zemi */}
            <ellipse
              cx="60"
              cy="66"
              rx="20"
              ry="14"
              fill="#2d2218"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <line
              x1="42"
              y1="62"
              x2="32"
              y2="60"
              stroke="#1c1308"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="78"
              y1="62"
              x2="88"
              y2="60"
              stroke="#1c1308"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-pavouk-f2">
            {/* Zacouvání na zadních 4 nohách (-6px X), přední 4 nohy vytrčené do vzduchu, jed kape z kusadel */}
            <line
              x1="48"
              y1="52"
              x2="34"
              y2="34"
              stroke="#1c1308"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1="72"
              y1="52"
              x2="86"
              y2="34"
              stroke="#1c1308"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <circle cx="58" cy="64" r="1.8" fill="#69f0ae" />
          </g>
        );
      }
      return (
        <g id="hit-pavouk-f3">
          {/* Dopad nohou zpět a zvednutí zadečku do číhavého úhlu */}
          <ellipse
            cx="60"
            cy="58"
            rx="16"
            ry="12"
            fill="#2d2218"
            stroke="#1c1308"
            strokeWidth="2"
          />
        </g>
      );

    // 16. Pekelné dudy (Hell Bagpipes)
    case "pekelne_dudy":
      if (f === 1) {
        return (
          <g id="hit-dudy-f1">
            {/* Zplasknutí měchu o 40 %, píšťala zadušena, proud dýmu z průduchů */}
            <ellipse
              cx="60"
              cy="68"
              rx="26"
              ry="12"
              fill="#5e3b1c"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <path
              d="M 82 54 L 96 46 M 86 60 L 102 56"
              stroke="#eedcb0"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-dudy-f2">
            {/* Zakolísání vzad (-5px X), kozí oči se točí v mrákotách (spirály), třásně vlají */}
            <circle cx="48" cy="42" r="4.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
            <path
              d="M 46 42 Q 48 40 50 42 Q 50 44 48 44"
              fill="none"
              stroke="#1c1308"
              strokeWidth="1.2"
            />
            <circle cx="62" cy="42" r="4.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
            <path
              d="M 60 42 Q 62 40 64 42 Q 64 44 62 44"
              fill="none"
              stroke="#1c1308"
              strokeWidth="1.2"
            />
          </g>
        );
      }
      return (
        <g id="hit-dudy-f3">
          {/* Hlasité nadechnutí měchu a vztyčení kozí hlavy se vzdorným zamečením */}
          <ellipse
            cx="60"
            cy="64"
            rx="24"
            ry="18"
            fill="#6d4422"
            stroke="#1c1308"
            strokeWidth="2"
          />
        </g>
      );

    // 17. Svítící oko (Glowing Beholder Eye)
    case "svitici_oko":
      if (f === 1) {
        return (
          <g id="hit-oko-f1">
            {/* Zornice se smrskne na špendlíkovou hlavičku, oko zploštělé, chapadla vystřelená */}
            <ellipse
              cx="60"
              cy="58"
              rx="22"
              ry="13"
              fill="#fffef7"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <circle cx="60" cy="58" r="1.5" fill="#1c1308" />
            <line
              x1="38"
              y1="58"
              x2="16"
              y2="58"
              stroke="#8e24aa"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="82"
              y1="58"
              x2="104"
              y2="58"
              stroke="#8e24aa"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-oko-f2">
            {/* Odhození vzduchem vzad (-8px X, +2px Y), fialové žíly vzplanou, víčko křečovitě mrká */}
            <ellipse
              cx="56"
              cy="60"
              rx="18"
              ry="16"
              fill="#ffebee"
              stroke="#c2185b"
              strokeWidth="2"
            />
            <line
              x1="42"
              y1="60"
              x2="70"
              y2="60"
              stroke="#1c1308"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        );
      }
      return (
        <g id="hit-oko-f3">
          {/* Oko se znovu zakulatí a chapadla začnou klidně vlnit */}
          <circle cx="60" cy="58" r="18" fill="#ffd54f" opacity="0.4" />
        </g>
      );

    // 18. Netopýr (Cave Bat)
    case "netopyr":
      if (f === 1) {
        return (
          <g id="hit-netopyr-f1">
            {/* Křídla s plácnutím semknutá přes hruď jako štít, pokles o 3px */}
            <path
              d="M 44 48 C 52 40 68 40 76 48 L 60 78 Z"
              fill="#2c222e"
              stroke="#1c1308"
              strokeWidth="2"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-netopyr-f2">
            {/* Nekontrolovaný kotrmelec vzad (-7px X, -3px Y), křídla asymetrická, zoufalý jekot */}
            <path
              d="M 30 38 Q 42 56 52 64"
              stroke="#2c222e"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 90 28 Q 78 52 68 64"
              stroke="#2c222e"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="58,48 62,48 60,42" fill="#ffffff" />
          </g>
        );
      }
      return (
        <g id="hit-netopyr-f3">
          {/* Silný máchavý záběr křídel směrem dolů a stabilizace letu */}
          <path d="M 24 58 Q 60 38 96 58" stroke="#1c1308" strokeWidth="2.5" fill="none" />
        </g>
      );

    // 19. Čertova babička (Devil's Grandmother)
    case "certova_babicka":
      if (f === 1) {
        return (
          <g id="hit-babicka-f1">
            {/* Váleček/koště vyletí z ruky, zástěra vylétne k pasu, šátek sjede na brýle */}
            <line
              x1="82"
              y1="52"
              x2="98"
              y2="34"
              stroke="#b88344"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <ellipse
              cx="60"
              cy="40"
              rx="14"
              ry="8"
              fill="#c4321d"
              stroke="#1c1308"
              strokeWidth="1.8"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-babicka-f2">
            {/* Vrávorání na kopytech vzad (-5px X), drží brýle na rypáčku pazourem, žluté tesáky */}
            <rect
              x="52"
              y="44"
              width="7"
              height="6"
              rx="1.5"
              fill="none"
              stroke="#ffd438"
              strokeWidth="1.5"
            />
            <rect
              x="61"
              y="44"
              width="7"
              height="6"
              rx="1.5"
              fill="none"
              stroke="#ffd438"
              strokeWidth="1.5"
            />
            <polygon points="56,53 58,58 54,58" fill="#ffd438" />
          </g>
        );
      }
      return (
        <g id="hit-babicka-f3">
          {/* Uražené dupnutí kopyty, uhlazení zástěry a přísný pohled přes obroučky */}
          <ellipse cx="54" cy="112" rx="7" ry="3.5" fill="#1c1308" opacity="0.45" />
        </g>
      );

    // 20. Loupežník (Forest Brigand)
    case "loupeznik":
      if (f === 1) {
        return (
          <g id="hit-loupeznik-f1">
            {/* Přímý zásah do hrudníku, klobouk s pérem poskočí o 2px nahoru */}
            <ellipse
              cx="60"
              cy="22"
              rx="20"
              ry="7"
              fill="#2d3b2a"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <path d="M 68 20 Q 82 10 92 12" stroke="#c4321d" strokeWidth="2.5" fill="none" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-loupeznik-f2">
            {/* Těžký dvoukrok vzad (-7px X), ruka drží naražená žebra, sukovice padá vzad */}
            <line
              x1="84"
              y1="68"
              x2="102"
              y2="86"
              stroke="#4a3420"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <ellipse
              cx="60"
              cy="26"
              rx="20"
              ry="7"
              fill="#2d3b2a"
              stroke="#1c1308"
              strokeWidth="2"
              transform="rotate(-12 60 26)"
            />
          </g>
        );
      }
      return (
        <g id="hit-loupeznik-f3">
          {/* Došlápnutí do širokého bojového postoje a zdvižení sukovice k rameni */}
          <ellipse cx="44" cy="112" rx="9" ry="3.5" fill="#1c1308" opacity="0.45" />
        </g>
      );

    // 21. Lupič s bambitkami (Pistol Bandit)
    case "lupic":
      if (f === 1) {
        return (
          <g id="hit-lupic-f1">
            {/* Otočení trupu o 45°, hlavně bambitek vyletí kolmo k nebi */}
            <line
              x1="42"
              y1="62"
              x2="38"
              y2="38"
              stroke="#4a5560"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="78"
              y1="62"
              x2="82"
              y2="38"
              stroke="#4a5560"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-lupic-f2">
            {/* Úskočný skluz vzad (-8px X), zkřížené ruce u těla, štěrk odlétá od bot */}
            <circle cx="36" cy="110" r="2" fill="#8c7355" />
            <circle cx="44" cy="112" r="1.5" fill="#8c7355" />
            <circle cx="52" cy="109" r="2.2" fill="#8c7355" />
          </g>
        );
      }
      return (
        <g id="hit-lupic-f3">
          {/* Zpětné natáhnutí kohoutků bambitek palcem a zamíření na hráče */}
          <circle cx="42" cy="52" r="2" fill="#ffd438" />
          <circle cx="78" cy="52" r="2" fill="#ffd438" />
        </g>
      );

    // 22. Ropucha (Giant Wart Toad)
    case "ropucha":
      if (f === 1) {
        return (
          <g id="hit-ropucha-f1">
            {/* Rosolovitý squash na placku, hrdelní vak se vyvalí do stran, oči zajíždějí do lebky */}
            <ellipse
              cx="60"
              cy="74"
              rx="34"
              ry="16"
              fill="#3c5235"
              stroke="#1c1308"
              strokeWidth="2.5"
            />
            <ellipse cx="40" cy="78" rx="8" ry="6" fill="#69875c" opacity="0.8" />
            <ellipse cx="80" cy="78" rx="8" ry="6" fill="#69875c" opacity="0.8" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-ropucha-f2">
            {/* Smýknutí po břiše vzad (-6px X), z bradavic prýští kapky slizu, tlama slintá bláto */}
            <circle cx="38" cy="62" r="2.5" fill="#a4e058" stroke="#1c1308" strokeWidth="0.8" />
            <circle cx="82" cy="62" r="2.5" fill="#a4e058" stroke="#1c1308" strokeWidth="0.8" />
            <line
              x1="56"
              y1="84"
              x2="64"
              y2="84"
              stroke="#543c25"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      }
      return (
        <g id="hit-ropucha-f3">
          {/* Výfuk kuňkavého obláčku, přední nohy zvednou hruď z bahna */}
          <ellipse cx="60" cy="108" rx="32" ry="5" fill="#2d3b25" opacity="0.4" />
        </g>
      );

    // 23. Ohnivý kohout (Fiery Rooster)
    case "ohnivy_kohout":
      if (f === 1) {
        return (
          <g id="hit-kohout-f1">
            {/* Peří kolem krku se načepýří do zářícího kruhu, hřebínek potemní */}
            <circle
              cx="60"
              cy="46"
              r="22"
              fill="#ffd438"
              opacity="0.5"
              stroke="#e63e1e"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <polygon points="56,36 64,36 60,42" fill="#8c2210" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-kohout-f2">
            {/* Popletené mávání křídly vzad (-7px X), z ocasu létají jiskry na zem, zobák dokořán */}
            <circle cx="88" cy="74" r="2.5" fill="#ffd438" />
            <circle cx="96" cy="84" r="2" fill="#ff7a1c" />
            <circle cx="102" cy="78" r="1.5" fill="#ffd438" />
            <polygon points="46,44 40,48 46,52" fill="#e69818" stroke="#1c1308" strokeWidth="1" />
          </g>
        );
      }
      return (
        <g id="hit-kohout-f3">
          {/* Pevné došlápnutí na ostruhy, zatřepání chocholkou a znovuvzplanutí hřebínku */}
          <polygon points="56,22 64,14 62,26" fill="#e63e1e" stroke="#ffd438" strokeWidth="1.2" />
        </g>
      );

    // 24. Černý pes (Barghest / Black Hound)
    case "cerny_pes":
      if (f === 1) {
        return (
          <g id="hit-pes-f1">
            {/* Prudké trhnutí čenichem na stranu, uši přilepené k šíji, řetěz napnutý */}
            <ellipse cx="64" cy="48" rx="14" ry="9" fill="#1c1308" transform="rotate(-15 64 48)" />
            <line
              x1="48"
              y1="58"
              x2="34"
              y2="68"
              stroke="#7a848c"
              strokeWidth="2"
              strokeDasharray="3,2"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-pes-f2">
            {/* Vzpínající se záklon (-8px X), planoucí rudé oči, vyceněné bílé tesáky */}
            <circle cx="56" cy="44" r="3.2" fill="#e63e1e" />
            <circle cx="68" cy="44" r="3.2" fill="#e63e1e" />
            <polygon points="58,54 62,54 60,59" fill="#ffffff" />
            <polygon points="64,54 68,54 66,59" fill="#ffffff" />
          </g>
        );
      }
      return (
        <g id="hit-pes-f3">
          {/* Nízký predátorský přikrčený postoj (+2px X) se zježeným hřbetem */}
          <line x1="38" y1="46" x2="40" y2="40" stroke="#1c1308" strokeWidth="2" />
          <line x1="46" y1="44" x2="48" y2="38" stroke="#1c1308" strokeWidth="2" />
        </g>
      );

    // 25. Divoženka (Wild Wood Fairy)
    case "divozenka":
      if (f === 1) {
        return (
          <g id="hit-divozenka-f1">
            {/* Pružné mrsknutí trupu, mechový věneček se posune, ruce vystřelené */}
            <circle
              cx="60"
              cy="30"
              r="12"
              fill="none"
              stroke="#548235"
              strokeWidth="3"
              strokeDasharray="4,3"
              transform="rotate(20 60 30)"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-divozenka-f2">
            {/* Vzdušný přemet vzad (-7px X, +2px Y), vlasy a šlahouny v kruhu kolem těla */}
            <path
              d="M 40 46 Q 30 26 50 20 Q 76 22 72 44"
              fill="none"
              stroke="#8c6239"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="60" cy="48" rx="4" ry="1.5" fill="#1c1308" />
          </g>
        );
      }
      return (
        <g id="hit-divozenka-f3">
          {/* Ladné dopadnutí na špičky a okamžitý pružný poskok do tanečního střehu */}
          <ellipse cx="58" cy="112" rx="8" ry="2.5" fill="#1c1308" opacity="0.3" />
        </g>
      );

    // 26. Jeskyňka (Cave Gremlin)
    case "jeskynka":
      if (f === 1) {
        return (
          <g id="hit-jeskynka-f1">
            {/* Vyděšené stažení hlavy mezi lopatky, uši složené jako u zahnané myši */}
            <ellipse
              cx="60"
              cy="56"
              rx="14"
              ry="10"
              fill="#6d5440"
              stroke="#1c1308"
              strokeWidth="2"
            />
            <ellipse
              cx="44"
              cy="50"
              rx="5"
              ry="3"
              fill="#8c6c54"
              stroke="#1c1308"
              strokeWidth="1.2"
              transform="rotate(-30 44 50)"
            />
            <ellipse
              cx="76"
              cy="50"
              rx="5"
              ry="3"
              fill="#8c6c54"
              stroke="#1c1308"
              strokeWidth="1.2"
              transform="rotate(30 76 50)"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-jeskynka-f2">
            {/* Zarytí drápů do hlíny a vyškrábnutí dvou rýh vzad (-6px X) */}
            <line
              x1="50"
              y1="108"
              x2="38"
              y2="108"
              stroke="#1c1308"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="70"
              y1="108"
              x2="58"
              y2="108"
              stroke="#1c1308"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
      }
      return (
        <g id="hit-jeskynka-f3">
          {/* Nízké zasyčení u země, otřepání hlíny z drápů */}
          <path d="M 54 62 Q 60 58 66 62" stroke="#1c1308" strokeWidth="2" fill="none" />
        </g>
      );

    // 27. Létající rarach (Flying Imp)
    case "letajici_rarach":
      if (f === 1) {
        return (
          <g id="hit-rarach-f1">
            {/* Ztráta vztlaku, křídla bleskově přiklopena, tělo smrštěno do koule */}
            <circle cx="60" cy="54" r="16" fill="#a8281b" stroke="#1c1308" strokeWidth="2.5" />
            <path d="M 68 64 Q 78 54 72 44" fill="none" stroke="#1c1308" strokeWidth="3" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-rarach-f2">
            {/* Odmrštění šikmo vzad (-8px X, -3px Y), rozhozený rytmus křídel, otevřená tlama */}
            <path
              d="M 40 40 L 26 26 M 80 44 L 96 32"
              stroke="#4a120c"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse cx="58" cy="52" rx="4" ry="6" fill="#1c1308" />
          </g>
        );
      }
      return (
        <g id="hit-rarach-f3">
          {/* Dvojí rychlé máchnutí křídly a stabilizace výšky letu */}
          <path d="M 36 46 Q 60 38 84 46" stroke="#ffd438" strokeWidth="2" fill="none" />
        </g>
      );

    // 28. Lesní muž (Woodwose / Moss Treeman)
    case "lesni_muz":
      if (f === 1) {
        return (
          <g id="hit-lesni-f1">
            {/* Nulový squash (tuhé dubové dřevo), rozstříknutí jehličí a suchého mechu */}
            <line
              x1="38"
              y1="46"
              x2="24"
              y2="40"
              stroke="#3e6b28"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="42"
              y1="56"
              x2="26"
              y2="58"
              stroke="#3e6b28"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="82"
              y1="46"
              x2="96"
              y2="40"
              stroke="#3e6b28"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="28" cy="50" r="1.5" fill="#588c3a" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-lesni-f2">
            {/* Tuhý záklon kmene (-5px X), větve na ramenou zakolísají, lišejníkový vous vlaje */}
            <path
              d="M 52 68 Q 44 82 36 90"
              stroke="#7a8c54"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      }
      return (
        <g id="hit-lesni-f3">
          {/* Dřevnaté zadupnutí kořenového pařátu (+2px X), lístky usedají na místo */}
          <ellipse cx="56" cy="112" rx="12" ry="4" fill="#1c1308" opacity="0.5" />
        </g>
      );

    // 29. Rusalka (Water Nymph)
    case "rusalka":
      if (f === 1) {
        return (
          <g id="hit-rusalka-f1">
            {/* Prohnutí trupu do luku, prameny mokrých vlasů vystříknou před obličej, mlha */}
            <circle cx="60" cy="50" r="18" fill="#e0f2fe" opacity="0.35" />
            <path
              d="M 44 38 Q 32 44 26 56"
              stroke="#2d6a4f"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-rusalka-f2">
            {/* Vznášivá otočka vzad (-6px X), paže zkřížené přes srdce, vlasy halí tvář */}
            <ellipse
              cx="58"
              cy="52"
              rx="6"
              ry="12"
              fill="#a7f3d0"
              stroke="#1c1308"
              strokeWidth="1.2"
              transform="rotate(-15 58 52)"
            />
            <ellipse
              cx="64"
              cy="52"
              rx="6"
              ry="12"
              fill="#a7f3d0"
              stroke="#1c1308"
              strokeWidth="1.2"
              transform="rotate(15 64 52)"
            />
          </g>
        );
      }
      return (
        <g id="hit-rusalka-f3">
          {/* Ladné sklouznutí dolů, vlasy stékají zpět po ramenou v zádumčivém smutku */}
          <path
            d="M 46 72 Q 60 84 74 72"
            stroke="#2d6a4f"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
        </g>
      );

    // 30. Permoník (Mine Dwarf)
    case "permonik":
      if (f === 1) {
        return (
          <g id="hit-permonik-f1">
            {/* Tvrdý náraz, topůrko krumpáče prudce poskočí, havířská kápě sjede na nos */}
            <line
              x1="82"
              y1="52"
              x2="98"
              y2="40"
              stroke="#54371e"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse
              cx="60"
              cy="38"
              rx="14"
              ry="7"
              fill="#3b2b1e"
              stroke="#1c1308"
              strokeWidth="2"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-permonik-f2">
            {/* Šournutí nohama vzad (-6px X), krumpáč drhne o zem s jiskrami, kahanec se rozkýve */}
            <circle cx="94" cy="108" r="2.5" fill="#ffd438" />
            <circle cx="100" cy="104" r="1.8" fill="#ffd438" />
            <line x1="36" y1="72" x2="24" y2="82" stroke="#d4af37" strokeWidth="2" />
            <rect
              x="20"
              y="80"
              width="8"
              height="10"
              fill="#ffd438"
              stroke="#1c1308"
              strokeWidth="1.2"
            />
          </g>
        );
      }
      return (
        <g id="hit-permonik-f3">
          {/* Pevný postoj rozkročených bot, špičkou vykopne krumpáč a odhrne kápi z očí */}
          <line
            x1="88"
            y1="72"
            x2="88"
            y2="106"
            stroke="#54371e"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      );

    // 31. Kmotra liška (Godmother Fox)
    case "kmotra_liska":
      if (f === 1) {
        return (
          <g id="hit-liska-f1">
            {/* Trhnutí čumáčkem, kvítkovaný čepec vyletí z uší dopředu na nos, ocas ztuhne */}
            <ellipse
              cx="68"
              cy="40"
              rx="9"
              ry="6"
              fill="#fffdf5"
              stroke="#1c1308"
              strokeWidth="1.5"
            />
            <circle cx="68" cy="40" r="1.8" fill="#e63e1e" />
            <line
              x1="28"
              y1="84"
              x2="8"
              y2="84"
              stroke="#d95f1e"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-liska-f2">
            {/* Zabrždění na 4 tlapkách (-7px X), šňůrky zástěrky vlají, uražené liščí vyjeknutí */}
            <line
              x1="48"
              y1="82"
              x2="38"
              y2="76"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="72"
              y1="82"
              x2="82"
              y2="76"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <ellipse cx="72" cy="50" rx="6" ry="4" fill="#1c1308" />
          </g>
        );
      }
      return (
        <g id="hit-liska-f3">
          {/* Rychlé zatřepání hlavičkou, čepec skočí zpět na uši a ocas se obtočí kolem tlapek */}
          <path
            d="M 32 94 Q 44 104 64 100"
            stroke="#d95f1e"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );

    // 32. Čert elegán (Dapper Gentleman Devil)
    case "cert_elegan":
      if (f === 1) {
        return (
          <g id="hit-elegan-f1">
            {/* Narušená noblesa, hůlka podklouzne, monokl vystřelí z oka na šňůrce */}
            <circle cx="74" cy="38" r="4.5" fill="#eaf2f8" stroke="#ffd438" strokeWidth="1.8" />
            <path d="M 68 44 Q 72 48 76 42" stroke="#1c1308" strokeWidth="1" fill="none" />
            <line
              x1="88"
              y1="68"
              x2="104"
              y2="92"
              stroke="#1c1308"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-elegan-f2">
            {/* Klopýtnutí vzad na lakýrkových kopytech (-6px X), ruka drží hedvábnou klopu, bradka k nebi */}
            <path d="M 52 58 L 58 72 L 64 58 Z" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
            <polygon points="60,54 62,60 58,60" fill="#1c1308" />
          </g>
        );
      }
      return (
        <g id="hit-elegan-f3">
          {/* Elegantní zabrždění holí, chycení letícího monoklu do prstů a ledový pohled */}
          <line
            x1="86"
            y1="62"
            x2="86"
            y2="108"
            stroke="#1c1308"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="86" cy="60" r="3" fill="#ffd438" />
        </g>
      );

    // 33. Lotr intelektuál (Scholar Bandit)
    case "lotr_intelektual":
      if (f === 1) {
        return (
          <g id="hit-lotr-f1">
            {/* Kulaté brýle sjedou na nos, tlustá kniha sklapne s obláčkem prachu z pergamenu */}
            <circle cx="53" cy="42" r="4" fill="none" stroke="#1c1308" strokeWidth="1.8" />
            <circle cx="63" cy="42" r="4" fill="none" stroke="#1c1308" strokeWidth="1.8" />
            <line x1="57" y1="42" x2="59" y2="42" stroke="#1c1308" strokeWidth="1.5" />
            <circle cx="78" cy="70" r="4.5" fill="#f4ecd8" opacity="0.8" />
            <circle cx="84" cy="66" r="3.2" fill="#f4ecd8" opacity="0.6" />
          </g>
        );
      }
      if (f === 2) {
        return (
          <g id="hit-lotr-f2">
            {/* Kymácení vzad (-7px X), tiskne knihu k hrudi, kord padá hrotem ke kamenům, baret visí */}
            <line
              x1="88"
              y1="74"
              x2="98"
              y2="106"
              stroke="#90a4ae"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse
              cx="68"
              cy="28"
              rx="8"
              ry="4"
              fill="#37474f"
              stroke="#1c1308"
              strokeWidth="1.5"
              transform="rotate(25 68 28)"
            />
          </g>
        );
      }
      return (
        <g id="hit-lotr-f3">
          {/* Kloubem prstu si posune brýle zpět na kořen nosu, narovná límec a pozvedne kord */}
          <line
            x1="86"
            y1="66"
            x2="72"
            y2="48"
            stroke="#90a4ae"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      );

    default:
      return null;
  }
}
