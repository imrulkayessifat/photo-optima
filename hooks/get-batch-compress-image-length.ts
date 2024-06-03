import { useQuery } from "@tanstack/react-query";

interface GetBatchCompressImageLengthProps {
    shop: string;
}


export const getBatchCompressImageLength = ({ shop }: GetBatchCompressImageLengthProps) => {
    const query = useQuery({
        queryKey: ["getBatchCompressImageLength"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/batch/${shop}`)
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const { batch_compress_images_length } = await res.json();

            return batch_compress_images_length;
        },
    })
    return query;
}