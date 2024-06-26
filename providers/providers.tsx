"use client";

import ApolloProvider from "./apollo-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ApolloProvider>
        {children}
      </ApolloProvider>
  );
}
