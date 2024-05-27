"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { AutoCompressionSchema } from "@/lib/schemas"
import { useAutoCompression } from "@/hooks/use-auto-compression"

interface AutoCompressionProps {
    auto_compression: boolean;
    store_name: string;
}

const AutoCompression: React.FC<AutoCompressionProps> = ({
    auto_compression,
    store_name
}) => {

    const mutation = useAutoCompression()

    const form = useForm<z.infer<typeof AutoCompressionSchema>>({
        resolver: zodResolver(AutoCompressionSchema),
        defaultValues: {
            auto_compression: auto_compression,
            store_name: store_name
        },
    })



    return (
        <div className='mx-auto px-8 my-10'>
            <Form {...form}>
                <form className="w-full space-y-8">
                    <div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="auto_compression"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Image Compression
                                            </FormLabel>
                                            <FormDescription>
                                                Automatically compress your store image
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={async (newValue) => {
                                                    field.onChange(newValue);

                                                    const data = form.getValues();

                                                    const res = await mutation.mutateAsync(data)

                                                    // const updateAutoCompression = await fetch('http://localhost:3001/store', {
                                                    //     method: 'PUT',
                                                    //     headers: {
                                                    //         'Content-Type': 'application/json',
                                                    //     },
                                                    //     body: JSON.stringify(data)
                                                    // })

                                                }
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AutoCompression