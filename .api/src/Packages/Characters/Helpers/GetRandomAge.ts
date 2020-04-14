import { getRandomNumber, sample } from "helpers";
import { MONTHS, DAYS, AgeGroup, DateOfBirth, date } from "lib";
import { Race } from "races";

/**
 * Generate a random birth date for a character.
 *
 * @param race - Race to generate a random age for.
 * @param groups - List of age groups to generate a random age from.
 *
 * @returns date of birth
 */
export function getRandomAgeByRace(race: Race, groups?: AgeGroup[]): DateOfBirth {
  const ranges = race.ageGroups;
  const ages = [];
  if (groups) {
    for (const group of groups) {
      const [min, max] = ranges[group];
      ages.push(getRandomAge(min, max));
    }
  } else {
    for (const range in ranges) {
      const [min, max] = ranges[range];
      ages.push(getRandomAge(min, max));
    }
  }
  return sample(ages);
}

/**
 * Generates a random age between provided min and max values.
 *
 * @param min - Minimum age in years.
 * @param max - Maximum age in years.
 * @param year - What year should the age be calculated from.
 *
 * @returns date of birth
 */
export function getRandomAge(min: number, max: number, year?: number): DateOfBirth {
  return new DateOfBirth({
    year: (year || date.current.year) - getRandomNumber(min, max),
    month: MONTHS[getRandomNumber(0, MONTHS.length - 1)],
    day: DAYS[getRandomNumber(0, DAYS.length - 1)]
  });
}
