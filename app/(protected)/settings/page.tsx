import Link from "next/link"
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import CompressionSetting from "@/components/compression-setting"
import { Separator } from "@/components/ui/separator"

const Page = async () => {
    const cookieStore = cookies()
    const shop = cookieStore.get('shop')!.value

    const res = await fetch('http://localhost:3001/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeName: `${shop}`
        })
    })

    const store = await res.json();

    return (
        <div className='mt-24'>
            <div className='flex flex-col gap-7 mx-auto px-8'>
                <h1 className='font-bold text-2xl'>Account</h1>
                <div className='flex flex-col gap-2'>
                    <CompressionSetting
                        jpeg={store.data.jpeg}
                        png={store.data.png}
                        others={store.data.others}
                        store_name={shop}
                        compressionType={store.data.compressionType}
                    />
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