import Link from "next/link"

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import CompressionSetting from "@/components/compression-setting"
import FileRenameSetting from "@/components/file-rename-setting";
import AltRenameSetting from "@/components/alt-rename-setting";
import { Separator } from "@/components/ui/separator"

const Page = async () => {

    const store_name = await fetch('https://photo-optima.myshopify.com/admin/api/2024-04/shop.json', {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`
        }
    })

    const { shop } = await store_name.json()

    const res = await fetch('http://localhost:3001/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeName: `${shop.domain}`
        })
    })

    const store = await res.json();

    const getFileRenameSetting = await fetch(`http://localhost:3001/filerename/${shop.domain}`);

    const fileRenameSetting = await getFileRenameSetting.json();

    const getAltRenameSetting = await fetch(`http://localhost:3001/altrename/${shop.domain}`);

    const altRenameSetting = await getAltRenameSetting.json();

    return (
        <div className='mt-24'>
            <div className='flex flex-col gap-7 mx-auto px-8'>
                <h1 className='font-bold text-2xl'>Account</h1>
                <Separator />
                <div className='flex flex-col gap-2'>
                    <CompressionSetting
                        jpeg={store.data.jpeg}
                        png={store.data.png}
                        others={store.data.others}
                        store_name={shop}
                        compressionType={store.data.compressionType}
                    />
                    <Separator />
                    <FileRenameSetting
                        storename={shop}
                        product_vendor={fileRenameSetting.filerename.product_vendor}
                        variant_title={fileRenameSetting.filerename.variant_title}
                        product_page_title={fileRenameSetting.filerename.product_page_title}
                        product_type={fileRenameSetting.filerename.product_type}
                        product_barcode={fileRenameSetting.filerename.product_barcode}
                        product_title={fileRenameSetting.filerename.product_title}
                        product_sku={fileRenameSetting.filerename.product_sku}
                    />
                    <Separator />
                    <AltRenameSetting
                        storename={shop}
                        product_vendor={altRenameSetting.altrename.product_vendor}
                        variant_title={altRenameSetting.altrename.variant_title}
                        product_page_title={altRenameSetting.altrename.product_page_title}
                        product_type={altRenameSetting.altrename.product_type}
                        product_barcode={altRenameSetting.altrename.product_barcode}
                        product_title={altRenameSetting.altrename.product_title}
                        product_sku={altRenameSetting.altrename.product_sku}
                    />
                </div>
                <Separator />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-base'>AUTOMATIC COMPRESSION SETTINGS</h1>
                    <p className="text-sm">
                        Which image types do you want to compress when automatic compression is switched ON?
                    </p>
                    <Card>
                        <CardContent className="flex flex-col gap-2 items-center p-6">
                            <p className="text-center text-base">Automatic Compression is available on paid plans only</p>
                            <Button variant="secondary">Upgrade Plan</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center">
                            <CardTitle>Individual</CardTitle>
                        </CardHeader>
                        <Separator className="mb-4" />
                        <CardContent className="flex flex-col items-center">
                            <h1 className='font-bold text-base'>
                                You choose images to compress
                            </h1>
                            <p className="text-sm">You go through images and compress ones you want.</p>
                        </CardContent>
                    </Card>
                </div>
                <Separator />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-base'>Image rename</h1>
                    <p className="text-sm">
                        View and manage current File Name and Alt Tag templates
                    </p>
                    <Card>
                        <CardContent className="flex flex-col gap-2 items-center p-6">
                            <p className="text-center text-sm">Image rename is available on paid plans only</p>
                            <Button variant="secondary">Upgrade Plan</Button>
                        </CardContent>
                    </Card>
                </div>
                <Separator />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-base'>
                        Plan details
                    </h1>
                    <Card>
                        <CardContent className="flex flex-col gap-2 p-6">
                            <p className="text-sm">Plan: <span className="font-bold">Free</span></p>
                            <p className="text-sm">Monthly cost: <span className="font-bold">$0.00</span></p>
                            <p className="text-sm">Monthly quota: <span className="font-bold">25 MB</span></p>
                            <Link href={"/plans"}>
                                <Button variant="secondary">
                                    Explore other plans
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                <Separator />
                <div className='flex flex-col gap-2 mb-5'>
                    <h1 className='font-bold text-base'>
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