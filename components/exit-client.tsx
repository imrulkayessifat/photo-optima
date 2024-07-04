"use client";

import { useEffect } from "react";

export function ExitClient(props: { redirectUri: string }) {
  const { redirectUri } = props;
  useEffect(() => {
    if (redirectUri) {
      console.log("redirect uri : ",redirectUri)
      const decodedRedirectUri = decodeURIComponent(redirectUri);
      console.log("decodedRedirectUri : ",decodedRedirectUri)
      window.open(decodedRedirectUri, "_top");
    }
  }, [redirectUri]);


  return (
    <div>
      Getting session tokens...
    </div>
  );
}
