import * as inquirer from "inquirer";
import bcrypt from "bcrypt";

import { main } from "./Engine/Main";
import { mongo } from "./Lib/Data";
import { Guild } from "./Lib/Guild";
import { uuid } from "./Lib/Utils";

async function load(guild?: Guild): Promise<void> {
  await mongo.connect();
  if (!guild) {
    return authenticate();
  }
  main.load(guild, true);
}

async function authenticate(): Promise<void> {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Authentication required",
      choices: [
        {
          name: "Sign in",
          value: "signin"
        },
        {
          name: "Sign up",
          value: "signup"
        },
        new inquirer.Separator(),

        {
          name: "Quit",
          value: "quit"
        }
      ]
    }
  ]);

  switch (choice) {
    case "signin": {
      const { username, password } = await inquirer.prompt([
        {
          type: "input",
          message: "Enter your username",
          name: "username"
        },
        {
          type: "password",
          message: "Enter your password",
          name: "password",
          mask: "*"
        }
      ]);
      const guild = await Guild.getByMaster(username);
      if (!guild) {
        console.log("There is no guild registered under that email address.");
        return load();
      }
      const isValidPassword = await bcrypt.compare(password, guild.master.password);
      if (!isValidPassword) {
        console.log("Password is incorrect.");
        return load();
      }
      load(guild);
      break;
    }
    case "signup": {
      const { master, name, username, password } = await inquirer.prompt([
        {
          type: "input",
          message: "Enter your name",
          name: "master"
        },
        {
          type: "input",
          message: "Enter your guilds name",
          name: "name"
        },
        {
          type: "input",
          message: "Enter your username",
          name: "username"
        },
        {
          type: "password",
          message: "Enter your password",
          name: "password",
          mask: "*"
        }
      ]);
      const guild = new Guild({
        id: uuid(),
        name,
        master: {
          name: master,
          username,
          password: await bcrypt.hash(password, await bcrypt.genSalt(14))
        },
        members: []
      });
      await guild.save();
      load(guild);
      break;
    }
    default: {
      process.exit(0);
    }
  }
}

load();
