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
  auth?: Auth;
}

export function AuthForm({ auth }: AuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const params = new URLSearchParams({
      minecraftUsername: data.username,
    });
    if (auth) params.append("code", auth.code);

    await signIn("42-school", {
      callbackUrl: `/auth/callback?${params.toString()}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              {auth ? "Log in to the Discord server and the Minecraft server." : "Log in to the minecraft server."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {auth && (
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <Avatar>
                  {auth.avatar && (
                    <AvatarImage src={`https://cdn.discordapp.com/avatars/${auth.discordId}/${auth.avatar}.png`} />
                  )}
                  <AvatarFallback>{auth.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Discord</span>
                  <span>{auth.username}</span>
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>Minecraft username</Label>
                  <Input id="username" {...field} />
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
