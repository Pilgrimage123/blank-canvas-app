import React from "react";

export type LadaIconName =
  | "attack"
  | "block"
  | "dodge"
  | "fatigue"
  | "salt"
  | "draw"
  | "coin"
  | "action"
  | "hp"
  | "death"
  | "star"
  | "hit"
  | "target"
  | "surrender"
  | "reset"
  | "arrow_right"
  | "back"
  | "close"
  | "check"
  | "cross_mark"
  | "hand"
  | "search"
  | "info"
  | "warning"
  | "omen"
  | "buff"
  | "speed"
  | "freeze"
  | "fear"
  | "stink"
  | "soup"
  | "fog"
  | "village"
  | "field"
  | "forest"
  | "pond"
  | "castle"
  | "cemetery"
  | "darkness"
  | "ghost"
  | "water"
  | "devil"
  | "hunter"
  | "beer"
  | "bread"
  | "herb"
  | "cross"
  | "book"
  | "scroll"
  | "school"
  | "film"
  | "flask"
  | "download"
  | "settings"
  | "bell"
  | "leaf"
  | "trophy"
  | "party"
  | "theater"
  | "picture"
  | "egg"
  | "frog"
  | "mushroom"
  | "cat"
  | "paw"
  | "owl"
  | "bat"
  | "fish"
  | "sunflower"
  | "goat"
  | "duck"
  | "squirrel"
  | "hare"
  | "candle"
  | "pot"
  | "flag"
  | "fire"
  | "raven"
  | "lizard"
  | "mouse"
  | "vortex"
  | "totem"
  | "danger"
  | "broom"
  | "balance"
  | "hat"
  | "fairy"
  | "hourglass"
  | "compass"
  | "idea"
  | "wink"
  | "breath"
  | "calendar"
  | "sun"
  | "moon"
  | "feather"
  | "sparkle"
  | "trash";

export interface LadaIconProps {
  name: LadaIconName | string;
  size?: number | string;
  className?: string;
  animated?: boolean;
  title?: string;
  style?: React.CSSProperties;
}

export function normalizeIconName(name: string): LadaIconName {
  const n = (name || "").trim().toLowerCase();
  if (
    n === "⚔️" ||
    n === "⚔" ||
    n.includes("attack") ||
    n.includes("sword") ||
    n.includes("vyrezavana") ||
    n.includes("zasah")
  )
    return "attack";
  if (
    n === "🛡️" ||
    n === "🛡" ||
    n.includes("block") ||
    n.includes("shield") ||
    n.includes("obrana")
  )
    return "block";
  if (
    n === "💨" ||
    n.includes("dodge") ||
    n.includes("wind") ||
    n.includes("uhyb") ||
    n.includes("retreat")
  )
    return "dodge";
  if (
    n === "😴" ||
    n.includes("fatigue") ||
    n.includes("sleep") ||
    n.includes("unava") ||
    n.includes("spánek")
  )
    return "fatigue";
  if (n === "🧂" || n.includes("salt") || n.includes("sul")) return "salt";
  if (
    n === "🃏" ||
    n.includes("draw") ||
    n.includes("card") ||
    n.includes("trick") ||
    n.includes("balicek")
  )
    return "draw";
  if (n === "🪙" || n.includes("coin") || n.includes("krejcar")) return "coin";
  if (n === "🌱" || n.includes("action") || n.includes("seed") || n.includes("akce"))
    return "action";
  if (n === "❤️" || n === "❤" || n.includes("hp") || n.includes("heart") || n.includes("zivot"))
    return "hp";
  if (n === "💀" || n.includes("death") || n.includes("skull") || n.includes("smrt"))
    return "death";
  if (n === "⭐" || n === "★" || n === "✨" || n === "🌟" || n.includes("star")) return "star";
  if (n === "💥" || n.includes("hit") || n.includes("pop") || n.includes("bac")) return "hit";
  if (n === "🎯" || n.includes("target") || n.includes("cil")) return "target";
  if (n === "🏳️" || n === "🏳" || n.includes("surrender") || n.includes("vzdani"))
    return "surrender";
  if (n === "🔄" || n.includes("reset") || n.includes("refresh")) return "reset";
  if (n === "➔" || n === "➡️" || n === "▶️" || n === "▶" || n.includes("arrow_right"))
    return "arrow_right";
  if (n === "🔙" || n === "⬅️" || n === "⬅" || n.includes("back")) return "back";
  if (n === "✕" || n === "✖" || n === "x" || n.includes("close") || n.includes("cancel"))
    return "close";
  if (n === "✓" || n.includes("check")) return "check";
  if (n === "✗" || n.includes("cross_mark")) return "cross_mark";
  if (n === "✋" || n === "🖐️" || n === "🖐" || n.includes("hand")) return "hand";
  if (n === "🔍" || n.includes("search") || n.includes("inspect")) return "search";
  if (n === "ℹ️" || n === "ℹ" || n.includes("info")) return "info";
  if (n === "⚠️" || n === "⚠" || n.includes("warn")) return "warning";
  if (n === "😤" || n.includes("omen") || n.includes("threat") || n.includes("predtucha"))
    return "omen";
  if (n === "📣" || n.includes("buff") || n.includes("shout") || n.includes("podpora"))
    return "buff";
  if (n === "⚡" || n.includes("speed") || n.includes("lightning") || n.includes("rychlost"))
    return "speed";
  if (n === "🧊" || n.includes("freeze") || n.includes("ice") || n.includes("mraz"))
    return "freeze";
  if (n === "😱" || n.includes("fear") || n.includes("strach")) return "fear";
  if (n === "🦨" || n.includes("stink") || n.includes("stench") || n.includes("smrad"))
    return "stink";
  if (n === "🍲" || n.includes("soup") || n.includes("potion") || n.includes("kotlik"))
    return "soup";
  if (n === "🌫️" || n === "🌫" || n.includes("fog") || n.includes("mist") || n.includes("mlha"))
    return "fog";
  if (n === "🏡" || n.includes("village") || n.includes("vesnice") || n.includes("chalup"))
    return "village";
  if (n === "🌾" || n.includes("field") || n.includes("pole") || n.includes("snop")) return "field";
  if (n === "🌲" || n.includes("forest") || n.includes("les") || n.includes("strom"))
    return "forest";
  if (n === "🌊" || n.includes("pond") || n.includes("rybnik")) return "pond";
  if (n === "🏰" || n.includes("castle") || n.includes("zricenina") || n.includes("hrad"))
    return "castle";
  if (n === "🪦" || n.includes("cemetery") || n.includes("hrbitov")) return "cemetery";
  if (n === "🌑" || n.includes("darkness") || n.includes("boss") || n.includes("tun"))
    return "darkness";
  if (n === "👻" || n.includes("ghost") || n.includes("strasidl")) return "ghost";
  if (n === "💧" || n.includes("water") || n.includes("voda")) return "water";
  if (n === "😈" || n.includes("devil") || n.includes("peklo") || n.includes("cert"))
    return "devil";
  if (n === "🏹" || n.includes("hunter") || n.includes("lovci") || n.includes("luk"))
    return "hunter";
  if (n === "🍺" || n.includes("beer") || n.includes("senk") || n.includes("pivo")) return "beer";
  if (n === "🍞" || n.includes("bread") || n.includes("chleb")) return "bread";
  if (n === "🌿" || n.includes("herb") || n.includes("odvar") || n.includes("bylin")) return "herb";
  if (n === "✝️" || n === "✝" || n.includes("cross") || n.includes("pozehnani")) return "cross";
  if (
    n === "📖" ||
    n === "📚" ||
    n.includes("book") ||
    n.includes("kniha") ||
    n.includes("pravidla")
  )
    return "book";
  if (
    n === "📜" ||
    n.includes("scroll") ||
    n.includes("log") ||
    n.includes("zaznam") ||
    n.includes("kronika")
  )
    return "scroll";
  if (
    n === "🎓" ||
    n.includes("school") ||
    n.includes("priest") ||
    n.includes("farar") ||
    n.includes("vycvik")
  )
    return "school";
  if (n === "🎬" || n.includes("film") || n.includes("video")) return "film";
  if (n === "🧪" || n.includes("flask") || n.includes("test") || n.includes("zkusebna"))
    return "flask";
  if (n === "📥" || n.includes("download") || n.includes("basket") || n.includes("stahnout"))
    return "download";
  if (
    n === "⚙️" ||
    n === "⚙" ||
    n.includes("settings") ||
    n.includes("options") ||
    n.includes("volby")
  )
    return "settings";
  if (n === "🔔" || n.includes("bell") || n.includes("zvonec")) return "bell";
  if (n === "🍂" || n.includes("leaf") || n.includes("list")) return "leaf";
  if (n === "🏆" || n.includes("trophy") || n.includes("vitezstvi")) return "trophy";
  if (n === "👥" || n.includes("party") || n.includes("heroes") || n.includes("hrdinove"))
    return "party";
  if (n === "🎭" || n.includes("theater") || n.includes("divadlo")) return "theater";
  if (n === "🖼️" || n === "🖼" || n.includes("picture") || n.includes("obraz")) return "picture";
  if (n === "🥚" || n.includes("egg") || n.includes("kraslice")) return "egg";
  if (n === "🐸" || n.includes("frog") || n.includes("zaba")) return "frog";
  if (n === "🍄" || n.includes("mushroom") || n.includes("houba") || n.includes("muchomurka"))
    return "mushroom";
  if (n === "🐱" || n.includes("cat") || n.includes("kocour") || n.includes("mikes")) return "cat";
  if (n === "🐾" || n.includes("paw") || n.includes("tlapka")) return "paw";
  if (n === "🦉" || n.includes("owl") || n.includes("sova")) return "owl";
  if (n === "🦇" || n.includes("bat") || n.includes("netopyr")) return "bat";
  if (n === "🐟" || n.includes("fish") || n.includes("ryba") || n.includes("pstruh")) return "fish";
  if (n === "🌻" || n.includes("sunflower") || n.includes("slunecnice")) return "sunflower";
  if (n === "🐐" || n.includes("goat") || n.includes("koza") || n.includes("kozel")) return "goat";
  if (n === "🦆" || n === "🪿" || n.includes("duck") || n.includes("kachna") || n.includes("husa"))
    return "duck";
  if (n === "🐿️" || n === "🐿" || n.includes("squirrel") || n.includes("veverka")) return "squirrel";
  if (n === "🐇" || n.includes("hare") || n.includes("zajic")) return "hare";
  if (n === "🕯️" || n === "🕯" || n.includes("candle") || n.includes("svice")) return "candle";
  if (n === "🏺" || n.includes("pot") || n.includes("urn") || n.includes("hrnecek")) return "pot";
  if (n === "🚩" || n.includes("flag") || n.includes("prapor")) return "flag";
  if (n === "🔥" || n.includes("fire") || n.includes("ohen") || n.includes("louc")) return "fire";
  if (n === "🦅" || n.includes("raven") || n.includes("havran") || n.includes("krkavec"))
    return "raven";
  if (n === "🦎" || n.includes("lizard") || n.includes("jesterka")) return "lizard";
  if (n === "🐁" || n.includes("mouse") || n.includes("mys")) return "mouse";
  if (n === "🌀" || n.includes("vortex") || n.includes("vir")) return "vortex";
  if (n === "🗿" || n.includes("totem") || n.includes("buzek")) return "totem";
  if (n === "☠️" || n === "☠" || n.includes("danger") || n.includes("pozor")) return "danger";
  if (n === "🧹" || n.includes("broom") || n.includes("koste")) return "broom";
  if (n === "⚖️" || n === "⚖" || n.includes("balance") || n.includes("vahy")) return "balance";
  if (n === "🎩" || n.includes("hat") || n.includes("cylindr")) return "hat";
  if (n === "🧚" || n.includes("fairy") || n.includes("vila") || n.includes("bludicka"))
    return "fairy";
  if (n === "⏳" || n.includes("hourglass") || n.includes("presypaci")) return "hourglass";
  if (n === "🧭" || n.includes("compass") || n.includes("kompas")) return "compass";
  if (n === "💡" || n.includes("idea") || n.includes("napad")) return "idea";
  if (n === "😉" || n.includes("wink") || n.includes("mrknuti")) return "wink";
  if (n === "😮‍💨" || n.includes("breath") || n.includes("nadech")) return "breath";
  if (n === "🗓️" || n === "🗓" || n.includes("calendar") || n.includes("datum")) return "calendar";
  if (n === "☀️" || n === "☀" || n.includes("sun") || n.includes("slunce")) return "sun";
  if (n === "🌙" || n.includes("moon") || n.includes("mesic")) return "moon";
  if (n === "🪶" || n.includes("feather") || n.includes("pirko")) return "feather";
  if (n === "🗑️" || n === "🗑" || n.includes("trash") || n.includes("odstranit")) return "trash";
  return "star";
}

export const LadaThematicIcon: React.FC<LadaIconProps> = ({
  name,
  size = 20,
  className = "",
  animated = true,
  title,
  style,
}) => {
  const norm = normalizeIconName(name);

  const renderIconContent = (icon: LadaIconName) => {
    switch (icon) {
      /* COMBAT & STATS */
      case "attack":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M5 25 L11 19 M8 22 L6 24"
                stroke="#1c1308"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M10 20 L24 6 Q27 3 26 8 L22 13 L17 17 Z"
                fill="#ebd9b5"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M14 15 L22 7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M9 17 L13 21" stroke="#c23318" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M4 26 L10 20 M7 23 L5 25"
                stroke="#1c1308"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M9 21 L23 7 Q28 4 27 9 L23 14 L18 18 Z"
                fill="#fdf3dc"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M13 16 L23 6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
              <path
                d="M25 4 L28 2 M28 6 L30 5"
                stroke="#f4c23c"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path d="M8 18 L12 22" stroke="#e63e1e" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          </>
        );

      case "block":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M7 6 Q16 4 25 6 Q26 18 16 27 Q6 18 7 6 Z"
                fill="#9e6634"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M11 8 Q16 6 21 8 Q22 17 16 23 Q10 17 11 8 Z"
                fill="#b87b46"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <path
                d="M16 7 L16 23 M8 13 Q16 11 24 13 M9 18 Q16 16 23 18"
                stroke="#1c1308"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <circle cx="16" cy="15" r="2.2" fill="#d69818" stroke="#1c1308" strokeWidth="1.2" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 7 Q16 4 26 7 Q27 19 16 28 Q5 19 6 7 Z"
                fill="#aa713c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M10 9 Q16 7 22 9 Q23 18 16 24 Q9 18 10 9 Z"
                fill="#c48750"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <path
                d="M16 8 L16 24 M7 14 Q16 12 25 14 M8 19 Q16 17 24 19"
                stroke="#1c1308"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <circle cx="16" cy="15" r="2.6" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.3" />
            </g>
          </>
        );

      case "dodge":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M4 14 Q13 10 17 13 Q21 16 18 20 Q15 22 13 18"
                fill="none"
                stroke="#72a4d4"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M10 20 Q19 18 23 20 Q27 22 25 25"
                fill="none"
                stroke="#72a4d4"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M19 8 Q25 6 27 11 Q22 14 19 8 Z"
                fill="#84bf60"
                stroke="#1c1308"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M21 9 L25 10" stroke="#2e6629" strokeWidth="1" strokeLinecap="round" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 13 Q15 8 19 11 Q23 14 20 18 Q17 20 15 16"
                fill="none"
                stroke="#528bc4"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M8 22 Q17 20 22 21 Q27 22 26 26"
                fill="none"
                stroke="#528bc4"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M20 7 Q27 6 28 12 Q23 15 20 7 Z"
                fill="#a4d878"
                stroke="#1c1308"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M22 8 L26 10" stroke="#2e6629" strokeWidth="1.1" strokeLinecap="round" />
            </g>
          </>
        );

      case "fatigue":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M6 22 C6 15 11 12 18 10 C21 9 24 13 22 17 C20 21 14 23 6 22 Z"
                fill="#1c4b7d"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <circle cx="24" cy="10" r="3.2" fill="#fff" stroke="#1c1308" strokeWidth="1.4" />
              <path d="M5 21 C5 24 16 25 20 22" fill="#ebd9b5" stroke="#1c1308" strokeWidth="1.6" />
              <text x="21" y="8" fontSize="8" fontWeight="bold" fill="#d69818" fontFamily="serif">
                z
              </text>
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 22 C6 15 12 11 19 9 C22 9 25 14 22 18 C20 22 14 23 6 22 Z"
                fill="#25588f"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <circle cx="25" cy="9" r="3.4" fill="#fff9ed" stroke="#1c1308" strokeWidth="1.4" />
              <path d="M5 21 C5 24 16 25 20 22" fill="#ebd9b5" stroke="#1c1308" strokeWidth="1.6" />
              <text x="23" y="7" fontSize="9" fontWeight="black" fill="#f4c23c" fontFamily="serif">
                Z
              </text>
            </g>
          </>
        );

      case "salt":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M10 26 L22 26 L21 15 L11 15 Z"
                fill="#9e6634"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 15 L23 15 L20 11 L12 11 Z"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.6"
              />
              <path
                d="M14 11 L14 7 L18 7 L18 11"
                fill="#d69818"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <path
                d="M13 18 L19 18 M16 16 L16 22"
                stroke="#ebd9b5"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="24" cy="18" r="1.3" fill="#fff" stroke="#1c1308" strokeWidth="0.8" />
              <circle cx="26" cy="22" r="1.1" fill="#fff" stroke="#1c1308" strokeWidth="0.8" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M10 26 L22 26 L21 15 L11 15 Z"
                fill="#b0743e"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 15 L23 15 L20 11 L12 11 Z"
                fill="#6d4522"
                stroke="#1c1308"
                strokeWidth="1.6"
              />
              <path
                d="M14 11 L14 7 L18 7 L18 11"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <path
                d="M13 18 L19 18 M16 16 L16 22"
                stroke="#fff8ea"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="23" cy="15" r="1.2" fill="#fff" stroke="#1c1308" strokeWidth="0.8" />
              <circle cx="26" cy="19" r="1.4" fill="#fff" stroke="#1c1308" strokeWidth="0.8" />
              <circle cx="24" cy="24" r="1" fill="#fff" stroke="#1c1308" strokeWidth="0.8" />
            </g>
          </>
        );

      case "draw":
        return (
          <>
            <g className="lada-icon-f1">
              <rect
                x="7"
                y="5"
                width="16"
                height="22"
                rx="2.5"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M12 9 Q15 6 18 9 Q17 13 15 15 Q13 13 12 9 Z"
                fill="#2e6629"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <circle cx="15" cy="18" r="2.2" fill="#9e6634" stroke="#1c1308" strokeWidth="1.1" />
              <path
                d="M9 8 L10 8 M20 24 L21 24"
                stroke="#c23318"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <rect
                x="8"
                y="4"
                width="16"
                height="22"
                rx="2.5"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="1.8"
                transform="rotate(3 16 15)"
              />
              <path
                d="M12 9 Q15 6 18 9 Q17 13 15 15 Q13 13 12 9 Z"
                fill="#3a7e34"
                stroke="#1c1308"
                strokeWidth="1.2"
                transform="rotate(3 15 11)"
              />
              <circle
                cx="15"
                cy="18"
                r="2.4"
                fill="#b3753c"
                stroke="#1c1308"
                strokeWidth="1.1"
                transform="rotate(3 15 18)"
              />
            </g>
          </>
        );

      case "coin":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="11" fill="#d69818" stroke="#1c1308" strokeWidth="2" />
              <circle
                cx="16"
                cy="16"
                r="8.5"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="1"
                strokeDasharray="2 1.5"
              />
              <path
                d="M14 12 L18 12 M16 12 L16 20 M14 20 L18 20"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="11" fill="#e0a324" stroke="#1c1308" strokeWidth="2" />
              <circle
                cx="16"
                cy="16"
                r="8.5"
                fill="#ffe066"
                stroke="#1c1308"
                strokeWidth="1"
                strokeDasharray="2 1.5"
              />
              <path
                d="M14 12 L18 12 M16 12 L16 20 M14 20 L18 20"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M11 11 L13 9" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          </>
        );

      case "action":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M16 26 C16 20 15 16 16 12"
                stroke="#2e6629"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M16 17 C12 15 9 11 12 8 C15 7 17 12 16 17 Z"
                fill="#84bf60"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path
                d="M16 14 C19 12 23 8 20 5 C17 4 15 9 16 14 Z"
                fill="#2e6629"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <ellipse
                cx="16"
                cy="27"
                rx="7"
                ry="2.2"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M16 26 C16 19 16 15 17 11"
                stroke="#2e6629"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M16 16 C11 14 8 10 11 7 C14 6 17 11 16 16 Z"
                fill="#9de072"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path
                d="M17 13 C20 11 24 7 21 4 C18 3 16 8 17 13 Z"
                fill="#387a32"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <ellipse
                cx="16"
                cy="27"
                rx="7"
                ry="2.2"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <circle cx="10" cy="7" r="1.1" fill="#fff" stroke="#1c1308" strokeWidth="0.6" />
            </g>
          </>
        );

      case "hp":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M16 27 C8 21 4 14 4 9 C4 5 7 3 11 3 C14 3 16 6 16 7 C16 6 18 3 21 3 C25 3 28 5 28 9 C28 14 24 21 16 27 Z"
                fill="#c23318"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M7 9 C7 7 9 5 11 5"
                stroke="#ffece4"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="16" cy="14" r="1.5" fill="#fff" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M16 28 C7.5 22 3.5 14.5 3.5 9 C3.5 4.8 6.8 2.8 11 2.8 C14 2.8 16 5.8 16 6.8 C16 5.8 18 2.8 21 2.8 C25.2 2.8 28.5 4.8 28.5 9 C28.5 14.5 24.5 22 16 28 Z"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M7 8 C7 6 9 4.8 11.5 4.8"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="16" cy="14" r="1.8" fill="#fff" />
            </g>
          </>
        );

      case "death":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M8 15 C8 7 13 4 16 4 C19 4 24 7 24 15 C24 19 22 22 20 22 L20 26 L12 26 L12 22 C10 22 8 19 8 15 Z"
                fill="#ebd9b5"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="14" r="2.3" fill="#1c1308" />
              <circle cx="20" cy="14" r="2.3" fill="#1c1308" />
              <path
                d="M14 24 L14 26 M16 23 L16 26 M18 24 L18 26"
                stroke="#1c1308"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M8 15 C8 7 13 4 16 4 C19 4 24 7 24 15 C24 19 22 22 20 22 L20 26 L12 26 L12 22 C10 22 8 19 8 15 Z"
                fill="#fdf3dc"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="14" r="2.5" fill="#c23318" />
              <circle cx="20" cy="14" r="2.5" fill="#c23318" />
              <path
                d="M14 24 L14 26 M16 23 L16 26 M18 24 L18 26"
                stroke="#1c1308"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "star":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M16 2 L19 12 L29 13 L21 19 L24 29 L16 23 L8 29 L11 19 L3 13 L13 12 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="16" r="3" fill="#fff3c9" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M16 1 L19.5 11.5 L30 12.5 L21.5 19 L25 30 L16 23.5 L7 30 L10.5 19 L2 12.5 L12.5 11.5 Z"
                fill="#ffd95c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="16" r="3.6" fill="#ffffff" />
            </g>
          </>
        );

      case "hit":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M16 3 L20 10 L28 8 L24 15 L30 20 L22 22 L22 30 L16 24 L10 30 L10 22 L2 20 L8 15 L4 8 L12 10 Z"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="16" r="4.5" fill="#ffd95c" stroke="#1c1308" strokeWidth="1.2" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M16 2 L21 9 L29 6 L25 14 L31 19 L23 21 L23 29 L16 23 L9 29 L9 21 L1 19 L7 14 L3 6 L11 9 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="16" r="5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
            </g>
          </>
        );

      /* CONTROLS & UTILITY */
      case "target":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="12" fill="#ebd9b5" stroke="#1c1308" strokeWidth="2" />
              <circle cx="16" cy="16" r="8" fill="#c23318" stroke="#1c1308" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="3.5" fill="#fff8ea" stroke="#1c1308" strokeWidth="1.2" />
              <path
                d="M16 2 L16 8 M16 24 L16 30 M2 16 L8 16 M24 16 L30 16"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="12" fill="#fdf3dc" stroke="#1c1308" strokeWidth="2" />
              <circle cx="16" cy="16" r="8" fill="#e63e1e" stroke="#1c1308" strokeWidth="1.6" />
              <circle cx="16" cy="16" r="3.8" fill="#ffffff" stroke="#1c1308" strokeWidth="1.3" />
              <path
                d="M16 1 L16 7 M16 25 L16 31 M1 16 L7 16 M25 16 L31 16"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "surrender":
        return (
          <>
            <g className="lada-icon-f1">
              <path d="M7 4 L7 28" stroke="#5e3b1c" strokeWidth="2.4" strokeLinecap="round" />
              <path
                d="M7 6 Q16 4 23 8 Q17 13 23 18 Q15 16 7 18 Z"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="4" r="1.8" fill="#d69818" stroke="#1c1308" strokeWidth="1" />
            </g>
            <g className="lada-icon-f2">
              <path d="M7 4 L7 28" stroke="#5e3b1c" strokeWidth="2.4" strokeLinecap="round" />
              <path
                d="M7 6 Q15 8 24 6 Q17 11 24 16 Q16 18 7 18 Z"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="4" r="1.8" fill="#f4c23c" stroke="#1c1308" strokeWidth="1" />
            </g>
          </>
        );

      case "reset":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M8 16 A8 8 0 1 1 16 24 L16 27"
                fill="none"
                stroke="#2e6629"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M12 24 L16 28 L20 24"
                fill="none"
                stroke="#2e6629"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M9 16 A8 8 0 1 1 17 24 L17 27"
                fill="none"
                stroke="#3d8736"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M13 24 L17 28 L21 24"
                fill="none"
                stroke="#3d8736"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "arrow_right":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M6 16 L23 16 M16 9 L24 16 L16 23"
                fill="none"
                stroke="#8c5614"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M7 16 L25 16 M17 8 L26 16 L17 24"
                fill="none"
                stroke="#a8691a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "back":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M26 16 L9 16 M16 9 L8 16 L16 23"
                fill="none"
                stroke="#8c5614"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M25 16 L7 16 M15 8 L6 16 L15 24"
                fill="none"
                stroke="#a8691a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "close":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M8 8 L24 24 M24 8 L8 24"
                stroke="#c23318"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M8 8 L24 24 M24 8 L8 24"
                stroke="#e63e1e"
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "check":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M6 16 L13 23 L26 8"
                fill="none"
                stroke="#2e6629"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 16 L13 23 L26 8"
                fill="none"
                stroke="#3d8736"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "cross_mark":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M7 7 L25 25 M25 7 L7 25"
                stroke="#942718"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M7 7 L25 25 M25 7 L7 25"
                stroke="#b8331d"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "hand":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M10 26 L10 14 C10 12 13 12 13 14 L13 11 C13 9 16 9 16 11 L16 10 C16 8 19 8 19 10 L19 13 C19 11 22 11 22 13 L22 18 C22 23 18 27 12 27 Z"
                fill="#9e6634"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M10 26 L10 14 C10 12 13 12 13 14 L13 11 C13 9 16 9 16 11 L16 10 C16 8 19 8 19 10 L19 13 C19 11 22 11 22 13 L22 18 C22 23 18 27 12 27 Z"
                fill="#b0743e"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
                transform="rotate(4 16 18)"
              />
            </g>
          </>
        );

      case "search":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="14" cy="14" r="8" fill="#e8f2fc" stroke="#1c1308" strokeWidth="2.2" />
              <path d="M20 20 L27 27" stroke="#5e3b1c" strokeWidth="3.4" strokeLinecap="round" />
              <path
                d="M11 11 Q14 8 17 11"
                fill="none"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="14" cy="14" r="8" fill="#ffffff" stroke="#1c1308" strokeWidth="2.2" />
              <path d="M20 20 L27 27" stroke="#724722" strokeWidth="3.4" strokeLinecap="round" />
              <path
                d="M11 11 Q14 8 17 11"
                fill="none"
                stroke="#72a4d4"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "info":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="12" fill="#1c4b7d" stroke="#1c1308" strokeWidth="2" />
              <circle cx="16" cy="10" r="1.8" fill="#fff" />
              <path
                d="M14 14 L17 14 L17 22 M14 22 L19 22"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="12" fill="#2b629e" stroke="#1c1308" strokeWidth="2" />
              <circle cx="16" cy="10" r="2" fill="#fff" />
              <path
                d="M14 14 L17 14 L17 22 M14 22 L19 22"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "warning":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M16 4 L28 26 L4 26 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M16 11 L16 18 M16 22 L16 23"
                stroke="#1c1308"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M16 4 L28 26 L4 26 Z"
                fill="#ffd95c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M16 11 L16 18 M16 22 L16 23"
                stroke="#c23318"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "omen":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="10" fill="#c23318" stroke="#1c1308" strokeWidth="2" />
              <path
                d="M11 13 L14 15 M21 13 L18 15"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13 20 Q16 17 19 20"
                fill="none"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M8 8 Q5 4 3 6 M24 8 Q27 4 29 6"
                fill="none"
                stroke="#ebd9b5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="10" fill="#e63e1e" stroke="#1c1308" strokeWidth="2" />
              <path
                d="M10 12 L14 15 M22 12 L18 15"
                stroke="#1c1308"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M12 21 Q16 17 20 21"
                fill="none"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8 7 Q5 3 2 5 M24 7 Q27 3 30 5"
                fill="none"
                stroke="#fff8ea"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "buff":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M6 18 L12 18 L22 25 L24 23 L18 16 L24 9 L22 7 L12 14 L6 14 Z"
                fill="#d69818"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="26" cy="16" r="2.5" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.2" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 18 L12 18 L22 25 L24 23 L18 16 L24 9 L22 7 L12 14 L6 14 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="27" cy="16" r="3" fill="#ffe066" stroke="#1c1308" strokeWidth="1.2" />
              <text x="24" y="11" fontSize="7" fontWeight="bold" fill="#1c1308">
                ♪
              </text>
            </g>
          </>
        );

      case "speed":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M18 2 L7 17 L15 17 L12 30 L25 13 L17 13 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M18 2 L7 17 L15 17 L12 30 L25 13 L17 13 Z"
                fill="#ffe066"
                stroke="#1c1308"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M6 12 L3 12 M27 20 L24 20"
                stroke="#fff"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "freeze":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M5 6 L8 24 L11 6 L16 28 L21 6 L24 22 L27 6"
                fill="#72a4d4"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M5 6 L8 24 L11 6 L16 28 L21 6 L24 22 L27 6"
                fill="#9ec5ec"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="30" r="1.3" fill="#fff" stroke="#1c1308" strokeWidth="0.8" />
            </g>
          </>
        );

      case "fear":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="11" fill="#72a4d4" stroke="#1c1308" strokeWidth="2" />
              <circle cx="12" cy="13" r="3.2" fill="#fff" stroke="#1c1308" strokeWidth="1.2" />
              <circle cx="20" cy="13" r="3.2" fill="#fff" stroke="#1c1308" strokeWidth="1.2" />
              <circle cx="12" cy="13" r="1.3" fill="#1c1308" />
              <circle cx="20" cy="13" r="1.3" fill="#1c1308" />
              <ellipse cx="16" cy="21" rx="2.5" ry="3.5" fill="#1c1308" />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="11" fill="#8cb9e6" stroke="#1c1308" strokeWidth="2" />
              <circle cx="12" cy="13" r="3.5" fill="#fff" stroke="#1c1308" strokeWidth="1.2" />
              <circle cx="20" cy="13" r="3.5" fill="#fff" stroke="#1c1308" strokeWidth="1.2" />
              <circle cx="12" cy="14" r="1.5" fill="#1c1308" />
              <circle cx="20" cy="14" r="1.5" fill="#1c1308" />
              <ellipse cx="16" cy="22" rx="3" ry="4" fill="#1c1308" />
            </g>
          </>
        );

      case "stink":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M9 25 Q13 19 11 13 Q9 7 13 4"
                fill="none"
                stroke="#2e6629"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M16 26 Q20 20 18 14 Q16 8 20 5"
                fill="none"
                stroke="#84bf60"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M23 25 Q27 19 25 13 Q23 7 27 4"
                fill="none"
                stroke="#2e6629"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M10 25 Q6 19 8 13 Q10 7 6 4"
                fill="none"
                stroke="#387a32"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M17 26 Q13 20 15 14 Q17 8 13 5"
                fill="none"
                stroke="#9de072"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M24 25 Q20 19 22 13 Q24 7 20 4"
                fill="none"
                stroke="#387a32"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "soup":
        return (
          <>
            <g className="lada-icon-f1">
              <path d="M6 14 C6 24 26 24 26 14 Z" fill="#3b2310" stroke="#1c1308" strokeWidth="2" />
              <ellipse
                cx="16"
                cy="14"
                rx="10"
                ry="2.5"
                fill="#84bf60"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path
                d="M10 23 L7 28 M22 23 L25 28 M16 24 L16 29"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13 10 Q14 7 13 4 M19 10 Q20 7 19 4"
                stroke="#ebd9b5"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path d="M6 14 C6 24 26 24 26 14 Z" fill="#3b2310" stroke="#1c1308" strokeWidth="2" />
              <ellipse
                cx="16"
                cy="14"
                rx="10"
                ry="2.5"
                fill="#9de072"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path
                d="M10 23 L7 28 M22 23 L25 28 M16 24 L16 29"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M14 9 Q13 6 14 3 M20 9 Q19 6 20 3"
                stroke="#fff8ea"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "fog":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M5 10 Q14 8 20 10 Q26 12 28 10"
                stroke="#72a4d4"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M4 16 Q10 14 16 16 Q22 18 28 16"
                stroke="#9ec5ec"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M6 22 Q12 20 18 22 Q24 24 27 22"
                stroke="#72a4d4"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 11 Q15 9 21 11 Q27 13 27 11"
                stroke="#8cb9e6"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M3 17 Q9 15 15 17 Q21 19 29 17"
                stroke="#b4d6f8"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M5 23 Q11 21 17 23 Q23 25 28 23"
                stroke="#8cb9e6"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      /* LOCATIONS & BESTIARY */
      case "village":
        return (
          <>
            <g className="lada-icon-f1">
              <rect
                x="7"
                y="14"
                width="18"
                height="13"
                fill="#f6eedb"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M5 15 L16 5 L27 15 Z"
                fill="#c23318"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect
                x="20"
                y="6"
                width="3"
                height="5"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <path d="M21 4 Q23 2 21 0" stroke="#ebd9b5" strokeWidth="1.2" strokeLinecap="round" />
              <rect
                x="13"
                y="19"
                width="6"
                height="8"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <rect
                x="9"
                y="17"
                width="3"
                height="3"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="1"
              />
            </g>
            <g className="lada-icon-f2">
              <rect
                x="7"
                y="14"
                width="18"
                height="13"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M5 15 L16 5 L27 15 Z"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect
                x="20"
                y="6"
                width="3"
                height="5"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <path
                d="M22 3 Q20 1 22 -1"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <rect
                x="13"
                y="19"
                width="6"
                height="8"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <rect
                x="9"
                y="17"
                width="3"
                height="3"
                fill="#ffe066"
                stroke="#1c1308"
                strokeWidth="1"
              />
            </g>
          </>
        );

      case "field":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M12 28 Q14 18 8 7 M16 28 L16 6 M20 28 Q18 18 24 7"
                stroke="#d69818"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M8 8 L7 6 M16 7 L16 4 M24 8 L25 6"
                stroke="#d69818"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="11"
                y="17"
                width="10"
                height="3.5"
                rx="1.5"
                fill="#c23318"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M12 28 Q15 17 9 6 M16 28 L17 5 M20 28 Q17 17 25 6"
                stroke="#f4c23c"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M9 7 L8 5 M17 6 L17 3 M25 7 L26 5"
                stroke="#f4c23c"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <rect
                x="11"
                y="17"
                width="10"
                height="3.5"
                rx="1.5"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
            </g>
          </>
        );

      case "forest":
        return (
          <>
            <g className="lada-icon-f1">
              <rect
                x="14"
                y="24"
                width="4"
                height="5"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <path
                d="M16 4 L9 13 L12 13 L7 20 L11 20 L6 26 L26 26 L21 20 L25 20 L20 13 L23 13 Z"
                fill="#2e6629"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <rect
                x="14"
                y="24"
                width="4"
                height="5"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <path
                d="M16 4 L9 13 L12 13 L7 20 L11 20 L6 26 L26 26 L21 20 L25 20 L20 13 L23 13 Z"
                fill="#3a7e34"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M16 6 L13 12 L19 12 Z M16 14 L10 19 L22 19 Z" fill="#fff" opacity="0.7" />
            </g>
          </>
        );

      case "pond":
      case "water":
        return (
          <>
            <g className="lada-icon-f1">
              <ellipse
                cx="16"
                cy="18"
                rx="12"
                ry="7"
                fill="#1c4b7d"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <ellipse
                cx="14"
                cy="17"
                rx="5"
                ry="2.5"
                fill="#84bf60"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <circle cx="15" cy="16" r="1.8" fill="#fff" />
              <path
                d="M5 24 Q16 20 27 24"
                stroke="#72a4d4"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <ellipse
                cx="16"
                cy="18"
                rx="12"
                ry="7"
                fill="#24588f"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <ellipse
                cx="14"
                cy="17"
                rx="5"
                ry="2.5"
                fill="#9de072"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <circle cx="15" cy="16" r="2" fill="#fff" />
              <path
                d="M6 23 Q16 27 26 23"
                stroke="#9ec5ec"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "castle":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M6 26 L6 13 L9 13 L9 15 L12 15 L12 13 L15 13 L15 26 Z"
                fill="#9e8a74"
                stroke="#1c1308"
                strokeWidth="1.6"
              />
              <path
                d="M15 26 L15 9 L18 9 L18 11 L21 11 L21 9 L24 9 L24 26 Z"
                fill="#b09d87"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <rect x="18" y="16" width="3" height="5" rx="1.5" fill="#1c1308" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 26 L6 13 L9 13 L9 15 L12 15 L12 13 L15 13 L15 26 Z"
                fill="#aba08a"
                stroke="#1c1308"
                strokeWidth="1.6"
              />
              <path
                d="M15 26 L15 9 L18 9 L18 11 L21 11 L21 9 L24 9 L24 26 Z"
                fill="#c2af98"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <rect x="18" y="16" width="3" height="5" rx="1.5" fill="#1c1308" />
              <path d="M21 9 L21 4 L26 6 Z" fill="#c23318" stroke="#1c1308" strokeWidth="1" />
            </g>
          </>
        );

      case "cemetery":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M10 26 L10 13 C10 9 22 9 22 13 L22 26 Z"
                fill="#8c7860"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M16 13 L16 21 M13 16 L19 16"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <ellipse cx="16" cy="26" rx="9" ry="2" fill="#2e6629" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M10 26 L10 13 C10 9 22 9 22 13 L22 26 Z"
                fill="#9e8971"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M16 13 L16 21 M13 16 L19 16"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <ellipse cx="16" cy="26" rx="9" ry="2" fill="#3a7e34" />
              <circle cx="23" cy="11" r="1.5" fill="#72a4d4" opacity="0.8" />
            </g>
          </>
        );

      case "darkness":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="11" fill="#1c2738" stroke="#1c1308" strokeWidth="2" />
              <path
                d="M14 8 C18 9 21 14 20 19 C15 22 10 19 9 16 C9 12 11 9 14 8 Z"
                fill="#f4c23c"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="11" fill="#263449" stroke="#1c1308" strokeWidth="2" />
              <path
                d="M14 8 C18 9 21 14 20 19 C15 22 10 19 9 16 C9 12 11 9 14 8 Z"
                fill="#ffe066"
              />
              <circle cx="22" cy="10" r="1.1" fill="#fff" />
            </g>
          </>
        );

      case "ghost":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M9 25 C7 17 8 7 16 7 C24 7 25 17 23 25 C21 23 19 26 16 24 C13 26 11 23 9 25 Z"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="13" cy="13" r="1.8" fill="#1c1308" />
              <circle cx="19" cy="13" r="1.8" fill="#1c1308" />
              <ellipse cx="16" cy="17" rx="1.5" ry="2.2" fill="#1c1308" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M10 25 C8 17 9 7 17 7 C25 7 26 17 24 25 C22 23 20 26 17 24 C14 26 12 23 10 25 Z"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="14" cy="13" r="1.8" fill="#1c1308" />
              <circle cx="20" cy="13" r="1.8" fill="#1c1308" />
              <ellipse cx="17" cy="18" rx="2" ry="2.6" fill="#1c1308" />
            </g>
          </>
        );

      case "devil":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="9" fill="#1c1308" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M10 10 L8 4 L12 8 M22 10 L24 4 L20 8"
                fill="#1c1308"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="13" cy="15" r="1.6" fill="#f4c23c" />
              <circle cx="19" cy="15" r="1.6" fill="#f4c23c" />
              <path
                d="M16 18 Q16 23 19 22"
                stroke="#c23318"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="9" fill="#2b1c10" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M10 10 L7 4 L12 8 M22 10 L25 4 L20 8"
                fill="#2b1c10"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="13" cy="15" r="1.8" fill="#ffe066" />
              <circle cx="19" cy="15" r="1.8" fill="#ffe066" />
              <path
                d="M16 18 Q15 24 19 23"
                stroke="#e63e1e"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "hunter":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M10 6 C18 10 18 22 10 26"
                fill="none"
                stroke="#5e3b1c"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path d="M10 6 L10 26" stroke="#ebd9b5" strokeWidth="1.2" strokeDasharray="1 1" />
              <path
                d="M8 16 L24 16 M20 13 L25 16 L20 19"
                fill="none"
                stroke="#2e6629"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M11 6 C19 10 19 22 11 26"
                fill="none"
                stroke="#724722"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path d="M11 6 L11 26" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="1 1" />
              <path
                d="M9 16 L25 16 M21 13 L26 16 L21 19"
                fill="none"
                stroke="#3a7e34"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      /* STORY & ITEMS */
      case "beer":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M9 12 L9 26 Q9 28 12 28 L19 28 Q22 28 22 26 L22 12 Z"
                fill="#d69818"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M22 15 Q27 15 27 19 Q27 23 22 23"
                fill="none"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <ellipse
                cx="15.5"
                cy="11"
                rx="7.5"
                ry="3.5"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="13" cy="8" r="2.2" fill="#fff" stroke="#1c1308" strokeWidth="1" />
              <circle cx="17" cy="8" r="2.5" fill="#fff" stroke="#1c1308" strokeWidth="1" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M9 12 L9 26 Q9 28 12 28 L19 28 Q22 28 22 26 L22 12 Z"
                fill="#e0a324"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M22 15 Q27 15 27 19 Q27 23 22 23"
                fill="none"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <ellipse
                cx="15.5"
                cy="11"
                rx="7.5"
                ry="3.5"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="7" r="2.4" fill="#fff" stroke="#1c1308" strokeWidth="1" />
              <circle cx="16" cy="7" r="2.7" fill="#fff" stroke="#1c1308" strokeWidth="1" />
              <circle cx="20" cy="8" r="2" fill="#fff" stroke="#1c1308" strokeWidth="1" />
            </g>
          </>
        );

      case "bread":
        return (
          <>
            <g className="lada-icon-f1">
              <ellipse
                cx="16"
                cy="18"
                rx="11"
                ry="8"
                fill="#b0743e"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <path
                d="M9 17 Q16 13 23 17 M16 11 L16 23"
                stroke="#5e3b1c"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <ellipse
                cx="16"
                cy="18"
                rx="11"
                ry="8"
                fill="#c4844c"
                stroke="#1c1308"
                strokeWidth="2"
              />
              <path
                d="M9 17 Q16 13 23 17 M16 11 L16 23"
                stroke="#fff8ea"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "herb":
        return (
          <>
            <g className="lada-icon-f1">
              <path d="M16 27 L16 11" stroke="#2e6629" strokeWidth="2.2" strokeLinecap="round" />
              <path
                d="M16 20 C11 18 8 13 11 10 C14 9 17 14 16 20 Z"
                fill="#84bf60"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <path
                d="M16 16 C21 14 24 9 21 6 C18 5 15 10 16 16 Z"
                fill="#2e6629"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <circle cx="16" cy="8" r="2" fill="#f4c23c" stroke="#1c1308" strokeWidth="1" />
            </g>
            <g className="lada-icon-f2">
              <path d="M16 27 L17 10" stroke="#2e6629" strokeWidth="2.2" strokeLinecap="round" />
              <path
                d="M16 19 C10 17 7 12 10 9 C13 8 17 13 16 19 Z"
                fill="#9de072"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <path
                d="M17 15 C22 13 25 8 22 5 C19 4 16 9 17 15 Z"
                fill="#3a7e34"
                stroke="#1c1308"
                strokeWidth="1.4"
              />
              <circle cx="17" cy="7" r="2.2" fill="#ffe066" stroke="#1c1308" strokeWidth="1" />
            </g>
          </>
        );

      case "cross":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M14 4 L18 4 L18 10 L25 10 L25 14 L18 14 L18 28 L14 28 L14 14 L7 14 L7 10 L14 10 Z"
                fill="#9e6634"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="12" r="1.5" fill="#f4c23c" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M14 4 L18 4 L18 10 L25 10 L25 14 L18 14 L18 28 L14 28 L14 14 L7 14 L7 10 L14 10 Z"
                fill="#b0743e"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="12" r="1.8" fill="#ffe066" />
            </g>
          </>
        );

      case "book":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M6 7 L16 9 L26 7 L26 23 L16 25 L6 23 Z"
                fill="#5e3b1c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M16 9 L16 25" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M7 8 L15 10 L15 23 L7 22 Z M17 10 L25 8 L25 22 L17 23 Z"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <path d="M16 11 L16 28" stroke="#c23318" strokeWidth="2.2" strokeLinecap="round" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 7 L16 9 L26 7 L26 23 L16 25 L6 23 Z"
                fill="#724722"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M16 9 L16 25" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M7 8 L15 10 L15 23 L7 22 Z M17 10 L25 8 L25 22 L17 23 Z"
                fill="#ffffff"
                stroke="#1c1308"
                strokeWidth="1.2"
              />
              <path
                d="M16 11 Q18 24 19 28"
                stroke="#e63e1e"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "scroll":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M8 8 C8 5 11 5 14 7 L24 7 C26 7 27 9 25 11 L23 23 C22 25 19 25 16 23 L8 23 Z"
                fill="#ebd9b5"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="18" r="2.5" fill="#c23318" stroke="#1c1308" strokeWidth="1" />
              <path
                d="M10 11 L18 11 M10 14 L14 14"
                stroke="#5e3b1c"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M8 8 C8 5 11 5 14 7 L24 7 C26 7 27 9 25 11 L23 23 C22 25 19 25 16 23 L8 23 Z"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="18" r="2.8" fill="#e63e1e" stroke="#1c1308" strokeWidth="1.1" />
              <path
                d="M10 11 L18 11 M10 14 L14 14"
                stroke="#5e3b1c"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "school":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M4 12 L16 6 L28 12 L16 18 Z"
                fill="#1c1308"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M10 15 L10 22 C10 24 22 24 22 22 L22 15"
                fill="#1c4b7d"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path d="M23 13 L25 21" stroke="#f4c23c" strokeWidth="1.8" strokeLinecap="round" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M4 12 L16 6 L28 12 L16 18 Z"
                fill="#2b2318"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M10 15 L10 22 C10 24 22 24 22 22 L22 15"
                fill="#24588f"
                stroke="#1c1308"
                strokeWidth="1.5"
              />
              <path d="M23 13 L26 21" stroke="#ffe066" strokeWidth="2" strokeLinecap="round" />
            </g>
          </>
        );

      case "film":
        return (
          <>
            <g className="lada-icon-f1">
              <rect
                x="5"
                y="8"
                width="22"
                height="16"
                rx="2"
                fill="#1c1308"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <rect x="8" y="10" width="3" height="3" fill="#fff" />
              <rect x="14" y="10" width="3" height="3" fill="#fff" />
              <rect x="20" y="10" width="3" height="3" fill="#fff" />
              <rect x="8" y="19" width="3" height="3" fill="#fff" />
              <rect x="14" y="19" width="3" height="3" fill="#fff" />
              <rect x="20" y="19" width="3" height="3" fill="#fff" />
            </g>
            <g className="lada-icon-f2">
              <rect
                x="5"
                y="8"
                width="22"
                height="16"
                rx="2"
                fill="#2b2318"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <rect x="9" y="10" width="3" height="3" fill="#f4c23c" />
              <rect x="15" y="10" width="3" height="3" fill="#f4c23c" />
              <rect x="21" y="10" width="3" height="3" fill="#f4c23c" />
              <rect x="9" y="19" width="3" height="3" fill="#f4c23c" />
              <rect x="15" y="19" width="3" height="3" fill="#f4c23c" />
              <rect x="21" y="19" width="3" height="3" fill="#f4c23c" />
            </g>
          </>
        );

      case "flask":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M13 5 L19 5 M14 5 L14 11 L7 24 C5 27 8 28 12 28 L20 28 C24 28 27 27 25 24 L18 11 L18 5"
                fill="#72a4d4"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M8 23 Q16 20 24 23" fill="#1c4b7d" stroke="#1c1308" strokeWidth="1.2" />
              <circle cx="13" cy="22" r="1.3" fill="#fff" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M13 5 L19 5 M14 5 L14 11 L7 24 C5 27 8 28 12 28 L20 28 C24 28 27 27 25 24 L18 11 L18 5"
                fill="#8cb9e6"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M8 23 Q16 25 24 23" fill="#24588f" stroke="#1c1308" strokeWidth="1.2" />
              <circle cx="15" cy="19" r="1.5" fill="#fff" />
              <circle cx="18" cy="23" r="1.2" fill="#fff" />
            </g>
          </>
        );

      case "download":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M6 18 L6 26 L26 26 L26 18"
                fill="none"
                stroke="#5e3b1c"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 5 L16 19 M10 13 L16 19 L22 13"
                fill="none"
                stroke="#c23318"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M6 18 L6 26 L26 26 L26 18"
                fill="none"
                stroke="#724722"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 6 L16 20 M10 14 L16 20 L22 14"
                fill="none"
                stroke="#e63e1e"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        );

      case "settings":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="6" fill="#d69818" stroke="#1c1308" strokeWidth="2" />
              <circle cx="16" cy="16" r="2.5" fill="#fff8ea" stroke="#1c1308" strokeWidth="1.2" />
              <path
                d="M16 6 L16 8 M16 24 L16 26 M6 16 L8 16 M24 16 L26 16 M9 9 L11 11 M21 21 L23 23 M9 23 L11 21 M21 9 L23 11"
                stroke="#1c1308"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="6" fill="#f4c23c" stroke="#1c1308" strokeWidth="2" />
              <circle cx="16" cy="16" r="2.5" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
              <path
                d="M16 5 L16 8 M16 24 L16 27 M5 16 L8 16 M24 16 L27 16 M8 8 L11 11 M21 21 L24 24 M8 24 L11 21 M21 8 L24 11"
                stroke="#1c1308"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "bell":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M16 5 C11 5 9 10 9 18 L7 22 L25 22 L23 18 C23 10 21 5 16 5 Z"
                fill="#d69818"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="24" r="2.2" fill="#5e3b1c" stroke="#1c1308" strokeWidth="1.2" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M16 5 C11 5 9 10 9 18 L7 22 L25 22 L23 18 C23 10 21 5 16 5 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
                transform="rotate(5 16 5)"
              />
              <circle cx="18" cy="24" r="2.4" fill="#5e3b1c" stroke="#1c1308" strokeWidth="1.2" />
            </g>
          </>
        );

      case "leaf":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M7 25 Q13 22 17 17 C23 10 25 4 25 4 C25 4 19 6 12 12 Q7 17 7 25 Z"
                fill="#d69818"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M9 23 L22 8" stroke="#1c1308" strokeWidth="1.2" strokeLinecap="round" />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M7 25 Q13 22 17 17 C23 10 25 4 25 4 C25 4 19 6 12 12 Q7 17 7 25 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M9 23 L22 8" stroke="#5e3b1c" strokeWidth="1.3" strokeLinecap="round" />
            </g>
          </>
        );

      case "trash":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M9 10 L10 25 Q10 27 12 27 L20 27 Q22 27 22 25 L23 10 Z"
                fill="#c23318"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M7 10 L25 10 M13 7 L19 7"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13 14 L13 23 M16 14 L16 23 M19 14 L19 23"
                stroke="#fff8ea"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M9 10 L10 25 Q10 27 12 27 L20 27 Q22 27 22 25 L23 10 Z"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M6 9 L26 9 M13 6 L19 6"
                stroke="#1c1308"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M13 14 L13 23 M16 14 L16 23 M19 14 L19 23"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "sun":
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="6" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M16 4 L16 7 M16 25 L16 28 M4 16 L7 16 M25 16 L28 16 M7 7 L9 9 M23 23 L25 25 M7 25 L9 23 M23 9 L25 7"
                stroke="#d69818"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="6.5" fill="#ffe066" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M16 3 L16 7 M16 25 L16 29 M3 16 L7 16 M25 16 L29 16 M6 6 L9 9 M23 23 L26 26 M6 26 L9 23 M23 9 L26 6"
                stroke="#f4c23c"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "moon":
        return (
          <>
            <g className="lada-icon-f1">
              <path
                d="M12 6 C17 7 21 12 20 18 C15 22 9 19 8 16 C8 11 10 7 12 6 Z"
                fill="#f4c23c"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </g>
            <g className="lada-icon-f2">
              <path
                d="M12 6 C17 7 21 12 20 18 C15 22 9 19 8 16 C8 11 10 7 12 6 Z"
                fill="#ffe066"
                stroke="#1c1308"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="23" cy="9" r="1.2" fill="#fff" />
            </g>
          </>
        );

      case "cat":
      case "paw":
        return (
          <>
            <g className="lada-icon-f1">
              <ellipse cx="16" cy="18" rx="5.5" ry="4.5" fill="#1c1308" />
              <circle cx="10" cy="12" r="2.2" fill="#1c1308" />
              <circle cx="14" cy="9.5" r="2.2" fill="#1c1308" />
              <circle cx="18" cy="9.5" r="2.2" fill="#1c1308" />
              <circle cx="22" cy="12" r="2.2" fill="#1c1308" />
            </g>
            <g className="lada-icon-f2">
              <ellipse cx="16" cy="18" rx="5.5" ry="4.5" fill="#3b2310" />
              <circle cx="10" cy="11.5" r="2.4" fill="#3b2310" />
              <circle cx="14" cy="9" r="2.4" fill="#3b2310" />
              <circle cx="18" cy="9" r="2.4" fill="#3b2310" />
              <circle cx="22" cy="11.5" r="2.4" fill="#3b2310" />
            </g>
          </>
        );

      case "frog":
        return (
          <>
            <g className="lada-icon-f1">
              <ellipse
                cx="16"
                cy="19"
                rx="8"
                ry="6"
                fill="#84bf60"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="12" r="3.2" fill="#84bf60" stroke="#1c1308" strokeWidth="1.6" />
              <circle cx="20" cy="12" r="3.2" fill="#84bf60" stroke="#1c1308" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="1.3" fill="#1c1308" />
              <circle cx="20" cy="12" r="1.3" fill="#1c1308" />
              <path
                d="M12 21 Q16 23 20 21"
                stroke="#1c1308"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </g>
            <g className="lada-icon-f2">
              <ellipse
                cx="16"
                cy="18"
                rx="8.5"
                ry="6.5"
                fill="#9de072"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="11" r="3.4" fill="#9de072" stroke="#1c1308" strokeWidth="1.6" />
              <circle cx="20" cy="11" r="3.4" fill="#9de072" stroke="#1c1308" strokeWidth="1.6" />
              <circle cx="12" cy="11" r="1.4" fill="#1c1308" />
              <circle cx="20" cy="11" r="1.4" fill="#1c1308" />
              <path
                d="M11 20 Q16 24 21 20"
                stroke="#1c1308"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </>
        );

      case "mushroom":
        return (
          <>
            <g className="lada-icon-f1">
              <rect
                x="13"
                y="16"
                width="6"
                height="10"
                rx="3"
                fill="#ebd9b5"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M6 17 C6 8 26 8 26 17 Z"
                fill="#c23318"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="11" cy="13" r="1.6" fill="#fff" />
              <circle cx="16" cy="10" r="1.8" fill="#fff" />
              <circle cx="21" cy="13" r="1.6" fill="#fff" />
            </g>
            <g className="lada-icon-f2">
              <rect
                x="13"
                y="16"
                width="6"
                height="10"
                rx="3"
                fill="#fff8ea"
                stroke="#1c1308"
                strokeWidth="1.8"
              />
              <path
                d="M6 17 C6 8 26 8 26 17 Z"
                fill="#e63e1e"
                stroke="#1c1308"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="11" cy="13" r="1.8" fill="#fff" />
              <circle cx="16" cy="10" r="2" fill="#fff" />
              <circle cx="21" cy="13" r="1.8" fill="#fff" />
            </g>
          </>
        );

      /* FALLBACK / DEFAULT (Decorative Lada Folk Rosette) */
      default:
        return (
          <>
            <g className="lada-icon-f1">
              <circle cx="16" cy="16" r="10" fill="#f4c23c" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M16 6 L16 26 M6 16 L26 16"
                stroke="#c23318"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="3" fill="#fff8ea" stroke="#1c1308" strokeWidth="1.2" />
            </g>
            <g className="lada-icon-f2">
              <circle cx="16" cy="16" r="10.5" fill="#ffe066" stroke="#1c1308" strokeWidth="1.8" />
              <path
                d="M9 9 L23 23 M9 23 L23 9"
                stroke="#e63e1e"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="3.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1.2" />
            </g>
          </>
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center select-none align-middle flex-shrink-0 ${
        animated ? "lada-icon-animated" : ""
      } ${className}`}
      title={title}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        display: "inline-flex",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
        className="overflow-visible"
        style={{ display: "block" }}
      >
        {renderIconContent(norm)}
      </svg>
    </span>
  );
};

const EMOJI_REGEX = /(\p{Extended_Pictographic}+)/gu;

export function renderLadaText(
  text: string,
  iconSize: number | string = 16,
  animated = true,
  className = "",
): React.ReactNode {
  if (!text) return text;
  const parts = text.split(EMOJI_REGEX);
  if (parts.length <= 1) return text;

  return parts.map((part, index) => {
    if (!part) return null;
    if (EMOJI_REGEX.test(part)) {
      return (
        <LadaThematicIcon
          key={index}
          name={part}
          size={iconSize}
          animated={animated}
          className={`mx-0.5 inline-block ${className}`}
        />
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export const LadaText: React.FC<{
  children?: React.ReactNode;
  text?: string;
  iconSize?: number | string;
  animated?: boolean;
  className?: string;
}> = ({ children, text, iconSize = 16, animated = true, className = "" }) => {
  const content = text ?? (typeof children === "string" ? children : null);
  if (content !== null && content !== undefined) {
    return <span className={className}>{renderLadaText(content, iconSize, animated)}</span>;
  }
  return <span className={className}>{children}</span>;
};
