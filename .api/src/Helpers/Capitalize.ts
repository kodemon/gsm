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
