import { useQuery } from "@tanstack/react-query";


export const useGetUserSubscriptionPlans = () => {
    const query = useQuery({
        queryKey: ["user_subscription_plan"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`);
            if (!res.ok) {
                throw new Error("Failed to fetch user subscription plan");
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