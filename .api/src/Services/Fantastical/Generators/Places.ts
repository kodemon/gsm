import { capitalize } from "../../../Helpers/Capitalize";
import { sample } from "../../../Helpers/Sample";
import { tavern } from "../Resources/Places";

export class Places {
  /**
   * Gets tavern name.
   *
   * @returns tavern name.
   */
  public tavern(): string {
    return sample(tavern.patterns).replace(/<([\w\W]*?)>/g, match => {
      match = match.replace(/<|>/g, "");
      return capitalize(sample((tavern as any)[match]));
    });
  }
}
