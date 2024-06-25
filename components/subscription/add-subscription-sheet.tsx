"use client";

import { z } from "zod"
import { useTransition } from "react"
import { toast } from "sonner"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { addSubsciptionPlan } from "@/hooks/add-subscription-plan"
import { SubscriptionSchema } from "@/components/subscription/subscription-form"
import SubscriptionForm from "@/components/subscription/subscription-form";
import { useCreatePlan } from "@/hooks/subscription-plan/use-create-plan";
import { useCurrentUser } from "@/hooks/use-current-user";

const AddSubscriptionSheet = () => {
    const user = useCurrentUser();
    const { isOpen, onClose } = addSubsciptionPlan()
    const [isPending, startTransition] = useTransition();
    
    const token = user?.accessToken
    const mutation = useCreatePlan({ token })

    const addSubscriptionPlan = async (data: z.infer<typeof SubscriptionSchema>) => {
        const resData = await mutation.mutateAsync(data, {
            onSuccess: () => {
                onClose()
            }
        })

        if (resData.error) {
            return { error: 'Subscription plan create failed!' }
        }

        return { success: 'Subscription plan create successfully' }
    }

    const onSubmit = (data: z.infer<typeof SubscriptionSchema>) => {
        startTransition(() => {
            const promise = addSubscriptionPlan(data)

            toast.promise(promise, {
                loading: 'Creating Subscription...',
                success: (data) => {
                    if (data.error) {
                        return `Creating Subscription failed: ${data.error}`
                    } else {

                        return `Creating Subscription successful: ${data.success}`
                    }
                },
                error: 'An unexpected error occurred',
            })
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Add Subscription Plan
                    </SheetTitle>
                    <SheetDescription>
                        Create a new plan for your subscription
                    </SheetDescription>
                </SheetHeader>
                <SubscriptionForm
                    onSubmit={onSubmit} disabled={isPending}
                />
            </SheetContent>
        </Sheet>
    )
}

export default AddSubscriptionSheet