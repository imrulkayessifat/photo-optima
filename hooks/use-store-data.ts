import { useQuery } from "@tanstack/react-query";

interface UseStoreDataProps {
    shop: string;
    access_token:string;
}


export const useStoreData = ({ shop,access_token }: UseStoreDataProps) => {
    const query = useQuery({
        queryKey: ["store"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeName: `${shop}`,
                    access_token:access_token
                }),
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