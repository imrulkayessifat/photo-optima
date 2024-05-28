import { useQuery } from "@tanstack/react-query";

interface UseGetImagesProps {
    autoCompression: boolean;
}


export const useGetImages = ({ autoCompression }: UseGetImagesProps) => {
    const query = useQuery({
        queryKey: ["images",autoCompression],
        queryFn: async () => {
            const res = await fetch('http://localhost:3001/image');
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        },
        refetchInterval: autoCompression ? 1000 : undefined
    })
    return query;
}