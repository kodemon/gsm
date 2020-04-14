import { Character } from "characters";
import { sample } from "helpers";

export class Combatant {
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
      if (target.status !== "dead") {
        alive.push(target);
      }
    }
    if (alive.length) {
      return sample(alive);
    }
  }
}
