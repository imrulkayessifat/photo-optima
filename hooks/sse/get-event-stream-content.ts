import { QueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";

export function getEventStreamContent({ queryKey }: { queryKey: any }) {
    return new Promise((resolve, reject) => {
        const [_key] = queryKey;
        const queryClient = new QueryClient();

        // const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_MQSERVER}/image/sse`, {
        //     withCredentials: true,
        // });

        // eventSource.onmessage = (event) => {
        //     const data = JSON.parse(event.data);
        //     console.log(data)
        //     if (event.lastEventId === "END") {
        //         queryClient.setQueryData(_key, data);
        //         eventSource.close();
        //         resolve(data);
        //     } else {
        //         if (data) {
        //             queryClient.setQueryData(_key, data);
        //         }
        //     }
        // }

        // return {
        //     close: () => {
        //         console.info("Closing SSE");
        //         eventSource.close();
        //     },
        // };

        let eventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_MQSERVER}/image/sse`, {
            withCredentials: true,
            heartbeatTimeout: 60000, //Timeout
        });

        eventSource.addEventListener("SUCCESS", (e: any) => {
            console.log("event success : ", e)
            const data = JSON.parse(e.data);
            queryClient.setQueryData(_key, data);
        });

        eventSource.addEventListener("END", (e: any) => {
            console.log("event end : ", e)
            const data = JSON.parse(e.data)
            queryClient.setQueryData(_key, data);
            eventSource.close();
            resolve(data);
        })

        eventSource.addEventListener("error", (e) => {
            console.log("event error : ", e)
            eventSource.close();
            reject(e); // Reject promise with error
        });
    });
}