import { useQuery } from "@tanstack/react-query";
import { getEventStreamContent } from "@/hooks/sse/get-event-stream-content";

interface UseGetImagesProps {
    storeName: string;
    shopifyAccessToken: string;
}


export const useGetImages = ({ storeName, shopifyAccessToken }: UseGetImagesProps) => {
    const query = useQuery({
        queryKey: ["images"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/image/${storeName}`, {
                method:'GET',
                headers: {
                    'Authorization': `${shopifyAccessToken}`,
                    'Shop':`${storeName}`
                }
            });
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        },
        // queryFn:getEventStreamContent,
    })
    return query;
}