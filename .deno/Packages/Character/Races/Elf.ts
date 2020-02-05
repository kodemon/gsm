import { fantastical } from "fantastical";
import { AgeGroup, Gender } from "lib";

import { Character } from "../Character.ts";
import { Race } from "../Races/mod.ts";

export class Elf extends Character {
  /**
   * Get the characters race.
   */
  public get race(): Race {
    return Race.Elf;
  }

  /**
   * Generate a random name for a character.
   *
   * @param gender - Gender we wish to generate a name for.
   *
   * @returns name
   */
  public static getRandomName(gender: Gender): string {
    return fantastical.species.elf(gender);
  }

  /**
   * Get the age groups for a elf.
   *
   * @returns age group ranges
   */
  public static getAgeGroups(): { [key in AgeGroup]: [number, number] } {
    return {
      [AgeGroup.Infant]: [0, 1],
      [AgeGroup.Child]: [2, 10],
      [AgeGroup.Teenager]: [11, 20],
      [AgeGroup.Adult]: [21, 120],
      [AgeGroup.Midlife]: [121, 300],
      [AgeGroup.Senior]: [301, 600],
      [AgeGroup.Elder]: [601, 2000]
    };
  }
}
