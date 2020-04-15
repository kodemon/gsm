import * as inquirer from "inquirer";
import chalk from "chalk";

import { Character } from "../Lib/Character";
import { getRandomAdventurer } from "../Lib/Generators";
import { Guild } from "../Lib/Guild";
import { guild as gld } from "./Guild";
import { main } from "./Main";

class TavernEngine {
  /**
   * Load the recruitment inquirer.
   *
   * @param guild - Guild that is performing recruitment.
   * @param init  - Is this a top level load event?
   */
  public async load(guild: Guild, init = false) {
    if (init) {
      logWelcome(guild);
    }
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          {
            name: "View adventurer candidates",
            value: "candidates"
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
      case "candidates": {
        return this.goToCandidates(guild);
      }
      case "exit": {
        return main.load(guild);
      }
    }
  }

  /**
   * List out a generated list of adventurer candidates.
   *
   * @param guild      - Guild performing the search.
   * @param candidates - List of candidates.
   */
  public goToCandidates(guild: Guild, candidates: Character[] = []) {
    while (candidates.length < 10) {
      candidates.push(getRandomAdventurer("human", "male"));
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Who do you want to view?",
          choices: candidates
            .map<any>((character) => ({
              name: character.name,
              value: character.id
            }))
            .concat([
              new inquirer.Separator(),
              {
                name: "Done",
                value: "exit"
              }
            ])
        }
      ])
      .then(({ choice }) => {
        if (choice === "exit") {
          return gld.load(guild);
        }
        const candidate = candidates.find((c) => c.id === choice);
        if (!candidate) {
          console.log(`Could not locate character with id: ${choice}`);
          return this.goToCandidates(guild, candidates);
        }
        this.goToCandidate(guild, candidates, candidate);
      });
  }

  /**
   * View candidate to recruit.
   *
   * @param guild      - Guild performing recruitment.
   * @param candidates - List of candidates.
   * @param candidate  - Chosen candidate.
   */
  public goToCandidate(guild: Guild, candidates: Character[], candidate: Character) {
    logCharacter(candidate);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: `Do you want to recruit ${candidate.name}?`,
          choices: [
            {
              name: "Yes",
              value: true
            },
            {
              name: "No",
              value: false
            }
          ]
        }
      ])
      .then(({ choice }) => {
        if (choice === true) {
          guild.addMember(candidate);
          this.goToCandidates(
            guild,
            candidates.reduce<Character[]>((characters, character) => {
              if (character.id !== candidate.id) {
                characters.push(character);
              }
              return characters;
            }, [])
          );
        } else {
          this.goToCandidates(guild, candidates);
        }
      });
  }
}

export const tavern = new TavernEngine();

/*
 |--------------------------------------------------------------------------------
 | Output
 |--------------------------------------------------------------------------------
 */

function logWelcome(guild: Guild) {
  console.log(chalk`
  You enter the local tavern where most adventurers frequent daily.
  `);
}

function logCharacter(character: Character) {
  console.log(chalk`
  {green.bold ${character.name}}

    Status:

      - Health ${character.status.health.current} / ${character.status.health.total}
      - Mana   ${character.status.mana.current} / ${character.status.mana.total}

    Skills: ${JSON.stringify(character.skills, null, 2)}
  `);
}
