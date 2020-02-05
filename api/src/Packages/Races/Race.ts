import { AgeGroup } from "lib";

export class Race {
  /**
   * Unique race identifier.
   */
  public readonly id: string;

  /**
   * Name of the race.
   */
  public readonly name: string;

  /**
   * Racial description.
   */
  public readonly description: string;

  /**
   * List of age groups for this race.
   */
  public readonly ageGroups: AgeGroups;

  /**
   * Creates a new Race instance.
   *
   * @param data - Race data.
   */
  constructor(data: RaceData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.ageGroups = data.ageGroups;
  }
}

export type RaceData = {
  id: string;

  name: string;
  description: string;

  ageGroups: AgeGroups;
};

type AgeGroups = {
  [AgeGroup.Infant]: [number, number];
  [AgeGroup.Child]: [number, number];
  [AgeGroup.Teenager]: [number, number];
  [AgeGroup.Adult]: [number, number];
  [AgeGroup.Midlife]: [number, number];
  [AgeGroup.Senior]: [number, number];
  [AgeGroup.Elder]: [number, number];
};
