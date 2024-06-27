import { getShop } from "@/actions/get-shop";
import PlanContext from "@/components/plan/plan-content";
const Page = async () => {
    const response = await getShop();
    

    return (
        <PlanContext shop={response.success || ""} access_token={response.access_token} />
    );
}

export default Page;
