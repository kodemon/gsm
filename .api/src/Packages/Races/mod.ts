import { ensureDirSync, writeJsonSync, readJsonSync } from "fs-extra";

import { sample } from "helpers";

import { Race, RaceData } from "./Race";

class RaceManager {
  /**
   * List of managed classes.
   */
  public races: { [id: string]: Race } = {};

  /**
   * Creates a new RaceManager instance.
   */
  constructor() {
    const races = readJsonSync(`../.data/default/races.json`) as RaceData[];
    for (const data of races) {
      this.races[data.id] = new Race(data);
    }
  }

  /**
   * Get a race from the races list.
   *
   * @param id - Race identifier.
   *
   * @returns race
   */
  public get(id: string): Race {
    const race = this.races[id];
    if (!race) {
      throw new Error(`Invalid race ${id} requested.`);
    }
    return race;
  }

  /**
   * Get a random race from the list of races.
   *
   * @returns race
   */
  public getRandom(): Race {
    return this.races[sample(Object.keys(this.races))];
  }
}

export const races = new RaceManager();

export { Race };
