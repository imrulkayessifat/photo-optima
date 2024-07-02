import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { QueryProvider } from "@/providers/query-provider";
import Providers from "@/providers/providers";
import "./globals.css";
import { headers } from "next/headers";

import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Shopify App",
  other: {
    "shopify-api-key": process.env.NEXT_PUBLIC_SHOPIFY_API_KEY || "",
    "shopify-app-origins": process.env.NEXT_PUBLIC_HOST || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("headers", headers())
  console.log("headers", headers().get('store'))
  return (
    <html lang="en">
      <head>
        <meta name="shopify-api-key" content="0b77a1fb0b2de6c8915e1d2155b34163" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <QueryProvider>
            {children}
          </QueryProvider>
        </Providers>
        <Toaster />
        <Script
          src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>

  );
}
