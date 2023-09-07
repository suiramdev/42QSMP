import prisma, { Auth } from "@database/lib/client";
import { AuthForm } from "./components/form";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { code } = searchParams;

  let auth: Auth | null = null;
  if (code) {
    auth = await prisma.auth.findUnique({
      where: {
        code: code as string,
      },
    });
    if (!auth) throw new Error("The authentication code is invalid or has expired");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <AuthForm auth={auth} />
    </div>
  );
}
