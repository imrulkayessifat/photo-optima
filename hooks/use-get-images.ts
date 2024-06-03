import { useQuery } from "@tanstack/react-query";

interface UseGetImagesProps {
    allowBatchCompress:boolean;
    autoCompression: boolean;
    autoFileRename: boolean;
    autoAltRename: boolean;
}


export const useGetImages = ({ autoCompression, autoFileRename, autoAltRename,allowBatchCompress }: UseGetImagesProps) => {
    const query = useQuery({
        queryKey: ["images"],
        queryFn: async () => {
            const res = await fetch('http://localhost:3001/image');
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        },
        refetchInterval: allowBatchCompress === true || autoCompression === true || autoFileRename === true || autoAltRename === true ? 2000 : undefined
    })
    return query;
}