import * as inquirer from "inquirer";
import chalk from "chalk";

import { Guild } from "../Lib/Guild";
import { guild as gld } from "./Guild";
import { tavern } from "./Tavern";

class MainEngine {
  public async load(guild: Guild, init = false): Promise<void> {
    if (init) {
      welcome();
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What do you want to do?",
          choices: [
            {
              name: "Go to guild",
              value: "guild"
            },
            {
              name: "Go to tavern",
              value: "tavern"
            },
            new inquirer.Separator(),
            {
              name: "Quit",
              value: "quit"
            }
          ]
        }
      ])
      .then(({ choice }) => {
        switch (choice) {
          case "guild": {
            return gld.load(guild);
          }
          case "tavern": {
            return tavern.load(guild, true);
          }
          case "quit": {
            return process.exit(0);
          }
        }
      });
  }
}

export const main = new MainEngine();

/*
 |--------------------------------------------------------------------------------
 | Output
 |--------------------------------------------------------------------------------
 */

function welcome() {
  console.log(chalk`  Welcome to the world of {bold Guns, Swords and Magic}.
`);
}
