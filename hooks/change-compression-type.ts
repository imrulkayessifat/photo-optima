import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CompressionTypeData {
    store_name: string;
    compressionType: "BALANCED" | "CONSERVATIVE" | "CUSTOM";
}


export const changeCompressionType = ({shopifyAccessToken}:{shopifyAccessToken:string}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CompressionTypeData) => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store/compression-type`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`${shopifyAccessToken}`,
                    'Shop':`${data.store_name}`
                },
                body: JSON.stringify(data)
            })

            return await req.json()
        },
        onSuccess: () => {
            toast.success('Successfully Compression Type Changed')
            queryClient.invalidateQueries({ queryKey: ["store"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["store"] })
        }
    })
    return mutation;
}