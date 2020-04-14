import { BattleStatus } from "./Battle";
import { Stratagem } from "./Stratagem";
import { Gender } from "./Types";
import { dieRoll } from "./Utils";

/*
 |--------------------------------------------------------------------------------
 | Character
 |--------------------------------------------------------------------------------
 */

export class Character {
  public id: string;
  public name: string;
  public gender: Gender;
  public status: Status;
  public attributes: Attributes;
  public stratagem: Stratagem;
  public skills: SkillProficiency[];

  /**
   * Create a new Character instance.
   *
   * @param data - Character data; name, attributes, stratagem, skills.
   */
  constructor(data: CharacterData) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.gender = data.gender;
    this.attributes = data.attributes;
    this.stratagem = data.stratagem;
    this.skills = data.skills;
  }

  /**
   * Check if the character is still alive.
   *
   * @returns 'true' if alive, 'false' if dead.
   */
  public isAlive(): boolean {
    return this.status.health.current > 0;
  }

  /**
   * Get the given skill proficiency for the character.
   *
   * @param id - Skill id to get proficiency for.
   *
   * @returns skill proficiency, or undefined
   */
  public skill(id: string): SkillProficiency | undefined {
    return this.skills.find((skill) => skill.id === id);
  }

  /**
   * Roll and return initiative score.
   *
   * @param modifiers - Positive and negative modifiers to add to the roll.
   *
   * @returns initiative roll
   */
  public initiative(modifiers: number[] = []): number {
    let value = this.attributes.dexterity + dieRoll(20);
    for (const modifier of modifiers) {
      value += modifier;
    }
    return value;
  }
}

/*
 |--------------------------------------------------------------------------------
 | Status
 |--------------------------------------------------------------------------------
 */

export class Status {
  public health: State;
  public mana: State;
  public battle?: BattleStatus;

  /**
   * Create a new Status instance.
   *
   * @param data - Status data.
   */
  constructor(data: StatusData) {
    this.health = data.health;
    this.mana = data.mana;
  }

  /**
   * Get the current health of the character.
   *
   * @returns current health value
   */
  public getHealth(): number {
    return this.health.current;
  }

  /**
   * Get the current mana of the character.
   *
   * @returns current mana value
   */
  public getMana(): number {
    return this.mana.current;
  }

  /**
   * Modify health or mana current value.
   *
   * @param state - State to modify.
   * @param value - Value to adjust against the state.
   */
  public modify(state: "health" | "mana", value: number): void {
    const next = this[state].current + value;
    if (next <= 0) {
      this[state].current = 0;
    } else if (next >= this[state].total) {
      this[state].current = this[state].total;
    } else {
      this[state].current = next;
    }
  }
}

/*
 |--------------------------------------------------------------------------------
 | Attributes
 |--------------------------------------------------------------------------------
 |
 | Represents the natural abilities of a character.
 |
 | Strength      Measuring physical power and carrying capacity.
 |
 | Constitution  Measuring endurance, stamina and good health.
 |
 | Dexterity     Measuring agility, balance, coordination and reflexes.
 |
 | Intelligence  Measuring deductive reasoning, knowledge, memory, logic and 
 |               rationality.
 |
 | Wisdom        Measuring self-awareness, common sense, restraint, perception 
 |               and insight.
 |
 | Charisma      Measuring force of personality, persuasiveness, leadership and 
 |               successful planning.
 |
 */

export class Attributes {
  public strength: number;
  public constitution: number;
  public dexterity: number;
  public intelligence: number;
  public wisdom: number;
  public charisma: number;

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
   * Create new Attributes instance.
   *
   * @param data - Attribute data; Strength, Constitution, Dexterity, Intelligence, Wisdom, Charisma.
   */
  constructor(data: AttributesData) {
    this.strength = data.strength;
    this.constitution = data.constitution;
    this.dexterity = data.dexterity;
    this.intelligence = data.intelligence;
    this.wisdom = data.wisdom;
    this.charisma = data.charisma;
  }

  /**
   * Get modifier used for various checks based on the attribute value.
   *
   * @param attribute - Attribute to get modifier for.
   *
   * @returns modifier value
   */
  public modifier(attribute: AttributeType): number {
    const value = this[attribute];
    for (const [target, modifier] of Attributes.modifiers) {
      if (value < target) {
        return modifier;
      }
    }
    return 10;
  }
}

export enum AttributeType {
  Strength = "strength",
  Constitution = "constitution",
  Dexterity = "dexterity",
  Intelligence = "intelligence",
  Wisdom = "wisdom",
  Charisma = "charisma"
}

/*
 |--------------------------------------------------------------------------------
 | Typed
 |--------------------------------------------------------------------------------
 */

type CharacterData = {
  id: string;
  name: string;
  gender: Gender;
  status: Status;
  attributes: Attributes;
  stratagem: Stratagem;
  skills: SkillProficiency[];
};

type StatusData = {
  health: State;
  mana: State;
};

type State = {
  total: number;
  current: number;
};

type AttributesData = {
  strength: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type SkillProficiency = {
  id: string;
  value: number;
};
