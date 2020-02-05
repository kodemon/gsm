import { Character } from "character";
import { sample } from "helpers";

export const greetings = {
  general: ["hi", "hello"]
};

/**
 * Get a random character greeting.
 *
 * @param character - Character instance performing the greeting.
 *
 * @returns greeting text.
 */
export function getGreeting(character: Character): string {
  return sample(greetings.general);
}
