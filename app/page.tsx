import { performChecks } from "@/lib/shopify/shopify-oauth";
import Home from "@/components/home";
import { cookies } from "next/headers";
import { ExitClient } from "@/components/exit-client";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { shop, host, hmac, embedded } = searchParams;

  
  if (!shop || !host) {
    return <h1>Missing Shop and Host Parameters</h1>;
  }

  // verify hmac if we are doing an install
  const redirectUri = await performChecks(
    shop as string,
    host as string,
    embedded as string,
  );

  if (redirectUri) {
    console.log("Redirecting to: ", redirectUri);
    return <ExitClient redirectUri={redirectUri} />;
  }

  const sessionCookie = cookies().get("shopifySession");
  console.log(sessionCookie);

  return <Home shop={shop as string} />;
}