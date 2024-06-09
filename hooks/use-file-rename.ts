import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseFileRenameProps {
    storeName: string;
    id: string;
}

export const useFileRename = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseFileRenameProps) => {
            const { id, storeName } = data;
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/rename/file-rename`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeName: storeName,
                    id: `${id}`,
                })
            })

            return await req.json()
        },
        onSuccess: (data) => {
            toast.success('Successfully File Renamed')
            queryClient.invalidateQueries({ queryKey: ["images"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["images"] })
        }
    })
    return mutation;
}