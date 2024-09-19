"use server"

import { cookies } from "next/headers";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
    minTime: 200, // 500ms delay between requests
    // maxConcurrent: 1 // Ensures only one request is processed at a time
});

export const limitedFetch: (url: string, options?: RequestInit) => Promise<Response> = limiter.wrap(
    (url: string, options?: RequestInit): Promise<Response> => {
        return fetch(url, options);
    }
);

export const rateLimiter = async (url: string, options?: RequestInit, attempt: number = 1): Promise<Response> => {
    const backoffFactor = 2;
    const maxAttempts = 5;
    try {

        let response = await limitedFetch(url, options);

        const callLimitHeader = response.headers.get('X-Shopify-Shop-Api-Call-Limit') || '0/40';
        const retryAfterHeader = response.headers.get('Retry-After');

        const [currentCalls, maxCalls] = callLimitHeader.split('/').map(Number);
        console.log(`rate limiting : ${currentCalls}/${maxCalls}`);

        if (retryAfterHeader) {
            console.log("retryAfterHeader : ", retryAfterHeader)
            await new Promise((resolve) => setTimeout(resolve, parseFloat(retryAfterHeader) * 1000))

            return rateLimiter(url, options);
        } 
        return response;

    } catch (error) {
        console.error(`Fetch failed for ${attempt} URL: ${url} ${options?.method}`, error);
        if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, backoffFactor * 1000)); // Exponential backoff
            return rateLimiter(url, options, attempt + 1); // Return the recursive call
        } else {
            throw new Error(`Failed after ${attempt} attempts`);
        }
    }
}

export const getShop = async () => {

    const cookieStore = cookies()

    console.log("shop in get shop : ", cookieStore.get("shop"))

    const clientShop = cookieStore.get("shop")?.value;

    const shopify_shop = process.env.SHOPIFY_STORE_DOMAIN;
    const client_id = process.env.SHOPIFY_CLIENT_ID;
    const client_secret = process.env.SHOPIFY_CLIENT_SECRET;

    const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/session/${clientShop}`, {
        method: 'GET',
    });


    if (!response.ok) {
        const errorDetails = await response.text();
        return { error: `${errorDetails}` };
    }
    const { access_token } = await response.json();

    console.log("access token : ", access_token)

    const store_data = await rateLimiter(`https://${clientShop}/admin/api/2024-04/shop.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': access_token
        },
    })

    if (!store_data.ok) {
        const errorDetails = await store_data.text();
        return { error: `${errorDetails}` };
    }
    const { shop } = await store_data.json()
    console.log("shop in server action : ",shop)
    return { success: `${shop.myshopify_domain}`, access_token }
}