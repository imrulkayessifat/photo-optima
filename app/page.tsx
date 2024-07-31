import { performChecks } from "@/lib/shopify/shopify-oauth";
import Home from "@/components/home";
import { ExitClient } from "@/components/exit-client";
import { getShop } from "@/actions/get-shop";
import { cookies } from "next/headers";
import ReloadWindow from "@/components/reload-window";
import PushMain from "@/components/push-main";

export const fetchCache = 'force-no-store';

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // we can perform some checks to see if the app has been installed and that it is still valid
  const { shop, host, hmac, embedded } = searchParams;
  console.log(shop,cookies().get("shop")?.value)
  if (cookies().get("shop")?.value !== shop) {
    console.log("call 1")
    return (
      <ReloadWindow />
    )
  }

  if (!cookies().get("shop")) {
    console.log("call 2")
    return (
      <ReloadWindow />
    )
  }

  console.log("store : ", cookies().get("shop")?.value)


  const response = await getShop();

  console.log("response : ", response)

  const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      storeName: `${response.success}`,
      access_token: `${response.access_token}`
    }),
    cache: 'no-store'
  })

  const { data } = await res.json();

  console.log("debug null plan", data)

  if (!shop || !host) {
    return <div>
      <Home shopifyAccessToken={response.access_token} store={data} />
    </div>;
  }

  // verify hmac if we are doing an install
  // const redirectUri = await performChecks(
  //   shop as string,
  //   host as string,
  //   embedded as string,
  // );

  // if (redirectUri) {
  //   return <ExitClient redirectUri={redirectUri} />;
  // }


  return (
    <>
      <Home shopifyAccessToken={response.access_token} store={data} />
    </>
  )
}
