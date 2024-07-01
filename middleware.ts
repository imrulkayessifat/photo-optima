import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const shop = request.cookies.get('shop')

    const authUrl = `${process.env.NEXT_PUBLIC_HOST}/api/auth/callback`
    if(!shop){
        window.open(authUrl, "_top");
    }
    const response = NextResponse.next()
    return response
}
