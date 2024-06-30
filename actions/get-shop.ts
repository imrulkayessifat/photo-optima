"use server"

export const getShop = async () => {
    // const shopData = await fetch(`${process.env.HOST}/api/shop`)
    // const shopDataRes = await shopData.json()
    // console.log("shopData : ",shopDataRes)
    const shopify_shop = process.env.SHOPIFY_STORE_DOMAIN;
    const client_id = process.env.SHOPIFY_CLIENT_ID;
    const client_secret = process.env.SHOPIFY_CLIENT_SECRET;

    const response = await fetch(`https://${shopify_shop}/admin/oauth/access_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'client_id': `${client_id}`,
            'client_secret': `${client_secret}`,
            'grant_type': 'client_credentials'
        }),
        cache: 'no-store'
    })


    if (!response.ok) {
        const errorDetails = await response.text();
        return { error: `${errorDetails}` };
    }
    const { access_token } = await response.json();

    const store_data = await fetch(`https://${shopify_shop}/admin/api/2024-04/shop.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': access_token
        },
        cache: 'no-store'
    })

    if (!store_data.ok) {
        const errorDetails = await store_data.text();
        return { error: `${errorDetails}` };
    }
    const { shop } = await store_data.json()
    return { success: `${shop.domain}`,access_token }
}