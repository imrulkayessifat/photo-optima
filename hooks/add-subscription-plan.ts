import { create } from 'zustand'

type NewSubscriptionPlanState = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const addSubsciptionPlan = create<NewSubscriptionPlanState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))