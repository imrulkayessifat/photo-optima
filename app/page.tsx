import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";
import AutoCompression from "@/components/auto-compression";
import { cookies } from "next/headers";


export default async function Home() {


  const cookieStore = cookies();


  const shop = cookieStore.get("shop")!.value

  const res = await fetch('http://localhost:3001/store', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      storeName: `${shop}`
    })
  })

  const store = await res.json();

  return (
    <main>
      <Navbar />
      <div className="mt-24">
        <AutoCompression auto_compression={store.data.autoCompression} store_name={store.data.name} />
        <ManualUpload />
        <ImageBox plan={store.data.plan}/>
      </div>
    </main>
  );
}
