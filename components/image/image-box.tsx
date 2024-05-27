"use client";

import { useGetImages } from "@/hooks/use-get-images";

import ImagestList from "@/components/image/imageslist";

interface ImageBoxProps {
    plan: string;
    autoCompression:boolean
}

const ImageBox: React.FC<ImageBoxProps> = ({
    plan,
    autoCompression
}) => {
    const { data: images,isLoading } = useGetImages({autoCompression});
    // console.log(images)
    // const res = await fetch('http://localhost:3001/image', { cache: 'no-store' });
    // const data = await res.json();

    if(isLoading) {
        return (
            <div className="mx-auto px-8 my-10">
                Loading....
            </div>
        )
    }
    return (
        <ImagestList plan={plan} images={images} />
    )
}

export default ImageBox