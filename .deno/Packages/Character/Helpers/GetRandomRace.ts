import { sample } from "helpers";

import { ADVENTURER_RACES, RACES, Race } from "../Races/mod.ts";

/**
 * Get a random adventure race.
 *
 * @returns adventurer race
 */
export function getRandomAdventurerRace(): Race {
  return sample(ADVENTURER_RACES);
}

/**
 * Get a random monster race.
 *
 * @remarks
 * A monster class is any class that can be used to fight an adventurer.
 *
 * @returns monster race
 */
export function getRandomMonsterRace() {
  return sample(RACES);
}
