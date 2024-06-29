"use client";

import ApolloProvider from "@/providers/apollo-provider";
import SessionProvider from "@/providers/session-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ApolloProvider>
    );
}
