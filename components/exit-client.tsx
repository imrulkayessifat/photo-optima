"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

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
            <p>
                Getting session tokens...
            </p>
        </div>


    );
}