"use client"

import { useEffect } from "react";

import { IoIosGitNetwork } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
import { plans, quotas, compare } from "@/lib/data"

interface PlanContextProp {
    localPlan: string;
}

const PlanContext: React.FC<PlanContextProp> = ({
    localPlan
}) => {
    
    const router = useRouter()
    const searchParams = useSearchParams()

    const chargeId = searchParams.get('charge_id')


    const handleSubscribe = async (name: string, price: number) => {
        const res = await fetch('http://localhost:3001/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan: name,
                price: price
            })
        })

        const data = await res.json();
        router.push(data.data.recurring_application_charge.confirmation_url)
    }

    useEffect(() => {
        if (chargeId !== null) {
            localStorage.setItem('charge-id', chargeId)
        }
        const fetchData = async () => {
            const res = await fetch('http://localhost:3001/subscribe/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chargeId: chargeId,
                    storeName: localStorage.getItem('store-name'),
                })
            })
        }

        if (chargeId?.length! > 0) {
            fetchData()
        }
    }, [chargeId])
    return (
        <div className='mt-24'>
            <div className='flex flex-col gap-7 mx-auto px-8'>
                <h1 className='font-bold text-lg'>Plans</h1>
                <Card>
                    <CardContent className="p-6">
                        <p>You have <span className="font-bold">41.5 KB</span> of uncompressed images in your store.</p>
                    </CardContent>
                </Card>
                <div className="flex justify-center gap-5 flex-wrap">
                    {
                        plans.map((plan, key) => (
                            <Card className="w-[350px]" key={key} >
                                <CardHeader className="flex items-center">
                                    <CardTitle>{plan.name}</CardTitle>
                                    <CardDescription className="text-green-500">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    <h1 className="text-2xl font-bold">{plan.bandwidth}</h1>
                                    <p>OF IMAGES PER MONTH</p>
                                </CardContent>
                                <CardFooter className="flex gap-2 justify-between">
                                    {
                                        localPlan === plan.name ? (
                                            <Button disabled className="cursor-not-allowed" variant="secondary">Selected</Button>
                                        ) : (
                                            <Button onClick={() => handleSubscribe(plan.name, plan.price)} variant="secondary">Start compressing</Button>

                                        )
                                    }
                                    <p><span className="font-bold">${plan.price}</span> per month</p>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex gap-3">
                                <IoIosGitNetwork className="w-6 h-6" />
                                Need More Quota?
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex justify-center gap-5 flex-wrap">
                                {
                                    quotas.map((quota, key) => (
                                        <Card className="w-[350px]" key={key} >
                                            <CardHeader className="flex items-center">
                                                <CardTitle>{quota.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex flex-col items-center">
                                                <h1 className="text-2xl font-bold">{quota.bandwidth}</h1>
                                                <p>OF IMAGES PER MONTH</p>
                                            </CardContent>
                                            <CardFooter className="flex gap-2 justify-between">
                                                <Button variant="secondary">Start compressing</Button>
                                                <p><span className="font-bold">${quota.pay}</span> per month</p>
                                            </CardFooter>
                                        </Card>
                                    ))
                                }
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <h1 className="font-bold text-lg text-center">Compare Plans</h1>
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
                                <Button variant={"outline"}>
                                    Free Plan
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant={"outline"}>
                                    Choose Plan
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <h1 className="font-bold text-lg text-center">
                    Frequently Asked Questions
                </h1>
                <Card className="mb-20">
                    <CardContent className="flex flex-col md:flex-row gap-2 justify-between p-6">
                        <div className="flex flex-col gap-2">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div>
                                            Is it possible to upgrade or downgrade my subscription?
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="md:w-[450px]">
                                        <p>
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
                                        <div>
                                            Is it possible to upgrade or downgrade my subscription?
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="md:w-[450px]">
                                        <p>
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