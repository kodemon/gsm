import { Bow } from "./Bow.ts";
import { Broadsword } from "./Broadsword.ts";
import { Dagger } from "./Dagger.ts";
import { Staff } from "./Staff.ts";
import { Sword } from "./Sword.ts";

export * from "./Lib/Skill.ts";

export const skills = {
  [Bow.id]: Bow,
  [Broadsword.id]: Broadsword,
  [Dagger.id]: Dagger,
  [Staff.id]: Staff,
  [Sword.id]: Sword
};
