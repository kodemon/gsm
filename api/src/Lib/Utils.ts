import { v4 } from "uuid";

const VOWELS = ["a", "e", "i", "o", "u"];

/**
 * Get a uuid string.
 *
 * @returns uuid
 */
export function uuid(): string {
  return v4();
}

/**
 * Capitalize string.
 *
 * @param str
 *
 * @returns capitalized string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Safely retrieve a value from a deep nested object.
 *
 * @example
 *
 * const obj = {
 *   b: {
 *     c: [
 *       "foo",
 *        { bar: "foobar" }
 *     ]
 *   }
 * };
 *
 * maybe(obj, "b.c");            // returns 'bar'
 * maybe(obj, "b.c.0");          // returns 'bar'
 * maybe(obj, "b.c.1.bar");      // returns 'foobar'
 * maybe(obj, "b.a");            // returns undefined
 * maybe(obj, "b.a", "Default"); // returns 'Default'
 *
 * @param obj      Object to perform a retrieval on.
 * @param path     String with a dot noted path, or an array of string | number.
 * @param fallback Value to return if path leads to an undefined value.
 *
 * @returns path value, fallback, or undefined
 */
export function maybe<V = any>(obj: any, path: string | string[], fallback?: any): V {
  const keys = Array.isArray(path) ? path : path.split(".");
  let value: any = obj;
  try {
    for (const key of keys) {
      if (value === undefined) {
        return fallback;
      }
      value = value[key];
    }
  } catch (err) {
    return fallback;
  }
  return value;
}

/**
 * Simulate a die roll of a given size.
 *
 * @param size - Size of the die being rolled.
 *
 * @returns result of the roll
 */
export function dieRoll(size: number = 10): number {
  return Math.floor(Math.random() * size) + 1;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 *
 * @param min - Minimum number range.
 * @param max - Maximum number range.
 *
 * @returns random number between min and max
 */
export function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

/**
 * Is the provided letter a vowel?
 *
 * @param letter
 *
 * @returns vowel check result.
 */
export function isVowel(letter: string): boolean {
  return VOWELS.includes(letter);
}

/**
 * Gets a random element from `array`.
 *
 * @param array - The array to sample.
 *
 * @example
 *
 * sample([1, 2, 3, 4]) // => 2
 *
 * @returns random element.
 */
export function sample<T = any>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Check if two provides arrays have the same values.
 *
 * @param _arr1
 * @param _arr2
 *
 * @returns boolean value of equality
 */
export function arraysEqual(_arr1: any[], _arr2: any[]): boolean {
  if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) {
    return false;
  }
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Does a shallow comparison between two objects.
 *
 * @param source
 * @param value
 *
 * @returns boolean value of shallow equality
 */
export function shallowEquals(source: any, value: any) {
  for (const key in source) {
    if (value[key] === undefined) {
      return false;
    }
    if (value[key] !== source[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `string` ends with the given target string.
 *
 * @since 3.0.0
 *
 * @param string - The string to inspect.
 * @param target - The string to search for.
 * @param position - The position to search up to.
 *
 * @example
 *
 * endsWith('abc', 'c') // => true
 * endsWith('abc', 'b') // => false
 * endsWith('abc', 'b', 2) // => true
 *
 * @returns `true` if `string` ends with `target`,
 *  else `false`.
 * @see includes, startsWith
 */
export function endsWith(string: string, target: string, position: number = string.length) {
  const { length } = string;
  position = position === undefined ? length : +position;
  if (position < 0 || position != position) {
    position = 0;
  } else if (position > length) {
    position = length;
  }
  const end = position;
  position -= target.length;
  return position >= 0 && string.slice(position, end) == target;
}
