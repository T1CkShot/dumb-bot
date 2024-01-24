import "dotenv/config";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

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
  const files = fs.readdirSync(commandsPath).filter((file) => {
    file.endsWith(".js");
  });

  // require each file
  for (const file in files) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // set them in client.commands property
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[Warning] the command at ${filePath} is missing 'data' or 'execute' property`,
      );
    }
  }
}

// login the bot
client.login(process.env.PRIVATE_BOT_TOKEN);
