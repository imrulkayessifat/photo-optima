"use client"

import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { setCookie } from 'cookies-next';

const page = () => {
    const searchParams = useSearchParams()

    const shop = searchParams.get('shop')
    console.log(shop)

    if (shop) {
        setCookie('shop', shop!);

        
    }

    useEffect(()=>{

        redirect('https://fiber-university-ship-creation.trycloudflare.com')
    },[])
    return (
        <div></div>
    )
}

export default page