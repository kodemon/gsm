import { ValueObject } from "lib";

/**
 * Character attributes.
 */
export enum Attribute {
  Strength = "strength",
  Constitution = "constitution",
  Dexterity = "dexterity",
  Intelligence = "intelligence",
  Wisdom = "wisdom",
  Charisma = "charisma"
}

/**
 * Character attribute values array constant.
 */
const ATTRIBUTES = Object.values(Attribute);

/**
 * Attributes
 *
 * @extends ValueObject
 */
export class Attributes extends ValueObject<
  Attributes,
  {
    strength: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  }
> {
  /**
   * Measuring physical power and carrying capacity.
   * @type {number}
   */
  public strength!: number;

  /**
   * Measuring endurance, stamina and good health.
   * @type {number}
   */
  public constitution!: number;

  /**
   * Measuring agility, balance, coordination and reflexes.
   * @type {number}
   */
  public dexterity!: number;

  /**
   * Measuring deductive reasoning, knowledge, memory, logic and rationality.
   * @type {number}
   */
  public intelligence!: number;

  /**
   * Measuring self-awareness, common sense, restraint, perception and insight.
   * @type {number}
   */
  public wisdom!: number;

  /**
   * Measuring force of personality, persuasiveness, leadership and successful planning.
   * @type {number}
   */
  public charisma!: number;

  /**
   * Ensure both family and given name has been provided.
   */
  public validate() {
    for (const attr of ATTRIBUTES) {
      if (this[attr] < 3) {
        throw new Error(`Attribute ${attr} cannot be lower than 3.`);
      }
    }
  }
}
