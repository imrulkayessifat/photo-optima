import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaFileExport } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import { compressImage } from "@/actions/compress"
import { uploadImageToShopify, replaceExistingImage } from "@/actions/upload";
import { fetchProduct } from "@/actions/product";

import useCompressStatusStore from "@/hooks/compress-status";


interface ProductActionCellProps {
    data: any
}
const ProductActionCell: React.FC<ProductActionCellProps> = ({
    data
}) => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const startCompression = useCompressStatusStore((state) => state.startCompression);
    const finishCompression = useCompressStatusStore((state) => state.finishCompression);

    const process = async (imageSrc: string, productId: number, imageId: number) => {
        const compressedImage = await compressImage(imageSrc);

        const data = await uploadImageToShopify(compressedImage, productId);
        const res = await replaceExistingImage(data, imageId);


        if (!res.image) {
            return { error: "Image compressed and uploaded failed!" }
        }


        return { success: "Successfully image compressed and uploaded!" }
    }

    const handleCompressAndUpload = async (imageSrc: string, productId: number, imageId: number) => {
        startTransition(() => {
            const promise = process(imageSrc, productId, imageId)
            startCompression(productId, 'ongoing');

            toast.promise(promise, {
                loading: 'Compressing and Uploading...',
                success: (data) => {
                    if (data.error) {
                        return `Compressing and Uploading failed: ${data.error}`
                    } else {
                        finishCompression(productId, 'compressed');
                        return `Compressing and Uploading successful: ${data.success}`
                    }
                },
                error: 'An unexpected error occurred',
            })
        });
    };

    return (
        <div className="flex gap-2">
            <Button className={`${data.images.length === 2 ? 'hidden' : ''}`} onClick={() => handleCompressAndUpload(data.images[0].src, data.id, data.images[0].id)} variant={"outline"}>
                <FaFileExport className="w-5 h-5" />
            </Button>
            <Button onClick={() => router.push(`/product/${data.id}`)} variant={"outline"}>
                <FaRegEye className="w-5 h-5" />
            </Button>
        </div>
    )
}

export default ProductActionCell;