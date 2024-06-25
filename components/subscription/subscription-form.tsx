"use client";

import Link from 'next/link'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"

export const SubscriptionSchema = z.object({
  name: z.string(),
  bandwidth: z.number().min(25),
  price: z.number().min(1).multipleOf(0.01)
})

type FormValues = z.input<typeof SubscriptionSchema>

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
}

const SubscriptionForm = ({
  id,
  defaultValues,
  onSubmit,
  disabled
}: Props) => {

  const form = useForm<z.infer<typeof SubscriptionSchema>>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: defaultValues,
  })

  return (
    <div className='flex flex-col gap-3'>
      
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
                    disabled={disabled}
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
                    disabled={disabled}
                    type='number'
                    placeholder="bandwidth"
                    {...field}
                    onChange={event => field.onChange(+event.target.value)}
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
                    disabled={disabled}
                    type='number'
                    placeholder="price"
                    step="0.01"
                    {...field}
                    onChange={event => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={disabled} type="submit">
            {id ? "Save Changes" : "Create Plan"}
          </Button>

        </form>
      </Form>
    </div>
  )

}

export default SubscriptionForm