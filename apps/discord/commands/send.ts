import { Command } from "../types";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export const command: Command = {
  name: "send",
  description: "Send a message through the bot",
  options: [
    {
      name: "data",
      description: "Message's data in JSON format",
      type: ApplicationCommandOptionType.String,
    },
  ],
  defaultMemberPermissions: [PermissionFlagsBits.Administrator],
  callback(_, interaction) {
    interaction.channel?.send(JSON.parse(interaction.options.getString("data")!));
  },
};
