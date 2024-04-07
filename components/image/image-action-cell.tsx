import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";


interface ImageCellProps {
    data: any
}
const ImageActionCell: React.FC<ImageCellProps> = ({
    data
}) => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();


    const handleCompress = async (id: string) => {
        const response = await fetch(`http://localhost:3001/compress-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        })
    }

    return (
        <div className="flex gap-2">
            <Button onClick={() => handleCompress(data.id)} className={`${data.status === 'COMPRESSED' ? 'hidden' : ''}`} variant={"outline"}>
                <LiaCompressArrowsAltSolid className="w-7 h-7" />
            </Button>
        </div>
    )
}

export default ImageActionCell;