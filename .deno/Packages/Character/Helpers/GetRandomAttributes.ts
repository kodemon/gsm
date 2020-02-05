import { sample, getRandomNumber } from "helpers";

import { Attributes, Attribute } from "../Attributes.ts";

/**
 * Roll weight rules.
 * @type {RollWeight}
 */
type RollWeight = {
  roll?: number;
  count?: number;
};

/**
 * Get random character attributes.
 *
 * @param totalPoints - Amount of available points to assign.
 * @param importance - Attributes in order of importance.
 *
 * @returns character attributes.
 */
export function getRandomAttributes(totalPoints: number = 75, importance: Attribute[] = []): Attributes {
  const rolls = getRolledAttributes(totalPoints).sort((a, b) => b - a);

  const attributes = {
    strength: 0,
    constitution: 0,
    dexterity: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  for (const attr of importance) {
    attributes[attr] = rolls.shift();
  }

  for (const roll of rolls) {
    const attr = getRandomAttribute(attributes);
    attributes[attr] = roll;
  }

  return new Attributes(attributes);
}

/**
 * Get a random unassigned attribute.
 *
 * @param attributes - List of attributes.
 *
 * @returns attribute
 */
function getRandomAttribute(attributes: any): string {
  const attribute = sample(Object.keys(attributes));
  if (attributes[attribute] > 0) {
    return getRandomAttribute(attributes);
  }
  return attribute;
}

/**
 * Get randomly rolled attribute values.
 *
 * @param total - Total of all the rolls combined.
 * @param weight - How many rolls has to be larger than the roll value provided.
 *
 * @example
 *
 * getRolledAttributes(); // => [11, 12, 12, 15, 11, 9]
 *
 * @returns 6 random values.
 */
function getRolledAttributes(total: number = 75, weight: RollWeight = { roll: 16, count: 1 }): number[] {
  const rolls: number[] = [0, 0, 0, 0, 0, 0];

  let remainder = total;
  while (remainder > 0) {
    let max = Math.floor(remainder / 6);
    if (max < 3) {
      rolls[getRandomNumber(0, 5)] += 1;
      remainder--;
    } else {
      for (let i = 0, len = 6; i < len; i++) {
        const roll = getRandomNumber(3, max);
        rolls[i] += roll;
        remainder -= roll;
      }
    }
  }

  return rolls;
}
