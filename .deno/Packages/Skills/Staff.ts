import { Attribute, Character } from "character";

import { Skill, SkillResult, SkillModifier } from "./Lib/Skill.ts";

export class Staff extends Skill {
  public static readonly id = "staff";

  public readonly type = "staff";
  public readonly name = "Staff";
  public readonly description = "Ability to use a staff for boosting spells.";
  public readonly attribute = {
    perform: Attribute.Intelligence,
    outcome: Attribute.Intelligence
  };

  public modifier(result: SkillResult, opponent: Character): SkillModifier | undefined {
    switch (result) {
      case SkillResult.CRITICAL_FAILURE: {
        return { type: "-", value: 0 };
      }
      case SkillResult.FAILURE: {
        return { type: "-", value: 0 };
      }
      case SkillResult.SUCCESS: {
        return { type: "-", value: 0 };
      }
      case SkillResult.CRITICAL_SUCCESS: {
        return { type: "-", value: 0 };
      }
    }
  }
}
