"use client";

import Link from 'next/link'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"

const SubscriptionSchema = z.object({
  name: z.string(),
  bandwidth: z.string(),
  price: z.number().min(0)
})

const SubscriptionAdd = () => {

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SubscriptionSchema>>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      name: "",
      bandwidth: '',
    },
  })

  const addSubscriptionPlan = async (data: z.infer<typeof SubscriptionSchema>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscription-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data
      })
    })

    const resData = await res.json();

    if (resData.error) {
      return { error: 'Subscription plan create failed!' }
    }

    return { success: 'Subscription plan create successfully' }
  }

  const onSubmit = (data: z.infer<typeof SubscriptionSchema>) => {
    startTransition(() => {
      const promise = addSubscriptionPlan(data)

      toast.promise(promise, {
        loading: 'Creating Subscription...',
        success: (data) => {
          if (data.error) {
            return `Creating Subscription failed: ${data.error}`
          } else {
            form.reset()
            return `Creating Subscription successful: ${data.success}`
          }
        },
        error: 'An unexpected error occurred',
      })
    });
  }

return (
  <div className='flex flex-col gap-3'>
    <div className="flex justify-between w-2/3">
      <h1 className='text-2xl font-bold'>Add Subscription Plan</h1>
      <Link href={'/dashboard'}>
        <Button className="px-1" variant={'outline'}>
          <IoArrowBackCircleSharp className="w-7 h-7" />
        </Button>
      </Link>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bandwidth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bandwidth</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="bandwidth"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type='number'
                  placeholder="price"
                  {...field}
                  onChange={event => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          Save
        </Button>

      </form>
    </Form>
  </div>
)

}

export default SubscriptionAdd