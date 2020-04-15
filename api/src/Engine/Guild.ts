import * as inquirer from "inquirer";
import chalk from "chalk";

import { Character } from "../Lib/Character";
import { Guild } from "../Lib/Guild";
import { main } from "./Main";

class GuildEngine {
  /**
   * Load the guild inquirer.
   *
   * @param guild - Guild to operate on.
   * @param init  - Is this a top level load event?
   */
  public async load(guild: Guild): Promise<void> {
    logMenu(guild);
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: chalk`{yellow.bold ${guild.name}} terminal commands:`,
        choices: [
          {
            name: "View guild roster",
            value: "roster"
          },
          {
            name: "View guild treasury",
            value: "treasury"
          },
          new inquirer.Separator(),
          {
            name: "Leave",
            value: "exit"
          }
        ]
      }
    ]);
    switch (choice) {
      case "roster": {
        return this.goToRoster(guild);
      }
      case "treasury": {
        return this.goToTreasury(guild);
      }
      case "exit": {
        return main.load(guild);
      }
    }
  }

  /**
   * Load the guild roster.
   *
   * @param guild - Guild instance.
   */
  public async goToRoster(guild: Guild): Promise<void> {
    logRooster();
    const { id } = await inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: "Select a guild member:",
        choices: guild.members
          .map<any>((character) => ({
            name: `${character.name} | Health ${character.status.health.current} / ${character.status.health.total} | Mana ${character.status.mana.current} / ${character.status.mana.total}`,
            value: character.id
          }))
          .concat([
            new inquirer.Separator(),
            {
              name: "Leave",
              value: "exit"
            }
          ])
      }
    ]);
    const character = guild.members.find((character) => character.id === id);
    if (!character) {
      return this.load(guild);
    }
    this.goToCharacter(guild, character);
  }

  /**
   * Load guild member.
   *
   * @param guild     - Guild instance.
   * @param character - Guild member character.
   */
  public async goToCharacter(guild: Guild, character: Character): Promise<void> {
    logMember(character);
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Select a member action:",
        choices: [
          {
            name: "Remove from guild",
            value: "remove"
          },
          new inquirer.Separator(),
          {
            name: "Leave",
            value: "exit"
          }
        ]
      }
    ]);
    switch (action) {
      case "remove": {
        const { confirm } = await inquirer.prompt([
          {
            type: "confirm",
            name: "confirm",
            message: "Are you sure you wish to remove this member, this cannot be undone?",
            default: false
          }
        ]);
        if (confirm) {
          guild.delMember(character.id);
        }
        return this.goToRoster(guild);
      }
      case "exit": {
        return this.goToRoster(guild);
      }
    }
  }

  /**
   * Load the guild roster.
   *
   * @param guild - Guild instance.
   */
  public async goToTreasury(guild: Guild): Promise<void> {
    logTreasury(guild);
    const { command } = await inquirer.prompt([
      {
        type: "list",
        name: "command",
        message: "Select a treasury command:",
        choices: [
          {
            name: "Actions under construction...",
            value: "exit"
          },
          new inquirer.Separator(),
          {
            name: "Leave",
            value: "exit"
          }
        ]
      }
    ]);
    switch (command) {
      case "exit": {
        return this.load(guild);
      }
    }
  }
}

export const guild = new GuildEngine();

/*
 |--------------------------------------------------------------------------------
 | Output
 |--------------------------------------------------------------------------------
 */

function logMenu(guild: Guild) {
  console.log(chalk`
  {bold GSM} Terminal
  ============
  Loading guild menu...
  `);
}

function logRooster() {
  console.log(chalk`
  {bold GSM} Terminal
  ============
  Loading member roster...
  `);
}

function logMember(character: Character) {
  console.log(chalk`
  {bold GSM} Terminal
  ============
  Loading member details...

  {green.bold ${character.name}}

    [Detail view currently under construction]
  `);
}

function logTreasury(guild: Guild) {
  console.log(chalk`
  {bold GSM} Terminal
  ============
  Loading treasury status...

  {yellow.bold ${guild.name}} treasury record:

    Gold: {yellow.bold ${guild.gold}}
  `);
}
