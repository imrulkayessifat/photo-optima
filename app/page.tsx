import Store from "@/components/store";
import ProductList from "@/components/product/productlist";

import { client } from "@/lib/shopify";

export default async function Home() {

  const response = await client.get(`products.json`);
  const data = await response.json()

  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
    }
  })
  const product = await res.json()
  
  return (
    <main>
      {/* <Store products={data.products} /> */}
      <ProductList products={data.products} />
    </main>
  );
}
