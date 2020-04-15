import { Skill } from "../Skill";

/*
 |--------------------------------------------------------------------------------
 | Support Skills
 |--------------------------------------------------------------------------------
 */

import { defend } from "./Defend";

/*
 |--------------------------------------------------------------------------------
 | Melee Skills
 |--------------------------------------------------------------------------------
 */

import { slash } from "./Slash";

/*
 |--------------------------------------------------------------------------------
 | Export
 |--------------------------------------------------------------------------------
 */

export const skills = {
  [defend.id]: defend,
  [slash.id]: slash,

  /**
   * Get skill by its id.
   *
   * @param id - Skill id.
   *
   * @returns skill
   */
  get(id: string): Skill {
    return (this as any)[id];
  },

  // ### Category: Melee

  melee: {
    slash,
    toArray(): Skill[] {
      return [slash];
    }
  },

  // ### Category: Support

  support: {
    defend,
    toArray(): Skill[] {
      return [defend];
    }
  }
};
