import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CustomCompressionTypeData {
    store_name:string;
    jpeg: number;
    png: number;
    others: number;
}


export const changeCustomCompressionType = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CustomCompressionTypeData) => {
            const req = await fetch('http://localhost:3001/store/custom-compression-type', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            return await req.json()
        },
        onSuccess: () => {
            toast.success('Successfully Custom Compression Type Changed')
            queryClient.invalidateQueries({ queryKey: ["store"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["store"] })
        }
    })
    return mutation;
}