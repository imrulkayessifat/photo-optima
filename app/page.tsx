"use client";

import { redirect } from "next/navigation";

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

  if (!!shop === false) {
    redirect("/token")
  }

  if (!shop) {
    return (
      <div className="text-sm mx-auto px-8 my-10">
        No shop available....
      </div>
    )
  }

  const { data: store, isLoading } = useStoreData({ shop })


  if (isLoading) {
    return (
      <div className="text-sm mx-auto px-8 my-10">
        Loading....
      </div>
    )
  }

  console.log(store.batchCompress)

  return (
    <main>
      <Navbar />
      <div className="mt-24">
        <div className="flex flex-wrap md:flex-nowrap mx-auto px-8 my-10 gap-2 w-full">
          <AutoCompression plan={store.plan} auto_compression={store.autoCompression} store_name={store.name} />
          <AutoFileRename plan={store.plan} auto_file_rename={store.autoFileRename} store_name={store.name} />
          <AutoAltRename plan={store.plan} auto_alt_rename={store.autoAltRename} store_name={store.name} />
        </div>
        <ManualUpload
          plan={store.plan}
          auto_compression={store.autoCompression}
          autoFileRename={store.autoFileRename}
          autoAltRename={store.autoAltRename}
          storeName={store.name}
        />
        <ImageBox
          storeName={store.name}
          allowBatchCompress = {store.batchCompress}
          autoCompression={store.autoCompression}
          autoFileRename={store.autoFileRename}
          autoAltRename={store.autoAltRename}
          plan={store.plan}
        />
      </div>
    </main>
  );
}