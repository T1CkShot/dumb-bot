import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Says Pong!");

export const execute = (interaction: CommandInteraction) => {
  return interaction.reply(`Pong! This took ${interaction.client.ws.ping}ms`);
};
