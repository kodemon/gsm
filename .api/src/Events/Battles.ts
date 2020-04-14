import { battles } from "battles";
import { characters, getRandomAdventurer, getRandomMonster } from "characters";
import { getRandomNumber } from "helpers";
import { Party } from "world";

/**
 * Creates a mock battle by building two random parties to engage in a battle.
 *
 * @returns battle id
 */
export function createMockBattle(): void {
  const advParty = new Party();
  const adventurers = getAdventurers();
  adventurers.forEach(char => advParty.addMember(char));

  const monParty = new Party();
  const monsters = getMonsters();
  monsters.forEach(char => monParty.addMember(char));

  characters.addMany([...adventurers, ...monsters]);
  battles.add([advParty, monParty]);
}

function getAdventurers() {
  const adventurers = [];

  let count = 4;
  while (count--) {
    adventurers.push(getRandomAdventurer(getRandomNumber(20000, 20500)));
  }

  return adventurers;
}

function getMonsters() {
  const monsters = [];

  let count = 4;
  while (count--) {
    monsters.push(getRandomMonster(getRandomNumber(20000, 20500)));
  }

  return monsters;
}
