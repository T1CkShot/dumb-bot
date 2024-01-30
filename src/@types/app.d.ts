import {
  Collection,
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (
    interaction: CommandInteraction,
  ) => Promise<InteractionResponse<boolean>>;
}
declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, Command>;
  }
}
