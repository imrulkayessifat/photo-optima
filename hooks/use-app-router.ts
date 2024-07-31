"use client";

import { useAppBridge } from "@shopify/app-bridge-react";

export function useAppRouter() {
    const shopify = useAppBridge();
    const shop = shopify.config.shop;
    return { shop }
}