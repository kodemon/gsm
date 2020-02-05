import { Character, characters } from "characters";
import { uuid } from "helpers";
import { Party } from "world";

import { Round } from "./Round";

export class Battle {
  /**
   * Unique battle identifier.
   */
  public id: string;

  /**
   * List of parties participating in this battle.
   */
  public formations: BattleFormation[];

  /**
   * List of resolved battle rounds.
   */
  public rounds: Round[];

  /**
   * Creates a new Battle instance.
   */
  constructor(parties: [Party, Party]) {
    this.id = uuid();
    this.rounds = [];
    this.formations = [];
    for (const party of parties) {
      for (const member of party.members) {
        member.status = "fighting";
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
        if (member.status !== "dead") {
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
  public getPreviousBattleRound(): Round | undefined {
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
    const round = new Round(this, this.getPreviousBattleRound()?.round);

    this.rounds.push(round);

    await round.resolve();

    if (!this.resolved) {
      return await this.resolve();
    } else {
      for (const formation of this.formations) {
        for (const member of formation.members) {
          if (member.status !== "dead") {
            member.status = "idle";
          }
        }
      }
      characters.publish();
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
            status: c.status
          };
        })
      }))
    };
  }
}

type BattleFormation = {
  party: Party;
  members: Character[];
};
