import { Rcon } from "rcon-client";
import env from "../env";
export * from "rcon-client";

const rcon = new Rcon({
  host: env.RCON_HOST,
  port: env.RCON_PORT,
  password: env.RCON_PASSWORD,
});

export default rcon;
