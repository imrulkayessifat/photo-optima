import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RestoreFileNameProps {
    restoreId: string;
}

export const restoreFileName = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: RestoreFileNameProps) => {
            const { restoreId } = data;
            const req = await fetch('http://localhost:3001/rename/restore-file-name', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restoreId: `${restoreId}`,
                })
            })

            return await req.json()
        },
        onSuccess: () => {
            toast.success('Successfully File Name Restored')
            queryClient.invalidateQueries({ queryKey: ["store","images"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["images"] })
        }
    })
    return mutation;
}