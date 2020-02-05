import { fantastical } from "fantastical";
import { AgeGroup } from "lib";

import { Character } from "../Character.ts";
import { Race } from "../Races/mod.ts";

export class Demon extends Character {
  /**
   * Get the characters race.
   */
  public get race(): Race {
    return Race.Demon;
  }

  /**
   * Generate a random name for a character.
   *
   * @returns name
   */
  public static getRandomName(): string {
    return fantastical.species.demon();
  }

  /**
   * Get the age groups for a demon.
   *
   * @returns age group ranges
   */
  public static getAgeGroups(): { [key in AgeGroup]: [number, number] } {
    return {
      [AgeGroup.Infant]: [0, 1],
      [AgeGroup.Child]: [2, 8],
      [AgeGroup.Teenager]: [9, 20],
      [AgeGroup.Adult]: [21, 300],
      [AgeGroup.Midlife]: [301, 1000],
      [AgeGroup.Senior]: [1001, 2000],
      [AgeGroup.Elder]: [2001, 10000]
    };
  }
}
