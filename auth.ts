import NextAuth, { Session, User } from "next-auth"
import authConfig from "@/auth.config";
import { NextResponse } from 'next/server'

interface CustomUser extends User {
  accessToken?: string;
  id?: any;
  email?: any;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(
  {
    pages: {
      signIn: "/login",
      error: "/error",
    },
    events: {

    },
    callbacks: {
      async signIn({ user, account }) {
        if (!user) return false;

        return true;
      },
      async session({ token, session }: { token: any; session: Session }) {
        session.user = token.user
       
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.user = user
        }
       
        return token;
      }
    },
    session: { strategy: "jwt" },
    ...authConfig,
  });