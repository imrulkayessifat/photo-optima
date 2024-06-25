import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RemoveUserSubscriptionPlanDataProps {
    name: string;
    chargeId?: string;
}

interface RemoveUserSubscriptionPlanProp {
    token?: string;
}

export const removeUserSubscriptionPlan = ({ token }: RemoveUserSubscriptionPlanProp) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: RemoveUserSubscriptionPlanDataProps) => {
            const removeSubscription = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscribe/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(data)
            })
            const res = await removeSubscription.json()

            return res;
        },
        onSuccess: () => {
            toast.success('user subscription removed!')
            queryClient.invalidateQueries({ queryKey: ["user_subscription_plan"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["user_subscription_plan"] })
        }
    })
    return mutation;
}