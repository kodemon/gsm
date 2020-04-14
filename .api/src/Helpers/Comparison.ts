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
