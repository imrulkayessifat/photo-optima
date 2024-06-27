import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseAutoCompressionProps {
    store_name: string;
    auto_compression?: boolean;
}

export const useAutoCompression = ({shopifyAccessToken}:{shopifyAccessToken:string}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data:UseAutoCompressionProps) => {
            const updateAutoCompression = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/store`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`${shopifyAccessToken}`,
                    'Shop':`${data.store_name}`
                },
                body: JSON.stringify(data)
            })
            return await updateAutoCompression.json()
        },
        onSuccess: () => {
            toast.success('Change Auto Compression!')
            queryClient.invalidateQueries({ queryKey: ["store"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["store"] })
        }
    })
    return mutation;
}