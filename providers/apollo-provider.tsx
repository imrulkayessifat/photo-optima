"use client"

import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderClient,
} from "@apollo/client";


export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const http = new HttpLink({
    uri: `/api/graphql`,
    fetch: fetch,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: http,
  });

  return (
    <ApolloProviderClient client={client}>{children}</ApolloProviderClient>
  );
}