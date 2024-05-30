import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from '@uploadcare/upload-client'

export const useUploadImage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (file:File) => {
            const data =  await uploadFile(
                file,
                {
                    publicKey: 'c0bc9dbd97f5de75c062',
                    store: 'auto',
                    metadata: {
                        subsystem: 'js-client',
                        pet: 'NOTCOMPRESSED'
                    }
                }
            )
            queryClient.invalidateQueries({ queryKey: ["images"] })
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
            return { success: "Successfully image uploaded!" };
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
            return {error : 'something went wrong'};
        }
    })
    return mutation;
}