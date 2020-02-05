import { ensureDirSync, writeJsonSync, readJsonSync } from "fs";

import { index } from "./Data.ts";
import { Weapon, WeaponData } from "./Weapon.ts";

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
    this.loadWeapons();
  }

  /**
   * Get list of items by type.
   *
   * @param type
   */
  public getItemsByType(type: string) {}

  /**
   * Get an item from the item list.
   *
   * @param id - Item id to retrieve.
   */
  public getItem(id: string) {
    console.log(this.items);
    const item = this.items[index.global[id]];
    if (!item) {
      throw new Error(`Invalid item ${id} requested.`);
    }
    return item;
  }

  /**
   * Loads all registered weapons.
   */
  private loadWeapons() {
    const weapons = readJsonSync(`../.data/default/Weapons.json`) as WeaponData[];
    weapons.forEach((weapon, i) => {
      this.items.push(new Weapon(weapon));
      index.global[weapon.id] = i;
    });
  }
}

export const items = new ItemManager();

export { Weapon };
