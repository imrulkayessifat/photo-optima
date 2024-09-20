import { QueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";

export function getEventStreamContent({ queryKey }: { queryKey: any }) {
    return new Promise((resolve, reject) => {
        const [_key] = queryKey;
        const queryClient = new QueryClient();

        let eventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_MQSERVER}/image/sse`, {
            withCredentials: true,
            heartbeatTimeout: 60000, //Timeout
        });

        eventSource.addEventListener("SUCCESS", (e: any) => {
            
            const data = JSON.parse(e.data);
            queryClient.setQueryData(_key, data);
        });

        eventSource.addEventListener("END", (e: any) => {
            
            const data = JSON.parse(e.data)
            queryClient.setQueryData(_key, data);
            eventSource.close();
            resolve(data);
        })

        eventSource.addEventListener("error", (e) => {
           
            eventSource.close();
            reject(e); // Reject promise with error
        });
    });
}