import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseEditPlanProps {
    name: string;
    bandwidth: number;
    price: number
}

interface UseGetPlanProps {
    id?: string;
    token?: string;
}

export const useEditPlan = ({ id, token }: UseGetPlanProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseEditPlanProps) => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan/${id}`, {
                method: 'PUT',
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