import { fantastical } from "../Fantastical";
import { Character, Status } from "./Character";
import { stratagems } from "./Stratagems";
import { Race, Gender } from "./Types";
import { uuid } from "./Utils";

/*
 |--------------------------------------------------------------------------------
 | Name
 |--------------------------------------------------------------------------------
 */

/**
 * Get a random name based on provided race and gender.
 *
 * @param race
 * @param gender
 *
 * @returns name
 */
export function getRandomName(race: Race, gender: Gender = "male"): string {
  switch (race) {
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
}

/*
 |--------------------------------------------------------------------------------
 | Adventurer
 |--------------------------------------------------------------------------------
 */

/**
 * Get a random adventurer.
 *
 * @param age - Possible age groups.
 *
 * @returns adventurer
 */
export function getRandomAdventurer(race: Race, gender: Gender = "male"): Character {
  return new Character({
    id: uuid(),
    name: getRandomName(race, gender),
    gender,
    status: new Status({
      health: {
        total: 100,
        current: 100
      },
      mana: {
        total: 32,
        current: 32
      }
    }),
    stratagem: stratagems.fighter,
    skills: []
  });
}
