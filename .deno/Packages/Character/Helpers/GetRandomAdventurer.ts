import { sample } from "helpers";
import { AgeGroup } from "lib";
import { v4 as uuid } from "uuid";

import { races } from "../Races/mod.ts";
import { roles } from "../Roles/mod.ts";
import { getRandomAttributes } from "./GetRandomAttributes.ts";
import { getRandomGender } from "./GetRandomGender.ts";
import { getRandomAdventurerRace } from "./GetRandomRace.ts";

const TEMPLATE_ROLES = Object.values(roles);

/**
 * Get a random adventurer.
 *
 * @param age - Possible age groups.
 *
 * @returns adventurer
 */
export function getRandomAdventurer(xp: number = 0, age: AgeGroup[] = [AgeGroup.Adult]) {
  const role = sample(TEMPLATE_ROLES);

  const race = getRandomAdventurerRace();
  const gender = getRandomGender();

  const Adventurer = races[race];

  return new Adventurer(uuid.generate(), {
    name: Adventurer.getRandomName(gender),
    gender,
    dateOfBirth: Adventurer.getRandomAge(age),

    attributes: getRandomAttributes(70, role.attributes),

    skills: [],

    state: {
      status: "idle",
      xp
    }
  });
}
