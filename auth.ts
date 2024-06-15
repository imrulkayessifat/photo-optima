import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials'

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': `${credentials.email}`,
                    'password': `${credentials.password}`,
                })
            })

            const resData = await response.json()
            if (resData.error) return null
            return resData.user
        }
    })]
})