"use client";

import { useEffect } from "react";

import Loader from "@/components/loader";

export function ExitClient(props: { redirectUri: string }) {
  const { redirectUri } = props;
  useEffect(() => {
    if (redirectUri) {
      const decodedRedirectUri = decodeURIComponent(redirectUri);

      window.open(decodedRedirectUri, "_top");
    }
  }, [redirectUri]);


  return (
    <div>
      <Loader />
    </div>
  );
}
