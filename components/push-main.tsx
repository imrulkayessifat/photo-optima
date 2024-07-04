"use client";

import React, { useEffect } from 'react'
import { useRouter,usePathname } from 'next/navigation'

const PushMain = () => {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        router.push(pathName)
    }, [router])
    return (
        <div>PushMain</div>
    )
}

export default PushMain