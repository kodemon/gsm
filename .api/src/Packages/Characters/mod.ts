import { ensureDirSync, writeJsonSync, readJsonSync } from "fs-extra";

import { ws } from "socket";

import { Attribute } from "./Attributes";
import { Character, CharacterData } from "./Character";

class CharacterManager {
  /**
   * Pool of characters stored for this world seed.
   */
  public characters: { [id: string]: Character } = {};

  /**
   * Creates a new CharacterManager instance.
   */
  constructor() {
    const characters = readJsonSync(`../.data/characters.json`) as CharacterData[];
    for (const data of characters) {
      this.characters[data.id] = new Character(data);
    }
  }

  /**
   * Adds a character to the pool.
   *
   * @param character - Character to add to the pool.
   */
  public add(character: Character, persist: boolean = true): void {
    this.characters[character.id] = character;
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
   * Get a character from the character list.
   *
   * @param id - Character identifier.
   *
   * @returns character
   */
  public get(id: string): Character | undefined {
    const character = this.characters[id];
    if (!character) {
      throw new Error(`Invalid character ${id} requested.`);
    }
    return character;
  }

  /**
   * Flushes the character pool.
   */
  public flush(): void {
    this.characters = {};
    this.save();
  }

  /**
   * Persist the character pool to disk.
   */
  public save(): void {
    ensureDirSync(`../.data/`);
    writeJsonSync(
      `../.data/characters.json`,
      Object.values(this.characters).map(character => character.toData()),
      { spaces: 2 }
    );
    this.publish();
  }

  /**
   * Publish the entire character list to all connected sockets.
   */
  public publish() {
    ws.publish("characters", this.toJSON());
  }

  /**
   * Get the JSON representation of the characters list.
   *
   * @returns list of characters
   */
  public toJSON() {
    return Object.values(this.characters).map(character => character.toJSON());
  }
}

export const characters = new CharacterManager();

export { Attribute, Character };

export * from "./Helpers/mod";
