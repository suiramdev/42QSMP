import { Command } from "../types";
import { ApplicationCommandOptionType, ButtonStyle, ComponentType } from "discord.js";
import prisma from "@database/lib/client";

export const command: Command = {
  name: "setup",
  description: "Setup anything",
  options: [
    {
      name: "auth",
      description: "Setup the authentication system",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "role",
          description: "Role to give to authentified members",
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
    },
  ],
  defaultMemberPermissions: ["Administrator"],
  async callback(_, interaction) {
    if (interaction.options.getSubcommand() === "auth") {
      await prisma.authSetup.upsert({
        where: { guildId: interaction.guildId! },
        update: { roleId: interaction.options.getRole("role")!.id },
        create: { guildId: interaction.guildId!, roleId: interaction.options.getRole("role")!.id },
      });

      await interaction.channel!.send({
        embeds: [
          {
            title: "Authentication",
            description: "Click on the button below to request an authentication link.",
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                label: "Request",
                style: ButtonStyle.Primary,
                customId: "auth",
              },
            ],
          },
        ],
      });
    }
  },
};
