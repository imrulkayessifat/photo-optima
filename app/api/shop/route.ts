import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
        })
    })


    if (!response.ok) {
        const errorDetails = await response.text();
        return new NextResponse(`${errorDetails}`, { status: 400 });
    }
    const { access_token } = await response.json();

    const store_data = await fetch(`https://${shopify_shop}/admin/api/2024-04/shop.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': access_token
        }
    })

    if (!store_data.ok) {
        const errorDetails = await store_data.text();
        return new NextResponse(`${errorDetails}`, { status: 400 });
    }
    const { shop } = await store_data.json()

    return NextResponse.json(shop)

}