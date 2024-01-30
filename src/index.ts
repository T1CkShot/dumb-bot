import "dotenv/config";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { BotEvent, Command } from "./@types/app";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// COMMAND HANDLER

// Define __dirname
const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

// folderPath and commandFolders array
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

// client commands property
client.commands = new Collection();

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

    // set them in client.commands property
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `![Warning] the command at ${filePath} is missing 'data' or 'execute' property`,
      );
    }
  }
}

// ---- EVENT HANDLER -----
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event: BotEvent = await import(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// login the bot
client.login(process.env.PRIVATE_BOT_TOKEN);
