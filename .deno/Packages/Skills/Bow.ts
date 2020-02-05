import { Attribute, Character } from "character";

import { Skill, SkillResult, SkillModifier } from "./Lib/Skill.ts";

export class Bow extends Skill {
  public static readonly id = "bow";

  public readonly type = "bow";
  public readonly name = "Bow";
  public readonly description = "Ability to perform attack actions using a bow.";
  public readonly attribute = {
    perform: Attribute.Dexterity,
    outcome: Attribute.Dexterity
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
