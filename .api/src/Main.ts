import "module-alias/register";

/*
 |--------------------------------------------------------------------------------
 | Load Data
 |--------------------------------------------------------------------------------
 */

import { ensureDirSync, writeJsonSync, readJsonSync } from "fs-extra";
import { db } from "database";

const weapons = db.addCollection("weapon", {
  unique: ["id"],
  indices: ["category", "group", "price"]
});

const melee = readJsonSync(`../.data/default/equipment/weapons/melee.json`);
for (const item of melee) {
  weapons.insert(item);
}

const ranged = readJsonSync(`../.data/default/equipment/weapons/ranged.json`);
for (const item of ranged) {
  weapons.insert(item);
}

console.log(weapons.find());

/*
 |--------------------------------------------------------------------------------
 | Register Events
 |--------------------------------------------------------------------------------
 */

import "./Events";

/*
 |--------------------------------------------------------------------------------
 | Main Game Loop
 |--------------------------------------------------------------------------------
 */

async function main() {
  setTimeout(main, 1000);
}

main();
