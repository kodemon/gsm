import { Gender } from "lib";
import { Race } from "races";
import { fantastical } from "fantastical";

/**
 * Get a random name based on provided race and gender.
 *
 * @param race
 * @param gender
 *
 * @returns name
 */
export function getRandomName(race: Race, gender: Gender = "male"): string {
  switch (race.id) {
    case "human": {
      return fantastical.species.human(gender, true);
    }
    case "elf": {
      return fantastical.species.elf(gender);
    }
    case "dwarf": {
      return fantastical.species.dwarf(gender);
    }
  }
  throw new Error(`${race.name} does not have a random name generator available.`);
}
