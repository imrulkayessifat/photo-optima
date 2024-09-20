"use client";

import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function useAppRouter() {
    const router = useRouter();
    const shopify = useAppBridge();
    const push = (url: string) => {
        const query = new URLSearchParams();
        query.append("shop", shopify.config.shop);
        router.push(`${url}?${query.toString()}`);
    };
    return { push, router };
}

