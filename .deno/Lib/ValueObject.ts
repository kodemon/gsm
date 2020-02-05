import { shallowEquals } from "../Helpers/Comparison.ts";

/**
 * A value object, more details on this at some point...
 *
 * @example
 *
 * class Foo extends ValueObject<Foo> {
 *   public bar: string;
 * }
 *
 * @class ValueObject
 */
export abstract class ValueObject<T, P> {
  constructor(props: P) {
    for (const key in props) {
      (this as any)[key] = props[key];
    }
    this.validate();
    Object.freeze(this);
  }

  /**
   * Check if the value object is a valid representation of itself.
   *
   * @remarks
   * This function should check that all assigned values are correct.
   * If the values provided are incorrect an error should be thrown.
   */
  public validate() {
    // no rules by default ...
  }

  /**
   * Determine if the value object is equal to the provided value object.
   *
   * @should determine if each key => value pair in the provided object
   *         matches the current instance.
   *
   * @param value
   *
   * @returns {boolean}
   */
  public equals(vo?: T): boolean {
    return shallowEquals(this, vo);
  }
}
