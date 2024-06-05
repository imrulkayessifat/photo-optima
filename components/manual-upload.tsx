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
import { useFileRename } from '@/hooks/use-file-rename';
import { useAltRename } from '@/hooks/use-alt-rename';

interface ManualUploadProps {
    auto_compression: boolean;
    autoFileRename: boolean;
    autoAltRename: boolean;
    storeName: string;
    plan: string;
}

const ManualUpload: React.FC<ManualUploadProps> = ({
    auto_compression,
    autoFileRename,
    autoAltRename,
    storeName,
    plan
}) => {
    const searchParams = useSearchParams();
    const shop = searchParams.get('shop');

    const [isPending, startTransition] = useTransition();
    const setImageStatus = useStore(state => state.setImageStatus);
    const mutation = useUploadImage()
    const mutationCompress = useComressImage()
    const mutationFileRename = useFileRename()
    const mutationAltRename = useAltRename();

    const form = useForm<z.infer<typeof UploadImageFormSchema>>({
        resolver: zodResolver(UploadImageFormSchema),
        defaultValues: {
            image: ''
        }
    });

    const uploading = async (e: any) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            try {
                const imageData = await mutation.mutateAsync(file);
                
                if (imageData.id && plan !== 'FREE' && auto_compression === true) {
                    setImageStatus(imageData.id, 'ONGOING');
                    const response = await fetch(`http://localhost:3001/image/compress-image`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: imageData.id,
                            productid: imageData.productId,
                            url: imageData.url,
                            storeName: storeName,
                        }),
                    });

                    const responseData = await response.json();
                    if (response.ok && responseData) {
                        await mutationCompress.mutateAsync(imageData.id);
                    }
                }

                if (imageData.id && plan !== 'FREE' && autoFileRename === true) {
                    const data = await mutationFileRename.mutateAsync({
                        id: imageData.id,
                        storeName: storeName
                    })
                }

                if (imageData.id && plan !== 'FREE' && autoAltRename === true) {
                    const data = await mutationAltRename.mutateAsync({
                        id: imageData.id,
                        storeName: storeName
                    })
                }

                return { success: "Successfully image uploaded!" };
            } catch (error) {
                return { error: `Something went wrong` };
            }
        }

        return { error: `Something went wrong` };
    };

    return (
        <div
            className='mx-auto px-8'
        >
            <Form {...form}>
                <form className="w-full md:w-1/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm'>
                                    Manual Upload
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="picture"
                                        disabled={isPending}
                                        className='text-xs'
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