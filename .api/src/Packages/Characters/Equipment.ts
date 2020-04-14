import { Weapon, items } from "items";

export class Equipment {
  public head?: any;
  public eyes?: any;
  public neck?: any;
  public body?: any;
  public wrists?: any;
  public hands?: any;
  public feet?: any;

  public rings?: any;

  public primary?: Weapon;
  public secondary?: Weapon | any;

  /**
   * Creates a new Equipment instance.
   *
   * @param data
   */
  constructor(data: EquipmentData = {}) {
    for (const slot in data) {
      const item = data[slot as EquipmentSlot];
      if (item) {
        if (Array.isArray(item)) {
          for (const ring of slot) {
            this.equip("rings", ring);
          }
        } else {
          this.equip(slot as EquipmentSlot, item);
        }
      }
    }
  }

  /**
   * Equips the character with the provided item in the provided slot.
   *
   * @param slot - Slot to add the item to.
   * @param item - Item to add to the slot.
   * @param replace - Item to replace if slot supports multiple items.
   */
  public equip(slot: EquipmentSlot, item: string, replace?: string): void {
    switch (slot) {
      case "head": {
        // equip item from head list ...
        break;
      }
      case "body": {
        // equip body item ...
        break;
      }
    }
  }

  /**
   * Get equipped armor class calculation.
   *
   * @returns armor class
   */
  public getArmorClass(): number {
    let ac = 0;
    if (this.body) {
      ac += this.body.ac;
    }
    if (this.secondary?.type === "shield") {
      ac += this.secondary.ac;
    }
    return ac;
  }

  /**
   * Converts the equipment instance to a storable format.
   */
  public toData(): EquipmentData {
    return {
      head: this.head,
      eyes: this.eyes,
      neck: this.neck,
      body: this.body,
      wrists: this.wrists,
      hands: this.hands,
      feet: this.feet,
      rings: this.rings,
      primary: this.primary?.id,
      secondary: this.secondary
    };
  }
}

export type EquipmentSlot = "head" | "eyes" | "neck" | "body" | "wrists" | "hands" | "feet" | "rings" | "primary" | "secondary";

export type EquipmentData = {
  head?: string;
  eyes?: string;
  neck?: string;
  body?: string;
  wrists?: string;
  hands?: string;
  feet?: string;
  rings?: string[];
  primary?: string;
  secondary?: string;
};
