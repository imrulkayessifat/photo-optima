import { useQuery } from "@tanstack/react-query";

interface GetBatchRestoreImageLengthProps {
    shop: string;
    access_token: string;
}


export const getBatchRestoreImageLength = ({ shop, access_token }: GetBatchRestoreImageLengthProps) => {
    const query = useQuery({
        queryKey: ["getBatchRestoreImageLength"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/batch/restore/${shop}`, {
                headers: {
                    'Authorization': `${access_token}`,
                    'Shop': `${shop}`
                }
            })
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { batch_restore_images_length } = await res.json();

            return batch_restore_images_length;
        },
    })
    return query;
}