import { useQuery } from "@tanstack/react-query";

interface GetBatchRestoreImageLengthProps {
    shop: string;
}


export const getBatchRestoreImageLength = ({ shop }: GetBatchRestoreImageLengthProps) => {
    const query = useQuery({
        queryKey: ["getBatchRestoreImageLength"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/batch/restore/${shop}`)
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { batch_restore_images_length } = await res.json();

            return batch_restore_images_length;
        },
        refetchOnWindowFocus: true, 
        refetchOnReconnect: true, 
        refetchOnMount: true,
    })
    return query;
}