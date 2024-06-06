"use client";

import { useEffect } from "react";

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
      Getting session tokens...
    </div>
  );
}
