import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseAutoAltRenameProps {
    store_name: string;
    auto_alt_rename?: boolean;
}

export const useAutoAltRename = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseAutoAltRenameProps) => {
            const updateAutoAltRename = await fetch('http://localhost:3001/store/auto-alt-rename', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            return await updateAutoAltRename.json()
        },
        onSuccess: () => {
            toast.success('Change Auto Alt Rename!')
            queryClient.invalidateQueries({ queryKey: ["store"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["store"] })
        }
    })
    return mutation;
}