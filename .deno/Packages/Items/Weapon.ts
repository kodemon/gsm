import { Attribute, Character } from "character";
import { dieRoll, getRandomNumber } from "helpers";
import { SkillResult } from "skills";

import { Item, ItemData } from "./Item.ts";

export interface WeaponData extends ItemData {
  range: number;
  damage: [number, number];
}

export class Weapon extends Item {
  /**
   * Which parts of a formation that can be targeted.
   */
  public range: number;

  /**
   * Amount of damage done on success.
   * Values: [min, max]
   */
  public damage: [number, number];

  /**
   * Creates a new Weapon instance.
   */
  constructor(data: WeaponData) {
    super(data);
    this.range = data.range;
    this.damage = [6, 12];
  }

  /**
   * Perform a damage roll with the weapon.
   *
   * @param actor - Character that is performing the attack.
   * @param target - Character that is receiving the attack.
   *
   * @returns action result
   */
  public use(actor: Character, target: Character): any {
    const skill = actor.skills[this.skill];
    const difficulty = 15; // difficulty should be calculated based on characters current situation and status ...

    const result = skill.use(difficulty);
    switch (result) {
      case SkillResult.CRITICAL_FAILURE: {
        const damage = this.getDamage(this.getDamageModifier(result, actor, [Attribute.Strength]));
        actor.state.addDamage(damage);
        console.log(
          `${actor.name}s attack missed badly and received ${damage} points of damage. | Remaining Health: ${actor.state.health.current}`
        );
        break;
      }
      case SkillResult.FAILURE: {
        console.log(`${actor.name}s attack missed ${target.name}`);
        break;
      }
      case SkillResult.SUCCESS: {
        const damage = this.getDamage(this.getDamageModifier(result, actor, [Attribute.Strength]));
        target.state.addDamage(damage);
        console.log(
          `${actor.name}s attack hit ${target.name} for ${damage} points of damage. | Remaining Health: ${target.state.health.current}`
        );
        break;
      }
      case SkillResult.CRITICAL_SUCCESS: {
        const damage = this.getDamage(this.getDamageModifier(result, actor, [Attribute.Strength]));
        target.state.addDamage(damage);
        console.log(
          `${actor.name}s critically attack hit ${target.name} for ${damage} points of damage. | Remaining Health: ${target.state.health.current}`
        );
        break;
      }
    }
  }

  /**
   * Gets random damage number based on the min, max value of the weapon.
   *
   * @param modifier - Damage adjustment modifier caused by characters attributes and/or skill.
   *
   * @returns damage
   */
  public getDamage(modifier: number = 1): number {
    return Math.ceil(getRandomNumber(this.damage[0], this.damage[1]) * modifier);
  }

  /**
   * Gets calculated damage modifier based on the result, characters attributes and item skill.
   *
   * @param result - Result of the characters action.
   * @param character - Character calculating modifier bonuses for.
   * @param attributes - Attributes calculate points from.
   *
   * @returns damage modifier in decimal.
   */
  public getDamageModifier(result: SkillResult, character: Character, attributes: Attribute[]): number {
    let modifier = 1;

    switch (result) {
      case SkillResult.CRITICAL_FAILURE:
      case SkillResult.CRITICAL_SUCCESS: {
        modifier += 2;
        break;
      }
    }

    switch (character.skills[this.skill].rank) {
      case "E": {
        modifier -= 0.3;
        break;
      }
      case "D": {
        modifier -= 0.1;
        break;
      }
      case "B": {
        modifier += 0.1;
        break;
      }
      case "A": {
        modifier += 0.3;
        break;
      }
      case "S": {
        modifier += 0.6;
        break;
      }
    }

    let points = 0;
    for (const attr of attributes) {
      points += character.attributes[attr];
    }
    while (points > 0) {
      const remainder = (points -= 10);
      if (remainder > 0) {
        modifier += 0.1;
      }
    }

    modifier += dieRoll(50) / 100;

    return modifier;
  }

  /**
   * Get JSON representation of the weapon.
   *
   * @param data
   */
  public toJSON() {
    return super.toJSON({
      damage: this.damage
    });
  }
}
