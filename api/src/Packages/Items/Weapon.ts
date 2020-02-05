import { Character, characters } from "characters";
import { dieRoll } from "helpers";
import { Skill } from "skills";

import { Item, ItemData } from "./Item";

export class Weapon extends Item {
  /**
   * Which parts of a formation that can be targeted.
   */
  public range: number;

  /**
   * Amount of damage done on success.
   * Values: [amount, size]
   */
  public damage: [number, number];

  /**
   * Critical modifier.
   */
  public critical: {
    threat: number;
    multiplier: number;
  };

  /**
   * Creates a new Weapon instance.
   */
  constructor(data: WeaponData) {
    super(data);
    this.range = data.range;
    this.damage = data.damage;
    this.critical = data.critical;
  }

  /**
   * Perform a damage roll after a successful attack.
   *
   * @remarks
   * Damage is calculated by the weapons attributes, along with the characters natural
   * attributes and skill that was performed.
   *
   * @param roll - Attack roll.
   * @param character - Character that performed the attack.
   *
   * @returns damage
   */
  public getDamage(roll: number, character: Character): number {
    const [amount, size] = this.damage;

    // ### Weapon Damage

    let output = 0; // base attack bonus goes here ...
    for (let i = 0; i < amount; i++) {
      output += dieRoll(size);
    }

    // ### Skill Bonus

    const { xp, skill } = character.skills[this.skill.type] || {};

    let threatModifier = 0;

    if (skill) {
      const { damage, threat } = skill.getModifiers(xp);
      if (damage) {
        const [die, size] = damage;
        for (let i = 0; i < die; i++) {
          output += dieRoll(size);
        }
      }
      if (threat) {
        threatModifier = threat;
      }
    }

    // ### Attribute Bonus

    switch (this.getAttackType()) {
      case "melee": {
        output += Math.floor((character.attributes.strength - 10) / 2);
        break;
      }
      case "ranged": {
        output = Math.floor((character.attributes.dexterity - 10) / 2);
      }
    }

    // ### Threat Bonus

    if (roll >= this.critical.threat - threatModifier) {
      output *= this.critical.multiplier;
    }

    return output < 1 ? 1 : output;
  }

  /**
   * Get the attack type based on item type.
   *
   * @returns melee, ranged or undefined
   */
  public getAttackType(): "melee" | "ranged" | undefined {
    switch (this.skill.type) {
      case "sword": {
        return "melee";
      }
      case "bow": {
        return "ranged";
      }
    }
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

export interface WeaponData extends ItemData {
  range: number;
  damage: [number, number];
  critical: {
    threat: number;
    multiplier: number;
  };
}
