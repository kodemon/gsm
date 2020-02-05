import * as v4 from "uuid/v4";

/**
 * Get a uuid string.
 *
 * @returns uuid
 */
export function uuid(): string {
  return v4();
}
