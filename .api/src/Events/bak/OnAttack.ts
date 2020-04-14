import { log } from "../Helpers/Log";
import { items } from "../Lib/Character/Items/mod";
import { RaceType } from "../Lib/Character/Races/mod";
import { getWorld } from "../Lib/World/mod";

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

interface AttackProps {
  attackerId: string;
  defenderId: string;
}

let round = 0;

/**
 *
 * @param prop.race
 * @param prop.gender
 * @param prop.role
 * @param prop.level
 *
 * @returns created character
 */
export function onAttack({ attackerId, defenderId }: AttackProps) {
  const attacker = world.getCharacter(attackerId);
  if (!attacker) {
    throw new Error("Attacker does not exist!");
  }
  const defender = world.getCharacter(defenderId);
  if (!defender) {
    throw new Error("Defender does not exist!");
  }
  round = 0;
  attack(attacker, defender, items.weapons.swords["sword-iron"]);
}

function attack(attacker: RaceType, defender: RaceType, weapon: any) {
  let nextRound = true;

  log(`Battle Round: ${round}`);

  weapon.use(attacker, defender);

  if (attacker.status.getHealth() <= 0) {
    log(`${attacker.name} fumbled his/her attack badly and murdered him/her(self).`);
    world.delCharacter(attacker.uuid);
    nextRound = false;
  }

  if (defender.status.getHealth() <= 0) {
    log(`${defender.name} fell to the ground like a sack of shit, the battle is over.`);
    world.delCharacter(defender.uuid);
    nextRound = false;
  }

  world.setHash();

  if (nextRound) {
    setTimeout(() => {
      round++;
      attack(defender, attacker, weapon);
    }, 2500);
  }
}
