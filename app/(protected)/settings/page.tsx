import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const Page = () => {
    return (
        <div className='mt-24'>
            <div className='flex flex-col gap-7 mx-auto px-8'>
                <h1 className='font-bold text-2xl'>Account</h1>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-lg'>Compression</h1>
                    <p>
                        Select Default compression settings. All new images will be compressed with selected compression.
                    </p>
                    <RadioGroup defaultValue="balanced">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="balanced" id="r1" />
                            <Label htmlFor="r1">Balanced</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="conservative" id="r2" />
                            <Label htmlFor="r2">Conservative</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="r3" />
                            <Label htmlFor="r3">Custom</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-lg'>Automatic compression settings</h1>
                    <p>
                        Which image types do you want to compress when automatic compression is switched ON?
                    </p>
                    <Card>
                        <CardContent className="flex flex-col gap-2 items-center p-6">
                            <p className="text-center">Automatic Compression is available on paid plans only</p>
                            <Button variant="secondary">Upgrade Plan</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center">
                            <CardTitle>Individual</CardTitle>
                        </CardHeader>
                        <Separator className="mb-4" />
                        <CardContent className="flex flex-col items-center">
                            <h1 className='font-bold text-lg'>
                                You choose images to compress
                            </h1>
                            <p>You go through images and compress ones you want.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-lg'>Image rename</h1>
                    <p>
                        View and manage current File Name and Alt Tag templates
                    </p>
                    <Card>
                        <CardContent className="flex flex-col gap-2 items-center p-6">
                            <p className="text-center">Image rename is available on paid plans only</p>
                            <Button variant="secondary">Upgrade Plan</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-lg'>
                        Plan details
                    </h1>
                    <Card>
                        <CardContent className="flex flex-col gap-2 p-6">
                            <p>Plan: <span className="font-bold">Free</span></p>
                            <p>Monthly cost: <span className="font-bold">$0.00</span></p>
                            <p>Monthly quota: <span className="font-bold">25 MB</span></p>
                            <Link href={"/plans"}>
                                <Button variant="secondary">
                                    Explore other plans
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-lg'>
                        Data Processing Agreement
                    </h1>
                    <Card>
                        <CardContent className="flex flex-col gap-2 p-6">
                            <Button variant="secondary">
                                Data Processing Agreement
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page