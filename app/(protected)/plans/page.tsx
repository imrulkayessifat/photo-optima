import PlanContext from "@/components/plan/plan-content"

const Page = async () => {
    const response = await fetch('/api/shop');
    const shop = await response.json()
    console.log(shop)

    return (
      <p></p>
        // <PlanContext shop={ || ""} />
    );
}

export default Page;
