import { ValueObject } from "./ValueObject.ts";

/**
 * Age group.
 */
export enum AgeGroup {
  /**
   * Age of wonder.
   */
  Infant = "infant",

  /**
   * Age of growth.
   */
  Child = "child",

  /**
   * Age learning.
   */
  Teenager = "teenager",

  /**
   * Age of application.
   */
  Adult = "adult",

  /**
   * Age of mastery.
   */
  Midlife = "midlife",

  /**
   * Age of wisdom.
   */
  Senior = "senior",

  /**
   * Age of traditions.
   */
  Elder = "elder"
}

/**
 * Age groups.
 */
export const AGE_GROUPS = [AgeGroup.Infant, AgeGroup.Child, AgeGroup.Teenager, AgeGroup.Adult, AgeGroup.Senior, AgeGroup.Elder];

/**
 * Date of Birth
 *
 * @extends ValueObject
 */
export class DateOfBirth extends ValueObject<
  DateOfBirth,
  {
    year: number;
    month: number;
    day: number;
  }
> {
  /**
   * Year of birth.
   * @type {number}
   */
  public year: number;

  /**
   * Month of birth.
   * @type {number}
   */
  public month: number;

  /**
   * Day of birth.
   * @type {number}
   */
  public day: number;

  /**
   * Ensure that year, month and day has been given a value.
   */
  public validate() {
    for (const key of ["year", "month", "day"]) {
      if (!this[key]) {
        throw new Error(`Birth ${key} was not provided.`);
      }
    }
  }
}
