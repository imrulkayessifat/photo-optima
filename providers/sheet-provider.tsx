"use client"

import { useMountedState } from "react-use"

import AddSubscriptionSheet from "@/components/subscription/add-subscription-sheet"
import EditSubscriptionSheet from "@/components/subscription/edit-subscription-sheet"

const SheetProvider = () => {
    const isMounted = useMountedState()
    if(!isMounted) return null
    return (
        <>
            <AddSubscriptionSheet />
            <EditSubscriptionSheet />
        </>
    )
}

export default SheetProvider