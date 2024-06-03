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
import { AutoFileRenameSchema } from "@/lib/schemas"
import { useAutoFileRename } from "@/hooks/use-auto-filerename"

interface AutoFileRenameProps {
    auto_file_rename: boolean;
    store_name: string;
    plan: string;
}

const AutoFileRename: React.FC<AutoFileRenameProps> = ({
    auto_file_rename,
    store_name,
    plan
}) => {

    const mutation = useAutoFileRename()

    const form = useForm<z.infer<typeof AutoFileRenameSchema>>({
        resolver: zodResolver(AutoFileRenameSchema),
        defaultValues: {
            auto_file_rename: auto_file_rename,
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
                            name="auto_file_rename"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-sm">
                                            File Rename
                                        </FormLabel>
                                        <FormDescription className="text-xs">
                                            Automatically File name optimized
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

export default AutoFileRename