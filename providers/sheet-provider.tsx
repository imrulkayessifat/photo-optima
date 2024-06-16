"use client"

import { useMountedState } from "react-use"

import AddSubscriptionSheet from "@/components/subscription/add-subscription-sheet"

const SheetProvider = () => {
    const isMounted = useMountedState()
    if(!isMounted) return null
    return (
        <>
            <AddSubscriptionSheet />
        </>
    )
}

export default SheetProvider