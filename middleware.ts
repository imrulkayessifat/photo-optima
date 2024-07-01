import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const shop = request.cookies.get('shop')

    const response = NextResponse.next()
    return response
}
