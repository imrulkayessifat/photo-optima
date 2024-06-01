import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseAltRenameProps {
    id: string;
    storeName: string;
}

export const useAltRename = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseAltRenameProps) => {
            const { id, storeName } = data;
            const req = await fetch('http://localhost:3001/rename/alt-rename', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: `${id}`,
                    storeName: storeName
                })
            })

            return await req.json()
        },
        onSuccess: () => {
            toast.success('Successfully Alt Renamed')
            queryClient.invalidateQueries({ queryKey: ["images"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["images"] })
        }
    })
    return mutation;
}