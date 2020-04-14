import { DateOfBirth, date, Gender } from "lib";
import { Class, classes } from "classes";
import { Race, races } from "races";
import { Skill, skills } from "skills";

import { Attributes } from "./Attributes";
import { Equipment } from "./Equipment";

export class Character {
  /**
   * Unique identifier.
   */
  public id: string;

  /*
   |--------------------------------------------------------------------------------
   | General Attributes
   |--------------------------------------------------------------------------------
   */

  /**
   * Race of the character.
   */
  public readonly race: Race;

  /**
   * Characters class.
   */
  public readonly class: Class;

  /**
   * Name of the character.
   */
  public readonly name: string;

  /**
   * Gender of the character.
   */
  public readonly gender: Gender;

  /**
   * When the character was born.
   */
  public readonly dateOfBirth: DateOfBirth;

  /**
   * Attributes.
   */
  public attributes: Attributes;

  /*
   |--------------------------------------------------------------------------------
   | Dynamic Attributes
   |--------------------------------------------------------------------------------
   */

  /**
   * Number of experience point this character has gained.
   */
  public experience: number;

  /**
   * Characters current status.
   */
  public status: Status;

  /**
   * Characters total, and current health.
   */
  public health: Health;

  /**
   * Characters total, and current mana.
   */
  public mana: Mana;

  /**
   * Characters equipped gear.
   */
  public equipment: Equipment;

  /**
   * Skills.
   */
  public skills: {
    [id: string]: {
      xp: number;
      skill: Skill;
    };
  } = {};

  /**
   * Creates a new Character instance.
   *
   * @param data
   */
  constructor(data: CharacterData) {
    this.id = data.id;

    this.race = races.get(data.race);
    this.class = classes.get(data.class);

    this.name = data.name;
    this.gender = data.gender;
    this.dateOfBirth = new DateOfBirth(data.dateOfBirth);

    this.attributes = new Attributes(data.attributes);

    this.experience = data.experience;

    this.status = data.status;
    this.health = data.health;
    this.mana = data.mana;

    this.equipment = new Equipment(data.equipment);

    for (const skill of data.skills) {
      this.skills[skill.id] = {
        xp: skill.xp,
        skill: skills.get(skill.id)
      };
    }
  }

  /*
   |--------------------------------------------------------------------------------
   | Getters
   |--------------------------------------------------------------------------------
   */

  /**
   * Characters level based on current xp.
   *
   * @returns character level
   */
  public get level(): number {
    const level = Math.floor(this.experience / 1000);
    if (level > 0) {
      return level;
    }
    return 1;
  }

  /**
   * Get the characters age based on given current date.
   *
   * @returns characters age
   */
  public get age(): number {
    const year = date.current.year - this.dateOfBirth.year;
    if (this.dateOfBirth.month > date.current.month) {
      return year - 1;
    }
    if (this.dateOfBirth.day > date.current.day) {
      return year - 1;
    }
    return year;
  }

  /*
   |--------------------------------------------------------------------------------
   | Actions
   |--------------------------------------------------------------------------------
   */

  /**
   * Get characters attack bonus.
   *
   * @returns attack bonus
   */
  public getAttackBonus(): number {
    const weapon = this.equipment.primary;
    switch (weapon?.getAttackType()) {
      case "ranged": {
        return this.class.baseAttackBonus[this.level - 1] + this.attributes.dexterity;
      }
      default: {
        return this.class.baseAttackBonus[this.level - 1] + this.attributes.strength;
      }
    }
  }

  /**
   * Get characters armor class.
   *
   * @returns armor class
   */
  public getArmorClass(): number {
    return this.equipment.getArmorClass() + this.attributes.dexterity + 10;
  }

  /*
   |--------------------------------------------------------------------------------
   | Mutations
   |--------------------------------------------------------------------------------
   */

  /**
   * Add damage to the character reducing their current health.
   *
   * @param dmg - Damage received.
   */
  public receiveDamage(dmg: number): void {
    this.health.current -= dmg;
    if (this.health.current < 1) {
      this.status = "dead";
    }
  }

  /*
   |--------------------------------------------------------------------------------
   | Converters
   |--------------------------------------------------------------------------------
   */

  /**
   * Get the character as a storable data object.
   */
  public toData(): CharacterData {
    return {
      id: this.id,

      race: this.race.id,
      class: this.class.id,

      name: this.name,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,

      attributes: this.attributes,

      experience: this.experience,

      status: this.status,
      health: this.health,
      mana: this.mana,

      equipment: this.equipment.toData(),

      skills: Object.values(this.skills).map(({ xp, skill }) => ({ id: skill.id, xp }))
    };
  }

  /**
   * Get JSON representation of the character.
   *
   * @returns json
   */
  public toJSON() {
    return {
      id: this.id,

      name: this.name,
      race: this.race.name,
      gender: this.gender,
      age: this.age,

      attributes: this.attributes,

      level: this.level,
      experience: this.experience,

      status: this.status,
      health: this.health,
      mana: this.mana,

      equipment: this.equipment,

      skills: {}
    };
  }
}

/*
 |--------------------------------------------------------------------------------
 | Character Types
 |--------------------------------------------------------------------------------
 */

/**
 * Character data format.
 */
export type CharacterData = {
  id: string;

  race: string;
  class: string;

  name: string;
  gender: Gender;
  dateOfBirth: {
    year: number;
    month: number;
    day: number;
  };

  attributes: {
    strength: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  experience: number;

  status: Status;
  health: Health;
  mana: Mana;

  equipment: any;

  skills: {
    id: string;
    xp: number;
  }[];
};

export type Status = "idle" | "combat" | "unconscious" | "dead";

type Health = {
  total: number;
  current: number;
};

type Mana = {
  total: number;
  current: number;
};
