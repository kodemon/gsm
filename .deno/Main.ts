import { world } from "world";

import "./Events.ts";

/*
 |--------------------------------------------------------------------------------
 | Main Game Loop
 |--------------------------------------------------------------------------------
 */

world.flush();

async function main() {
  world.publish();
  setTimeout(main, 1000);
}

main();
