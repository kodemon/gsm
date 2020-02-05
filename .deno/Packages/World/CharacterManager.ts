import { CharacterData, Character, races } from "character";
import { ensureDirSync, writeJsonSync, readJsonSync } from "fs";

export class CharacterManager {
  /**
   * Pool of characters stored for this world seed.
   */
  private pool: CharacterPool = {};

  /**
   * Creates a new CharacterManager instance.
   */
  constructor() {
    this.pool = this.getPool();
  }

  /**
   * Adds a character to the pool.
   *
   * @param character - Character to add to the pool.
   */
  public add(character: Character, persist: boolean = true): void {
    this.pool[character.uuid] = character;
    if (persist) {
      this.save();
    }
  }

  /**
   * Adds many characters to the pool
   *
   * @param characters - Character to add to the pool
   */
  public addMany(characters: Character[]): void {
    for (const character of characters) {
      this.add(character, false);
    }
    this.save();
  }

  /**
   * Get a character from the pool.
   *
   * @param uuid - Characters unique identifier.
   *
   * @returns character or undefined
   */
  public get(uuid: string): Character | undefined {
    return this.pool[uuid];
  }

  /**
   * Flushes the character pool.
   */
  public flush(): void {
    this.pool = {};
    this.save();
  }

  /**
   * Gets all the persisted characters from the persisted storage.
   *
   * @returns characters
   */
  public getPool(): CharacterPool {
    const pool: CharacterPool = {};

    try {
      const characters = readJsonSync(`../.data/characters.json`) as CharacterPoolData;
      for (const uuid in characters) {
        const data = characters[uuid];
        pool[uuid] = new races[data.race](uuid, data);
      }
    } catch (err) {
      if (err.name === "NotFound") {
        this.save();
        return this.getPool();
      }
    }

    return pool;
  }

  /**
   * Persist the character pool to disk.
   */
  public save(): void {
    const data: CharacterPoolData = {};
    for (const uuid in this.pool) {
      const character = this.pool[uuid];
      data[uuid] = {
        name: character.name,
        race: character.race,
        gender: character.gender,
        dateOfBirth: character.dateOfBirth,

        attributes: character.attributes,

        equipment: {},

        skills: Object.keys(character.skills).map(id => ({
          id,
          xp: character.skills[id].xp || 0
        })),

        state: {
          status: character.state.status,
          xp: character.state.xp,
          health: character.state.health.current,
          mana: character.state.mana.current,
          stamina: character.state.stamina.current,
          composure: character.state.composure.current
        }
      };
    }
    ensureDirSync(`../.data/`);
    writeJsonSync(`../.data/characters.json`, data, { spaces: 2 });
  }

  /**
   * Get the JSON representation of the character pool
   *
   * @returns list of characters
   */
  public toJSON() {
    return Object.values(this.pool).map(character => character.toJSON());
  }
}

/**
 * Character pool format.
 */
type CharacterPoolData = {
  [uuid: string]: CharacterData;
};

/**
 * Resolved character pool.
 */
type CharacterPool = {
  [uuid: string]: Character;
};
