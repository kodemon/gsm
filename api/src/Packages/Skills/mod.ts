import { ensureDirSync, writeJsonSync, readJsonSync } from "fs-extra";

import { Skill, SkillData, SkillRank, SKILL_RANK_RANGE } from "./Skill";

class SkillManager {
  /**
   * List of managed skills.
   */
  public skills: { [id: string]: Skill } = {};

  /**
   * Creates a new SkillManager instance.
   */
  constructor() {
    const skills = readJsonSync(`../.data/default/skills.json`) as SkillData[];
    for (const data of skills) {
      this.skills[data.id] = new Skill(data);
    }
  }

  /**
   * Get a skill from the skills list.
   *
   * @param id - Skill identifier.
   *
   * @returns skill
   */
  public get(id: string): Skill {
    const skill = this.skills[id];
    if (!skill) {
      throw new Error(`Invalid skill ${id} requested.`);
    }
    return skill;
  }
}

export const skills = new SkillManager();

export { Skill, SkillRank, SKILL_RANK_RANGE };
