import { performChecks } from "@/lib/shopify/shopify-oauth";
import Home from "@/components/home";
import { ExitClient } from "@/components/exit-client";
import { getShop } from "@/actions/get-shop";
import { cookies } from "next/headers";
import ReloadWindow from "@/components/reload-window";
import PushMain from "@/components/push-main";

// export const fetchCache = 'force-no-store';

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { shop, host, hmac, embedded } = searchParams;

  if (cookies().get("shop")?.value !== shop) {
    return (
      <ReloadWindow />
    )
  }
  if (!shop) {
    return <p>no shop provided</p>;
  }

  const redirectUri = await performChecks(
    shop as string,
    host as string,
    embedded as string,
  );

  if (redirectUri) {
    return <ExitClient redirectUri={redirectUri} />;
  }

  const response = await getShop();

  const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      storeName: `${response.success}`,
      access_token: `${response.access_token}`
    }),
  })

  const { data } = await res.json();

  const subscriptionPlanRes = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan/${data.plan}`)

  const { data: subscriptionPlan } = await subscriptionPlanRes.json();

  return (
    <>
      <Home shopifyAccessToken={response.access_token} store={data}  bandwidth={subscriptionPlan.bandwidth}/>
    </>
  )
}
