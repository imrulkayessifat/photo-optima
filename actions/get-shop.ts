"use server"

import { cookies } from "next/headers";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
    minTime: 200,
});

export const limitedFetch: (url: string, options?: RequestInit) => Promise<Response> = limiter.wrap(
    (url: string, options?: RequestInit): Promise<Response> => {
        return fetch(url, options);
    }
);

export const rateLimiter = async (url: string, options?: RequestInit, maxRetries = 5): Promise<Response> => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await limitedFetch(url, options);
        
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const callLimitHeader = response.headers.get('X-Shopify-Shop-Api-Call-Limit') || '0/40';
        const [currentCalls, maxCalls] = callLimitHeader.split('/').map(Number);
        
        console.log(`API Call Limit: ${currentCalls}/${maxCalls}`);
        
        return response;
      } catch (error: any) {
        if (error.response?.status === 429) {
          const retryAfter = parseInt(error.response.headers.get('Retry-After') || '5', 10);
          console.log(`Rate limited. Retrying after ${retryAfter} seconds. Attempt ${attempt + 1} of ${maxRetries}`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        } else if (attempt === maxRetries - 1) {
          // If it's the last attempt, throw the error
          throw error;
        } else {
          console.log(`Error occurred: ${error.message}. Retrying... Attempt ${attempt + 1} of ${maxRetries}`);
          // Add a small delay before retrying to avoid hammering the server
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    throw new Error(`Failed after ${maxRetries} attempts`);
  };

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