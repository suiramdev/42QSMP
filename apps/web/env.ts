import { parseEnv } from "znv";
import { z } from "zod";

const env = parseEnv(process.env, {
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  FORTY_TWO_CLIENT_ID: z.string(),
  FORTY_TWO_CLIENT_SECRET: z.string(),
  DISCORD_TOKEN: z.string(),
  NEXTAUTH_SECRET: z.string()
});

export default env;
