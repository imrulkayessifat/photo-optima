import { useQuery } from "@tanstack/react-query";

export const useGetPlan = (id?:string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["single-plan", { id }],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan/${id}`)
            const data = await response.json();

            if (data.error) {
                throw new Error("Failed to fetch plan")
            }

            return data.data;
        }
    })

    return query;
}