import { sample } from "../Helpers/Sample";
import { uuid } from "../Helpers/Uuid";
import { AgeGroup } from "../Lib/Character/DateOfBirth";
import { getRandomAdventurerRace, getRandomGender, getRandomAttributes } from "../Lib/Character/Helpers/Generators";
import { races } from "../Lib/Character/Race";
import { roles } from "../Lib/Character/Roles/mod";
import { getWorld } from "../Lib/World/World";

const TEMPLATE_ROLES = Object.values(roles);

/**
 * Generates a given number of adventurers that can be hired by a guild.
 *
 * @param seed - World seed to generate adventurers for. Default: "demo"
 * @param count - Number of adventurers to generate. Default: 100
 */
export function onGenerateAdventurers({ seed = "demo", count = 10 }: { seed: string; count: number }): void {
  const world = getWorld(seed);

  // ### Generate Adventures

  const adventurers = [];
  while (count--) {
    const role = sample(TEMPLATE_ROLES);

    const race = getRandomAdventurerRace();
    const gender = getRandomGender();

    const Adventurer = races[race];

    adventurers.push(
      new Adventurer(uuid(), {
        name: Adventurer.getRandomName(gender),
        gender,
        dateOfBirth: Adventurer.getRandomAge([AgeGroup.Adult]),

        attributes: getRandomAttributes(70, role.attributes),

        skills: [],

        state: {
          status: "idle",
          xp: 0
        }
      })
    );
  }

  // ### Add Adventurers

  world.addCharacters(adventurers);
}

/*
function getRandomCharacter(): RaceType {
  const RaceModel = races[race];
  if (!RaceModel) {
    throw new Error(`Race ${race} does not exist.`);
  }
  return new RaceModel(uuidv4(), {
    name: getRandomRacialName(race, gender),
    gender,
    dateOfBirth: getRandomAge(RACE_AGE_RANGES[race], level),

    attributes: getRandomAttributes(70 + Math.floor(level / 2), roles[role].attributes),

    skills: [],

    status: {
      state: "idle",
      xp: level * 1000
    }
  });
}
*/

/*
import { getRandomNumber } from "../Helpers/GetRandomNumber";
import { Race } from "../Lib/Character/Race";
import { getRandomCharacter } from "../Lib/Character/Helpers/GetRandomCharacter";
import { skills } from "../Lib/Character/Skills/mod";

/*
 |--------------------------------------------------------------------------------
 | Event
 |--------------------------------------------------------------------------------
 *

interface CreateProps {
  race: Race;
  gender: "male" | "female";
  role: string;
  level: number;
}

/**
 *
 * @param prop.race
 * @param prop.gender
 * @param prop.role
 * @param prop.level
 *
 * @returns created character
 *
export function onCreateCharacter({ race, gender, role, level }: CreateProps) {
  const character = getRandomCharacter(race, gender, role, level);

  character.skills[skills.sword.id] = new skills.sword(
    getRandomNumber(Math.floor(character.status.xp * 0.3), character.status.xp),
    character
  );

  world.addCharacter(character);

  return character;
}

export function onCreateCharacters({ count }) {
  console.log(`Generating ${count} characters`);
  const characters = [];
  while (count--) {
    const character = getRandomCharacter();
    character.skills[skills.sword.id] = new skills.sword(
      getRandomNumber(Math.floor(character.status.xp * 0.3), character.status.xp),
      character
    );
    characters.push(character);
  }
  world.addCharacters(characters);
  console.log(`Characters successfully generated`);
}
*/
