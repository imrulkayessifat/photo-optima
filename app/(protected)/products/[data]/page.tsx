import Link from 'next/link'
import { IoMdArrowBack } from "react-icons/io";
import { Button } from '@/components/ui/button';

import ProductDetails from '@/components/product/product-details'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import ImageUpload from '@/components/image/image-upload';

const page = async ({
    params
}: {
    params: { data: string }
}) => {
    // const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products/${params.data}/images.json`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
    //     },
    // })

    // const data = await response.json();
    const response = await fetch(`http://localhost:8080/images/product/${params.data}`);
    const data = await response.json();
    
    const res = await fetch(`http://localhost:8080/products/${params.data}`)
    const title = await res.json()
    
    return (
        <div className="mt-24">
            <div className="flex flex-col mx-auto px-8">
                <div className='flex items-center justify-between mb-4'>
                    <Heading
                        title={`Image List (${data.data.length})`}
                        description="Show Compress Image Information for Asd of Admin Panel"
                    />
                    <Link href={"/products"}>
                        <Button variant={"outline"}>
                            <IoMdArrowBack className='w-7 h-7'/>
                        </Button>
                    </Link>
                </div>
                <Separator />
                <ProductDetails data={data.data} title={title.data.title}/>
            </div>
        </div>
    )
}

export default page