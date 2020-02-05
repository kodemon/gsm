import { ensureDirSync, writeJsonSync, readJsonSync } from "fs-extra";

import { index } from "./Data";
import { Weapon, WeaponData } from "./Weapon";

type ItemType = Weapon;

class ItemManager {
  /**
   * List of weapons.
   */
  public items: ItemType[] = [];

  /**
   * Creates a new ItemManager instance.
   */
  constructor() {
    const weapons = readJsonSync(`../.data/default/Weapons.json`) as WeaponData[];
    weapons.forEach((weapon, i) => {
      this.items.push(new Weapon(weapon));
      index.global[weapon.id] = i;
    });
  }

  /**
   * Get list of items by type.
   *
   * @param type
   */
  public getByType(type: string) {}

  /**
   * Get an item from the item list.
   *
   * @param id - Item id to retrieve.
   */
  public get(id: string) {
    const item = this.items[index.global[id]];
    if (!item) {
      throw new Error(`Invalid item ${id} requested.`);
    }
    return item;
  }
}

export const items = new ItemManager();

export { Weapon };
