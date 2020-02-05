/**
 * Skill modifier used when calculating outcome.
 */
export type SkillModifier = {
  type: "*" | "+" | "-" | "/";
  value: number;
};
