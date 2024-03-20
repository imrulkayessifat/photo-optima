import { create } from 'zustand'

interface CompressStatusStore {
    compressStatus: Record<string, string>;
    startCompression: (productId: number, status?: string) => void; 
    finishCompression: (productId: number, status?: string) => void;
}

const useCompressStatusStore = create<CompressStatusStore>((set) => ({
    compressStatus: {},
    startCompression: (productId, status = 'ongoing') => 
        set((state) => ({
            compressStatus: {
                ...state.compressStatus,
                [productId]: status,
            },
        })),
    finishCompression: (productId, status = 'compressed') =>
        set((state) => ({
            compressStatus: {
                ...state.compressStatus,
                [productId]: status,
            },
        })),
}));

export default useCompressStatusStore;
