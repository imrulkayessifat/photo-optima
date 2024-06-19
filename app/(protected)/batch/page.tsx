import BatchSetting from "@/components/batch-setting"
const Page = async () => {
    const accessTokenResponse = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'client_id': `${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}`,
            'client_secret': `${process.env.NEXT_PUBLIC_SHOPIFY_API_SECRET}`,
            'grant_type': 'client_credentials'
        })
    })

    const { access_token } = await accessTokenResponse.json()
    const store_name = await fetch('https://photo-optima.myshopify.com/admin/api/2024-04/shop.json', {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': `${access_token}`
        }
    })

    const { shop } = await store_name.json()

    if (!shop.domain) {
        return (
            <p>domain name is not available</p>
        )
    }

    return (
        <BatchSetting shop={shop.domain} />
    )
}

export default Page