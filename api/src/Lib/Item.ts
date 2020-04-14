export abstract class Item {
  public id: string;
  public name: string;
  public description: string;
  public roll: number;

  /**
   * Create a new Skill instance.
   *
   * @param data - Skill data.
   */
  constructor(data: ItemData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.roll = data.roll;
  }
}

type ItemData = {
  id: string;
  name: string;
  description: string;
  roll: number;
};
