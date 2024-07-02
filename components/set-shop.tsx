"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const SetShop = () => {
    const router = useRouter();

    console.log("router",router)

    useEffect(()=>{
        router.reload()
    },[])
    return (
        <div></div>
    )
}

export default SetShop