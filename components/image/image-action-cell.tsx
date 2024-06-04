"use client"

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from 'cookies-next';

import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/compress-status";
import { useComressImage } from "@/hooks/use-compress-image";
import { useRestoringImage } from "@/hooks/use-restoring-image";


interface ImageCellProps {
    storeName:string;
    data: any
}
const ImageActionCell: React.FC<ImageCellProps> = ({

    data
}) => {

    const router = useRouter();
    const mutation = useComressImage()
    const restoreMutation = useRestoringImage()
    const setImageStatus = useStore(state => state.setImageStatus);
    const status = useStore(state => state.imageStatus[data.id]);

    const storeName = getCookie('shop')

    const [isPending, startTransition] = useTransition();

    const pollImageStatus = (id: string) => {
        const checkStatus = async () => {
            try {
                const response = await fetch(`http://localhost:3001/image/image-status/${id}`);
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


    const handleCompress = async (id: string, productid: string, url: string) => {

        // mutation.mutate({id,productid,url,storeName})

        setImageStatus(id, 'ONGOING');

        const response = await fetch(`http://localhost:3001/image/compress-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, productid, url, storeName })
        });
        const data = await response.json()
        console.log(data)
        if (response.ok && data) {
            // pollImageStatus(id);
            const data = await mutation.mutateAsync(id)

        }
    }

    const handleRestore = async (id: string, productid: string) => {
        setImageStatus(id, 'RESTORING');
        const response = await fetch(`http://localhost:3001/image/restore-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, productid ,store_name:storeName})
        });

        const data = await response.json();
        console.log(data)
        if (response.ok && data) {
            const data = await restoreMutation.mutateAsync(id)
        }
    }

    return (
        <div className="flex gap-2">
            <Button
                onClick={() => handleCompress(data.id, data.productId, data.url)}
                className={`${data.status === 'COMPRESSED' || status === 'COMPRESSED' ? 'hidden' : ''} text-xs`}
                variant={"outline"}
            >
                {/* <LiaCompressArrowsAltSolid className="w-7 h-7" /> */}
                compress
            </Button>
            {
                (data.status === 'COMPRESSED' || status === 'COMPRESSED') && (
                    <Button
                        onClick={() => handleRestore(data.id, data.productId)}
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