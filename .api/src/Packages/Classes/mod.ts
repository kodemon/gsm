import { ensureDirSync, writeJsonSync, readJsonSync } from "fs-extra";

import { sample } from "helpers";

import { Class, ClassData } from "./Class";

class ClassManager {
  /**
   * List of managed classes.
   */
  public classes: { [id: string]: Class } = {};

  /**
   * Creates a new ClassManager instance.
   */
  constructor() {
    const classes = readJsonSync(`../.data/default/classes.json`) as ClassData[];
    for (const data of classes) {
      this.classes[data.id] = new Class(data);
    }
  }

  /**
   * Get a class from the class list.
   *
   * @param id - Class identifier.
   *
   * @returns class
   */
  public get(id: string): Class {
    const value = this.classes[id];
    if (!value) {
      throw new Error(`Invalid class ${id} requested.`);
    }
    return value;
  }

  /**
   * Get a random class from the list of classes.
   *
   * @returns class
   */
  public getRandom(): Class {
    return this.classes[sample(Object.keys(this.classes))];
  }
}

export const classes = new ClassManager();

export { Class };
