"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                            const file = e.target.files && e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => {

                                                };
                                                reader.readAsDataURL(file);
                                            }

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