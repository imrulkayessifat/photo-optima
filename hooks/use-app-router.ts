import { useAppBridge } from "@shopify/app-bridge-react";

export function useAppRouter() {
    const shop = shopify.config.shop;
    return { shop }
}