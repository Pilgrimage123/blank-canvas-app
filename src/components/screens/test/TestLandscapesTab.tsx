import React, { useState } from "react";
import { LocationId } from "../../../types";
import { LOCATIONS } from "../../../data/gameData";
import { CombatLandscapeArena } from "../../sprites/CombatLandscapeArena";
import { LadaThematicIcon } from "../../sprites/LadaThematicIcon";

interface LandscapeInfo {
  id: LocationId;
  name: string;
  icon: string;
  subtitle: string;
  desc: string;
  groundDesc: string;
  pathDesc: string;
  easterEggs: string[];
  bogeysHere: string;
}

const LANDSCAPE_INFOS: LandscapeInfo[] = [
  {
    id: "vesnice",
    name: "Vesnice Hrusice",
    icon: "village",
    subtitle: "Slunná rodná vesnička pod kostelem sv. Havla",
    desc: "Malebné hrusické kopečky, roubená chalupa s červenou střechou a kouřem z komína, dřevěný plaňkový plot se slunečnicemi a černým kocourem na sloupku.",
    groundDesc: "Zářivě zelená louka s kopretinami a vlčími máky",
    pathDesc: "Zlatavá ušlapaná venkovská cesta s kameny",
    easterEggs: [
      "Sluníčko (mrkání a úsměv)",
      "Černý kocour na plotě (mňoukání)",
      "Slunečnice (cinkání)",
      "Kozička Běluše",
      "Husa s housátkem",
    ],
    bogeysHere: "Bubák od stodoly, Rarášek z pece, Kmotra liška, Ohnivý kohout",
  },
  {
    id: "mlyn",
    name: "Klapáčův mlýn",
    icon: "field",
    subtitle: "Klapající mlýnské kolo na vodní strouze",
    desc: "Mohutné dřevěné mlýnské kolo čeří vodu, na břehu stojí pytle s moukou, ve strouze plují kapři a na vrbové větvi odpočívá ledňáček.",
    groundDesc: "Bujná pobřežní tráva se žlutými blatouchy",
    pathDesc: "Písčitá cesta zpevněná oblázky a loužemi",
    easterEggs: ["Otáčející se mlýnské kolo", "Vyskakující kapr", "Pytle mouky", "Brouk prskavec"],
    bogeysHere: "Hastrman od stoky, Bahenní ropucha, Divoženka, Mrtvák",
  },
  {
    id: "les",
    name: "Hluboký bor",
    icon: "forest",
    subtitle: "Voňavý jehličnatý hvozd s mechem a houštinami",
    desc: "Staré vzrostlé smrky a borovice, mechové balvany, červené kloboučky muchomůrek a v dutině vykotlaného dubu mrká stará moudrá sova.",
    groundDesc: "Hluboký mechový koberec se spadaným jehličím a šiškami",
    pathDesc: "Hnědá lesní hlína protkaná sukovitými kořeny",
    easterEggs: ["Houkající sova v dutině", "Červená muchomůrka", "Divočák v křoví", "Lesní šišky"],
    bogeysHere: "Divoch hejkal, Kmotra liška, Lesní muž, Klekánice, Loupežníci",
  },
  {
    id: "rybnik",
    name: "Olšový rybník",
    icon: "pond",
    subtitle: "Klidná vodní hladina lemovaná starými vrbami",
    desc: "Zkroucené vrby s popraskanou kůrou, husté rákosí s doutníky, bílé a žluté lekníny a zelená rosnička skákající z listu na list.",
    groundDesc: "Mokřadní břeh s rákosím a rozkvetlými blatouchy",
    pathDesc: "Vlhká zablácená stezka s vodními tůňkami a vlnkami",
    easterEggs: [
      "Zelená rosnička",
      "Vlající pentle na vrbě",
      "Vlnící se leknín",
      "Rybniční bubliny",
    ],
    bogeysHere: "Hastrman Brčál, Vodníčci, Jezerní rusalka, Bahenní ropucha",
  },
  {
    id: "zricenina",
    name: "Hradní zřícenina",
    icon: "castle",
    subtitle: "Opuštěný hrad Syslov nad hlubokými roklemi",
    desc: "Zbytky hradních bašt z lomového kamene, gotické klenuté okno s výhledem do kraje, vlající potrhaná korouhev a poletující netopýři v soumraku.",
    groundDesc: "Horský kamenitý trávník s fialovými bodláky",
    pathDesc: "Drcená hradní suť a starodávné dlažební kostky",
    easterEggs: [
      "Letící noční netopýr",
      "Zámecká korouhev",
      "Staré gotické okno",
      "Hradní ještěrka",
    ],
    bogeysHere: "Bílá paní, Strašidlo Mulisák, Ohnivý muž, Kostlivec, Jeskyňka",
  },
  {
    id: "hrbitov",
    name: "Starý hřbitov",
    icon: "cemetery",
    subtitle: "Tichý vesnický hřbitůvek s kamennou zídkou",
    desc: "Mechovité břidlicové kříže s lidovými srdíčky, kamenná kostnice, staré lípy s padajícím listím a tajemná světélka bludiček tančící v mlze.",
    groundDesc: "Pochmurný hřbitovní drn se slaměnkami",
    pathDesc: "Šedá břidlicová drť se starými náhrobními kameny",
    easterEggs: ["Světélko bludičky", "Černý havran na kříži", "Plápolající svíčka", "Zvonice"],
    bogeysHere: "Starý kostlivec, Mrtvák ze škarpy, Černý pes barghest, Klekánice, Upír",
  },
  {
    id: "boss",
    name: "Černá tůň",
    icon: "darkness",
    subtitle: "Tajemné bezedné zřídlo v srdci močálů",
    desc: "Prastaré bažinaté zřídlo, kde voda má barvu inkoustu. Z hlubin stoupají sirné bubliny, kořeny starých olší se kroutí jako hadi a ve vzduchu jiskří pekelná síla.",
    groundDesc: "Temná rašeliništní rašelina s rudě žhnoucími puklinami",
    pathDesc: "Černé kluzké bahno s runovými kameny a bublajícími loužemi",
    easterEggs: [
      "Probublávající bahenní kráter",
      "Žhnoucí puklina",
      "Runový kámen s pentagramem",
      "Bludný kořen",
    ],
    bogeysHere: "Hastrman Brčál (Vládce tůně), Pekelný kníže, Stará čertova babička",
  },
];

export const TestLandscapesTab: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<LocationId>("vesnice");
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");

  const currentInfo = LANDSCAPE_INFOS.find((l) => l.id === selectedLocId) || LANDSCAPE_INFOS[0];

  return (
    <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto w-full pb-4">
      {/* 1. HEADER BANNER */}
      <div className="bg-[#fff9ea] p-3.5 sm:p-4 rounded-2xl border-3 border-[#1c1308] shadow-[0_4px_0_#1c1308] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <LadaThematicIcon name="picture" size={26} animated />
          <div>
            <h2 className="font-title font-black text-base sm:text-lg text-[#1c1308] leading-tight">
              Pozadí boje (Krajiny bez bubáků a lovce)
            </h2>
            <p className="text-xs text-[#5c3e21] font-bold">
              Prohlédněte si všechna autentická bojová dějiště čistě bez postav v plné kráse
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-[#eedcb0] p-1 rounded-xl border border-[#1c1308]">
          <button
            type="button"
            onClick={() => setViewMode("single")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "single"
                ? "bg-[#1c1308] text-[#ffd438] shadow-xs"
                : "text-[#5c3e21] hover:bg-[#fff2cc]"
            }`}
          >
            <LadaThematicIcon name="search" size={14} animated />
            <span>Detailní náhled</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "grid"
                ? "bg-[#1c1308] text-[#ffd438] shadow-xs"
                : "text-[#5c3e21] hover:bg-[#fff2cc]"
            }`}
          >
            <LadaThematicIcon name="picture" size={14} animated />
            <span>Všechna pozadí (7)</span>
          </button>
        </div>
      </div>

      {/* 2. LOCATION SWITCHER BAR */}
      <div className="bg-[#fff8e8] p-2 sm:p-2.5 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308]">
        <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-1.5">
          {LANDSCAPE_INFOS.map((loc) => {
            const isSelected = selectedLocId === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => {
                  setSelectedLocId(loc.id);
                  if (viewMode === "grid") setViewMode("single");
                }}
                className={`flex-1 min-w-[105px] px-2.5 py-1.5 rounded-xl border-2 text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-[#ffd438] border-[#1c1308] ring-2 ring-[#e69818] text-[#1c1308] shadow-xs scale-102"
                    : "bg-[#fffdf7] border-[#ded4be] text-[#5c3e21] hover:bg-[#ffeec2]"
                }`}
              >
                <LadaThematicIcon name={loc.icon} size={16} animated />
                <span className="truncate">{loc.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CONTENT AREA: SINGLE DETAIL VIEW VS. ALL 7 GRID */}
      {viewMode === "single" ? (
        <div className="flex flex-col gap-3">
          {/* MAIN ARENA (WITHOUT HUNTER OR BOGEYS) */}
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl border-3 border-[#1c1308] overflow-hidden shadow-[0_5px_0_#1c1308]">
            <CombatLandscapeArena locId={selectedLocId} className="w-full h-full" />

            {/* Overlay hint banner */}
            <div className="absolute top-2 left-3 z-30 pointer-events-none flex items-center gap-2">
              <span className="bg-[#1c1308]/85 text-[#ffd438] font-title font-black text-xs sm:text-sm px-3 py-1 rounded-full border border-[#1c1308] shadow-md backdrop-blur-xs flex items-center gap-1.5">
                <LadaThematicIcon name={currentInfo.icon} size={16} animated />
                <span>{currentInfo.name}</span>
              </span>
              <span className="bg-[#fff8e8]/90 text-[#5c3e21] font-bold text-[0.65rem] px-2.5 py-0.5 rounded-full border border-[#1c1308] shadow-xs hidden sm:inline-block">
                Klikací velikonoční vajíčka jsou aktivní!
              </span>
            </div>

            {/* Bottom tier indicator tags */}
            <div className="absolute bottom-2 right-3 z-30 pointer-events-none flex flex-col gap-1 items-end">
              <span className="bg-[#fff8e8]/90 text-[#1e3a8a] font-black text-[0.62rem] px-2 py-0.5 rounded-md border border-[#1c1308] shadow-xs">
                Horní terasa: Místo pro zadní řadu bubáků (4 pozice)
              </span>
              <span className="bg-[#fff8e8]/90 text-[#78350f] font-black text-[0.62rem] px-2 py-0.5 rounded-md border border-[#1c1308] shadow-xs">
                Dolní cesta: Místo pro přední řadu bubáků a lovce
              </span>
            </div>
          </div>

          {/* LORE & SCENIC DETAILS PANEL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Box 1: Popis scény */}
            <div className="bg-[#fffdf7] p-3 rounded-xl border-2 border-[#1c1308] shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-title font-black text-xs text-[#1c1308] mb-1 flex items-center gap-1">
                  <LadaThematicIcon name="scroll" size={14} animated />
                  <span>Popis scenerie:</span>
                </div>
                <p className="text-[0.72rem] text-[#4a3520] leading-relaxed">{currentInfo.desc}</p>
              </div>
              <div className="text-[0.65rem] text-[#8c5614] font-bold mt-2 pt-1 border-t border-[#1c1308]/15">
                Nálada: {currentInfo.subtitle}
              </div>
            </div>

            {/* Box 2: Barvy a terén */}
            <div className="bg-[#fffdf7] p-3 rounded-xl border-2 border-[#1c1308] shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-title font-black text-xs text-[#1c1308] mb-1 flex items-center gap-1">
                  <LadaThematicIcon name="picture" size={14} animated />
                  <span>Ladovský terén bojiště:</span>
                </div>
                <ul className="text-[0.7rem] text-[#4a3520] space-y-1 list-disc list-inside">
                  <li>
                    <strong className="text-[#1c1308]">Břeh (horní řada):</strong>{" "}
                    {currentInfo.groundDesc}
                  </li>
                  <li>
                    <strong className="text-[#1c1308]">Cesta (dolní řada):</strong>{" "}
                    {currentInfo.pathDesc}
                  </li>
                </ul>
              </div>
              <div className="text-[0.65rem] text-[#2b6e1e] font-bold mt-2 pt-1 border-t border-[#1c1308]/15">
                Dvouúrovňové bojiště pro 8 protivníků
              </div>
            </div>

            {/* Box 3: Živá vajíčka a obyvatelé */}
            <div className="bg-[#fffdf7] p-3 rounded-xl border-2 border-[#1c1308] shadow-xs flex flex-col justify-between">
              <div>
                <div className="font-title font-black text-xs text-[#1c1308] mb-1 flex items-center gap-1">
                  <LadaThematicIcon name="egg" size={14} animated />
                  <span>Interaktivní prvky a bubáci:</span>
                </div>
                <div className="text-[0.68rem] text-[#4a3520] leading-tight">
                  <div className="font-bold text-[#1c1308] mb-0.5">Velikonoční vajíčka:</div>
                  <div className="text-[#694322]">{currentInfo.easterEggs.join(" • ")}</div>
                </div>
              </div>
              <div className="text-[0.65rem] text-[#c4321d] font-bold mt-2 pt-1 border-t border-[#1c1308]/15 truncate">
                Zdejší bubáci: {currentInfo.bogeysHere}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ALL 7 LANDSCAPES IN MOSAIC GRID */
        <div className="flex flex-col gap-3">
          <div className="text-xs font-black text-[#5c3e21] flex items-center justify-between px-1">
            <span>Všech 7 bitevních pozadí najednou (kliknutím zvětšíte):</span>
            <span className="text-[0.68rem] text-[#8c5614] font-normal">
              Všechny běží živě v plné kráse bez postav
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {LANDSCAPE_INFOS.map((loc) => (
              <div
                key={loc.id}
                onClick={() => {
                  setSelectedLocId(loc.id);
                  setViewMode("single");
                }}
                className="bg-[#fffdf7] rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] overflow-hidden cursor-pointer hover:border-[#e69818] transition-all hover:scale-101 flex flex-col"
              >
                <div className="p-2 bg-[#eedcb0] border-b border-[#1c1308] flex items-center justify-between">
                  <span className="font-title font-black text-xs text-[#1c1308] flex items-center gap-1">
                    <LadaThematicIcon name={loc.icon} size={16} animated />
                    <span>{loc.name}</span>
                  </span>
                  <span className="text-[0.62rem] font-bold text-[#8c5614] bg-[#fff8e8] px-1.5 py-0.5 rounded border border-[#1c1308]">
                    Detail
                  </span>
                </div>

                <div className="h-44 relative overflow-hidden bg-[#e0d3bc]">
                  <CombatLandscapeArena locId={loc.id} className="w-full h-full" />
                </div>

                <div className="p-2 text-[0.68rem] text-[#5c3e21] font-medium leading-tight">
                  {loc.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
