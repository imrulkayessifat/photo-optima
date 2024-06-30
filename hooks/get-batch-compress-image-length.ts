import { useQuery } from "@tanstack/react-query";

interface GetBatchCompressImageLengthProps {
    shop: string;
    access_token:string;
}


export const getBatchCompressImageLength = ({ shop,access_token }: GetBatchCompressImageLengthProps) => {
    const query = useQuery({
        queryKey: ["getBatchCompressImageLength"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/batch/${shop}`,{
                headers:{
                    'Authorization':`${access_token}`,
                    'Shop':`${shop}`
                }
            })
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { batch_compress_images_length } = await res.json();

            return batch_compress_images_length;
        },
        gcTime: 0
    })
    return query;
}