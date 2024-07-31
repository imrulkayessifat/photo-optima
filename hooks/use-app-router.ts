"use client";

import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouter } from "next/navigation";

export function useAppRouter() {
    const router = useRouter();
    const shopify = useAppBridge();
    //   const push = (url: string) => {
    //     const query = new URLSearchParams();
    //     query.append("shop", shopify.config.shop);
    //     query.append("host", shopify.config.host || "");
    //     router.push(`${url}?${query.toString()}`);
    //   };
    //   return { push, router };
    const shop = shopify.config.shop
    return { shop }
}
