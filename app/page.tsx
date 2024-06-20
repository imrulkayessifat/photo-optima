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

  const accessTokenResponse = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'client_id': `${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}`,
      'client_secret': `${process.env.NEXT_PUBLIC_SHOPIFY_API_SECRET}`,
      'grant_type': 'client_credentials'
    })
  })

  const { access_token } = await accessTokenResponse.json()

  const store_name = await fetch('https://photo-optima.myshopify.com/admin/api/2024-04/shop.json', {
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': `${access_token}`
    }
  })

  const { shop: shop1 } = await store_name.json()

  const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`, {
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

  if (!shop || !host) {
    return <div>
      <Home store={data} />
    </div>;
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
