import { Attribute, Character } from "character";

import { Skill, SkillResult, SkillModifier } from "./Lib/Skill.ts";

export class Broadsword extends Skill {
  public static readonly id = "broadsword";

  public readonly type = "broadsword";
  public readonly name = "Broadsword";
  public readonly description = "Ability to perform attack or defensive actions using a broadsword.";
  public readonly attribute = {
    perform: Attribute.Strength,
    outcome: Attribute.Strength
  };

  public modifier(result: SkillResult, opponent: Character): SkillModifier | undefined {
    switch (result) {
      case SkillResult.CRITICAL_FAILURE: {
        return { type: "-", value: 100 };
      }
      case SkillResult.FAILURE: {
        return { type: "-", value: 100 };
      }
      case SkillResult.SUCCESS: {
        return { type: "-", value: 10 };
      }
      case SkillResult.CRITICAL_SUCCESS: {
        return { type: "-", value: 0 };
      }
    }
  }
}
