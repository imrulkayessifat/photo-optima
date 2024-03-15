import Store from "@/components/store";

import { client } from "@/lib/shopify";

export default async function Home() {

  const response = await client.get(`products.json`);
  const data = await response.json()
  
  const product = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products/9148369273106/images.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
    }
  })

  return (
    <main>
      <Store products={data.products} />
    </main>
  );
}
