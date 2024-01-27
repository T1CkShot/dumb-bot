// ------------
// This is a sandalone script for registering commands.
// Run this separately to deploy command.
// ------------

import "dotenv/config";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { REST, Routes } from "discord.js";
import Command from "./types";

// ----- Place commands in an array -----

// Define __dirname
const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

// folderPath and commandFolders array
const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);

// commands array
const commands = [];

// return the files for each folder in commandFolders in an array
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const files = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  // require each file
  for (const file of files) {
    const filePath = path.join(commandsPath, file);
    const command: Command = await import(filePath);

    //push to commands array
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[Warning] the command at ${filePath} is missing 'data' or 'execute' property`,
      );
    }
  }
}

// ------ Register commands ------
const rest = new REST().setToken(process.env.PRIVATE_BOT_TOKEN as string);

(async () => {
  try {
    console.log(`Loading ${commands.length} commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.PRIVATE_BOT_CLIENT_ID as string,
        process.env.PRIVATE_DEV_GUILD_ID as string,
      ),
      { body: commands },
    );

    console.log(`Successfully loaded ${commands.length} commands`);
  } catch (error) {
    console.log(error);
  }
})();
