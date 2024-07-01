import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { cookies } from "next/headers";
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookieStore = cookies()

    console.log("shop in middleware : ",cookieStore.get("shop"))
  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}