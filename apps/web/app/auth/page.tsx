import prisma from "@database/lib/client";
import { AuthForm } from "./components/form";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { code } = searchParams;

  const auth = code && await prisma.auth.findUnique({
    where: {
      code: code as string,
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <AuthForm auth={auth} />
    </div>
  );
}
