
"use client"
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderClient,
} from "@apollo/client";

const config = {
  // The client ID provided for your application in the Partner Dashboard.
  apiKey: `${process.env.SHOPIFY_CLIENT_ID}`,
  // The host of the specific shop that's embedding your app. This value is provided by Shopify as a URL query parameter that's appended to your application URL when your app is loaded inside the Shopify admin.
  host: new URLSearchParams(location.search).get("host"),
  forceRedirect: true
};

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