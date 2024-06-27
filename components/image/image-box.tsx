"use client";

import { useGetImages } from "@/hooks/use-get-images";

import ImagestList from "@/components/image/imageslist";

interface ImageBoxProps {
    shopifyAccessToken:string;
    storeName:string;
    plan: string;
    autoCompression:boolean;
    allowBatchCompress:boolean;
    allowBatchRestore:boolean;
    autoFileRename:boolean;
    autoAltRename:boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
    shopifyAccessToken,
    storeName,
    plan,
    autoCompression,
    allowBatchCompress,
    allowBatchRestore,
    autoFileRename,
    autoAltRename
}) => {
    const { data: images,isLoading } = useGetImages({storeName,shopifyAccessToken});

    if(isLoading) {
        return (
            <div className="text-sm mx-auto px-8 my-10">
                Loading....
            </div>
        )
    }
    return (
        <ImagestList storeName={storeName} plan={plan} images={images} />
    )
}

export default ImageBox