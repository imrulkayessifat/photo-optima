import { performChecks } from "@/lib/shopify/shopify-oauth";
import Home from "@/components/home";
import { ExitClient } from "@/components/exit-client";
import { getShop } from "@/actions/get-shop";



export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // we can perform some checks to see if the app has been installed and that it is still valid
  const { shop, host, hmac, embedded } = searchParams;

  const response = await getShop();

  // const accessTokenResponse = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     "client_id": "0b77a1fb0b2de6c8915e1d2155b34163",
  //     "client_secret": "1b6edba642c50854d3bd8f6ed0697c1c",
  //     "grant_type": "client_credentials"
  //   })
  // })

  // const { access_token } = await accessTokenResponse.json()

  // const store_name = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/shop.json`, {
  //   method: 'GET',
  //   headers: {
  //     'X-Shopify-Access-Token': `${access_token}`
  //   }
  // })

  // const { shop: shop1 } = await store_name.json()

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
