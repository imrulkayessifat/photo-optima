"use client";

import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";
import AutoCompression from "@/components/auto-compression";
import AutoFileRename from "@/components/auto-file-rename";
import AutoAltRename from "@/components/auto-alt-rename";
import { getCookie } from 'cookies-next';
import { useStoreData } from "@/hooks/use-store-data";


export default function Home() {


  const shop = getCookie('shop')

  if (!shop) {
    return (
      <div className="mx-auto px-8 my-10">
        No shop available....
      </div>
    )
  }

  const { data: store, isLoading } = useStoreData({ shop })

  if (isLoading) {
    return (
      <div className="mx-auto px-8 my-10">
        Loading....
      </div>
    )
  }

  return (
    <main>
      <Navbar />
      <div className="mt-24">
        <AutoCompression plan={store.plan} auto_compression={store.autoCompression} store_name={store.name} />
        <AutoFileRename plan={store.plan} auto_file_rename={store.autoFileRename} store_name={store.name} />
        <AutoAltRename plan={store.plan} auto_alt_rename={store.autoAltRename} store_name={store.name} />
        <ManualUpload plan={store.plan} storeName={store.name} />
        <ImageBox storeName={store.name} autoCompression={store.autoCompression} plan={store.plan} />
      </div>
    </main>
  );
}