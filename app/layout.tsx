import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { QueryProvider } from "@/providers/query-provider";
import Providers from "@/providers/providers";
import SheetProvider from "@/providers/sheet-provider";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Shopify App",
  other: {
    "shopify-api-key": process.env.NEXT_PUBLIC_SHOPIFY_API_KEY || "",
    "shopify-app-origins": process.env.NEXT_PUBLIC_HOST || "",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          <meta name="shopify-api-key" content="0b77a1fb0b2de6c8915e1d2155b34163" />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
        </head>
        <body className={inter.className}>
          <QueryProvider>
            <SheetProvider />
            <Providers>
              {children}
            </Providers>
          </QueryProvider>
          <Toaster />
          <Script
            src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
            strategy="beforeInteractive"
          />
        </body>
      </html>
    </SessionProvider>
  );
}
