"use client"

import { useSearchParams } from 'next/navigation';


import * as z from "zod"
import { toast } from "sonner";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { uploadFile } from '@uploadcare/upload-client'

import {
    Form,
    FormLabel,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { UploadImageFormSchema } from "@/lib/schemas"
import { useUploadImage } from '@/hooks/use-upload-image';
import { useStore } from "@/hooks/compress-status";
import { useComressImage } from "@/hooks/use-compress-image";

interface ManualUploadProps {
    storeName: string;
    plan: string;
}

const ManualUpload: React.FC<ManualUploadProps> = ({
    storeName,
    plan
}) => {
    const searchParams = useSearchParams();
    const shop = searchParams.get('shop');

    const [isPending, startTransition] = useTransition();
    const setImageStatus = useStore(state => state.setImageStatus);
    const mutation = useUploadImage()
    const mutationCompress = useComressImage()

    const form = useForm<z.infer<typeof UploadImageFormSchema>>({
        resolver: zodResolver(UploadImageFormSchema),
        defaultValues: {
            image: ''
        }
    });

    const uploading = async (e: any) => {
        const file = e.target.files && e.target.files[0];

        if (file) {

            const data = await mutation.mutateAsync(file)

            if (!data.uuid) {
                return { error: `something went wrong` }
            }

            const imageRes = await fetch(`http://localhost:3001/image/${data.uuid}`);
            const imageData = await imageRes.json();

            console.log(imageData)
            if (imageData.data.id && plan !== 'FREE') {
                setImageStatus(imageData.data.id, 'ONGOING');
                const response = await fetch(`http://localhost:3001/image/compress-image`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: imageData.data.id,
                        productid: imageData.data.productId,
                        url: imageData.data.url,
                        storeName: storeName
                    })
                });
                const data = await response.json()
                if (response.ok && data) {
                    const data = await mutationCompress.mutateAsync(imageData.data.id)
                }
            }
            return { success: "Successfully image uploaded!" };
        }
        return { error: `something went wrong` }
    };

    return (
        <div
            className='mx-auto px-8'
        >
            <Form {...form}>
                <form className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Manual Upload
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="picture"
                                        disabled={isPending}
                                        type="file"
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                            startTransition(() => {
                                                const promise = uploading(e)

                                                toast.promise(promise, {
                                                    loading: 'Uploading Image...',
                                                    success: (data) => {
                                                        if (data!.error) {
                                                            return `Uploading Image failed: ${data!.error}`
                                                        } else {
                                                            return `Uploading Image successful: ${data!.success}`
                                                        }
                                                    },
                                                    error: 'An unexpected error occurred',
                                                })
                                                form.reset()
                                            });
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </form>
            </Form>
        </div>
    )
}

export default ManualUpload