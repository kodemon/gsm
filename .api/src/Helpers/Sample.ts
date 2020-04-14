/**
 * Gets a random element from `array`.
 *
 * @since 2.0.0
 * @category Array
 *
 * @param array - The array to sample.
 *
 * @example
 *
 * sample([1, 2, 3, 4]) // => 2
 *
 * @returns {*} Returns the random element.
 */
export function sample<T = any>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
