import { sample } from "helpers";
import { Gender, GENDERS } from "lib";

/**
 * Get a random gender.
 *
 * @returns gender
 */
export function getRandomGender(): Gender {
  return sample(GENDERS);
}
