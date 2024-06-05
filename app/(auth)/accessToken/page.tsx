'use client'

import { useSearchParams } from 'next/navigation'
import { setCookie } from 'cookies-next';

const Page = () => {
    const searchParams = useSearchParams()

    const search = searchParams.get('shop')

    if (search) {
        setCookie('search', search!);
    }
    return (
        <div>Page</div>
    )
}

export default Page