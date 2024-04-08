// import { create } from 'zustand'

// interface CompressStatusStore {
//     compressStatus: Record<string, string>;
//     startCompression: (productId: number, status?: string) => void; 
//     finishCompression: (productId: number, status?: string) => void;
// }

// const useCompressStatusStore = create<CompressStatusStore>((set) => ({
//     compressStatus: {},
//     startCompression: (productId, status = 'ongoing') => 
//         set((state) => ({
//             compressStatus: {
//                 ...state.compressStatus,
//                 [productId]: status,
//             },
//         })),
//     finishCompression: (productId, status = 'compressed') =>
//         set((state) => ({
//             compressStatus: {
//                 ...state.compressStatus,
//                 [productId]: status,
//             },
//         })),
// }));

// export default useCompressStatusStore;

// store.ts
import { create } from 'zustand';

type Store = {
    imageStatus: Record<string, string>;
    setImageStatus: (id: string, status: string) => void;
};

export const useStore = create<Store>(set => ({
    imageStatus: {},
    setImageStatus: (id, status) => set(state => ({ imageStatus: { ...state.imageStatus, [id]: status } })),
}));
