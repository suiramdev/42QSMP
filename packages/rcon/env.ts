import { parseEnv } from "znv";
import { z } from "zod";

const env = parseEnv(process.env, {
  RCON_HOST: z.string().default("localhost"),
  RCON_PORT: z.number().default(25575),
  RCON_PASSWORD: z.string(),
});

export default env;
