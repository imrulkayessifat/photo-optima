"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const ReloadWindow = () => {
    const router = useRouter();

    console.log("router", router)

    useEffect(() => {
        router.reload()
    }, [router])
    return (
        <div></div>
    )
}

export default ReloadWindow;