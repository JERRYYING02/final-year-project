
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession,NextAuthOptions,getServerSession} from "next-auth";

// let next auth and jsonweb token module understand the type of data 
declare module "next-auth/jwt" {
    interface JWT { 
        id: string; 
        credits: number;
    }
  }

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
    } & DefaultSession["user"]; 
  }
}

// Define authentication options for NextAuth.js
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //destructuring the token
    jwt: async ({ token }) => {
      //find user in database with the token
     const db_user = await prisma.user.findFirst(
     {  where: {
          email: token.email,
        },
      });
      //if found a user, connect the token information of user
      if (db_user) {
        token.id = db_user.id;
        token.credits = db_user.credits;
      }
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;  //get user id
        session.user.name = token.name; //get user name
        session.user.credits = token.credits; //get user credit number
        session.user.email = token.email; //get user email
        session.user.image = token.picture; //get log in picture
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  //pass in google authentication  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
