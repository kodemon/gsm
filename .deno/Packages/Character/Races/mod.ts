import { Demon } from "./Demon.ts";
import { Dragon } from "./Dragon.ts";
import { Dwarf } from "./Dwarf.ts";
import { Elf } from "./Elf.ts";
import { Goblin } from "./Goblin.ts";
import { Human } from "./Human.ts";
import { Ogre } from "./Ogre.ts";
import { Orc } from "./Orc.ts";

/**
 * Race.
 */
export enum Race {
  Demon = "demon",
  Dragon = "dragon",
  Dwarf = "dwarf",
  Elf = "elf",
  Goblin = "goblin",
  Human = "human",
  Orc = "orc",
  Ogre = "ogre"
}

/**
 * List of races.
 */
export const RACES = [Race.Demon, Race.Dragon, Race.Dwarf, Race.Elf, Race.Goblin, Race.Human, Race.Orc, Race.Ogre];

/**
 * List of adventurer races.
 */
export const ADVENTURER_RACES = [Race.Dwarf, Race.Elf, Race.Human];

/**
 * Key value races to available races.
 */
export const races = {
  demon: Demon,
  dragon: Dragon,
  dwarf: Dwarf,
  elf: Elf,
  goblin: Goblin,
  human: Human,
  ogre: Ogre,
  orc: Orc
};
