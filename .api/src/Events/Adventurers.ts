import { characters, getRandomAdventurer } from "characters";

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
  characters.addMany(adventurers);
}

/**
 * Get a list of adventurers.
 *
 * @returns characters
 */
export function onFindAdventurers() {
  return characters.toJSON();
}

export function onFlushAdventurers() {
  characters.flush();
}
