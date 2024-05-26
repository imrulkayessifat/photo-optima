import { useQuery } from "@tanstack/react-query";

export const useGetImages = () => {
    const query = useQuery({
        queryKey: ["images"],
        queryFn: async () => {
            const res = await fetch('http://localhost:3001/image');
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { data } = await res.json();
            return data;
        }
    })
    return query;
}