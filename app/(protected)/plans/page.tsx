"use client"

import PlanContext from "@/components/plan/plan-content"
import { useQuery, gql } from '@apollo/client';
import Loader from "@/components/loader";

const GET_SHOP_INFO = gql`
  query {
    shop {
      name
    }
  }
`;


const Page = () => {
    const { loading, error, data } = useQuery(GET_SHOP_INFO);

    if (loading) {
        <Loader />
    }

    if(error){
        return <p>{error.message}</p>
    }

    return (
        <PlanContext shop={data.shop.name || ""} />
    );
}

export default Page;
