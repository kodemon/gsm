import { Weapon, items } from "items";

const ARMOR_PARTS: ArmorParts = ["head", "body", "hands", "legs", "feet"];

export class Equipment {
  /**
   * Equipped head gear.
   */
  public head?: any;

  /**
   * Equipped body armor.
   */
  public body?: any;

  /**
   * Equipped gloves.
   */
  public hands?: any;

  /**
   * Equipped leg wear.
   */
  public legs?: any;

  /**
   * Equipped boots.
   */
  public feet?: any;

  /**
   * Primary weapon.
   */
  public primary?: Weapon;

  /**
   * Secondary weapon or shield.
   */
  public secondary?: Weapon | any;

  /**
   * Creates a new Equipment instance.
   *
   * @param data
   */
  constructor(data: EquipmentData = {}) {
    this.primary = items.get("1h-shortsword");
  }

  /**
   * Get total armor class based on current equipment.
   *
   * @returns armor class
   */
  public getArmorClass() {
    return ARMOR_PARTS.reduce<number>((ac, part) => {
      if (this[part]) {
        ac += this[part].armor;
      }
      return ac;
    }, 0);
  }

  public toData(): EquipmentData {
    return {
      head: this.head,
      body: this.body,
      hands: this.hands,
      legs: this.legs,
      feet: this.feet,
      primary: this.primary?.id,
      secondary: this.secondary
    };
  }
}

type ArmorParts = ["head", "body", "hands", "legs", "feet"];

export type EquipmentData = {
  head?: string;
  body?: string;
  hands?: string;
  legs?: string;
  feet?: string;
  primary?: string;
  secondary?: string;
};
