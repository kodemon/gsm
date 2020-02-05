import { Attribute } from "characters";

export class Class {
  /**
   * Class identifier.
   */
  public readonly id: string;

  /**
   * Name of the role.
   */
  public readonly name: string;

  /**
   * Class description.
   */
  public readonly description: string;

  /**
   * Attributes in order of importance.
   */
  public readonly attributes: Attribute[];

  /**
   * Class role.
   */
  public readonly role: string;

  /**
   * Hit Dice represent a creature’s general level of power and skill. As a creature
   * gains levels, it gains additional Hit Dice.
   */
  public readonly hitDie: number;

  /**
   * Each creature has a base attack bonus and it represents its skill in combat. As
   * a character gains levels or Hit Dice, his base attack bonus improves.  When a
   * creature’s base attack bonus reaches +6, +11, or +16, he receives an additional
   * attack in combat.
   */
  public readonly baseAttackBonus: number[];

  /**
   * Creates a new Role instance.
   *
   * @param data - Data detailing the classes attributes.
   */
  constructor(data: ClassData) {
    this.id = data.id;

    this.name = data.name;
    this.description = data.description;
    this.role = data.role;

    this.attributes = data.attributes;

    this.hitDie = data.hitDie;
    this.baseAttackBonus = data.baseAttackBonus;
  }
}

export type ClassData = {
  id: string;
  name: string;

  description: string;
  role: string;

  attributes: Attribute[];

  hitDie: number;
  baseAttackBonus: number[];
};
