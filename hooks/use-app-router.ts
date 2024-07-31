"use client";

import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function useAppRouter() {
    const router = useRouter();
    const shopify = useAppBridge();
    const [shop, setShop] = useState("");

    useEffect(() => {
        if (shopify && shopify.config) {
            setShop(shopify.config.shop);
        }
    }, [shopify]);

    return { shop, router };
}

