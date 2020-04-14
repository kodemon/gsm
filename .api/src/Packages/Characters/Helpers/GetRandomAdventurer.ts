import { AgeGroup, getRandomGender } from "lib";

import { Character } from "characters";
import { classes } from "classes";
import { uuid, dieRoll, getRandomNumber } from "helpers";
import { races } from "races";
import { getRandomName } from "./GetRandomName";
import { getRandomAgeByRace } from "./GetRandomAge";
import { getRandomAttributes } from "./GetRandomAttributes";

/**
 * Get a random adventurer.
 *
 * @param age - Possible age groups.
 *
 * @returns adventurer
 */
export function getRandomAdventurer(experience: number = 0, age: AgeGroup[] = [AgeGroup.Adult]) {
  const race = races.getRandom();
  const role = classes.getRandom();

  const gender = getRandomGender();

  const attributes = getRandomAttributes(race, role.attributes);

  let hitDie = 0;
  let level = Math.floor(experience / 1000);
  while (level--) {
    hitDie += dieRoll(role.hitDie);
  }

  const health = attributes.constitution + hitDie;
  const mana = attributes.intelligence + attributes.wisdom;

  return new Character({
    id: uuid(),

    race: race.id,
    class: role.id,

    name: getRandomName(race, gender),
    gender,
    dateOfBirth: getRandomAgeByRace(race, [AgeGroup.Adult]),

    attributes,

    experience,

    status: "idle",
    health: {
      total: health,
      current: health
    },
    mana: {
      total: mana,
      current: mana
    },

    equipment: {},

    skills: [
      {
        id: "sword",
        xp: getRandomNumber(16000, 20000)
      }
    ]
  });
}
