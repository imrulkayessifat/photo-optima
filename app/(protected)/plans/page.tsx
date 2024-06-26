import { getShop } from "@/actions/get-shop";

const Page = async () => {
    const response = await getShop();

    console.log(response)
    

    return (
      <p></p>
        // <PlanContext shop={ || ""} />
    );
}

export default Page;
