"use client";

import Link from 'next/link';
import { MdCreateNewFolder } from "react-icons/md"
import { Heading } from "@/components/ui/heading"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { useGetSubscriptionPlans } from "@/hooks/subscription-plan/use-get-subscription-plan"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/subscription/columns'
import { useDeleteSubscriptions } from '@/hooks/subscription-plan/use-delete-subscription';

import Loader from '@/components/loader';
import { addSubsciptionPlan } from '@/hooks/add-subscription-plan';

type Subscription = {
    id: number;
    name: string;
    bandwidth: string;
    price: number
}

interface SubscriptionListProps {
    token: string;
}

const SubscriptionList:React.FC<SubscriptionListProps> = ({
    token
}) => {
    const { data, isLoading } = useGetSubscriptionPlans();
    const deleteSubscription = useDeleteSubscriptions({token});
    const { onOpen } = addSubsciptionPlan()

    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Subscription Plan List (${data.length})`}
                    description="Manage Subscription Plan for Photo Optima"
                />

                <Button onClick={onOpen} className="px-1" variant={'outline'}>
                    <MdCreateNewFolder className="w-7 h-7" />
                </Button>

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

export default SubscriptionList