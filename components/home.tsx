"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

import Navbar from "@/components/navbar";
import ImageBox from "@/components/image/image-box";
import ManualUpload from "@/components/manual-upload";
import AutoCompression from "@/components/auto-compression";
import AutoFileRename from "@/components/auto-file-rename";
import AutoAltRename from "@/components/auto-alt-rename";
import { useStoreData } from "@/hooks/use-store-data";
import {
    Card,
    CardContent,
} from "@/components/ui/card"

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

function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export const backend = io(`${process.env.NEXT_PUBLIC_BACKENDSERVER}`);
export const mq = io(`${process.env.NEXT_PUBLIC_MQSERVER}`);

const Home = ({ store, shopifyAccessToken, bandwidth }: { store: any, shopifyAccessToken: string, bandwidth: number }) => {
    const queryClient = useQueryClient();
    const router = useRouter()


    useEffect(() => {

        const handleBackendConnect = () => {
            console.log('connecting to backend server')
        }

        const handleMqConnect = () => {
            console.log('connecting to mq server');
        }

        const handleImageModelEvent = debounce(() => {
            console.log(`image_model event received for eventId`);
            queryClient.invalidateQueries({ queryKey: ["images"] });
            router.refresh();
        }, 2000);

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
                <div className="mx-auto px-8">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm">You have used <span className="font-bold">{store.dataUsed} MB/{bandwidth} MB</span> of your subscription plan.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-wrap md:flex-nowrap mx-auto px-8 my-10 gap-2 w-full">
                    <AutoCompression bandwidth={bandwidth} dataUsed={store.dataUsed} shopifyAccessToken={shopifyAccessToken} plan={store.plan} auto_compression={store.autoCompression} store_name={store.name} />
                    <AutoFileRename bandwidth={bandwidth} dataUsed={store.dataUsed} shopifyAccessToken={shopifyAccessToken} plan={store.plan} auto_file_rename={store.autoFileRename} store_name={store.name} />
                    <AutoAltRename bandwidth={bandwidth} dataUsed={store.dataUsed} shopifyAccessToken={shopifyAccessToken} plan={store.plan} auto_alt_rename={store.autoAltRename} store_name={store.name} />
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
                    bandwidth={bandwidth}
                    dataUsed={store.dataUsed}
                />
            </div>
        </main>
    )
}

export default Home