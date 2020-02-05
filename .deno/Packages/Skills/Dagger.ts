import { Attribute, Character } from "character";

import { Skill, SkillResult, SkillModifier } from "./Lib/Skill.ts";

export class Dagger extends Skill {
  public static readonly id = "dagger";

  public readonly type = "dagger";
  public readonly name = "Dagger";
  public readonly description = "Ability to perform attack actions using a dagger.";
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
