import {create} from 'zustand';

interface ProductStore {
  data: any[];
  setProducts: (products: any[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  data: [],
  setProducts: (data) => set({ data }),
}));
