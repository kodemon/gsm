export class Skill {
  /**
   * Skill identifier.
   */
  public readonly id: string;

  /**
   * Name of the skill.
   */
  public readonly name: string;

  /**
   * Description of the skill.
   */
  public readonly description: string;

  /**
   * Tool required to perform the skill.
   */
  public readonly tool: string[];

  /**
   * Higher proficiency rank means better output.
   */
  public readonly modifiers: SkillModifiers;

  /**
   * Creates a new Skill instance.
   *
   * @param data
   */
  constructor(data: SkillData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.tool = data.tool;
    this.modifiers = data.modifiers;
  }

  /**
   * Get skill modifiers for the current rank.
   *
   * @param experience - Amount of experience points to calculate rank for.
   *
   * @returns modifiers
   */
  public getModifiers(experience: number): SkillModifiers {
    return this.modifiers[this.getRank(experience)];
  }

  /**
   * Get the skill rank for this skill instance.
   *
   * @param experience - Amount of experience points to calculate rank for.
   *
   * @returns rank
   */
  public getRank(experience: number): SkillRank {
    if (experience < 3000) {
      return "E";
    }
    if (experience < 6000) {
      return "D";
    }
    if (experience < 9000) {
      return "C";
    }
    if (experience < 12000) {
      return "B";
    }
    if (experience < 18000) {
      return "A";
    }
    return "S";
  }

  /**
   * Gets instance as a JSON object.
   */
  public toData() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      tool: this.tool
    };
  }
}

export type SkillData = {
  id: string;
  name: string;
  description: string;
  tool: string[];
  modifiers: SkillModifiers;
};

export type SkillModifiers = {
  [rank: string]: {
    attack?: number;
    damage?: [number, number];
    threat?: number;
  };
};

export type SkillRank = "S" | "A" | "B" | "C" | "D" | "E";

export const SKILL_RANK_RANGE = {
  E: 1,
  D: 2,
  C: 3,
  B: 4,
  A: 5,
  S: 6
};
