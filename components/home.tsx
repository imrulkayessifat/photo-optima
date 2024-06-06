"use client";

import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";
import AutoCompression from "@/components/auto-compression";
import AutoFileRename from "@/components/auto-file-rename";
import AutoAltRename from "@/components/auto-alt-rename";
import { useStoreData } from "@/hooks/use-store-data";

interface HomePageProps {
    name: string;
    plan: string;
    dataUsed: number;
    chargeId: string;
    autoCompression: boolean
    autoFileRename: boolean
    batchCompress: boolean
    batchRestore: boolean
    autoAltRename: boolean
    compressionType: string
    jpeg: number;
    png: number;
    others:number;
}

const Home = ({ store }: { store: any }) => {

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
                    allowBatchCompress={store.batchCompress}
                    allowBatchRestore={store.batchRestore}
                    autoCompression={store.autoCompression}
                    autoFileRename={store.autoFileRename}
                    autoAltRename={store.autoAltRename}
                    plan={store.plan}
                />
            </div>
        </main>
    )
}

export default Home