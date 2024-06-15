"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTransition } from "react"

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

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const Page = () => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const signup = async (data: z.infer<typeof RegisterSchema>) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': `${data.email}`,
                'password': `${data.password}`,
            })
        })

        const resData = await response.json()
        if (resData.error) {
            return { error: resData.error }
        }
        return { success: resData.success }
    }

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            const promise = signup(data)
            toast.promise(promise, {
                loading: 'Creating...',
                success: (data) => {
                    if (data.error) {
                        return `Account Create failed: ${data.error}`
                    } else {
                        form.reset()
                        return `Account Create successful: ${data.success}`
                    }
                },
                error: 'An unexpected error occurred',
            })
        })
    }
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Card className="w-2/5 h-2/5">
                <CardContent>
                    <Form {...form}>
                        <div className="flex justify-center flex-col items-center my-5">
                            <h2 className="mt-6 text-center text-xl leading-9 tracking-tight text-gray-900">
                                Create An Account
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
                                Create an Account
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </div>
    )
}

export default Page