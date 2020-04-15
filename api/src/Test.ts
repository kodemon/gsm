import { Battle } from "./Lib/Battle";
import { Character } from "./Lib/Character";
import { getRandomAdventurer } from "./Lib/Generators";

const groups: Character[][] = [[], []];

for (let i = 0, len = 4; i < len; i++) {
  groups[0].push(getRandomAdventurer("human"));
}

for (let i = 0, len = 4; i < len; i++) {
  groups[1].push(getRandomAdventurer("human"));
}

const battle = new Battle(groups);

console.log("\nBATTLE STARTS\n=============\n");

battle.commence();

console.log("\nBATTLE RESULT\n=============\n");

for (const combatant of battle.combatants) {
  console.log(combatant.character.name, " is left with ", combatant.character.status.health.current, " health.");
}

console.log("\nCHARACTER SHEETS\n================\n");

for (const combatant of battle.combatants) {
  console.log(combatant.character, "\n");
}
