import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseFileRenameProps {
    storeName: string;
    uid: string;
}

export const useFileRename = ({ shopifyAccessToken }: { shopifyAccessToken: string }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseFileRenameProps) => {
            const { uid, storeName } = data;
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/rename/file-rename`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${shopifyAccessToken}`,
                    'Shop': `${data.storeName}`
                },
                body: JSON.stringify({
                    storeName: storeName,
                    uid: `${uid}`,
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