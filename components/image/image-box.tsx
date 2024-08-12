"use client";

import { useGetImages } from "@/hooks/use-get-images";

import ImagestList from "@/components/image/imageslist";
import Loader from "@/components/loader";

interface ImageBoxProps {
    shopifyAccessToken: string;
    storeName: string;
    plan: string;
    bandwidth: number;
    dataUsed: number;
    autoCompression: boolean;
    allowBatchCompress: boolean;
    allowBatchRestore: boolean;
    autoFileRename: boolean;
    autoAltRename: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
    shopifyAccessToken,
    storeName,
    plan,
    bandwidth,
    dataUsed
}) => {
    const { data: images, isLoading } = useGetImages({ storeName, shopifyAccessToken });

    if (isLoading) {
        return (
            <div className="text-sm mx-auto px-8 my-10">
                <Loader />
            </div>
        )
    }
    return (
        <ImagestList shopifyAccessToken={shopifyAccessToken} storeName={storeName} plan={plan} images={images} bandwidth={bandwidth} dataUsed={dataUsed} />
    )
}

export default ImageBox