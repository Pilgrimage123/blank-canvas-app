import {
  GameState,
  LocationDef,
  LocationId,
  EnemyInstance,
  EnemyRow,
  CardInstance,
  CardDef,
  EnemyTypeId,
  EnemyRole,
  EnemyTemplate,
  EnemyVariantDef,
  EnemyCandidate,
  RunOptions,
  RunStats,
  EnemyActionId,
  CardIntent,
  ShopOfferItem,
} from "../types";
import {
  LOCATIONS,
  LOCATION_BY_ID,
  ENEMY_DB,
  ENEMY_BY_ID,
  CANDIDATES_BY_LOCATION,
  BOSS_CANDIDATES_BY_LOCATION,
  SHOP_POOLS,
  BEFORE_NODES_POOL,
  AFTER_NODES_POOL,
  HEROES,
  SAVE_KEY,
  OPT_KEY,
  AI_WEIGHT,
  starValueMult,
  rollShopCardStars,
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

export function normalizeEnemyTypeId(id?: string): EnemyTypeId {
  if (!id || id === "certik") return "rarasek";
  if (id === "bila_pani") return "bila";
  if (id === "ohnivy_muz") return "ohnivy";
  const found = ENEMY_BY_ID[id as EnemyTypeId];
  return found ? found.id : "rarasek";
}

export function normalizeEnemyRow(row?: string, idx: number = 0): EnemyRow {
  if (row === "back" || row === "top" || row === "horni" || (!row && idx >= 4)) {
    return "back";
  }
  return "front";
}

export function loadStoredOptions(): RunOptions {
  try {
    const raw = localStorage.getItem(OPT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { scale: 12, strength: 0, density: "adaptive", seedOn: false, seed: "" };
}

export function saveStoredOptions(opt: RunOptions) {
  try {
    localStorage.setItem(OPT_KEY, JSON.stringify(opt));
  } catch {}
}

export function hasSavedGame(): boolean {
  try {
    return !!localStorage.getItem(SAVE_KEY);
  } catch {
    return false;
  }
}

export function clearSavedGame() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {}
}

export function saveGame(state: GameState) {
  if (!state || state.tutorial || state.movie) return;
  try {
    const serializable = {
      ...state,
      rand: undefined,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(serializable));
  } catch {}
}

function attachTrackedRng(state: GameState) {
  const baseRng = mulberry32(hashSeed(state.seed));
  const initialSteps = Math.max(0, state.rngStep || 0);
  for (let i = 0; i < initialSteps; i++) {
    baseRng();
  }
  state.rngStep = initialSteps;
  state.rand = () => {
    state.rngStep = (state.rngStep || 0) + 1;
    return baseRng();
  };
}

export function normalizeShopOffer(item: string | ShopOfferItem): ShopOfferItem {
  if (typeof item === "string") return { id: item, stars: 0 };
  return { id: item.id, stars: item.stars || 0 };
}

export function migrateSavedState(rawState: any): GameState {
  const heroId = rawState.hero && HEROES[rawState.hero] ? rawState.hero : "pobuda";
  const heroDef = HEROES[heroId] || HEROES.pobuda;

  const validPhases = new Set([
    "splash",
    "title",
    "hero",
    "map",
    "combat",
    "shop",
    "end",
    "options",
    "test",
  ]);
  const phase = validPhases.has(rawState.phase) ? rawState.phase : "map";

  let migratedCombat = rawState.combat || null;
  if (migratedCombat && Array.isArray(migratedCombat.enemies)) {
    const normEnemies: EnemyInstance[] = migratedCombat.enemies.map((e: any, idx: number) => {
      const tplId = normalizeEnemyTypeId(e.tpl || e.type);
      const tpl = ENEMY_BY_ID[tplId] || ENEMY_DB[0];
      return {
        uid: e.uid || "e_" + generateUid(),
        tpl: tpl.id,
        name: e.name || tpl.name,
        type: tpl.type,
        traits: Array.isArray(e.traits) ? e.traits : tpl.traits.slice(),
        role: e.role || "linie",
        row: normalizeEnemyRow(e.row, idx),
        level: e.level ?? 10,
        variantIndex: e.variantIndex ?? 2,
        hp: typeof e.hp === "number" ? e.hp : tpl.hp,
        maxHp: typeof e.maxHp === "number" ? e.maxHp : tpl.hp,
        dmg: typeof e.dmg === "number" ? e.dmg : tpl.dmg,
        interval: typeof e.interval === "number" ? e.interval : tpl.interval * 2,
        ready: typeof e.ready === "number" ? e.ready : tpl.ready,
        odolnost: typeof e.odolnost === "number" ? e.odolnost : tpl.odolnost || 45,
        timer: typeof e.timer === "number" ? e.timer : Math.max(2, 50 - tpl.ready),
        block: e.block || 0,
        nextAction: e.nextAction || "uder",
        omen: e.omen || 0,
        revenge: Boolean(e.revenge),
        stiffen: e.stiffen || 0,
        saltDot: e.saltDot || 0,
        alive: e.alive !== false && (e.hp ?? 1) > 0,
        uskokDodge: Boolean(e.uskokDodge),
        rewardGiven: Boolean(e.rewardGiven),
      };
    });

    migratedCombat = {
      locId: migratedCombat.locId || LOCATIONS[rawState.locIndex || 0]?.id || "vesnice",
      time: migratedCombat.time || 0,
      actions: migratedCombat.actions ?? heroDef.breath * 2,
      block: migratedCombat.block || 0,
      dodge: migratedCombat.dodge || 0,
      fatigue: migratedCombat.fatigue || 0,
      handCap: migratedCombat.handCap || 7,
      breathPen: migratedCombat.breathPen || 0,
      playerTimer: migratedCombat.playerTimer || 0,
      playerBusy: migratedCombat.playerBusy || null,
      pendingCard: migratedCombat.pendingCard || null,
      cdBreath: migratedCombat.cdBreath || 0,
      cdSleep: migratedCombat.cdSleep || 0,
      cdSpecial: migratedCombat.cdSpecial || 0,
      cdIdea: migratedCombat.cdIdea || 0,
      cdScenery: migratedCombat.cdScenery || 0,
      extraPost: migratedCombat.extraPost || 0,
      pauseTime: Boolean(migratedCombat.pauseTime),
      enemies: normEnemies,
      focus: migratedCombat.focus || normEnemies[0]?.uid || null,
      draw: Array.isArray(migratedCombat.draw) ? migratedCombat.draw : [],
      discard: Array.isArray(migratedCombat.discard) ? migratedCombat.discard : [],
      hand: Array.isArray(migratedCombat.hand) ? migratedCombat.hand : [],
      waitingInput: Boolean(migratedCombat.waitingInput),
    };
  }

  const normalizedShopOffer: ShopOfferItem[] | null = Array.isArray(rawState.shopOffer)
    ? rawState.shopOffer.map(normalizeShopOffer)
    : null;

  const migrated: GameState = {
    seed: String(rawState.seed || "lada"),
    rand: Math.random,
    locIndex: Math.max(0, Math.min(LOCATIONS.length - 1, rawState.locIndex || 0)),
    hero: heroId,
    salt: typeof rawState.salt === "number" ? rawState.salt : heroDef.salt,
    hp: typeof rawState.hp === "number" ? rawState.hp : heroDef.hp,
    maxHp: typeof rawState.maxHp === "number" ? rawState.maxHp : heroDef.hp,
    playerReady: typeof rawState.playerReady === "number" ? rawState.playerReady : heroDef.ready,
    deckAll: Array.isArray(rawState.deckAll) ? rawState.deckAll : [],
    stats: {
      fights: rawState.stats?.fights || 0,
      kills: rawState.stats?.kills || 0,
      dmgDealt: rawState.stats?.dmgDealt || 0,
      dmgTaken: rawState.stats?.dmgTaken || 0,
      saltSpent: rawState.stats?.saltSpent || 0,
      buys: rawState.stats?.buys || 0,
      sleeps: rawState.stats?.sleeps || 0,
      maxFatigue: rawState.stats?.maxFatigue || 0,
    },
    options: rawState.options || loadStoredOptions(),
    shopOffer: normalizedShopOffer,
    log: Array.isArray(rawState.log) ? rawState.log : [],
    phase,
    rngStep: rawState.rngStep || 0,
    fatigueOut: rawState.fatigueOut || 0,
    path: Array.isArray(rawState.path) ? rawState.path : [],
    combatMods: rawState.combatMods || {},
    awaitingAfter: Boolean(rawState.awaitingAfter),
    combat: migratedCombat,
  };

  attachTrackedRng(migrated);
  if (migrated.deckAll.length === 0) {
    migrated.deckAll = starterDeck(heroId, migrated.rand);
  }
  if (migrated.path.length === 0) {
    migrated.path = buildRunPath(migrated.rand);
  }

  return migrated;
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const migrated = migrateSavedState(parsed);
    saveGame(migrated);
    return migrated;
  } catch {
    return null;
  }
}

let uidCounter = 1;
export function generateUid(): string {
  uidCounter++;
  return "c_" + Date.now().toString(36) + "_" + uidCounter;
}

export function makeCard(id: string, stars: number = 0): CardInstance {
  return { inst: generateUid(), id, stars: stars || 0 };
}

export function starterDeck(heroId: string, rand: () => number): CardInstance[] {
  const h = HEROES[heroId] || HEROES.pobuda;
  const list: CardInstance[] = [];
  for (const [cardId, count] of Object.entries(h.deck)) {
    for (let i = 0; i < count; i++) {
      list.push(makeCard(cardId, 0));
    }
  }
  return shuffleArray(list, rand);
}

export function shuffleArray<T>(arr: readonly T[], rand: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pure, high-performance card draw helper that avoids O(N) array.shift() in loops
 * and reshuffles the discard pile deterministically when the draw pile is exhausted.
 */
export function drawCardsFromPiles(
  drawPile: readonly CardInstance[],
  discardPile: readonly CardInstance[],
  handPile: readonly CardInstance[],
  count: number,
  rand: () => number = Math.random,
): { draw: CardInstance[]; discard: CardInstance[]; hand: CardInstance[] } {
  if (count <= 0) {
    return {
      draw: drawPile.slice(),
      discard: discardPile.slice(),
      hand: handPile.slice(),
    };
  }

  let draw = drawPile.slice();
  let discard = discardPile.slice();
  const hand = handPile.slice();

  let remaining = count;
  while (remaining > 0) {
    if (draw.length === 0) {
      if (discard.length === 0) break;
      draw = shuffleArray(discard, rand);
      discard = [];
    }
    const take = Math.min(remaining, draw.length);
    for (let i = 0; i < take; i++) {
      hand.push(draw[i]);
    }
    draw = draw.slice(take);
    remaining -= take;
  }

  return { draw, discard, hand };
}

/**
 * Unified defeated enemy processor: grants krejcary rewards (respecting skoupy/stedry traits)
 * and applies nakaza (contagion) countdown acceleration to surviving enemies.
 */
export function resolveDefeatedEnemies(
  enemies: EnemyInstance[],
  locIndex: number,
  initialSalt: number,
  stats: RunStats,
  initialLogs: string[],
  addLogFn: (msg: string, prevLogs: string[]) => string[],
): { salt: number; logs: string[] } {
  let salt = initialSalt;
  let logs = initialLogs;

  for (let i = 0; i < enemies.length; i++) {
    const e = enemies[i];
    if (!e.alive && e.hp <= 0 && !e.rewardGiven) {
      stats.kills += 1;
      let reward = 4 + locIndex;
      const isSkoupy = e.traits.includes("skoupy");
      const isStedry = e.traits.includes("stedry");
      if (isSkoupy) reward = Math.max(1, Math.round(reward * 0.75));
      if (isStedry) reward = Math.round(reward * 1.3);
      salt += reward;
      e.rewardGiven = true;

      const traitNote = isStedry ? " (+30 % Štědrý)" : isSkoupy ? " (−25 % Skoupý)" : "";
      logs = addLogFn(`${e.name} se rozplynul! Získáváte +${reward} krejcarů${traitNote}.`, logs);

      if (e.traits.includes("nakaza")) {
        logs = addLogFn(`Nákaza z ${e.name} popohnala odpočet ostatních nepřátel (-2 Aug)!`, logs);
        for (let j = 0; j < enemies.length; j++) {
          const other = enemies[j];
          if (other.alive && other.uid !== e.uid) {
            other.timer = Math.max(0, other.timer - 2);
          }
        }
      }
    }
  }

  return { salt, logs };
}

export function generateShopOffer(rand?: () => number): ShopOfferItem[] {
  const r = rand || Math.random;
  const cheapPool = SHOP_POOLS.levna;
  const midPool = SHOP_POOLS.stred;
  const rarePool = SHOP_POOLS.draha;

  const c = cheapPool[Math.floor(r() * cheapPool.length)] || "metla";
  const m = midPool[Math.floor(r() * midPool.length)] || "odvar";
  const combined = [...midPool, ...rarePool].filter((x) => x !== m);
  const third = combined[Math.floor(r() * combined.length)] || "kriz";

  return [
    { id: c, stars: rollShopCardStars(r) },
    { id: m, stars: rollShopCardStars(r) },
    { id: third, stars: rollShopCardStars(r) },
  ];
}

export function buildRunPath(rand: () => number) {
  return LOCATIONS.map((loc) => {
    const before = shuffleArray(BEFORE_NODES_POOL, rand).slice(0, 3);
    const after = shuffleArray(AFTER_NODES_POOL, rand).slice(0, 2);
    return { locId: loc.id, before, after, cleared: false };
  });
}

export function createNewRun(
  heroId: string,
  options: RunOptions,
  persist: boolean = true,
): GameState {
  const seedStr = options.seedOn && options.seed.trim() ? options.seed.trim() : String(Date.now());
  const h = HEROES[heroId] || HEROES.pobuda;

  const state: GameState = {
    seed: seedStr,
    rand: Math.random,
    locIndex: 0,
    hero: h.id,
    salt: h.salt,
    hp: h.hp,
    maxHp: h.hp,
    playerReady: h.ready,
    deckAll: [],
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
    shopOffer: null,
    log: ["Nové putování krajem Josefa Lady začíná."],
    phase: "map",
    rngStep: 0,
    fatigueOut: 0,
    path: [],
    combatMods: {},
  };

  attachTrackedRng(state);
  state.deckAll = starterDeck(h.id, state.rand);
  state.path = buildRunPath(state.rand);

  if (persist) {
    saveGame(state);
  }
  return state;
}

export function instantiateEnemyVariant(
  tpl: EnemyTemplate,
  variant: EnemyVariantDef,
  role: EnemyRole,
  loc: LocationDef,
  options: RunOptions,
  combatMods: any = {},
  heroReady: number = 25,
  rand: () => number = Math.random,
  knownVariantIndex?: number,
): EnemyInstance {
  let ready = tpl.ready;
  if (tpl.traits.includes("nocni") && (loc.id === "les" || loc.id === "hrbitov")) ready += 6;
  if (combatMods.enemyReadyDelta) ready += combatMods.enemyReadyDelta;
  if (role === "linie" && combatMods.bossReadyDelta) ready += combatMods.bossReadyDelta;
  ready = Math.max(8, Math.min(50, ready));

  const strengthMult = 1 + (options.strength || 0) / 100;
  let hp = Math.max(1, Math.round(variant.hp * strengthMult));
  if (tpl.traits.includes("stedry")) hp = Math.round(hp * 1.12);

  const dmg = Math.max(1, Math.round(variant.dmg * strengthMult));
  let interval = tpl.interval + (tpl.traits.includes("tezkop") ? 2 : 0);
  if (role === "podpora") interval += 1;
  interval *= 2;

  const initialTimer = Math.max(2, 50 - ready);

  const variantIndex =
    knownVariantIndex !== undefined
      ? knownVariantIndex
      : tpl.variants
        ? tpl.variants.findIndex((v) => v.name === variant.name || v.level === variant.level)
        : 2;

  const instance: EnemyInstance = {
    uid: "e_" + generateUid(),
    tpl: tpl.id,
    name: variant.name,
    type: tpl.type,
    traits: tpl.traits.slice(),
    role,
    row: "front",
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

  rollEnemyAction(instance, [instance], rand);
  return instance;
}

export function getActionWeight(
  actionType: EnemyActionId,
  actor: EnemyInstance,
  allEnemies: EnemyInstance[] = [],
): number {
  const A = actor.dmg + (actor.omen || 0);

  if (actionType === "skrek" && Math.round(A / 3) === 0) return 0;
  if (actionType === "puch" && Math.round((A + 1) / 4) === 0) return 0;
  if (actionType === "vtipek" && Math.round((A + 1) / 4) === 0) return 0;

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

  if (actionType === "vabnicka") {
    const hasAlly = allEnemies.some((x) => x.uid !== actor.uid && x.alive);
    if (!hasAlly) return 0;
  }

  return AI_WEIGHT[actionType] || 1;
}

export function rollEnemyAction(
  e: EnemyInstance,
  allEnemies: EnemyInstance[] = [e],
  rand: () => number = Math.random,
) {
  const normTpl = normalizeEnemyTypeId(e.tpl);
  const tpl = ENEMY_BY_ID[normTpl] || ENEMY_DB[0];
  const pool = tpl.pool || ["uder"];
  const bag: EnemyActionId[] = [];
  for (let p = 0; p < pool.length; p++) {
    const act = pool[p];
    const weight = getActionWeight(act, e, allEnemies);
    for (let i = 0; i < weight; i++) bag.push(act);
  }
  e.nextAction = bag[Math.floor(rand() * bag.length)] || "uder";
  if (e.nextAction === "odveta") e.revenge = true;
}

export function createCombatEnemies(
  loc: LocationDef,
  options: RunOptions,
  combatMods: any,
  heroReady: number = 25,
  rand: () => number = Math.random,
): EnemyInstance[] {
  if (combatMods?.fullEight) {
    return createTestEightEnemies(options, heroReady, loc.id, rand);
  }

  const L = loc.level || 10;
  const budget = 13 * (L / 10);

  let allowedCounts: number[];
  if (options.density === "samota") {
    allowedCounts = [1];
  } else if (options.density === "hlidka") {
    allowedCounts = [1, 2];
  } else if (options.density === "hejno") {
    allowedCounts = [2, 3];
  } else {
    allowedCounts = loc.boss ? [1, 2] : L <= 10 ? [1, 2] : [1, 2, 3];
  }

  if (combatMods.extraEnemy) {
    allowedCounts = allowedCounts.map((c) => Math.min(3, c + 1));
  }

  // O(1) lookup of pre-indexed candidates for this location
  const allCandidates = CANDIDATES_BY_LOCATION[loc.id] || CANDIDATES_BY_LOCATION.vesnice;

  const calcCost = (team: EnemyCandidate[]) => {
    let sumLevels = 0;
    for (let i = 0; i < team.length; i++) {
      sumLevels += team[i].variant.level;
    }
    return sumLevels * (1 + 0.05 * (team.length - 1));
  };

  const validTeams: EnemyCandidate[][] = [];
  const maxAllowedCost = budget * 1.05;

  if (loc.boss) {
    const bossCandidates = BOSS_CANDIDATES_BY_LOCATION[loc.id] || allCandidates;
    const minCost1 = budget * 0.6;
    const minCost2 = budget * 0.65;

    for (const n of allowedCounts) {
      if (n === 1) {
        for (let i = 0; i < bossCandidates.length; i++) {
          const bc = bossCandidates[i];
          const cost = bc.variant.level;
          if (cost <= maxAllowedCost && cost >= minCost1) {
            validTeams.push([bc]);
          }
        }
      } else if (n === 2) {
        for (let i = 0; i < bossCandidates.length; i++) {
          const bc = bossCandidates[i];
          for (let j = 0; j < allCandidates.length; j++) {
            const mc = allCandidates[j];
            const cost = (bc.variant.level + mc.variant.level) * 1.05;
            if (cost <= maxAllowedCost && cost >= minCost2) {
              validTeams.push([bc, mc]);
            }
          }
        }
      }
    }
  } else {
    const minCost1 = budget * 0.6;
    const minCost2 = budget * 0.65;
    const minCost3 = budget * 0.7;

    for (const n of allowedCounts) {
      if (n === 1) {
        for (let i = 0; i < allCandidates.length; i++) {
          const c = allCandidates[i];
          const cost = c.variant.level;
          if (cost <= maxAllowedCost && cost >= minCost1) {
            validTeams.push([c]);
          }
        }
      } else if (n === 2) {
        for (let i = 0; i < allCandidates.length; i++) {
          const c1 = allCandidates[i];
          for (let j = i; j < allCandidates.length; j++) {
            const c2 = allCandidates[j];
            const cost = (c1.variant.level + c2.variant.level) * 1.05;
            if (cost <= maxAllowedCost && cost >= minCost2) {
              validTeams.push([c1, c2]);
            }
          }
        }
      } else if (n === 3) {
        for (let i = 0; i < allCandidates.length; i++) {
          const c1 = allCandidates[i];
          for (let j = i; j < allCandidates.length; j++) {
            const c2 = allCandidates[j];
            const sum12 = c1.variant.level + c2.variant.level;
            if (sum12 * 1.1 > maxAllowedCost) continue;
            for (let k = j; k < allCandidates.length; k++) {
              const c3 = allCandidates[k];
              const cost = (sum12 + c3.variant.level) * 1.1;
              if (cost <= maxAllowedCost && cost >= minCost3) {
                validTeams.push([c1, c2, c3]);
              }
            }
          }
        }
      }
    }
  }

  if (validTeams.length === 0) {
    let bestCandidate: EnemyCandidate | null = null;
    let bestDiff = Infinity;
    for (let i = 0; i < allCandidates.length; i++) {
      const c = allCandidates[i];
      const diff = Math.abs(budget - c.variant.level);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestCandidate = c;
      }
    }
    if (bestCandidate) {
      validTeams.push([bestCandidate]);
    } else {
      const firstTpl = ENEMY_DB[0];
      const firstVar = firstTpl.variants[2] || {
        level: 10,
        hp: 20,
        dmg: 10,
        name: firstTpl.name,
      };
      validTeams.push([{ tpl: firstTpl, variant: firstVar, variantIndex: 2 }]);
    }
  }

  validTeams.sort((a, b) => calcCost(b) - calcCost(a));
  const topCutoff = Math.max(1, Math.min(validTeams.length, Math.ceil(validTeams.length * 0.35)));
  const chosenTeam = validTeams[Math.floor(rand() * topCutoff)];

  return chosenTeam.map((member, idx) => {
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
      rand,
      member.variantIndex,
    );
    inst.row = idx < 4 ? "front" : "back";
    return inst;
  });
}

const EIGHT_BOGEY_PRESET: readonly { id: EnemyTypeId; role: EnemyRole; row: EnemyRow }[] = [
  { id: "bubak", role: "linie", row: "front" },
  { id: "rarasek", role: "linie", row: "front" },
  { id: "kostlivec", role: "linie", row: "front" },
  { id: "helkal", role: "linie", row: "front" },
  { id: "hastrman", role: "delostrelba", row: "back" },
  { id: "polednice", role: "podpora", row: "back" },
  { id: "mrtvak", role: "podpora", row: "back" },
  { id: "klekanice", role: "podpora", row: "back" },
];

export function createTestEightEnemies(
  options: RunOptions,
  heroReady: number = 25,
  locId: LocationId = "vesnice",
  rand: () => number = Math.random,
): EnemyInstance[] {
  const loc = LOCATION_BY_ID[locId] || LOCATIONS[0];

  return EIGHT_BOGEY_PRESET.map((item, idx) => {
    const tpl = ENEMY_BY_ID[item.id] || ENEMY_DB[0];
    const variantIdx = tpl.variants?.[1] ? 1 : 0;
    const variant = tpl.variants?.[variantIdx] || {
      level: 6,
      hp: tpl.hp,
      dmg: tpl.dmg,
      name: tpl.name,
    };
    const inst = instantiateEnemyVariant(
      tpl,
      variant,
      item.role,
      loc,
      options,
      {},
      heroReady,
      rand,
      variantIdx,
    );
    inst.row = item.row;
    inst.timer = Math.max(3, inst.timer + (idx % 4) * 2);
    return inst;
  });
}

export const CARD_BALANCE_FORMULA = {
  BASE_POWER_PER_COST: {
    1: 4,
    2: 8,
    3: 14,
    4: 20,
  } as Record<number, number>,
  INSTANT_TEMPO_PENALTY: 2,
  SPLASH_TARGET_FACTOR: 1.4,
  ROW_AOE_TARGET_FACTOR: 2.33,
  BLOCK_DECAY_RATE: 0.15,
  MIN_BLOCK_DECAY: 1,
  STAGGER_BASE_RATIO: 1.0,
};

export function calculateCardPowerBudget(cost: number, pre: number, intent: CardIntent): number {
  let budget = CARD_BALANCE_FORMULA.BASE_POWER_PER_COST[cost] || cost * 4;
  if (pre === 0) {
    budget = Math.max(2, budget - CARD_BALANCE_FORMULA.INSTANT_TEMPO_PENALTY);
  }
  if (intent === "splash") {
    budget = Math.round(budget / CARD_BALANCE_FORMULA.SPLASH_TARGET_FACTOR);
  } else if (intent === "row") {
    budget = Math.round(budget / CARD_BALANCE_FORMULA.ROW_AOE_TARGET_FACTOR);
  }
  return budget;
}

export function evaluateCardBalance(card: CardDef): {
  budget: number;
  actualPower: number;
  balanceRatio: number;
  isBalanced: boolean;
} {
  const budget = calculateCardPowerBudget(card.cost, card.pre, card.intent);
  let actualPower = 0;
  if (card.dmg) actualPower += card.dmg;
  if (card.block) actualPower += card.block;
  if (card.draw) actualPower += card.draw * 4;
  if (card.dodge) actualPower += card.dodge * 6;
  if (card.fatigue && card.fatigue < 0) actualPower += Math.abs(card.fatigue) * 1.5;

  const balanceRatio = budget > 0 ? actualPower / budget : 1;
  const isBalanced = balanceRatio >= 0.85 && balanceRatio <= 1.25;

  return { budget, actualPower, balanceRatio, isBalanced };
}

export function calculateStaggerDelay(throughDmg: number, odolnost: number): number {
  if (throughDmg <= 0) return 0;
  const effectiveRatio = Math.max(0, 1 - (odolnost || 0) / 100);
  return Math.max(0, Math.round(throughDmg * effectiveRatio));
}

export function cardDamageCalc(def: CardDef, enemy: EnemyInstance, stars: number = 0): number {
  let d = Math.round((def.dmg || 0) * starValueMult(stars));
  if (def.tags.includes("kriz") && enemy.traits.includes("svatokrad")) d = Math.round(d * 0.75);
  if (def.tags.includes("sul") && enemy.traits.includes("vodni")) d = Math.round(d * 1.5);
  return d;
}
