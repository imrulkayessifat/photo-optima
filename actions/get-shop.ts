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
        console.log("url : ", url)
        console.log("response status :", response.status)

        if (response.status === 429 || (currentCalls >= maxCalls && retryAfterHeader)) {

            console.log("retryAfter Header :", retryAfterHeader)

            const retryAfter = retryAfterHeader ? parseFloat(retryAfterHeader) : backoffFactor * attempt;
            await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
            return rateLimiter(url, options, attempt + 1);
        }
        return response;

    } catch (error) {
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

    const clientShop = cookieStore.get("shop")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/session/${clientShop}`, {
        method: 'GET',
    });


    if (!response.ok) {
        const errorDetails = await response.text();
        return { error: `${errorDetails}` };
    }
    const { access_token } = await response.json();

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
    return { success: `${shop.myshopify_domain}`, access_token }
}