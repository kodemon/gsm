import { Character } from "./Character";
import { swords } from "./Items";
import { uuid } from "./Utils";
import { SkillResult } from "./Skill";

export class Battle {
  public combatants: Combatant[] = [];
  public graveyard: Character[] = [];
  public history: any[] = [];

  /**
   * Create a new Battle instance.
   *
   * @param groups - Groups participating in the battle.
   */
  constructor(groups: Group[]) {
    for (const characters of groups) {
      const id = uuid();
      for (const character of characters) {
        this.combatants.push({
          group: id,
          character,
          initiative: character.initiative()
        });
      }
    }
    this.combatants = this.combatants.sort((a, b) => b.initiative - a.initiative);
  }

  /**
   * Check if character is part of the same battle group as the target.
   *
   * @param character - Character performing the check.
   * @param target - Target being validated against.
   *
   * @returns 'true' if allied, 'false' if not
   */
  public isAllied(character: Character, target: Combatant): boolean {
    const combatant = this.combatants.find((combatant) => combatant.character.id === character.id);
    return combatant?.group === target.group;
  }

  public commence(): void {
    while (!this.concluded()) {
      this.round();
    }
  }

  /**
   * Check if a battle is concluded.
   *
   * @remarks
   * A battle is concluded when all characters in every other adversary
   * group has been killed or yielded in combat.
   *
   * @returns 'true' if concluded, 'false' if not
   */
  public concluded(): boolean {
    const groups: Set<string> = new Set([]);
    for (const combatant of this.combatants) {
      if (combatant.character.isAlive()) {
        groups.add(combatant.group);
      }
    }
    return groups.size < 2;
  }

  /**
   *
   */
  public round() {
    for (const { character } of this.combatants) {
      if (!character.isAlive()) {
        break; // character was killed during the round...
      }

      const action = character.stratagem.getAction(character, this);
      if (action) {
        const { target, skill } = action;

        // ### Perform Skill

        const roll = skill.roll(character, 10);
        if (roll === SkillResult.Success || roll === SkillResult.CriticalSuccess) {
          skill.affect(character, target, swords.iron);
          if (!target.isAlive()) {
            this.combatants = this.combatants.filter((combatant) => combatant.character.id !== target.id);
            this.graveyard.push(target);
          }
        }

        this.history.push(action);
      }
    }
  }
}

export class BattleStatus {
  public defenders: Character[] = [];

  /**
   * Add a defender to the character.
   *
   * @param character - Character defending.
   */
  public addDefender(character: Character) {
    this.defenders.push(character);
  }

  /**
   * Removes a defender from the character.
   *
   * @param character - Character no longer defending.
   */
  public removeDefender(character: Character) {
    this.defenders = this.defenders.reduce<Character[]>((defenders, defender) => {
      if (character.id !== defender.id) {
        defenders.push(defender);
      }
      return defenders;
    }, []);
  }
}

/*
 |--------------------------------------------------------------------------------
 | Typed
 |--------------------------------------------------------------------------------
 */

type Combatant = {
  group: string;
  character: Character;
  initiative: number;
};

type Group = Character[];
