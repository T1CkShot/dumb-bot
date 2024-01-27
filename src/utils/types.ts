import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export default interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (
    interaction: CommandInteraction,
  ) => Promise<InteractionResponse<boolean>>;
}
