"use client";

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/user-subscription/columns'
import { useGetUserSubscriptionPlans } from "@/hooks/user-subscription/use-get-user-subscription-plan";
import { useDeleteSubscriptions } from "@/hooks/subscription-plan/use-delete-subscription";

import Loader from '@/components/loader';

interface UserSubscriptionListProps {
    token: string;
}

const UserSubscriptionList: React.FC<UserSubscriptionListProps> = ({
    token
}) => {
    const { data, isLoading } = useGetUserSubscriptionPlans();
    const deleteSubscription = useDeleteSubscriptions({ token });

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`User Subscription Plan Lists (${data.length})`}
                    description="Manage User Subscription Plan for Photo Optima"
                />
            </div>
            <Separator />
            <DataTable
                onDelete={(row) => {
                    deleteSubscription.mutate({ row })
                }}
                filterKey='name'
                columns={columns}
                data={data}
                disabled={deleteSubscription.isPending || isLoading}
            />
        </div>
    )
}

export default UserSubscriptionList