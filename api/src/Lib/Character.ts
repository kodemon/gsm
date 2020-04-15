import { BattleStatus } from "./Battle";
import { db, Collection, collection } from "./Data";
import { SkillState } from "./Skill";
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
  public stratagem: Stratagem;
  public skills: SkillState[];

  /**
   * Create a new Character instance.
   *
   * @param data - Character data; name, attributes, stratagem, skills.
   */
  constructor(data: CharacterData) {
    this.id = data.id;
    this.name = data.name;
    this.gender = data.gender;
    this.status = data.status;
    this.stratagem = data.stratagem;
    this.skills = data.skills;
  }

  // ### Data
  // The following is a list of persistence based methods used to store
  // character data.

  public static async in(id: string[]) {
    const data = await collection<any>(Collection.Characters)
      .find({ id: { $in: id } })
      .toArray();
    if (data) {
      return data.map((d) => new Character(d));
    }
    return [];
  }

  /**
   * Return a character instance by its id.
   *
   * @param id - Character id.
   *
   * @returns character or undefined
   */
  public static async getById(id: string) {
    const data = await collection<CharacterData>(Collection.Characters).findOne({ id });
    if (data) {
      return new this(data);
    }
  }

  /**
   * Save the character state with the persistent data layer.
   */
  public async save() {
    await collection<CharacterData>(Collection.Characters).update(
      {
        id: this.id
      },
      this.toData(),
      { upsert: true }
    );
  }

  /**
   * Convert the instance to a JSON data object.
   *
   * @returns character data
   */
  public toData(): CharacterData {
    return {
      id: this.id,
      name: this.name,
      gender: this.gender,
      status: this.status,
      stratagem: this.stratagem,
      skills: this.skills
    };
  }

  // ### Utilities
  // The following is a list of utility methods used to check character
  // state and perform actions.

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
  public skill(id: string): SkillState | undefined {
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
    let roll = dieRoll(20);
    for (const modifier of modifiers) {
      roll += modifier;
    }
    return roll;
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
 | Typed
 |--------------------------------------------------------------------------------
 */

type CharacterData = {
  id: string;
  name: string;
  gender: Gender;
  status: Status;
  stratagem: Stratagem;
  skills: SkillState[];
};

type StatusData = {
  health: State;
  mana: State;
};

type State = {
  total: number;
  current: number;
};
