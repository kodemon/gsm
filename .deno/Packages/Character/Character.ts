import { sample } from "helpers";
import { items, Weapon } from "items";
import { AgeGroup, DateOfBirth, date, Gender } from "lib";
import { skills, Skill } from "skills";

import { getGreeting } from "../../Data/Speech/Greetings.ts";
import { Attributes } from "./Attributes.ts";
import { getRandomAge } from "./Helpers/mod.ts";
import { Race } from "./Races/mod.ts";

/*
 |--------------------------------------------------------------------------------
 | Character
 |--------------------------------------------------------------------------------
 */

export abstract class Character {
  /**
   * Unique identifier.
   */
  public uuid: string;

  /**
   * Name of the character.
   */
  public name: string;

  /**
   * Race of the character.
   */
  public race!: Race;

  /**
   * Gender of the character.
   */
  public gender: Gender;

  /**
   * When the character was born.
   */
  public dateOfBirth: DateOfBirth;

  /**
   * Attributes.
   */
  public attributes: Attributes;

  /**
   * Characters equipped gear.
   */
  public equipment: Equipment;

  /**
   * Skills.
   */
  public skills: { [id: string]: Skill } = {};

  /**
   * State of the character.
   */
  public state: State;

  /**
   * Creates a new Character instance.
   *
   * @param uuid - Character unique identifier.
   * @param data - Character data.
   */
  constructor(uuid: string, data: Partial<CharacterData>) {
    this.uuid = uuid;

    this.name = data.name;
    this.gender = data.gender;
    this.dateOfBirth = new DateOfBirth(data.dateOfBirth);

    this.attributes = new Attributes(data.attributes);

    this.equipment = new Equipment(data.equipment);

    for (const skill of data.skills) {
      this.skills[skill.id] = new skills[skill.id](skill.xp || 0, this);
    }

    this.state = new State(this, data.state);
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
    const level = Math.floor(this.state.xp / 1000);
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

  /**
   * Gets the characters speed.
   *
   * @returns speed
   */
  public get speed(): number {
    return getSpeed(this.attributes);
  }

  /**
   * Gets the attack range based on equipped weapon.
   *
   * @returns range
   */
  public get range(): number {
    return this.equipment.primary.range;
  }

  /*
   |--------------------------------------------------------------------------------
   | Static
   |--------------------------------------------------------------------------------
   |
   | Collection of static helper methods. These methods are abstract methods that
   | are meant to be defined per race.
   |
   */

  /**
   * Generate a random name for a character.
   *
   * @param gender - Gender we wish to generate a name for.
   *
   * @returns name
   */
  public static getRandomName(gender?: Gender): string {
    throw new Error(`Character > ${this.constructor.name} is missing required .getRandomName helper.`);
  }

  /**
   * Generate a random birth date for a character.
   *
   * @param groups - List of age groups to generate a random age from.
   *
   * @returns date of birth
   */
  public static getRandomAge(groups?: AgeGroup[]): DateOfBirth {
    const ranges = this.getAgeGroups();
    const ages = [];
    if (groups) {
      for (const group of groups) {
        const [min, max] = ranges[group];
        ages.push(getRandomAge(min, max));
      }
    } else {
      for (const range in ranges) {
        const [min, max] = ranges[range];
        ages.push(getRandomAge(min, max));
      }
    }
    return sample(ages);
  }

  /**
   * Get the age groups for the character of this race.
   *
   * @returns age group ranges
   */
  public static getAgeGroups(): { [key in AgeGroup]: [number, number] } {
    throw new Error(`Character > ${this.constructor.name} is missing required .getAgeGroups helper.`);
  }

  /*
   |--------------------------------------------------------------------------------
   | Actions
   |--------------------------------------------------------------------------------
   |
   | Collection of methods providing various actions the characters can perform.
   |
   */

  /**
   * Performs an attack against the provided target character.
   *
   * @param target - Character to attack.
   */
  public attack(target: Character): void {
    const weapon = this.equipment.primary;
    if (weapon) {
      weapon.use(this, target);
      if (this.state.getHealth() <= 0) {
        console.log(
          `${this.name}s attack ended up in a spectacular suicide, ${target.name} baffled by the bizarre turn of events moves on.`
        );
      }
      if (target.state.getHealth() <= 0) {
        console.log(`${target.name}s lifeless body hit the ground, ${this.name} stands victorious.`);
      }
    }
  }

  /**
   * Have the character say something within the provided category.
   *
   * @param category - Category of response.
   *
   * @returns characters text output.
   */
  public speak(category: "greeting"): string {
    switch (category) {
      case "greeting": {
        return getGreeting(this);
      }
    }
  }

  /*
   |--------------------------------------------------------------------------------
   | JSON
   |--------------------------------------------------------------------------------
   */

  /**
   * Convert character to a JSON object.
   *
   * @param data - When extending from a parent.
   *
   * @returns character json
   */
  public toJSON(data: any = {}) {
    return {
      uuid: this.uuid,

      name: this.name,
      race: this.race,
      gender: this.gender,
      age: this.age,

      level: this.level,

      attributes: this.attributes,

      equipment: this.equipment,

      skills: Object.values(this.skills).map(skill => skill.toJSON()),

      state: this.state.toJSON(),

      speed: this.speed,
      range: this.range,

      ...data
    };
  }
}

/*
 |--------------------------------------------------------------------------------
 | Character Equipment
 |--------------------------------------------------------------------------------
 */

class Equipment {
  /**
   * Equipped head gear.
   */
  public head?: any;

  /**
   * Equipped body armor.
   */
  public body?: any;

  /**
   * Equipped gloves.
   */
  public hands?: any;

  /**
   * Equipped leg wear.
   */
  public legs?: any;

  /**
   * Equipped boots.
   */
  public feet?: any;

  /**
   * Primary weapon.
   */
  public primary?: Weapon;

  /**
   * Secondary weapon or shield.
   */
  public secondary?: Weapon | any;

  /**
   * Creates a new Equipment instance.
   *
   * @param data
   */
  constructor(data: EquipmentData = {}) {
    this.primary = items.getItem("iron-sword");
  }
}

type EquipmentData = {
  head?: string;
  body?: string;
  hands?: string;
  legs?: string;
  feet?: string;
  primary?: {
    id: string;
    state: any;
  };
  secondary?: string;
};

/*
 |--------------------------------------------------------------------------------
 | Character Status
 |--------------------------------------------------------------------------------
 */

const CHARACTER_ENERGIES = [
  { key: "health", getTotal: getHealth },
  { key: "mana", getTotal: getMana },
  { key: "stamina", getTotal: getStamina },
  { key: "composure", getTotal: getComposure }
];

class State {
  public status: "idle" | "active" | "fighting" | "dead";
  public xp: number;
  public health: CharacterEnergy;
  public mana: CharacterEnergy;
  public stamina: CharacterEnergy;
  public composure: CharacterEnergy;

  private character: Character;

  /**
   * Creates a new CharacterStatus instance.
   *
   * @param
   */
  constructor(character: Character, data: Partial<CharacterStateData>) {
    this.status = data.status;
    this.xp = data.xp;
    this.character = character;

    for (const { key, getTotal } of CHARACTER_ENERGIES) {
      const total = getTotal(Math.floor(this.xp / 1000), character.attributes);
      this[key] = {
        total,
        current: data[key] || total
      };
    }
  }

  /**
   * Get current health value.
   *
   * @returns health
   */
  public getHealth() {
    return this.health.current;
  }

  /**
   * Get current mana value.
   *
   * @returns mana
   */
  public getMana() {
    return this.mana.current;
  }

  /**
   * Get current stamina value.
   *
   * @returns stamina
   */
  public getStamina() {
    return this.stamina.current;
  }

  /**
   * Get current composure value.
   *
   * @returns composure
   */
  public getComposure() {
    return this.composure.current;
  }

  /**
   * Add damage to the current character status.
   *
   * @param dmg - Amount of damage taken.
   */
  public addDamage(dmg: number): void {
    this.health.current -= dmg;
    if (this.health.current < 1) {
      console.log(`${this.character.name} has died.`);
      this.status = "dead";
    }
  }

  /**
   * Adds the cost of using a skill to the current character status.
   *
   * @param skill - Skill being used.
   */
  public addSkillCost(skill: any): void {
    switch (skill.costType) {
      case "mana": {
        const remainder = this.mana.current - skill.costValue;
        if (remainder <= 0) {
          throw new Error(`Not enough mana to execute ${skill.name}.`);
        }
        this.mana.current = remainder;
        break;
      }
      case "stamina": {
        const remainder = this.stamina.current - skill.costValue;
        if (remainder <= 0) {
          throw new Error(`Not enough stamina to execute ${skill.name}.`);
        }
        this.stamina.current = remainder;
        break;
      }
    }
  }

  /**
   * Recover character status by resting.
   */
  public rest(): void {
    ["health", "mana", "stamina", "composure"].forEach(key => {
      if (this[key] < this.character[key]) {
        const nextValue = this[key] + Math.floor(this.character[key] * 0.1);
        if (nextValue > this.character[key]) {
          this[key] = this.character[key];
        } else {
          this[key] = nextValue;
        }
      }
    });
  }

  /**
   * Get JSON representation of the character state.
   */
  public toJSON() {
    return {
      status: this.status,
      xp: this.xp,
      health: this.health,
      mana: this.mana,
      stamina: this.stamina,
      composure: this.composure
    };
  }
}

/*
 |--------------------------------------------------------------------------------
 | Character Utilities
 |--------------------------------------------------------------------------------
 */

/**
 * Get calculated character total health.
 *
 * @param level
 * @param param.strength
 * @param param.constitution
 *
 * @returns total health
 */
function getHealth(level: number, { strength, constitution }: Attributes): number {
  const base = Math.ceil(strength / 2 + constitution);
  const adjustment = Math.ceil(base / 2);
  return base + adjustment * level;
}

/**
 * Get calculated character total mana.
 *
 * @param level
 * @param param.intelligence
 * @param param.wisdom
 *
 * @returns total mana
 */
function getMana(level: number, { intelligence, wisdom }: Attributes): number {
  const base = Math.ceil(intelligence + wisdom / 2);
  const adjustment = Math.ceil(base / 2);
  return base + adjustment * level;
}

/**
 * Get calculated character total stamina.
 *
 * @param level
 * @param param.strength
 * @param param.constitution
 *
 * @returns total stamina
 */
function getStamina(level: number, { strength, constitution }: Attributes): number {
  const base = Math.ceil(strength + constitution);
  const adjustment = Math.ceil(base / 2);
  return base + adjustment * level;
}

/**
 * Get calculated character total composure.
 *
 * @param level
 * @param param.constitution
 * @param param.wisdom
 *
 * @returns total composure
 */
function getComposure(level: number, { constitution, wisdom }: Attributes): number {
  const base = Math.ceil(constitution + wisdom);
  const adjustment = Math.ceil(base / 2);
  return base + adjustment * level;
}

/**
 * Get calculated character speed.
 *
 * @param attributes - Characters attributes
 *
 * @returns speed
 */
function getSpeed({ dexterity, strength, constitution }: Attributes): number {
  return Math.ceil(dexterity + strength / 2 + constitution / 4 / 2);
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
  name: string;
  race: Race;
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

  equipment: EquipmentData;

  skills: {
    id: string;
    xp: number;
  }[];

  state: Partial<CharacterStateData>;
};

/**
 * Character status data format.
 */
type CharacterStateData = {
  status: "idle" | "active" | "fighting" | "dead";
  xp: number;
  health: number;
  mana: number;
  stamina: number;
  composure: number;
};

/**
 * Characters energy pool.
 */
type CharacterEnergy = {
  total: number;
  current: number;
};
