import { Character, AttributeType } from "./Character";
import { dieRoll } from "./Utils";
import { Item } from "./Item";

/*
 |--------------------------------------------------------------------------------
 | Skill
 |--------------------------------------------------------------------------------
 */

export abstract class Skill {
  public id: string;
  public name: string;
  public description: string;
  public attribute: AttributeType;
  public required: boolean;

  /**
   * Create a new Skill instance.
   *
   * @param data - Skill data.
   */
  constructor(data: SkillData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.attribute = data.attribute;
    this.required = data.required === true;
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
    const roll = dieRoll(20);

    if (roll === 1) {
      return SkillResult.CriticalFailure;
    }
    if (roll === 20) {
      return SkillResult.CriticalSuccess;
    }

    // ### Natural Attribute
    // Reduce the target by the characters natural attribute.

    target -= character.attributes.modifier(this.attribute);

    // ### Skill Modifier
    // If the character possesses proficiency in the used skill their
    // skill proficiency value is subtracted from the target.

    const skill = character.skill(this.id);
    if (skill) {
      target -= skill.value;
    }

    // ### Return Result

    if (roll >= target) {
      return SkillResult.Success;
    }
    return SkillResult.Failure;
  }

  /**
   * Affect the outcome of the use of the skill.
   *
   * @param from - Character performing the skill.
   * @param to   - Character receiving the effect.
   * @param item - Item used to potentially boost the effect.
   */
  public affect(from: Character, to: Character, item?: Item): void {
    throw new Error(`${this.name} is missing its .affect method!`);
  }
}

/*
 |--------------------------------------------------------------------------------
 | Typed
 |--------------------------------------------------------------------------------
 */

export enum SkillResult {
  CriticalFailure = "CRITICAL_FAILURE",
  Failure = "FAILURE",
  Success = "SUCCESS",
  CriticalSuccess = "CRITICAL_SUCCESS"
}

/*
 |--------------------------------------------------------------------------------
 | Typed
 |--------------------------------------------------------------------------------
 */

type SkillData = {
  id: string;
  type: SkillType;
  name: string;
  description: string;
  attribute: AttributeType;
  required?: boolean;
};

export enum SkillType {
  Support = "SUPPORT",
  Melee = "MELEE",
  Magic = "MAGIC"
}
