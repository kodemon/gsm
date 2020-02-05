import { dieRoll } from "helpers";
import { Attribute, Character } from "character";

import { SkillModifier } from "./SkillModifier.ts";
import { SkillRank, getRankModifier } from "./SkillRank.ts";
import { SkillResult } from "./SkillResult.ts";

export * from "./SkillModifier.ts";
export * from "./SkillRank.ts";
export * from "./SkillResult.ts";

export abstract class Skill {
  /**
   * Skill identifier.
   * @type {string}
   */
  public static readonly id: string;

  /**
   * Name of the skill.
   * @type {string}
   */
  public readonly name: string;

  /**
   * Description of the skill.
   * @type {string}
   */
  public readonly description: string;

  /**
   * Experience points for this skill.
   * @type {number}
   */
  public readonly xp: number;

  /**
   * Tool required to perform the skill.
   * @type {string}
   */
  public readonly tool: string[];

  /**
   * Which attributes this skill uses to calculate outcomes.
   */
  public readonly attribute: {
    /**
     * Attribute used to calculate success or failure.
     * @type {Attribute}
     */
    perform: Attribute;

    /**
     * Attribute used to calculate the outcome value. This can represent amount
     * of health healed, damage delivered, or any other outcome value.
     * @type {Attribute}
     */
    outcome: Attribute;
  };

  /**
   * Size of the die that is rolled for this skill.
   * @type {number}
   */
  public readonly dieSize: number;

  /**
   * Character attached to this skill instance.
   * @type {Character}
   */
  private readonly character: Character;

  /**
   * Creates a new Skill instance for this character.
   *
   * @param xp - Amount of xp character has with this skill.
   * @param character - Character the skill is attached to.
   */
  constructor(xp: number, character: Character) {
    this.xp = xp;
    this.character = character;
  }

  /**
   * Skill rank.
   * @type {SkillRank}
   */
  public get rank(): SkillRank {
    if (this.xp < 3000) {
      return "E";
    }
    if (this.xp < 6000) {
      return "D";
    }
    if (this.xp < 9000) {
      return "C";
    }
    if (this.xp < 12000) {
      return "B";
    }
    if (this.xp < 18000) {
      return "A";
    }
    return "S";
  }

  /**
   * Perform the skill against the target value to beat.
   *
   * @param target - Target to beat.
   *
   * @returns result of the performance.
   */
  public use(target: number): SkillResult {
    const roll = this.roll(this.attribute.perform);
    if (roll === 1) {
      return SkillResult.CRITICAL_FAILURE;
    }
    if (roll < target) {
      return SkillResult.FAILURE;
    }
    if (roll === this.dieSize) {
      return SkillResult.CRITICAL_SUCCESS;
    }
    return SkillResult.SUCCESS;
  }

  /**
   * Get outcome modifier.
   *
   * @param result - Skill result used to determine the modifier.
   * @param args - Dynamic list of arguments that can influence modifier.
   *
   * @returns modifier or undefined.
   */
  public modifier(result: SkillResult, ...args: any): SkillModifier | undefined {
    return undefined;
  }

  /**
   * Outcome value of the skill performed.
   *
   * @param modifier - Modifier to adjust the outcome.
   *
   * @returns outcome value.
   */
  public outcome(modifier?: SkillModifier): number {
    const roll = this.roll(this.attribute.outcome);
    if (modifier) {
      switch (modifier.type) {
        case "*": {
          return roll * modifier.value;
        }
        case "+": {
          return roll + modifier.value;
        }
        case "-": {
          return roll - modifier.value;
        }
        case "/": {
          return roll / modifier.value;
        }
      }
    }
    return roll;
  }

  /**
   * Rolls against the characters skill attribute, adding and returning the
   * resulting value.
   *
   * @param attribute - Which attribute we are rolling against.
   * @param dieSize - Size of the die being rolled.
   *
   * @returns character attribute value + die roll.
   */
  private roll(attribute: Attribute, dieSize: number = this.dieSize): number {
    return getRankModifier(this.rank, this.character.attributes[attribute] + dieRoll(dieSize));
  }

  /**
   * Gets instance as a JSON object.
   */
  public toJSON() {
    return {
      name: this.name,
      description: this.description,
      xp: this.xp,
      rank: this.rank,
      tool: this.tool,
      attribute: this.attribute,
      dieSize: this.dieSize
    };
  }
}
