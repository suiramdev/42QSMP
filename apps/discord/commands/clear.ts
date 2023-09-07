import { Command } from "../types";
import { ApplicationCommandOptionType, PermissionFlagsBits, TextChannel } from "discord.js";

export const command: Command = {
  name: "clear",
  description: "Clear messages in the channel",
  options: [
    {
      name: "amount",
      description: "Amount of messages to delete",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  defaultMemberPermissions: [PermissionFlagsBits.ManageMessages],
  async callback(_, interaction) {
    const amount = interaction.options.getInteger("amount")! + 1;

    for (let i = 0; i < amount / 100; i++) {
      (interaction.channel as TextChannel)?.bulkDelete(amount > 100 ? 100 : amount);
    }
  },
};
