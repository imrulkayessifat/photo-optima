import PlanContext from "@/components/plan/plan-content"
import { graphql } from "@/lib/gql/gql";
import { useLazyQuery } from "@apollo/client";
const GET_SHOP:any = graphql(`
    #graphql
    query getShop {
      shop {
        name
      }
    }
  `);

const Page = async () => {
    try {

        const [getShop] = useLazyQuery(GET_SHOP, {
            fetchPolicy: "network-only",
        });

        const { data, error } = await getShop();

        console.log("plan",data)

        return (
            // <PlanContext shop={shop.domain} />
            <div></div>
        )
    } catch (error: any) { // Explicitly typing error as 'any' to prevent type issues
        console.error(error)
        return (
            <p>There was an error fetching data: {error.message}</p>
        )
    }
}

export default Page;
