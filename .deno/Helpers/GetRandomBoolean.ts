/**
 * Gets a random boolean with provided probability.
 *
 * @param probability - Probability of a true value, lower value means higher probability.
 *
 * @returns boolean
 */
export function getRandomBoolean(probability: number = 0.5): boolean {
  return Math.random() >= probability;
}
