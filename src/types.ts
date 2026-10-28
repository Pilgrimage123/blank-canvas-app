export type LocationId = "vesnice" | "mlyn" | "les" | "rybnik" | "zricenina" | "hrbitov" | "boss";

export interface LocationDef {
  id: LocationId;
  name: string;
  level: number;
  boss?: boolean;
}

export type TraitId =
  "svatokrad" | "nakaza" | "uskok" | "tezkop" | "nocni" | "vodni" | "skoupy" | "stedry";

export type EnemyTypeId =
  | "bubak"
  | "rarasek"
  | "mrtvak"
  | "kostlivec"
  | "polednice"
  | "helkal"
  | "klekanice"
  | "hastrman"
  | "upir"
  | "bila"
  | "ohnivy"
  | "vodnik"
  | "hrobnik"
  | "cert"
  | "pavouk"
  | "pekelne_dudy"
  | "svitici_oko"
  | "netopyr"
  | "certova_babicka"
  | "loupeznik"
  | "lupic"
  | "ropucha"
  | "ohnivy_kohout"
  | "cerny_pes"
  | "divozenka"
  | "jeskynka"
  | "letajici_rarach"
  | "lesni_muz"
  | "rusalka"
  | "permonik"
  | "kmotra_liska"
  | "cert_elegan"
  | "lotr_intelektual";

export type EnemyRole = "linie" | "podpora" | "delostrelba";

export type EnemyRow = "front" | "back";

export type EnemyActionId =
  | "uder"
  | "zlovest"
  | "ukryt"
  | "vabnicka"
  | "odveta"
  | "zatuhnuti"
  | "skrek"
  | "puch"
  | "vtipek"
  | "bafnuti_z_dymky"
  | "kouzelna_polivcicka"
  | "rybnicni_mlha";

export interface EnemyVariantDef {
  level: number;
  hp: number;
  dmg: number;
  name: string;
}

export interface EnemyTemplate {
  id: EnemyTypeId;
  name: string;
  type: EnemyTypeId;
  loc: LocationId[];
  traits: TraitId[];
  roles: EnemyRole[];
  pool: EnemyActionId[];
  hp: number;
  dmg: number;
  interval: number;
  ready: number;
  odolnost?: number;
  variants: EnemyVariantDef[];
}

export interface EnemyCandidate {
  tpl: EnemyTemplate;
  variant: EnemyVariantDef;
  variantIndex: number;
}

export interface EnemyInstance {
  uid: string;
  tpl: EnemyTypeId;
  name: string;
  type: EnemyTypeId;
  traits: TraitId[];
  role: EnemyRole;
  level?: number;
  variantIndex?: number;
  hp: number;
  maxHp: number;
  rewardGiven?: boolean;
  dmg: number;
  interval: number;
  ready: number;
  odolnost: number;
  timer: number;
  block: number;
  nextAction: EnemyActionId | null;
  omen: number;
  revenge: boolean;
  stiffen: number;
  saltDot: number;
  alive: boolean;
  uskokDodge?: boolean;
  isHit?: boolean;
  hitNonce?: number;
  hitFrame?: number;
  isAttacking?: boolean;
  attackFrame?: number;
  isMoving?: boolean;
  moveFrame?: number;
  moveDirection?: "forward" | "backward" | "up" | "down" | "lateral";
  row: EnemyRow;
}

export type CardType = "attack" | "defend" | "prep" | "junk";
export type CardIntent = "single" | "self" | "row" | "splash";
export type ShopTier = "levna" | "stred" | "draha";

export type CardId =
  | "metla"
  | "ostra_metla"
  | "kuraz"
  | "velkakuraz"
  | "sul"
  | "kriz"
  | "odvar"
  | "ostra"
  | "velkykriz"
  | "kosik"
  | "kropac"
  | "rada"
  | "ukrok"
  | "slofik"
  | "hole"
  | "leknuti"
  | "smradek"
  | "mokra_lumparna"
  | "vretanko"
  | "chleb_sul"
  | "barunka_rada"
  | string;

export interface CardDef {
  id: CardId;
  name: string;
  type: CardType;
  cost: number;
  pre: number;
  post: number;
  intent: CardIntent;
  tags: string[];
  text: string;
  flavor?: string;
  dmg?: number;
  block?: number;
  dodge?: number;
  fatigue?: number;
  draw?: number;
  dot?: number;
  stiffen?: number;
  shop?: ShopTier;
}

export interface CardInstance {
  inst: string;
  id: CardId;
  stars?: number;
}

export interface ShopOfferItem {
  id: CardId;
  stars?: number;
}

export type HeroId = "pobuda" | "kostelnik" | "bylinkarka" | "babicka" | string;

export interface HeroDef {
  id: HeroId;
  name: string;
  desc: string;
  stats: string;
  passiveName: string;
  passiveDesc: string;
  hp: number;
  ready: number;
  salt: number;
  breath: number;
  sleepFat: number;
  defendBonus?: number;
  prepFatigueBonus?: number;
  startBlock?: number;
  startDodge?: number;
  extraStartCards?: number;
  enemyStartDelay?: number;
  deck: Record<string, number>;
  special: {
    id: string;
    name: string;
    label: string;
    cd: number;
    dmg?: number;
    dot?: number;
    block?: number;
    draw?: number;
    fat?: number;
  };
}

export type NodeId =
  | "babicka_setkani"
  | "hospoda"
  | "farar"
  | "nalez"
  | "zalata"
  | "zkratka"
  | "pripraveny"
  | "hejno"
  | "namraza"
  | "mlha"
  | "myto"
  | "poklad"
  | "past"
  | string;

export interface NodeDef {
  polarity: "kladny" | "zaporny";
  timing: "misto" | "pred" | "po";
  name: string;
  flavor: string;
  effect: string;
}

export interface RunOptions {
  scale: number;
  strength: number;
  density: "adaptive" | "samota" | "hlidka" | "hejno";
  seedOn: boolean;
  seed: string;
}

export interface RunStats {
  fights: number;
  kills: number;
  dmgDealt: number;
  dmgTaken: number;
  saltSpent: number;
  buys: number;
  sleeps: number;
  maxFatigue: number;
}

export interface CombatState {
  locId: LocationId;
  time: number;
  actions: number;
  block: number;
  dodge: number;
  fatigue: number;
  handCap: number;
  breathPen: number;
  playerTimer: number;
  playerBusy: string | null;
  pendingCard: { card: CardInstance; target: string | null } | null;
  cdBreath: number;
  cdSleep: number;
  cdSpecial: number;
  cdIdea: number;
  cdScenery: number;
  extraPost: number;
  pauseTime: boolean;
  enemies: EnemyInstance[];
  focus: string | null;
  draw: CardInstance[];
  discard: CardInstance[];
  hand: CardInstance[];
  waitingInput: boolean;
}

export type GamePhase =
  "splash" | "title" | "hero" | "map" | "combat" | "shop" | "end" | "options" | "test";

export interface GameState {
  seed: string;
  rand: () => number;
  rngStep: number;
  locIndex: number;
  hero: string;
  salt: number;
  hp: number;
  maxHp: number;
  playerReady: number;
  deckAll: CardInstance[];
  stats: RunStats;
  options: RunOptions;
  shopOffer: ShopOfferItem[] | null;
  log: string[];
  phase: GamePhase;
  fatigueOut: number;
  path: { locId: LocationId; before: string[]; after: string[]; cleared: boolean }[];
  awaitingAfter?: boolean;
  combatMods?: {
    startBlock?: number;
    enemyReadyDelta?: number;
    bossReadyDelta?: number;
    extraEnemy?: number;
    breathPenalty?: number;
    handCapDelta?: number;
  };
  combat?: CombatState | null;
  tutorial?: boolean;
  movie?: boolean;
}
