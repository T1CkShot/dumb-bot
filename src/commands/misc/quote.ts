import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("quote")
  .setDescription("Replies with a quote");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();
  const res = await fetch("https://zenquotes.io/api/random").then((res) =>
    res
      .json()
      .then((res) => res[0])
      .catch((err) => console.log(err)),
  );
  await interaction.editReply(
    `> ***${res.q}\n> ― ${res.a}***\n\n Inspirational quotes provided by <[ZenQuotes API](https://zenquotes.io)>`,
  );
};
