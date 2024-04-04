"use client"

import { z } from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { IoMdArrowBack } from "react-icons/io"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { create } from "@/actions/product/create"
import { ProductCreatechema } from "@/lib/schemas"
import { Separator } from "@/components/ui/separator"

const ProductCreate = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductCreatechema>>({
    resolver: zodResolver(ProductCreatechema),
    defaultValues: {
      title: "",
      vendor:"storename3122",
      // status:"draft",
      // product_type:"Snowboard",
      // body_html:"<strong>Good!</strong>",
      // metafields: [
      //   {
      //     key: "new",
      //     value: "newvalue",
      //     value_type: "string",
      //     namespace: "global"
      //   }
      // ]
    },
  })

  const onSubmit = (product: z.infer<typeof ProductCreatechema>) => {
    startTransition(() => {
      const promise = create(product)

      toast.promise(promise, {
        loading: 'Creating...',
        success: (data) => {
          if (data.error) {
            return `Creating: ${data.error}`
          } else {
            form.reset();
            return `Creating successful: ${data.success}`
          }
        },
        error: 'An unexpected error occurred',
      })
    });
  }

  return (
    <div className="flex flex-col gap-3 px-8">
      <div className='flex items-center justify-between'>
        <Heading
          title={`Create Product`}
          description="Create Product for Asd of Admin Panel"
        />
        <Link href={'/products'}>
          <Button variant={"outline"}>
            <IoMdArrowBack className='w-7 h-7' />
          </Button>
        </Link>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="title" {...field} />
                </FormControl>
                <FormDescription>
                  Add Product Title Name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductCreate