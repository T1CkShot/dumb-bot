import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Says Pong!");

export async function execute(interaction: CommandInteraction) {
  return interaction.reply("Pong!");
}
