"use server";

import { z } from "zod";

import { ProductCreatechema } from "@/lib/schemas";

export const create = async (product: z.infer<typeof ProductCreatechema>) => {

    const singleProduct = {
        product:{
            ...product
        }
    }
    
    console.log(singleProduct)
    const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/products.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
        },
        body: JSON.stringify(singleProduct),
    })
    const data = await res.json()

    console.log(data)

    if (data.errors) {
        return { error: `Some Error Happens!` }
    }

    return { success: "Successfully Product Created!" };
}