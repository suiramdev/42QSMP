import { getServerSession } from "next-auth";
import { authOptions } from "../..//api/auth/[...nextauth]/route";
import prisma from "@database/lib/client";
import { redirect } from "next/navigation";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const { code, minecraftUsername } = searchParams;
  if (!code) throw new Error("Missing auth code");
  if (!minecraftUsername) throw new Error("Missing minecraft username");

  const auth = await prisma.auth.findUnique({
    where: {
      code: code as string,
    },
    include: {
      setup: true,
    },
  });
  if (!auth) throw new Error("Invalid auth code");

  const session = await getServerSession(authOptions);
  if (!session) redirect(`/auth?code=${code}`);

  await fetch(`https://discord.com/api/v10/guilds/${auth.setup.guildId}/members/${auth.discordId}/roles/${auth.setup.roleId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  });

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

  await prisma.auth.delete({
    where: {
      code: code as string,
    },
  });

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
