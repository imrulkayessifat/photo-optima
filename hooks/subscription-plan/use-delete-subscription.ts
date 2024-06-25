import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseGetSubscriptionPlans {
    token: string;
}
interface UseDeleteSubscriptions {
    row: number[]
}

export const useDeleteSubscriptions = ({ token }: UseGetSubscriptionPlans) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseDeleteSubscriptions) => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ ids:data.row })
            })

            return await req.json()
        },
        onSuccess: () => {
            toast.success('Successfully Subscriptions Deleted')
            queryClient.invalidateQueries({ queryKey: ["subscription_plan"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["subscription_plan"] })
        }
    })
    return mutation;
}