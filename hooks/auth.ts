import { checkSession } from "@/actions/shopify-session";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setCookie } from 'cookies-next';

interface VerifyResponse {
  status: "success" | "error";
  type: "token" | "scope";
  sessionType: "offline" | "online";
  message: string;
  accountOwner?: boolean;
}

export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = useCallback(() => {
    if (!!router) {
      const embedded = searchParams?.get("embedded");
      const authUrl = `${process.env.NEXT_PUBLIC_HOST}/api/auth?${searchParams?.toString()}`;
      if (embedded === "1") {
        window.open(authUrl, "_top");
      } else {
        window.location.href = authUrl;
      }
    } else {

    }
  }, [searchParams, router]);

  return redirect;
}

export function useVerifySession() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accountOwner, setAccountOwner] = useState(false);
  const [sessionType, setSessionType] = useState<"offline" | "online">(
    "offline",
  );
  const [authErrorType, setAuthErrorType] = useState<"token" | "scope">(
    "token",
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const app = useAppBridge();

  const queryParams = useMemo(() => {
    if (router) {
      const shop = searchParams?.get("shop");
      const host = searchParams?.get("host");
      if (shop && host) {
        const queryParams = new URLSearchParams({
          shop: shop as string,
          host: host as string,
        });
        return queryParams;
      }
    }
    return null;
  }, [router, searchParams]);

  useEffect(() => {
    if (queryParams && app) {
      fetch(`/api/auth/verify?${queryParams.toString()}`)
        .then(async (response) => {
          setLoading(true);
          const body = (await response.json()) as VerifyResponse;
          if (body.status == "success") {
            setVerified(true);
          } else {
            setVerified(false);
            setAuthErrorType(body.type);
            setSessionType(body.sessionType);
            if (body.accountOwner) {
              setAccountOwner(true);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setVerified(false);
        });
    }
  }, [app, queryParams]);

  return {
    verified,
    loading,
    accountOwner,
    sessionType,
    authErrorType,
  };
}

export function useSessionCheck() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<string>()
  const searchParams = useSearchParams();


  // todo: add the ability to check if the user is the owner and supply the authErrorType

  useEffect(() => {
    if (searchParams && searchParams.get("shop") !== null) {
      setLoading(true);
      checkSession(searchParams.get("shop")!).then(() => {
        setVerified(true);
        setLoading(false);
        setShop(searchParams.get("shop")!)
      });
    }
  }, [searchParams]);

  return {
    verified,
    shop,
    loading,
  };
}