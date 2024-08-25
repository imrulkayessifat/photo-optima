"use client"

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/compress-status";
import { useComressImage } from "@/hooks/use-compress-image";
import { useRestoringImage } from "@/hooks/use-restoring-image";


interface ImageCellProps {
    shopifyAccessToken: string;
    storeName: string;
    data: any;
    bandwidth: number;
    dataUsed: number;
}
const ImageActionCell: React.FC<ImageCellProps> = ({
    shopifyAccessToken,
    storeName,
    data,
    bandwidth,
    dataUsed,
}) => {

    const router = useRouter();
    const mutation = useComressImage()
    const restoreMutation = useRestoringImage()
    const setImageStatus = useStore(state => state.setImageStatus);
    const status = useStore(state => state.imageStatus[data.id]);

    console.log("disable", bandwidth, dataUsed, data)

    const [isPending, startTransition] = useTransition();

    const pollImageStatus = (id: string) => {
        const checkStatus = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/image/image-status/${id}`);
                const data = await response.json();

                if (data.error) {
                    clearInterval(intervalId);
                }
                setImageStatus(id, data.status);
                if (data.status === 'COMPRESSED') {
                    setImageStatus(id, 'COMPRESSED');
                    clearInterval(intervalId);
                }
            } catch (error) {
                setImageStatus(id, 'NOT_COMPRESSED');
                console.error('Error fetching image status:', error);
                clearInterval(intervalId);
            }
        };

        const intervalId = setInterval(checkStatus, 1000); // Poll every 1 second
    };


    const handleCompress = async (uid: string, productid: string, url: string, size: number, extension: string) => {

        // mutation.mutate({id,productid,url,storeName})

        setImageStatus(uid, 'ONGOING');

        console.log('extension', extension)

        const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/image/compress-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${shopifyAccessToken}`,
                'Shop': `${storeName}`
            },
            body: JSON.stringify({ uid, productid, url, storeName, size, extension })
        });
        const data = await response.json()
        if (response.ok && data) {
            // pollImageStatus(id);
            const data = await mutation.mutateAsync(uid)

        }
        router.refresh()
    }

    const handleRestore = async (uid: string, productid: string) => {
        setImageStatus(uid, 'RESTORING');
        const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/image/restore-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${shopifyAccessToken}`,
                'Shop': `${storeName}`
            },
            body: JSON.stringify({ uid, productid, store_name: storeName })
        });

        const data = await response.json();
        if (response.ok && data) {
            const data = await restoreMutation.mutateAsync(uid)
        }
        router.refresh()
    }

    return (
        <div className="flex gap-2">
            <Button
                disabled={bandwidth < dataUsed || data.status === 'ONGOING' || data.status === 'RESTORING'}
                onClick={() => handleCompress(data.uid, data.productId, data.url, data.size, data.extension)}
                className={`${data.status === 'COMPRESSED' || status === 'COMPRESSED' ? 'hidden' : ''} text-xs`}
                variant={"outline"}
            >
                {/* <LiaCompressArrowsAltSolid className="w-7 h-7" /> */}
                compress
            </Button>
            {
                (data.status === 'COMPRESSED' || status === 'COMPRESSED') && (
                    <Button
                        disabled={bandwidth < dataUsed || data.status === 'ONGOING' || data.status === 'RESTORING'}
                        onClick={() => handleRestore(data.uid, data.productId)}
                        variant={"outline"}
                        className="text-xs"
                    >
                        Restore Image
                    </Button>
                )
            }
        </div>
    )
}

export default ImageActionCell;