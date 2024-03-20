import React from 'react'
import ProductDetails from '@/components/product/product-details'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'

const page = async ({
    params
}: {
    params: { data: string }
}) => {
    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products/${params.data}/images.json`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
        },
    })

    const data = await response.json();
    
    return (
        <div className="mt-24">
            <div className="flex flex-col mx-auto px-8">
                <div className='flex items-center justify-between mb-4'>
                    <Heading
                        title={`Image List (${data.images.length})`}
                        description="Show Compress Image Information for Asd of Admin Panel"
                    />
                </div>
                <Separator />
                <ProductDetails data={data.images}/>
            </div>
        </div>
    )
}

export default page