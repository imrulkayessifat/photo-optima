import { create } from 'zustand';

interface PlanData {
    plan: string;
    setPlan: (plan: string) => void;
}

export const usePlanStore = create<PlanData>((set) => ({
    plan: 'FREE',
    setPlan: (plan) => set({ plan }),
}));
