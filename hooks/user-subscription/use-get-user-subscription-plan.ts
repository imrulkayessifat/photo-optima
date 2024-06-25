import { useQuery } from "@tanstack/react-query";

interface UseGetUserSubscriptionPlans {
    token: string;
}

export const useGetUserSubscriptionPlans = ({ token }: UseGetUserSubscriptionPlans) => {
    const query = useQuery({
        queryKey: ["user_subscription_plan"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
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