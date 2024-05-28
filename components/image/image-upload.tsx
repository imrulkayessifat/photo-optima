"use client";

import { z } from 'zod'
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadImageFormSchema } from '@/lib/schemas';
// import { uploadImageToShopify } from '@/actions/upload';

interface ImageUploadProps {
    product_id: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    product_id
}) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<ArrayBuffer | null>(null);

    const form = useForm<z.infer<typeof UploadImageFormSchema>>({
        resolver: zodResolver(UploadImageFormSchema),
        defaultValues: {
            image: ''
        }
    })

    const uploadImageToShopify = async (imageBuffer: ArrayBuffer, productId: string) => {
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        const image = {
            product_id: productId,
            attachment: base64Image,
        };
    
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products/${productId}/images.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': `${process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN}`
            },
            body: JSON.stringify({ image })
        })
    
        const data = await response.json();
    
        return data;
    }

    const onSubmit = (data: z.infer<typeof UploadImageFormSchema>) => {
        if (selectedFile !== null) {
            startTransition(() => {
                const promise = uploadImageToShopify(selectedFile, product_id);

                toast.promise(promise, {
                    loading: 'Uploading...',
                    success: (data) => {
                        if (data.error) {
                            return `Uploading: ${data.error}`
                        } else {
                            form.reset();
                            setSelectedFile(null)
                            return `Uploading successful: ${data.success}`
                        }
                    },
                    error: 'An unexpected error occurred',
                })
            });
        } else {
            toast.error('No file selected');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-9 space-y-6">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    id="picture"
                                    type="file"
                                    disabled={isPending}
                                    onChange={(e) => {
                                        field.onChange(e.target.files);

                                        const file = e.target.files && e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                if (reader.result instanceof ArrayBuffer) {
                                                    setSelectedFile(Buffer.from(reader.result));
                                                }
                                            };
                                            reader.readAsArrayBuffer(file);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending || selectedFile === null} type="submit">Send</Button>
            </form>
        </Form>
    )
}

export default ImageUpload