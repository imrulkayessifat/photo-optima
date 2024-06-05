import { cookies } from "next/headers";
import PlanContext from "@/components/plan/plan-content"

const Page = async () => {
    const cookieStore = cookies();

    const shop = cookieStore.get("shop")!.value

    console.log("plans",shop)

    const res = await fetch('http://localhost:3001/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeName: `${shop}`
        })
    })

    const store = await res.json();

    return (
        <PlanContext localPlan={store.data.plan} shop={store.data.name} />
    )
}

export default Page