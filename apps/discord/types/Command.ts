import Client from "../Client";
import { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";

type Command = ApplicationCommandData & {
  callback: (client: Client, interaction: ChatInputCommandInteraction) => void;
};

export default Command;
