import { Party } from "world";

import { Battle } from "./Battle";

/*
 |--------------------------------------------------------------------------------
 | Manager
 |--------------------------------------------------------------------------------
 */

export class BattleManager {
  /**
   * Current battles being fought in the world.
   */
  public battles: { [id: string]: Battle } = {};

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

    this.battles[battle.id] = battle;

    battle.resolve().then(() => {
      for (const formation of battle.formations) {
        for (const member of formation.members) {
          if (member.status !== "dead") {
            member.status = "idle";
          }
        }
      }
      this.remove(battle.id);
      console.log(`\n\nBattle between '${parties[0].name}' and '${parties[1].name}' has ended.`);
    });
  }

  /**
   * Get a battle from the pool.
   *
   * @param id - Parties unique identifier.
   *
   * @returns battle or undefined
   */
  public get(id: string): Battle | undefined {
    return this.battles[id];
  }

  /**
   * Removes a battle from the pool.
   *
   * @param id - Battle uuid to remove.
   */
  public remove(id: string): void {
    delete this.battles[id];
  }

  /**
   * Flushes the character pool.
   */
  public flush(): void {
    this.battles = {};
  }

  /**
   * Get the JSON representation of the battle pool
   *
   * @returns list of battles
   */
  public toJSON() {
    return Array.from(Object.values(this.battles));
  }
}

export const battles = new BattleManager();
