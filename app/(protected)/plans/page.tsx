"use client";

import { useState, useEffect } from "react"

import { usePlanStore } from "@/hooks/usePlan";
import PlanContext from "@/components/plan/plan-content"

const Page = () => {
    // const [plan, setPlan] = useState('')
    const { plan, setPlan } = usePlanStore()
    const storeName = localStorage.getItem('store-name')

    console.log(plan)

    useEffect(() => {
        const fetchPlan = async () => {
            const res = await fetch('http://localhost:3001/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeName: `${storeName}`
                })
            })
            const data = await res.json()

            console.log(data)
            setPlan(data.data.plan)

        }
        fetchPlan()
    }, [storeName])
    return (
        <PlanContext localPlan={plan} />
    )
}

export default Page