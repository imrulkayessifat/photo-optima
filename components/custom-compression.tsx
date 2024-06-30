"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FiEdit } from "react-icons/fi";

import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormDescription,
    FormItem,
} from "@/components/ui/form"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider"
import { changeCustomCompressionType } from "@/hooks/change-custom-compression-type";

const CustomCompressionFormSchema = z.object({
    jpeg: z.number().min(65).max(95),
    png: z.number().min(65).max(95),
    others: z.number().min(65).max(95)
})

interface CustomCompressionProps {
    shopifyAccessToken:string;
    store_name: string;
    jpeg: number;
    png: number;
    others: number;
}

const CustomCompression: React.FC<CustomCompressionProps> = ({
    shopifyAccessToken,
    store_name,
    jpeg,
    png,
    others,
}) => {

    const mutation = changeCustomCompressionType({shopifyAccessToken})

    const form = useForm<z.infer<typeof CustomCompressionFormSchema>>({
        resolver: zodResolver(CustomCompressionFormSchema),
        defaultValues: {
            jpeg: jpeg,
            png: png,
            others: others,
        }
    })

    const onSubmit = async () => {
        const data = {
            'jpeg': form.watch('jpeg'),
            'png': form.watch('png'),
            'others': form.watch('others'),
            store_name
        }

        const res = await mutation.mutateAsync(data)
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <FiEdit className="w-5 h-5 cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-between">
                        <AlertDialogTitle>Choose quality</AlertDialogTitle>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </div>
                    <Separator />
                    <AlertDialogDescription>
                        <Form {...form}>
                            <form
                                className="w-full space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="jpeg"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>JPEG quality</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    className='my-3'
                                                    onValueChange={value => {
                                                        field.onChange(value[0]);
                                                    }}
                                                    min={65}
                                                    max={95}
                                                    step={1}
                                                    defaultValue={[jpeg]}
                                                />
                                            </FormControl>
                                            <FormDescription>{form.watch('jpeg')}</FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="png"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>PNG quality</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    className='my-3'
                                                    onValueChange={value => {
                                                        field.onChange(value[0]);
                                                    }}
                                                    min={65}
                                                    max={95}
                                                    step={1}
                                                    defaultValue={[png]}
                                                />
                                            </FormControl>
                                            <FormDescription>{form.watch('png')}</FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="others"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>OTHERS quality</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    className='my-3'
                                                    onValueChange={value => {
                                                        field.onChange(value[0]);
                                                    }}
                                                    min={65}
                                                    max={95}
                                                    step={1}
                                                    defaultValue={[others]}
                                                />
                                            </FormControl>
                                            <FormDescription>{form.watch('others')}</FormDescription>
                                        </FormItem>
                                    )}
                                />

                                {/* <Button type="submit">
                                    Save
                                </Button> */}
                                <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
                            </form>
                        </Form>
                    </AlertDialogDescription>
                </AlertDialogHeader>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomCompression