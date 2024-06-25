"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { removeUserSubscriptionPlan } from "@/hooks/user-subscription/remove-user-subscription-plan";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
    name: string;
    chargeId?: string;
    plan: string;
}

const Actions = ({
    name,
    chargeId,
    plan
}: Props) => {
    const user = useCurrentUser()
    const token = user?.accessToken
    const [isPending, startTransition] = useTransition()
    const mutation = removeUserSubscriptionPlan({ token })

    const unsubscribe = (name: string, chargeId: string) => {
        startTransition(async () => {
            await mutation.mutateAsync({ name, chargeId })
        })
    }

    return (
        <>
            {
                plan !== 'FREE' && chargeId ? (
                    <Button
                        onClick={() => unsubscribe(name, chargeId)}
                        variant={"outline"}
                        disabled={isPending}
                    >
                        UNSUBSCRIBED
                    </Button>
                ) : (
                    <p>NOT SUBSCRIBED</p>
                )
            }
        </>
    )
}

export default Actions