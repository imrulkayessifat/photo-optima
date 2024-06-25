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
import { editSubsciptionPlan } from "@/hooks/edit-subscription-plan";
import { SubscriptionSchema } from "@/components/subscription/subscription-form"
import SubscriptionForm from "@/components/subscription/subscription-form";
import { useEditPlan } from "@/hooks/subscription-plan/use-edit-plan";
import { useGetPlan } from "@/hooks/use-get-plan";
import Loader from "@/components/loader";
import { useCurrentUser } from "@/hooks/use-current-user";

const EditSubscriptionSheet = () => {
    const user = useCurrentUser();
    const { isOpen, onClose, id } = editSubsciptionPlan();
    const [isPending, startTransition] = useTransition();

    const token = user?.accessToken;
    const subscriptionQuery = useGetPlan({ id, token });
    const mutation = useEditPlan({ id, token });

    const isLoading = subscriptionQuery.isLoading
    const defaultValues = subscriptionQuery.data ? {
        name: subscriptionQuery.data.name,
        bandwidth: subscriptionQuery.data.bandwidth,
        price: subscriptionQuery.data.price
    } : {
        name: '',
        bandwidth: null,
        price: null
    }

    const editSubscriptionPlan = async (data: z.infer<typeof SubscriptionSchema>) => {
        const resData = await mutation.mutateAsync(data)

        if (resData.error) {
            return { error: 'Subscription plan update failed!' }
        }

        return { success: 'Subscription plan update successfully' }
    }

    const onSubmit = (data: z.infer<typeof SubscriptionSchema>) => {
        startTransition(() => {
            const promise = editSubscriptionPlan(data)

            toast.promise(promise, {
                loading: 'Updating Subscription...',
                success: (data) => {
                    if (data.error) {
                        return `Updating Subscription failed: ${data.error}`
                    } else {

                        return `Updating Subscription successful: ${data.success}`
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
                        Edit Subscription Plan
                    </SheetTitle>
                    <SheetDescription>
                        Update existing plan for your subscription
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <SubscriptionForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                        />
                    )
                }

            </SheetContent>
        </Sheet>
    )
}

export default EditSubscriptionSheet