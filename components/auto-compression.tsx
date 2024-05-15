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

const AutoCompression = () => {


    // const [plan, setPlan] = useState('FREE')


    const form = useForm<z.infer<typeof AutoCompressionSchema>>({
        resolver: zodResolver(AutoCompressionSchema),
        defaultValues: {
            auto_compression: false,
        },
    })

    useEffect(() => {
        const store_name = localStorage.getItem('store-name')
        const fetchPlan = async () => {
            const res = await fetch('http://localhost:3001/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeName: `${store_name}`
                })
            })
            const data = await res.json()

            form.setValue('auto_compression', data.data.autoCompression)

        }
        fetchPlan()
    }, [])

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
                                                onCheckedChange={(newValue) => {
                                                    field.onChange(newValue);
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