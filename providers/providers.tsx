"use client";
import { Suspense } from "react";
import SessionProvider from "@/providers/session-provider";

function SessionSuspense({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    );
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionSuspense>
            <SessionProvider>
                {children}
            </SessionProvider>
        </SessionSuspense>
    );
}
