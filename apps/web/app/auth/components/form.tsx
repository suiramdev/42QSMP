"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Form, FormField, FormItem, FormMessage } from "@ui/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Label } from "@ui/components/ui/label";
import { Input } from "@ui/components/ui/input";
import { Button } from "@ui/components/ui/button";
import { FortyTwoIcon } from "@ui/components/icons/forty-two";
import { Auth } from "@database/lib/client";

const formSchema = z.object({
  username: z.string().nonempty("Required"),
});

interface AuthFormProps {
  auth: Auth;
  discordUser: {
    username: string;
    avatar: string;
  };
}

export function AuthForm({ auth, discordUser }: AuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await signIn("42-school", {
      callbackUrl: `/auth/callback?code=${auth.code}&minecraftUsername=${data.username}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>Log in to the Discord server and the Minecraft server.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <Avatar>
                <AvatarImage src={`https://cdn.discordapp.com/avatars/${auth.discordId}/${discordUser.avatar}.png`} />
                <AvatarFallback>{discordUser.username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Discord</span>
                <span>{discordUser.username}</span>
              </div>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>Minecraft username</Label>
                  <Input id="username" placeholder={discordUser.username} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login with
              <FortyTwoIcon className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
