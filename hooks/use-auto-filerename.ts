import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseAutoFileRenameProps {
    store_name: string;
    auto_file_rename?: boolean;
}

export const useAutoFileRename = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseAutoFileRenameProps) => {
            const updateAutoFileRename = await fetch('http://localhost:3001/store/auto-file-rename', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            return await updateAutoFileRename.json()
        },
        onSuccess: () => {
            toast.success('Change Auto File Rename!')
            queryClient.invalidateQueries({ queryKey: ["store", "images"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["store", "images"] })
        }
    })
    return mutation;
}