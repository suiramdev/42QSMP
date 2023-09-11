import { parseEnv } from "znv";
import { z } from "zod";

const env = parseEnv(process.env, {
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DISCORD_TOKEN: z.string(),
  SITE_URL: z.string().default("http://localhost:3000"),
});

export default env;
