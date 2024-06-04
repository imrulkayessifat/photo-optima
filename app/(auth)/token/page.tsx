"use client"

import { useEffect, Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { setCookie } from 'cookies-next';

const TokenPage = () => {
    const searchParams = useSearchParams()

    const shop = searchParams.get('shop')

    if (shop) {
        setCookie('shop', shop!);
    }

    useEffect(()=>{
        redirect(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}`)
    },[])
    return (
        <div></div>
    )
}

const SuspenseTokenPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TokenPage />
  </Suspense>
)

export default SuspenseTokenPage;
