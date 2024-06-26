import PlanContext from "@/components/plan/plan-content"

const Page = async () => {
    try {
        const accessTokenResponse = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "client_id": "0b77a1fb0b2de6c8915e1d2155b34163",
                "client_secret": "1b6edba642c50854d3bd8f6ed0697c1c",
                "grant_type": "client_credentials"
            })
        })

        if (!accessTokenResponse.ok) {
            throw new Error('Failed to fetch access token')
        }

        const { access_token } = await accessTokenResponse.json()

        console.log("Invalid access token", access_token)

        const storeResponse = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/shop.json`, {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': `${access_token}`
            }
        })

        if (!storeResponse.ok) {
            const errorDetails = await storeResponse.text();
            console.error('Error details:', errorDetails);
            throw new Error('Failed to fetch shop data')
        }

        const { shop } = await storeResponse.json()

        if (!shop || !shop.domain) {
            return (
                <p>Domain name is not available</p>
            )
        }

        return (
            <PlanContext shop={shop.domain} />
        )
    } catch (error: any) { // Explicitly typing error as 'any' to prevent type issues
        console.error(error)
        return (
            <p>There was an error fetching data: {error.message}</p>
        )
    }
}

export default Page
