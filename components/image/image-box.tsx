"use client";

import { useGetImages } from "@/hooks/use-get-images";

import ImagestList from "@/components/image/imageslist";

interface ImageBoxProps {
    storeName:string;
    plan: string;
    autoCompression:boolean;
    autoFileRename:boolean;
    autoAltRename:boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
    storeName,
    plan,
    autoCompression,
    autoFileRename,
    autoAltRename
}) => {
    const { data: images,isLoading } = useGetImages({autoCompression,autoFileRename,autoAltRename});

    if(isLoading) {
        return (
            <div className="mx-auto px-8 my-10">
                Loading....
            </div>
        )
    }
    return (
        <ImagestList storeName={storeName} plan={plan} images={images} />
    )
}

export default ImageBox