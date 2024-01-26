import { Collection } from "discord.js";
import { Command } from "../utils/types";

declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, Command>;
  }
}
