import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CompressionTypeData {
    store_name: string;
    compressionType: "BALANCED" | "CONSERVATIVE" | "CUSTOM";
}


export const changeCompressionType = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CompressionTypeData) => {
            const req = await fetch('http://localhost:3001/store/compression-type', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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