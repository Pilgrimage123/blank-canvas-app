import React, { useState } from "react";
import { EnemySprite } from "../sprites/EnemySprite";

interface ChangelogModalProps {
  onClose: () => void;
}

interface VersionEntry {
  version: string;
  tag: string;
  date: string;
  title: string;
  badge: string;
  highlights: {
    category: string;
    icon: string;
    items: string[];
  }[];
  flavorQuote: string;
  flavorAuthor: string;
}

// POVINNÉ PRAVIDLO PRO VÝVOJ:
// Všechny změny musí být zapsány do tohoto changelogu.
// Záznamy v changelogu se mají dělat o něco méně detailní než doposud (stručnější, výstižné body zaměřené na podstatu).
const CHANGELOG_DATA: VersionEntry[] = [
  {
    version: "v0.6.9",
    tag: "Aktuální verze",
    date: "24. září",
    title: "Důsledná revize kánonu & očištění textů od nepovolených postav",
    badge: "Kánon & Ladovský svět",
    flavorQuote:
      "„V našich časech v Hrusicích ještě o žádných školácích ani slechu, zato starý vodník Brčál a strašidlo Mulisák tu panují od nepaměti!“",
    flavorAuthor: "obecní kronikář z Hrusic",
    highlights: [
      {
        category: "Kanonická čistota světa (polovina 19. století)",
        icon: "📜",
        items: [
          "Odstraněny všechny anachronické zmínky o Pepíkovi, školácích a dětech z příběhových textů hrdinů i testovacího menu.",
          "Postava na plotě sjednocena na autentického černého hrusického kocoura.",
          "V Bestiáři upraveny formulace u Klekánice a vodníka (kapří potěr namísto pulců) pro vyloučení záměny s budoucími postavami.",
        ],
      },
    ],
  },
  {
    version: "v0.6.8",
    tag: "Předchozí verze",
    date: "24. září",
    title: "Oprava animací pozadí, plná viditelnost scenerií a bohatá ladovská vesnice",
    badge: "Bitevní scenerie & animace",
    flavorQuote:
      "„Mlýnské kolo se točí rovně a bez zadrhnutí, vír hučí v hlubinách a celá vesnička i s chalupami a stromy je jako na dlani.“",
    flavorAuthor: "Josef Lada — Bubáci a hastrmani",
    highlights: [
      {
        category: "Oprava animací kola a vodního víru",
        icon: "⚙️",
        items: [
          "Mlýnské kolo v Klapáčově mlýně se nyní otáčí přesně kolem středu své osy bez vyosení.",
          "Vodní vír v Černé tůni získal symetrická ramena a perspektivní zploštění pro plynulou rotaci.",
        ],
      },
      {
        category: "Plná viditelnost a odkrytí scenerií",
        icon: "👁️",
        items: [
          "Odstraněna neprůhledná překrývací vrstva cesty, která zakrývala spodní část bitevních krajin.",
          "Všechny prvky, domečky, stromy i vodní hladiny jsou nyní stoprocentně viditelné.",
        ],
      },
      {
        category: "Přidání nových chalup, stromů a detailů",
        icon: "🏡",
        items: [
          "Vesnice Hrusice obohacena o druhou roubenku, stodolu, mohutnou lípu, jabloň a studnu.",
          "Do mlýna přibyl špejchar, pekařství, řada vrb, bříza, dřevěná lávka a žebřiňák.",
          "V lese stojí nová hájovna, bouda dřevorubců, břízky a vykotlaný starý dub.",
          "Rybník, hradní zřícenina, hřbitov i závěrečná tůň doplněny o nové chalupy, zdi, vrby a detaily.",
        ],
      },
    ],
  },
  {
    version: "v0.6.7",
    tag: "Předchozí verze",
    date: "23. září",
    title: "Rozdělení zkušebny na podčásti: Animace bubáků & Pozadí boje",
    badge: "Zkušebna & scenerie",
    flavorQuote:
      "„Všecko pěkně na své poličce: tady bubáci poskakují, támhle krajina voní a souboje čekají na povel.“",
    flavorAuthor: "Josef Lada — Bubáci a hastrmani",
    highlights: [
      {
        category: "Přehledné rozdělení zkušebny na 3 podčásti",
        icon: "📑",
        items: [
          "Navigace pomocí záložek: Testovací souboje, Animace bubáků a Pozadí boje.",
          "Čisté oddělení funkcí pro pohodlné zkoušení bez nutnosti scrollovat celou stránkou.",
        ],
      },
      {
        category: "Animační studio: Animace bubáků",
        icon: "👹",
        items: [
          "Katalog bubáků rozdělený do rodin (Strašidla, Vodní havěť, Pekelníci, Hvozd a lovci).",
          "Testování podle typu animace: klidový střeh, 5-fázový útok, 4-fázový pohyb (vpřed, vzad, do strany) a zásah.",
          "Krokování jednotlivých fází, volba rychlosti přehrávání (0.5x, 1x, 1.5x) a smyčka pro ladění kresby.",
        ],
      },
      {
        category: "Galerie: Pozadí boje bez postav",
        icon: "🏞️",
        items: [
          "Všech 7 bitevních scenerií zobrazených čistě bez bubáků a lovce.",
          "Režim velkého detailu s interaktivními velikonočními vajíčky i přehledová mozaika všech 7 pozadí najednou.",
        ],
      },
    ],
  },
  {
    version: "v0.6.6",
    tag: "Předchozí verze",
    date: "23. září",
    title: "Ladovské částicové efekty při zásahu (On-Hit Particles & Screen Juice)",
    badge: "Vizuální šťavnatost & zvuk",
    flavorQuote: "„Bác! Hvězdičky se mu zatočily kolem hlavy a z kabátu vyletěl obláček prachu!“",
    flavorAuthor: "Josef Lada — Bubáci a hastrmani",
    highlights: [
      {
        category: "Autentické Ladovské částice při zásahu",
        icon: "✨",
        items: [
          "Čtyřcípé komické hvězdičky s tučnou černou tušovou konturou a teplými žlutými tóny.",
          "Obláčky prachu a dýmu s ladovským vykrojeným tvarem při úderu holí či pěstí.",
          "Krystalky soli s jiskřením při solení bubáků („Sssst! 🧂“).",
          "Vodní kapky a šplíchance pro vodníky a rusalky („Šplouch! 💦“) i pekelné saze pro čerty.",
          "Specifické částice pro hrdiny (pírka pro Pobudu, bylinky pro Bylinkářku, chléb pro Babičku, svěcená voda pro Kostelníka).",
        ],
      },
      {
        category: "Komická aureola hvězdiček & herní šťavnatost",
        icon: "💫",
        items: [
          "Točící se komické hvězdičky (Dizzy Halo) nad hlavou zasaženého lovce či omráčeného bubáka.",
          "Měkký teplý otřes bojiště (anim-screen-wobble) při každém úspěšném zásahu.",
          "Zvukový doprovod: komické plácnutí („Bác!“) a šplouchnutí při zásahu vodních tvorů.",
        ],
      },
      {
        category: "Testovací studio animací",
        icon: "🧪",
        items: [
          "V testovací aréně přidána tlačítka pro okamžité vyzkoušení všech typů částic (Hvězdičky, Sůl, Voda, Pekelné saze, Hrdina).",
        ],
      },
    ],
  },
  {
    version: "v0.6.5",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Příchod Babičky Boženy Němcové a mladé Barunky",
    badge: "Nový hrdina & karty",
    flavorQuote: "„Kdo do tebe kamenem, ty do něho chlebem, a svět bude hned o kousek světlejší.“",
    flavorAuthor: "Babička Magdalena Novotná & mladá Barunka",
    highlights: [
      {
        category: "Nová hratelná dvojice: Babička a mladá Barunka",
        icon: "👵",
        items: [
          "Plnohodnotný hrdina v souladu s historickým kánonem (polovina 19. století).",
          "Základní statistiky: 42 HP, Připravenost 24, 11 krejcarů, hluboké dýchání (7 Akcí z Nádechu) a silný Spánek (−8 Únavy).",
          "Speciální schopnost Chléb se solí a vlídné slovo: přidá +7 Blok, uleví od −3 Únavy a lízne 1 kartu.",
        ],
      },
      {
        category: "Originální Ladovský vizuál a animace",
        icon: "🎨",
        items: [
          "Autentický vektorový sprite Babičky s bílým čepcem, modrotiskovou zástěrou, dřevěným vřetánkem a voňavým pecnem chleba.",
          "Věrná společnice Barunka s copánky s červenými mašlemi a košíkem jablíček, reagující na dění i útoky.",
          "5-fázové animace roztočení zlatého vřetánka se sečným obloukem a jiskřivými částečkami soli.",
        ],
      },
      {
        category: "Nové karty a událost na mapě",
        icon: "🃏",
        items: [
          "Zlaté vřetánko (útok za 6, zranění +Aug 1:1, odmotání nitě nepřátelského záměru).",
          "Pecen chleba se solí (okamžitý Blok +5 a úleva −3 Únavy zcela bez nápřahu).",
          "Barunčina bystrá rada (lízne 2 karty a udělí 1 Úhyb).",
          "Nová zastávka na mapě: Setkání s Babičkou a Barunkou pro občerstvení (+6 HP, −5 Únavy).",
        ],
      },
    ],
  },
  {
    version: "v0.6.4",
    tag: "Předchozí verze",
    date: "22. září",
    title: "5-fázové animace útoků a 4-fázový pohyb bubáků",
    badge: "Animační systém",
    flavorQuote:
      "„Když Pobuda máchne sukovicí nebo hastrman vyšplíchne vlnu z tůně, má to poctivých pět fází nápřahu, úderu i dojezdu – a když bubák poskočí po cestě, zvedne se pod ním ladovský obláček prachu!“",
    flavorAuthor: "Pobuda z Hrusic & hastrman Brčál",
    highlights: [
      {
        category: "5-fázové animace útoků (lovci i bubáci)",
        icon: "⚔️",
        items: [
          "Promyšlený pětifázový cyklus úderu: Nápřah vzad, vrchol nápřahu, bleskový úder se sečným obloukem a Bác! hvězdičkami, setrvačný dojezd a návrat do střahu.",
          "Specifické vizuály pro všechny lovce: sukovice Pobudy, svěcená voda Kostelníka i horký bylinkový odvar Bylinkářky reagují v každé fázi.",
        ],
      },
      {
        category: "4-fázový pohyb bubáků z místa na místo",
        icon: "🐾",
        items: [
          "Čtyřfázový přirozený pohyb: Příprava a přikrčení, výskok v povětří s odlehčeným stínem, dopad se zvířenými obláčky prachu a vzpřímení.",
          "Podpora směrů (vpřed, vzad, do strany) a nová Animační zkušebna v testovacím menu pro krokování jednotlivých fází.",
        ],
      },
    ],
  },
  {
    version: "v0.6.3",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Kanonické časové ukotvení světa (50 let před narozením Pepíka)",
    badge: "Příběhový kánon",
    flavorQuote:
      "„V Černé tůni už léta bafá z dýmky starý hastrman Brčál a na zřícenině Syslova straší Mulisák, ale po Pepíkovi a Pulci s Bubáčkem ještě v kraji není ani vidu ani slechu!“",
    flavorAuthor: "starý hastrman Brčál & strašidlo Mulisák",
    highlights: [
      {
        category: "Příběh a folklorní kánon",
        icon: "📜",
        items: [
          "Časové zasazení: Příběh hry je pevně ukotven přibližně 50 let před narozením Pepíka (v polovině 19. století).",
          "Vymezení postav: Ve hře nevystupuje Pepík ani jeho dětští kamarádi, ani Pulec s Bubáčkem (v této době ještě nejsou na světě).",
          "Folklorní stálice: Starý vodník Brčál i strašidlo Mulisák v herním světě samozřejmě přebývají a tvoří jádro ladovského světa.",
        ],
      },
    ],
  },
  {
    version: "v0.6.2",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Interaktivní velikonoční vajíčka na bojových pozadích",
    badge: "Hravé prvky",
    flavorQuote:
      "„Stačí klepnout na sluníčko, černého kocoura nebo hrníček na vrbě a ozve se veselé mňouknutí, zažbluňkání či zahoukání – jen tak pro radost ze hry!“",
    flavorAuthor: "starý kocour & hastrman Brčál",
    highlights: [
      {
        category: "Interaktivní prvky pro radost",
        icon: "✨",
        items: [
          "Klikací kulisy v každém prostředí: Klepnutím na sluníčko, černého kocoura na plotě, kozu, kachny, žáby, veverku, sovu, hrníčky na vrbě, korouhvičku, kapličku či vír vyvoláte veselou reakci.",
          "Animace a zvukové efekty: Každý prvek po kliknutí pružně poskočí, zazní originální syntezovaný zvuk a objeví se roztomilá komiksová bublina.",
          "Čistě pro zábavu: Interakce nemají žádný taktický vliv na souboj – slouží výhradně k objevování a potěše z Ladovského světa.",
        ],
      },
    ],
  },
  {
    version: "v0.6.1",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Ladovská zvířátka a folklorní fauna v bojových arénách",
    badge: "Ladovský folklor",
    flavorQuote:
      "„Černý kocour spokojeně vrtí ocasem na plotě, kozička Běluše spásá mez, na mlýně kuňká rosnička a v boru pilně ťuká strakapoud – v celém kraji to teď náramně žije!“",
    flavorAuthor: "starý šenkýř a bylinkářka z Hrusic",
    highlights: [
      {
        category: "Venkovská zvířata a animace",
        icon: "🐾",
        items: [
          "Černý kocour a domácí zvířectvo: Hrusický kocour s červeným obojkem vrtící ocáskem na plotě, pasoucí se bílá koza Běluše, husa s housátkem i babočka paví oko.",
          "Vodní a lesní fauna: Kuňkající zelená rosnička s pulzujícím hrdlem, kachní rodinka, skákající pstruh, vážky a vlaštovčí hnízdo s ptáčaty.",
          "Zvířata hlubokého boru: Zrzavá veverka s huňatým ocasem a žaludem, strakapoud ťukající do kůry borovice a zvědavý zajíček s hýbajícíma se ušima.",
          "Tajuplná noční stvoření: Moudrý výr velký na uschlé větvi hřbitova, hřbitovní myška, vyhřívající se ještěrka, noční netopýři a vousatý sumec v Černé tůni.",
          "Ohleduplné umístění: Všechna zvířátka jsou situována do malebného okolí mimo plochy, kde stojí a bojují bubáci.",
        ],
      },
    ],
  },
  {
    version: "v0.6.0",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Oživení a odlišení bojových pozadí s animovaným sluníčkem",
    badge: "Vizuální styl",
    flavorQuote:
      "„Sluníčko na nebi na nás vesele pomrkává a otáčí paprsky, mlýnské kolo v Klapáčově mlýně stříká kapky vody a v Černé tůni se točí tajemný bezedný vír!“",
    flavorAuthor: "pan revírník a hastrman Brčál",
    highlights: [
      {
        category: "Animovaná pozadí a živý svět",
        icon: "☀️",
        items: [
          "Animované ladovské sluníčko: Usměvavá tvář s mrkajícíma očima, pulzující září a plynule rotujícími plamennými paprsky.",
          "Rozpohybovaný svět Ladových pohádek: Otáčející se vodní kolo se stříkajícími kapkami, kroužící jiřičky a krkavci, plující mraky a komínový kouř.",
          "7 vizuálně unikátních arén: Vesnice, Klapáčův mlýn, Hluboký bor se sovou a světluškami, Olšový rybník s měsíčním halem a lekníny, Hradní zřícenina s loučí a vlajkou, Starý hřbitov s mlhou a Černá tůň s rotujícím vírem.",
          "Detailní lokální terén: Každá lokace má vlastní zbarvení hlíny a cesty, květiny (vlčí máky, orobince, blatouchy, vřes), kamení a louže s vlnkami.",
        ],
      },
    ],
  },
  {
    version: "v0.5.9",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Vyvýšení zadní řady bubáků na travnatý val",
    badge: "Bojová aréna",
    flavorQuote:
      "„Strašidla v zadní řadě povyskočila nahoru na mez u plotu – teď na ně pan revírník vidí od hlavy až k patám a nikdo se za nikým neschová!“",
    flavorAuthor: "starosta z Bubákova",
    highlights: [
      {
        category: "Bojové rozestavení",
        icon: "🌾",
        items: [
          "Vyvýšení zadní řady o ~70 % výšky bubáka: Zadní řada strašidel byla posunuta nahoru na travnatý břeh a laťkový plot.",
          "Perfektní přehled bojiště: Postavy v zadní řadě již nejsou zakryty přední řadou a jejich siluety, odpočty i ukazatele životů jsou plně viditelné.",
        ],
      },
    ],
  },
  {
    version: "v0.5.8",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Předsunutí formace bubáků blíže k lovci",
    badge: "Bojová aréna",
    flavorQuote:
      "„Už se nám bubáci netlačí až k plotu u lesa – přistoupili o krok blíž k panu revírníkovi, ať je střetnutí hezky tváří v tvář!“",
    flavorAuthor: "hastrman Brčál",
    highlights: [
      {
        category: "Bojové rozestavení",
        icon: "👣",
        items: [
          "Předsunutí formace o šířku menšího bubáka: Všichni bubáci v přední i zadní řadě se posunuli dopředu blíže k lovci, čímž vznikla přirozenější a vyváženější kompozice na polní cestě.",
          "Volnější pravý okraj: Svislé ukazatele na zádech strašidel mají nyní dostatek prostoru a netísní se u rámu arény.",
        ],
      },
    ],
  },
  {
    version: "v0.5.7",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Předsunutí a posun svislého ukazatele bubáků",
    badge: "Bojové rozhraní",
    flavorQuote:
      "„Ani ten nejtlustší hastrman s bachorem jak džber už ukazatel nezakryje – posunuli jsme ho víc dozadu a dali pěkně navrch!“",
    flavorAuthor: "starosta z Bubákova",
    highlights: [
      {
        category: "Lepší čitelnost ukazatele",
        icon: "👀",
        items: [
          "Předsunuto do popředí (z-20): Vertikální ukazatel je nyní ve vrstvě před tělem bubáka, takže jej korpulentní postavy (vodníci, čerti) nepřekrývají.",
          "Posun o 40 % více vzad: Ukazatel je posunut ještě více směrem za záda nepřítele pro přirozenou a čistou kompozici.",
        ],
      },
    ],
  },
  {
    version: "v0.5.6",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Vertikální minimalistický ukazatel za zády bubáků",
    badge: "Bojové rozhraní",
    flavorQuote:
      "„Ukazatel odpočtu a životů pěkně svisle za zády bubáka – na bojišti je hned plno místa a na strašidla je radost pohledět!“",
    flavorAuthor: "starosta z Bubákova",
    highlights: [
      {
        category: "Svislý ukazatel bubáků",
        icon: "📏",
        items: [
          "Vertikální minimalistická lišta: Ukazatel odpočtu Augenblicků a životů (HP) je nyní umístěn svisle přímo za postavou bubáka.",
          "Uvolněný prostor nad hlavou: Horní zóna je zcela volná pro přehlednější zobrazení předpovědi zranění, cílového zaměřovače a komiksových citoslovcí.",
        ],
      },
    ],
  },
  {
    version: "v0.5.5",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Kompaktní ukazatele bubáků a detail na klepnutí",
    badge: "Bojové rozhraní",
    flavorQuote:
      "„Pryč s velkými tabulemi pod nohami bubáků! Teď stačí mrknout na jejich odpočet a zdravíčko hned za zády, a když chcete vědět víc, stačí na ně klepnout prstem.“",
    flavorAuthor: "starosta z Bubákova",
    highlights: [
      {
        category: "Zjednodušené rozhraní bubáků",
        icon: "👻",
        items: [
          "Odstranění masivního podstavce: Byla odstraněna rozměrná lišta se jménem a velkým panelem, čímž se scéna otevřela a bubáci vyniknou v plné ladovské kráse.",
          "Kompaktní odpočet a HP: Za tělem každého bubáka je decentní ukazatel odpočtu (Aug) a aktuálních životů (HP).",
          "Kompletní informace na klepnutí: Klepnutím přímo na tělo bubáka se otevře detailní okno s jeho kartami, odolnostmi a slabinami.",
        ],
      },
    ],
  },
  {
    version: "v0.5.4",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Úprava perspektivy a překrytí zadní řady bubáků",
    badge: "Vizuální styl & Bojiště",
    flavorQuote:
      "„Zadní řada bubáků se přikrčila za meze a mohutná strašidla vpředu – hned to na návsi vypadá jako na pravém ladovském obrázku!“",
    flavorAuthor: "hajný z Hrusic",
    highlights: [
      {
        category: "Bojiště & Formace bubáků",
        icon: "🌾",
        items: [
          "Snížení horní řady: Zadní řada strašidel je posunuta níže k cestě, takže se jemně překrývá a částečně schovává za největšími bubáky v přední řadě.",
          "Čisté vrstvení a odezva: Přední linie je v popředí; při najetí kurzorem i při zaměření (🎯) zadní bubák plynule vystoupí do popředí pro snadné ovládání a útok.",
        ],
      },
    ],
  },
  {
    version: "v0.5.3",
    tag: "Předchozí verze",
    date: "22. září",
    title: "Čištění kódu, odstranění mrtvých souborů a oprava cílení",
    badge: "Optimalizace & Opravy",
    flavorQuote:
      "„Vymetená světnice, vyčištěné balíčky a přesná ruka při míření na strašidla! Hrusice jsou zase o kus spořádanější.“",
    flavorAuthor: "ponocný z Hrusic",
    highlights: [
      {
        category: "Odstranění mrtvého kódu & úklid projektu",
        icon: "🧹",
        items: [
          "Odstranění nepoužívaných souborů: Smazány zastaralé komponenty (CombatView, MapView, VillageHub, GameOverModal, FairytaleAlbum, FairytaleArt) a nepoužívané soubory routování.",
          "Extrakce spriteUtils: Pomocné funkce pro měřítka bubáků (getStageScale, getStagePercent) přesunuty do čistého pomocného modulu pro bezchybný Fast Refresh.",
        ],
      },
      {
        category: "Opravy soubojových mechanik & spolehlivost",
        icon: "⚔️",
        items: [
          "Přímé cílení při kliku: Kliknutí na bubáka s vybranou kartou či rychlý útok předává cíl atomicky, což zabraňuje nechtěnému zásahu předchozího cíle.",
          "Bonus Kostelníka u okamžitých karet: Bonus k Bloku za kříže je nyní korektně započítáván i u okamžitých karet bez nápřahu.",
          "Optimalizace soubojového cyklu: Vyčištěny a stabilizovány časovací efekty v Reactu pro naprosto plynulý běh Augenblicků.",
        ],
      },
    ],
  },
  {
    version: "v0.5.2",
    tag: "Předchozí verze",
    date: "21. září",
    title: "Úprava zásad changelogu (stručnější záznamy)",
    badge: "Pravidla projektu",
    flavorQuote:
      "„Méně rozvláčného psaní, více pohádkového hraní! V hrusické kronice odteď zapisujeme změny stručně a k věci.“",
    flavorAuthor: "pan rychtář z Bubákova",
    highlights: [
      {
        category: "Zásady zápisu novinek",
        icon: "📜",
        items: [
          "Stručnější záznamy: Všechny budoucí záznamy v changelogu se formulují o něco méně detailně než dosud.",
          "Aktualizace systémových pravidel: Požadavek na méně detailní záznamy byl zapsán do systémových pravidel projektu (AGENTS.md, GEMINI.md, README.md) i do hlavičky této kroniky.",
        ],
      },
    ],
  },
  {
    version: "v0.5.1",
    tag: "Předchozí verze",
    date: "21. září",
    title: "Vylepšení rodiny Čerta elegána & ladovské proporce",
    badge: "Vizuální péče",
    flavorQuote:
      "„Čert elegán si v salónu nepotrpí na poletující kousky, ale na řádně utažený jezdecký karabáč v ruce a způsoby hodné hrusického panstva!“",
    flavorAuthor: "zápis z hrusické zámecké kanceláře",
    highlights: [
      {
        category: "Oprava spritů Čerta hraběte (Stádium 4)",
        icon: "🎩",
        items: [
          "Odstranění létajícího biče: Kompletní vymazání problematické rotující animace, která způsobovala odtržení biče a jeho poletování v prostoru mimo tělo.",
          "Bič pevně v ruce a před tělem: Jezdecký karabáč je zřetelně ukotven v čertovské pěsti se zlatým pečetním prstenem a zaručeně vykreslen v popředí před černým kabátcem i pláštěm.",
          "Vysoký kontrast a ladovská kresba: Karabáč má světlý podkladový lem pro dokonalou čitelnost proti tmavému oděvu, sytý inkoustový obrys, teplou koňakovou kůži, červeno-zlaté křížové pletení a kožené šlehátko na konci.",
        ],
      },
      {
        category: "Sjednocení velikosti rodiny Čerta elegána",
        icon: "📏",
        items: [
          "Stejná velikost všech 4 členů: Všichni členové rodiny (Čert voják, Čert myslivec, Čert džentlmen i Čert hrabě) mají nyní přesně identické rozměry.",
          "Běžná lidská velikost (Lovec): Velikost celé rodiny byla normalizována na 115 × 124 px, což přesně odpovídá spritu Lovce (běžný lidský vzrůst).",
          "Vypnutí stadiálního škálování: Pro rodinu Čerta elegána bylo deaktivováno 12% zvětšování za stádium (stageScale = 1.0), takže žádný člen nepůsobí ani jako trpaslík, ani jako přerostlý kolos.",
        ],
      },
    ],
  },
  {
    version: "v0.5.0",
    tag: "Předchozí verze",
    date: "20. září",
    title: "9 nových rodin bytostí Josefa Lady (Úrovně 1, 2 a 3)",
    badge: "Obří rozšíření",
    flavorQuote:
      "„V lesích, skalách, rybnících i štolách se to jen hemží novými tvory: od skřehotavých ropuch a ohnivých kohoutů přes modravé jeskyňky a divoženky až po leknínové rusalky a důlní permoníky!“",
    flavorAuthor: "kronikář hrusických polesí",
    highlights: [
      {
        category: "Nové rodiny 1. úrovně",
        icon: "🐸",
        items: [
          "Ropucha: Bradavičnatá tůňová ropucha (od ropušky s pulčím ocáskem až po královnu blátivých ropuch se zlatou leknínovou korunkou).",
          "Ohnivý kohout: Jiskřivý a plamenný kohout vysedávající na doškových střechách stodol.",
          "Černý pes (Barghest): Tajemný černý pes s planoucíma ohnivýma očima, kovaným obojkem a hvozdovou barghestovskou aurou.",
        ],
      },
      {
        category: "Nové rodiny 2. úrovně",
        icon: "🧚",
        items: [
          "Divoženka: Lesní žínka s mechovým lýkem a věnečkem z lesních jahod a jeřabin.",
          "Jeskyňka: Půvabná skalní elfka s modrou pletí, špičatýma ušima, krystalovou korunkou a křemenným nožem („Jen dva prstíčky strčíme...“).",
          "Létající rarach: Poletující pekelný rarach s netopýřími křídly, rohy, špičatým ocáskem a jiskřivými vidličkami.",
          "Lesní muž: Mohutný ochránce hvozdu obrostlý mechem a borůvčím, s březovým kyjem a choroši na uších.",
        ],
      },
      {
        category: "Nové rodiny 3. úrovně",
        icon: "🌊",
        items: [
          "Rusalka: Půvabná vodní víla se zelenými vlásky, vodním závojem a leknínovou korunkou u mlýnských jezů.",
          "Permoník: Podzemní havířský skřítek s kahancem, stříbrným kladívkem a dýmčičkou plnou voňavého tabáku.",
        ],
      },
      {
        category: "Zkušebna & Testovací sestavy",
        icon: "🧪",
        items: [
          "Okamžité testování: Ve Zkušebně jsou k dispozici rychlé testovací střety pro novou 1. úroveň (3 bubáci), 2. úroveň (4 bubáci) i 3. úroveň (2 bubáci).",
          "Pohádkový Bestiář: Všechny nové rodiny a jejich 4 vývojová stádia jsou kompletně zapsány v Bestiáři včetně autentického ladovského popisu.",
        ],
      },
    ],
  },
  {
    version: "v0.4.0",
    tag: "Předchozí verze",
    date: "18. září",
    title: "Autentičtí Ladovští čerti & velikostní odlišení stádií (12 %)",
    badge: "Velká aktualizace",
    flavorQuote:
      "„V pekle i v hospodě platí pořádek: mladý rarášek se sotva vyhrabe z komína, kdežto hospodský čert s tuplákem piva a rohatý kníže budí náležitý respekt!“",
    flavorAuthor: "hospodský z Hrusic",
    highlights: [
      {
        category: "Nové vlastní sprity rodiny čertů",
        icon: "🔥",
        items: [
          "8 unikátních Ladovských ilustrací: Všechna 4 stádia obou pekelných větví (Rarášek z pece i Hospodský čert) mají zbrusu nové, na míru kreslené vektorové sprity věrně odrážející ilustrace Josefa Lady.",
          "Větev Rarášek: Churavý rarášek se zavázaným růžkem a teplou šálou, Vyhublý rarášek s mašlí na ocase, vyplazeným jazykem a březovou metlou, klasický Rarášek v červené vestičce s dýmkou, a Pekelný rarášek s planoucími rohy a kovanými vidlemi.",
          "Větev Hospodský čert: Šenkýřský čertík v kostkované zástěrce, Karbanický čert s mariáškami a esem za uchem, Hospodský čert s tuplákem piva a zlatým řetízkem, a mocný Rohatý kníže se zlatou korunou a Černou knihou hříchů.",
        ],
      },
      {
        category: "Velikostní odlišení bubáků (12 % za stádium)",
        icon: "📏",
        items: [
          "Vizuální růst bubáků: Všechna 4 stádia každého bubáka jsou nyní velikostně odstupňována přesně o 12 % za každé stádium.",
          "Matematická škála: Stádium 1 (mláďata a neduživí) má 76 % základní velikosti, Stádium 2 má 88 %, Stádium 3 tvoří základ (100 %) a mocné Stádium 4 má 112 % velikosti.",
          "Přehledné ukazatele: Velikostní poměr je přehledně vyznačen v Bestiáři, v detailním okně bubáka i v živém souboji.",
        ],
      },
    ],
  },
  {
    version: "v0.3.7",
    tag: "Předchozí verze",
    date: "17. září",
    title: "Oprava náběhu souboje & plynulý přechod na tah lovce",
    badge: "Oprava",
    flavorQuote:
      "„Jakmile bubák vyskočí a bouchne do stolu, lovec nečeká ani Augenblick a hned tasí karty!“",
    flavorAuthor: "hrusický kronikář",
    highlights: [
      {
        category: "Plynulost začátku souboje",
        icon: "⚔️",
        items: [
          "Okamžité uvolnění tahu po akci bubáků: Pokud měli bubáci vyšší Připravenost a provedli úvodní výpad, zpoždění lovce se okamžitě dokončí a karty i akce se ihned odemknou k reakci.",
          "Odstranění záseku časovače: Časová smyčka souboje byla stabilizována a spolehlivě odpočítává i při rychlých událostech a animacích.",
          "Svižný 3× náběh: Prázdné Augenblicky před prvním zásahem probíhají plynule trojnásobnou rychlostí (300 ms/Aug) a při úderu se čas přirozeně zpomalí na zobrazení animace a textu.",
        ],
      },
    ],
  },
  {
    version: "v0.3.6",
    tag: "Předchozí verze",
    date: "17. září",
    title: "Sjednocení Připravenosti & 3× zrychlený rozběh",
    badge: "Novinka",
    flavorQuote:
      "„Kdo dřív přijde, ten dřív mele — a kostelník s kropáčem je u bubáků vždycky o krok napřed!“",
    flavorAuthor: "kostelník z Hrusic",
    highlights: [
      {
        category: "Taktická rovnováha & iniciativa",
        icon: "⚡",
        items: [
          "Otočení škály Připravenosti: Vyšší hodnota nyní intuitivně znamená dřívější akci (Kostelník 28, Pobuda 25, Bylinkářka 22).",
          "Jednotné zpoždění před bojem: Hrdinové i bubáci mají nástupní zpoždění (50 − Připravenost) Aug.",
          "Předstih Kostelníka: Kostelník (28) nastupuje již za 22 Aug, Pobuda (25) za 25 Aug a rozvážná Bylinkářka (22) za 28 Aug.",
        ],
      },
      {
        category: "Rychlost & dynamika souboje",
        icon: "⏩",
        items: [
          "3× zrychlený rozběh: Dokud nikdo nejedná (čeká se na první úder či nápřah), čas běží trojnásobnou rychlostí (300 ms na Aug).",
          "Vizuální indikátor v záhlaví: Zelený pulzující štítek „⚡ 3× zrychlený rozběh“ jasně informuje o zrychleném toku času.",
          "Plynulý přechod: Jakmile kdokoliv zahájí akci (útok bubáka nebo nápřah karty), čas se automaticky vrátí k běžnému taktu.",
        ],
      },
    ],
  },
  {
    version: "v0.3.5",
    tag: "Předchozí verze",
    date: "17. září",
    title: "Hastrmani, dýmkový kouř & komiksové šprýmy",
    badge: "Novinka",
    flavorQuote:
      "„Když si vodník bafne z dýmky a hodí do tůně hrst stuh, hned je na světě veseleji!“",
    flavorAuthor: "hastrman Brčál od Černé tůně",
    highlights: [
      {
        category: "Vizuální šťáva & hravý game feel",
        icon: "✨",
        items: [
          "Komiksové citoslovce (Comic Pops): Animované bubliny s autentickými zvuky (Bác!, Sssst!, Puf!, Žuch!, Šplouch!) při zásazích a tricích.",
          "Interaktivní dýmkový kouř (Pipe Smoke): Jemné líné obláčky stoupající z vodnických i tuláckých dýmek při bafnutí.",
          "Měkké pružné mikro-pauzy a zhoupnutí karet při líznutí a zahrání.",
          "Opravena animace ocásku čertíka a raráška: střed otáčení pevně ukotven k trupu, ocásek již neupadává a přirozeně se vrtí.",
        ],
      },
      {
        category: "Kronika & folklórní adaptace",
        icon: "📜",
        items: [
          "Přidána tato interaktivní Kronika změn (Changelog) s přehledem všech aktualizací.",
          "Zapracování motivů z knihy Josefa Lady Bubáci a hastrmani (vodník Brčál, strašidlo Mulisák, krejcary, stuhy a perníčky).",
          "Rychlý teplý restart s návratem na náves a do venkovského šenku.",
        ],
      },
      {
        category: "Taktická rovnováha",
        icon: "⚖️",
        items: [
          "Vyvážení odkladu úderů zraněním: delay = zranění * (1 - odolnost/100).",
          "Vylepšená odezva při přetížení ruky (Mokré lumpárny a Leknutí).",
          "Jasnější vizualizace smrtícího zásahu (Lebka 💀 u nepřátel i hrdiny).",
        ],
      },
    ],
  },
  {
    version: "v0.3.2",
    tag: "Stabilní",
    date: "Září",
    title: "Vesnické šprýmy & Hospoda U Černého kocoura",
    badge: "Obsah",
    flavorQuote: "„Dva džbánky piva, miska soli na stůl a čerti ať si trhnou nohou.“",
    flavorAuthor: "starý šenkýř Klapáč",
    highlights: [
      {
        category: "Šenk & obchod",
        icon: "🍺",
        items: [
          "Vylepšování základních karet: Hozená sůl ➔ Ostřejší sůl, Kříž ➔ Velký kříž, Odvar ➔ Košík bylin.",
          "Vyhazování přebytečných a rušivých karet z brašny za krejcary.",
          "Odpočinek u vyhřátých kachlových kamen snižující Únavu o 5 bodů.",
        ],
      },
      {
        category: "Mapové události",
        icon: "🗺️",
        items: [
          "Farářova lipová světnice — bezpečné místo s horkým lipovým čajem.",
          "Místní nástrahy: Obecní dráb s mýtem a Pytlácké železo v křoví.",
          "Sousedova pevná záplata pro +4 Blok v příští šarvátce.",
        ],
      },
    ],
  },
  {
    version: "v0.3.0",
    tag: "Základ",
    date: "Srpen",
    title: "Putování přes Hrusice & Čas v Augenblicích",
    badge: "Milník",
    flavorQuote: "„Každé mrknutí oka má v boji s rarachem cenu zlata.“",
    flavorAuthor: "farář z Hrusic",
    highlights: [
      {
        category: "Taktický časový systém",
        icon: "⏳",
        items: [
          "Čas neměřený na kola, ale na plynulé okamžiky — Augenblicky (Aug).",
          "Mechanika Nádechu a Únavy — čím víc unavený lovec, tím méně akcí z nádechu.",
          "Akce Mrknutí umožňující nechat plynout čas o 1 Aug bez vyčerpání akcí.",
        ],
      },
      {
        category: "Tři venkovští hrdinové",
        icon: "🚶",
        items: [
          "Pobuda z Hrusic — vytrvalý krok a vyřezávaná slánka se Solí na kůži.",
          "Pobožný kostelník — dědův kříž, farní požehnání a vyšší obranný blok.",
          "Moudrá bylinkářka — zásoba krejcarů, čerstvý bylinkový odvar a lehký dech.",
        ],
      },
      {
        category: "Výuka & video výcvik",
        icon: "🎓",
        items: [
          "Interaktivní výcvik s cvičným bubákem od stodoly.",
          "Automatický filmový náhled s vysvětlujícími titulky faráře.",
        ],
      },
    ],
  },
  {
    version: "v0.2.0",
    tag: "Prapůvod",
    date: "Červenec",
    title: "Založení venkovského karetního řádu",
    badge: "Prapůvod",
    flavorQuote: "„Kde selže domluva, tam pomůže svěcená voda a poctivá dubová hůl.“",
    flavorAuthor: "stará kronika hrusická",
    highlights: [
      {
        category: "Základní souboje",
        icon: "🧂",
        items: [
          "Karty Sůl, Kříž a Odvar tvořící jádro balíčku.",
          "Boj proti raráškům, bubákům od stodoly, mrtvákům a polednici.",
          "Parchmentový styl inspirovaný kresbami Josefa Lady.",
        ],
      },
    ],
  },
];

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeEntry = CHANGELOG_DATA[selectedIdx] || CHANGELOG_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#1c1308]/75 backdrop-blur-xs animate-fade-in select-none">
      <div className="lada-card max-w-2xl w-full max-h-[92vh] flex flex-col p-4 sm:p-6 border-4 border-[#1c1308] shadow-[8px_12px_0_rgba(28,19,8,0.45)] bg-[#fcf5e5]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-3 border-[#1c1308] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#f0dfb6] border-2 border-[#1c1308] flex items-center justify-center text-xl shadow-inner">
              📜
            </div>
            <div>
              <h2 className="font-title text-xl sm:text-2xl font-black text-[#1c1308] leading-tight flex items-center gap-2">
                Kronika změn & novinek
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#ffd438] border border-[#1c1308] text-[#1c1308]">
                  Changelog
                </span>
              </h2>
              <p className="text-xs font-bold text-[#694825]">
                Zápisník obecního písaře z Hrusic a Bubákova podle Josefa Lady
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#c4321d] text-white font-black border-2 border-[#1c1308] flex items-center justify-center hover:bg-[#d63d26] transition-colors shadow-sm"
            title="Zavřít kroniku"
          >
            ✕
          </button>
        </div>

        {/* Version Tabs Pill Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 border-b border-[#dfcb9a]">
          {CHANGELOG_DATA.map((entry, idx) => {
            const isSel = idx === selectedIdx;
            return (
              <button
                key={entry.version}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all whitespace-nowrap cursor-pointer
                  ${
                    isSel
                      ? "bg-[#1c1308] text-[#ffd438] border-[#1c1308] shadow-[0_2px_0_rgba(28,19,8,0.4)] scale-102"
                      : "bg-[#fff8e8] text-[#5c3e21] border-[#1c1308] hover:bg-[#f5e5c2]"
                  }
                `}
              >
                <span>{entry.version}</span>
                <span
                  className={`text-[0.65rem] px-1.5 py-0.2 rounded-full border ${isSel ? "bg-[#ffd438] text-[#1c1308] border-[#ffd438]" : "bg-[#eedcb0] text-[#70481c] border-[#1c1308]"}`}
                >
                  {entry.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Version Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm">
          {/* Version Header Card */}
          <div className="bg-[#fff9ed] p-3.5 rounded-2xl border-2 border-[#1c1308] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-title text-base sm:text-lg font-black text-[#1c1308]">
                  {activeEntry.title}
                </span>
                <span className="bg-[#e4d3aa] text-[#4a3420] text-[0.7rem] font-bold px-2 py-0.5 rounded-md border border-[#1c1308]">
                  {activeEntry.tag}
                </span>
              </div>
              <span className="text-xs font-bold text-[#8c5614] bg-[#fdf2d0] px-2 py-0.5 rounded border border-[#dfcb9a]">
                🗓️ {activeEntry.date}
              </span>
            </div>

            {/* Flavor Quote */}
            <div className="bg-[#f4ebd0] p-2.5 rounded-xl border border-[#d2ba85] text-xs italic text-[#5c3e21] flex items-start gap-2">
              <span className="text-base not-italic">🌿</span>
              <div>
                <p>{activeEntry.flavorQuote}</p>
                <p className="text-[0.7rem] font-black text-[#8c5614] not-italic mt-0.5 text-right">
                  — {activeEntry.flavorAuthor}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights Categories */}
          <div className="space-y-3">
            {activeEntry.highlights.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="bg-[#fffdf7] p-3 rounded-xl border-2 border-[#1c1308] shadow-xs"
              >
                <div className="flex items-center gap-1.5 font-title text-sm sm:text-base font-bold text-[#1c1308] border-b border-[#dfcb9a] pb-1 mb-2">
                  <span>{sec.icon}</span>
                  <span>{sec.category}</span>
                </div>
                <ul className="space-y-1.5 list-none pl-1">
                  {sec.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      className="flex items-start gap-2 text-xs font-semibold text-[#422c15] leading-relaxed"
                    >
                      <span className="text-[#8c5614] font-black mt-0.5">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Whimsical Folklore Fun Note */}
          <div className="p-3 bg-[#e8f2db] rounded-xl border-2 border-[#3e7834] flex items-center gap-3">
            <EnemySprite type="rarasek" size={44} />
            <div className="text-xs text-[#1e4616]">
              <div className="font-bold font-title text-sm text-[#1b3d14]">
                Moudrost z Bubákova a Hrusic
              </div>
              <p>
                Všechny změny jsou pečené s láskou k pohádkám Josefa Lady. Kdyby vám nějaký bubák
                škádlil balíček příliš, nezapomeňte hodit hrst soli a dát si pohodlný šlofík!
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t-2 border-[#1c1308] pt-3 mt-3 flex items-center justify-between">
          <span className="text-xs font-bold text-[#694825]">
            Verze hry: <strong>{CHANGELOG_DATA[0]?.version || "v0.5.2"}</strong> (Bubáci a
            hastrmani)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="lada-button lada-button-primary text-xs sm:text-sm py-1.5 px-5"
          >
            Rozumím & zpět k hraní
          </button>
        </div>
      </div>
    </div>
  );
};
