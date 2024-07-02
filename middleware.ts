import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    const token = requestHeaders.get("authorization")
    console.log("token", token)
    if (token) {
        console.log("decode token : ", jwtDecode(token as string));
    }

}
