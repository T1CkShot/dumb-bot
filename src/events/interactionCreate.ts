import { Events, Interaction } from "discord.js";

export const name = Events.InteractionCreate;
export const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    interaction.reply(`Command not found: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.reply({
        content: `There was an error executing the command: ${interaction.command?.name}`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: `There was an error executing the command: ${interaction.command?.name}`,
        ephemeral: true,
      });
    }
  }
};
