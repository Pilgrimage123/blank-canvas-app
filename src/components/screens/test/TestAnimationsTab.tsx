import React, { useState, useEffect, useRef } from "react";
import { HeroId } from "../../../types";
import { HunterSprite } from "../../sprites/HunterSprite";
import { EnemySprite } from "../../sprites/EnemySprite";
import { LadaHitParticles, LadaDizzyHalo, HitParticleTheme } from "../../sprites/LadaHitParticles";
import { sound } from "../../../lib/sound";
import { LadaThematicIcon } from "../../sprites/LadaThematicIcon";

type BogeyCategory = "strasidla" | "voda" | "peklo" | "hvozd" | "lovci";

interface BogeyOption {
  id: string;
  name: string;
  category: BogeyCategory;
  isHero?: boolean;
  desc: string;
}

const HIT_REACTION_SPECS: Record<
  string,
  {
    name: string;
    f1: string; // Frame 1 (Impact / Hitstop)
    f2: string; // Frame 2 (Peak Recoil)
    f3: string; // Frame 3 (Recovery / Cushion)
  }
> = {
  rarasek: {
    name: "Rarášek",
    f1: "Prudké vertikální smrštění (−4px). Ruce trhnou do hvězdy, hliněná dýmka vylétá z pusy šikmo vzhůru, oči se vyboulí do bílých kruhů.",
    f2: "Odmrštění vzad (−6px X, +3px Y). Ocas vystřelí dopředu mezi nohy, rohy se sklopí v záklonu, obláčky žhavého dýmu vlají za ušima.",
    f3: "Dopad na klouby rukou pro ztlumení nárazu. Dýmku chytá zpět k hrudi, ocas se nervózně stáčí do esíčka.",
  },
  mrtvak: {
    name: "Mrtvák ze škarpy",
    f1: "Náhlé ztuhlé trhnutí. Hrudní koš trhne vzad, spodní čelist bezvládně visí v nepřirozeném šikmém úhlu, z ramen odpadávají hroudy suchého bahna.",
    f2: "Těžké ochablé vrávorání vzad (−5px X). Hlava padá na jedno rameno, uschlé paže vlají za trupem jako provazy, kolena podklesávají.",
    f3: "Neohrabané protikývnutí vpřed (+2px X). Jedna noha zadupne do hlíny a zastaví pád, trup se líným trhnutím narovná.",
  },
  bubak: {
    name: "Bubák od stodoly",
    f1: "Trup se složí dovnitř jako měch tahací harmoniky. Pytlovina se zploští, žluté oční štěrbiny se doširoka rozevřou a ze švů vyletí sláma.",
    f2: "Těžký záklon o 25° vzad. Vlající šosy pytloviny letí setrvačností dopředu, stébla slámy tvoří oblouk, drápy se křečovitě semknou u hrdla.",
    f3: "Usazení zpět do nízkého podřepu. Zatřesení kápí s obláčkem prachu, šosy splývají k zemi.",
  },
  kostlivec: {
    name: "Starý kostlivec",
    f1: "Chřestivé stlačení kostí. Obratle se stlačí, lebka sjede mezi lopatky, čelist spadne do tichého výkřiku.",
    f2: "Rozhozený odraz vzad (−7px X). Žebra a pánev se roztáhnou, paže divoce vlají vzad, lebka míří ke stropu, meč/štít klesají do hlíny.",
    f3: "Zacvaknutí kostí zpět. Páteř se narovná s cvaknutím, lebka se srovná a zbraň skočí zpět do střehu.",
  },
  polednice: {
    name: "Polednice z pole",
    f1: "Ostré boční trhnutí. Vychrtlý krk škubne do strany, potrhaný šátek vylétne před tvář, ruka se srpem ztuhne v křeči.",
    f2: "Plachtění vzad v oblouku (−5px X, −2px Y). Cáry a šedé vlasy vlají vzduchem dopředu, srp se táhne po zemi, propadlá tvář plane hněvem.",
    f3: "Tvrdé zadupnutí bosé paty do země. Hrb se prohne, dráp odhrne šátek z tváře a zvedne srp do výše.",
  },
  helkal: {
    name: "Divoch hejkal",
    f1: "Tupý náraz bez hnutí. Krk zajede rovnou do mohutných chlupatých ramen, huňaté obočí zakryje planoucí oči, těžký kyj prudce poklesne.",
    f2: "Těžký valivý záklon vzad (−8px X). Mohutný trup se zakloní, vousy a kožešiny přeletí přes prsa, huba se rozevře v zuřivý řev.",
    f3: "Předkročené zapření (+3px X). Zadní noha vykopne hlínu, svalnaté paže napnou kyj do útočného střehu.",
  },
  klekanice: {
    name: "Klekánice z šera",
    f1: "Schrbení těla do těsného klubíčka. Zástěra vyletí vzhůru, soumračný zvonek udeří o bok, kostnaté prsty zakryjí ústa.",
    f2: "Skluz na křivých kolenou vzad (−6px X). Plášť vlaje za ní jako plachta, zvonek letí na provaze, prázdné důlky očí bolavě mhouří.",
    f3: "Přikrčení k zemi s opřením o klouby prstů před návratem do shrbeného plíživého kroku.",
  },
  hastrman: {
    name: "Hastrman od stoky",
    f1: "Mokrý rosolovitý squash. Zelený kabát se zploští, zmačkaný cylindr sjede na obočí, kapky vody vyletí do všech stran.",
    f2: "Skluz vzad na blánovitých patách. Pentle zeleného kabátu vlají dopředu, zelené vlasy dozadu, jazyk visí šikmo z koutku.",
    f3: "Hluboký podřep pro snížení těžiště. Palcem si posune cylindr z čela zpět, šosy klesnou nad louži.",
  },
  upir: {
    name: "Nocležní upírák",
    f1: "Ztuhlý aristokratický šok. Páteř rovná jako svíce, brada škubne vzhůru, zaprášený plášť se semkne přes hruď jako křídla.",
    f2: "Kluzký odsun vzad (−6px X). Plášť se rozevře a odhalí vestu, bledá ústa vycení tesáky, špičaté uši se přitisknou k lebce.",
    f3: "Dramatický švih pláštěm. Ruce přetáhnou lem pláště přes spodní polovinu obličeje, vzpřímený postoj se obnoví.",
  },
  bila: {
    name: "Bílá paní",
    f1: "Spektrální zčeření. Éterická podoba se svisle stlačí jako kapka vody, klíče u pasu vodorovně zacinkají, závoj se prudce zvlní.",
    f2: "Vzplývání vzad v úhlu 30° vzhůru (−5px X, −4px Y). Bílý šat vlaje dopředu, průsvitné ruce v žalu kryjí tvář, ústa tvoří plačící ovál.",
    f3: "Hladké sklouznutí zpět do klidového vznášení. Šat splývá do svislé siluety, ruce klesají ke klíčům.",
  },
  hrobnik: {
    name: "Hrobník-bubák",
    f1: "Kovové zarinčení. Násada rýče narazí pod paži, lucerna škubne do strany na řetězu, krempa klobouku zakryje oči.",
    f2: "Zavrávorání na patách vzad (−6px X). Čepel rýče se zasekne do země a zbrzdí pád, lucerna letí do horní úvrati, bezzubý škleb.",
    f3: "Předklonění a odlehčení rýče. Návrat stability, lucerna se ustálí do svislého visu, zamračený pohled se srovná.",
  },
  ohnivy: {
    name: "Ohnivý muž",
    f1: "Jádro plamene imploduje do temného uhlíku. Vnější plameny vyrazí v bleskovém výšlehu jako supernova, ústa a oči bíle vzplanou.",
    f2: "Plamenný trup se prohne vzad (−7px X). Plamen na hlavě se natáhne do kouřícího chvostu, jiskry létají dopředu, paže se rozevřou.",
    f3: "Plamen se znovu nafoukne na plný objem. Hladký návrat do vznášení s teplou oranžovou září a obíhajícími jiskrami.",
  },
  vodnik: {
    name: "Hastrman Brčál (Vodník)",
    f1: "Těžký vodní ráz. Smaragdový frak se nafoukne vodou, leštěný cylindr se zakloní, kapky vody a rákosí vytrysknou z těla.",
    f2: "Zakolísání na zadní patu (−7px X). Červené pentle vlají dopředu, paže se rozevřou a odhalí řasovou vestu, kuňkající zařvání.",
    f3: "Došlápnutí přední boty na břeh. Setřesení vody z mokrých manžet, naražení cylindru do čela s povýšeným šklebem.",
  },
  cert: {
    name: "Hospodský čert",
    f1: "Tupý úder do břicha. Tlustý krk zajede do ramen, pivo z tupláku vyšplíchne, rohy se sklopí dopředu a kolena vbočí.",
    f2: "Těžké zaškobrtnutí kopyty vzad (−7px X). Ocas vyrazí mezi nohy, kožená vesta praská na břiše, rudá tvář plane hospodským vztekem.",
    f3: "Zadupnutí kopytem do podlahy (+2px X). Zatřepání hlavou pro vyčištění mrákot, švihnutí špičkou ocasu a škubnutí uší.",
  },
  pavouk: {
    name: "Sklepní pavouk",
    f1: "Pavoučí semknutí. Všech 8 nohou se křečovitě stáhne k hlavohrudi, zadeček se přitiskne k podlaze.",
    f2: "Zacouvání na zadních 4 nohách (−6px X). Přední 4 nohy se vztyčí v obraně, z kusadel kape jed, zadeček se podtočí pod břicho.",
    f3: "Dopad nohou zpět s hbitým přešlápnutím. Zadeček se zvedne zpět do přirozeného loveckého úhlu.",
  },
  pekelne_dudy: {
    name: "Pekelné dudy",
    f1: "Vyfouknutí měchu o 40 % výšky. Kozí hlava se zalkne, pískavý proud kouře vyrazí z průduchů.",
    f2: "Překocení vzad na zadní píšťaly (−5px X). Přední píšťala míří vzhůru, kozí oči se točí v mrákotách, třásně vlají dopředu.",
    f3: "Samovolné nadechnutí měchu. Měch se s hlubokým zasípáním nafoukne, kozí hlava se vztyčí se vzdorným zamečením.",
  },
  svitici_oko: {
    name: "Svítící oko",
    f1: "Zornice se zúží na špendlíkovou hlavičku. Bulva se vodorovně zploští do oválu, chapadla vyrazí dopředu jako kopí.",
    f2: "Odmrštění vzduchem vzad (−8px X, +2px Y). Fialové žilky a nervy vzplanou, víčko křečovitě mhouří, duhovka se chvěje v důlku.",
    f3: "Hladké návratné zhoupnutí. Bulva se znovu zakulatí, zornice se roztáhne a chapadla ladně povlávají.",
  },
  netopyr: {
    name: "Jeskynní netopýr",
    f1: "Tlesknutí kožnatých křídel. Křídla se semknou přes hruď jako štít, uši se přitisknou k lebce, pokles o 3px.",
    f2: "Kotrmelec vzduchem vzad (−7px X, −3px Y). Křídla se rozevřou v divokých úhlech, zubatý čumák zaječí vzhůru, drápky hmatají v prázdnu.",
    f3: "Silný máchavý záběr dolů. Zachycení rovnováhy a vzestup do klidového vznášení s křídly nad hlavou.",
  },
  certova_babicka: {
    name: "Čertova babička",
    f1: "Dřevěné zarachocení. Váleček/koště vyletí z ruky, zástěra vylétne k pasu, šátek sjede na brýle.",
    f2: "Vrávorání na kopytech vzad (−5px X). Pazourem drží brýle na rypáčku, záda se vyhrbí do oblouku, vzteklý škleb odhalí žluté tesáky.",
    f3: "Rozhořčené dupnutí kopyty. Volnou rukou si uhladí zástěru a přísně se zadívá přes obroučky brýlí.",
  },
  loupeznik: {
    name: "Loupežník Sarka Farka",
    f1: "Tvrdý náraz do hrudníku. Široká ramena vyjedou nahoru, brada zajede do šály, klobouk s pérem poskočí o 2px.",
    f2: "Těžký dvoukrok vzad (−7px X). Ruka se sukovicí klesne, druhá drží žebra, klobouk visí nakřivo a oči lezou z důlků.",
    f3: "Došlápnutí do širokého bojového postoje. Zvednutí sukovice k rameni s agresivním odfrknutím.",
  },
  lupic: {
    name: "Lupič s bambitkami",
    f1: "Ostré trhnutí trupu o 45°. Hlavně bambitek vyletí kolmo k nebi, lem pláště prudce zašustí.",
    f2: "Hbitý úhybný skluz vzad (−8px X). Zkřížené ruce tisknou bambitky k tělu, boty ryjí štěrk, zuby cení ve vzteku.",
    f3: "Vymrštění na špičky nohou. Palcem natáhne kohoutky obou bambitek a zamíří přímo na lovce.",
  },
  ropucha: {
    name: "Bahenní ropucha",
    f1: "Masivní rosolovitý squash. Hrdelní vak se nafoukne do stran, tělo se zploští na placku, zlaté oči zajedou do lebky.",
    f2: "Skluz po břiše vzad (−6px X). Nohy se rozplácnou do stran, z bradavic kape sliz, tlama slintá bláto.",
    f3: "Mocný kuňkavý výdech. Přední nohy zvednou hruď z bahna, hrdlo jednou pulzuje a vycentruje váhu.",
  },
  ohnivy_kohout: {
    name: "Ohnivý kohout",
    f1: "Vějíř peří kolem krku se načepýří do zářícího kotouče, plamenný hřebínek potemní do karmínu, zobák klapne.",
    f2: "Popletené mávání křídly vzad (−7px X). Křídla bijí asymetricky, ocasní pera trousí jiskry, zobák zakokrhá v úleku.",
    f3: "Dopad na žluté ostruhy. Zatřesení chocholkou se znovuvzplanutím plamenů, vypnutí hrudi do pýchy.",
  },
  cerny_pes: {
    name: "Černý pes barghest",
    f1: "Trhnutí čenichem na stranu. Uši se přimknou k šíji, přední tlapky sjedou dopředu, články řetězu se napnou.",
    f2: "Vzpínající se nahrbený záklon vzad (−8px X). Zadní tlapky ryjí zem, rudé oči planou, pysky se ohrnou a odhalí bílé tesáky.",
    f3: "Nízký predátorský přikrčený postoj (+2px X). Tlapky dopadnou s rozevřenými drápy, srst na hřbetě se naježí s temným vrčením.",
  },
  divozenka: {
    name: "Divoženka lesní žínka",
    f1: "Pružné mrsknutí těla. Listová halena a věneček se škubnou, hrudník uhne z osy úderu, paže ladně vyletí.",
    f2: "Vzdušný přemet vzad (−7px X, +2px Y). Vlasy a šlahouny opisují kruh kolem trupu, bosé prsty hledají zem, oči v bolesti zavřené.",
    f3: "Kočičí dopad na špičky. Ruce se dotknou země a pružně vyskočí zpět do hravého tanečního postoje.",
  },
  jeskynka: {
    name: "Podzemní jeskyňka",
    f1: "Spastické přikrčení. Hlava zajede mezi lopatky, dlouhé prsty se sevřou v pěsti, špičaté uši se složí k lebce.",
    f2: "Skluz na skrčených zadních tlapkách (−6px X). Drápy vyškrábnou dvě rýhy v hlíně, hřbet se vyhrbí, oči divoce mhouří.",
    f3: "Nízké zavrčení u země. Otřepání hlíny z drápů, zasyčení a zdvihnutí drápů do útočné výšky.",
  },
  letajici_rarach: {
    name: "Létající rarach",
    f1: "Ztráta vztlaku v letu. Křídla se prudce přiklopí, tělo se smrští do těsné koule, žhavý ocásek šlehne dopředu.",
    f2: "Odmrštění po šikmé dráze vzad (−8px X, −3px Y). Křídla tlučou v nepravidelném rytmu, rohy se zakloní, tlama zívá v úleku.",
    f3: "Dvojí rychlé máchnutí křídly. Stabilizace výšky letu, zlostný pohled a šlehnutí kouřícím ocáskem za sebe.",
  },
  lesni_muz: {
    name: "Starý lesní muž",
    f1: "Tupý úder bez jakéhokoliv stlačení. Tuhý kmenový trup sotva uhne, jehličí a mech vystříknou do stran, oční suk pohasne.",
    f2: "Tuhý záklon kmene vzad (−5px X). Větve a kořenové prsty se setrvačností zakymácí, lišejníkový vous vlaje v těžkém oblouku.",
    f3: "Těžké zadupnutí kořenového pařátu (+2px X). Kmen se s vrznutím narovná, zelené lístky usednou zpět na větve.",
  },
  rusalka: {
    name: "Jezerní rusalka",
    f1: "Vodní splash a prohnutí. Trup se prohne jako luk, mokré prameny vlasů vystříknou před obličej, vodní mlha se rozprskne.",
    f2: "Vznášivá rotace vzad (−6px X). Bledé paže se zkříží přes srdce, vodní vlasy zahalí tvář, tesklivé oči se lesknou kapkami.",
    f3: "Hladké klesnutí dolů. Vlasy stékají zpět po ramenou v ladném, zádumčivém smutku.",
  },
  permonik: {
    name: "Permoník havíř",
    f1: "Tvrdé kamenné stlačení. Topůrko krumpáče prudce poskočí v ruce, havířská kápě sjede na nos, kožené boty drží zem.",
    f2: "Těžký havířský posun nohama vzad (−6px X). Hrot krumpáče drhne o zem s jiskrami, vous vyletí do tváře, kahanec se rozkýve.",
    f3: "Pevný rozkročený postoj. Špičkou boty vykopne krumpáč, předloktím odhrne kápi a zamračí se zpod hustého obočí.",
  },
  kmotra_liska: {
    name: "Chytrá kmotra liška",
    f1: "Trhnutí čumáčkem na stranu. Kvítečkovaný čepec vyletí z uší dopředu na nos, huňatý ocas ztuhne do přímé tyče.",
    f2: "Zabrždění na 4 tlapkách vzad (−7px X). Drápky ryjí hlínu, šňůrky zástěrky vlají, liščí tlama vyjekne v uraženém překvapení.",
    f3: "Rychlé dámské narovnání. Zatřepání hlavičkou vrátí čepec na uši, ocas se obtočí kolem tlapek v sebevědomém úsměvu.",
  },
  cert_elegan: {
    name: "Čert elegán",
    f1: "Narušená noblesa. Špička hůlky podklouzne, monokl vystřelí z oka na šňůrce, černý frak se prudce zmačká v pase.",
    f2: "Dramatické zavrávorání na lakýrkových kopytech vzad (−6px X). Ruka drží hedvábnou klopu, rohy vzad, bradka míří k nebi v pohoršení.",
    f3: "Zabrždění švihem hůlky. Prsty v letu zachytí monokl a vrátí jej před oko s ledovým pohledem.",
  },
  lotr_intelektual: {
    name: "Lotr intelektuál",
    f1: "Otřes učeného mozku. Tlusté kulaté brýle sjedou na špičku nosu, vázaný grimoár sklapne s obláčkem prachu z pergamenu.",
    f2: "Kymácení vzad s knihou přitisknutou k hrudi (−7px X). Hrot kordu padá ke kamenům, baret s pérem visí na podbradníku, ústa dokořán.",
    f3: "Kloubem prstu posune brýle zpět na kořen nosu. Uhladí akademický límec a pozvedne kord do přesného šermířského střehu.",
  },
};

const BOGEY_OPTIONS: BogeyOption[] = [
  // 1. Strašidla a zjevení (11 nepřátel)
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
    desc: "Zlobivý plamenný skřítek z venkovské pece s hliněnou dýmkou",
  },
  {
    id: "kostlivec",
    name: "Starý kostlivec",
    category: "strasidla",
    desc: "Chrastící hřbitovní kostlivec se širokým úsměvem a štítem",
  },
  {
    id: "mrtvak",
    name: "Mrtvák ze škarpy",
    category: "strasidla",
    desc: "Pobledlý tlející nebožtík s vykloubenou čelistí v roztrhaném kabátci",
  },
  {
    id: "polednice",
    name: "Polednice z pole",
    category: "strasidla",
    desc: "Hrozivá babizna s plachtou a srpem, děsící neposedy za poledního žáru",
  },
  {
    id: "klekanice",
    name: "Klekánice z šera",
    category: "strasidla",
    desc: "Večerní shrbené strašidlo s twilight zvonkem a pláštěm",
  },
  {
    id: "bila",
    name: "Bílá paní",
    category: "strasidla",
    desc: "Vznášející se hradní přízrak v bílém závoji se svazkem hradních klíčů",
  },
  {
    id: "helkal",
    name: "Divoch hejkal",
    category: "strasidla",
    desc: "Chlupatý hvozdový hejkal s těžkým kyjem a děsivým hlasem",
  },
  {
    id: "ohnivy",
    name: "Ohnivý muž",
    category: "strasidla",
    desc: "Hořící přízrak dřívějšího nenasytného rychtáře plný jisker",
  },
  {
    id: "hrobnik",
    name: "Hrobník-bubák",
    category: "strasidla",
    desc: "Starý hřbitovní boggart s železnou lucernou a těžkým rýčem",
  },
  {
    id: "svitici_oko",
    name: "Svítící oko",
    category: "strasidla",
    desc: "Tajuplná levitující oční bulva s fialovými chapadly a pulzující zornicí",
  },

  // 2. Vodní havěť (4 nepřátelé)
  {
    id: "vodnik",
    name: "Hastrman Brčál (Boss)",
    category: "voda",
    desc: "Starý vodník z Černé tůně s fajfkou, zeleným frakem a pentlemi na šosu",
  },
  {
    id: "hastrman",
    name: "Hastrman od stoky",
    category: "voda",
    desc: "Potoční vodník s pomačkaným cylindrem a kapsami plnými bláta",
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
    desc: "Velká bradavičnatá ropucha z mokřadu u mlýna s hrdelním vakem",
  },

  // 3. Pekelníci a podzemí (7 nepřátel)
  {
    id: "cert",
    name: "Hospodský čert",
    category: "peklo",
    desc: "Klasický chlupatý rohatý čert s kopytem a tuplákem piva",
  },
  {
    id: "cert_elegan",
    name: "Čert elegán",
    category: "peklo",
    desc: "Pekelník ve fraku s cylindrem, monoklem, hůlkou a vybranými způsoby",
  },
  {
    id: "permonik",
    name: "Permoník havíř",
    category: "peklo",
    desc: "Drobný podzemní skřítek s krumpáčem, mosazným kahancem a kápí",
  },
  {
    id: "certova_babicka",
    name: "Čertova babička",
    category: "peklo",
    desc: "Pekelná hospodyně s válečkem, puntíkatým šátkem a brýlemi na rypáčku",
  },
  {
    id: "pekelne_dudy",
    name: "Pekelné dudy",
    category: "peklo",
    desc: "Oživlý kožený nástroj s kroutící se kozí hlavou a kouřícími píšťalami",
  },
  {
    id: "letajici_rarach",
    name: "Létající rarach",
    category: "peklo",
    desc: "Rychlý pekelný poletuch s netopýřími křídly a žhavým ocáskem",
  },
  {
    id: "jeskynka",
    name: "Podzemní jeskyňka",
    category: "peklo",
    desc: "Skalní lesní potvůrka schovávající se ve škvírách s ostrými drápky",
  },

  // 4. Hvozd, zvířata a lapkové (11 nepřátel)
  {
    id: "kmotra_liska",
    name: "Chytrá kmotra liška",
    category: "hvozd",
    desc: "Vychytralá zrzavá liška v kvítkovaném čepci se zástěrkou a mošnou lstí",
  },
  {
    id: "loupeznik",
    name: "Loupežník Sarka Farka",
    category: "hvozd",
    desc: "Hrozivý lesní loupežník s pérem na klobouku a sukovicí",
  },
  {
    id: "lupic",
    name: "Lupič s bambitkami",
    category: "hvozd",
    desc: "Rychlý noční lapka se dvěma křesadlovými pistolemi u pasu",
  },
  {
    id: "lotr_intelektual",
    name: "Lotr intelektuál",
    category: "hvozd",
    desc: "Studovaný loupežník v baretu s kulatými brýlemi, grimoárem a kordem",
  },
  {
    id: "lesni_muz",
    name: "Starý lesní muž",
    category: "hvozd",
    desc: "Mechový vousatý ochránce hvozdu s tělem z tuhého dubového dřeva",
  },
  {
    id: "cerny_pes",
    name: "Černý pes barghest",
    category: "hvozd",
    desc: "Děsivý noční pes s řetězem a rudě planoucíma očima",
  },
  {
    id: "ohnivy_kohout",
    name: "Ohnivý kohout",
    category: "hvozd",
    desc: "Jiskřivý plamenný kohout s planoucím hřebínkem a ostruhami",
  },
  {
    id: "divozenka",
    name: "Divoženka lesní žínka",
    category: "hvozd",
    desc: "Pružná divoká dívka hvozdu s mechovým věnečkem a šlahouny",
  },
  {
    id: "pavouk",
    name: "Sklepní pavouk",
    category: "hvozd",
    desc: "Osminohý huňatý pavouk číhající v tmavých zákoutích hradního sklepení",
  },
  {
    id: "netopyr",
    name: "Jeskynní netopýr",
    category: "hvozd",
    desc: "Ušatý jeskynní letec s kožnatými křídly a ostrými zoubky",
  },
  {
    id: "upir",
    name: "Nocležní upírák",
    category: "hvozd",
    desc: "Aristokratický noční příživník v zaprášeném sametovém plášti s tesáky",
  },

  // 5. Lovci (4 hrdinové)
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
    "idle" | "atk_fluid" | "atk_frame" | "move_fluid" | "move_frame" | "hit" | "hit_frame"
  >("idle");
  const [activeFrame, setActiveFrame] = useState<number>(1);
  const [moveDir, setMoveDir] = useState<"forward" | "backward" | "lateral">("forward");
  const [hitTheme, setHitTheme] = useState<HitParticleTheme>("default");
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentBogey = BOGEY_OPTIONS.find((b) => b.id === selectedBogeyId) || BOGEY_OPTIONS[0];
  const isHunter = Boolean(currentBogey.isHero);

  const currentHitSpec = HIT_REACTION_SPECS[selectedBogeyId] || {
    name: currentBogey.name,
    f1: "Zásah a deformace siluety s komickým zábleskem.",
    f2: "Vrchol záklonu vzad s vlajícími prvky.",
    f3: "Odpružení a došlápnutí zpět do střehu.",
  };

  // Trigger fluid attack
  const triggerFluidAttack = () => {
    setAnimType("atk_fluid");
    try {
      sound.playWhoosh();
    } catch {}
    const duration = Math.round(700 / playbackSpeed);
    setTimeout(() => {
      setAnimType("idle");
    }, duration);
  };

  // Trigger fluid move (150 % pomalejší a plynulejší přesun z místa na místo)
  const triggerFluidMove = () => {
    setAnimType("move_fluid");
    try {
      sound.playCardDraw();
    } catch {}
    const duration = Math.round(1875 / playbackSpeed); // původně 750 ms, prodlouženo o 150 % na 1875 ms
    setTimeout(() => {
      setAnimType("idle");
    }, duration);
  };

  // Trigger 3-frame hit reaction (fluid)
  const triggerHit = (theme: HitParticleTheme = "default") => {
    setHitTheme(theme);
    setAnimType("hit");
    try {
      if (theme === "water" || selectedBogeyId === "vodnik" || selectedBogeyId === "rusalka") {
        sound.playSplash();
      } else {
        sound.playComicPop(isHunter ? 1.25 : 1.0);
      }
    } catch {}
    const duration = Math.round(320 / playbackSpeed);
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
      setAnimType("atk_fluid");
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
          <LadaThematicIcon name="film" size={26} animated />
          <div>
            <h2 className="font-title font-black text-base sm:text-lg text-[#1c1308] leading-tight">
              Animační zkušebna bubáků a lovců
            </h2>
            <p className="text-xs text-[#5c3e21] font-bold">
              Testujte 3-fázové zásahy všech 33 bubáků, 5-fázové útoky i skoky
            </p>
          </div>
        </div>

        {/* Category switcher pills */}
        <div className="flex flex-wrap items-center gap-1 bg-[#eedcb0] p-1 rounded-xl border border-[#1c1308]">
          {[
            { id: "strasidla" as BogeyCategory, icon: "ghost", label: "Strašidla (11)" },
            { id: "voda" as BogeyCategory, icon: "water", label: "Vodní (4)" },
            { id: "peklo" as BogeyCategory, icon: "devil", label: "Peklo (7)" },
            { id: "hvozd" as BogeyCategory, icon: "forest", label: "Hvozd (11)" },
            { id: "lovci" as BogeyCategory, icon: "hunter", label: "Lovci (4)" },
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
              <LadaThematicIcon name={cat.icon} size={14} animated />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN STUDIO GRID: PREVIEW STAGE + CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* LEFT COLUMN: THEATRICAL PREVIEW STAGE (Columns 1-5) */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <div className="bg-gradient-to-b from-[#e3effa] via-[#f7f0df] to-[#d4be94] p-4 rounded-2xl border-3 border-[#1c1308] shadow-inner relative flex flex-col items-center justify-center min-h-[290px] overflow-hidden select-none">
            {/* Ground / beaten earth bank */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#c49a6c] border-t-2 border-[#1c1308]/40" />
            <div className="absolute bottom-5 left-0 right-0 h-1.5 bg-[#8c5e31]/25" />

            {/* Folk details on floor */}
            <LadaThematicIcon
              name="field"
              size={16}
              animated
              className="absolute bottom-2 left-6 opacity-60"
            />
            <LadaThematicIcon
              name="mushroom"
              size={16}
              animated
              className="absolute bottom-3 right-8 opacity-60"
            />

            {/* Top HUD badge */}
            <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
              <span className="bg-[#1c1308]/85 text-[#ffd438] text-[0.65rem] font-black px-2.5 py-0.5 rounded-full border border-[#1c1308] shadow-xs backdrop-blur-xs truncate max-w-[200px]">
                {currentBogey.name}
              </span>
              <span className="bg-[#fff8e8]/90 text-[#1c1308] text-[0.62rem] font-bold px-2 py-0.5 rounded-full border border-[#1c1308] shadow-xs">
                {animType === "idle" && "Klidový střeh"}
                {animType === "atk_fluid" && "Plynulý útok"}
                {animType === "atk_frame" && `Útok: Fáze ${activeFrame}/5`}
                {animType === "move_fluid" && `Skok (${moveDir})`}
                {animType === "move_frame" && `Pohyb: Fáze ${activeFrame}/4`}
                {animType === "hit" && "Zásah (3 fáze plynule)"}
                {animType === "hit_frame" && `Zásah: Fáze ${activeFrame}/3`}
              </span>
            </div>

            {/* SPRITE & PARTICLES CONTAINER */}
            <div className="relative z-10 flex items-center justify-center mt-4">
              {isHunter ? (
                <div className="relative flex items-center justify-center">
                  <HunterSprite
                    heroId={selectedBogeyId as HeroId}
                    size={150}
                    isHit={animType === "hit" || animType === "hit_frame"}
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
                    hitFrame={animType === "hit_frame" ? activeFrame : undefined}
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
                title="Přehrávat animaci neustále dokola pro ladění plynulosti"
              >
                <LadaThematicIcon name="reset" size={12} animated />
                <span>{isLooping ? "Smyčka zapnuta" : "Opakovat"}</span>
              </button>
            </div>
          </div>

          {/* Lore description card for the selected creature */}
          <div className="bg-[#fff8e8] p-2.5 rounded-xl border-2 border-[#1c1308] text-xs shadow-xs">
            <div className="font-title font-black text-[#1c1308] flex items-center gap-1">
              <LadaThematicIcon name="book" size={14} animated />
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
                <LadaThematicIcon name="devil" size={14} animated />
                <span>Výběr bubáka (všech 33 k dispozici):</span>
              </span>
              <span className="text-[0.65rem] text-[#8c5614] font-bold">
                {filteredBogeys.length} postav v této kategorii
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-1">
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

          {/* 2. SPECIFICKÁ 3-FÁZOVÁ REAKCE NA ZÁSAH (NOVÉ DLE LADŮVKY) */}
          <div className="bg-[#fffdf7] p-3 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1c1308] flex items-center gap-1">
                <LadaThematicIcon name="hit" size={14} animated />
                <span>3-fázový zásah (Hitstop • Záklon • Odpružení)</span>
              </span>
              <button
                type="button"
                onClick={() => triggerHit("default")}
                className="bg-[#e63e1e] hover:bg-[#ff5233] text-white text-xs font-black px-3 py-1 rounded-xl border border-[#1c1308] shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
              >
                <LadaThematicIcon name="arrow_right" size={12} />
                <span>Přehrát 3 fáze (300 ms)</span>
              </button>
            </div>

            {/* Stepping buttons pro 3 fáze zásahu */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              {[
                {
                  frame: 1,
                  label: "1. Zásah & Hitstop",
                  sub: "Deformace & záblesk",
                  soundType: "pop",
                },
                {
                  frame: 2,
                  label: "2. Vrchol záklonu",
                  sub: "Vlající prvky & odskok",
                  soundType: "swoosh",
                },
                {
                  frame: 3,
                  label: "3. Odpružení & Došlap",
                  sub: "Cushion & návrat",
                  soundType: "draw",
                },
              ].map((f) => (
                <button
                  key={f.frame}
                  type="button"
                  onClick={() => {
                    setAnimType("hit_frame");
                    setActiveFrame(f.frame);
                    try {
                      if (f.frame === 1) sound.playComicPop();
                      else if (f.frame === 2) sound.playWhoosh();
                      else sound.playCardDraw();
                    } catch {}
                  }}
                  className={`py-2 px-1.5 rounded-xl border text-[0.68rem] font-black cursor-pointer transition-all ${
                    animType === "hit_frame" && activeFrame === f.frame
                      ? "bg-[#ffd438] border-[#1c1308] text-[#1c1308] shadow-xs"
                      : "bg-[#fff8e8] border-[#ded4be] text-[#5c3e21] hover:bg-[#ffeec2]"
                  }`}
                >
                  <div className="leading-tight">{f.label}</div>
                  <div className="text-[0.55rem] font-normal opacity-80 mt-0.5 truncate">
                    {f.sub}
                  </div>
                </button>
              ))}
            </div>

            {/* Výpis specifikace pro aktuální vybranou fázi */}
            {!isHunter && currentHitSpec && (
              <div className="bg-[#fff9ea] p-2.5 rounded-xl border border-[#1c1308]/30 text-[0.68rem] text-[#4a2e16] leading-relaxed">
                <div className="font-bold text-[#8c4b12] mb-0.5 flex items-center justify-between">
                  <span>Detail fáze pro {currentHitSpec.name}:</span>
                  <span className="text-[0.6rem] bg-[#ecdab4] px-1.5 py-0.2 rounded font-mono">
                    {animType === "hit_frame" ? `Fáze ${activeFrame}/3` : "Fáze 1 až 3"}
                  </span>
                </div>
                {animType === "hit_frame" && activeFrame === 1 && (
                  <p>
                    <strong>Fáze 1 (Hitstop / 80–100ms):</strong> {currentHitSpec.f1}
                  </p>
                )}
                {animType === "hit_frame" && activeFrame === 2 && (
                  <p>
                    <strong>Fáze 2 (Vrchol záklonu / 100ms):</strong> {currentHitSpec.f2}
                  </p>
                )}
                {animType === "hit_frame" && activeFrame === 3 && (
                  <p>
                    <strong>Fáze 3 (Odpružení / 80ms):</strong> {currentHitSpec.f3}
                  </p>
                )}
                {animType !== "hit_frame" && (
                  <p>
                    <strong>Fáze 1:</strong> {currentHitSpec.f1} • <strong>Fáze 2:</strong>{" "}
                    {currentHitSpec.f2} • <strong>Fáze 3:</strong> {currentHitSpec.f3}
                  </p>
                )}
              </div>
            )}

            {/* Paletové swapy a komické částice */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-1">
              <button
                type="button"
                onClick={() => triggerHit("default")}
                className="bg-[#ffd438] hover:bg-[#ffe066] text-[#1c1308] font-black text-[0.68rem] py-1 px-1.5 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title="Komické žluté čtyřcípé hvězdičky a obláček prachu (Bác!)"
              >
                <LadaThematicIcon name="hit" size={14} animated />
                <span>Hvězdičky Bác</span>
              </button>
              <button
                type="button"
                onClick={() => triggerHit("salt")}
                className="bg-[#fffdf2] hover:bg-[#fff7d1] text-[#704214] font-black text-[0.68rem] py-1 px-1.5 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title="Bílé krystalky soli a jiskření (Sssst!)"
              >
                <LadaThematicIcon name="salt" size={14} animated />
                <span>Zásah solí</span>
              </button>
              <button
                type="button"
                onClick={() => triggerHit("water")}
                className="bg-[#c9e8fb] hover:bg-[#a6d8f8] text-[#1c4b7d] font-black text-[0.68rem] py-1 px-1.5 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title="Rybniční kapky vody a šplíchanec (Šplouch!)"
              >
                <LadaThematicIcon name="water" size={14} animated />
                <span>Vodní kapky</span>
              </button>
              <button
                type="button"
                onClick={() => triggerHit(isHunter ? "hero" : "devil")}
                className="bg-[#fce0d8] hover:bg-[#ffd1c4] text-[#8c2210] font-black text-[0.68rem] py-1 px-1.5 rounded-xl border border-[#1c1308] shadow-2xs active:scale-95 transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                title={
                  isHunter
                    ? "Hrdinské drobky chleba, bylinky a pírka"
                    : "Pekelné černé saze a žhavé jiskry"
                }
              >
                <LadaThematicIcon name={isHunter ? "block" : "fire"} size={14} animated />
                <span>{isHunter ? "Hrdina zásah" : "Pekelné saze"}</span>
              </button>
            </div>
          </div>

          {/* 3. SELECTION OF ANIMATION TYPE (5-fázový útok) */}
          <div className="bg-[#fffdf7] p-3 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1c1308] flex items-center gap-1">
                <LadaThematicIcon name="attack" size={14} animated />
                <span>5-fázový útok</span>
              </span>
              <button
                type="button"
                onClick={triggerFluidAttack}
                className="bg-[#e63e1e] hover:bg-[#ff5233] text-white text-xs font-black px-3 py-1 rounded-xl border border-[#1c1308] shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
              >
                <LadaThematicIcon name="arrow_right" size={12} />
                <span>Přehrát útok</span>
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

          {/* 4. SELECTION OF ANIMATION TYPE (4-fázový pohyb pro bubáky) */}
          {!isHunter && (
            <div className="bg-[#fffdf7] p-3 rounded-2xl border-2 border-[#1c1308] shadow-[0_3px_0_#1c1308] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-xs font-black text-[#1c1308] flex items-center gap-1">
                  <LadaThematicIcon name="paw" size={14} animated />
                  <span>4-fázový pohyb & skok</span>
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
                    <LadaThematicIcon name="arrow_right" size={12} />
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

          {/* Quick Reset to idle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[0.7rem] text-[#7a542b] font-bold">
              Tip: Všech 33 bubáků má unikátní 3-fázovou reakci podle specifikace.
            </span>
            <button
              type="button"
              onClick={() => {
                setAnimType("idle");
                setIsLooping(false);
              }}
              className="text-xs font-black text-[#8c5614] hover:text-[#1c1308] bg-[#eedcb0] hover:bg-[#ffd438] px-3 py-1 rounded-lg border border-[#1c1308] cursor-pointer transition-all flex items-center gap-1"
            >
              <LadaThematicIcon name="reset" size={14} animated />
              <span>Klidový stav (Střeh)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
