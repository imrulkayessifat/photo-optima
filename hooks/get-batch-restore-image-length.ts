import { useQuery } from "@tanstack/react-query";

interface GetBatchRestoreImageLengthProps {
    shop: string;
}


export const getBatchRestoreImageLength = ({ shop }: GetBatchRestoreImageLengthProps) => {
    const query = useQuery({
        queryKey: ["getBatchRestoreImageLength"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/batch/restore/${shop}`)
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { batch_restore_images_length } = await res.json();

            return batch_restore_images_length;
        },
        gcTime: 0
    })
    return query;
}