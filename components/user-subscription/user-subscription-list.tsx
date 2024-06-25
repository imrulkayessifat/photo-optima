"use client";

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/user-subscription/columns'
import { useGetUserSubscriptionPlans } from "@/hooks/user-subscription/use-get-user-subscription-plan";


import Loader from '@/components/loader';

interface UserSubscriptionListProps {
    token: string;
}

const UserSubscriptionList: React.FC<UserSubscriptionListProps> = ({
    token
}) => {
    const { data, isLoading } = useGetUserSubscriptionPlans({token});

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
                
                filterKey='name'
                columns={columns}
                data={data}
                disabled={isLoading}
            />
        </div>
    )
}

export default UserSubscriptionList