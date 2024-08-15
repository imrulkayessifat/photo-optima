import { create } from 'zustand';

type Store = {
    imageStatus: Record<string, string>;
    setImageStatus: (id: string, status: string) => void;
};

export const useStore = create<Store>(set => ({
    imageStatus: {},
    setImageStatus: (id, status) => set(state => ({ imageStatus: { ...state.imageStatus, [id]: status } })),
}));
