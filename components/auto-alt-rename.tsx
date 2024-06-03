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
import { AutoAltRenameSchema } from "@/lib/schemas"
import { useAutoAltRename } from "@/hooks/use-auto-altrename"

interface AutoAltRenameProps {
    auto_alt_rename: boolean;
    store_name: string;
    plan: string;
}

const AutoAltRename: React.FC<AutoAltRenameProps> = ({
    auto_alt_rename,
    store_name,
    plan
}) => {

    const mutation = useAutoAltRename()

    const form = useForm<z.infer<typeof AutoAltRenameSchema>>({
        resolver: zodResolver(AutoAltRenameSchema),
        defaultValues: {
            auto_alt_rename: auto_alt_rename,
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
                            name="auto_alt_rename"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-sm">
                                            Alt Rename
                                        </FormLabel>
                                        <FormDescription className="text-xs">
                                            Automatically Alt name optimized
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={plan === 'FREE'}
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

export default AutoAltRename