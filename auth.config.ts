import type { NextAuthConfig } from 'next-auth'
import {
    MAIN_REDIRECT,
    protectedRoutes,
    DEFAULT_LOGIN_REDIRECT
} from "@/routes";

export const authConfig = {
    trustHost: true,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return false
            } else if (isLoggedIn) {
                return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
            }
            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true
            //     return false
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl))
            // }
            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;