import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RestoreFileNameProps {
    storeName:string;
    restoreId: string;
}

export const restoreFileName = ({ shopifyAccessToken }: { shopifyAccessToken: string }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: RestoreFileNameProps) => {
            const { restoreId } = data;
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/rename/restore-file-name`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`${shopifyAccessToken}`,
                    'Shop':`${data.storeName}`
                },
                body: JSON.stringify({
                    restoreId: `${restoreId}`,
                })
            })

            return await req.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
            toast.success('Successfully File Name Restored')

        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
            toast.error('something went wrong')
        }
    })
    return mutation;
}