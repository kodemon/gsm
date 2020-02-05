import { Character } from "character";
import { delay, dieRoll, sample } from "helpers";
import { v4 as uuid } from "uuid";

import { Party } from "./PartyManager.ts";

/*
 |--------------------------------------------------------------------------------
 | Manager
 |--------------------------------------------------------------------------------
 */

export class BattleManager {
  /**
   * Current battles being fought in the world.
   */
  private pool: BattlePool = {};

  /**
   * Creates a new BattleManager instance.
   */
  constructor() {
    // this.pool = this.getPool();
    // loop through and continue resolving battles
  }

  /**
   * Adds a new battle to the battle pool.
   *
   * @param parties - Parties to engage in battle.
   */
  public add(parties: [Party, Party]) {
    const battle = new Battle(parties);

    this.pool[battle.uuid] = battle;

    battle.resolve().then(() => {
      for (const formation of battle.formations) {
        for (const member of formation.members) {
          if (member.state.status !== "dead") {
            member.state.status = "idle";
          }
        }
      }
      this.remove(battle.uuid);
    });
  }

  /**
   * Get a battle from the pool.
   *
   * @param uuid - Parties unique identifier.
   *
   * @returns battle or undefined
   */
  public get(uuid: string): Battle | undefined {
    return this.pool[uuid];
  }

  /**
   * Removes a battle from the pool.
   *
   * @param uuid - Battle uuid to remove.
   */
  public remove(uuid: string): void {
    delete this.pool[uuid];
  }

  /**
   * Flushes the character pool.
   */
  public flush(): void {
    this.pool = {};
  }

  /**
   * Get the JSON representation of the battle pool
   *
   * @returns list of battles
   */
  public toJSON() {
    return Array.from(Object.values(this.pool));
  }
}

/*
 |--------------------------------------------------------------------------------
 | Battle
 |--------------------------------------------------------------------------------
 */

export class Battle {
  /**
   * Unique battle identifier.
   */
  public uuid: string;

  /**
   * List of parties participating in this battle.
   */
  public formations: BattleFormation[];

  /**
   * List of resolved battle rounds.
   */
  public rounds: BattleRound[];

  /**
   * Creates a new Battle instance.
   */
  constructor(parties: [Party, Party]) {
    this.uuid = uuid.generate();
    this.rounds = [];
    this.formations = [];
    for (const party of parties) {
      for (const member of party.members) {
        member.state.status = "fighting";
      }
      this.formations.push({
        party,
        members: party.getFormation()
      });
    }
  }

  /**
   * Has the battle been resolved?
   *
   * @remarks
   * Check if any of the active formations has at least one member
   * capable of performing an action.
   *
   * @returns 'true' if battle is resolved, 'false' if not
   */
  public get resolved(): boolean {
    for (const formation of this.formations) {
      let hasActiveMembers = false;
      for (const member of formation.party.members) {
        if (member.state.status !== "dead") {
          hasActiveMembers = true;
          break;
        }
      }
      if (!hasActiveMembers) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get the last resolved battle round.
   *
   * @returns battle round
   */
  public getPreviousBattleRound(): BattleRound | undefined {
    const length = this.rounds.length;
    if (length) {
      return this.rounds[length - 1];
    }
  }

  /**
   * Attempts to resolve the battle by completing a battle round.
   *
   * @remarks
   * A battle is resolved if all of the members of a party has
   * been killed or successfully fled the battle.
   */
  public async resolve(): Promise<void> {
    const round = new BattleRound(this, this.getPreviousBattleRound()?.round);

    this.rounds.push(round);

    await round.resolve();

    if (!this.resolved) {
      return await this.resolve();
    }
  }

  /**
   * Get JSON representation of the battle.
   */
  public toJSON() {
    return {
      formations: this.formations.map(formation => ({
        party: formation.party.name,
        members: formation.members.map(c => {
          return {
            name: c.name,
            status: c.state.status
          };
        })
      }))
    };
  }
}

/*
 |--------------------------------------------------------------------------------
 | Battle Round
 |--------------------------------------------------------------------------------
 */

class BattleRound {
  /**
   * Unique battle round identifier.
   */
  public uuid: string;

  /**
   * Identifier of the battle this round is being fought within.
   */
  public battle: Battle;

  /**
   * Number of the round in the battle.
   */
  public round: number;

  /**
   * List of combatants in order of initiative.
   *
   * @remarks
   * Initiative is rolled by taking the characters speed and
   * adding a D10 die roll. The character with the highest
   * roll goes first.
   */
  public combatants: Combatant[];

  /**
   * Creates a new BattleRound instance.
   *
   * @param battle - Battle this round is being fought under.
   * @param round - Which round of battle is being fought.
   */
  constructor(battle: Battle, round: number = 1) {
    this.battle = battle;
    this.round = round;
    this.initiative();
  }

  /**
   * Rolls initiative for all combatants that are available to fight.
   */
  private initiative(): void {
    const initiative = [];
    for (const formation of this.battle.formations) {
      formation.party.members.forEach((member, index) => {
        if (member.state.status !== "dead") {
          initiative.push({
            roll: member.speed + dieRoll(10),
            combatant: new Combatant(formation.party.uuid, member, index + 1)
          });
        }
      });
    }
    this.combatants = initiative.sort((a, b) => a.roll - b.roll).map(sorted => sorted.combatant);
  }

  /**
   * Resolves the battle by each combatant taking an action.
   */
  public async resolve(): Promise<void> {
    for (const combatant of this.combatants) {
      const target = combatant.getTarget(this.getTargets(combatant));
      if (target) {
        combatant.character.attack(target);
      } else {
        console.log(`${combatant.character.name} could not find any valid targets, skipping...`);
      }
      await delay();
    }
  }

  /**
   * Get a list of characters that can be engaged by the provided combatant.
   *
   * @param combatant - Combatant to get targets for.
   *
   * @returns characters
   */
  private getTargets(combatant: Combatant): Character[] {
    const [a, b] = this.battle.formations;
    const formation = a.party.uuid === combatant.party ? b.members : a.members;
    const range = combatant.character.range;
    return formation
      .filter(c => c.state.status !== "dead")
      .reduce((targets, character, index) => {
        if (index < range) {
          targets.push(character);
        }
        return targets;
      }, []);
  }
}

/*
 |--------------------------------------------------------------------------------
 | Battle Combatant
 |--------------------------------------------------------------------------------
 */

class Combatant {
  /**
   * Party the member belongs to.
   */
  public party: string;

  /**
   * Character.
   */
  public character: Character;

  /**
   * Combatants position in the formation.
   */
  public position: number;

  /**
   * Creates a new Combatant instance.
   *
   * @param party - Party the combatant belongs to.
   * @param character - Character this combatant represents.
   * @param position - Combatants position in the formation.
   */
  constructor(party: string, character: Character, position: number) {
    this.party = party;
    this.character = character;
    this.position = position;
  }

  /**
   * Gets random target to perform an action against.
   *
   * @returns character or undefined if no targets are left alive
   */
  public getTarget(targets: Character[]): Character | undefined {
    const alive = [];
    for (const target of targets) {
      if (target.state.status !== "dead") {
        alive.push(target);
      }
    }
    if (alive.length) {
      return sample(alive);
    }
  }
}

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

type BattlePool = {
  [uuid: string]: Battle;
};

type BattleFormation = {
  party: Party;
  members: Character[];
};
