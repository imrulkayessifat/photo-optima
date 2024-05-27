import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useFileRename = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const { id, name } = data;
            const req = await fetch('http://localhost:3001/rename/file-rename', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: `${id}`,
                    name: name
                })
            })

            return await req.json()
        },
        onSuccess: () => {
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