import { Character } from "character";
import { SkillResult } from "skills";

export enum ItemType {
  Armor = "armor",
  Clothing = "clothing",
  Weapon = "weapon"
}

export enum ItemRarity {
  Common = "common",
  Rare = "rare",
  Magic = "magic",
  Unique = "unique",
  Legendary = "legendary"
}

export type ItemDialogue<T> = {
  [key in SkillResult]: ((item: T, ...args: any) => string)[];
};

export interface ItemData {
  id: string;
  type: ItemType;
  skill: string;
  rarity: ItemRarity;
  name: string;
  description: string;
  durability: number;
}

export class Item {
  /**
   * List of available dialogues when item is being used.
   */
  public static dialogues: ItemDialogue<Item> = {
    [SkillResult.CRITICAL_FAILURE]: [],
    [SkillResult.FAILURE]: [],
    [SkillResult.SUCCESS]: [],
    [SkillResult.CRITICAL_SUCCESS]: []
  };

  /**
   * Item identifier.
   */
  public id: string;

  /**
   * Type of item.
   */
  public type: ItemType;

  /**
   * Skill required to use this item.
   */
  public skill: string;

  /**
   * Rarity of the item.
   */
  public rarity: ItemRarity;

  /**
   * Name of the item.
   */
  public name: string;

  /**
   * Description of the item.
   */
  public description: string;

  /**
   * Durability of the item.
   */
  public durability: number;

  /**
   * Creates a new Item instance.
   *
   * @param data - Item data.
   */
  constructor(data: ItemData) {
    this.id = data.id;
    this.type = data.type;
    this.skill = data.skill;
    this.rarity = data.rarity;
    this.name = data.name;
    this.description = data.description;
    this.durability = data.durability;
  }

  /**
   * Checks if the provided character can use this item.
   *
   * @param character - Character to check eligibility for.
   *
   * @returns true / false
   */
  public canUse(character: Character): boolean {
    if (this.skill && !character.skills[this.skill]) {
      return false;
    }
    return true;
  }

  /**
   * Get JSON representation of the item.
   *
   * @param data
   */
  public toJSON(data: any = {}) {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      skill: this.skill,
      ...data
    };
  }
}
