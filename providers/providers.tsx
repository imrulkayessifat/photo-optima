"use client";
import { Suspense } from "react";
import SessionProvider from "@/providers/session-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Suspense>
    );
}
