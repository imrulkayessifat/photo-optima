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
    shopifyAccessToken:string;
    auto_compression: boolean;
    store_name: string;
    plan: string;
    bandwidth: number;
    dataUsed: number;
}

const AutoCompression: React.FC<AutoCompressionProps> = ({
    shopifyAccessToken,
    auto_compression,
    store_name,
    plan,
    bandwidth,
    dataUsed
}) => {

    const mutation = useAutoCompression({shopifyAccessToken})

    const form = useForm<z.infer<typeof AutoCompressionSchema>>({
        resolver: zodResolver(AutoCompressionSchema),
        defaultValues: {
            auto_compression: auto_compression,
            store_name: store_name
        },
    })



    return (
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
                                        <FormLabel className="text-sm">
                                            Image Compression
                                        </FormLabel>
                                        <FormDescription className="text-xs">
                                            Automatically compress your store image
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={plan === 'FREE' || bandwidth < dataUsed || mutation.isPending}
                                            checked={field.value}
                                            onCheckedChange={async (newValue) => {
                                                field.onChange(newValue);

                                                const data = form.getValues();

                                                const res = await mutation.mutateAsync(data)

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
    )
}

export default AutoCompression