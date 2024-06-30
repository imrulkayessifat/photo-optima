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
  // const app = useAppBridge();
  // const token = app.idToken();
  // console.log("Token: ", token);
  const http = new HttpLink({
    uri: `/api/graphql`,
    fetch: fetch,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: http,
  });

  console.log("client",client)

  return (
    <ApolloProviderClient client={client}>{children}</ApolloProviderClient>
  );
}