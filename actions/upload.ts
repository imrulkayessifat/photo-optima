"use server";

export const uploadImageToShopify = async (imageBuffer: Buffer, productId: number) => {
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    const image = {
        product_id: productId,
        attachment: base64Image,
    };

    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products/${productId}/images.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
        },
        body: JSON.stringify({ image })
    })

    const data = await response.json();

    return data;

}

export const replaceExistingImage = async (values: any, imageId: number) => {

    const product_id = values.image.product_id;
    const src = values.image.src
    const image = {
        product_id: product_id,
        src: src,
    };

    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products/${product_id}/images/${imageId}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
        },
        body: JSON.stringify({ image })
    })

    const data = await response.json();
    return data
}
