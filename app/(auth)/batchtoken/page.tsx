"use client";

import { useEffect, Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { setCookie } from 'cookies-next';

const BatchTokenPage = () => {
    const searchParams = useSearchParams()

    const shop = searchParams.get('shop')

    if (shop) {
        setCookie('shop', shop!);
    }

    useEffect(()=>{
        redirect(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/batch`)
    },[])
    return (
        <div></div>
    )
}

const SuspenseBatchTokenPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BatchTokenPage />
  </Suspense>
)

export default SuspenseBatchTokenPage;
