import GoogleProvider from "next-auth/providers/google";
import {PrismaClient} from "@prisma/client"
import { User, Account, Session, DefaultSession } from "next-auth";
const prisma = new PrismaClient()

declare module "next-auth" {
  interface Session {
      user: {
          id: string;
      provider?: string;
      } & DefaultSession["user"];
      provider?: string;
  }
}

export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account }: { user: User; account: Account | null; }) {
        if (account?.provider === "google") {
            if (!user.email) {
                console.error("Google account is missing an email!");
                return false;
            }

            const existingUser = await prisma.user.findFirst({
                where: { email: user.email },
            });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name ?? "New User",
                        number: user.email,
                        password: "default",
                    },
                });
            }
        }
        return true;
    },
    async session({ session }: { session: Session; token: any }) {
      if (!session.user || !session.user.email) return session;

      const dbUser = await prisma.user.findFirst({
          where: {
              OR: [
                  { email: session.user.email },
                  { number: session.user.email },
              ],
          },
      });

      if (dbUser) {
          session.user.id = dbUser.id.toString() ;
          session.user.name = dbUser.name ;
          session.user.provider = dbUser.password ? "credentials" : "google";
      }
     

      return session;
      },

      async redirect({ baseUrl }: { baseUrl: string }) {
        return `${baseUrl}/dashboard`;
      },
      secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
  },


}