"use client";

import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";
import AutoCompression from "@/components/auto-compression";
// import { cookies } from "next/headers";
import { getCookie } from 'cookies-next';
import { useStoreData } from "@/hooks/use-store-data";


export default function Home() {


  const shop = getCookie('shop')

  const { data: store, isLoading } = useStoreData({ shop })

  // const res = await fetch('http://localhost:3001/store', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     storeName: `${shop}`
  //   })
  // })

  // const store = await res.json();

  if (isLoading) {
    return (
      <div className="mx-auto px-8 my-10">
        Loading....
      </div>
    )
  }

  console.log(store)

  return (
    <main>
      <Navbar />
      <div className="mt-24">
        <AutoCompression auto_compression={store.autoCompression} store_name={store.name} />
        <ManualUpload />
        <ImageBox autoCompression={store.autoCompression} plan={store.plan} />
      </div>
    </main>
  );
}
