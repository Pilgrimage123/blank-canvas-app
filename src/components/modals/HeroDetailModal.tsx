import React, { useState } from "react";
import { HeroDef, CardDef } from "../../types";
import { CARD_DB } from "../../data/gameData";
import { HunterSprite } from "../sprites/HunterSprite";
import { CardView } from "../CardView";
import { LadaThematicIcon } from "../sprites/LadaThematicIcon";

interface HeroDetailModalProps {
  hero: HeroDef;
  onSelect: (heroId: string) => void;
  onClose: () => void;
}

interface HeroLoreInfo {
  epithet: string;
  lore: string[];
  quote: string;
  strengths: string[];
  weaknesses: string[];
  tactics: string;
}

const HERO_LORE: Record<string, HeroLoreInfo> = {
  pobuda: {
    epithet: "Hrusický rodák zpod Šibeničního vrchu",
    quote:
      "„Na bubáky se nesmí zhurta. Pěkně vyklepat dýmku, nasypat sůl a počkat, až jim dojde dech.“",
    lore: [
      "Celé léto i zimu se toulá podél potoků a remízků kolem Hrusic, pije studené podmáslí a zná každého hastrmana i bludičku křestním jménem.",
      "Má léty vytrénovaný krok a plíce zvyklé na podzimní mlhy. Do brašny si balí jen to nejnutnější: vyřezávanou slánku z lipového dřeva, pořádný kus posvěceného provazu a krabičku zápalek.",
      "Před žádným raráškem ani hejkalem neuteče — raději se rozkročí, vezme do ruky dubovou hůl a s klidem vymete strašidlo zpátky do močálu.",
    ],
    strengths: [
      "Nejvyšší zásoba životů (80 HP) zaručuje přežití i nečekaných úderů od silných bossů.",
      "Pasivní dar Otrlá obratnost: Začíná každý souboj s +1 Úhybem, který zcela anuluje první příchozí útok.",
      "Vyřezávaná slánka mimo ruku udělí okamžitých 10 HP poškození a naloží 2 vrstvy Soli na kůži, která pálí každé 3 Aug.",
      "Skvělý proti vodníkům a hastrmanům, na které sůl působí se zvýšenou účinností (+50 % poškození).",
    ],
    weaknesses: [
      "Základní balíček má méně bylinkových odvarů (pouze 2×), takže nové karty nelíže tak bleskově.",
      "Při delších soubojích musí hlídat Únavu a včas využívat Spánek nebo odpočinek u kamen.",
    ],
    tactics:
      "Využívejte vysoký počet životů k bezpečnému nápřahu silnějších útoků. Hned v prvním Augenblicku aktivujte Vyřezávanou slánku na nejnebezpečnějšího nepřítele. V hospodě U Černého kocoura se vyplatí dokoupit Ostřejší sůl a Sůl do větru.",
  },
  kostelnik: {
    epithet: "Pobožný strážce svatovítského zvonu",
    quote: "„Kříž na prsou a svěcená voda v kropáči zaženou i toho nejvzpurnějšího pekelníka.“",
    lore: [
      "Už od chlapeckých let tahá za provaz hrusického zvonu a večer s klíčem v ruce obchází hřbitovní zeď.",
      "O nečistých silách si léta četl ve starých pergamenových kronikách na faře. Ví přesně, kdy klekánice vylézá z křovin a kam se schovává kostlivec, když vyjde ranní slunce.",
      "S sebou nosí starobylý dubový kříž po pradědovi a mosazný kropáč naplněný vodou z posvátného pramene. V jeho přítomnosti každé posvěcené dřevo září ještě silněji.",
    ],
    strengths: [
      "Vynikající Připravenost 28 — začíná souboj s nejmenším zpožděním (nástup již za 22 Aug oproti 28 Aug u Bylinkářky).",
      "Pasivní dar Posvěcený štít: Začíná každý souboj s +8 Blokem a jakákoliv obranná karta mu poskytuje +2 Blok navíc (obecně bez vazby na konkrétní kartu).",
      "Farní požehnání mimo ruku poskytne okamžitý štít +12 Bloku přesně ve chvíli, kdy hrozí drtivý úder.",
    ],
    weaknesses: [
      "Začíná pouze s 8 krejcary v měšci, takže si v první hospodě může dovolit méně nákupů.",
      "Někteří bubáci (např. Rarášek nebo Hospodský čert) mají trait Svatokrádežný a křížové karty na ně platí méně.",
    ],
    tactics:
      "Díky nejvyšší Připravenosti 28 (nástup za 22 Aug) můžete okamžitě zahrát obranu ještě předtím, než nepřítel dokončí první útok. Šetřete si Farní požehnání na chvíli, kdy nepřítel chystá zesílený úder (Nadechnutí), a v hospodě sáhněte po Kropáči svěcenky a Holi na čerta.",
  },
  bylinkarka: {
    epithet: "Moudrá kořenářka z podlesní chaloupky",
    quote: "„Na každou neduhu a každého bubáka roste v české zemi ta pravá bylinka.“",
    lore: [
      "Její roubená chaloupka na pokraji hlubokého boru voní mateřídouškou, sušeným heřmánkem a kozlíkem.",
      "S hastrmany od Olšového rybníka vychází v dobrém — peče jim kynuté buchty a oni jí na oplátku nosí leknínové kořeny. Čertům zase vaří odvar z třezalky, když je bolí zuby.",
      "Když se ale strašidla začnou chovat neuctivě a děsit děti v Hrusicích, vezme svůj plný košík a dokáže bubáky zmást a zahnat rychleji než leckterý silák.",
    ],
    strengths: [
      "Nejbohatší hrdina na startu (12 krejcarů) — v prvním šenku může okamžitě vylepšovat nebo kupovat.",
      "Pasivní dar Plná brašna býlí: Začíná každý souboj se 4 kartami v ruce (místo 3) pro bleskovou kombinatoriku od prvního okamžiku.",
      "Hluboké dýchání (Nádech dává +7 Akcí) a vydatný Spánek (odstraní rovnou −9 Únavy).",
      "Čerstvý odvar mimo ruku má bleskové ochlazení pouhých 6 Aug a lízne 2 karty s úlevou od Únavy (−2).",
    ],
    weaknesses: [
      "Nižší základní životy (72 HP) vyžadují opatrnost a včasné vyklízení ruky od škodlivých karet.",
      "Připravenost 22 znamená rozvážnější start (nástup za 28 Aug) — rychlejší nepřátelé mohou v úvodu jednat o chvilku dřív.",
    ],
    tactics:
      "Hrajte na neustálý koloběh karet v ruce. Propojujte Bylinkové odvary a Nápad s útočnými kartami. Čerstvý odvar používejte pokaždé, když se ochladí, abyste drželi Únavu na nule. V šenku prioritně shánějte Košík bylin a Úkrok za stodolu.",
  },
  babicka: {
    epithet: "Laskavá stařenka z Ratibořic s bystrou vnučkou Barunkou",
    quote: "„Kdo do tebe kamenem, ty do něho chlebem, a na světě bude hned o kousek lépe.“",
    lore: [
      "V polovině 19. století, v malebných časech pokojného staročeského venkova, putuje českým krajem laskavá Magdalena Novotná – známá široko daleko jednoduše jako Babička.",
      "Po jejím boku věrně kráčí mladá a vnímavá vnučka Barunka s copánky a bystrým zrakem. Barunka nosí košík, pozoruje lesní i vodní havěť a učí se moudrosti starých pověstí.",
      "Na zlé bubáky, mlsné vodníky i samolibé čerty neplatí jen sukovice a kříž, ale především čisté srdce, poctivý pecen chleba se solí a vřetánko, jehož předení vrací do světa klid a řád.",
    ],
    strengths: [
      "Nejvyšší základní Životy (84 HP) a mimořádná vyrovnanost i proti těm nejstrašidelnějším potvorám.",
      "Pasivní dar Pokojná mysl & Ostražitost: Každá zahraná přípravná karta jí uleví od další −1 Únavy navíc, a vnučka Barunka včasným zrakem oddálí nástup všech bubáků o +2 Aug.",
      "Pecen chleba se solí v balíčku dává okamžitý Blok (+10) a uleví od Únavy (−3) zcela bez nápřahu.",
      "Mimo ruku má připravenou posilu: Chléb se solí a vlídné slovo (+14 Blok, −3 Únava, lízne 1 kartu).",
      "Zlaté vřetánko zasahuje za 12 poškození a odmotává nit nepřátelského záměru.",
    ],
    weaknesses: [
      "Střední Připravenost 24 (start za 26 Aug) vyžaduje rozvážný úvodní tah a včasné krytí.",
      "Spoléhá na mírnění a odzbrojení spíše než na agresivní bleskové výpady.",
    ],
    tactics:
      "Udržujte si chladnou hlavu a klidné srdce. Pecen chleba se solí zahrajte bez prodlení kdykoliv naroste Únava nebo když bubák chystá zákeřný úder. Speciální schopnost uplatněte v okamžiku, kdy nepřítel zesiluje nápřah. V šenku doplňujte Barunčinu bystrou radu, Zlaté vřetánko a Velký kříž.",
  },
};

export const HeroDetailModal: React.FC<HeroDetailModalProps> = ({ hero, onSelect, onClose }) => {
  const [activeTab, setActiveTab] = useState<"info" | "deck" | "tactics">("info");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const lore = HERO_LORE[hero.id] || HERO_LORE.pobuda;

  // Deck list with counts
  const starterDeckCards = Object.entries(hero.deck).map(([cardId, count]) => {
    const def: CardDef = CARD_DB[cardId] || CARD_DB.metla || CARD_DB.kuraz || CARD_DB.sul;
    return {
      cardId,
      count,
      def,
    };
  });

  const totalCardsInDeck = Object.values(hero.deck).reduce(
    (sum: number, n) => sum + (Number(n) || 0),
    0,
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1c1308]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 select-none animate-fade-in"
      onClick={onClose}
    >
      <div
        className="lada-card max-w-3xl w-full max-h-[92vh] flex flex-col p-4 sm:p-6 bg-[#fffdf7] border-4 border-[#1c1308] shadow-[10px_14px_0_rgba(28,19,8,0.5)] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-3 border-[#1c1308] pb-4 mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-[#eedcae] p-2 sm:p-2.5 rounded-xl border-2 border-[#1c1308] shadow-[2px_3px_0_#1c1308] shrink-0 flex items-center justify-center">
              <HunterSprite heroId={hero.id} size={82} />
            </div>
            <div>
              <div className="text-[0.72rem] font-bold text-[#8a5624] uppercase tracking-wider">
                {lore.epithet}
              </div>
              <h3 className="font-title text-2xl sm:text-3xl font-black text-[#1c1308] leading-tight">
                {hero.name}
              </h3>
              <div className="text-xs sm:text-sm font-semibold text-[#543b24] italic">
                {hero.desc}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lada-button text-xs py-1.5 px-3 hover:bg-[#e0c080] flex items-center gap-1"
            title="Zavřít podrobnosti"
          >
            <LadaThematicIcon name="close" size={12} />
            <span>Zavřít</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b-2 border-[#dfcb9a] pb-3 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all border-2 inline-flex items-center gap-1.5 ${
              activeTab === "info"
                ? "bg-[#ffd438] text-[#1c1308] border-[#1c1308] shadow-[2px_3px_0_#1c1308]"
                : "bg-[#f4ebd0] text-[#593d25] border-transparent hover:bg-[#eedcae]"
            }`}
          >
            <LadaThematicIcon name="scroll" size={14} />
            <span>Příběh a statistiky</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("deck")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all border-2 inline-flex items-center gap-1.5 ${
              activeTab === "deck"
                ? "bg-[#ffd438] text-[#1c1308] border-[#1c1308] shadow-[2px_3px_0_#1c1308]"
                : "bg-[#f4ebd0] text-[#593d25] border-transparent hover:bg-[#eedcae]"
            }`}
          >
            <LadaThematicIcon name="draw" size={14} />
            <span>Počáteční balíček ({totalCardsInDeck} karet)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tactics")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all border-2 inline-flex items-center gap-1.5 ${
              activeTab === "tactics"
                ? "bg-[#ffd438] text-[#1c1308] border-[#1c1308] shadow-[2px_3px_0_#1c1308]"
                : "bg-[#f4ebd0] text-[#593d25] border-transparent hover:bg-[#eedcae]"
            }`}
          >
            <LadaThematicIcon name="attack" size={14} />
            <span>Taktika a rady</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1.5 custom-scrollbar">
          {/* TAB 1: INFO & STATS */}
          {activeTab === "info" && (
            <div className="space-y-4">
              {/* Folk Quote Banner */}
              <div className="bg-[#fcf3dc] p-3.5 rounded-xl border-2 border-[#1c1308] shadow-[3px_3px_0_#dfcb9a]">
                <p className="font-serif italic text-sm text-[#3b2a1a] font-bold text-center">
                  {lore.quote}
                </p>
              </div>

              {/* Combat Stats Grid */}
              <div>
                <h4 className="font-title text-sm font-black text-[#1c1308] uppercase tracking-wider mb-2">
                  Bojové vlastnosti a parametry
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-[#fff3ec] p-3 rounded-xl border-2 border-[#942718] shadow-xs">
                    <span className="text-[0.68rem] uppercase font-bold text-[#8c2d1b] block">
                      Životy (HP)
                    </span>
                    <span className="font-title text-xl font-black text-[#942718]">
                      {hero.hp} HP
                    </span>
                    <span className="text-[0.68rem] text-[#633327] block mt-0.5">
                      Celková odolnost v boji
                    </span>
                  </div>

                  <div className="bg-[#eef5fc] p-3 rounded-xl border-2 border-[#1b4372] shadow-xs">
                    <span className="text-[0.68rem] uppercase font-bold text-[#1b4372] block">
                      Připravenost
                    </span>
                    <span className="font-title text-xl font-black text-[#1b4372]">
                      {hero.ready}
                    </span>
                    <span className="text-[0.68rem] text-[#334e6d] block mt-0.5">
                      Nástup za {50 - hero.ready} Aug (vyšší = dřív)
                    </span>
                  </div>

                  <div className="bg-[#fff9e6] p-3 rounded-xl border-2 border-[#c2850e] shadow-xs">
                    <span className="text-[0.68rem] uppercase font-bold text-[#875508] block">
                      Měšec s mincemi
                    </span>
                    <span className="font-title text-xl font-black text-[#a66e07]">
                      {hero.salt} k.
                    </span>
                    <span className="text-[0.68rem] text-[#593d17] block mt-0.5">
                      Počáteční krejcary do hospody
                    </span>
                  </div>

                  <div className="bg-[#f0f8ec] p-3 rounded-xl border-2 border-[#2d6328] shadow-xs">
                    <span className="text-[0.68rem] uppercase font-bold text-[#204e1c] block">
                      Nádech / Spánek
                    </span>
                    <span className="font-title text-base font-black text-[#204e1c]">
                      +{hero.breath} / −{hero.sleepFat}
                    </span>
                    <span className="text-[0.68rem] text-[#33592f] block mt-0.5">
                      Akce za nádech / úbytek Únavy
                    </span>
                  </div>
                </div>
              </div>

              {/* Passive Hero Gift Box */}
              {hero.passiveName && (
                <div className="bg-[#edf5fd] p-3.5 rounded-xl border-2 border-[#1b4372] shadow-[3px_3px_0_#1b4372]">
                  <div className="flex items-center gap-2 mb-1">
                    <LadaThematicIcon name="star" size={20} animated />
                    <span className="text-[0.7rem] uppercase font-black tracking-wider text-[#1b4372]">
                      Trvalý pasivní dar postavy
                    </span>
                  </div>
                  <h4 className="font-title text-base font-black text-[#1c1308]">
                    {hero.passiveName}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#294668] mt-1 leading-snug">
                    {hero.passiveDesc}
                  </p>
                </div>
              )}

              {/* Unique Special Ability Box */}
              <div className="bg-[#fffaf0] p-4 rounded-xl border-3 border-[#1c1308] shadow-[4px_4px_0_#1c1308]">
                <div className="flex items-center justify-between border-b border-[#dfcb9a] pb-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <LadaThematicIcon name="star" size={20} />
                    <div>
                      <span className="text-[0.68rem] uppercase font-black tracking-wider text-[#8a5624] block">
                        Unikátní speciál mimo ruku
                      </span>
                      <h4 className="font-title text-lg font-black text-[#1c1308]">
                        {hero.special.name}
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#eedcae] border border-[#1c1308] text-xs font-black text-[#1c1308] inline-flex items-center gap-1">
                    <LadaThematicIcon name="hourglass" size={12} />
                    <span>Ochlazení: {hero.special.cd} Aug</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-[#3b2a1a] mb-2 leading-relaxed">
                  Tento speciál neleží v balíčku — je vám k dispozici neustále na bojišti jako
                  zvláštní akce s vlastním časovačem ochlazení. Nezabírá místo v ruce!
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-bold">
                  {hero.special.dmg && (
                    <span className="bg-[#fce0d8] border border-[#942718] text-[#942718] px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                      <LadaThematicIcon name="attack" size={12} />
                      <span>Zásah {hero.special.dmg} HP</span>
                    </span>
                  )}
                  {hero.special.dot && (
                    <span className="bg-[#fff0d0] border border-[#d69818] text-[#825406] px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                      <LadaThematicIcon name="salt" size={12} />
                      <span>+{hero.special.dot} vrstvy Soli na kůži</span>
                    </span>
                  )}
                  {hero.special.block && (
                    <span className="bg-[#d8e8fc] border border-[#1b4372] text-[#1b4372] px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                      <LadaThematicIcon name="block" size={12} />
                      <span>+{hero.special.block} Okamžitý Blok</span>
                    </span>
                  )}
                  {hero.special.draw && (
                    <span className="bg-[#e4f4d8] border border-[#2d6328] text-[#2d6328] px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                      <LadaThematicIcon name="draw" size={12} />
                      <span>Lízne +{hero.special.draw} karty</span>
                    </span>
                  )}
                  {hero.special.fat !== undefined && hero.special.fat < 0 && (
                    <span className="bg-[#eaf4ff] border border-[#3b78ba] text-[#1f4e82] px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                      <LadaThematicIcon name="fatigue" size={12} />
                      <span>{hero.special.fat} Únava</span>
                    </span>
                  )}
                </div>

              </div>

              {/* Lore Narrative Paragraphs */}
              <div className="bg-[#f7efe0] p-4 rounded-xl border-2 border-[#1c1308]">
                <h4 className="font-title text-sm font-black text-[#1c1308] uppercase tracking-wider mb-2">
                  Příběh v Ladově pohádkovém světě
                </h4>
                <div className="space-y-2 text-xs sm:text-sm font-medium text-[#382614] leading-relaxed">
                  {lore.lore.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STARTER DECK */}
          {activeTab === "deck" && (
            <div className="space-y-4">
              <div className="bg-[#fcf3dc] p-3 rounded-xl border-2 border-[#1c1308] flex items-center justify-between">
                <div className="text-xs sm:text-sm font-bold text-[#3b2a1a]">
                  Počáteční brašna obsahuje celkem <b>{totalCardsInDeck} karet</b>. Každou z nich
                  můžete v hostinci vylepšit za krejcary na mocnější variantu.
                </div>
              </div>

              {/* Starter Deck Cards Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {starterDeckCards.map(({ cardId, count, def }) => {
                  return (
                    <div
                      key={cardId}
                      onClick={() => setSelectedCardId(selectedCardId === cardId ? null : cardId)}
                      className="bg-[#fffaf0] p-3 rounded-xl border-2 border-[#1c1308] shadow-[3px_4px_0_#dfcb9a] flex flex-col items-center cursor-pointer hover:bg-[#fff5e0] transition-all"
                    >
                      {/* Count Ribbon */}
                      <div className="w-full flex justify-between items-center mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#ffd438] border border-[#1c1308] text-[0.72rem] font-black text-[#1c1308]">
                          {count}× v balíčku
                        </span>
                        <span className="text-[0.65rem] font-bold text-[#694825]">
                          {def.cost} Akce · {def.pre > 0 ? `${def.pre} Aug` : "hned"}
                        </span>
                      </div>

                      {/* Card Preview Component */}
                      <div className="my-1">
                        <CardView card={cardId} showFullTextDefault={true} />
                      </div>

                      {/* Summary explanation */}
                      <div className="mt-2 text-center text-xs font-semibold text-[#4d3621]">
                        {def.flavor && (
                          <div className="italic text-[0.68rem] text-[#694825] mt-1 border-t border-[#ebd8b0] pt-1">
                            "{def.flavor}"
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TACTICS & ADVICE */}
          {activeTab === "tactics" && (
            <div className="space-y-4">
              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f0f8ec] p-4 rounded-xl border-2 border-[#2d6328] shadow-xs">
                  <h4 className="font-title text-sm font-black text-[#204e1c] flex items-center gap-1.5 mb-2.5">
                    <LadaThematicIcon name="star" size={15} />
                    <span>Přednosti a silné stránky</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-semibold text-[#1a4016]">
                    {lore.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <LadaThematicIcon name="check" size={13} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fff3ec] p-4 rounded-xl border-2 border-[#942718] shadow-xs">
                  <h4 className="font-title text-sm font-black text-[#942718] flex items-center gap-1.5 mb-2.5">
                    <LadaThematicIcon name="warning" size={15} />
                    <span>Úskalí a na co si dát pozor</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-semibold text-[#541e15]">
                    {lore.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <LadaThematicIcon name="cross_mark" size={13} />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tactical Walkthrough */}
              <div className="bg-[#fffaf0] p-4 rounded-xl border-3 border-[#1c1308] shadow-[4px_4px_0_#1c1308]">
                <h4 className="font-title text-base font-black text-[#1c1308] flex items-center gap-2 mb-2">
                  <LadaThematicIcon name="target" size={16} />
                  <span>Doporučená strategie</span>
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-[#382614] leading-relaxed">
                  {lore.tactics}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t-2 border-[#1c1308] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-bold text-[#694825] text-center sm:text-left">
            Vyberte hrdinu a vyrazte na cestu napříč malebným Ladovým krajem.
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="lada-button py-2.5 px-4 text-xs font-bold flex-1 sm:flex-none inline-flex items-center gap-1.5"
            >
              <LadaThematicIcon name="back" size={14} />
              <span>Zpět</span>
            </button>
            <button
              type="button"
              onClick={() => onSelect(hero.id)}
              className="lada-button lada-button-primary py-2.5 px-6 text-sm font-black shadow-[0_4px_0_#1c1308] flex-1 sm:flex-none inline-flex items-center gap-2"
            >
              <LadaThematicIcon name="attack" size={15} />
              <span>Vyrazit na cestu za {hero.name.split(" ")[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

