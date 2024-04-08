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


    const handleCompress = async (id: string, productid: string, url: string) => {

        setImageStatus(id, 'ONGOING');
        const response = await fetch(`http://localhost:3001/compress-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, productid, url })
        });
        const data = await response.json()

        setTimeout(async () => {
            if (response.ok) {
                setImageStatus(id, 'COMPRESSED');
            } else {
                setImageStatus(id, 'NOT_COMPRESSED');
            }
        }, 2000);
    }

    console.log(data)

    return (
        <div className="flex gap-2">
            <Button
                onClick={() => handleCompress(data.id, data.productId, data.url)}
                className={`${data.status === 'COMPRESSED' || status === 'COMPRESSED' ? 'hidden' : ''}`}
                variant={"outline"}
            >
                <LiaCompressArrowsAltSolid className="w-7 h-7" />
            </Button>
        </div>
    )
}

export default ImageActionCell;