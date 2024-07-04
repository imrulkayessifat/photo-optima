import { getShop } from "@/actions/get-shop";
import PlanContext from "@/components/plan/plan-content";
import { cookies } from "next/headers";
import PushMain from "@/components/push-main";
const Page = async () => {
    const response = await getShop();
    

    return (
        <PlanContext shop={response.success || ""} access_token={response.access_token} />
    );
}

export default Page;
