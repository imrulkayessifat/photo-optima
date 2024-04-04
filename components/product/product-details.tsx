import React from 'react'
import Image from 'next/image'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface ProductDetailsProps {
    data: any,
    title:string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    data,
    title
}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-8'>
            {
                data.map((image: any, key: any) => (
                    <Card key={key} className="w-[350px]">
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={image.url}
                                alt="demo"
                                width="300"
                                height="300"
                                // layout="responsive" 
                                // objectFit="contain"
                                className="object-center w-[350px] h-[350px] rounded-md"
                            />
                        </CardContent>
                        {/* <CardFooter className="flex justify-between">
                            <p>Position : {image.position}</p>
                            <p>Size : {image.width}/{image.height}</p>
                            
                        </CardFooter> */}
                    </Card>
                ))
            }
        </div>
    )
}

export default ProductDetails