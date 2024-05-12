"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { uploadFile } from '@uploadcare/upload-client'

import {
    Form,
    FormLabel,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UploadImageFormSchema } from "@/lib/schemas"

const ManualUpload = () => {
    const form = useForm<z.infer<typeof UploadImageFormSchema>>({
        resolver: zodResolver(UploadImageFormSchema),
        defaultValues: {
            image: ''
        }
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            // const reader = new FileReader();
            // reader.onload = () => {
            //     const imageDataUrl = reader.result as string;
            //     console.log("image url : ",imageDataUrl)
            //     // Save image data to localStorage
            //     localStorage.setItem('uploadedImage', imageDataUrl);
            //     // Trigger form field change
            //     form.setValue('image', imageDataUrl);
            // };
            // reader.readAsDataURL(file);
            const result = await uploadFile(
                file,
                {
                    publicKey: 'c0bc9dbd97f5de75c062',
                    store: 'auto',
                    metadata: {
                        subsystem: 'js-client',
                        pet: 'cat'
                    }
                }
            )
            console.log(result)
        }
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
                                        type="file"
                                        onChange={handleImageChange}
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