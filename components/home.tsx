"use client";

import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";
import AutoCompression from "@/components/auto-compression";
import AutoFileRename from "@/components/auto-file-rename";
import AutoAltRename from "@/components/auto-alt-rename";
import { setCookie } from 'cookies-next';
import { useStoreData } from "@/hooks/use-store-data";

const Home = ({ shop }: { shop: string }) => {
    console.log("shop with session : ", shop)
    setCookie('shop', shop)
    const { data: store, isLoading } = useStoreData({ shop })

    if (isLoading) {
        return (
            <div className="text-sm mx-auto px-8 my-10">
                Loading....
            </div>
        )
    }

    return (
        <div>
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
                    allowBatchCompress={store.batchCompress}
                    allowBatchRestore={store.batchRestore}
                    autoCompression={store.autoCompression}
                    autoFileRename={store.autoFileRename}
                    autoAltRename={store.autoAltRename}
                    plan={store.plan}
                />
            </div>
        </div>
    )
}

export default Home