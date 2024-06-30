import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseFileRenameSettingProps {
    storename: string;
    product_vendor: boolean;
    variant_title: boolean;
    product_page_title: boolean;
    product_type: boolean;
    product_barcode: boolean;
    product_title: boolean;
    product_sku: boolean;
}

export const useFileRenameSetting = ({shopifyAccessToken}:{shopifyAccessToken:string}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseFileRenameSettingProps) => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/filerename`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`${shopifyAccessToken}`,
                    'Shop':`${data.storename}`
                },
                body: JSON.stringify(data)
            })

            return await req.json()
        },
        onSuccess: () => {
            toast.success('Successfully File Rename Setting Updated')
            queryClient.invalidateQueries({ queryKey: ["store"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["store"] })
        }
    })
    return mutation;
}