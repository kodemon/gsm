/**
 * Simulate a die roll of the given size.
 *
 * @param size - Size of the die being rolled.
 *
 * @returns result of the roll.
 */
export function dieRoll(size: number = 10): number {
  return Math.floor(Math.random() * size) + 1;
}
