export type LocationId = 'vesnice' | 'mlyn' | 'les' | 'rybnik' | 'zricenina' | 'hrbitov' | 'boss';

export interface LocationDef {
  id: LocationId;
  name: string;
  level: number;
  entities: number;
  boss?: boolean;
}

export type EnemyTypeId =
  | 'bubak'
  | 'certik'
  | 'rarasek'
  | 'mrtvak'
  | 'kostlivec'
  | 'polednice'
  | 'helkal'
  | 'klekanice'
  | 'hastrman'
  | 'upir'
  | 'bila'
  | 'bila_pani'
  | 'ohnivy'
  | 'ohnivy_muz'
  | 'vodnik'
  | 'hrobnik'
  | 'cert'
  | 'pavouk'
  | 'pekelne_dudy'
  | 'svitici_oko'
  | 'netopyr'
  | 'certova_babicka'
  | 'loupeznik'
  | 'lupic'
  | 'ropucha'
  | 'ohnivy_kohout'
  | 'cerny_pes'
  | 'divozenka'
  | 'jeskynka'
  | 'letajici_rarach'
  | 'lesni_muz'
  | 'rusalka'
  | 'permonik';

export type EnemyRole = 'linie' | 'podpora' | 'delostrelba';

export type EnemyActionId =
  | 'uder'
  | 'zlovest'
  | 'ukryt'
  | 'vabnicka'
  | 'odveta'
  | 'zatuhnuti'
  | 'skrek'
  | 'puch'
  | 'vtipek'
  | 'bafnuti_z_dymky'
  | 'kouzelna_polivcicka'
  | 'rybnicni_mlha';

export interface EnemyVariantDef {
  level: number;
  hp: number;
  dmg: number;
  name: string;
}

export interface EnemyTemplate {
  id: EnemyTypeId;
  name: string;
  type: string;
  loc: LocationId[];
  band: [number, number];
  traits: string[];
  roles: EnemyRole[];
  pool: EnemyActionId[];
  hp: number;
  dmg: number;
  interval: number;
  ready: number;
  odolnost?: number;
  shift?: number;
  variants: EnemyVariantDef[];
}

export interface EnemyInstance {
  uid: string;
  tpl: EnemyTypeId;
  name: string;
  type: string;
  traits: string[];
  role: EnemyRole;
  level?: number;
  variantIndex?: number;
  hp: number;
  maxHp: number;
  dmg: number;
  interval: number;
  ready: number;
  odolnost: number;
  timer: number;
  block: number;
  nextAction: EnemyActionId | null;
  omen: number;
  revenge: boolean;
  revengeHit?: boolean;
  stiffen: number;
  saltDot: number;
  alive: boolean;
  uskokDodge?: boolean;
  isHit?: boolean;
  isAttacking?: boolean;
  row?: 'front' | 'back';
}

export type CardType = 'attack' | 'defend' | 'prep' | 'junk';
export type CardIntent = 'single' | 'self' | 'row' | 'splash';

export interface CardDef {
  id: string;
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
  shop?: 'levna' | 'stred' | 'draha';
}

export interface CardInstance {
  inst: string;
  id: string;
}

export type HeroId = 'pobuda' | 'kostelnik' | 'bylinkarka' | string;

export interface HeroDef {
  id: HeroId;
  name: string;
  desc: string;
  stats: string;
  hp: number;
  ready: number;
  salt: number;
  breath: number;
  sleepFat: number;
  krizBonus?: number;
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

export interface NodeDef {
  polarity: 'kladny' | 'zaporny';
  timing: 'misto' | 'pred' | 'po';
  name: string;
  flavor: string;
  effect: string;
}

export interface RunOptions {
  scale: number;
  strength: number;
  density: 'adaptive' | 'samota' | 'hlidka' | 'hejno';
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
  pendingPost?: number;
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
  escApplied: number;
  waitingInput: boolean;
}

export interface GameState {
  seed: string;
  rand: () => number;
  uidn: number;
  locIndex: number;
  hero: string;
  salt: number;
  hp: number;
  maxHp: number;
  playerReady: number;
  deckAll: CardInstance[];
  stats: RunStats;
  options: RunOptions;
  pending: any;
  shopOffer: string[] | null;
  log: string[];
  phase: 'splash' | 'title' | 'hero' | 'map' | 'node' | 'combat' | 'shop' | 'discard' | 'piles' | 'end' | 'options' | 'tutorial' | 'test';
  rngStep: number;
  fatigueOut: number;
  path: { locId: LocationId; before: string[]; after: string[]; cleared: boolean }[];
  awaitingAfter?: boolean;
  pendingAfter?: string | null;
  combatMods?: {
    startBlock?: number;
    enemyReadyDelta?: number;
    bossReadyDelta?: number;
    extraEnemy?: number;
    breathPenalty?: number;
    handCapDelta?: number;
  };
  combat?: CombatState | null;
  previewNodeId?: string;
  lastNode?: string;
  tutorial?: boolean;
  movie?: boolean;
  tutorialPart?: number;
  tutorialStep?: number;
  tutorialForceCategory?: string[] | null;
  tutorialForceAct?: string | null;
  tutorialForceEndTurn?: boolean;
  tutorialChecklist?: Record<string, boolean>;
  _ending?: boolean;
}
