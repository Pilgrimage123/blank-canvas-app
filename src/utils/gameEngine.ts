import {
  GameState,
  HeroDef,
  LocationDef,
  EnemyInstance,
  CardInstance,
  CardDef,
  EnemyTypeId,
  EnemyRole,
  EnemyTemplate,
  EnemyVariantDef,
  RunOptions,
  EnemyActionId,
} from "../types";
import {
  LOCATIONS,
  ENEMY_DB,
  CARD_DB,
  HEROES,
  NODE_DB,
  UPGRADE_MAP,
  SAVE_KEY,
  OPT_KEY,
  HAND_CAP_BASE,
  BREATH_BASE,
  START_DRAW,
  ESC_THRESHOLD,
  ESC_EVERY,
  AI_WEIGHT,
} from "../data/gameData";

export function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(str: string): number {
  let h = 2166136261;
  const s = String(str || "lada");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function loadStoredOptions(): RunOptions {
  try {
    const raw = localStorage.getItem(OPT_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { scale: 12, strength: 0, density: "adaptive", seedOn: false, seed: "" };
}

export function saveStoredOptions(opt: RunOptions) {
  try {
    localStorage.setItem(OPT_KEY, JSON.stringify(opt));
  } catch (e) {}
}

export function hasSavedGame(): boolean {
  try {
    return !!localStorage.getItem(SAVE_KEY);
  } catch (e) {
    return false;
  }
}

export function clearSavedGame() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {}
}

export function saveGame(state: GameState) {
  if (!state || state.tutorial || state.movie) return;
  try {
    const copy = { ...state };
    // functions cannot be serialized
    const serializable = {
      ...copy,
      rand: undefined,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(serializable));
  } catch (e) {}
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const rng = mulberry32(hashSeed(parsed.seed + ":" + (parsed.rngStep || 0)));
    parsed.rand = rng;
    return parsed;
  } catch (e) {
    return null;
  }
}

let uidCounter = 1;
export function generateUid(): string {
  uidCounter++;
  return "c_" + Date.now().toString(36) + "_" + uidCounter;
}

export function makeCard(id: string): CardInstance {
  return { inst: generateUid(), id };
}

export function starterDeck(heroId: string, rand: () => number): CardInstance[] {
  const h = HEROES[heroId] || HEROES.pobuda;
  const list: CardInstance[] = [];
  Object.entries(h.deck).forEach(([cardId, count]) => {
    for (let i = 0; i < count; i++) {
      list.push(makeCard(cardId));
    }
  });
  return shuffleArray(list, rand);
}

export function shuffleArray<T>(arr: T[], rand: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildRunPath(rand: () => number) {
  const beforePool = [
    "zalata",
    "zkratka",
    "pripraveny",
    "hejno",
    "namraza",
    "mlha",
    "hospoda",
    "farar",
  ];
  const afterPool = ["nalez", "poklad", "myto", "past", "hospoda", "babicka_setkani"];

  return LOCATIONS.map((loc) => {
    const before = shuffleArray(beforePool, rand).slice(0, 3);
    const after = shuffleArray(afterPool, rand).slice(0, 2);
    return { locId: loc.id, before, after, cleared: false };
  });
}

export function createNewRun(heroId: string, options: RunOptions): GameState {
  const seedStr = options.seedOn && options.seed.trim() ? options.seed.trim() : String(Date.now());
  const rand = mulberry32(hashSeed(seedStr));
  const h = HEROES[heroId] || HEROES.pobuda;

  const state: GameState = {
    seed: seedStr,
    rand,
    uidn: 1,
    locIndex: 0,
    hero: h.id,
    salt: h.salt,
    hp: h.hp,
    maxHp: h.hp,
    playerReady: h.ready,
    deckAll: starterDeck(h.id, rand),
    stats: {
      fights: 0,
      kills: 0,
      dmgDealt: 0,
      dmgTaken: 0,
      saltSpent: 0,
      buys: 0,
      sleeps: 0,
      maxFatigue: 0,
    },
    options: { ...options },
    pending: null,
    shopOffer: null,
    log: ["Nové putování krajem Josefa Lady začíná."],
    phase: "map",
    rngStep: 0,
    fatigueOut: 0,
    path: buildRunPath(rand),
    combatMods: {},
  };

  saveGame(state);
  return state;
}

export function scaledNumber(
  base: number,
  level: number,
  scaleOpt: number,
  strengthOpt: number,
): number {
  const s = 1 + (scaleOpt / 100) * level + strengthOpt / 100;
  return Math.max(1, Math.round(base * s));
}

export function instantiateEnemyVariant(
  tpl: EnemyTemplate,
  variant: EnemyVariantDef,
  role: EnemyRole,
  loc: LocationDef,
  options: RunOptions,
  combatMods: any = {},
  heroReady: number = 25,
): EnemyInstance {
  let ready = tpl.ready;
  if (tpl.traits.includes("nocni") && (loc.id === "les" || loc.id === "hrbitov")) ready += 6;
  if (combatMods.enemyReadyDelta) ready += combatMods.enemyReadyDelta;
  if (role === "linie" && combatMods.bossReadyDelta) ready += combatMods.bossReadyDelta;
  ready = Math.max(8, Math.min(50, ready));

  // Base HP & Dmg from variant (already scaled by L_e / 10)
  const strengthMult = 1 + (options.strength || 0) / 100;
  let hp = Math.max(1, Math.round(variant.hp * strengthMult));
  if (tpl.traits.includes("stedry")) hp = Math.round(hp * 1.12);

  let dmg = Math.max(1, Math.round(variant.dmg * strengthMult));
  let interval = tpl.interval + (tpl.traits.includes("tezkop") ? 2 : 0);
  if (role === "podpora") interval += 1;
  interval *= 2;

  // Initial countdown is determined by enemy Připravenost (ready).
  // Delay before combat is (50 - ready) Aug. Both heroes and enemies share this formula (higher ready = earlier turn).
  const initialTimer = Math.max(2, 50 - ready);

  const variantIndex = tpl.variants
    ? tpl.variants.findIndex((v) => v.name === variant.name || v.level === variant.level)
    : 2;

  const instance: EnemyInstance = {
    uid: "e_" + generateUid(),
    tpl: tpl.id,
    name: variant.name,
    type: tpl.type,
    traits: tpl.traits.slice(),
    role,
    level: variant.level,
    variantIndex: variantIndex >= 0 ? variantIndex : 2,
    hp,
    maxHp: hp,
    dmg,
    interval,
    ready,
    odolnost: Math.max(0, Math.min(90, tpl.odolnost != null ? tpl.odolnost : 45)),
    timer: initialTimer,
    block: 0,
    nextAction: null,
    omen: 0,
    revenge: false,
    stiffen: 0,
    saltDot: 0,
    alive: true,
    uskokDodge: tpl.traits.includes("uskok"),
  };

  rollEnemyAction(instance);
  return instance;
}

export function instantiateEnemy(
  tplId: EnemyTypeId,
  level: number,
  role: "linie" | "podpora" | "delostrelba",
  options: RunOptions,
  combatMods: any = {},
  heroReady: number = 25,
): EnemyInstance {
  const normId = tplId === "certik" ? "rarasek" : tplId;
  const tpl = ENEMY_DB.find((e) => e.id === normId) || ENEMY_DB[0];
  let variant: EnemyVariantDef;
  if (tpl.variants && tpl.variants.length > 0) {
    let bestVar = tpl.variants[0];
    let bestDist = Math.abs(bestVar.level - level);
    for (const v of tpl.variants) {
      const d = Math.abs(v.level - level);
      if (d < bestDist) {
        bestDist = d;
        bestVar = v;
      }
    }
    variant = bestVar;
  } else {
    variant = {
      level,
      hp: Math.max(1, Math.round(tpl.hp * (level / 10))),
      dmg: Math.max(1, Math.round(tpl.dmg * (level / 10))),
      name: tpl.name,
    };
  }

  const dummyLoc: LocationDef = { id: "vesnice", name: "", level, entities: 1 };
  return instantiateEnemyVariant(tpl, variant, role, dummyLoc, options, combatMods, heroReady);
}

export function getActionWeight(
  actionType: EnemyActionId,
  actor: EnemyInstance,
  allEnemies: EnemyInstance[] = [],
): number {
  const A = actor.dmg + (actor.omen || 0);

  // Karty – přeskakování, pokud vyjde 0 karet
  if (actionType === "skrek" && Math.round(A / 3) === 0) return 0;
  if (actionType === "puch" && Math.round((A + 1) / 4) === 0) return 0;
  if (actionType === "vtipek" && Math.round((A + 1) / 4) === 0) return 0;

  // Léčení – nepoužívat, pokud mají všichni plné HP
  if (actionType === "bafnuti_z_dymky") {
    if (actor.hp >= actor.maxHp) return 0;
    return actor.hp / actor.maxHp < 0.5 ? 3 : 1;
  }

  if (actionType === "kouzelna_polivcicka") {
    const needsHeal = allEnemies.some((e) => e.alive && e.hp < e.maxHp);
    if (!needsHeal) return 0;
    return 2;
  }

  if (actionType === "rybnicni_mlha") {
    return 2;
  }

  // Vabnička potřebuje dalšího živého bubáka
  if (actionType === "vabnicka") {
    const hasAlly = allEnemies.some((x) => x.uid !== actor.uid && x.alive);
    if (!hasAlly) return 0;
  }

  return AI_WEIGHT[actionType] || 1;
}

export function rollEnemyAction(e: EnemyInstance, allEnemies: EnemyInstance[] = [e]) {
  const normTpl = e.tpl === "certik" ? "rarasek" : e.tpl;
  const tpl = ENEMY_DB.find((x) => x.id === normTpl) || ENEMY_DB[0];
  const pool = tpl.pool || ["uder"];
  const bag: EnemyActionId[] = [];
  pool.forEach((act) => {
    const weight = getActionWeight(act as EnemyActionId, e, allEnemies);
    for (let i = 0; i < weight; i++) bag.push(act as EnemyActionId);
  });
  e.nextAction = bag[Math.floor(Math.random() * bag.length)] || "uder";
  if (e.nextAction === "odveta") e.revenge = true;
}

export function createCombatEnemies(
  loc: LocationDef,
  options: RunOptions,
  combatMods: any,
  heroReady: number = 25,
): EnemyInstance[] {
  // If full eight bogeys test combat requested, use adjusted budget and 8 distinct types
  if (combatMods?.fullEight) {
    return createTestEightEnemies(options, heroReady, loc.id);
  }

  const L = loc.level || 10;
  // B(L) = 13 * (L / 10)
  const budget = 13 * (L / 10);

  // Density options
  let allowedCounts: number[];
  if (options.density === "samota") {
    allowedCounts = [1];
  } else if (options.density === "hlidka") {
    allowedCounts = [1, 2];
  } else if (options.density === "hejno") {
    allowedCounts = [2, 3];
  } else {
    // adaptive
    if (loc.boss) {
      allowedCounts = [1, 2];
    } else {
      allowedCounts = L <= 10 ? [1, 2] : [1, 2, 3];
    }
  }

  if (combatMods.extraEnemy) {
    allowedCounts = allowedCounts.map((c) => Math.min(3, c + 1));
  }

  // Pool of enemies at this location
  let pool = ENEMY_DB.filter((e) => e.loc.includes(loc.id));
  if (!pool.length) pool = ENEMY_DB.slice();

  interface Candidate {
    tpl: EnemyTemplate;
    variant: EnemyVariantDef;
  }

  const allCandidates: Candidate[] = [];
  pool.forEach((tpl) => {
    if (tpl.variants && tpl.variants.length > 0) {
      tpl.variants.forEach((v) => allCandidates.push({ tpl, variant: v }));
    }
  });

  // Cost formula: C_celkem = (sum(L_e)) * (1 + 0.05 * (N - 1))
  const calcCost = (team: Candidate[]) => {
    const sumLevels = team.reduce((s, c) => s + c.variant.level, 0);
    const n = team.length;
    return sumLevels * (1 + 0.05 * (n - 1));
  };

  const validTeams: Candidate[][] = [];

  if (loc.boss) {
    const bossPool = pool.filter(
      (e) => e.id === "vodnik" || e.id === "cert" || e.id === "certova_babicka",
    );
    const bossCandidates: Candidate[] = [];
    (bossPool.length ? bossPool : pool).forEach((tpl) => {
      if (tpl.variants) {
        tpl.variants.forEach((v) => bossCandidates.push({ tpl, variant: v }));
      }
    });

    for (const n of allowedCounts) {
      if (n === 1) {
        for (const bc of bossCandidates) {
          const cost = calcCost([bc]);
          if (cost <= budget * 1.05 && cost >= budget * 0.6) {
            validTeams.push([bc]);
          }
        }
      } else if (n === 2) {
        for (const bc of bossCandidates) {
          for (const mc of allCandidates) {
            const team = [bc, mc];
            const cost = calcCost(team);
            if (cost <= budget * 1.05 && cost >= budget * 0.65) {
              validTeams.push(team);
            }
          }
        }
      }
    }
  } else {
    for (const n of allowedCounts) {
      if (n === 1) {
        for (const c of allCandidates) {
          const cost = calcCost([c]);
          if (cost <= budget * 1.05 && cost >= budget * 0.6) {
            validTeams.push([c]);
          }
        }
      } else if (n === 2) {
        for (let i = 0; i < allCandidates.length; i++) {
          for (let j = i; j < allCandidates.length; j++) {
            const team = [allCandidates[i], allCandidates[j]];
            const cost = calcCost(team);
            if (cost <= budget * 1.05 && cost >= budget * 0.65) {
              validTeams.push(team);
            }
          }
        }
      } else if (n === 3) {
        for (let i = 0; i < allCandidates.length; i++) {
          for (let j = i; j < allCandidates.length; j++) {
            for (let k = j; k < allCandidates.length; k++) {
              const team = [allCandidates[i], allCandidates[j], allCandidates[k]];
              const cost = calcCost(team);
              if (cost <= budget * 1.05 && cost >= budget * 0.7) {
                validTeams.push(team);
              }
            }
          }
        }
      }
    }
  }

  // Fallback if no team fits the budget window
  if (validTeams.length === 0) {
    let bestTeam: Candidate[] = [];
    let bestDiff = Infinity;
    for (const c of allCandidates) {
      const cost = calcCost([c]);
      const diff = Math.abs(budget - cost);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestTeam = [c];
      }
    }
    if (bestTeam.length > 0) {
      validTeams.push(bestTeam);
    } else {
      const firstTpl = pool[0] || ENEMY_DB[0];
      const firstVar = (firstTpl.variants && firstTpl.variants[2]) || {
        level: 10,
        hp: 20,
        dmg: 5,
        name: firstTpl.name,
      };
      validTeams.push([{ tpl: firstTpl, variant: firstVar }]);
    }
  }

  // Sort by budget closeness and pick from the best matching ones
  validTeams.sort((a, b) => calcCost(b) - calcCost(a));
  const topCutoff = Math.max(1, Math.min(validTeams.length, Math.ceil(validTeams.length * 0.35)));
  const chosenTeam = validTeams[Math.floor(Math.random() * topCutoff)];

  const list: EnemyInstance[] = [];
  chosenTeam.forEach((member, idx) => {
    let role: EnemyRole = "linie";
    if (idx > 0) {
      role = member.tpl.roles.find((r) => r !== "linie") || member.tpl.roles[0] || "podpora";
    }
    const inst = instantiateEnemyVariant(
      member.tpl,
      member.variant,
      role,
      loc,
      options,
      combatMods,
      heroReady,
    );
    inst.row = idx < 4 ? "front" : "back";
    list.push(inst);
  });

  return list;
}

export function createTestEightEnemies(
  options: RunOptions,
  heroReady: number = 25,
  locId: any = "vesnice",
): EnemyInstance[] {
  const loc = LOCATIONS.find((l) => l.id === locId) || LOCATIONS[0];
  // 8 distinct bogey types from Josef Lada's world, 4 in front row and 4 in back row
  const eightTypeDefs: { id: EnemyTypeId; role: EnemyRole; row: "front" | "back" }[] = [
    // Přední řada (4 bojovníci na cestě blíže k lovci)
    { id: "bubak", role: "linie", row: "front" },
    { id: "rarasek", role: "linie", row: "front" },
    { id: "kostlivec", role: "linie", row: "front" },
    { id: "helkal", role: "linie", row: "front" },
    // Zadní řada (4 podporovatelé a dělostřelci na horním travnatém břehu)
    { id: "hastrman", role: "delostrelba", row: "back" },
    { id: "polednice", role: "podpora", row: "back" },
    { id: "mrtvak", role: "podpora", row: "back" },
    { id: "klekanice", role: "podpora", row: "back" },
  ];

  return eightTypeDefs.map((item, idx) => {
    const tpl = ENEMY_DB.find((e) => e.id === item.id) || ENEMY_DB[0];
    const variant = (tpl.variants && tpl.variants[1]) ||
      (tpl.variants && tpl.variants[0]) || {
        level: 6,
        hp: tpl.hp,
        dmg: tpl.dmg,
        name: tpl.name,
      };
    const inst = instantiateEnemyVariant(tpl, variant, item.role, loc, options, {}, heroReady);
    inst.row = item.row;
    // Stagger timers slightly (e.g. 5 to 14 Aug) so they don't strike in lockstep
    inst.timer = Math.max(3, inst.timer + (idx % 4) * 2);
    return inst;
  });
}

export function cardDamageCalc(def: CardDef, enemy: EnemyInstance): number {
  let d = def.dmg || 0;
  if (def.tags.includes("kriz") && enemy.traits.includes("svatokrad")) d = Math.round(d * 0.75);
  if (def.tags.includes("sul") && enemy.traits.includes("vodni")) d = Math.round(d * 1.5);
  return d;
}
