import BatchSetting from "@/components/batch-setting"
import { getShop } from "@/actions/get-shop";
import { cookies } from "next/headers";
import PushMain from "@/components/push-main";

const Page = async () => {
    const response = await getShop();
    return (
        <BatchSetting shop={response.success || ""} access_token={response.access_token} />
    )


}

export default Page