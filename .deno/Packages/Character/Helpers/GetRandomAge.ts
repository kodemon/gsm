import { getRandomNumber } from "helpers";
import { DateOfBirth, MONTHS, DAYS, date } from "lib";

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
