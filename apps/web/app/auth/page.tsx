import prisma from "@database/lib/client";
import { AuthForm } from "./components/form";

async function fetchDiscordUser(userId: string) {
  const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  });
  if (!res.ok) return null;

  return await res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { code } = searchParams;
  if (!code) throw new Error("Missing auth code");

  const auth = await prisma.auth.findUnique({
    where: {
      code: code as string,
    },
  });
  if (!auth) throw new Error("Invalid auth code");

  const discordUser = await fetchDiscordUser(auth.discordId);
  if (!discordUser) throw new Error("Discord user not found");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <AuthForm auth={auth} discordUser={discordUser} />
    </div>
  );
}
