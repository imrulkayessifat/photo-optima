import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/lib/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
            headers: { 'Content-Type': 'application/json' }
          })
          const data = await res.json()
          
          if (data.user && data.accessToken) {
            return { email: data.user.email, accessToken: data.accessToken }
          } else {
            return null
          }
        }

        return null;
      }
    })
  ],
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig