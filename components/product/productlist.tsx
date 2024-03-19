"use client";

import { Heading } from '@/components/ui/heading'
import { Separator } from "@/components/ui/separator";
import ProductTable from '@/components/product/product-table';

interface ProductListDataProps {
    products: any;
}

const ProductList: React.FC<ProductListDataProps> = ({
    products
}) => {
    
    return (
        <div className='flex flex-col gap-3 mx-auto px-8 my-10'>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Product List (${products.length})`}
                    description="Manage Product for Asd of Admin Panel"
                />
            </div>
            <Separator />
            <ProductTable data={products} />
        </div>
    )
}

export default ProductList

