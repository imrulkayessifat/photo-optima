import PlanContext from "@/components/plan/plan-content"

const Page = async () => {
    const store_name = await fetch('https://photo-optima.myshopify.com/admin/api/2024-04/shop.json', {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
        }
    })

    const { shop } = await store_name.json()




    return (
        <PlanContext shop={shop.domain} />
    )
}

export default Page