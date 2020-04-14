import { Character } from "characters";
import { SkillRank, SKILL_RANK_RANGE } from "skills";

/*
 |--------------------------------------------------------------------------------
 | Item
 |--------------------------------------------------------------------------------
 */

export class Item {
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
  public skill: ItemSkill;

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
   * @returns 'true' if item can be used, 'false' if not
   */
  public canUse(character: Character): boolean {
    const { xp, skill } = character.skills[this.id];
    if (!skill || SKILL_RANK_RANGE[skill.getRank(xp)] < SKILL_RANK_RANGE[this.skill.rank]) {
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

/*
 |--------------------------------------------------------------------------------
 | Data Interface
 |--------------------------------------------------------------------------------
 */

export interface ItemData {
  id: string;
  type: ItemType;
  skill: ItemSkill;
  rarity: ItemRarity;
  name: string;
  description: string;
  durability: number;
}

/**
 * Item type.
 */
export type ItemType = "armor" | "weapon";

/**
 * Skill and rank needed to wield the item.
 */
export type ItemSkill = {
  type: string;
  rank: SkillRank;
};

/**
 * Rarity of the item.
 */
export type ItemRarity = "common" | "magic" | "unique" | "legendary";

/*
 |--------------------------------------------------------------------------------
 | Dialogues
 |--------------------------------------------------------------------------------
 */

export type ItemDialogue<T> = {
  [key in SkillResult]: ((item: T, ...args: any) => string)[];
};
