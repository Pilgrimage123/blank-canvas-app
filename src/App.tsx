import React, { useState, useEffect, useRef } from 'react';
import { GameState, RunOptions, CardDef, EnemyInstance, HeroId, LocationId } from './types';
import {
  loadStoredOptions,
  saveStoredOptions,
  hasSavedGame,
  loadGame,
  saveGame,
  clearSavedGame,
  createNewRun,
  createCombatEnemies,
  createTestEightEnemies,
  instantiateEnemyVariant,
  makeCard,
  rollEnemyAction,
  cardDamageCalc,
  generateUid
} from './utils/gameEngine';
import {
  HEROES,
  CARD_DB,
  ENEMY_DB,
  NODE_DB,
  NODE_EFFECTS,
  FLAVOR_BY_LOC,
  LOCATIONS,
  BREATH_BASE,
  HAND_CAP_BASE,
  UPGRADE_MAP,
  UPGRADE_COST,
  REMOVE_COST,
  REST_COST,
  START_DRAW,
  ESC_THRESHOLD,
  ESC_EVERY,
  AUG_MS
} from './data/gameData';

import { SplashScreen } from './components/screens/SplashScreen';
import { TitleScreen } from './components/screens/TitleScreen';
import { HeroScreen } from './components/screens/HeroScreen';
import { MapScreen } from './components/screens/MapScreen';
import { ShopScreen } from './components/screens/ShopScreen';
import { CombatScreen } from './components/screens/CombatScreen';
import { EndScreen } from './components/screens/EndScreen';
import { OptionsScreen } from './components/screens/OptionsScreen';
import { TestScreen } from './components/screens/TestScreen';

import { PilesModal } from './components/modals/PilesModal';
import { EnemyDetailModal } from './components/modals/EnemyDetailModal';
import { HeroDetailModal } from './components/modals/HeroDetailModal';
import { CombatLogModal } from './components/modals/CombatLogModal';
import { DiscardOverflowModal } from './components/modals/DiscardOverflowModal';
import { TutorialGuideModal } from './components/modals/TutorialGuideModal';
import { ChangelogModal } from './components/modals/ChangelogModal';
import { BestiaryModal } from './components/modals/BestiaryModal';

export default function App() {
  const [options, setOptions] = useState<RunOptions>(loadStoredOptions());
  const [state, setState] = useState<GameState | null>(null);
  const [hasSave, setHasSave] = useState<boolean>(hasSavedGame());

  // Modal states
  const [showPiles, setShowPiles] = useState<'deck' | 'discard' | 'all' | null>(null);
  const [inspectedEnemyUid, setInspectedEnemyUid] = useState<string | null>(null);
  const [showHeroDetailModal, setShowHeroDetailModal] = useState<boolean>(false);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showChangelogModal, setShowChangelogModal] = useState<boolean>(false);
  const [showBestiaryModal, setShowBestiaryModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tutorial / Movie runner state
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const [movieActive, setMovieActive] = useState<boolean>(false);
  const [movieCaption, setMovieCaption] = useState<string>('');
  const movieTimerRef = useRef<any>(null);

  const toastTimeoutRef = useRef<any>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const addLog = (msg: string, prevLogs: string[]) => {
    return [msg, ...prevLogs.slice(0, 80)];
  };

  const handleOptionsChange = (newOpts: RunOptions) => {
    setOptions(newOpts);
    saveStoredOptions(newOpts);
    showToast('Volby uloženy.');
  };

  // Start a new run
  const handleStartNewRun = (heroId: string) => {
    const newState = createNewRun(heroId, options);
    setState(newState);
    setHasSave(true);
    showToast(`Nové putování započalo za hrdinu: ${HEROES[heroId]?.name || heroId}.`);
  };

  // Continue saved run
  const handleContinueRun = () => {
    const loaded = loadGame();
    if (loaded) {
      setState(loaded);
      showToast('Putování úspěšně načteno.');
    } else {
      showToast('Uložené putování se nepodařilo najít.');
    }
  };

  // Abandon run
  const handleAbandonRun = () => {
    if (window.confirm('Opravdu chcete putování vzdát? Zápis v kronice bude smazán.')) {
      clearSavedGame();
      setState(null);
      setHasSave(false);
      showToast('Putování bylo ukončeno.');
    }
  };

  // Choose Node on Map
  const handleSelectNode = (nodeId: string) => {
    if (!state) return;
    const node = NODE_DB[nodeId];
    if (!node) return;

    if (node.timing === 'misto') {
      if (nodeId === 'hospoda') {
        const nextState = {
          ...state,
          phase: 'shop' as const,
          shopOffer: state.shopOffer || ['sul', 'kriz', 'odvar']
        };
        setState(nextState);
        saveGame(nextState);
        return;
      }
      if (nodeId === 'farar') {
        const nextFatigue = Math.max(0, (state.fatigueOut || 0) - 7);
        showToast('Farář vás vyslechl a uvařil čaj: −7 Únavy.');
        const nextState = {
          ...state,
          fatigueOut: nextFatigue,
          locIndex: Math.min(LOCATIONS.length - 1, state.locIndex + 1),
          log: addLog('Farářova světnice: −7 Únavy.', state.log)
        };
        setState(nextState);
        saveGame(nextState);
        return;
      }
    }

    if (node.timing === 'pred') {
      const mods: any = { ...(state.combatMods || {}) };
      if (nodeId === 'zalata') mods.startBlock = (mods.startBlock || 0) + 4;
      if (nodeId === 'zkratka') mods.enemyReadyDelta = (mods.enemyReadyDelta || 0) - 8;
      if (nodeId === 'pripraveny') mods.bossReadyDelta = (mods.bossReadyDelta || 0) + 8;
      if (nodeId === 'hejno') mods.extraEnemy = 1;
      if (nodeId === 'namraza') mods.breathPenalty = 2;
      if (nodeId === 'mlha') mods.handCapDelta = -1;

      startCombat({ ...state, combatMods: mods });
      return;
    }

    if (node.timing === 'po') {
      if (state.awaitingAfter) {
        // Resolve after combat node
        let nextSalt = state.salt;
        let nextHp = state.hp;
        let nextFatigue = state.fatigueOut;
        let nextDeck = [...state.deckAll];

        if (nodeId === 'nalez') {
          const gain = 5 + state.locIndex;
          nextSalt += gain;
          showToast(`Nalezen měšec: +${gain} krejcarů!`);
        } else if (nodeId === 'poklad') {
          const gain = 10 + state.locIndex * 3;
          nextSalt += gain;
          showToast(`Poklad u kapličky: +${gain} krejcarů!`);
        } else if (nodeId === 'myto') {
          if (nextSalt >= 4) {
            nextSalt -= 4;
            showToast('Zaplaceno obecní mýto: −4 krejcary.');
          } else {
            nextFatigue += 4;
            showToast('Bez mincí na mýto: +4 Únavy do nohou.');
          }
        } else if (nodeId === 'past') {
          const dmg = 5 + state.locIndex;
          nextHp = Math.max(1, nextHp - dmg);
          showToast(`Pytlácké železo: −${dmg} životů!`);
        }

        const nextLocIdx = state.locIndex + 1;
        if (nextLocIdx >= LOCATIONS.length) {
          // Victory!
          const winState = {
            ...state,
            salt: nextSalt,
            hp: nextHp,
            fatigueOut: nextFatigue,
            deckAll: nextDeck,
            awaitingAfter: false,
            phase: 'end' as const
          };
          clearSavedGame();
          setHasSave(false);
          setState(winState);
          return;
        }

        const nextState = {
          ...state,
          salt: nextSalt,
          hp: nextHp,
          fatigueOut: nextFatigue,
          deckAll: nextDeck,
          locIndex: nextLocIdx,
          awaitingAfter: false,
          combatMods: {}
        };
        setState(nextState);
        saveGame(nextState);
      } else {
        startCombat(state);
      }
    }
  };

  // Start Combat
  const startCombat = (baseState: GameState) => {
    const curLoc = LOCATIONS[baseState.locIndex] || LOCATIONS[0];
    const hero = HEROES[baseState.hero] || HEROES.pobuda;
    const enemies = createCombatEnemies(curLoc, baseState.options, baseState.combatMods || {}, hero.ready);

    // Initial pre-combat delay for the hero: (50 - hero.ready)
    const heroPreCombatDelay = Math.max(1, 50 - hero.ready);

    // Draw initial cards
    const deckCopy = [...baseState.deckAll.map((c) => ({ ...c }))];
    // Shuffle
    for (let i = deckCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
    }

    const hand: any[] = [];
    const draw = [...deckCopy];
    for (let i = 0; i < START_DRAW && draw.length > 0; i++) {
      hand.push(draw.shift());
    }

    const nextState: GameState = {
      ...baseState,
      phase: 'combat',
      combat: {
        locId: curLoc.id,
        time: 0,
        actions: (hero.breath || BREATH_BASE) * 2,
        block: (baseState.combatMods?.startBlock || 0),
        dodge: 0,
        fatigue: baseState.fatigueOut || 0,
        handCap: HAND_CAP_BASE + (baseState.combatMods?.handCapDelta || 0),
        breathPen: baseState.combatMods?.breathPenalty || 0,
        playerTimer: heroPreCombatDelay,
        playerBusy: 'prep',
        pendingCard: null,
        cdBreath: 0,
        cdSleep: 0,
        cdSpecial: 0,
        cdIdea: 0,
        cdScenery: 0,
        extraPost: 0,
        pauseTime: false,
        enemies,
        focus: enemies[0]?.uid || null,
        draw,
        discard: [],
        hand,
        escApplied: 0,
        waitingInput: false
      },
      log: addLog(
        `Střet v ${curLoc.name}! Cháska před vámi: ${enemies.map((e) => `${e.name} (${e.timer} Aug)`).join(', ')}. Nástup hrdiny: ${heroPreCombatDelay} Aug (Připravenost ${hero.ready}).`,
        baseState.log
      )
    };

    setState(nextState);
    saveGame(nextState);
  };

  // Combat Time Advancement Loop (runs when playerTimer > 0 or pendingCard)
  useEffect(() => {
    if (!state || state.phase !== 'combat' || !state.combat) return;
    const c = state.combat;

    if ((c.playerTimer > 0 || c.pendingCard) && !c.pauseTime && state.hp > 0) {
      // "dokud, ale nikdo nejedná běží trojnásobnou rychlostí"
      // Speed logic: If nobody is actively executing an action (no pending card, no enemy striking),
      // time advances at 3x speed (AUG_MS / 3 = 300ms). When an action is resolving, normal speed (AUG_MS) is used.
      const isCardResolving = Boolean(c.pendingCard);
      const isEnemyStriking = c.enemies.some((e) => e.alive && e.isAttacking);
      const isAnyoneActing = isCardResolving || isEnemyStriking;
      const currentTickMs = isAnyoneActing ? AUG_MS : Math.round(AUG_MS / 3);

      const timer = setTimeout(() => {
        tickOneAugenblick();
      }, currentTickMs);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    state?.combat?.playerTimer,
    state?.combat?.pendingCard,
    state?.combat?.time,
    state?.phase,
    state?.combat?.pauseTime,
    state?.hp
  ]);

  // Auto-clear transient enemy animation flags (isHit, isAttacking) so they never get stuck on screen
  useEffect(() => {
    if (!state || state.phase !== 'combat' || !state.combat) return;
    const hasActiveAnimation = state.combat.enemies.some((e) => e.isHit || e.isAttacking);
    if (!hasActiveAnimation) return;

    const animTimer = setTimeout(() => {
      setState((prev) => {
        if (!prev || !prev.combat) return prev;
        const enemiesStillActive = prev.combat.enemies.some((e) => e.isHit || e.isAttacking);
        if (!enemiesStillActive) return prev;
        return {
          ...prev,
          combat: {
            ...prev.combat,
            enemies: prev.combat.enemies.map((e) => {
              if (e.isHit || e.isAttacking) {
                return { ...e, isHit: false, isAttacking: false };
              }
              return e;
            })
          }
        };
      });
    }, 550);

    return () => {
      clearTimeout(animTimer);
    };
  }, [state?.combat?.enemies, state?.phase]);

  // Tick exactly one Augenblick
  const tickOneAugenblick = () => {
    setState((prevState) => {
      if (!prevState || !prevState.combat) return prevState;
      let c = { ...prevState.combat };
      let hp = prevState.hp;
      let logs = [...prevState.log];
      let stats = { ...prevState.stats };
      let salt = prevState.salt;

      const newTime = c.time + 1;
      let newPlayerTimer = Math.max(0, c.playerTimer - 1);
      let pending = c.pendingCard;

      // Cooldowns
      const cdBreath = Math.max(0, c.cdBreath - 1);
      const cdSleep = Math.max(0, c.cdSleep - 1);
      const cdSpecial = Math.max(0, c.cdSpecial - 1);
      const cdIdea = Math.max(0, c.cdIdea - 1);
      const cdScenery = Math.max(0, c.cdScenery - 1);

      // Salt DOTs on enemies every 3 Aug
      let enemies = c.enemies.map((e) => {
        if (!e.alive || e.saltDot <= 0 || newTime % 3 !== 0) return e;
        const dmg = e.saltDot;
        const blocked = Math.min(e.block, dmg);
        const through = dmg - blocked;
        const newHp = Math.max(0, e.hp - through);
        stats.dmgDealt += through;

        logs = addLog(`${e.name} byl spálen Solí na kůži za ${through} HP.`, logs);
        return {
          ...e,
          block: e.block - blocked,
          hp: newHp,
          saltDot: Math.max(0, e.saltDot - 1),
          alive: newHp > 0,
          isHit: through > 0
        };
      });

      // Resolve pending card when playerTimer reaches 0
      let hand = [...c.hand];
      let discard = [...c.discard];
      let draw = [...c.draw];
      let playerBlock = c.block;
      let playerDodge = c.dodge;
      let playerFatigue = c.fatigue;
      let extraPost = c.extraPost || 0;

      if (pending && newPlayerTimer <= 0) {
        const def: CardDef = CARD_DB[pending.card.id] || CARD_DB.sul;
        const pendingTargetUid = pending.target;
        const target = enemies.find((e) => e.uid === pendingTargetUid) || enemies.find((e) => e.alive);

        if (def.block) playerBlock += def.block + (def.tags.includes('kriz') ? (HEROES[prevState.hero]?.krizBonus || 0) : 0);
        if (def.dodge) playerDodge += def.dodge;
        if (def.fatigue) playerFatigue = Math.max(0, playerFatigue + def.fatigue);

        if (def.draw) {
          for (let i = 0; i < def.draw; i++) {
            if (draw.length === 0 && discard.length > 0) {
              draw = [...discard];
              discard = [];
            }
            if (draw.length > 0) hand.push(draw.shift()!);
          }
        }

        if (def.stiffen) {
          const stiffenAmount = def.stiffen;
          newPlayerTimer += stiffenAmount;
          enemies = enemies.map((e) => (e.alive ? { ...e, timer: e.timer + stiffenAmount } : e));
          logs = addLog(`${def.name} zamořil vzduch: běžící odpočty se prodloužily o +${def.stiffen} Aug!`, logs);
        }

        if (def.dmg && target && target.alive) {
          const targetRow = target.row || (enemies.indexOf(target) < 4 ? 'front' : 'back');
          const hasMultipleRows = enemies.some((em) => em.alive && (em.row === 'back' || (!em.row && enemies.indexOf(em) >= 4)));

          enemies = enemies.map((e) => {
            if (!e.alive) return e;
            const isMain = e.uid === target.uid;
            let d = 0;
            if (def.intent === 'row') {
              const eRow = e.row || (enemies.indexOf(e) < 4 ? 'front' : 'back');
              if (hasMultipleRows) {
                d = eRow === targetRow ? cardDamageCalc(def, e) : 0;
              } else {
                d = cardDamageCalc(def, e);
              }
            }
            else if (def.intent === 'splash') d = isMain ? cardDamageCalc(def, e) : Math.round(cardDamageCalc(def, e) * 0.4);
            else if (isMain) d = cardDamageCalc(def, e);

            if (d <= 0) return e;

            // Úskočný trait
            if (e.traits.includes('uskok') && e.uskokDodge) {
              logs = addLog(`${e.name} uskočil před útokem! (Úskočný)`, logs);
              return { ...e, uskokDodge: false };
            }

            const blk = Math.min(e.block, d);
            const through = d - blk;
            const newHp = Math.max(0, e.hp - through);
            stats.dmgDealt += through;

            // Wound delay: delay = through * (1 - odolnost/100)
            const delay = Math.max(0, Math.round(through * (1 - e.odolnost / 100)));
            const newTimer = e.timer + delay;

            if (def.tags.includes('sul') && through > 0) {
              e.saltDot = Math.min(5, (e.saltDot || 0) + 1);
            }

            logs = addLog(
              `${def.name} zasáhl ${e.name} za ${through} HP (${delay > 0 ? `+${delay} Aug odklad` : 'bez odklad'})!`,
              logs
            );

            return {
              ...e,
              block: e.block - blk,
              hp: newHp,
              timer: newTimer,
              alive: newHp > 0,
              isHit: true
            };
          });

          // Immediate retaliation (Odveta) from struck living enemies
          enemies = enemies.map((e) => {
            if (e.revenge && e.isHit && e.alive) {
              const revDmg = e.dmg + (e.omen || 0);
              if (playerDodge > 0) {
                playerDodge -= 1;
                logs = addLog(`${e.name} zkusil okamžitou Odvetu, ale vyhnuli jste se! (Úhyb)`, logs);
              } else {
                const rBlk = Math.min(playerBlock, revDmg);
                const rThrough = revDmg - rBlk;
                playerBlock -= rBlk;
                hp = Math.max(0, hp - rThrough);
                stats.dmgTaken += rThrough;
                logs = addLog(
                  `💥 Odveta! ${e.name} byl zasažen a okamžitě sekl zpět za ${revDmg} (${rBlk > 0 ? `${rBlk} do Bloku, ` : ''}${rThrough} do Životů)!`,
                  logs
                );
              }
              return {
                ...e,
                revenge: false,
                timer: e.interval,
                isAttacking: true
              };
            }
            return e;
          });
        }

        discard.push(pending.card);
        pending = null;
        logs = addLog(`${def.name} byl dokončen.`, logs);
      }

      let playerBusy = c.playerBusy;

      // Check dead enemies
      enemies.forEach((e) => {
        if (!e.alive && e.hp <= 0 && !e.rewardGiven) {
          stats.kills += 1;
          const reward = 4 + prevState.locIndex;
          salt += reward;
          (e as any).rewardGiven = true;
          logs = addLog(`${e.name} se rozplynul! Získáváte +${reward} krejcarů.`, logs);

          if (e.traits.includes('nakaza')) {
            logs = addLog(`Nákaza z ${e.name} popohnala odpočet ostatních nepřátel (-2 Aug)!`, logs);
            enemies.forEach((other) => {
              if (other.alive && other.uid !== e.uid) {
                other.timer = Math.max(0, other.timer - 2);
              }
            });
          }
        }
      });

      // Enemy Timer decrements and actions
      const actingEnemies = enemies.map((e) => {
        if (!e.alive) return e;
        return {
          ...e,
          timer: e.timer - 1,
          isHit: false,
          isAttacking: false
        };
      });

      for (let i = 0; i < actingEnemies.length; i++) {
        const e = actingEnemies[i];
        if (!e.alive || e.timer > 0) continue;

        // Enemy acts!
        const act = e.nextAction || 'uder';
        const A = e.dmg; // Základní síla útoku nepřítele
        const rawDmg = e.dmg + (e.omen || 0);

        if (act === 'uder') {
          if (playerDodge > 0) {
            playerDodge -= 1;
            logs = addLog(`${e.name} udeřil, ale vyhnuli jste se! (Úhyb)`, logs);
          } else {
            const blk = Math.min(playerBlock, rawDmg);
            const through = rawDmg - blk;
            playerBlock -= blk;
            hp = Math.max(0, hp - through);
            stats.dmgTaken += through;
            logs = addLog(
              `${e.name} zasadil Úder za ${rawDmg} (${blk > 0 ? `${blk} do Bloku, ` : ''}${through} do Životů)!`,
              logs
            );
          }
        } else if (act === 'zlovest') {
          e.omen = (e.omen || 0) + Math.round(e.dmg * 0.4);
          e.interval = Math.max(2, e.interval - 1);
          logs = addLog(`${e.name} se hluboce Nadechl (+síla).`, logs);
        } else if (act === 'ukryt') {
          e.block += Math.round(e.dmg * 1.0);
          logs = addLog(`${e.name} se ukryl za zídku (+Blok).`, logs);
        } else if (act === 'vabnicka') {
          const livingAllies = actingEnemies.filter((ally) => ally.uid !== e.uid && ally.alive);
          if (livingAllies.length > 0) {
            const ally = livingAllies[Math.floor(Math.random() * livingAllies.length)];
            const speedUp = Math.min(4, Math.max(1, Math.round(A / 2)));
            ally.timer = Math.max(1, ally.timer - speedUp);
            logs = addLog(`${e.name} zaskřehotal a popohnal ${ally.name} (−${speedUp} Aug)!`, logs);
          } else {
            logs = addLog(`${e.name} zaskřehotal a zkouší svolat posily!`, logs);
          }
        } else if (act === 'odveta') {
          e.revenge = false;
          if (playerDodge > 0) {
            playerDodge -= 1;
            logs = addLog(`${e.name} dokončil Odvetu úderem, ale vyhnuli jste se! (Úhyb)`, logs);
          } else {
            const blk = Math.min(playerBlock, rawDmg);
            const through = rawDmg - blk;
            playerBlock -= blk;
            hp = Math.max(0, hp - through);
            stats.dmgTaken += through;
            logs = addLog(
              `${e.name} vypršel čas Odvety a zasadil Úder za ${rawDmg} (${blk > 0 ? `${blk} do Bloku, ` : ''}${through} do Životů)!`,
              logs
            );
          }
        } else if (act === 'zatuhnuti') {
          extraPost += 2;
          logs = addLog(`${e.name} seslal Zatuhnutí na vaše svaly (+2 Aug zpoždění příští karty)!`, logs);
        } else if (act === 'skrek') {
          const count = Math.min(4, Math.round(A / 3));
          if (count > 0) {
            for (let k = 0; k < count; k++) {
              draw.push(makeCard('leknuti'));
            }
            for (let k = draw.length - 1; k > 0; k--) {
              const j = Math.floor(Math.random() * (k + 1));
              [draw[k], draw[j]] = [draw[j], draw[k]];
            }
            logs = addLog(`${e.name} zaječel! Vmíchal ${count}× Leknutí do balíčku.`, logs);
          }
        } else if (act === 'puch') {
          const count = Math.min(3, Math.round((A + 1) / 4));
          if (count > 0) {
            for (let k = 0; k < count; k++) {
              draw.unshift(makeCard('smradek'));
            }
            logs = addLog(`${e.name} zasmradil okolí! ${count}× Smrádek přistál na vršku balíčku.`, logs);
          }
        } else if (act === 'vtipek') {
          const count = Math.min(3, Math.round((A + 1) / 4));
          if (count > 0) {
            for (let k = 0; k < count; k++) {
              hand.push(makeCard('mokra_lumparna'));
            }
            logs = addLog(`${e.name} provedl vtípek! Podstrčil ${count}× Mokrou lumpárnu do ruky.`, logs);
          }
        } else if (act === 'bafnuti_z_dymky') {
          const heal = Math.round(A * 1.5);
          e.hp = Math.min(e.maxHp, e.hp + heal);
          logs = addLog(`${e.name} si bafnul z dýmky a vyléčil +${heal} HP.`, logs);
        } else if (act === 'kouzelna_polivcicka') {
          const heal = Math.round(A * 0.8);
          actingEnemies.forEach((ally) => {
            if (ally.alive) {
              ally.hp = Math.min(ally.maxHp, ally.hp + heal);
            }
          });
          logs = addLog(`${e.name} podělil chásku polívčičkou (+${heal} HP všem).`, logs);
        } else if (act === 'rybnicni_mlha') {
          const blk = Math.round(A * 1.2);
          actingEnemies.forEach((ally) => {
            if (ally.alive) {
              ally.block += blk;
            }
          });
          logs = addLog(`${e.name} vyčaroval rybniční mlhu (+${blk} Blok všem).`, logs);
        }

        e.timer = e.interval;
        e.isAttacking = true;
        rollEnemyAction(e, actingEnemies);
      }
      enemies = actingEnemies;

      // Check if pre-combat preparation just finished or was broken by enemy attack
      if (playerBusy === 'prep') {
        const anyEnemyAttacked = actingEnemies.some((e) => e.isAttacking);
        if (anyEnemyAttacked) {
          playerBusy = null;
          newPlayerTimer = 0;
          logs = addLog('⚔️ Bubáci provedli úvodní výpad — jste na tahu a můžete jednat!', logs);
        } else if (newPlayerTimer <= 0) {
          playerBusy = null;
          logs = addLog('⚔️ Příprava na střet dokončena — jste rychlejší a na tahu!', logs);
        }
      }

      // Win / Lose verification
      const allDead = enemies.every((e) => !e.alive);
      if (allDead) {
        logs = addLog('Všichni bubáci byli rozprášeni! Kraj je volný.', logs);
        return {
          ...prevState,
          hp,
          salt,
          stats,
          log: logs,
          fatigueOut: playerFatigue,
          awaitingAfter: prevState.path && prevState.path.length > 0,
          phase: prevState.path && prevState.path.length > 0 ? 'map' : 'test',
          combat: null
        };
      }

      if (hp <= 0) {
        logs = addLog('Vaše síly vyprchaly. Putování končí.', logs);
        clearSavedGame();
        return {
          ...prevState,
          hp: 0,
          stats,
          log: logs,
          phase: 'end',
          combat: null
        };
      }

      // Check Hand Overflow
      const pauseTime = hand.length > c.handCap;

      return {
        ...prevState,
        hp,
        salt,
        stats,
        log: logs,
        combat: {
          ...c,
          time: newTime,
          playerTimer: newPlayerTimer,
          playerBusy,
          pendingCard: pending,
          waitingInput: newPlayerTimer <= 0 && !pending,
          block: playerBlock,
          dodge: playerDodge,
          fatigue: playerFatigue,
          cdBreath,
          cdSleep,
          cdSpecial,
          cdIdea,
          cdScenery,
          enemies,
          hand,
          draw,
          discard,
          extraPost,
          pauseTime
        }
      };
    });
  };

  // Player action: Mrknutí (Wait 1 Aug)
  const handleBlink = () => {
    if (!state?.combat || state.combat.playerTimer > 0 || state.combat.pendingCard) return;
    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      return {
        ...prev,
        log: addLog('Mrknutí: posun času o 1 Augenblick.', prev.log),
        combat: {
          ...prev.combat,
          playerTimer: 1
        }
      };
    });
  };

  // Player action: Nádech (+Actions, +2 Fatigue, 1 Aug)
  const handleBreath = () => {
    if (!state?.combat || state.combat.playerTimer > 0 || state.combat.cdBreath > 0) return;
    const hero = HEROES[state.hero] || HEROES.pobuda;
    const gain = Math.max(1, Math.round((hero.breath || BREATH_BASE) * (1 - 0.05 * state.combat.fatigue)) - state.combat.breathPen);

    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      return {
        ...prev,
        log: addLog(`Nádech: +${gain} Akcí, +2 Únavy.`, prev.log),
        combat: {
          ...prev.combat,
          actions: prev.combat.actions + gain,
          fatigue: prev.combat.fatigue + 2,
          cdBreath: 1,
          playerTimer: 1
        }
      };
    });
  };

  // Player action: Spánek (-Fatigue, 3 Aug)
  const handleSleep = () => {
    if (!state?.combat || state.combat.playerTimer > 0 || state.combat.cdSleep > 0) return;
    const hero = HEROES[state.hero] || HEROES.pobuda;
    const drop = hero.sleepFat || 7;

    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      return {
        ...prev,
        log: addLog(`Spánek: −${drop} Únavy.`, prev.log),
        stats: { ...prev.stats, sleeps: prev.stats.sleeps + 1 },
        combat: {
          ...prev.combat,
          fatigue: Math.max(0, prev.combat.fatigue - drop),
          cdSleep: 3,
          playerTimer: 3
        }
      };
    });
  };

  // Player action: Nápad (-2 Actions, draw 1, 1 Aug)
  const handleIdea = () => {
    if (!state?.combat || state.combat.playerTimer > 0 || state.combat.actions < 2) return;
    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      const draw = [...prev.combat.draw];
      const discard = [...prev.combat.discard];
      const hand = [...prev.combat.hand];
      if (draw.length === 0 && discard.length > 0) {
        draw.push(...discard);
        discard.length = 0;
      }
      if (draw.length > 0) hand.push(draw.shift()!);

      return {
        ...prev,
        log: addLog('Nápad: −2 Akce, líznuta 1 karta.', prev.log),
        combat: {
          ...prev.combat,
          actions: prev.combat.actions - 2,
          hand,
          draw,
          discard,
          cdIdea: 2,
          playerTimer: 1
        }
      };
    });
  };

  // Player action: Kochání (-1 Fatigue, 2 Aug)
  const handleScenery = () => {
    if (!state?.combat || state.combat.playerTimer > 0 || state.combat.cdScenery > 0) return;
    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      return {
        ...prev,
        log: addLog('Kochání se krásou české krajiny: −1 Únava.', prev.log),
        combat: {
          ...prev.combat,
          fatigue: Math.max(0, prev.combat.fatigue - 1),
          cdScenery: 3,
          playerTimer: 2
        }
      };
    });
  };

  // Player action: Speciál
  const handleSpecial = () => {
    if (!state?.combat || state.combat.playerTimer > 0 || state.combat.cdSpecial > 0) return;
    const hero = HEROES[state.hero] || HEROES.pobuda;
    const sp = hero.special;

    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      let c = { ...prev.combat };
      let enemies = [...c.enemies];
      let target = enemies.find((e) => e.uid === c.focus && e.alive) || enemies.find((e) => e.alive);
      let logs = addLog(`${sp.name}!`, prev.log);
      let stats = { ...prev.stats };
      let salt = prev.salt;

      if (sp.dmg && target) {
        const d = sp.dmg;
        const blk = Math.min(target.block, d);
        const through = d - blk;
        const newHp = Math.max(0, target.hp - through);
        if (sp.dot) target.saltDot = (target.saltDot || 0) + sp.dot;
        target.hp = newHp;
        target.block -= blk;
        target.isHit = true;
        target.alive = newHp > 0;
        stats.dmgDealt += through;
        logs = addLog(`${sp.name} zasáhla ${target.name} za ${through} HP!`, logs);

        if (!target.alive) {
          stats.kills += 1;
          const reward = 4 + prev.locIndex;
          salt += reward;
          (target as any).rewardGiven = true;
          logs = addLog(`${target.name} se rozplynul! Získáváte +${reward} krejcarů.`, logs);

          if (target.traits.includes('nakaza')) {
            logs = addLog(`Nákaza z ${target.name} popohnala odpočet ostatních nepřátel (-2 Aug)!`, logs);
            enemies.forEach((other) => {
              if (other.alive && other.uid !== target.uid) {
                other.timer = Math.max(0, other.timer - 2);
              }
            });
          }
        }
      }

      if (sp.block) c.block += sp.block;
      if (sp.fat) c.fatigue = Math.max(0, c.fatigue + sp.fat);

      // Draw cards from special (e.g. Bylinkářka's Čerstvý odvar)
      let hand = [...c.hand];
      let draw = [...c.draw];
      let discard = [...c.discard];
      if (sp.draw) {
        for (let i = 0; i < sp.draw; i++) {
          if (draw.length === 0 && discard.length > 0) {
            draw = [...discard];
            discard = [];
          }
          if (draw.length > 0) hand.push(draw.shift()!);
        }
        logs = addLog(`${sp.name}: líznuto ${sp.draw} karet, −${Math.abs(sp.fat || 0)} Únavy.`, logs);
      }

      const pauseTime = hand.length > c.handCap;

      return {
        ...prev,
        salt,
        stats,
        log: logs,
        combat: {
          ...c,
          hand,
          draw,
          discard,
          enemies,
          cdSpecial: sp.cd,
          playerTimer: 0,
          pauseTime
        }
      };
    });
  };

  // Play a card from hand
  const handlePlayCard = (cardIdx: number) => {
    if (!state?.combat || state.combat.playerTimer > 0 || state.combat.pendingCard) return;
    const c = state.combat;
    const card = c.hand[cardIdx];
    if (!card) return;
    const def: CardDef = CARD_DB[card.id] || CARD_DB.sul;

    if (c.actions < def.cost) {
      showToast('Nemáte dostatek Akcí na zahrání této karty!');
      return;
    }

    // Instant resolution for cards with pre === 0 (e.g. Bylinkový odvar, Košík bylin)
    if (def.pre === 0) {
      setState((prev) => {
        if (!prev || !prev.combat) return prev;
        let combatState = { ...prev.combat };
        let hand = [...combatState.hand];
        const removed = hand.splice(cardIdx, 1)[0];
        let discard = [...combatState.discard, removed || card];
        let draw = [...combatState.draw];
        let playerBlock = combatState.block;
        let playerDodge = combatState.dodge;
        let playerFatigue = combatState.fatigue;

        if (def.block) playerBlock += def.block;
        if (def.dodge) playerDodge += def.dodge;
        if (def.fatigue) playerFatigue = Math.max(0, playerFatigue + def.fatigue);

        if (def.draw) {
          for (let i = 0; i < def.draw; i++) {
            if (draw.length === 0 && discard.length > 0) {
              draw = [...discard];
              discard = [];
            }
            if (draw.length > 0) hand.push(draw.shift()!);
          }
        }

        const pauseTime = hand.length > combatState.handCap;
        const logs = addLog(
          `${def.name}: zahráno okamžitě bez nápřahu! ${def.draw ? `Líznuto ${def.draw} karet.` : ''}`,
          prev.log
        );

        return {
          ...prev,
          log: logs,
          combat: {
            ...combatState,
            actions: combatState.actions - def.cost,
            hand,
            draw,
            discard,
            block: playerBlock,
            dodge: playerDodge,
            fatigue: playerFatigue,
            pauseTime
          }
        };
      });
      return;
    }

    // Standard card with pre-cast delay (nápřah)
    const extraStiffen = c.extraPost || 0;
    const preDelay = def.pre + extraStiffen;
    const nextHand = [...c.hand];
    nextHand.splice(cardIdx, 1);

    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      return {
        ...prev,
        log: addLog(
          `${def.name}: spuštěn nápřah (${preDelay} Aug${extraStiffen > 0 ? ` [včetně +${extraStiffen} Aug Zatuhnutí]` : ''}).`,
          prev.log
        ),
        combat: {
          ...prev.combat,
          actions: prev.combat.actions - def.cost,
          extraPost: 0,
          hand: nextHand,
          pendingCard: { card, target: prev.combat.focus },
          playerTimer: preDelay > 0 ? preDelay : 0
        }
      };
    });
  };

  // Handle Discard Overflow
  const handleDiscardOverflow = (cardIdx: number) => {
    setState((prev) => {
      if (!prev || !prev.combat) return prev;
      const hand = [...prev.combat.hand];
      const discard = [...prev.combat.discard];
      const removed = hand.splice(cardIdx, 1)[0];
      if (removed) discard.push(removed);

      const stillOverflow = hand.length > prev.combat.handCap;
      return {
        ...prev,
        combat: {
          ...prev.combat,
          hand,
          discard,
          pauseTime: stillOverflow
        }
      };
    });
  };

  // Tavern Handlers
  const handleBuyShopCard = (cardId: string, price: number, offerIdx: number) => {
    if (!state || state.salt < price) return;
    const nextDeck = [...state.deckAll, makeCard(cardId)];
    const nextOffer = [...(state.shopOffer || [])];
    nextOffer.splice(offerIdx, 1);

    const nextState: GameState = {
      ...state,
      salt: state.salt - price,
      deckAll: nextDeck,
      shopOffer: nextOffer,
      stats: {
        ...state.stats,
        saltSpent: state.stats.saltSpent + price,
        buys: state.stats.buys + 1
      },
      log: addLog(`Koupena karta: ${CARD_DB[cardId]?.name} za ${price} k.`, state.log)
    };
    setState(nextState);
    saveGame(nextState);
    showToast(`Do brašny přidána: ${CARD_DB[cardId]?.name}`);
  };

  const handleUpgradeCard = (fromId: string) => {
    if (!state || state.salt < UPGRADE_COST) return;
    const toId = UPGRADE_MAP[fromId];
    if (!toId) return;

    const deck = [...state.deckAll];
    const idx = deck.findIndex((c) => c.id === fromId);
    if (idx < 0) return;
    deck[idx] = makeCard(toId);

    const nextState: GameState = {
      ...state,
      salt: state.salt - UPGRADE_COST,
      deckAll: deck,
      stats: {
        ...state.stats,
        saltSpent: state.stats.saltSpent + UPGRADE_COST
      },
      log: addLog(`Vylepšeno: ${CARD_DB[fromId]?.name} ➔ ${CARD_DB[toId]?.name}.`, state.log)
    };
    setState(nextState);
    saveGame(nextState);
    showToast(`Karta vylepšena na: ${CARD_DB[toId]?.name}!`);
  };

  const handleRemoveShopCard = (cardId: string) => {
    if (!state || state.salt < REMOVE_COST) return;
    const deck = [...state.deckAll];
    const idx = deck.findIndex((c) => c.id === cardId);
    if (idx < 0) return;
    deck.splice(idx, 1);

    const nextState: GameState = {
      ...state,
      salt: state.salt - REMOVE_COST,
      deckAll: deck,
      stats: {
        ...state.stats,
        saltSpent: state.stats.saltSpent + REMOVE_COST
      },
      log: addLog(`Karta vyhozena: ${CARD_DB[cardId]?.name}.`, state.log)
    };
    setState(nextState);
    saveGame(nextState);
    showToast(`Karta ${CARD_DB[cardId]?.name} vyhozena z brašny.`);
  };

  const handleShopRest = () => {
    if (!state || state.salt < REST_COST || (state.fatigueOut || 0) === 0) return;
    const nextFatigue = Math.max(0, (state.fatigueOut || 0) - 5);
    const nextState: GameState = {
      ...state,
      salt: state.salt - REST_COST,
      fatigueOut: nextFatigue,
      stats: {
        ...state.stats,
        saltSpent: state.stats.saltSpent + REST_COST,
        sleeps: state.stats.sleeps + 1
      },
      log: addLog('Odpočinek v šenku: −5 Únavy.', state.log)
    };
    setState(nextState);
    saveGame(nextState);
    showToast('Odpočinek u teplých kamen: −5 Únavy!');
  };

  const handleLeaveShop = () => {
    if (!state) return;
    const nextLocIdx = state.locIndex + 1;
    if (nextLocIdx >= LOCATIONS.length) {
      // Victory!
      clearSavedGame();
      setHasSave(false);
      setState({ ...state, phase: 'end' });
      return;
    }

    const nextState: GameState = {
      ...state,
      phase: 'map',
      locIndex: nextLocIdx,
      awaitingAfter: false,
      shopOffer: null
    };
    setState(nextState);
    saveGame(nextState);
  };

  // Start Interactive Tutorial
  const handleStartTutorial = () => {
    const dummyHero = HEROES.pobuda;
    const dummyEnemy: EnemyInstance = {
      uid: 'dummy_1',
      tpl: 'bubak',
      name: 'Cvičný bubák od stodoly',
      type: 'bubak',
      traits: [],
      role: 'linie',
      hp: 18,
      maxHp: 18,
      dmg: 4,
      interval: 16,
      ready: 20,
      odolnost: 45,
      timer: 8,
      block: 0,
      nextAction: 'uder',
      omen: 0,
      revenge: false,
      stiffen: 0,
      saltDot: 0,
      alive: true
    };

    const dummyState: GameState = {
      seed: 'vycvik',
      rand: () => 0.5,
      uidn: 1,
      locIndex: 0,
      hero: 'pobuda',
      salt: 10,
      hp: 40,
      maxHp: 40,
      playerReady: 25,
      deckAll: [
        makeCard('sul'),
        makeCard('kriz'),
        makeCard('odvar'),
        makeCard('sul'),
        makeCard('kriz')
      ],
      stats: { fights: 0, kills: 0, dmgDealt: 0, dmgTaken: 0, saltSpent: 0, buys: 0, sleeps: 0, maxFatigue: 0 },
      options,
      pending: null,
      shopOffer: null,
      log: ['Farář přivádí cvičného bubáka: Vyzkoušejte si Nádech, karty a Augenblicky.'],
      phase: 'combat',
      rngStep: 0,
      fatigueOut: 0,
      path: [],
      tutorial: true,
      combat: {
        locId: 'vesnice',
        time: 0,
        actions: 6,
        block: 0,
        dodge: 0,
        fatigue: 0,
        handCap: 7,
        breathPen: 0,
        playerTimer: 0,
        playerBusy: null,
        pendingCard: null,
        cdBreath: 0,
        cdSleep: 0,
        cdSpecial: 0,
        cdIdea: 0,
        cdScenery: 0,
        extraPost: 0,
        pauseTime: false,
        enemies: [dummyEnemy],
        focus: dummyEnemy.uid,
        draw: [makeCard('sul'), makeCard('kriz')],
        discard: [],
        hand: [makeCard('sul'), makeCard('kriz'), makeCard('odvar')],
        escApplied: 0,
        waitingInput: true
      }
    };

    setState(dummyState);
    setTutorialStep(1);
    showToast('🎓 Výcvik: Farář vám ukáže základy.');
  };

  // Start Test Arena Full 8-Bogey Fight (4 in front row, 4 in back row)
  const handleStartTestFullFight = (heroId: HeroId, locId: LocationId) => {
    const heroDef = HEROES[heroId] || HEROES.pobuda;
    const resolvedLocIndex = Math.max(0, LOCATIONS.findIndex((l) => l.id === locId));
    const locDef = LOCATIONS[resolvedLocIndex] || LOCATIONS[0];
    const enemies = createTestEightEnemies(options, heroDef.ready, locId);

    const testDeck = [
      makeCard('sul'),
      makeCard('kriz'),
      makeCard('kosa'), // Plošný útok na celou řadu
      makeCard('odvar'),
      makeCard('lucerna'), // Splash útok
      makeCard('srp'),
      makeCard('dymka'),
      makeCard('retez'),
      makeCard('kadidlo'),
      makeCard('sul'),
      makeCard('kriz')
    ];

    const testState: GameState = {
      seed: 'test_arena_8',
      rand: () => Math.random(),
      uidn: 1,
      locIndex: resolvedLocIndex,
      hero: heroId,
      salt: 30,
      hp: heroDef.hp,
      maxHp: heroDef.hp,
      playerReady: heroDef.ready,
      deckAll: testDeck,
      stats: { fights: 0, kills: 0, dmgDealt: 0, dmgTaken: 0, saltSpent: 0, buys: 0, sleeps: 0, maxFatigue: 0 },
      options,
      pending: null,
      shopOffer: null,
      log: [
        `🧪 Testovací souboj: ${heroDef.name} vs. 8 bubáků ve dvou řadách (${locDef.name})!`,
        'Přední řada (cesta): 4 bubáci • Zadní řada (břeh): 4 bubáci.'
      ],
      phase: 'combat',
      rngStep: 0,
      fatigueOut: 0,
      path: [],
      tutorial: false,
      combat: {
        locId,
        time: 0,
        actions: heroDef.breath || BREATH_BASE,
        block: 0,
        dodge: 0,
        fatigue: 0,
        handCap: HAND_CAP_BASE,
        breathPen: 0,
        playerTimer: 0,
        playerBusy: null,
        pendingCard: null,
        cdBreath: 0,
        cdSleep: 0,
        cdSpecial: 0,
        cdIdea: 0,
        cdScenery: 0,
        extraPost: 0,
        pauseTime: false,
        enemies,
        focus: enemies[0].uid,
        draw: testDeck.slice(5),
        discard: [],
        hand: testDeck.slice(0, 5),
        escApplied: 0,
        waitingInput: true
      }
    };

    setState(testState);
    showToast(`🧪 Test: 8 bubáků ve 2 řadách (${locDef.name}) připraveno!`);
  };

  // Start Test Arena Preset Fight (e.g. 4 or 2 bogeys, or -1 for Loupežnická banda)
  const handleStartTestPresetFight = (count: number, heroId: HeroId, locId: LocationId) => {
    const heroDef = HEROES[heroId] || HEROES.pobuda;
    const resolvedLocIndex = Math.max(0, LOCATIONS.findIndex((l) => l.id === locId));
    const locDef = LOCATIONS[resolvedLocIndex] || LOCATIONS[0];

    let enemies: EnemyInstance[];
    if (count === -1) {
      const loupeznikTpl = ENEMY_DB.find((e) => e.id === 'loupeznik') || ENEMY_DB[0];
      const lupicTpl = ENEMY_DB.find((e) => e.id === 'lupic') || ENEMY_DB[0];
      const l1 = instantiateEnemyVariant(loupeznikTpl, loupeznikTpl.variants[2], 'linie', locDef, options, {}, heroDef.ready);
      l1.row = 'front';
      const l2 = instantiateEnemyVariant(lupicTpl, lupicTpl.variants[2], 'delostrelba', locDef, options, {}, heroDef.ready);
      l2.row = 'back';
      enemies = [l1, l2];
    } else if (count === -2) {
      // Úroveň 1: Ropucha, Ohnivý kohout, Černý pes (barghest)
      const pesTpl = ENEMY_DB.find((e) => e.id === 'cerny_pes') || ENEMY_DB[0];
      const ropuchaTpl = ENEMY_DB.find((e) => e.id === 'ropucha') || ENEMY_DB[0];
      const kohoutTpl = ENEMY_DB.find((e) => e.id === 'ohnivy_kohout') || ENEMY_DB[0];
      const e1 = instantiateEnemyVariant(pesTpl, pesTpl.variants[2], 'linie', locDef, options, {}, heroDef.ready);
      e1.row = 'front';
      const e2 = instantiateEnemyVariant(ropuchaTpl, ropuchaTpl.variants[2], 'linie', locDef, options, {}, heroDef.ready);
      e2.row = 'front';
      const e3 = instantiateEnemyVariant(kohoutTpl, kohoutTpl.variants[2], 'delostrelba', locDef, options, {}, heroDef.ready);
      e3.row = 'back';
      enemies = [e1, e2, e3];
    } else if (count === -3) {
      // Úroveň 2: Divoženka, Jeskyňka (modrá elfka), Létající rarach, Lesní muž
      const lesniTpl = ENEMY_DB.find((e) => e.id === 'lesni_muz') || ENEMY_DB[0];
      const divozenkaTpl = ENEMY_DB.find((e) => e.id === 'divozenka') || ENEMY_DB[0];
      const rarachTpl = ENEMY_DB.find((e) => e.id === 'letajici_rarach') || ENEMY_DB[0];
      const jeskynkaTpl = ENEMY_DB.find((e) => e.id === 'jeskynka') || ENEMY_DB[0];
      const e1 = instantiateEnemyVariant(lesniTpl, lesniTpl.variants[2], 'linie', locDef, options, {}, heroDef.ready);
      e1.row = 'front';
      const e2 = instantiateEnemyVariant(divozenkaTpl, divozenkaTpl.variants[2], 'linie', locDef, options, {}, heroDef.ready);
      e2.row = 'front';
      const e3 = instantiateEnemyVariant(rarachTpl, rarachTpl.variants[2], 'delostrelba', locDef, options, {}, heroDef.ready);
      e3.row = 'back';
      const e4 = instantiateEnemyVariant(jeskynkaTpl, jeskynkaTpl.variants[2], 'delostrelba', locDef, options, {}, heroDef.ready);
      e4.row = 'back';
      enemies = [e1, e2, e3, e4];
    } else if (count === -4) {
      // Úroveň 3: Rusalka, Permoník
      const permonikTpl = ENEMY_DB.find((e) => e.id === 'permonik') || ENEMY_DB[0];
      const rusalkaTpl = ENEMY_DB.find((e) => e.id === 'rusalka') || ENEMY_DB[0];
      const e1 = instantiateEnemyVariant(permonikTpl, permonikTpl.variants[2], 'linie', locDef, options, {}, heroDef.ready);
      e1.row = 'front';
      const e2 = instantiateEnemyVariant(rusalkaTpl, rusalkaTpl.variants[2], 'delostrelba', locDef, options, {}, heroDef.ready);
      e2.row = 'back';
      enemies = [e1, e2];
    } else if (count === -5) {
      // Všichni 4 členové rodiny Permoníků (s pastelovými špičatými čapkami a krumpáči)
      const permonikTpl = ENEMY_DB.find((e) => e.id === 'permonik') || ENEMY_DB[0];
      const e0 = instantiateEnemyVariant(permonikTpl, permonikTpl.variants[0], 'linie', locDef, options, {}, heroDef.ready);
      e0.row = 'front';
      const e1 = instantiateEnemyVariant(permonikTpl, permonikTpl.variants[1], 'linie', locDef, options, {}, heroDef.ready);
      e1.row = 'front';
      const e2 = instantiateEnemyVariant(permonikTpl, permonikTpl.variants[2], 'delostrelba', locDef, options, {}, heroDef.ready);
      e2.row = 'back';
      const e3 = instantiateEnemyVariant(permonikTpl, permonikTpl.variants[3], 'delostrelba', locDef, options, {}, heroDef.ready);
      e3.row = 'back';
      enemies = [e0, e1, e2, e3];
    } else {
      const allEight = createTestEightEnemies(options, heroDef.ready, locId);
      enemies = allEight.slice(0, count);
    }

    const testDeck = [
      makeCard('sul'),
      makeCard('kriz'),
      makeCard('kosa'),
      makeCard('odvar'),
      makeCard('sul'),
      makeCard('kriz')
    ];

    const testState: GameState = {
      seed: 'test_arena_preset',
      rand: () => Math.random(),
      uidn: 1,
      locIndex: resolvedLocIndex,
      hero: heroId,
      salt: 20,
      hp: heroDef.hp,
      maxHp: heroDef.hp,
      playerReady: heroDef.ready,
      deckAll: testDeck,
      stats: { fights: 0, kills: 0, dmgDealt: 0, dmgTaken: 0, saltSpent: 0, buys: 0, sleeps: 0, maxFatigue: 0 },
      options,
      pending: null,
      shopOffer: null,
      log: [`🧪 Testovací souboj: ${count} bubáci (${locDef.name}).`],
      phase: 'combat',
      rngStep: 0,
      fatigueOut: 0,
      path: [],
      tutorial: false,
      combat: {
        locId,
        time: 0,
        actions: heroDef.breath || BREATH_BASE,
        block: 0,
        dodge: 0,
        fatigue: 0,
        handCap: HAND_CAP_BASE,
        breathPen: 0,
        playerTimer: 0,
        playerBusy: null,
        pendingCard: null,
        cdBreath: 0,
        cdSleep: 0,
        cdSpecial: 0,
        cdIdea: 0,
        cdScenery: 0,
        extraPost: 0,
        pauseTime: false,
        enemies,
        focus: enemies[0].uid,
        draw: testDeck.slice(4),
        discard: [],
        hand: testDeck.slice(0, 4),
        escApplied: 0,
        waitingInput: true
      }
    };

    setState(testState);
    showToast(`🧪 Test: ${count} bubáci (${locDef.name}) připraveni!`);
  };

  // Start Automated Movie Tutorial
  const handleStartMovie = () => {
    handleStartTutorial();
    setMovieActive(true);
    setMovieCaption('Vítejte ve video výcviku! Sledujte spodní dok s Akcemi a kartami...');

    let step = 0;
    const runMovieStep = () => {
      step++;
      if (step === 1) {
        setMovieCaption('1. Krok: Tlačítko Nádech vám dobije Akce pro zahrání karet a zvedne Únavu.');
        handleBreath();
        movieTimerRef.current = setTimeout(runMovieStep, 2400);
      } else if (step === 2) {
        setMovieCaption('2. Krok: Zahrajeme Hozenou sůl! Karta má nápřah 2 Augenblicky.');
        handlePlayCard(0);
        movieTimerRef.current = setTimeout(runMovieStep, 2800);
      } else if (step === 3) {
        setMovieCaption('3. Krok: Zranění zpozdilo útok bubáka! Nyní zahrajeme Kříž na hruď pro získání Bloku.');
        handlePlayCard(0);
        movieTimerRef.current = setTimeout(runMovieStep, 2800);
      } else if (step === 4) {
        setMovieCaption('4. Krok: Vyzkoušíme Mrknutí — čas popojde o 1 Aug, aniž by stál Akce.');
        handleBlink();
        movieTimerRef.current = setTimeout(runMovieStep, 2200);
      } else if (step === 5) {
        setMovieCaption('5. Krok: Speciální Vyřezávaná slánka mimo ruku! Naloží Sůl na kůži.');
        handleSpecial();
        movieTimerRef.current = setTimeout(runMovieStep, 3000);
      } else {
        setMovieCaption('Konec ukázky! Nyní si můžete souboj dohrát sami.');
        setTimeout(() => {
          setMovieActive(false);
          setMovieCaption('');
        }, 3000);
      }
    };

    movieTimerRef.current = setTimeout(runMovieStep, 2200);
  };

  const handleStopMovie = () => {
    clearTimeout(movieTimerRef.current);
    setMovieActive(false);
    setMovieCaption('');
    showToast('Video výcvik ukončen.');
  };

  // Render current screen
  const currentPhase = state ? state.phase : 'splash';

  return (
    <div className="relative min-h-screen font-sans bg-parchment-pattern overflow-x-hidden">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1c1308] text-[#fff8e8] px-4 py-2 rounded-xl border-2 border-[#ffd438] font-bold text-sm shadow-xl flex items-center gap-2 animate-fade-in">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Movie Tutorial Overlay Ribbon */}
      {movieActive && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 bg-[#1c1308] text-[#fff8e8] px-5 py-2.5 rounded-2xl border-3 border-[#f4c23c] shadow-2xl flex items-center gap-4 max-w-xl w-[92vw] text-xs sm:text-sm font-black">
          <span className="text-xl animate-spin">🎬</span>
          <div className="flex-1">{movieCaption}</div>
          <button
            type="button"
            onClick={handleStopMovie}
            className="bg-[#c4321d] text-white px-2.5 py-1 rounded-lg text-xs font-black border border-white hover:bg-[#d63d26]"
          >
            Zastavit ✕
          </button>
        </div>
      )}

      {/* SCREENS */}
      {currentPhase === 'splash' && (
        <SplashScreen
          onPlay={() => setState((prev) => (prev ? { ...prev, phase: 'title' } : { ...createNewRun('pobuda', options), phase: 'title' }))}
          onOptions={() => setState((prev) => (prev ? { ...prev, phase: 'options' } : { ...createNewRun('pobuda', options), phase: 'options' }))}
        />
      )}

      {currentPhase === 'title' && (
        <TitleScreen
          onNewRun={() => setState({ ...createNewRun('pobuda', options), phase: 'hero' })}
          onContinue={handleContinueRun}
          hasSavedRun={hasSave}
          onTraining={handleStartTutorial}
          onMovie={handleStartMovie}
          onIntro={() => setShowGuideModal(true)}
          onOptions={() => setState((prev) => (prev ? { ...prev, phase: 'options' } : { ...createNewRun('pobuda', options), phase: 'options' }))}
          onChangelog={() => setShowChangelogModal(true)}
          onTest={() => setState((prev) => (prev ? { ...prev, phase: 'test' } : { ...createNewRun('pobuda', options), phase: 'test' }))}
          onBestiary={() => setShowBestiaryModal(true)}
        />
      )}

      {currentPhase === 'test' && (
        <TestScreen
          onStartFullFight={handleStartTestFullFight}
          onStartPresetFight={handleStartTestPresetFight}
          onBack={() => setState((prev) => (prev ? { ...prev, phase: 'title' } : null))}
          onOpenBestiary={() => setShowBestiaryModal(true)}
        />
      )}

      {currentPhase === 'hero' && (
        <HeroScreen
          onSelectHero={(heroId) => {
            const newState = createNewRun(heroId, options);
            setState(newState);
            setHasSave(true);
          }}
          onBack={() => setState((prev) => (prev ? { ...prev, phase: 'title' } : null))}
        />
      )}

      {currentPhase === 'map' && state && (
        <MapScreen
          state={state}
          onSelectNode={handleSelectNode}
          onOpenDeck={() => setShowPiles('all')}
          onAbandon={handleAbandonRun}
        />
      )}

      {currentPhase === 'shop' && state && (
        <ShopScreen
          state={state}
          onBuyCard={handleBuyShopCard}
          onUpgradeCard={handleUpgradeCard}
          onRemoveCard={handleRemoveShopCard}
          onRest={handleShopRest}
          onLeaveShop={handleLeaveShop}
        />
      )}

      {currentPhase === 'combat' && state && state.combat && (
        <CombatScreen
          state={state}
          onPlayCard={handlePlayCard}
          onBlink={handleBlink}
          onBreath={handleBreath}
          onSleep={handleSleep}
          onIdea={handleIdea}
          onScenery={handleScenery}
          onSpecial={handleSpecial}
          onSetFocus={(uid) => setState((prev) => (prev?.combat ? { ...prev, combat: { ...prev.combat, focus: uid } } : prev))}
          onOpenEnemyDetail={(uid) => setInspectedEnemyUid(uid)}
          onOpenHeroDetail={() => setShowHeroDetailModal(true)}
          onOpenPiles={(which) => setShowPiles(which)}
          onOpenLog={() => setShowLogModal(true)}
          onBackToMenu={() => {
            if (!state.path || state.path.length === 0) {
              setState((prev) => (prev ? { ...prev, phase: 'test', combat: null } : null));
            } else {
              setState((prev) => (prev ? { ...prev, phase: 'title', combat: null } : null));
            }
          }}
          onOpenBestiary={() => setShowBestiaryModal(true)}
        />
      )}

      {currentPhase === 'end' && state && (
        <EndScreen
          state={state}
          onReturnTitle={() => setState(null)}
        />
      )}

      {currentPhase === 'options' && (
        <OptionsScreen
          options={options}
          onChangeOptions={handleOptionsChange}
          onBack={() => setState((prev) => (prev ? { ...prev, phase: 'title' } : null))}
          onOpenChangelog={() => setShowChangelogModal(true)}
        />
      )}

      {/* MODALS */}
      {/* 1. Piles Modal */}
      {showPiles && state && (
        <PilesModal
          drawPile={state.combat ? state.combat.draw : state.deckAll}
          discardPile={state.combat ? state.combat.discard : []}
          handPile={state.combat ? state.combat.hand : []}
          initialTab={showPiles}
          onClose={() => setShowPiles(null)}
        />
      )}

      {/* 2. Enemy Detail Modal */}
      {inspectedEnemyUid && state?.combat && (
        <EnemyDetailModal
          enemy={state.combat.enemies.find((e) => e.uid === inspectedEnemyUid) || state.combat.enemies[0]}
          onClose={() => setInspectedEnemyUid(null)}
        />
      )}

      {/* 2b. Hero Detail Modal */}
      {showHeroDetailModal && state && (
        <HeroDetailModal
          hero={HEROES[state.hero] || HEROES.pobuda}
          onSelect={() => setShowHeroDetailModal(false)}
          onClose={() => setShowHeroDetailModal(false)}
        />
      )}

      {/* 3. Combat Log Modal */}
      {showLogModal && state && (
        <CombatLogModal
          logs={state.log}
          onClose={() => setShowLogModal(false)}
        />
      )}

      {/* 4. Discard Overflow Modal */}
      {state?.combat?.pauseTime && (
        <DiscardOverflowModal
          hand={state.combat.hand}
          handCap={state.combat.handCap}
          onDiscardCard={handleDiscardOverflow}
        />
      )}

      {/* 5. Tutorial / Rules Guide Modal */}
      {showGuideModal && (
        <TutorialGuideModal onClose={() => setShowGuideModal(false)} />
      )}

      {/* 6. Changelog Modal */}
      {showChangelogModal && (
        <ChangelogModal onClose={() => setShowChangelogModal(false)} />
      )}

      {/* 7. Bestiary / Overview of all bogeys Modal */}
      {showBestiaryModal && (
        <BestiaryModal onClose={() => setShowBestiaryModal(false)} />
      )}
    </div>
  );
}
