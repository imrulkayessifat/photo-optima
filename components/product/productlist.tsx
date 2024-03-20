"use client";

import { useState, useEffect } from 'react';

import { Heading } from '@/components/ui/heading'
import { Separator } from "@/components/ui/separator";
import ProductTable from '@/components/product/product-table';

import { useProductStore } from '@/hooks/useProductData';

interface ProductListDataProps {
    products: any;
}

const ProductList: React.FC<ProductListDataProps> = ({
    products
}) => {
    const { data, setProducts } = useProductStore()
    useEffect(() => {
        setProducts(products)
    }, [products])
    
    return (
        <div className='flex flex-col gap-3 mx-auto px-8 my-10'>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Product List (${data.length})`}
                    description="Manage Product for Asd of Admin Panel"
                />
            </div>
            <Separator />
            <ProductTable data={data} />
        </div>
    )
}

export default ProductList

