import { AttributeType, Character } from "../Character";
import { Item } from "../Item";
import { Skill, SkillType } from "../Skill";

class Defend extends Skill {
  public affect(from: Character, to: Character, item: Item): void {
    to.status.battle?.addDefender(from);
  }
}

export const defend = new Defend({
  id: "defend",
  type: SkillType.Support,
  name: "Defend",
  description: "Defend a target from incoming attacks.",
  attribute: AttributeType.Constitution
});
