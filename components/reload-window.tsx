"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ReloadWindow = () => {
    const router = useRouter();

    console.log("router", router)

    useEffect(() => {
        router.refresh()
    }, [router])
    return (
        <div></div>
    )
}

export default ReloadWindow;