import { useQuery } from "@tanstack/react-query";

interface UseGetSubscriptionPlans {
    token: string;
}

export const useGetSubscriptionPlans = () => {
    const query = useQuery({
        queryKey: ["subscription_plan"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan`);
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        },
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
    })
    return query;
}