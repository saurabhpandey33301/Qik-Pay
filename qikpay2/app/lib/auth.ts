// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "@/index";
// import { User, Account, Session, DefaultSession } from "next-auth";
// import { signOut } from "next-auth/react";



// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       provider?: string;
//     } & DefaultSession["user"];
//     provider?: string;
//   }
// }

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin", 
//     error: "/auth/error", 
//   },
//   callbacks: {
//     async signIn({ user, account }: { user: User; account: Account | null }) {
//       if (account?.provider === "google") {
//         if (!user.email) {
//           console.error("Google account is missing an email!");
//           return false;
//         }

//         const existingUser = await prisma.user.findFirst({
//           where: { email: user.email },
//         });

//         if (!existingUser) {
//           await prisma.user.create({
//             data: {
//               email: user.email,
//               name: user.name ?? "New User",
//               number: user.email, 
//               password: "default",
//             },
//           });
//         }
//       }
//       return true;
//     },

//     async session({ session, token }: { session: Session; token: any }) {
//       if (!session.user || !session.user.email) return session;

//       const dbUser = await prisma.user.findFirst({
//         where: {
//           OR: [{ email: session.user.email }, { number: session.user.email }],
//         },
//       });

//       if (dbUser) {
//         session.user.id = dbUser.id.toString();
//         session.user.name = dbUser.name;
//         session.user.provider = dbUser.password ? "credentials" : "google";
//       }

//       return session;
//     },

//     async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
//       return url.startsWith(baseUrl) ? url : `${baseUrl}/home`;
//     },
//   },
  
//   secret: process.env.NEXTAUTH_SECRET, 
// };








import NextAuth, { Session, Account } from "next-auth";
import {prisma} from "@/index"

import GitHubProvider from "next-auth/providers/github"

import GoogleProvider from "next-auth/providers/google";
if(!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET ){
    throw new Error("missing github client_id or client_secert")
}

// Extend the Session type to include the id property
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const {handlers:{GET , POST} , auth ,signIn , signOut} = NextAuth({
    
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID ,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          })
    ],
    pages:{
      signIn : "/api/auth/signin",
      error : "/api/auth/error"
    },
    callbacks: {
        async signIn({ user, account }: { user: { email?: string | null; name?: string | null }; account: Account | null }) {
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
                    password: "default",
                  },
                });
              }
            }
            return true;
          },
      
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET, 
    
    
})