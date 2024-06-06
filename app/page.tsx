import { performChecks } from "@/lib/shopify/shopify-oauth";
import Home from "@/components/home";
import { ExitClient } from "@/components/exit-client";


export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // we can perform some checks to see if the app has been installed and that it is still valid
  const { shop, host, hmac, embedded } = searchParams;

  const store_name = await fetch('https://photo-optima.myshopify.com/admin/api/2024-04/shop.json', {
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
    }
  })

  const { shop: shop1 } = await store_name.json()
  const res = await fetch('http://localhost:3001/store', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      storeName: `${shop1.domain}`
    }),
    cache: 'no-store'
  })

  const { data } = await res.json();

  console.log(data)

  if (!shop || !host) {
    return <Home store={data} />;
  }

  // verify hmac if we are doing an install
  const redirectUri = await performChecks(
    shop as string,
    host as string,
    embedded as string,
  );

  if (redirectUri) {
    return <ExitClient redirectUri={redirectUri} />;
  }


  return <Home store={data} />;
}
