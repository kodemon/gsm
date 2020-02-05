import { fantastical } from "fantastical";
import { AgeGroup, Gender } from "lib";

import { Character } from "../Character.ts";
import { Race } from "../Races/mod.ts";

export class Human extends Character {
  /**
   * Get the characters race.
   */
  public get race(): Race {
    return Race.Human;
  }

  /**
   * Generate a random name for a character.
   *
   * @param gender - Gender we wish to generate a name for.
   *
   * @returns name
   */
  public static getRandomName(gender: Gender): string {
    return fantastical.species.dwarf(gender);
  }

  /**
   * Get the age groups for a orc.
   *
   * @returns age group ranges
   */
  public static getAgeGroups(): { [key in AgeGroup]: [number, number] } {
    return {
      [AgeGroup.Infant]: [0, 2],
      [AgeGroup.Child]: [3, 12],
      [AgeGroup.Teenager]: [13, 17],
      [AgeGroup.Adult]: [18, 45],
      [AgeGroup.Midlife]: [46, 65],
      [AgeGroup.Senior]: [66, 78],
      [AgeGroup.Elder]: [79, 120]
    };
  }
}
