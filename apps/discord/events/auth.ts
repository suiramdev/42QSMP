import { Event } from "../types";
import { Events, BaseInteraction, ComponentType, ButtonStyle } from "discord.js";
import prisma from "@database/lib/client";
import env from "../env"

export const event: Event = {
  name: Events.InteractionCreate,
  async callback(_, interaction: BaseInteraction) {
    if (!interaction.isButton() || interaction.customId !== "auth") return;

    const auth = await prisma.auth.create({
      data: {
        discordId: interaction.user.id,
        avatar: interaction.user.avatar,
        username: interaction.user.username,
        setup: {
          connect: {
            guildId: interaction.guildId!,
          },
        },
      },
    });

    await interaction.reply({
      embeds: [
        {
          description: "Now click again, but on the button below to log in with your 42 account and access the server.",
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              label: "Login",
              style: ButtonStyle.Link,
              url: `${env.SITE_URL}/auth?code=${auth.code}`,
            },
          ],
        },
      ],
      ephemeral: true,
    });
  },
};
