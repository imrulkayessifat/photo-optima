"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppRouter } from "@/hooks/use-app-router";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

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
    others: number;
}

export const backend = io(`${process.env.NEXT_PUBLIC_BACKENDSERVER}`);
export const mq = io(`${process.env.NEXT_PUBLIC_MQSERVER}`);

const Home = ({ store, shopifyAccessToken }: { store: any, shopifyAccessToken: string }) => {
    const queryClient = useQueryClient();
    const { shop: appBridgeShop } = useAppRouter()

    console.log("app bridge shop", appBridgeShop);

    useEffect(() => {

        const handleBackendConnect = () => {
            console.log('connecting to backend server')
        }

        const handleMqConnect = () => {
            console.log('connecting to mq server');
        }

        const handleImageModelEvent = () => {
            console.log('image_model event received')
            queryClient.invalidateQueries({ queryKey: ["images"] })
        }

        backend.on('connect', handleBackendConnect)
        backend.on('image_model', handleImageModelEvent)

        mq.on('connect', handleMqConnect)
        mq.on('image_model', handleImageModelEvent)

        return () => {
            backend.off('connect', handleBackendConnect)
            backend.off('image_model', handleImageModelEvent)

            mq.off('connect', handleMqConnect)
            mq.off('image_model', handleImageModelEvent)
        }
    }, [queryClient])

    return (
        <main>
            <Navbar />
            <div className="mt-24">
                <div className="flex flex-wrap md:flex-nowrap mx-auto px-8 my-10 gap-2 w-full">
                    <AutoCompression shopifyAccessToken={shopifyAccessToken} plan={store.plan} auto_compression={store.autoCompression} store_name={store.name} />
                    <AutoFileRename shopifyAccessToken={shopifyAccessToken} plan={store.plan} auto_file_rename={store.autoFileRename} store_name={store.name} />
                    <AutoAltRename shopifyAccessToken={shopifyAccessToken} plan={store.plan} auto_alt_rename={store.autoAltRename} store_name={store.name} />
                </div>
                <ManualUpload
                    shopifyAccessToken={shopifyAccessToken}
                    plan={store.plan}
                    auto_compression={store.autoCompression}
                    autoFileRename={store.autoFileRename}
                    autoAltRename={store.autoAltRename}
                    storeName={store.name}
                />
                <ImageBox
                    shopifyAccessToken={shopifyAccessToken}
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