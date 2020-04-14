import { Battle } from "./Battle";
import { Character } from "./Character";
import { Skill } from "./Skill";
import { maybe } from "./Utils";

export class Stratagem {
  public strategies: Strategy[] = [];

  /**
   * Create new Stratagem instance.
   *
   * @param strategies - List of strategies.
   */
  constructor(strategies: Strategy[]) {
    this.strategies = strategies.sort((a, b) => a.priority - b.priority);
  }

  /**
   *
   * @param character
   * @param battle
   */
  public getAction(character: Character, battle: Battle): Action | undefined {
    for (const strategy of this.strategies) {
      for (const combatant of battle.combatants) {
        switch (strategy.target) {
          case TargetType.Ally: {
            if (battle.isAllied(character, combatant)) {
              const action = this.getTargetAction(strategy, combatant.character);
              if (action) {
                return action;
              }
            }
            break;
          }
          case TargetType.Enemy: {
            if (!battle.isAllied(character, combatant)) {
              const action = this.getTargetAction(strategy, combatant.character);
              if (action) {
                return action;
              }
            }
          }
          default: {
            if (combatant.character === strategy.target) {
              const action = this.getTargetAction(strategy, combatant.character);
              if (action) {
                return action;
              }
            }
          }
        }
      }
    }
  }

  /**
   *
   * @param strategy
   * @param character
   */
  public getTargetAction(strategy: Strategy, character: Character): Action | undefined {
    switch (strategy.modifier) {
      case "<": {
        if (maybe(character, strategy.key, 0) < strategy.value) {
          return {
            target: character,
            skill: strategy.skill
          };
        }
      }
      case "<=": {
        if (maybe(character, strategy.key, 0) <= strategy.value) {
          return {
            target: character,
            skill: strategy.skill
          };
        }
      }
      case ">": {
        if (maybe(character, strategy.key, 0) > strategy.value) {
          return {
            target: character,
            skill: strategy.skill
          };
        }
      }
      case ">=": {
        if (maybe(character, strategy.key, 0) >= strategy.value) {
          return {
            target: character,
            skill: strategy.skill
          };
        }
      }
    }
  }
}

export enum TargetType {
  Ally = "ALLY",
  Enemy = "ENEMY"
}

/**
 * Strategy part of a stratagem.
 */
type Strategy = {
  priority: number;
  target: Target;
  key: string;
  modifier: Modifier;
  value: number;
  skill: Skill;
};

/**
 * Valid targets of a strategy.
 */
type Target = TargetType | Character;

/**
 * Valid modifiers of a strategy when checking key/value pairs.
 */
type Modifier = "<" | ">" | "=" | ">=" | "<=";

/**
 * Action being taken against a target.
 */
type Action = {
  target: Character;
  skill: Skill;
};
