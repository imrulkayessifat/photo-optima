import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from '@uploadcare/upload-client'

export const useUploadImage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (file: File) => {
            const pollingInterval = 2000; // Poll every 2 seconds
            const maxRetries = 10;
            const waitForImageData = async (uuid: string): Promise<any> => {
                let retries = 0;
                while (retries < maxRetries) {
                    const imageRes = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/image/manual/${uuid}`);
                    const imageData = await imageRes.json();

                    if (imageData.data) {
                        return imageData.data;
                    }

                    await new Promise(resolve => setTimeout(resolve, pollingInterval));
                    retries++;
                }
                throw new Error("Image data not available after maximum retries");
            };

            const data = await uploadFile(
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
            if (!data.uuid) {
                return { error: `Something went wrong` };
            }
            return await waitForImageData(data.uuid);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
            return { success: "Successfully image uploaded!" };
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
            return { error: 'something went wrong' };
        }
    })
    return mutation;
}