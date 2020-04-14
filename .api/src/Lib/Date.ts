/**
 * List of months in a year.
 */
export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/**
 * List of dates in a month.
 */
export const DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export class Date {
  /**
   * Epoch year.
   * @type {number}
   */
  public readonly year: number;

  /**
   * Epoch month.
   * @type {number}
   */
  public readonly month: number;

  /**
   * Epoch day.
   * @type {number}
   */
  public readonly day: number;

  /**
   * Creates a new Date instance.
   *
   * @param year
   * @param month
   * @param day
   */
  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }
}

export const date = {
  current: new Date(3012, 5, 17)
};
