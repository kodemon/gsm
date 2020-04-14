/**
 * Add an asynchronous delay.
 *
 * @param ms - Milliseconds to delay.
 *
 * @returns promise
 */
export async function delay(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
