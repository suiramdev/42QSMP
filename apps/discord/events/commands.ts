import { Event } from "../types";
import { Events, BaseInteraction } from "discord.js";
import { errorEmbed } from "../utils/embeds";

export const event: Event = {
  name: Events.InteractionCreate,
  async callback(client, interaction: BaseInteraction) {
    if (!interaction.isChatInputCommand()) return;

    try {
      client.commands.get(interaction.commandName)?.callback(client, interaction);
      if (!interaction.replied) {
        await interaction.deferReply();
        await interaction.deleteReply();
      }
    } catch (error: any) {
      if (!interaction.deferred) await interaction.deferReply();
      await interaction.editReply({
        embeds: [errorEmbed(error.message ?? "An error has occurred.")],
      });
    }
  },
};
