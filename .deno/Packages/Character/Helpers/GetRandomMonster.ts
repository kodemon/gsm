import { sample } from "helpers";
import { AgeGroup } from "lib";
import { v4 as uuid } from "uuid";

import { races } from "../Races/mod.ts";
import { roles } from "../Roles/mod.ts";
import { getRandomAttributes } from "./GetRandomAttributes.ts";
import { getRandomGender } from "./GetRandomGender.ts";
import { getRandomMonsterRace } from "./GetRandomRace.ts";

const TEMPLATE_ROLES = Object.values(roles);

/**
 * Get a random adventurer.
 *
 * @param age - Possible age groups.
 *
 * @returns adventurer
 */
export function getRandomMonster(xp: number = 0, age: AgeGroup[] = [AgeGroup.Adult]) {
  const role = sample(TEMPLATE_ROLES);

  const race = getRandomMonsterRace();
  const gender = getRandomGender();

  const Monster = races[race];

  return new Monster(uuid.generate(), {
    name: Monster.getRandomName(gender),
    gender,
    dateOfBirth: Monster.getRandomAge(age),

    attributes: getRandomAttributes(70, role.attributes),

    skills: [],

    state: {
      status: "idle",
      xp
    }
  });
}
