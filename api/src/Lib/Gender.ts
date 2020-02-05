import { sample } from "helpers";

export type Gender = "male" | "female";

/**
 * Get a random gender.
 *
 * @returns gender
 */
export function getRandomGender(): Gender {
  return sample(["male", "female"]);
}
