import { useQuery } from "@tanstack/react-query";

interface UseGetPlanProps {
    id?: string;
    token?: string;
}

export const useGetPlan = ({ id, token }: UseGetPlanProps) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["single-plan", { id }],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            })
            const data = await response.json();

            if (data.error) {
                throw new Error("Failed to fetch plan")
            }

            return data.data;
        }
    })

    return query;
}