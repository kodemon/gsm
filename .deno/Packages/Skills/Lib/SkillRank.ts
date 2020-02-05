/**
 * Skill rank letters.
 */
export type SkillRank = "S" | "A" | "B" | "C" | "D" | "E";

/**
 * Skill rank value modifiers.
 */
export const SKILL_RANK_MODIFIERS = {
  E: -2,
  D: -1,
  C: 0,
  B: +1,
  A: +2,
  S: +3
};

/**
 * Modifies a roll by the rank of the skill.
 *
 * @param rank - Characters skill rank.
 * @param roll - Roll being modified.
 *
 * @returns modified skill roll.
 */
export function getRankModifier(rank: SkillRank, roll: number) {
  return roll + SKILL_RANK_MODIFIERS[rank];
}
