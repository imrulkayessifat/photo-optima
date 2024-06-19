import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RemoveUserSubscriptionPlanProps {
    name: string;
    chargeId?: string;
}

export const removeUserSubscriptionPlan = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data:RemoveUserSubscriptionPlanProps) => {
            const removeSubscription = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscribe/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const res =  await removeSubscription.json()
            console.log(res)
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