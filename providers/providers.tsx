"use client";
import { Suspense } from "react";
import SessionProvider from "@/providers/session-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Suspense>
                {children}
            </Suspense>
        </SessionProvider>
    );
}
