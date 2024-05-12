import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/compress-status";


interface ImageCellProps {
    data: any
}
const ImageActionCell: React.FC<ImageCellProps> = ({
    data
}) => {

    const router = useRouter();
    const setImageStatus = useStore(state => state.setImageStatus);
    const status = useStore(state => state.imageStatus[data.id]);

    const [isPending, startTransition] = useTransition();

    const pollImageStatus = (id: string) => {
        const checkStatus = async () => {
            try {
                const response = await fetch(`http://localhost:3001/image/image-status/${id}`);
                const data = await response.json();

                console.log(data)
                if (data.error) {
                    clearInterval(intervalId);
                }
                setImageStatus(id, data.status);
                if (data.status === 'COMPRESSED') {
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

        setImageStatus(id, 'ONGOING');
        const storeName = localStorage.getItem('store-name')
        const response = await fetch(`http://localhost:3001/image/compress-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, productid, url, storeName })
        });
        const data = await response.json()

        if (response.ok && data) {
            console.log(id)
            pollImageStatus(id);
        }
        // console.log(data)
        // setTimeout(async () => {
        //     if (response.ok) {
        //         setImageStatus(id, 'COMPRESSED');
        //     } else {
        //         setImageStatus(id, 'NOT_COMPRESSED');
        //     }
        // }, 2000);

    }

    return (
        <div className="flex gap-2">
            <Button
                onClick={() => handleCompress(data.id, data.productId, data.url)}
                className={`${data.status === 'COMPRESSED' || status === 'COMPRESSED' ? 'hidden' : ''}`}
                variant={"outline"}
            >
                {/* <LiaCompressArrowsAltSolid className="w-7 h-7" /> */}
                compress
            </Button>
            {
                (data.status === 'COMPRESSED' || status === 'COMPRESSED') && (
                    <Button
                        variant={"outline"}
                    >
                        Restore
                    </Button>
                )
            }
        </div>
    )
}

export default ImageActionCell;