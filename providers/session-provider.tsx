"use client";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import { useAuthRedirect, useSessionCheck } from "@/hooks/auth";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // const app = useAppBridge();
  // const {
  //   verified,
  //   loading
  // } = useVerifySession();
  const { verified, loading,shop } = useSessionCheck();
  const authRedirect = useAuthRedirect();

  useEffect(() => {
    if (!verified && !loading && !shop) {
      console.log("redirecting to auth");
      authRedirect();
    }
  }, [verified, loading,shop, authRedirect]);

  // if (!verified || loading) {
  //   shopify.loading(true);
  // }

  return <>{children}</>;
}