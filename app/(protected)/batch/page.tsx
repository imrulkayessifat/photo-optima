import BatchSetting from "@/components/batch-setting"
import { getShop } from "@/actions/get-shop";

const Page =async () => {
    
    const response = await getShop();
    return (
        <BatchSetting shop={response.success || ""} />
    )


}

export default Page