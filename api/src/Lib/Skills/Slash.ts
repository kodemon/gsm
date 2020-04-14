import { AttributeType, Character } from "../Character";
import { Item } from "../Item";
import { Skill, SkillType } from "../Skill";
import { dieRoll } from "../Utils";

class Slash extends Skill {
  public affect(from: Character, to: Character, item: Item): void {
    if (!item) {
      throw new Error("Slash skill cannot be performed without a weapon");
    }
    const damage = dieRoll(from.attributes.strength) + dieRoll(item.roll);
    to.status.modify("health", -damage);
    if (to.isAlive()) {
      console.log(`${from.name} attacked ${to.name} for ${damage} points of ${this.name} damage.`);
    } else {
      console.log(`${from.name} killed ${to.name} with ${damage} points of ${this.name} damage.`);
    }
  }
}

export const slash = new Slash({
  id: "slash",
  type: SkillType.Melee,
  name: "Slash",
  description: "Performs a slash attack with the given item.",
  attribute: AttributeType.Strength
});
