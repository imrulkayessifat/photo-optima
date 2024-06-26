"use client"

import PlanContext from "@/components/plan/plan-content"
import { useSuspenseQuery, gql } from '@apollo/client';
import Loader from "@/components/loader";

const GET_SHOP_INFO = gql`
  query {
    shop {
      name
    }
  }
`;


const Page = () => {
    const { error, data } = useSuspenseQuery(GET_SHOP_INFO);

    if(error){
        return <p>{error.message}</p>
    }

    console.log(data)

    return (
      <p></p>
        // <PlanContext shop={ || ""} />
    );
}

export default Page;
