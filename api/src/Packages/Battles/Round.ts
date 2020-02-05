import { Character, characters } from "characters";
import { uuid, dieRoll, delay } from "helpers";

import { Battle } from "./Battle";
import { Combatant } from "./Combatant";

export class Round {
  /**
   * Unique battle round identifier.
   */
  public id: string;

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
  public combatants: Combatant[] = [];

  /**
   * Creates a new BattleRound instance.
   *
   * @param battle - Battle this round is being fought under.
   * @param round - Which round of battle is being fought.
   */
  constructor(battle: Battle, round: number = 1) {
    this.id = uuid();
    this.battle = battle;
    this.round = round;
    this.initiative();
  }

  /**
   * Rolls initiative for all combatants that are available to fight.
   */
  private initiative(): void {
    const initiative: { roll: number; combatant: Combatant }[] = [];
    for (const formation of this.battle.formations) {
      formation.party.members.forEach((member, index) => {
        if (member.status !== "dead") {
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
      if (combatant.character.status !== "dead") {
        const target = combatant.getTarget(this.getTargets(combatant));
        if (target) {
          this.fight(combatant.character, target);
        } else {
          console.log(`\n\n${combatant.character.name} could not find any valid targets, skipping...`);
        }
        await delay();
        characters.publish();
      }
    }
  }

  private fight(attacker: Character, defender: Character): void {
    const roll = dieRoll(20);

    console.log(`\n\n${attacker.name} rolled ${roll}`);

    if (roll === 1) {
      console.log(`  ${attacker.name}s attack missed ${defender.name}`);
      return;
    }

    if (roll === 20 || roll + attacker.getAttackBonus() > defender.getArmorClass()) {
      const weapon = attacker.equipment.primary;
      if (weapon) {
        const damage = weapon.getDamage(roll, attacker);
        defender.receiveDamage(damage);
        console.log(`  ${attacker.name}s attack hit ${defender.name} for ${damage} points of damage.`);
      }
    } else {
      console.log(`  ${attacker.name}s attack missed ${defender.name}`);
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
    return formation.filter(c => c.status !== "dead");
  }
}
