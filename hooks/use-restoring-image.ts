import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/hooks/compress-status";

export const useRestoringImage = () => {
    const setImageStatus = useStore(state => state.setImageStatus);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id:string) => {
            const checkStatus = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/image/image-status/${id}`);
                    const data = await response.json();

                    if (data.error) {
                        queryClient.invalidateQueries({ queryKey: ["images"] })
                        clearInterval(intervalId);
                    }
                    setImageStatus(id, data.status);

                    if (data.status === 'NOT_COMPRESSED') {
                        setImageStatus(id, 'NOT_COMPRESSED');
                        queryClient.invalidateQueries({ queryKey: ["images"] })
                        clearInterval(intervalId);
                    }
                } catch (error) {
                    setImageStatus(id, 'COMPRESSED');
                    queryClient.invalidateQueries({ queryKey: ["images"] })
                    console.error('Error fetching image status:', error);
                    clearInterval(intervalId);
                }
            };

            const intervalId = setInterval(checkStatus, 1000);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] })
            return new Error('something went wrong');
        }
    })
    return mutation;
}