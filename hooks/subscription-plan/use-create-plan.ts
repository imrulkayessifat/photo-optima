import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseCreatePlanProps {
    name: string;
    bandwidth: number;
    price: number
}

interface UseCreatePlanProp {
    token?: string;
}

export const useCreatePlan = ({ token }: UseCreatePlanProp) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseCreatePlanProps) => {
            console.log(data)
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    ...data
                })
            })

            return await req.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription_plan"] })
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription_plan"] })
        }
    })
    return mutation;
}