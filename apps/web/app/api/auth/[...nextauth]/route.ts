import NextAuth, { AuthOptions } from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";
import env from "../../../../env";

export const authOptions: AuthOptions = {
  providers: [
    FortyTwoProvider({
      clientId: env.FORTY_TWO_CLIENT_ID,
      clientSecret: env.FORTY_TWO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.sub; // Add the user id to the session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
