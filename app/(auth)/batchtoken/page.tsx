"use client"

import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { setCookie } from 'cookies-next';

const page = () => {
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

export default page