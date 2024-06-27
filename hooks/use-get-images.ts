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
                headers: {
                    'Authorization': `${shopifyAccessToken}`
                }
            });
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        },
        // refetchInterval: allowBatchCompress === true || allowBatchRestore === true || autoCompression === true || autoFileRename === true || autoAltRename === true ? 2000 : undefined
        // refetchInterval:5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
        // queryFn:getEventStreamContent,
        // retry:1
    })
    return query;
}