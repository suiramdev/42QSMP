import { Client as DiscordClient, Collection, IntentsBitField, Events } from "discord.js";
import type { Command } from "./types";
import { findFiles } from "./utils/files";
import * as path from "path";
import env from "./env";

class Client extends DiscordClient {
  public commands: Collection<string, Command> = new Collection();

  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.MessageContent,
      ],
    });

    this.on(Events.ClientReady, () => {
      this.loadEvents("./events");
      this.loadCommands("./commands");
    });
  }

  public async login(): Promise<string> {
    return super.login(env.DISCORD_TOKEN);
  }

  private loadEvents(dir: string): void {
    findFiles(path.resolve(__dirname, dir), (file: string) => file.endsWith(".ts")).forEach(async (file: string) => {
      if (file.split(path.sep).includes("dev") && env.NODE_ENV !== "development") return;
      const { event } = await import(file);

      this.on(event.name, event.callback.bind(null, this));
    });
  }

  private loadCommands(dir: string): void {
    findFiles(path.resolve(__dirname, dir), (file: string) => file.endsWith(".ts")).forEach(async (file: string) => {
      if (file.split(path.sep).includes("dev") && env.NODE_ENV !== "development") return;
      const { command } = await import(file);

      this.application?.commands.create(command);
      this.commands.set(command.name, command);
    });
  }
}

export default Client;
