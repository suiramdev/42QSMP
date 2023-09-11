import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import prisma, { Auth, AuthSetup } from "@database/lib/client";
import env from "../../../env";
import rcon from "@rcon/lib/client";
import { Card, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("The authentication failed or the session has expired");

  const { code, minecraftUsername } = searchParams;
  if (!minecraftUsername) throw new Error("The minecraftUsername parameter is missing");

  let auth: (Auth & { setup: AuthSetup }) | null = null;
  if (code) {
    // Add the discord role to the user
    auth = await prisma.auth.findUnique({
      where: {
        code: code as string,
      },
      include: {
        setup: true,
      },
    });
    if (!auth) throw new Error("The authentication code is invalid or has expired");

    await fetch(
      `https://discord.com/api/v10/guilds/${auth.setup.guildId}/members/${auth.discordId}/roles/${auth.setup.roleId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${env.DISCORD_TOKEN}`,
        },
      },
    );

    await prisma.auth.delete({
      where: {
        code: code as string,
      },
    });
  }

  // Add the minecraft username to the whitelist
  await prisma.whitelist.upsert({
    where: {
      fortyTwoId: session.user.id,
    },
    update: {
      minecraftUsername: minecraftUsername as string,
    },
    create: {
      fortyTwoId: session.user.id,
      minecraftUsername: minecraftUsername as string,
    },
  });

  await rcon.connect();
  await rcon.send(`whitelist add ${minecraftUsername}`);
  await rcon.end();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Success</CardTitle>
          <CardDescription>You have successfully linked your account.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
