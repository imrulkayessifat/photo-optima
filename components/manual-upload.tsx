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

const ManualUpload = () => {
    const searchParams = useSearchParams();
    const shop = searchParams.get('shop');
    
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof UploadImageFormSchema>>({
        resolver: zodResolver(UploadImageFormSchema),
        defaultValues: {
            image: ''
        }
    });

    const uploading = async (e: any) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const data = await uploadFile(
                file,
                {
                    publicKey: 'c0bc9dbd97f5de75c062',
                    store: 'auto',
                    metadata: {
                        subsystem: 'js-client',
                        pet: 'NOTCOMPRESSED'
                    }
                }
            )

            if (!data.uuid) {
                return { error: `something went wrong` }
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