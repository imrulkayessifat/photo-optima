"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTransition } from "react"
import { useSearchParams } from "next/navigation"

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
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { login } from "@/actions/login"

import { LoginSchema } from "@/lib/schemas"

const Page = () => {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            const promise = login (data,callbackUrl)

            toast.promise(promise,{
                loading:'Login into Account...',
                success:(data)=> {
                    form.reset()
                    if(data?.error) {
                        return `Login failed: ${data?.error}`
                    } else {
                        return `Login successful: ${data?.success}`
                    }
                }
            })
        })
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <Card className="w-2/5 md:w-1/4 h-2/5">
                <CardContent>
                    <Form {...form}>
                        <div className="flex justify-center flex-col items-center my-5">
                            <h2 className="mt-6 text-center text-xl leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                type="email"
                                                placeholder="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                type="password"
                                                placeholder="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </div>
    )
}

export default Page