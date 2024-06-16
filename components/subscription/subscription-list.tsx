"use client";

import Link from 'next/link';
import { MdCreateNewFolder } from "react-icons/md"
import { Heading } from "@/components/ui/heading"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { useGetSubscriptionPlans } from "@/hooks/use-get-subscription-plan"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/subscription/columns'
import { useDeleteSubscriptions } from '@/hooks/use-delete-subscription';

import {
    Card,
    CardHeader,
    CardContent
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { addSubsciptionPlan } from '@/hooks/add-subscription-plan';

type Subscription = {
    id: number;
    name: string;
    bandwidth: string;
    price: number
}

interface SubscriptionListProps {
    data: Subscription[]
}

const SubscriptionList = () => {
    const { data, isLoading } = useGetSubscriptionPlans();
    const deleteSubscription = useDeleteSubscriptions();
    const { onOpen } = addSubsciptionPlan()

    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 mt-24">
                <Card className='border-none'>
                    <CardHeader>
                        <Skeleton className='h-8 w-48' />
                    </CardHeader>
                    <CardContent>
                        <div className='h-[500px] w-full flex items-center justify-center'>
                            <Loader2
                                className='size-6 text-slate-300 animate-spin'
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
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