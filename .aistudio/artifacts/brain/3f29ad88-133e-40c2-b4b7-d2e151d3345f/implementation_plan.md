# Lovec bubáků — Oprava chyb, vyčištění datových struktur a odstranění mrtvého kódu

Komplexní sjednocení datového modelu, odstranění zastaralých polí a oprava herních nesrovnalostí (testovací balíčky, automatický filmový výcvik, deterministický generátor náhodných čísel a událost Nález) při plném zachování zpětné kompatibility uložených her.

## User Review & Critical Decisions

> [!IMPORTANT]
> Následující rozhodnutí vycházejí z potvrzených odpovědí a definují rozsah úprav před samotnou implementací.

- **Sjednocení datových struktur a odstranění mrtvého kódu**:
  - Sjednocení identifikátorů nepřátel (`id` a `type` bez duplicitních aliasů) a zjednodušení pozic v řadách striktně na `"front" | "back"`.
  - Odstranění nepoužívaných polí ze stavu hry, šablon nepřátel, lokací a hrdinů (včetně zakázaného `krizBonus` porušujícího pravidlo obecných pasivních schopností).
  - Odstranění zastaralého systému vylepšování (`UPGRADE_MAP`, `UPGRADE_COST`) a nepoužívaných eskalačních konstant (`ESC_THRESHOLD`, `ESC_EVERY`, `escApplied`).
- **Opravy herních chyb a nesrovnalostí**:
  - Nahrazení neexistujících ID karet v testovacích soubojích (`kosa`, `lucerna`, `srp`, `dymka`, `retez`, `kadidlo`) platnými kartami z databáze (`ostra`, `kropac`, `vretanko`, `chleb_sul`, `velkakuraz`, `rada`).
  - Oprava automatického filmového výcviku (vyřešení problému se zastaralým uzávěrem stavu v časovačích a sladění kroků s reálnými kartami v ruce).
  - Důsledné zapojení deterministického PRNG (`mulberry32` s krokem `rngStep`) namísto `Math.random()` napříč bojem, výběrem nepřátel a událostmi.
  - Doplnění 35% šance na získání bonusové karty do brašny u mapového uzlu _Zapomenutý měšec ve strouze_ (`nalez`), jak slibuje herní popis.
- **Migrace uložených her**:
  - Automatická migrace starších uložených pozic v `localStorage` na vyčištěné schéma při načtení hry (včetně normalizace řad a ID nepřátel), takže hráči nepřijdou o rozehrané putování.

---

## 1. Overview & Core Concept

- **Co úprava přináší**: Čistý, typově bezpečný datový model bez mrtvých větví a plně funkční herní mechanismy ve výcviku, testovacím studiu i samotném putování.
- **Cílový stav**: Každá karta v testovacích balíčcích má platnou definici, filmový výcvik spolehlivě odehraje celou ukázku v reálném čase, zadané semínko (seed) produkuje reprodukovatelné souboje a události na mapě přesně odpovídají svým textovým popisům.
- **Kanonické a designové souznění**: Důsledné dodržení zasazení 50 let před narozením Pepíka, zachování obecných pasivních darů hrdinů bez vazby na konkrétní karty a zápis změn do changelogu.

---

## 2. User Experience & Visual Design

- **Klíčové uživatelské toky**:
  - **Filmový výcvik**: Po klepnutí na _Filmový výcvik_ na úvodní obrazovce se spustí živá, krokovaná ukázka, která plynule provede Nádech, zahraje _Březovou metlu_ (nápřah 2 Aug), předvede _Kuráž_ pro zisk Bloku, provede _Mrknutí_ a zakončí _Vyřezávanou slánkou_ — s přesnými titulky a korektní odezvou stavu.
  - **Zkušební studio (Testovací souboje)**: Při spuštění plného střetu (8 bubáků) nebo předpřipravených sestav dostane hráč do ruky skutečné plošné a podpůrné karty (_Sůl do větru_, _Kropáč svěcené vody_, _Zlaté vřetánko_, _Pecen chleba se solí_), nikoliv duplicitní _Březové metly_ vzniklé tichým fallbackem.
  - **Mapový uzel Nález**: Při zvolení uzlu _Zapomenutý měšec ve strouze_ hráč kromě krejcarů obdrží (s 35% pravděpodobností řízenou PRNG) také užitečnou kartu přímo do brašny s přehledným oznámením v horní liště i kronice.
- **Vizuální identita a rozložení (2D karetní hra)**:
  - Zachování ladovské estetiky pergamenového plátna (`#f6ebd0`, `#fff8e8`), výrazných inkoustových kontur (`#1c1308`), přehledných číselných ukazatelů (`tabular-nums`) a dvoufázových vektorových ikon.
  - Dodržení hierarchie bojiště: dolní řada (`front`) na polní cestě a horní řada (`back`) na vyvýšeném břehu, s okamžitou vizuální odezvou do 200 ms.

---

## 3. Key Product Decisions & Trade-Offs

- **Rozhodnutí 1: Sjednocení `EnemyInstance.row` na `"front" | "back"`**
  - _Zvolený přístup_: Nahrazení šestičlenného typu `"front" | "back" | "top" | "bottom" | "horni" | "dolni"` jednoznačným `"front" | "back"` a sdíleným pomocným predikátem `isBackRow(enemy, index)`.
  - _Proč_: Odstraňuje opakované a náchylné podmínky napříč bojovou obrazovkou, posuny řad a vyhodnocováním plošných karet.
  - _Alternativy_: Ponechání českých i anglických aliasů vedlo k nekonzistenci mezi vykreslováním a herním jádrem.
- **Rozhodnutí 2: Deterministický PRNG s počítadlem kroků (`rngStep`)**
  - _Zvolený přístup_: Veškeré náhodné hody (míchání balíčku, sestavení nepřátel v lokaci, výběr záměru bubáka, cíl _Popohnání_, vmíchání _Leknutí_, šance na kartu u _Nálezu_) čerpají z deterministického generátoru `state.rand`, přičemž každý hod posune `rngStep`, jenž se ukládá do `localStorage`.
  - _Proč_: Zajistí, že zapnutá volba vlastního semínka (seedu) skutečně generuje totožné střety a po načtení uložené hry pokračuje posloupnost náhodných čísel přesně tam, kde skončila.
- **Rozhodnutí 3: Řízení filmového výcviku přes reaktivní stav místo uzávěrů v `setTimeout`**
  - _Zvolený přístup_: Kroky filmového výcviku budou řízeny stavovým indexem `movieStep` a efektem (`useEffect`), který v jednotlivých krocích spouští akce nad vždy aktuálním stavem `state`.
  - _Proč_: Původní implementace řetězila `setTimeout` uvnitř `handleStartMovie`, takže volané funkce četly původní `state === null` z uzavřeného kontextu (stale closure) a akce se neprovedly.

---

## 4. Technical Architecture & Data Strategy _(Technical Reference)_

### Architektura a tok dat

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        LocalStorage (SAVE_KEY)                          │
│        Ukládání čistého stavu + automatická migrace při načtení         │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │ migrateSavedState()             │ saveGame()
                    ▼                                 │
┌─────────────────────────────────────────────────────────────────────────┐
│                     Herní jádro & Stav (GameState)                      │
│  • Deterministický PRNG (seed + rngStep -> nextRandom)                  │
│  • Sjednocené šablony (ENEMY_DB: id === type, CARD_DB, HEROES, NODE_DB) │
│  • Čistý CombatState (enemies s row: "front" | "back", hand, draw)      │
└───────┬───────────────────────────┬───────────────────────────┬─────────┘
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│   Mapová scéna    │     │   Bojová aréna    │     │  Výcvik & Testy     │
│  • Uzly před/po   │     │  • 2 řady:        │     │  • Reaktivní        │
│  • Nález (+karta) │     │    front / back   │     │    movieStep        │
│  • Šenk & Farář   │     │  • Odpočty v Aug  │     │  • Platné karty     │
└───────────────────┘     └───────────────────┘     └─────────────────────┘
```

### Čištění datového modelu a mrtvého kódu

1. **Sjednocení typů a nepřátel**:
   - V `ENEMY_DB` sjednotit `type` tak, aby odpovídal `id` (`"bila"`, `"ohnivy"`), zatímco vykreslovací vrstva spritů (`EnemySprite`) zachová podporu pro oba názvy kvůli zpětné kompatibilitě.
   - Odstranit z `EnemyTemplate` nepoužívaná pole `band` a `shift`, z `LocationDef` nepoužívané pole `entities` a z `HeroDef` zakázané pole `krizBonus`.
   - Odstranit z `GameState` mrtvá pole (`uidn`, `pending`, `pendingAfter`, `previewNodeId`, `lastNode`, `tutorialPart`, `tutorialStep`, `tutorialForceCategory`, `tutorialForceAct`, `tutorialForceEndTurn`, `tutorialChecklist`, `_ending`) a nepoužívané fáze (`"node"`, `"discard"`, `"piles"`, `"tutorial"`).
   - Odstranit z `CombatState` nepoužívaná pole (`pendingPost`, `escApplied`) a z `EnemyInstance` nepoužívané pole `revengeHit`.
   - Odstranit mrtvé konstanty `UPGRADE_MAP`, `UPGRADE_COST`, `ESC_THRESHOLD`, `ESC_EVERY` a nepoužívané funkce `scaledNumber` a `instantiateEnemy`.

2. **Automatická migrace uložených her (`migrateSavedState`)**:
   - Při načtení z `localStorage` funkce `loadGame()` zkontroluje a očistí načtený objekt:
     - Normalizuje `row` u všech případných nepřátel v probíhajícím boji (`"top" | "horni" | "back"` -> `"back"`, ostatní -> `"front"`).
     - Doplní výchozí hodnoty pro `stats` a inicializuje deterministický generátor `rand` s uloženým počtem kroků `rngStep`.
   - Zabrání nechtěnému přepisování uložené hry při pouhém přechodu z úvodní obrazovky do _Voleb_, _Titulní obrazovky_ nebo _Zkušebního studia_ (volání `createNewRun` bez uložení do `localStorage`, dokud hráč skutečně nezahájí nové putování výběrem hrdiny).

3. **Opravy herní logiky a interakcí**:
   - **Testovací balíčky**: V plném testovacím souboji (8 bubáků) i předpřipravených soubojích použít existující karty z `CARD_DB` (`metla`, `kuraz`, `ostra`, `odvar`, `kropac`, `vretanko`, `chleb_sul`, `velkakuraz`, `rada`), aby hráč mohl otestovat plošné útoky na řadu (`intent: "row"`) i šplouchání (`intent: "splash"`).
   - **Reaktivní filmový výcvik**: Nahradit vnořené `setTimeout` volání stavem `movieStep`, který v `useEffect` postupně spouští jednotlivé herní akce a aktualizuje titulky v souladu s kartami _Březová metla_, _Kuráž_ a _Bylinkový odvar_.
   - **Uzel Nález (`nalez`)**: Při vyhodnocení uzlu použít PRNG; s 35% šancí přidat náhodnou levnou/střední kartu do `deckAll` a vypsat o tom zprávu v toast notifikaci i v kronice.
   - **Zápis do Changelogu**: Zapsat přehledný záznam nové verze `v0.9.9` do `CHANGELOG_DATA` s označením `tag: "Aktuální verze"`.
