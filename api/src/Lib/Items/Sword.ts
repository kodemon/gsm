import { Item } from "../Item";

class Sword extends Item {}

export const swords = {
  wood: new Sword({
    id: "sword-wood",
    name: "Wooden Sword",
    description: "A wooden sword, acts more like a club than a sharp object.",
    roll: 8
  }),
  iron: new Sword({
    id: "iron-sword",
    name: "Iron Sword",
    description: "A basic iron sword.",
    roll: 16
  })
};
