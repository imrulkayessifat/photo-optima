import { useQuery } from "@tanstack/react-query";

interface UseStoreDataProps {
    shop: string;
}


export const useStoreData = ({ shop }: UseStoreDataProps) => {
    const query = useQuery({
        queryKey: ["store"],
        queryFn: async () => {
            const res = await fetch('http://localhost:3001/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeName: `${shop}`
                })
            })
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        },
    })
    return query;
}