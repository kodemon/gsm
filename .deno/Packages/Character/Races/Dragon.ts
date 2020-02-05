import { fantastical } from "fantastical";
import { AgeGroup, Gender } from "lib";

import { Character } from "../Character.ts";
import { Race } from "../Races/mod.ts";

export class Dragon extends Character {
  /**
   * Get the characters race.
   */
  public get race(): Race {
    return Race.Dragon;
  }

  /**
   * Generate a random name for a character.
   *
   * @param gender - Gender we wish to generate a name for.
   *
   * @returns name
   */
  public static getRandomName(gender: Gender): string {
    return fantastical.species.dragon(gender);
  }

  /**
   * Get the age groups for a dragon.
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
