"use client"

import { useEffect, useState } from "react";
import PlanContext from "@/components/plan/plan-content"
import { graphql } from "@/lib/gql/gql";
import { useLazyQuery } from "@apollo/client";
const GET_SHOP: any = graphql(`
    #graphql
    query getShop {
      shop {
        name
      }
    }
  `);
interface ShopData {
    shop: {
        name: string;
    };
}

const Page = () => {
    const [graphqlData, setGraphqlData] = useState<ShopData | null>(null);
    const [getShop] = useLazyQuery(GET_SHOP, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await getShop();
                if (data) {
                    setGraphqlData(data);
                }
                if (error) {
                    console.error(error);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []); // Call useEffect unconditionally

    console.log(graphqlData);

    return (
        <PlanContext shop={graphqlData?.shop.name || ""} />
    );
}

export default Page;
