"use client"

import { useState, useEffect, useTransition } from 'react';
import { redirect } from 'next/navigation';
import Link from "next/link"
import { toast } from 'sonner';

import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStoreData } from '@/hooks/use-store-data';
import { getBatchCompressImageLength } from '@/hooks/get-batch-compress-image-length';
import { getBatchRestoreImageLength } from '@/hooks/get-batch-restore-image-length';
import Loader from '@/components/loader';

interface BatchSettingProps {
    shop: string;
}

const BatchSetting: React.FC<BatchSettingProps> = ({
    shop
}) => {

    const [isPending, startTransition] = useTransition();

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const { data: store, isLoading } = useStoreData({ shop });
    const { data: batch_compress_images_length, isLoading: isLoading1 } = getBatchCompressImageLength({ shop });
    const { data: batch_restore_images_length, isLoading: isLoading2 } = getBatchRestoreImageLength({ shop });

    useEffect(() => {
        if (shouldRedirect) {
            redirect(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}`);
        }
    }, [shouldRedirect]);

    if (!shop) {
        return (
            <div className="text-sm mx-auto px-8 my-10">
                No shop available....
            </div>
        )
    }

    if (isLoading || isLoading1 || isLoading2) {
        return (
            <Loader />
        )
    }

    const batchCompressFN = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/batch/batch-compress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ store_name: store.name })
        })

        const data = await res.json();

        return data;
    }

    const batchRestoreFN = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/batch/batch-restore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ store_name: store.name })
        })

        const data = await res.json();
        return data;
    }
    return (
        <div className='mt-24'>
            <div className='flex flex-col mx-auto px-8'>
                <h1 className='font-bold text-lg'>Batch Actions</h1>
                {
                    store.plan === 'FREE' ? (
                        <div className="flex flex-col sm:flex-row justify-start gap-5 mt-10">
                            <Card>
                                <CardContent className="px-6 py-20">

                                    <p className="text-sm">Batch Compression is available on <Link href="/plans"><span className="text-blue-500 cursor-pointer hover:underline">paid plans</span></Link> only</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="px-6 py-20">
                                    <p className="text-sm">Batch Restore is available on <Link href="/plans"><span className="text-blue-500 cursor-pointer hover:underline">paid plans</span></Link> only</p>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row justify-start gap-5 mt-10">
                            <Card>
                                <CardHeader>
                                    Batch Compress
                                </CardHeader>
                                <Separator />
                                <CardContent className="px-6 py-6">
                                    {
                                        batch_compress_images_length === 0 ? (
                                            <p className="text-sm">
                                                You don&apos;t have any images ready to be compressed.
                                            </p>
                                        ) : (
                                            <Button
                                                disabled={isPending}
                                                onClick={() => {
                                                    startTransition(() => {

                                                        const promise = batchCompressFN();

                                                        toast.promise(promise, {
                                                            loading: 'Batch Compressing...',
                                                            success: (data) => {
                                                                if (data!.error) {
                                                                    return `Batch Compress failed: ${data!.error}`
                                                                } else {
                                                                    setShouldRedirect(true)
                                                                    return `Batch Compress Started : ${data!.success}`
                                                                }
                                                            },
                                                            error: 'An unexpected error occurred',
                                                        })
                                                    });
                                                }}
                                            >
                                                Compress {batch_compress_images_length} images
                                            </Button>
                                        )
                                    }
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    Batch Restore
                                </CardHeader>
                                <Separator />
                                <CardContent className="px-6 py-6">
                                    {
                                        batch_restore_images_length === 0 ? (
                                            <p className="text-sm">

                                                You don&apos;t have any images ready to be restored.
                                            </p>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm">
                                                    You have {batch_restore_images_length} images ready to be restored.
                                                </p>
                                                <Button
                                                    disabled={isPending}
                                                    onClick={() => {
                                                        startTransition(() => {

                                                            const promise = batchRestoreFN();

                                                            toast.promise(promise, {
                                                                loading: 'Batch Restoring...',
                                                                success: (data) => {
                                                                    if (data!.error) {
                                                                        return `Batch Restore failed: ${data!.error}`
                                                                    } else {
                                                                        setShouldRedirect(true)
                                                                        return `Batch Restore Started : ${data!.success}`
                                                                    }
                                                                },
                                                                error: 'An unexpected error occurred',
                                                            })
                                                        });
                                                    }}
                                                >
                                                    Restored {batch_restore_images_length} images
                                                </Button>
                                            </div>
                                        )
                                    }
                                </CardContent>
                            </Card>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default BatchSetting