import { Attribute, Character } from "character";

import { Skill, SkillResult, SkillModifier } from "./Lib/Skill.ts";

export class Sword extends Skill {
  public static readonly id = "sword";

  public readonly type = "sword";
  public readonly name = "Sword";
  public readonly description = "Ability to perform attack or defensive actions using a sword.";
  public readonly attribute = {
    perform: Attribute.Dexterity,
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
