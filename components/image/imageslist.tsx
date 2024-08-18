"use client";

import { Heading } from '@/components/ui/heading'
import { Separator } from "@/components/ui/separator";
import ImageTable from '@/components/image/image-table';

interface ProductListDataProps {
    shopifyAccessToken: string;
    storeName: string
    plan: string;
    images: any;
    bandwidth: number;
    dataUsed: number;
}

const ImagestList: React.FC<ProductListDataProps> = ({
    shopifyAccessToken,
    storeName,
    plan,
    bandwidth,
    dataUsed,
    images
}) => {

    return (
        <div className='flex flex-col gap-3 mx-auto px-8 my-10'>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Images List (${images.length})`}
                    description={`Manage products images for your store`}
                />
            </div>
            <Separator />
            <ImageTable shopifyAccessToken={shopifyAccessToken} storeName={storeName} plan={plan} data={images} bandwidth={bandwidth} dataUsed={dataUsed} />
        </div>
    )
}

export default ImagestList

