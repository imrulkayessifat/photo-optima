import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useAutoCompression = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const updateAutoCompression = await fetch('http://localhost:3001/store', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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