import { fantastical } from "fantastical";
import { AgeGroup, Gender } from "lib";

import { Character } from "../Character.ts";
import { Race } from "../Races/mod.ts";

export class Dwarf extends Character {
  /**
   * Get the characters race.
   */
  public get race(): Race {
    return Race.Dwarf;
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
   * Get the age groups for a dwarf.
   *
   * @returns age group ranges
   */
  public static getAgeGroups(): { [key in AgeGroup]: [number, number] } {
    return {
      [AgeGroup.Infant]: [0, 2],
      [AgeGroup.Child]: [3, 11],
      [AgeGroup.Teenager]: [12, 17],
      [AgeGroup.Adult]: [18, 70],
      [AgeGroup.Midlife]: [71, 180],
      [AgeGroup.Senior]: [181, 300],
      [AgeGroup.Elder]: [301, 600]
    };
  }
}
