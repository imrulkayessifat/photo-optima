import Store from "@/components/store";
import ProductList from "@/components/product/productlist";

import { client } from "@/lib/shopify";

export default async function Home() {

  const response = await client.get(`products.json`);
  const data = await response.json()

  return (
    <main>
      {/* <Store products={data.products} /> */}
      <ProductList products={data.products} />
    </main>
  );
}
