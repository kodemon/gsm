import { fantastical } from "fantastical";
import { AgeGroup } from "lib";

import { Character } from "../Character.ts";
import { Race } from "../Races/mod.ts";

export class Ogre extends Character {
  /**
   * Get the characters race.
   */
  public get race(): Race {
    return Race.Ogre;
  }

  /**
   * Generate a random name for a character.
   *
   * @returns name
   */
  public static getRandomName(): string {
    return fantastical.species.ogre();
  }

  /**
   * Get the age groups for a ogre.
   *
   * @returns age group ranges
   */
  public static getAgeGroups(): { [key in AgeGroup]: [number, number] } {
    return {
      [AgeGroup.Infant]: [0, 2],
      [AgeGroup.Child]: [3, 10],
      [AgeGroup.Teenager]: [11, 20],
      [AgeGroup.Adult]: [21, 80],
      [AgeGroup.Midlife]: [81, 140],
      [AgeGroup.Senior]: [141, 220],
      [AgeGroup.Elder]: [221, 400]
    };
  }
}
