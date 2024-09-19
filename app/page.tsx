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

  console.log("search params : ",searchParams)
  if (cookies().get("shop")?.value !== shop) {
    console.log("call 2")
    return (
      <ReloadWindow />
    )
  }
  if (!shop) {
    return <p>no shop provided</p>;
  }

  const startPerformChecks = performance.now();
  const redirectUri = await performChecks(
    shop as string,
    host as string,
    embedded as string,
  );
  const endPerformChecks = performance.now();
  console.log(`performChecks execution time: ${endPerformChecks - startPerformChecks}ms`);

  if (redirectUri) {
    console.log("Redirecting to: ", redirectUri);
    console.log("host", process.env.HOST);
    return <ExitClient redirectUri={redirectUri} />;
  }

  const startGetShop = performance.now();
  const response = await getShop();
  const endGetShop = performance.now();
  console.log(`getShop execution time: ${endGetShop - startGetShop}ms`);

  const startStoreFetch = performance.now();
  console.log(response)
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
  const endStoreFetch = performance.now();
  console.log(`/store fetch execution time: ${endStoreFetch - startStoreFetch}ms`);


  const startSubscriptionPlanFetch = performance.now();
  console.log(data.plan)
  const subscriptionPlanRes = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan/${data.plan}`)

  const { data: subscriptionPlan } = await subscriptionPlanRes.json();
  console.log(data)
  const endSubscriptionPlanFetch = performance.now();
  console.log(`/subscription-plan fetch execution time: ${endSubscriptionPlanFetch - startSubscriptionPlanFetch}ms`);


  return (
    <>
      <Home shopifyAccessToken={response.access_token} store={data}  bandwidth={subscriptionPlan.bandwidth}/>
    </>
  )
}
