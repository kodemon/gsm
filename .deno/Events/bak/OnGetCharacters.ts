import { getWorld } from "../Lib/World/mod.ts";

/*
 |--------------------------------------------------------------------------------
 | World
 |--------------------------------------------------------------------------------
 */

const world = getWorld("demo");

/*
 |--------------------------------------------------------------------------------
 | Event
 |--------------------------------------------------------------------------------
 */

export function onGetCharacters() {
  return world.characters.toJSON();
}
