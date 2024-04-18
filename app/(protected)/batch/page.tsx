import Link from "next/link"

import {
    Card,
    CardContent,
} from "@/components/ui/card"


const Page = () => {
    return (
        <div className='mt-24'>
            <div className='flex flex-col mx-auto px-8'>
                <h1 className='font-bold text-lg'>Batch Actions</h1>
                <div className="flex flex-col sm:flex-row justify-start gap-5 mt-10">
                    <Card>
                        <CardContent className="px-6 py-20">

                            <p>Batch Compression is available on <Link href="/plans"><span className="text-blue-500 cursor-pointer hover:underline">paid plans</span></Link> only</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="px-6 py-20">
                            <p>Batch Restore is available on <Link href="/plans"><span className="text-blue-500 cursor-pointer hover:underline">paid plans</span></Link> only</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page