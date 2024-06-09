import { useQuery } from "@tanstack/react-query";

interface UseStoreDataProps {
    shop: string;
}


export const useStoreData = ({ shop }: UseStoreDataProps) => {
    const query = useQuery({
        queryKey: ["store"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeName: `${shop}`
                }),
                cache:'no-store'
            })
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        },
        // staleTime: 0, // Data will be considered stale immediately
         // Disable caching
        refetchOnWindowFocus: true, 
        refetchOnReconnect: true, 
        refetchOnMount: true,

    })
    return query;
}