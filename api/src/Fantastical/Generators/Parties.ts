import { dieRoll, sample, capitalize } from "../../Lib/Utils";
import { mysticOrder, militaryUnit, guilds } from "../Resources/Parties";
import { Species } from "./Species";

const species = new Species();

export class Parties {
  /**
   * Gets mystic order name.
   *
   * @returns mystic order name.
   */
  public mysticOrder(): string {
    const config = {
      group: mysticOrder.group[dieRoll(10) > 5 ? "cliques" : "people"],
      entity: mysticOrder.entities,
      description: mysticOrder.description.quality.concat(mysticOrder.description.colour)
    };
    return sample(mysticOrder.patterns).replace(/<([\w\W]*?)>/g, (match: any) => {
      return capitalize(sample((config as any)[match.replace(/<|>/g, "")]));
    });
  }

  /**
   * Gets military unit name.
   *
   * @returns military unit name.
   */
  public militaryUnit(): string {
    const config = {
      commander: [species.human()],
      group: sample(militaryUnit.groups),
      colour: militaryUnit.description.colour,
      other: militaryUnit.description.other,
      place: militaryUnit.places.seas.concat(militaryUnit.places.lands)
    };
    return sample(militaryUnit.patterns).replace(/<([\w\W]*?)>/g, (match: any) => {
      return capitalize(sample((config as any)[match.replace(/<|>/g, "")]));
    });
  }

  /**
   * Gets guild name.
   *
   * @returns guild name.
   */
  public guild(): string {
    const roll = dieRoll(10);
    if (roll < 3) {
      return `${capitalize(sample(guilds.roles))} of ${capitalize(sample(guilds.goals))}`;
    }
    if (roll < 6) {
      return `${capitalize(sample(guilds.adjectives))} ${capitalize(sample(guilds.actions))} ${capitalize(
        sample(guilds.titles)
      )}`;
    }
    return `${capitalize(sample(guilds.descriptions))} ${capitalize(sample(sample(guilds.groups)))}`;
  }
}
