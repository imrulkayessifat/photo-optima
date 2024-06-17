import { create } from 'zustand'

type EditSubscriptionPlanState = {
    id?:string
    isOpen: boolean
    onOpen: (id:string) => void
    onClose: () => void
}

export const editSubsciptionPlan = create<EditSubscriptionPlanState>((set) => ({
    id:undefined,
    isOpen: false,
    onOpen: (id:string) => set({ isOpen: true,id }),
    onClose: () => set({ isOpen: false,id:undefined })
}))