import React, { useState, useEffect, useRef } from "react";
import { HeroId } from "../../../types";
import { HEROES } from "../../../data/gameData";
import { HunterSprite } from "../../sprites/HunterSprite";
import { EnemySprite } from "../../sprites/EnemySprite";
import { LadaHitParticles, LadaDizzyHalo, HitParticleTheme } from "../../sprites/LadaHitParticles";
import { sound } from "../../../lib/sound";

type BogeyCategory = "strasidla" | "voda" | "peklo" | "hvozd" | "lovci";

interface BogeyOption {
  id: string;
  name: string;
  category: BogeyCategory;
  isHero?: boolean;
  desc: string;
}

const BOGEY_OPTIONS: BogeyOption[] = [
  // 1. Strašidla a zjevení
  {
    id: "bubak",
    name: "Bubák od stodoly",
    category: "strasidla",
    desc: "Huňatý černý bubák s velkýma očima a strašidelným vousem",
  },
  {
    id: "rarasek",
    name: "Rarášek z pece",
    category: "strasidla",
    desc: "Zlobivý plamenný skřítek z venkovské pece",
  },
  {
    id: "kostlivec",
    name: "Starý kostlivec",
    category: "strasidla",
    desc: "Chrastící hřbitovní kostlivec se širokým úsměvem",
  },
  {
    id: "mrtvak",
    name: "Mrtvák ze škarpy",
    category: "strasidla",
    desc: "Pobledlý tlející nebožtík v roztrhaném kabátci",
  },
  {
    id: "polednice",
    name: "Polednice z pole",
    category: "strasidla",
    desc: "Hrozivá babizna s plachtou a srpem, děsící neposedy",
  },
  {
    id: "klekanice",
    name: "Klekánice z šera",
    category: "strasidla",
    desc: "Večerní shrbené strašidlo s lucernou a holí",
  },
  {
    id: "bila",
    name: "Bílá paní",
    category: "strasidla",
    desc: "Vznášející se hradní přízrak v bílém závoji se svazkem klíčů",
  },
  {
    id: "helkal",
    name: "Divoch hejkal",
    category: "strasidla",
    desc: "Chlupatý hvozdový hejkal se strašlivým hlasem",
  },
  {
    id: "ohnivy",
    name: "Ohnivý muž",
    category: "strasidla",
    desc: "Hořící přízrak dřívějšího nenasytného rychtáře",
  },

  // 2. Vodní havěť
  {
    id: "vodnik",
    name: "Hastrman Brčál",
    category: "voda",
    desc: "Zelený panáček z Černé tůně s fajfkou a pentlemi na šosu",
  },
  {
    id: "rusalka",
    name: "Jezerní rusalka",
    category: "voda",
    desc: "Spanilá vodní žínka tančící v rákosí ve svitu měsíce",
  },
  {
    id: "ropucha",
    name: "Bahenní ropucha",
    category: "voda",
    desc: "Velká bradavičnatá ropucha z mokřadu u mlýna",
  },

  // 3. Pekelníci a podzemí
  {
    id: "cert",
    name: "Hospodský čert",
    category: "peklo",
    desc: "Klasický chlupatý rohatý čert s kopytem a špinavým pytlem",
  },
  {
    id: "cert_elegan",
    name: "Čert elegán",
    category: "peklo",
    desc: "Pekelník ve fraku s cylindrem a vybranými způsoby",
  },
  {
    id: "permonik",
    name: "Permoník havíř",
    category: "peklo",
    desc: "Drobný podzemní skřítek s krumpáčem a kahancem",
  },
  {
    id: "certova_babicka",
    name: "Čertova babička",
    category: "peklo",
    desc: "Pekelná hospodyně pečící hříšníkům ohnivé buchty",
  },

  // 4. Hvozd a lapkové
  {
    id: "kmotra_liska",
    name: "Chytrá kmotra liška",
    category: "hvozd",
    desc: "Vychytralá zrzavá liška s plnou mošnou vtipů a lstí",
  },
  {
    id: "loupeznik",
    name: "Loupežník Sarka Farka",
    category: "hvozd",
    desc: "Hrozivý lesní loupežník s bambitkou a šavlí za pasem",
  },
  {
    id: "lupic",
    name: "Úskočný lupič",
    category: "hvozd",
    desc: "Rychlý noční lapka číhající na vozy u lesní křižovatky",
  },
  {
    id: "lesni_muz",
    name: "Starý lesní muž",
    category: "hvozd",
    desc: "Mechový vousatý ochránce hvozdu obrostlý kůrou",
  },
  {
    id: "cerny_pes",
    name: "Černý pes barghest",
    category: "hvozd",
    desc: "Děsivý pes s plamennýma očima strážící starý hřbitov",
  },
  {
    id: "ohnivy_kohout",
    name: "Ohnivý kohout",
    category: "hvozd",
    desc: "Jiskřivý plamenný kohout létající z doškových střech",
  },

  // 5. Lovci
  {
    id: "pobuda",
    name: "Pobuda z Hrusic",
    category: "lovci",
    isHero: true,
    desc: "Vesnický tulák se sukovicí, fajfkou a vyřezávanou slánkou",
  },
  {
    id: "kostelnik",
    name: "Pobožný kostelník",
    category: "lovci",
    isHero: true,
    desc: "Kostelník se šosatým kabátem, vyřezávaným křížem a kropáčem",
  },
  {
    id: "bylinkarka",
    name: "Moudrá bylinkářka",
    category: "lovci",
    isHero: true,
    desc: "Babička s košíkem bylinek, šátkem a kouřícím odvarem",
  },
  {
    id: "babicka",
    name: "Babička a Barunka",
    category: "lovci",
    isHero: true,
    desc: "Laskavá Magdalena Novotná s chlebem se solí a Barunkou",
  },
];

export const TestAnimationsTab: React.FC = () => {
  const [selectedBogeyId, setSelectedBogeyId] = useState<string>("bubak");
  const [selectedCategory, setSelectedCategory] = useState<BogeyCategory>("strasidla");

  // Animation states
  const [animType, setAnimType] = useState<
    "idle" | "atk_fluid" | "atk_frame" | "move_fluid" | "move_frame" | "hit"
  >("idle");
  const [activeFrame, setActiveFrame] = useState<number>(1);
  const [moveDir, setMoveDir] = useState<"forward" | "backward" | "lateral">("forward");
  const [hitTheme, setHitTheme] = useState<HitParticleTheme>("default");
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentBogey = BOGEY_OPTIONS.find((b) => b.id === selectedBogeyId) || BOGEY_OPTIONS[0];
  const isHunter = Boolean(currentBogey.isHero);

  // Trigger fluid attack
  const triggerFluidAttack = () => {
    setAnimType("atk_fluid");
    try {
      sound.playWhoosh();
    } catch {
      // Audio fallback
    }
    const duration = Math.round(700 / playbackSpeed);
    setTimeout(() => {
      setAnimType("idle");
    }, duration);
  };

  // Trigger fluid move
  const triggerFluidMove = () => {
    setAnimType("move_fluid");
    try {
      sound.playCardDraw();
    } catch {
      // Audio fallback
    }
    const duration = Math.round(750 / playbackSpeed);
    setTimeout(() => {
      setAnimType("idle");
    }, duration);
  };

  // Trigger hit reaction
  const triggerHit = (theme: HitParticleTheme = "default") => {
    setHitTheme(theme);
    setAnimType("hit");
    try {
      if (theme === "water" || selectedBogeyId === "vodnik" || selectedBogeyId === "rusalka") {
        sound.playSplash();
      } else {
        sound.playComicPop(isHunter ? 1.25 : 1.0);
      }
    } catch {
      // Audio fallback
    }
    const duration = Math.round(700 / playbackSpeed);
    setTimeout(() => {
      setAnimType("idle");
    }, duration);
  };

  // Handle looping logic
  useEffect(() => {
    if (!isLooping) {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      return;
    }

    const intervalMs = Math.round(1400 / playbackSpeed);
    loopTimerRef.current = setInterval(() => {
      setAnimType((prev) => {
        if (prev === "atk_fluid" || prev === "idle") {
          return "atk_fluid";
        }
        return "atk_fluid";
      });
      setTimeout(
        () => {
          setAnimType("idle");
        },
        Math.round(700 / playbackSpeed),
      );
    }, intervalMs);

    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
    };
  }, [isLooping, playbackSpeed]);

  const filteredBogeys = BOGEY_OPTIONS.filter((b) => b.category === selectedCategory);

  return (
    <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto w-full pb-4">
      {/* 1. HEADER EXPLANATION */}
      <div className="bg-[#fff9ea] p-3.5 sm:p-4 rounded-2xl border-3 border-[#1c1308] shadow-[0_4px_0_#1c1308] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🎬</span>
          <div>
            <h2 className="font-title font-black text-base sm:text-lg text-[#1c1308] leading-tight">
              Animační zkušebna bubáků a lovců
            </h2>
            <p className="text-xs text-[#5c3e21] font-bold">
              Testujte plynulé i krokované animace podle zvoleného bubáka a typu animace
            </p>
          </div>
        </div>

        {/* Category switcher pills */}
        <div className="flex flex-wrap items-center gap-1 bg-[#eedcb0] p-1 rounded-xl border border-[#1c1308]">
          {[
            { id: "strasidla" as BogeyCategory, icon: "👻", label: "Strašidla" },
            { id: "voda" as BogeyCategory, icon: "💧", label: "Vodní" },
            { id: "peklo" as BogeyCategory, icon: "😈", label: "Pekelníci" },
            { id: "hvozd" as BogeyCategory, icon: "🌲", label: "Hvozd" },
            { id: "lovci" as BogeyCategory, icon: "🏹", label: "Lovci" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                const firstInCat = BOGEY_OPTIONS.find((b) => b.category === cat.id);
                if (firstInCat) {
                  setSelectedBogeyId(firstInCat.id);
                  setAnimType("idle");
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? "bg-[#1c1308] text-[#ffd438] shadow-xs"
                  : "text-[#5c3e21] hover:bg-[#fff2cc]"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN STUDIO GRID: PREVIEW STAGE + CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* LEFT COLUMN: THEATRICAL PREVIEW STAGE (Columns 1-5) */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <div className="bg-gradient-to-b from-[#e3effa] via-[#f7f0df] to-[#d4be94] p-4 rounded-2xl border-3 border-[#1c1308] shadow-inner relative flex flex-col items-center justify-center min-h-[280px] overflow-hidden select-none">
            {/* Ground / beaten earth bank */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#c49a6c] border-t-2 border-[#1c1308]/40" />
            <div className="absolute bottom-5 left-0 right-0 h-1.5 bg-[#8c5e31]/25" />

            {/* Folk details on floor */}
            <div className="absolute bottom-2 left-6 text-xs opacity-60">🌾</div>
            <div className="absolute bottom-3 right-8 text-xs opacity-60">🍄</div>

            {/* Top HUD badge */}
            <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
              <span className="bg-[#1c1308]/85 text-[#ffd438] text-[0.65rem] font-black px-2.5 py-0.5 rounded-full border border-[#1c1308] shadow-xs backdrop-blur-xs truncate max-w-[200px]">
                {currentBogey.name}
              </span>
              <span className="bg-[#fff8e8]/90 text-[#1c1308] text-[0.62rem] font-bold px-2 py-0.5 rounded-full border border-[#1c1308] shadow-xs">
                {animType === "idle" && "🟢 Klidový střeh"}
                {animType === "atk_fluid" && "⚡ Plynulý útok"}
                {animType === "atk_frame" && `⚔️ Útok: Fáze ${activeFrame}/5`}
                {animType === "move_fluid" && `🐾 Skok (${moveDir})`}
                {animType === "move_frame" && `🐾 Pohyb: Fáze ${activeFrame}/4`}
                {animType === "hit" && "💥 Zásah!"}
              </span>
            </div>

            {/* SPRITE & PARTICLES CONTAINER */}
            <div className="relative z-10 flex items-center justify-center mt-4">
              {isHunter ? (
                <div className="relative flex items-center justify-center">
                  <HunterSprite
                    heroId={selectedBogeyId as HeroId}
                    size={150}
                    isHit={animType === "hit"}
                    isAttacking={animType === "atk_fluid"}
                    attackFrame={animType === "atk_frame" ? activeFrame : undefined}
                  />
                  <LadaHitParticles
                    active={animType === "hit"}
                    theme={hitTheme}
                    subType={selectedBogeyId}
                    isSalt={hitTheme === "salt"}
                    size={160}
                  />
                  <LadaDizzyHalo active={animType === "hit"} />
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  <EnemySprite
                    type={selectedBogeyId}
                    size={150}
                    isHit={animType === "hit"}
                    isAttacking={animType === "atk_fluid"}
                    attackFrame={animType === "atk_frame" ? activeFrame : undefined}
                    isMoving={animType === "move_fluid"}
                    moveFrame={animType === "move_frame" ? activeFrame : undefined}
                    moveDirection={moveDir}
                  />
                  <LadaHitParticles
                    active={animType === "hit"}
                    theme={hitTheme}
                    subType={selectedBogeyId}
                    isSalt={hitTheme === "salt"}
                    size={160}
                  />
                  <LadaDizzyHalo active={animType === "hit"} />
                </div>
              )}
            </div>

            {/* Bottom playback speed and loop controls */}
            <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between">
              <div className="flex items-center gap-1 bg-[#1c1308]/75 px-2 py-0.5 rounded-lg border border-[#1c1308] text-white text-[0.62rem] font-bold">
                <span>Rychlost:</span>
                {[0.5, 1, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-1 rounded ${
                      playbackSpeed === spd
                        ? "bg-[#ffd438] text-[#1c1308] font-black"
                        : "text-[#eedcb0] hover:text-white"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsLooping((v) => !v)}
                className={`text-[0.62rem] font-black px-2 py-0.5 rounded-lg border border-[#1c1308] transition-all cursor-pointer flex items-center gap-1 ${
                  isLooping
                    ? "bg-[#e63e1e] text-white shadow-xs animate-pulse"
                    : "bg-[#fff8e8] text-[#1c1308] hover:bg-[#ffd438]"
                }`}
                title="Přehrávat útok neustále dokola pro ladění plynulosti"
              >
                <span>🔁</span>
                <span>{isLooping ? "Smyčka zapnuta" : "Opakovat"}</span>
              </button>
            </div>
          </div>

          {/* Lore description card for the selected creature */}
          <div className="bg-[#fff8e8] p-2.5 rounded-xl border-2 border-[#1c1308] text-xs shadow-xs">
            <div className="font-title font-black text-[#1c1308] flex items-center gap-1">
              <span>📖</span>
              <span>{currentBogey.name}</span>
            </div>
            <p className="text-[0.7rem] text-[#5c3e21] mt-0.5 leading-relaxed font-medium">
              {currentBogey.desc}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS & BOGEY SELECTOR (Columns 6-12) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {/* 1. SELECTION OF BOGEY (Bubáci v aktuální kategorii) */}
          <div className="bg-[#fffdf7] p-3 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308]">
            <div className="font-title font-black text-xs text-[#1c1308] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span>👹</span>
                <span>Výběr bubáka:</span>
              </span>
              <span className="text-[0.65rem] text-[#8c5614] font-bold">
                {filteredBogeys.length} postav v této kategorii
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {filteredBogeys.map((b) => {
                const isSelected = selectedBogeyId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBogeyId(b.id);
                      setAnimType("idle");
                    }}
                    className={`p-1.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#ffd438] border-[#1c1308] ring-2 ring-[#e69818] shadow-xs"
                        : "bg-[#fff8e8] border-[#ded4be] hover:bg-[#ffeec2]"
                    }`}
                  >
                    <div className="w-8 h-8 flex-none flex items-center justify-center overflow-hidden">
                      {b.isHero ? (
                        <HunterSprite heroId={b.id as HeroId} size={28} />
                      ) : (
                        <EnemySprite type={b.id} size={28} />
                      )}
                    </div>
                    <span className="font-title font-black text-[0.7rem] text-[#1c1308] truncate leading-tight">
                      {b.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SELECTION OF ANIMATION TYPE (Typy animací) */}
          {/* Type A: 5-Frame Attack Animation */}
          <div className="bg-[#fffdf7] p-3 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1c1308] flex items-center gap-1">
                <span>⚔️</span>
                <span>Typ animace: 5-fázový útok</span>
              </span>
              <button
                type="button"
                onClick={triggerFluidAttack}
                className="bg-[#e63e1e] hover:bg-[#ff5233] text-white text-xs font-black px-3 py-1 rounded-xl border border-[#1c1308] shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>▶️</span>
                <span>Přehrát plynule</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-1 text-center">
              {[
                { frame: 1, label: "1. Nápřah", tip: "Příprava zbraně" },
                { frame: 2, label: "2. Vrchol", tip: "Nejvyšší bod" },
                { frame: 3, label: "3. Úder + Bác!", tip: "Komický zásah" },
                { frame: 4, label: "4. Dojezd", tip: "Setrvačnost" },
                { frame: 5, label: "5. Zotavení", tip: "Návrat do střahu" },
              ].map((f) => (
                <button
                  key={f.frame}
                  type="button"
                  onClick={() => {
                    setAnimType("atk_frame");
                    setActiveFrame(f.frame);
                    if (f.frame === 3) {
                      try {
                        sound.playComicPop();
                      } catch {}
                    }
                  }}
                  title={f.tip}
                  className={`py-1.5 px-1 rounded-xl border text-[0.65rem] font-black cursor-pointer transition-all ${
                    animType === "atk_frame" && activeFrame === f.frame
                      ? "bg-[#ffd438] border-[#1c1308] text-[#1c1308] shadow-xs"
                      : "bg-[#fff8e8] border-[#ded4be] text-[#5c3e21] hover:bg-[#ffeec2]"
                  }`}
                >
                  <div className="leading-tight">{f.label}</div>
                  <div className="text-[0.55rem] font-normal opacity-75 mt-0.5 hidden sm:block truncate">
                    {f.tip}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Type B: 4-Frame Movement Animation (pro bubáky) */}
          {!isHunter && (
            <div className="bg-[#fffdf7] p-3 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-xs font-black text-[#1c1308] flex items-center gap-1">
                  <span>🐾</span>
                  <span>Typ animace: 4-fázový pohyb & skok</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <select
                    value={moveDir}
                    onChange={(e) =>
                      setMoveDir(e.target.value as "forward" | "backward" | "lateral")
                    }
                    className="bg-[#fff8e8] border border-[#1c1308] text-xs font-bold px-2 py-0.5 rounded-lg"
                  >
                    <option value="forward">Směr: Vpřed</option>
                    <option value="backward">Směr: Vzad</option>
                    <option value="lateral">Směr: Do strany</option>
                  </select>
                  <button
                    type="button"
                    onClick={triggerFluidMove}
                    className="bg-[#2d6cb5] hover:bg-[#3b82d4] text-white text-xs font-black px-2.5 py-1 rounded-xl border border-[#1c1308] shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>▶️</span>
                    <span>Přehrát skok</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-1 text-center">
                {[
                  { frame: 1, label: "1. Příprava", tip: "Skrčení před skokem" },
                  { frame: 2, label: "2. Výskok", tip: "Vzlet do vzduchu" },
                  { frame: 3, label: "3. Dopad + Prach", tip: "Dopad na zem" },
                  { frame: 4, label: "4. Vzpřímení", tip: "Návrat do střahu" },
                ].map((f) => (
                  <button
                    key={f.frame}
                    type="button"
                    onClick={() => {
                      setAnimType("move_frame");
                      setActiveFrame(f.frame);
                    }}
                    title={f.tip}
                    className={`py-1.5 px-1 rounded-xl border text-[0.65rem] font-black cursor-pointer transition-all ${
                      animType === "move_frame" && activeFrame === f.frame
                        ? "bg-[#bfdbfe] border-[#1c1308] text-[#1e3a8a] shadow-xs"
                        : "bg-[#fff8e8] border-[#ded4be] text-[#5c3e21] hover:bg-[#ffeec2]"
                    }`}
                  >
                    <div className="leading-tight">{f.label}</div>
                    <div className="text-[0.55rem] font-normal opacity-75 mt-0.5 hidden sm:block truncate">
                      {f.tip}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Type C: Hit Reaction & Ladovské částice */}
          <div className="bg-[#fffdf7] p-3 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1c1308] flex items-center gap-1">
                <span>💥</span>
                <span>Typ animace: Zásah a Ladovské částice</span>
              </span>
              <span className="text-[0.65rem] text-[#8c5614] font-bold">
                Bác! • Sssst! • Šplouch!
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => triggerHit("default")}
                className="bg-[#ffd438] hover:bg-[#ffe066] text-[#1c1308] font-black text-xs py-1.5 px-2 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title="Komické žluté čtyřcípé hvězdičky a obláček prachu (Bác!)"
              >
                <span>💥</span>
                <span>Hvězdičky & Bác</span>
              </button>
              <button
                type="button"
                onClick={() => triggerHit("salt")}
                className="bg-[#fffdf2] hover:bg-[#fff7d1] text-[#704214] font-black text-xs py-1.5 px-2 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title="Bílé krystalky soli a jiskření (Sssst!)"
              >
                <span>🧂</span>
                <span>Zásah solí</span>
              </button>
              <button
                type="button"
                onClick={() => triggerHit("water")}
                className="bg-[#c9e8fb] hover:bg-[#a6d8f8] text-[#1c4b7d] font-black text-xs py-1.5 px-2 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title="Rybniční kapky vody a šplíchanec (Šplouch!)"
              >
                <span>💦</span>
                <span>Vodní kapky</span>
              </button>
              <button
                type="button"
                onClick={() => triggerHit(isHunter ? "hero" : "devil")}
                className="bg-[#fce0d8] hover:bg-[#ffd1c4] text-[#8c2210] font-black text-xs py-1.5 px-2 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title={
                  isHunter
                    ? "Hrdinské drobky chleba, bylinky a pírka"
                    : "Pekelné černé saze a žhavé jiskry"
                }
              >
                <span>{isHunter ? "🛡️" : "🔥"}</span>
                <span>{isHunter ? "Hrdina zásah" : "Pekelné saze"}</span>
              </button>
            </div>
          </div>

          {/* Quick Reset to idle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[0.7rem] text-[#7a542b] font-bold">
              Tip: Každá animace odpovídá autentickému lidovému stylu Josefa Lady.
            </span>
            <button
              type="button"
              onClick={() => {
                setAnimType("idle");
                setIsLooping(false);
              }}
              className="text-xs font-black text-[#8c5614] hover:text-[#1c1308] bg-[#eedcb0] hover:bg-[#ffd438] px-3 py-1 rounded-lg border border-[#1c1308] cursor-pointer transition-all flex items-center gap-1"
            >
              <span>🔄</span>
              <span>Klidový stav (Střeh)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
