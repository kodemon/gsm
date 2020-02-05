import { getRandomAdventurer, getRandomMonster } from "character";
import { getRandomNumber } from "helpers";
import { skills } from "skills";
import { world, Party } from "world";

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

  world.characters.addMany([...adventurers, ...monsters]);
  world.battles.add([advParty, monParty]);
}

function getAdventurers() {
  const adventurers = [];

  let count = 4;
  while (count--) {
    const adventurer = getRandomAdventurer(getRandomNumber(8000, 12000));

    adventurer.skills[skills.sword.id] = new skills.sword(
      getRandomNumber(Math.floor(adventurer.state.xp * 0.3), adventurer.state.xp),
      adventurer
    );

    adventurers.push(adventurer);
  }

  return adventurers;
}

function getMonsters() {
  const monsters = [];

  let count = 4;
  while (count--) {
    const monster = getRandomMonster(getRandomNumber(8000, 12000));

    monster.skills[skills.sword.id] = new skills.sword(getRandomNumber(Math.floor(monster.state.xp * 0.3), monster.state.xp), monster);

    monsters.push(monster);
  }

  return monsters;
}
