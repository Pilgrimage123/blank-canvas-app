import React from "react";
import { EnemyTypeId } from "../../types";
import { ENEMY_DB } from "../../data/gameData";
import { renderLadaCertSprite } from "./LadaCertSprites";
import { renderLadaWaterSprite } from "./LadaWaterSprites";
import { renderLadaRobberSprite } from "./LadaRobberSprites";
import { renderLadaSpookySprite } from "./LadaSpookySprites";
import { renderLadaFolkloreNewSprite } from "./LadaFolkloreNewSprites";
import { renderLadaPermonikSprite } from "./LadaPermonikSprites";
import { renderLadaNewFamilySprite } from "./LadaNewFamilySprites";
import { renderLadaCertEleganSprite } from "./LadaCertEleganSprites";

export interface EnemySpriteProps {
  type: EnemyTypeId | string;
  isHit?: boolean;
  isAttacking?: boolean;
  attackFrame?: number; // 1 to 5 pro krokování útočné animace
  isMoving?: boolean; // přesun z místa na místo
  moveFrame?: number; // 1 to 4 pro krokování pohybu
  moveDirection?: "forward" | "backward" | "up" | "down" | "lateral";
  size?: number | string;
  className?: string;
  statusLabel?: string;
  variantIndex?: number;
  variantName?: string;
  variantLevel?: number;
  applyStageScale?: boolean;
}

import { getStageScale } from "../../utils/spriteUtils";

export const EnemySprite: React.FC<EnemySpriteProps> = ({
  type,
  isHit = false,
  isAttacking = false,
  attackFrame,
  isMoving = false,
  moveFrame,
  moveDirection = "forward",
  size = 140,
  className = "",
  variantIndex,
  variantName,
  variantLevel,
  applyStageScale = true,
}) => {
  const resolvedType = React.useMemo(() => {
    let t = (type || "").toLowerCase();
    if (t === "bila_pani") return "bila";
    if (t === "ohnivy_muz") return "ohnivy";
    if (t === "certik") return "rarasek";

    if (variantName) {
      const vn = variantName.toLowerCase();

      // Specific multi-word or compound creatures FIRST to prevent keyword hijacking:
      // 1. Ohnivý kohout must take priority over generic "ohnivý"
      if (vn.includes("kohout") || vn.includes("kuřátk") || vn.includes("ožehlý kohout"))
        return "ohnivy_kohout";
      // 2. Černý pes must take priority over generic "ohnivý" (e.g. Černý pes s ohnivýma očima)
      if (
        vn.includes("pes") ||
        vn.includes("voříšek") ||
        vn.includes("chrt") ||
        vn.includes("barghest")
      )
        return "cerny_pes";
      // 3. Lesní muž must take priority over generic "divoch" (e.g. Kůrový lesní divoch vs Divoch helkal)
      if (
        vn.includes("kůrový") ||
        vn.includes("lesní muž") ||
        vn.includes("lesni muz") ||
        vn.includes("mechový mužík") ||
        vn.includes("ochránce hvozdu")
      )
        return "lesni_muz";
      // 4. Hrobník must take priority over generic "bubák" (e.g. Hřbitovní bubák)
      if (
        vn.includes("hrobník") ||
        vn.includes("hrobnik") ||
        vn.includes("kostnický") ||
        vn.includes("hřbitovní bubák")
      )
        return "hrobnik";
      // 5. Hospodský čert must take priority over generic "čertík" / rarášek (e.g. Šenkýřský čertík)
      if (
        vn.includes("šenkýřský") ||
        vn.includes("hospodský čert") ||
        vn.includes("karbanický") ||
        vn.includes("rohatý kníže") ||
        (t === "cert" && vn.includes("čertík"))
      )
        return "cert";

      if (
        vn.includes("hastrman") ||
        vn.includes("blatouchový") ||
        vn.includes("potoční") ||
        vn.includes("jezerní")
      )
        return "hastrman";
      if (
        vn.includes("vodník") ||
        vn.includes("vodnik") ||
        vn.includes("vodníček") ||
        vn.includes("tůňový") ||
        vn.includes("hlubin")
      )
        return "vodnik";
      if (vn.includes("rarášek") || vn.includes("rarasek") || vn.includes("čertík"))
        return "rarasek";
      if (
        vn.includes("babička") ||
        vn.includes("pekelná vládkyně") ||
        vn.includes("hospodyně z pekla") ||
        vn.includes("čertí chůva")
      )
        return "certova_babicka";
      if (vn.includes("dudy") || vn.includes("pískavé") || vn.includes("kozí dudy"))
        return "pekelne_dudy";
      if (vn.includes("oko") || vn.includes("jiskřivé očko") || vn.includes("vševidoucí"))
        return "svitici_oko";
      if (vn.includes("netopýr") || vn.includes("ušatec") || vn.includes("vampýří"))
        return "netopyr";
      if (
        vn.includes("bambitk") ||
        vn.includes("kapsář") ||
        vn.includes("pistolník") ||
        vn.includes("lupič") ||
        vn.includes("lupic")
      )
        return "lupic";
      if (
        vn.includes("loupežník") ||
        vn.includes("loupežníč") ||
        vn.includes("loupeznic") ||
        vn.includes("sarka farka") ||
        vn.includes("hejtman")
      )
        return "loupeznik";
      if (
        vn.includes("sklípkan") ||
        vn.includes("koutníček") ||
        vn.includes("křižák") ||
        vn.includes("pavouk")
      )
        return "pavouk";
      if (vn.includes("polednice") || vn.includes("polední")) return "polednice";
      if (
        vn.includes("klekánice") ||
        vn.includes("klekanice") ||
        vn.includes("klekáničk") ||
        vn.includes("večerní")
      )
        return "klekanice";
      if (
        vn.includes("bila") ||
        vn.includes("bílá paní") ||
        vn.includes("zámecká paní") ||
        vn.includes("zjevení") ||
        vn.includes("paní")
      )
        return "bila";
      if (
        vn.includes("ohnivý") ||
        vn.includes("ohnivy") ||
        vn.includes("jiskřička") ||
        vn.includes("dýmající") ||
        vn.includes("rozhicovaný")
      )
        return "ohnivy";
      if (vn.includes("helkal") || vn.includes("užvaněný") || vn.includes("divoch"))
        return "helkal";
      if (vn.includes("umrlec") || vn.includes("mrtvák") || vn.includes("mrtvak")) return "mrtvak";
      if (vn.includes("kostlivec") || vn.includes("kostěný") || vn.includes("kostík"))
        return "kostlivec";
      if (
        vn.includes("upír") ||
        vn.includes("upir") ||
        vn.includes("nocležní") ||
        vn.includes("krvavý") ||
        vn.includes("panský")
      )
        return "upir";
      if (
        vn.includes("ropuch") ||
        vn.includes("ropuš") ||
        vn.includes("kaluže") ||
        vn.includes("blátivých")
      )
        return "ropucha";
      if (vn.includes("divoženk") || vn.includes("žínka")) return "divozenka";
      if (
        vn.includes("jeskyňk") ||
        vn.includes("jeskynk") ||
        vn.includes("skalní víla") ||
        vn.includes("podzemních")
      )
        return "jeskynka";
      if (vn.includes("rarach") || vn.includes("poletuch")) return "letajici_rarach";
      if (vn.includes("rusalk") || vn.includes("rusalenk") || vn.includes("leknínových vod"))
        return "rusalka";
      if (
        vn.includes("permoník") ||
        vn.includes("permonik") ||
        vn.includes("permoníček") ||
        vn.includes("havířský") ||
        vn.includes("důlní mistr")
      )
        return "permonik";
      if (vn.includes("lištičk") || vn.includes("kmotra") || vn.includes("kmotřičk"))
        return "kmotra_liska";
      if (
        vn.includes("čert voják") ||
        vn.includes("čert myslivec") ||
        vn.includes("čert džentlmen") ||
        vn.includes("čert hrabě") ||
        vn.includes("elegán") ||
        vn.includes("elegan") ||
        vn.includes("džentlmen") ||
        (t === "cert_elegan" &&
          (vn.includes("voják") || vn.includes("myslivec") || vn.includes("hrabě")))
      )
        return "cert_elegan";
      if (
        vn.includes("lotr") ||
        vn.includes("studovaný lapka") ||
        vn.includes("lupičský čtenář") ||
        vn.includes("loupežnický učenec")
      )
        return "lotr_intelektual";
      if (vn.includes("bubák") || vn.includes("bubak")) return "bubak";
    }
    return t;
  }, [type, variantName]);

  // Určení stádia (0 až 3)
  const resolvedStage = React.useMemo(() => {
    if (typeof variantIndex === "number") {
      return Math.max(0, Math.min(3, variantIndex));
    }
    if (variantName) {
      const tpl = ENEMY_DB.find(
        (e) => e.id === resolvedType || e.type === resolvedType || e.id === type || e.type === type,
      );
      if (tpl?.variants) {
        const idx = tpl.variants.findIndex((v) => v.name === variantName);
        if (idx !== -1) return idx;
      }
      if (
        variantName === "Král sklípkanů" ||
        variantName.includes("sklípkan") ||
        variantName.includes("Sklípkanník")
      ) {
        return 3;
      }
      if (variantName.includes("Koutníček")) return 0;
      if (variantName.includes("Křižák")) return 1;
      if (variantName.includes("Lesní")) return 2;
    }
    if (typeof variantLevel === "number") {
      const tpl = ENEMY_DB.find(
        (e) => e.id === resolvedType || e.type === resolvedType || e.id === type || e.type === type,
      );
      if (tpl?.variants) {
        const idx = tpl.variants.findIndex((v) => v.level === variantLevel);
        if (idx !== -1) return idx;
      }
    }
    return 2;
  }, [variantIndex, variantName, variantLevel, type, resolvedType]);

  // 12 % velikostní odlišení za každé stádium pro standardní bubáky.
  // Rodina Čerta elegána má výslovnou výjimku: všichni členové jsou stejně velcí jako lovec (běžná lidská velikost).
  const isCertEleganFamily = resolvedType === "cert_elegan";
  const stageScale =
    applyStageScale && !isCertEleganFamily ? getStageScale(resolvedStage, resolvedType) : 1;
  const isPermonikFamily = resolvedType === "permonik";
  // Permoníci jsou trpasličí horničtí skřítci ("všichni jsou docela malí")
  // Čert elegán má standardní lidskou velikost lovce (115 px základ oproti 140 px pro velké obludy)
  const sizeFactor = isPermonikFamily ? 0.9 : isCertEleganFamily ? 115 / 140 : 1.0;
  const baseWidth =
    typeof size === "number" ? Math.round(size * sizeFactor) : isCertEleganFamily ? 115 : 140;
  const baseHeight =
    typeof size === "number"
      ? Math.round(size * (isCertEleganFamily ? 1.08 : 1.05) * sizeFactor)
      : isCertEleganFamily
        ? 124
        : 148;
  const width = Math.round(baseWidth * stageScale);
  const height = Math.round(baseHeight * stageScale);

  const isDevilFamily =
    resolvedType === "cert" || resolvedType === "rarasek" || resolvedType === "certik";

  const isNewFolkloreFamily =
    resolvedType === "ropucha" ||
    resolvedType === "ohnivy_kohout" ||
    resolvedType === "cerny_pes" ||
    resolvedType === "divozenka" ||
    resolvedType === "jeskynka" ||
    resolvedType === "letajici_rarach" ||
    resolvedType === "lesni_muz" ||
    resolvedType === "rusalka" ||
    resolvedType === "kmotra_liska" ||
    resolvedType === "cert_elegan" ||
    resolvedType === "lotr_intelektual" ||
    isPermonikFamily;

  const getMotionClass = () => {
    if (isHit) return "anim-hit";

    // Krokování útočné animace (1 až 5)
    if (typeof attackFrame === "number" && attackFrame >= 1 && attackFrame <= 5) {
      return `pose-enemy-atk-${attackFrame}`;
    }
    // Plynulá 5fázová útočná animace
    if (isAttacking) return "anim-attack-5frame-enemy";

    // Krokování pohybu (1 až 4)
    if (typeof moveFrame === "number" && moveFrame >= 1 && moveFrame <= 4) {
      return `pose-enemy-move-${moveFrame}`;
    }
    // Plynulý 4fázový pohyb z místa na místo
    if (isMoving) {
      if (moveDirection === "forward") return "anim-move-4frame-advance";
      if (moveDirection === "backward") return "anim-move-4frame-retreat";
      if (moveDirection === "lateral") return "anim-move-4frame-lateral";
      return "anim-move-4frame-enemy";
    }

    if (
      resolvedType === "bila" ||
      resolvedType === "bila_pani" ||
      resolvedType === "ohnivy" ||
      resolvedType === "ohnivy_muz" ||
      resolvedType === "svitici_oko" ||
      resolvedType === "netopyr" ||
      resolvedType === "letajici_rarach" ||
      resolvedType === "rusalka"
    )
      return "anim-lada-float";
    return "anim-lada-breathe";
  };

  const showAttackSwoosh = attackFrame === 3 || attackFrame === 4 || (isAttacking && !attackFrame);
  const showDustPuff = moveFrame === 3 || moveFrame === 4 || (isMoving && !moveFrame);

  return (
    <div
      key={
        isHit
          ? "hit"
          : typeof attackFrame === "number"
            ? `atk-${attackFrame}`
            : isAttacking
              ? "atk"
              : typeof moveFrame === "number"
                ? `mov-${moveFrame}`
                : isMoving
                  ? "mov"
                  : "idle"
      }
      className={`relative inline-flex items-center justify-center select-none ${getMotionClass()} ${className}`}
      style={{ width, height }}
    >
      {/* Sprite SVG: Rodina čertů, čertů elegánů a permoníků dostávají zbrusu nové Ladovské sprity s plnou reaktivitou */}
      {resolvedType === "cert_elegan"
        ? renderLadaCertEleganSprite(
            resolvedStage,
            isHit,
            isAttacking || !!attackFrame,
            variantName,
          )
        : isDevilFamily
          ? renderLadaCertSprite(resolvedType, resolvedStage, isHit, isAttacking || !!attackFrame)
          : isPermonikFamily
            ? renderLadaPermonikSprite(
                resolvedStage,
                isHit,
                isAttacking || !!attackFrame,
                variantName,
              )
            : renderEnemySvg(resolvedType, resolvedStage, variantName)}
      {/* Doplňky ostatních bubáků (čerti a nové folklórní rodiny mají vše integrované ve vlastních Ladovských spritech) */}
      {!isDevilFamily &&
        !isNewFolkloreFamily &&
        renderVariantAccents(resolvedType, resolvedStage, variantName)}

      {/* Ladovský 5-fázový útočný komický sečný oblouk a Bác! hvězdičky */}
      {showAttackSwoosh && (
        <svg
          viewBox="0 0 120 130"
          className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-20 anim-comic-swoosh"
        >
          {/* Sečný oblouk zprava doleva směrem na lovce */}
          <path
            d="M65 15 C30 25 10 58 20 90"
            fill="none"
            stroke="#ffd438"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M62 18 C34 28 16 56 24 86"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Hvězdičky komického zásahu */}
          <polygon
            points="14,32 18,39 25,39 19,44 21,51 14,47 7,51 9,44 3,39 10,39"
            fill="#e63920"
            stroke="#1c1308"
            strokeWidth="1.2"
          />
          <circle cx="8" cy="58" r="2.2" fill="#ffd438" stroke="#1c1308" strokeWidth="0.8" />
          <circle cx="22" cy="72" r="1.8" fill="#ff8c38" stroke="#1c1308" strokeWidth="0.8" />
        </svg>
      )}

      {/* Ladovské 4-fázové obláčky prachu při dopadu po skoku / přesunu */}
      {showDustPuff && (
        <svg
          viewBox="0 0 120 130"
          className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-10 anim-dust-puff"
        >
          {/* Levý obláček prachu pod nohou */}
          <ellipse
            cx="34"
            cy="120"
            rx="9"
            ry="4"
            fill="#d4be94"
            opacity="0.85"
            stroke="#1c1308"
            strokeWidth="0.9"
          />
          <circle cx="27" cy="117" r="3.2" fill="#ebd8b5" stroke="#1c1308" strokeWidth="0.8" />
          <circle cx="41" cy="116" r="3.8" fill="#ebd8b5" stroke="#1c1308" strokeWidth="0.8" />

          {/* Pravý obláček prachu pod nohou */}
          <ellipse
            cx="86"
            cy="120"
            rx="9"
            ry="4"
            fill="#d4be94"
            opacity="0.85"
            stroke="#1c1308"
            strokeWidth="0.9"
          />
          <circle cx="79" cy="116" r="3.8" fill="#ebd8b5" stroke="#1c1308" strokeWidth="0.8" />
          <circle cx="93" cy="117" r="3.2" fill="#ebd8b5" stroke="#1c1308" strokeWidth="0.8" />
        </svg>
      )}
    </div>
  );
};

function renderEnemySvg(type: string, stage: number = 2, variantName?: string): React.ReactNode {
  if (type === "cert_elegan") {
    return renderLadaCertEleganSprite(stage, false, false, variantName);
  }
  if (type === "permonik") {
    return renderLadaPermonikSprite(stage, false, false, variantName);
  }
  if (type === "hastrman" || type === "vodnik") {
    return renderLadaWaterSprite(type, stage);
  }
  if (type === "loupeznik" || type === "lupic") {
    return renderLadaRobberSprite(type, stage);
  }
  const newFamily = renderLadaNewFamilySprite(type, stage);
  if (newFamily) {
    return newFamily;
  }
  const newFolklore = renderLadaFolkloreNewSprite(type, stage);
  if (newFolklore) {
    return newFolklore;
  }
  return renderLadaSpookySprite(type, stage);
}

/**
 * Render unique visual details, equipment, crowns, badges, and folklore adornments
 * for each individual family member (variant index 0 = Mládě, 1 = Pokročilý, 2 = Původní, 3 = Elitní / Pán).
 */
function renderVariantAccents(type: string, variantIndex: number = 2, variantName?: string) {
  // Normalize type
  let normType = type;
  if (type === "bila_pani") normType = "bila";
  if (type === "ohnivy_muz") normType = "ohnivy";
  if (type === "certik") normType = "rarasek";

  if (variantName) {
    const vn = variantName.toLowerCase();
    if (
      vn.includes("hrobník") ||
      vn.includes("hrobnik") ||
      vn.includes("kostnický") ||
      vn.includes("hřbitovní bubák")
    )
      normType = "hrobnik";
    else if (
      vn.includes("šenkýřský") ||
      vn.includes("hospodský čert") ||
      vn.includes("karbanický") ||
      vn.includes("rohatý kníže") ||
      (type === "cert" && vn.includes("čertík"))
    )
      normType = "cert";
    else if (
      vn.includes("hastrman") ||
      vn.includes("blatouchový") ||
      vn.includes("potoční") ||
      vn.includes("jezerní")
    )
      normType = "hastrman";
    else if (
      vn.includes("vodník") ||
      vn.includes("vodnik") ||
      vn.includes("vodníček") ||
      vn.includes("tůňový") ||
      vn.includes("hlubin")
    )
      normType = "vodnik";
    else if (vn.includes("rarášek") || vn.includes("rarasek") || vn.includes("čertík"))
      normType = "rarasek";
  }

  const isTier0 = variantIndex === 0;
  const isTier1 = variantIndex === 1;
  const isTier2 = variantIndex === 2;
  const isTier3 = variantIndex === 3;

  return (
    <svg
      viewBox="0 0 120 120"
      className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
    >
      {/* BUBAK VARIANTS */}
      {normType === "bubak" && (
        <g>
          {isTier0 && (
            <g id="acc-bubak-0">
              {/* Herbal healing bandage on ear tuft */}
              <rect
                x="34"
                y="30"
                width="15"
                height="6"
                rx="2"
                fill="#eedcb0"
                stroke="#1c1308"
                strokeWidth="1.6"
                transform="rotate(-20 41 33)"
              />
              <line
                x1="41"
                y1="30"
                x2="41"
                y2="36"
                stroke="#c4321d"
                strokeWidth="1.2"
                transform="rotate(-20 41 33)"
              />
              {/* Cute curious blush */}
              <circle cx="60" cy="48" r="3" fill="#ffd438" opacity="0.6" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-bubak-1">
              {/* Red folk neckerchief knotted around fur */}
              <path
                d="M48 80 Q60 88 72 80 L60 94 Z"
                fill="#c4321d"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="60" cy="83" r="2" fill="#ffd438" />
              {/* Extra protruding straw whiskers */}
              <line
                x1="22"
                y1="44"
                x2="10"
                y2="38"
                stroke="#d69818"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="98"
                y1="44"
                x2="110"
                y2="40"
                stroke="#d69818"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          )}
          {isTier2 && (
            <g id="acc-bubak-2">
              {/* Gentle tobacco puff from clay pipe */}
              <circle
                cx="76"
                cy="74"
                r="3"
                fill="#ffffff"
                opacity="0.75"
                stroke="#1c1308"
                strokeWidth="1"
              />
              <circle
                cx="82"
                cy="69"
                r="4.5"
                fill="#ffffff"
                opacity="0.55"
                stroke="#1c1308"
                strokeWidth="1"
              />
            </g>
          )}
          {isTier3 && (
            <g id="acc-bubak-3">
              {/* Black raven feathers crest & fierce crimson eye aura */}
              <path
                d="M42 22 L40 6 L48 18 L56 4 L60 18 L68 4 L74 18 L80 6 L78 22"
                fill="#1c1308"
                stroke="#ffd438"
                strokeWidth="1.5"
              />
              <circle
                cx="46"
                cy="54"
                r="16"
                fill="none"
                stroke="#e63e1e"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              <circle
                cx="74"
                cy="54"
                r="16"
                fill="none"
                stroke="#e63e1e"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              {/* Iron capped prongs on pitchfork */}
              <polygon
                points="106,32 108,22 112,32"
                fill="#8f99a3"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <polygon
                points="112,42 118,36 116,46"
                fill="#8f99a3"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
            </g>
          )}
        </g>
      )}

      {/* RARASEK / CERTIK VARIANTS */}
      {normType === "rarasek" && (
        <g>
          {isTier0 && (
            <g id="acc-rarasek-0">
              {/* Bandaged left horn from chimney fall */}
              <rect
                x="41.5"
                y="7.5"
                width="8.5"
                height="5.5"
                rx="1.5"
                fill="#fffdf7"
                stroke="#1c1308"
                strokeWidth="1.3"
                transform="rotate(-4 45.5 10)"
              />
              <line
                x1="45.5"
                y1="7.5"
                x2="45.5"
                y2="13"
                stroke="#c4321d"
                strokeWidth="1"
                transform="rotate(-4 45.5 10)"
              />
              <ellipse cx="60" cy="48" rx="3.5" ry="2" fill="#54361e" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-rarasek-1">
              {/* Red ribbon bow tied to tail */}
              <circle cx="28" cy="48" r="4" fill="#c4321d" stroke="#1c1308" strokeWidth="1.5" />
              <path
                d="M24 44 L20 40 M32 44 L36 40"
                stroke="#c4321d"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <ellipse cx="60" cy="30" rx="4" ry="2" fill="#1c1308" opacity="0.5" />
            </g>
          )}
          {isTier2 && (
            <g id="acc-rarasek-2">
              <circle cx="70" cy="24" r="1.5" fill="#ffd438" />
            </g>
          )}
          {isTier3 && (
            <g id="acc-rarasek-3">
              {/* Golden horn ring & burning horn tips */}
              <ellipse
                cx="45"
                cy="7"
                rx="3.5"
                ry="2"
                fill="none"
                stroke="#ffd438"
                strokeWidth="2"
                transform="rotate(-15 45 7)"
              />
              <path
                d="M43 0 Q38 -7 43 -11 Q48 -7 44 0 Z"
                fill="#e63e1e"
                stroke="#ffd438"
                strokeWidth="1.2"
              />
              <path
                d="M77 0 Q72 -7 77 -11 Q82 -7 78 0 Z"
                fill="#e63e1e"
                stroke="#ffd438"
                strokeWidth="1.2"
              />
              <circle cx="36" cy="12" r="2" fill="#ffd438" />
              <circle cx="86" cy="12" r="2" fill="#ffd438" />
              <path d="M46 62 Q60 70 74 62" fill="none" stroke="#ffd438" strokeWidth="2" />
            </g>
          )}
        </g>
      )}

      {/* CERT (HOSPODSKY CERT) VARIANTS */}
      {normType === "cert" && (
        <g>
          {isTier0 && (
            <g id="acc-cert-0">
              {/* Blue checkered tavern apron */}
              <path
                d="M44 60 L42 88 L78 88 L76 60 Z"
                fill="#3a5a82"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <line
                x1="52"
                y1="60"
                x2="52"
                y2="88"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />
              <line
                x1="68"
                y1="60"
                x2="68"
                y2="88"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />
            </g>
          )}
          {isTier1 && (
            <g id="acc-cert-1">
              {/* Ace of hearts card behind right ear/horn */}
              <rect
                x="76"
                y="14"
                width="11"
                height="16"
                rx="2"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="1.8"
                transform="rotate(18 80 22)"
              />
              <circle cx="81" cy="22" r="2.2" fill="#c4321d" />
              <polygon points="81,19 78,24 84,24" fill="#c42c17" />
            </g>
          )}
          {isTier2 && (
            <g id="acc-cert-2">
              <circle cx="102" cy="62" r="2.5" fill="#ffffff" />
            </g>
          )}
          {isTier3 && (
            <g id="acc-cert-3">
              {/* Infernal golden spiked crown & double ruby rings on vertical horns */}
              <polygon
                points="48,18 53,6 60,13 67,6 72,18"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <circle cx="60" cy="14" r="2" fill="#c4321d" />
              <ellipse
                cx="85"
                cy="8"
                rx="5"
                ry="2.6"
                fill="none"
                stroke="#ffd438"
                strokeWidth="2.5"
                transform="rotate(22 85 8)"
              />
              <circle cx="85" cy="8" r="2.2" fill="#e63e1e" />
              <ellipse
                cx="35"
                cy="8"
                rx="5"
                ry="2.6"
                fill="none"
                stroke="#ffd438"
                strokeWidth="2.5"
                transform="rotate(-22 35 8)"
              />
              <circle cx="35" cy="8" r="2.2" fill="#e63e1e" />
              <circle cx="52" cy="36" r="2" fill="#e63e1e" />
              <circle cx="68" cy="36" r="2" fill="#e63e1e" />
            </g>
          )}
        </g>
      )}

      {/* MRTVAK VARIANTS */}
      {normType === "mrtvak" && (
        <g>
          {isTier0 && (
            <g id="acc-mrtvak-0">
              {/* Blue meadow daisy in hat & sleepy eyes */}
              <circle cx="36" cy="18" r="3.5" fill="#58a4e0" stroke="#1c1308" strokeWidth="1.2" />
              <circle cx="36" cy="18" r="1.5" fill="#ffd438" />
              <path d="M50 40 Q53 44 56 40" stroke="#1c1308" strokeWidth="2" fill="none" />
              <path d="M64 38 Q67 42 70 38" stroke="#1c1308" strokeWidth="2" fill="none" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-mrtvak-1">
              {/* Toadstool amanita growing from hat brim */}
              <ellipse
                cx="78"
                cy="20"
                rx="6"
                ry="4"
                fill="#c4321d"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="76" cy="19" r="1.2" fill="#ffffff" />
              <circle cx="80" cy="19" r="1" fill="#ffffff" />
              <rect
                x="76.5"
                y="24"
                width="3"
                height="4"
                fill="#f4ebd0"
                stroke="#1c1308"
                strokeWidth="1"
              />
            </g>
          )}
          {isTier2 && <g id="acc-mrtvak-2" />}
          {isTier3 && (
            <g id="acc-mrtvak-3">
              {/* Ancient tombstone fragment strapped to back + spectral eyes */}
              <rect
                x="18"
                y="52"
                width="14"
                height="22"
                rx="3"
                fill="#3c4738"
                stroke="#1c1308"
                strokeWidth="2"
                transform="rotate(-15 25 63)"
              />
              <line
                x1="22"
                y1="58"
                x2="28"
                y2="58"
                stroke="#69f0ae"
                strokeWidth="1.5"
                transform="rotate(-15 25 63)"
              />
              <circle cx="53" cy="39" r="4.5" fill="#69f0ae" opacity="0.65" />
              <circle cx="67" cy="36" r="4.5" fill="#69f0ae" opacity="0.65" />
            </g>
          )}
        </g>
      )}

      {/* KOSTLIVEC VARIANTS */}
      {normType === "kostlivec" && (
        <g>
          {isTier0 && (
            <g id="acc-kostlivec-0">
              {/* Blue polka dot kerchief */}
              <path
                d="M48 44 Q60 52 72 44 L66 40 L54 40 Z"
                fill="#2d6e9e"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="55" cy="45" r="1.5" fill="#ffffff" />
              <circle cx="65" cy="46" r="1.5" fill="#ffffff" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-kostlivec-1">
              {/* Ivy vines entwined through ribs */}
              <path
                d="M42 58 Q50 64 58 58 Q66 52 74 60"
                fill="none"
                stroke="#4a7c38"
                strokeWidth="2.5"
              />
              <circle cx="48" cy="61" r="2.5" fill="#6ba85b" />
              <circle cx="66" cy="55" r="2.5" fill="#6ba85b" />
            </g>
          )}
          {isTier2 && <g id="acc-kostlivec-2" />}
          {isTier3 && (
            <g id="acc-kostlivec-3">
              {/* Briar thorn crown & golden tooth */}
              <polygon
                points="46,14 50,6 54,12 60,4 66,12 70,6 74,14"
                fill="#8f734b"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <rect
                x="58"
                y="40"
                width="4.5"
                height="6"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="27" r="3" fill="#ffd438" />
              <circle cx="70" cy="27" r="3" fill="#ffd438" />
            </g>
          )}
        </g>
      )}

      {/* HELKAL VARIANTS */}
      {normType === "helkal" && (
        <g>
          {isTier0 && (
            <g id="acc-helkal-0">
              {/* Acorn cup cap */}
              <ellipse
                cx="60"
                cy="20"
                rx="14"
                ry="7"
                fill="#8c5828"
                stroke="#1c1308"
                strokeWidth="2.2"
              />
              <line
                x1="60"
                y1="13"
                x2="62"
                y2="8"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          )}
          {isTier1 && (
            <g id="acc-helkal-1">
              {/* Oak leaf garland */}
              <circle cx="40" cy="20" r="5" fill="#586e37" stroke="#1c1308" strokeWidth="1.5" />
              <circle cx="80" cy="20" r="5" fill="#586e37" stroke="#1c1308" strokeWidth="1.5" />
            </g>
          )}
          {isTier2 && <g id="acc-helkal-2" />}
          {isTier3 && (
            <g id="acc-helkal-3">
              {/* Sprawling oak branch antlers & sonic blast shockwaves */}
              <path
                d="M30 22 L14 8 L8 14 M14 8 L18 0"
                stroke="#54371e"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M90 22 L106 8 L112 14 M106 8 L102 0"
                stroke="#54371e"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M34 76 Q26 76 18 76"
                stroke="#ffd438"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M86 76 Q94 76 102 76"
                stroke="#ffd438"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="48" cy="46" r="3" fill="#e63e1e" />
              <circle cx="72" cy="46" r="3" fill="#e63e1e" />
            </g>
          )}
        </g>
      )}

      {/* UPIR VARIANTS */}
      {normType === "upir" && (
        <g>
          {isTier0 && (
            <g id="acc-upir-0">
              <path
                d="M26 48 Q20 40 14 46 Q20 54 26 50 Z"
                fill="#241a24"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
            </g>
          )}
          {isTier1 && <g id="acc-upir-1" />}
          {isTier2 && (
            <g id="acc-upir-2">
              {/* Ruby pendant & flying bat */}
              <polygon
                points="60,62 63,67 60,72 57,67"
                fill="#b82633"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path d="M22 28 Q26 24 30 28 Q26 32 22 28 Z" fill="#1c1308" />
            </g>
          )}
          {isTier3 && (
            <g id="acc-upir-3">
              {/* Silver vampire count coronet & gold cape brocade */}
              <polygon
                points="52,24 56,16 60,22 64,16 68,24"
                fill="#c0c8d0"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <line
                x1="32"
                y1="44"
                x2="42"
                y2="92"
                stroke="#ffd438"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              <line
                x1="88"
                y1="44"
                x2="78"
                y2="92"
                stroke="#ffd438"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              <circle cx="53" cy="38" r="4" fill="#b82633" opacity="0.6" />
              <circle cx="67" cy="38" r="4" fill="#b82633" opacity="0.6" />
            </g>
          )}
        </g>
      )}

      {/* VODNIK / HASTRMAN VARIANTS */}
      {(normType === "vodnik" || normType === "hastrman") && (
        <g>
          {isTier0 && (
            <g id="acc-vodnik-0">
              {/* Yellow marsh marigold (blatouch) & silver fish in pocket */}
              <circle cx="76" cy="18" r="6" fill="#ffd438" stroke="#1c1308" strokeWidth="2" />
              <circle cx="76" cy="18" r="2.5" fill="#f48222" />
              <ellipse
                cx="44"
                cy="74"
                rx="4.5"
                ry="2.5"
                fill="#9bb5cf"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <polygon points="40,74 37,71 37,77" fill="#9bb5cf" stroke="#1c1308" strokeWidth="1" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-vodnik-1">
              {/* Pocket watch ribbon dangling */}
              <line x1="74" y1="72" x2="74" y2="82" stroke="#ffd438" strokeWidth="2" />
              <circle cx="74" cy="84" r="3" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.5" />
            </g>
          )}
          {isTier2 && <g id="acc-vodnik-2" />}
          {isTier3 && (
            <g id="acc-vodnik-3">
              {/* Golden water-lily crown & jumping golden carp */}
              <polygon
                points="46,14 53,4 60,12 67,4 74,14"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="60" cy="12" r="2.5" fill="#58a4e0" />
              {/* Grand spinning royal smoke rings from water-goblin king's pipe */}
              <circle
                cx="98"
                cy="24"
                r="7"
                fill="none"
                stroke="#f0ebe1"
                strokeWidth="2.5"
                className="anim-lada-smoke-ring-1"
              />
              <circle
                cx="104"
                cy="14"
                r="9"
                fill="none"
                stroke="#f0ebe1"
                strokeWidth="3"
                className="anim-lada-smoke-ring-2"
              />
              <ellipse
                cx="20"
                cy="80"
                rx="6"
                ry="3.5"
                fill="#f48222"
                stroke="#1c1308"
                strokeWidth="1.5"
                transform="rotate(-30 20 80)"
              />
            </g>
          )}
        </g>
      )}

      {/* POLEDNICE VARIANTS */}
      {normType === "polednice" && (
        <g>
          {isTier0 && (
            <g id="acc-polednice-0">
              <ellipse
                cx="60"
                cy="38"
                rx="20"
                ry="20"
                fill="none"
                stroke="#f0ede6"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.75"
              />
            </g>
          )}
          {isTier1 && (
            <g id="acc-polednice-1">
              {/* Wheat ears in apron string */}
              <line
                x1="44"
                y1="62"
                x2="36"
                y2="46"
                stroke="#d4ad52"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <ellipse
                cx="35"
                cy="44"
                rx="3"
                ry="5"
                fill="#d4ad52"
                stroke="#1c1308"
                strokeWidth="1"
              />
            </g>
          )}
          {isTier2 && <g id="acc-polednice-2" />}
          {isTier3 && (
            <g id="acc-polednice-3">
              {/* Blazing sun rays & flaming sickle */}
              <circle
                cx="60"
                cy="38"
                r="26"
                fill="none"
                stroke="#f48222"
                strokeWidth="3"
                strokeDasharray="4,6"
              />
              <circle
                cx="60"
                cy="38"
                r="30"
                fill="none"
                stroke="#ffd438"
                strokeWidth="1.5"
                strokeDasharray="3,7"
              />
              <path d="M96 78 Q114 65 102 46" fill="none" stroke="#e63e1e" strokeWidth="3.5" />
              <circle cx="53" cy="36" r="2" fill="#ffd438" />
              <circle cx="67" cy="36" r="2" fill="#ffd438" />
            </g>
          )}
        </g>
      )}

      {/* KLEKANICE VARIANTS */}
      {normType === "klekanice" && (
        <g>
          {isTier0 && (
            <g id="acc-klekanice-0">
              <circle cx="60" cy="56" r="3" fill="#6d547d" stroke="#1c1308" strokeWidth="1.5" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-klekanice-1">
              <circle cx="44" cy="28" r="2" fill="#ffffff" />
              <circle cx="76" cy="28" r="2" fill="#ffffff" />
            </g>
          )}
          {isTier2 && <g id="acc-klekanice-2" />}
          {isTier3 && (
            <g id="acc-klekanice-3">
              {/* Golden constellation stars & basket lantern + perched raven */}
              <polygon
                points="50,20 51,23 54,23 52,25 53,28 50,26 47,28 48,25 46,23 49,23"
                fill="#ffd438"
              />
              <polygon
                points="70,20 71,23 74,23 72,25 73,28 70,26 67,28 68,25 66,23 69,23"
                fill="#ffd438"
              />
              <rect
                x="18"
                y="66"
                width="9"
                height="13"
                rx="2"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="85" cy="34" r="3" fill="#1c1308" />
              <polygon points="85,35 81,31 89,33" fill="#1c1308" />
            </g>
          )}
        </g>
      )}

      {/* BILA PANI VARIANTS */}
      {normType === "bila" && (
        <g>
          {isTier0 && (
            <g id="acc-bila-0">
              <path d="M54 28 Q60 32 66 28" stroke="#58a4e0" strokeWidth="3" fill="none" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-bila-1">
              <polygon
                points="52,28 56,20 60,26 64,20 68,28"
                fill="#c0c8d0"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
            </g>
          )}
          {isTier2 && <g id="acc-bila-2" />}
          {isTier3 && (
            <g id="acc-bila-3">
              {/* Golden queen coronet with ruby & starry astral gown */}
              <polygon
                points="46,28 53,18 60,26 67,18 74,28"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="60" cy="26" r="2" fill="#c4321d" />
              <circle cx="50" cy="74" r="2" fill="#ffd438" />
              <circle cx="70" cy="80" r="2" fill="#ffd438" />
              <circle cx="56" cy="94" r="2" fill="#ffd438" />
              <circle
                cx="82"
                cy="74"
                r="10"
                fill="none"
                stroke="#58a4e0"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
            </g>
          )}
        </g>
      )}

      {/* OHNIVY MUZ VARIANTS */}
      {normType === "ohnivy" && (
        <g>
          {isTier0 && (
            <g id="acc-ohnivy-0">
              <circle cx="44" cy="18" r="2.5" fill="#ffd438" />
              <circle cx="76" cy="14" r="2.5" fill="#f48222" />
              <circle cx="60" cy="4" r="2" fill="#ffd438" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-ohnivy-1">
              {/* Dark aromatic birch charcoal smoke plumes drifting upwards */}
              <circle
                cx="46"
                cy="4"
                r="5.5"
                fill="#3c2f2b"
                opacity="0.65"
                stroke="#1c1308"
                strokeWidth="1"
                className="anim-lada-smoke-1"
              />
              <circle
                cx="74"
                cy="2"
                r="6.8"
                fill="#3c2f2b"
                opacity="0.6"
                stroke="#1c1308"
                strokeWidth="1"
                className="anim-lada-smoke-2"
              />
              <circle
                cx="60"
                cy="-6"
                r="7.5"
                fill="#4d3b36"
                opacity="0.5"
                stroke="#1c1308"
                strokeWidth="1"
                className="anim-lada-smoke-3"
              />
            </g>
          )}
          {isTier2 && <g id="acc-ohnivy-2" />}
          {isTier3 && (
            <g id="acc-ohnivy-3">
              {/* Inferno flame crown & orbiting fireballs */}
              <path d="M42 8 L48 -4 L54 6" fill="#e63e1e" stroke="#1c1308" strokeWidth="2" />
              <path d="M54 4 L60 -10 L66 4" fill="#ffd438" stroke="#1c1308" strokeWidth="2" />
              <path d="M66 6 L72 -4 L78 8" fill="#e63e1e" stroke="#1c1308" strokeWidth="2" />
              <circle cx="28" cy="68" r="4.5" fill="#ffd438" stroke="#e63e1e" strokeWidth="1.5" />
              <circle cx="92" cy="58" r="4.5" fill="#ffd438" stroke="#e63e1e" strokeWidth="1.5" />
            </g>
          )}
        </g>
      )}

      {/* HROBNIK VARIANTS */}
      {normType === "hrobnik" && (
        <g>
          {isTier0 && (
            <g id="acc-hrobnik-0">
              {/* Clay pipe in mouth with rising smoke */}
              <line
                x1="66"
                y1="46"
                x2="76"
                y2="48"
                stroke="#d4ab74"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="75"
                y="44"
                width="5"
                height="7"
                rx="1.5"
                fill="#c94936"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle
                cx="79"
                cy="41"
                r="2.2"
                fill="#f0ebe1"
                stroke="#1c1308"
                strokeWidth="1"
                className="anim-lada-smoke-1"
              />
              <circle
                cx="83"
                cy="35"
                r="3.6"
                fill="#f0ebe1"
                stroke="#1c1308"
                strokeWidth="1.1"
                className="anim-lada-smoke-2"
              />
            </g>
          )}
          {isTier1 && (
            <g id="acc-hrobnik-1">
              {/* Black crow feather in hat brim */}
              <path
                d="M72 26 Q86 16 90 6 Q80 18 76 26 Z"
                fill="#1c1308"
                stroke="#ffd438"
                strokeWidth="1"
              />
            </g>
          )}
          {isTier2 && <g id="acc-hrobnik-2" />}
          {isTier3 && (
            <g id="acc-hrobnik-3">
              {/* Ossuary lantern & rolling graveyard mist */}
              <rect
                x="94"
                y="58"
                width="10"
                height="15"
                rx="2"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <line x1="99" y1="50" x2="99" y2="58" stroke="#1c1308" strokeWidth="2" />
              <ellipse cx="60" cy="110" rx="44" ry="6" fill="#8f99a3" opacity="0.4" />
              <circle cx="60" cy="68" r="4" fill="#f4ebd0" stroke="#1c1308" strokeWidth="1.5" />
            </g>
          )}
        </g>
      )}

      {/* PAVOUK VARIANTS */}
      {normType === "pavouk" && (
        <g>
          {isTier0 && (
            <g id="acc-pavouk-0">
              {/* Little baby bonnet with ribbon */}
              <ellipse
                cx="60"
                cy="36"
                rx="10"
                ry="5"
                fill="#fff8e8"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path d="M56 40 Q60 44 64 40" stroke="#c4321d" strokeWidth="1.5" fill="none" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-pavouk-1">
              {/* Red folk neckerchief */}
              <polygon
                points="52,56 68,56 60,65"
                fill="#c4321d"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="60" cy="56" r="2" fill="#ffd438" />
            </g>
          )}
          {isTier2 && (
            <g id="acc-pavouk-2">
              {/* Wooden spindle with spun golden thread */}
              <line
                x1="84"
                y1="52"
                x2="96"
                y2="72"
                stroke="#8a5a22"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <ellipse
                cx="90"
                cy="62"
                rx="4"
                ry="7"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="1.2"
                transform="rotate(30 90 62)"
              />
            </g>
          )}
          {isTier3 && (
            <g id="acc-pavouk-3">
              {/* Ancient dew-drop crown & glowing fangs */}
              <polygon
                points="48,32 54,20 60,28 66,20 72,32"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="54" cy="20" r="1.5" fill="#58a4e0" />
              <circle cx="66" cy="20" r="1.5" fill="#58a4e0" />
              <circle cx="60" cy="28" r="1.5" fill="#c4321d" />
              {/* Iron spikes on front legs */}
              <polygon points="10,68 4,64 8,74" fill="#a0aab4" stroke="#1c1308" strokeWidth="1" />
              <polygon
                points="110,68 116,64 112,74"
                fill="#a0aab4"
                stroke="#1c1308"
                strokeWidth="1"
              />
            </g>
          )}
        </g>
      )}

      {/* PEKELNE DUDY VARIANTS */}
      {normType === "pekelne_dudy" && (
        <g>
          {isTier0 && (
            <g id="acc-pekelne_dudy-0">
              {/* Small baby reed whistle with whistling note */}
              <rect
                x="58"
                y="58"
                width="4"
                height="9"
                rx="1"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="1"
              />
              <line x1="60" y1="54" x2="60" y2="58" stroke="#c4321d" strokeWidth="1.5" />
              <text
                x="64"
                y="52"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="0.8"
                fontSize="13"
                fontWeight="bold"
                className="anim-music-note-3"
              >
                ♪
              </text>
            </g>
          )}
          {isTier1 && (
            <g id="acc-pekelne_dudy-1">
              {/* Flowing folk ribbons from drone pipe & extra melodic notes */}
              <path
                d="M16 18 Q8 32 14 44"
                fill="none"
                stroke="#c4321d"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M14 18 Q22 30 18 42"
                fill="none"
                stroke="#2d6328"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <text
                x="22"
                y="16"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="0.8"
                fontSize="14"
                fontWeight="bold"
                className="anim-music-note-2"
              >
                ♫
              </text>
              <text
                x="96"
                y="74"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="0.8"
                fontSize="15"
                fontWeight="bold"
                className="anim-music-note-1"
              >
                ♪
              </text>
            </g>
          )}
          {isTier2 && (
            <g id="acc-pekelne_dudy-2">
              {/* Brass drone bands & extra dense demonic pipe smoke */}
              <rect
                x="26"
                y="32"
                width="7"
                height="4"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="1"
                transform="rotate(-35 26 32)"
              />
              <circle
                cx="16"
                cy="6"
                r="4.8"
                fill="#f0ede6"
                opacity="0.8"
                stroke="#1c1308"
                strokeWidth="1"
                className="anim-lada-smoke-left-1"
              />
              <circle
                cx="12"
                cy="0"
                r="6.2"
                fill="#f0ede6"
                opacity="0.65"
                stroke="#1c1308"
                strokeWidth="1"
                className="anim-lada-smoke-left-2"
              />
              {/* Rich folk notes dancing */}
              <text
                x="88"
                y="70"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="0.8"
                fontSize="15"
                fontWeight="bold"
                className="anim-music-note-1"
              >
                ♪
              </text>
              <text
                x="98"
                y="60"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="0.8"
                fontSize="16"
                fontWeight="bold"
                className="anim-music-note-2"
              >
                ♫
              </text>
              <text
                x="84"
                y="82"
                fill="#388e3c"
                stroke="#1c1308"
                strokeWidth="0.8"
                fontSize="14"
                fontWeight="bold"
                className="anim-music-note-3"
              >
                ♬
              </text>
            </g>
          )}
          {isTier3 && (
            <g id="acc-pekelne_dudy-3">
              {/* Golden horns & floating animated musical notes */}
              <circle cx="24" cy="22" r="2.5" fill="#c4321d" />
              <circle cx="76" cy="22" r="2.5" fill="#c4321d" />
              {/* Grand golden and folk ruby musical chords */}
              <g transform="translate(82, 36)">
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
              <g transform="translate(96, 24)">
                <text
                  x="0"
                  y="0"
                  fill="#e63e1e"
                  stroke="#1c1308"
                  strokeWidth="0.8"
                  fontSize="18"
                  fontWeight="bold"
                  className="anim-music-note-2"
                >
                  ♫
                </text>
              </g>
              <g transform="translate(10, 48)">
                <text
                  x="0"
                  y="0"
                  fill="#ffd438"
                  stroke="#1c1308"
                  strokeWidth="0.8"
                  fontSize="15"
                  fontWeight="bold"
                  className="anim-music-note-4"
                >
                  ♩
                </text>
              </g>
              <g transform="translate(88, 50)">
                <text
                  x="0"
                  y="0"
                  fill="#f4a124"
                  stroke="#1c1308"
                  strokeWidth="0.8"
                  fontSize="16"
                  fontWeight="bold"
                  className="anim-music-note-3"
                >
                  ♬
                </text>
              </g>
              <g transform="translate(104, 38)">
                <text
                  x="0"
                  y="0"
                  fill="#e63e1e"
                  stroke="#1c1308"
                  strokeWidth="0.8"
                  fontSize="15"
                  fontWeight="bold"
                  className="anim-music-note-1-delay"
                >
                  ♪
                </text>
              </g>
            </g>
          )}
        </g>
      )}

      {/* SVITICI OKO VARIANTS */}
      {normType === "svitici_oko" && (
        <g>
          {isTier0 && (
            <g id="acc-svitici_oko-0">
              {/* Blue cornflower petal resting atop */}
              <ellipse
                cx="48"
                cy="28"
                rx="4"
                ry="7"
                fill="#3b72b8"
                stroke="#1c1308"
                strokeWidth="1.2"
                transform="rotate(-25 48 28)"
              />
            </g>
          )}
          {isTier1 && (
            <g id="acc-svitici_oko-1">
              {/* Ring of greenish swamp fire */}
              <circle
                cx="60"
                cy="58"
                r="40"
                fill="none"
                stroke="#5cb85c"
                strokeWidth="2"
                strokeDasharray="5,6"
                opacity="0.85"
              />
              <circle cx="20" cy="68" r="2.5" fill="#7ed321" />
              <circle cx="100" cy="50" r="2.5" fill="#7ed321" />
            </g>
          )}
          {isTier2 && (
            <g id="acc-svitici_oko-2">
              {/* Ancient mossy stone arch runes */}
              <path
                d="M22 62 Q20 30 60 22 Q100 30 98 62"
                fill="none"
                stroke="#7a8274"
                strokeWidth="3.5"
                strokeDasharray="8,5"
                opacity="0.7"
              />
            </g>
          )}
          {isTier3 && (
            <g id="acc-svitici_oko-3">
              {/* Sunburst eyebeams & orbiting fiery orbs */}
              <line
                x1="60"
                y1="14"
                x2="60"
                y2="4"
                stroke="#ffd438"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="30"
                y1="26"
                x2="22"
                y2="18"
                stroke="#ffd438"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="90"
                y1="26"
                x2="98"
                y2="18"
                stroke="#ffd438"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="14" cy="58" r="5" fill="#ffd438" stroke="#e63e1e" strokeWidth="2" />
              <circle cx="106" cy="58" r="5" fill="#ffd438" stroke="#e63e1e" strokeWidth="2" />
              <circle cx="60" cy="114" r="4.5" fill="#ffd438" stroke="#e63e1e" strokeWidth="1.8" />
            </g>
          )}
        </g>
      )}

      {/* NETOPYR VARIANTS */}
      {normType === "netopyr" && (
        <g>
          {isTier0 && (
            <g id="acc-netopyr-0">
              {/* Little nightcap with pompom */}
              <path
                d="M48 34 Q36 20 28 26 Q40 32 46 36 Z"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="28" cy="26" r="3" fill="#ffffff" stroke="#1c1308" strokeWidth="1" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-netopyr-1">
              {/* Silver crescent moon on green neck ribbon */}
              <line x1="52" y1="56" x2="68" y2="56" stroke="#2d6328" strokeWidth="2" />
              <path
                d="M62 58 Q58 64 62 70 Q56 64 62 58 Z"
                fill="#e0e8f0"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
            </g>
          )}
          {isTier2 && (
            <g id="acc-netopyr-2">
              {/* Little moth in claws & wind dashes */}
              <ellipse
                cx="60"
                cy="94"
                rx="4"
                ry="2.5"
                fill="#e8dcc8"
                stroke="#1c1308"
                strokeWidth="1"
              />
              <path
                d="M12 28 Q24 22 20 16"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                opacity="0.6"
                strokeLinecap="round"
              />
              <path
                d="M108 28 Q96 22 100 16"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                opacity="0.6"
                strokeLinecap="round"
              />
            </g>
          )}
          {isTier3 && (
            <g id="acc-netopyr-3">
              {/* Vampire collar with ruby & supersonic sound rings */}
              <polygon
                points="46,54 38,40 50,48"
                fill="#801818"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <polygon
                points="74,54 82,40 70,48"
                fill="#801818"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="60" cy="54" r="2.5" fill="#c4321d" stroke="#ffd438" strokeWidth="1.2" />
              <path
                d="M50 36 Q42 32 38 24"
                fill="none"
                stroke="#ffd438"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M70 36 Q78 32 82 24"
                fill="none"
                stroke="#ffd438"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      )}

      {/* CERTOVA BABICKA VARIANTS */}
      {normType === "certova_babicka" && (
        <g>
          {isTier0 && (
            <g id="acc-certova_babicka-0">
              {/* Wooden gingerbread heart cookie in apron pocket */}
              <path
                d="M70 82 Q68 78 72 76 Q76 78 74 82 L72 85 Z"
                fill="#8a4818"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <circle cx="72" cy="79" r="0.8" fill="#ffffff" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-certova_babicka-1">
              {/* Ball of red yarn with knitting needles */}
              <circle cx="48" cy="80" r="4.5" fill="#c4321d" stroke="#1c1308" strokeWidth="1.5" />
              <line
                x1="42"
                y1="74"
                x2="54"
                y2="86"
                stroke="#d49b38"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="42"
                y1="86"
                x2="54"
                y2="74"
                stroke="#d49b38"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          )}
          {isTier2 && (
            <g id="acc-certova_babicka-2">
              {/* Bubbling copper kettle of soup hanging from belt with steam */}
              <rect
                x="80"
                y="74"
                width="14"
                height="12"
                rx="3"
                fill="#b85c32"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <ellipse
                cx="87"
                cy="74"
                rx="7"
                ry="2.5"
                fill="#5cb85c"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              {/* Steam puff */}
              <circle cx="85" cy="68" r="2.5" fill="#f0ede6" opacity="0.8" />
              <circle cx="88" cy="63" r="3" fill="#f0ede6" opacity="0.6" />
            </g>
          )}
          {isTier3 && (
            <g id="acc-certova_babicka-3">
              {/* Golden grandmother's queen crown & golden ladle glow */}
              <polygon
                points="46,18 53,8 60,16 67,8 74,18"
                fill="#ffd438"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <circle cx="60" cy="14" r="2" fill="#c4321d" />
              <circle
                cx="15"
                cy="90"
                r="9"
                fill="none"
                stroke="#ffd438"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              <circle cx="60" cy="110" rx="38" ry="7" fill="#e68a19" opacity="0.3" />
            </g>
          )}
        </g>
      )}

      {/* LOUPEZNIK VARIANTS */}
      {normType === "loupeznik" && (
        <g>
          {isTier0 && (
            <g id="acc-loupeznik-0">
              {/* Hat slipping down over eye & patched cloth */}
              <rect
                x="52"
                y="24"
                width="8"
                height="6"
                rx="1"
                fill="#eedcb0"
                stroke="#1c1308"
                strokeWidth="1.2"
                transform="rotate(10 56 27)"
              />
              <line x1="56" y1="23" x2="56" y2="31" stroke="#c4321d" strokeWidth="1" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-loupeznik-1">
              {/* Bright Pheasant feather in robber hat */}
              <path
                d="M68 24 Q78 12 86 16 Q78 22 72 27 Z"
                fill="#c4321d"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <line x1="70" y1="26" x2="84" y2="15" stroke="#ffd438" strokeWidth="1.2" />
            </g>
          )}
          {isTier2 && (
            <g id="acc-loupeznik-2">
              {/* Clay robber pipe in beard with rising smoke clouds */}
              <line
                x1="64"
                y1="48"
                x2="75"
                y2="51"
                stroke="#d4ab74"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <rect
                x="73"
                y="47"
                width="5"
                height="7"
                rx="1.5"
                fill="#8a5a22"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle
                cx="76"
                cy="43"
                r="2.5"
                fill="#ffffff"
                opacity="0.8"
                stroke="#1c1308"
                strokeWidth="0.8"
                className="anim-lada-smoke-1"
              />
              <circle
                cx="80"
                cy="37"
                r="3.8"
                fill="#ffffff"
                opacity="0.7"
                stroke="#1c1308"
                strokeWidth="0.8"
                className="anim-lada-smoke-2"
              />
              {/* Heavy iron ring on gnarled club */}
              <ellipse
                cx="88"
                cy="62"
                rx="4"
                ry="2"
                fill="#e0e0e0"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
            </g>
          )}
          {isTier3 && (
            <g id="acc-loupeznik-3">
              {/* Golden Ataman earring in ear */}
              <circle cx="43" cy="38" r="3" fill="none" stroke="#ffd438" strokeWidth="2" />
              {/* Heavy forged iron spikes & rings on the massive oak club */}
              <polygon
                points="107,17 114,13 111,21"
                fill="#787a7d"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <polygon
                points="113,32 121,30 115,38"
                fill="#787a7d"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <polygon
                points="98,12 101,4 93,10"
                fill="#787a7d"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              {/* Stolen silver pocket watch chain on belt */}
              <path
                d="M42 74 Q50 82 58 74"
                fill="none"
                stroke="#ffd438"
                strokeWidth="2"
                strokeDasharray="2,2"
              />
              <circle cx="58" cy="75" r="3.5" fill="#e0e8f0" stroke="#1c1308" strokeWidth="1.5" />
            </g>
          )}
        </g>
      )}

      {/* LUPIC VARIANTS */}
      {normType === "lupic" && (
        <g>
          {isTier0 && (
            <g id="acc-lupic-0">
              {/* Straw piece behind hat band & little copper coin pouch */}
              <line
                x1="68"
                y1="28"
                x2="78"
                y2="18"
                stroke="#d69818"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="43" cy="74" r="3" fill="#804d20" stroke="#1c1308" strokeWidth="1.2" />
            </g>
          )}
          {isTier1 && (
            <g id="acc-lupic-1">
              {/* Peacock feather on hat */}
              <path
                d="M66 24 Q76 10 82 14 Q74 20 69 26 Z"
                fill="#207a68"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="78" cy="14" r="2.5" fill="#ffd438" stroke="#1c1308" strokeWidth="1" />
              {/* Lucky bone die on cord */}
              <rect
                x="74"
                y="73"
                width="4.5"
                height="4.5"
                rx="1"
                fill="#fffdf5"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
            </g>
          )}
          {isTier2 && (
            <g id="acc-lupic-2">
              {/* Engraved brass bands on trumpet muzzles */}
              <line x1="12" y1="54" x2="12" y2="64" stroke="#ffd438" strokeWidth="2" />
              <line x1="108" y1="54" x2="108" y2="64" stroke="#ffd438" strokeWidth="2" />
              {/* Stolen silver ring on finger */}
              <circle cx="41" cy="65" r="4.5" fill="none" stroke="#e0e8f0" strokeWidth="1.5" />
            </g>
          )}
          {isTier3 && (
            <g id="acc-lupic-3">
              {/* Fiery muzzle flash sparks at the bell muzzles */}
              <circle cx="4" cy="59" r="2.5" fill="#ffd438" stroke="#e63e1e" strokeWidth="1.5" />
              <line
                x1="2"
                y1="53"
                x2="-4"
                y2="49"
                stroke="#ffd438"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="2"
                y1="65"
                x2="-4"
                y2="69"
                stroke="#ffd438"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="116" cy="59" r="2.5" fill="#ffd438" stroke="#e63e1e" strokeWidth="1.5" />
              <line
                x1="118"
                y1="53"
                x2="124"
                y2="49"
                stroke="#ffd438"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="118"
                y1="65"
                x2="124"
                y2="69"
                stroke="#ffd438"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Red cockade plume on hat */}
              <polygon points="56,6 64,0 62,8" fill="#c4321d" stroke="#1c1308" strokeWidth="1.2" />
              {/* Cross-chest leather bandolier with copper cartridges */}
              <line x1="42" y1="49" x2="76" y2="76" stroke="#24170e" strokeWidth="3" />
              <rect
                x="48"
                y="54"
                width="2.5"
                height="5"
                rx="0.5"
                fill="#d49b38"
                stroke="#1c1308"
                strokeWidth="0.8"
                transform="rotate(-40 49 56)"
              />
              <rect
                x="56"
                y="60"
                width="2.5"
                height="5"
                rx="0.5"
                fill="#d49b38"
                stroke="#1c1308"
                strokeWidth="0.8"
                transform="rotate(-40 57 62)"
              />
              <rect
                x="64"
                y="66"
                width="2.5"
                height="5"
                rx="0.5"
                fill="#d49b38"
                stroke="#1c1308"
                strokeWidth="0.8"
                transform="rotate(-40 65 68)"
              />
            </g>
          )}
        </g>
      )}
    </svg>
  );
}
