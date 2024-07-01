import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookieStore = cookies()

    const allCookies = request.cookies.getAll()
    console.log("cookies : ",allCookies)
    const response = NextResponse.next()
    return response
}
