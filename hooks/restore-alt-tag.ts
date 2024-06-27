import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RestoreAltTagProps {
    storeName: string;
    restoreId: string;
}

export const restoreAltTag = ({ shopifyAccessToken }: { shopifyAccessToken: string }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: RestoreAltTagProps) => {
            const { restoreId,storeName } = data;
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/rename/restore-alt-tag`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${shopifyAccessToken}`,
                    'Shop': `${storeName}`
                },
                body: JSON.stringify({
                    restoreId: `${restoreId}`,
                })
            })

            return await req.json()
        },
        onSuccess: () => {
            toast.success('Successfully Alt Tag Restored')
            queryClient.invalidateQueries({ queryKey: ["images"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["images"] })
        }
    })
    return mutation;
}