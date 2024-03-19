"use client";

import { useTransition } from "react";
import Image from "next/image"
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { compressImage } from "@/actions/compress"
import { uploadImageToShopify, replaceExistingImage } from "@/actions/upload";


interface StoreProps {
    products: any
}

const Store: React.FC<StoreProps> = ({
    products
}) => {
    const [isPending, startTransition] = useTransition();

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

            toast.promise(promise, {
                loading: 'Compressing and Uploading...',
                success: (data) => {
                    if (data.error) {
                        return `Compressing and Uploading failed: ${data.error}`
                    } else {

                        return `Compressing and Uploading successful: ${data.success}`
                    }
                },
                error: 'An unexpected error occurred',
            })
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-8">
            {
                products.map((data: any, key: any) => (
                    <Card key={key} className="w-[350px]">
                        <CardHeader>
                            <CardTitle>{data.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={data.images[0].src}
                                alt="demo"
                                width="300"
                                height="300"
                                // layout="responsive" 
                                // objectFit="contain"
                                className="object-center w-[350px] h-[350px] rounded-md"
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                className="w-full"
                                variant="outline"
                                disabled={isPending}
                                onClick={() => handleCompressAndUpload(data.images[0].src, data.id, data.images[0].id)}
                            >
                                Compress
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}

export default Store