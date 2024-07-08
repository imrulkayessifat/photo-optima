"use client";

import React, { useEffect } from 'react'
import { useRouter,usePathname } from 'next/navigation'

const PushMain = () => {
    const router = useRouter();
    const pathName = usePathname();
    console.log("path name : ",pathName)

    useEffect(() => {
        router.push(pathName)
    }, [router,pathName])
    return (
        <div>PushMain</div>
    )
}

export default PushMain