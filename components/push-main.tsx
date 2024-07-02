"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PushMain = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/')
    }, [router])
    return (
        <div>PushMain</div>
    )
}

export default PushMain