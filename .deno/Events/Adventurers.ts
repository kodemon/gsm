import { Character, getRandomAdventurer } from "character";
import { world } from "world";

/**
 * Generates a given number of adventurers that can be hired by a guild.
 *
 * @param count - Number of adventurers to generate. Default: 100
 */
export function onGenerateAdventurers({ count = 10 }: { count: number }): void {
  const adventurers = [];
  while (count--) {
    adventurers.push(getRandomAdventurer());
  }
  world.characters.addMany(adventurers);
}

/**
 * Get a list of adventurers.
 *
 * @returns characters
 */
export function onFindAdventurers({}): Character[] {
  return world.characters.toJSON();
}
