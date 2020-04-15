import { Character } from "./Character";
import { dieRoll } from "./Utils";
import { Item } from "./Item";

/*
 |--------------------------------------------------------------------------------
 | Skill
 |--------------------------------------------------------------------------------
 */

export abstract class Skill {
  public id: string;
  public type: SkillType;

  public name: string;
  public description: string;

  public static modifiers = [
    [2, -5],
    [4, -4],
    [6, -3],
    [8, -2],
    [10, -1],
    [12, 0],
    [14, 1],
    [16, 2],
    [18, 3],
    [20, 4],
    [22, 5],
    [24, 6],
    [26, 7],
    [28, 8],
    [30, 9]
  ];

  /**
   * Create a new Skill instance.
   *
   * @param data - Skill data.
   */
  constructor(data: SkillData) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.description = data.description;
  }

  /**
   * Get provided characters skill state.
   *
   * @param character - Character to get skill state for.
   *
   * @returns skill state
   */
  public get(character: Character): SkillState {
    let skill = character.skill(this.id);
    if (!skill) {
      skill = { id: this.id, experience: 0 };
      character.skills.push(skill);
    }
    return skill;
  }

  /**
   * Perform a skill roll and return its result.
   *
   * @remarks
   * Difficulty class is determined by environmental factors of the
   * battlefield. A battlefield can give random difficulties to combatants
   * during a battle round.
   *
   * @param character - Character performing the roll.
   * @param target    - Value the roll must match or exceed; this should include the
   *                    external negative and positive modifiers.
   *
   * @returns skill result of the roll
   */
  public roll(character: Character, target: number = 10): SkillResult {
    const skill = this.get(character);
    const roll = dieRoll(20);

    if (roll === 1) {
      skill.experience -= 1;
      return SkillResult.CriticalFailure;
    }
    if (roll === 20) {
      skill.experience += 2;
      return SkillResult.CriticalSuccess;
    }

    // ### Skill Modifier
    // If the character possesses proficiency in the used skill their
    // skill proficiency value is subtracted from the target.

    target -= this.modifier(character.skill(this.id) || { id: this.id, experience: 0 });

    // ### Return Result

    if (roll >= target) {
      skill.experience += 1;
      return SkillResult.Success;
    }
    return SkillResult.Failure;
  }

  /**
   * Get modifier used for various checks based on the attribute value.
   *
   * @param attribute - Attribute to get modifier for.
   *
   * @returns modifier value
   */
  public modifier(state: SkillState): number {
    const level = Math.floor(state.experience / 1000);
    for (const [target, modifier] of Skill.modifiers) {
      if (level < target) {
        return modifier;
      }
    }
    return 10;
  }

  /**
   * Affect the outcome of the use of the skill.
   *
   * @param from - Character performing the skill.
   * @param to   - Character being affected by the skill.
   * @param item - Item used to modify the effect of the skill.
   */
  public affect(from: Character, to: Character, item?: Item): void {
    throw new Error(`${this.name} is missing its .affect method!`);
  }
}

/*
 |--------------------------------------------------------------------------------
 | TypeScript
 |--------------------------------------------------------------------------------
 */

/**
 * Skill data.
 */
type SkillData = {
  id: string;

  type: SkillType;

  name: string;
  description: string;
};

/**
 * Represents a characters skill state.
 */
export type SkillState = {
  id: string;
  experience: number;
};

/**
 * Result of a skill roll.
 */
export enum SkillResult {
  CriticalFailure = "cf",
  Failure = "f",
  Success = "s",
  CriticalSuccess = "cs"
}

/**
 * List of skill archetypes.
 */
export enum SkillType {
  Melee = "melee",
  Range = "range",
  Magic = "magic",
  Support = "support",
  Utility = "utility"
}
