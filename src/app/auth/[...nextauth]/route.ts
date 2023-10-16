import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";
const nextAuthhandler = NextAuth(authOptions);
export {nextAuthhandler as GET, nextAuthhandler as POST };
