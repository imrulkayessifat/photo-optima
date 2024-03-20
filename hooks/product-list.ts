import { create } from 'zustand';

const useProductStore = create((set) => ({
    product: [],
    fetchProducts: async () => {
        const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products.json`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
            }
        })
        const data = await res.json()
        
        set({ product: data.products });
    },
}));

export default useProductStore;