"use client"

import { IoIosGitNetwork } from "react-icons/io";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { quotas, compare } from "@/lib/data"
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/loader";
import { useStoreData } from '@/hooks/use-store-data';
import { useGetSubscriptionPlans } from "@/hooks/subscription-plan/use-get-subscription-plan";

interface PlanContextProp {

    shop: string;
    access_token: string;
}

interface SubscriptionPlan {
    id: number;
    name: string;
    bandwidth: string;
    price: number
}

const PlanContext: React.FC<PlanContextProp> = ({

    shop,
    access_token
}) => {
    const { data: store, isLoading } = useStoreData({ shop, access_token });
    const { data: plans, isLoading: isLoading1 } = useGetSubscriptionPlans()

    if (!shop) {
        return (
            <div className="text-sm mx-auto px-8 my-10">
                No shop available....
            </div>
        )
    }

    if (isLoading || isLoading1) {
        return (
            <div className="text-sm mx-auto px-8 my-10">
                <Loader />
            </div>
        )
    }

    const handleSubscribe = async (name: string, price: number) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan: name,
                price: price,
                shop: shop
            })
        })

        const data = await res.json();
        const confirmationUrl = data.data.recurring_application_charge.confirmation_url
        window.open(confirmationUrl, "_top");
    }

    return (
        <div className='mt-24'>
            <div className='flex flex-col gap-7 mx-auto px-8'>
                <h1 className='font-bold text-base'>Plans</h1>
                <Separator />
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm">You have <span className="font-bold">41.5 KB</span> of uncompressed images in your store.</p>
                    </CardContent>
                </Card>
                <div className="flex justify-center gap-5 flex-wrap">
                    {
                        plans.map((plan: SubscriptionPlan) => (
                            <Card className="w-[350px]" key={plan.id} >
                                <CardHeader className="flex items-center">
                                    <CardTitle className="text-base">{plan.name}</CardTitle>
                                    {/* <CardDescription className="text-green-500 text-sm">{plan.description}</CardDescription> */}
                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    <h1 className="text-sm font-bold">
                                        {parseInt(plan.bandwidth) < 1024 ? `${parseInt(plan.bandwidth)} MB` : `${parseInt(plan.bandwidth) / 1024} GB`}
                                    </h1>
                                    <p className="text-sm">OF IMAGES PER MONTH</p>
                                </CardContent>
                                <CardFooter className="flex gap-2 justify-between">
                                    {
                                        store.plan === plan.name ? (
                                            <Button disabled className="cursor-not-allowed" >Selected</Button>
                                        ) : (
                                            <Button onClick={() => handleSubscribe(plan.name, plan.price)}>Start compressing</Button>

                                        )
                                    }
                                    <p><span className="text-sm font-bold">${plan.price}</span> per month</p>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
                <Separator />
                {/* <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex text-base gap-3">
                                <IoIosGitNetwork className="w-5 h-5" />
                                Need More Quota?
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-center gap-5 flex-wrap">
                                {
                                    quotas.map((quota, key) => (
                                        <Card className="w-[350px]" key={key} >
                                            <CardHeader className="flex items-center">
                                                <CardTitle className="text-base">{quota.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex flex-col items-center">
                                                <h1 className="text-sm font-bold">{quota.bandwidth}</h1>
                                                <p className="text-sm">OF IMAGES PER MONTH</p>
                                            </CardContent>
                                            <CardFooter className="flex gap-2 justify-between">
                                                {
                                                    store.plan === quota.name ? (
                                                        <Button disabled className="cursor-not-allowed" >Selected</Button>
                                                    ) : (
                                                        <Button onClick={() => handleSubscribe(quota.name, quota.price)}>Start compressing</Button>

                                                    )
                                                }
                                                <p><span className="text-sm font-bold">${quota.price}</span> per month</p>
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion> */}
                <h1 className="font-bold text-base text-center">Compare Plans</h1>
                <Table>
                    <TableCaption>A list of photo optima features.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Features</TableHead>
                            <TableHead>Free Plan</TableHead>
                            <TableHead>Paid Plans</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            compare.map((data, key) => (
                                <TableRow key={key}>
                                    <TableCell className="font-bold">{data.feature}</TableCell>
                                    <TableCell>{data.free}</TableCell>
                                    <TableCell>{data.paid}</TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>
                            <TableCell className="font-bold"></TableCell>
                            <TableCell>
                                <Button >
                                    Free Plan
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button>
                                    Choose Plan
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Separator />
                <h1 className="font-bold text-base text-center">
                    Frequently Asked Questions
                </h1>
                <Card className="mb-20">
                    <CardContent className="flex flex-col md:flex-row gap-2 justify-between p-6">
                        <div className="flex flex-col gap-2">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div className="text-base">
                                            Is it possible to upgrade or downgrade my subscription?
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="md:w-[450px]">
                                        <p className="text-sm">
                                            Absolutely! Simply open the Crush.pics app, click “Upgrade Plan” in the top right section of the app dashboard and choose the plan you’d like. Once selected you’ll be prompted by Shopify to complete the process.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div className="text-base">
                                            Is it possible to upgrade or downgrade my subscription?
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="md:w-[450px]">
                                        <p className="text-sm">
                                            Absolutely! Simply open the Crush.pics app, click “Upgrade Plan” in the top right section of the app dashboard and choose the plan you’d like. Once selected you’ll be prompted by Shopify to complete the process.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PlanContext