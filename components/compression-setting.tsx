"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CustomCompression from "@/components/custom-compression"
import { changeCompressionType } from "@/hooks/change-compression-type"


const FormSchema = z.object({
    compressionType: z.enum(["BALANCED", "CONSERVATIVE", "CUSTOM"], {
        required_error: "You need to select a compression type.",
    }),
})

interface CompressionSettingProp {
    shopifyAccessToken: string;
    jpeg: number;
    png: number;
    others: number;
    store_name: string;
    compressionType: "BALANCED" | "CONSERVATIVE" | "CUSTOM";
}

const CompressionSetting: React.FC<CompressionSettingProp> = ({
    shopifyAccessToken,
    jpeg,
    png,
    others,
    store_name,
    compressionType
}) => {

    const mutation = changeCompressionType({ shopifyAccessToken })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            compressionType: compressionType
        }
    })


    const onSubmit = async (value: z.infer<typeof FormSchema>) => {
        const data = {
            ...value,
            store_name
        }

        const res = await mutation.mutateAsync(data)
    }

    const state = form.watch('compressionType')
    return (
        <>
            <h1 className='font-bold text-base'>COMPRESSION</h1>
            <p className="text-sm">
                Select Default compression settings. All new images will be compressed with selected compression.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="compressionType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <Card>
                                        <CardContent className="p-6">
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-wrap items-center space-y-1"
                                            >
                                                <Card>
                                                    <CardContent className="p-6">
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="BALANCED" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                BALANCED
                                                            </FormLabel>
                                                        </FormItem>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardContent className="p-6">
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="CONSERVATIVE" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                CONSERVATIVE
                                                            </FormLabel>
                                                        </FormItem>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardContent className="p-6">
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="CUSTOM" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                CUSTOM
                                                            </FormLabel>

                                                            <CustomCompression
                                                                shopifyAccessToken={shopifyAccessToken}
                                                                store_name={store_name}
                                                                jpeg={jpeg}
                                                                png={png}
                                                                others={others}
                                                            />
                                                        </FormItem>
                                                    </CardContent>
                                                </Card>
                                            </RadioGroup>
                                        </CardContent>
                                    </Card>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={compressionType === state} type="submit">
                        Save
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default CompressionSetting