import { fantastical } from "fantastical";
import { AgeGroup } from "lib";

import { Character } from "../Character.ts";
import { Race } from "../Races/mod.ts";

export class Goblin extends Character {
  /**
   * Get the characters race.
   */
  public get race(): Race {
    return Race.Goblin;
  }

  /**
   * Generate a random name for a character.
   *
   * @returns name
   */
  public static getRandomName(): string {
    return fantastical.species.goblin();
  }

  /**
   * Get the age groups for a goblin.
   *
   * @returns age group ranges
   */
  public static getAgeGroups(): { [key in AgeGroup]: [number, number] } {
    return {
      [AgeGroup.Infant]: [0, 1],
      [AgeGroup.Child]: [2, 6],
      [AgeGroup.Teenager]: [7, 14],
      [AgeGroup.Adult]: [15, 30],
      [AgeGroup.Midlife]: [31, 50],
      [AgeGroup.Senior]: [51, 78],
      [AgeGroup.Elder]: [79, 100]
    };
  }
}
