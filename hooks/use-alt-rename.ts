import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseAltRenameProps {
    uid: string;
    storeName: string;
}

export const useAltRename = ({shopifyAccessToken}:{shopifyAccessToken:string}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseAltRenameProps) => {
            const { uid, storeName } = data;
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/rename/alt-rename`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`${shopifyAccessToken}`,
                    'Shop':`${storeName}`
                },
                body: JSON.stringify({
                    uid: `${uid}`,
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