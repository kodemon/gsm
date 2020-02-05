import { World, getWorld } from "../Lib/World/World";
import { AgeGroup } from "../Lib/Character/DateOfBirth";
import { getRandomAttributes, getRandomMonsterRace, getRandomGender } from "../Lib/Character/Helpers/Generators";
import { sample } from "../Helpers/Sample";
import { roles } from "../Lib/Character/Roles/mod";
import { Party } from "../Lib/World/PartyManager";
import { Character } from "../Lib/Character/Character";
import { uuid } from "../Helpers/Uuid";
import { races } from "../Lib/Character/Race";

const TEMPLATE_ROLES = Object.values(roles);

/*
 |--------------------------------------------------------------------------------
 | Event
 |--------------------------------------------------------------------------------
 */

export function onStartBattle({ seed = "demo" }: { seed: string }) {
  const world = getWorld(seed);
}

function createRandomParty(world: World): Party {
  const party = new Party();

  return party;
}

function getRandomMonster(): Character {
  const role = sample(TEMPLATE_ROLES);

  const race = getRandomMonsterRace();
  const gender = getRandomGender();

  const Monster = races[race];

  return new Monster(uuid(), {
    name: Monster.getRandomName(gender),
    gender,
    dateOfBirth: Monster.getRandomAge([AgeGroup.Adult]),

    attributes: getRandomAttributes(70, role.attributes),

    skills: [],

    state: {
      status: "idle",
      xp: 0
    }
  });
}
