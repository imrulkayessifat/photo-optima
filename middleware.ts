import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode"
import { cookies } from 'next/headers'

interface TokenProps {
    iss: string,
    dest: string,
    aud: string,
    sub: string,
    exp: number,
    nbf: number,
    iat: number,
    jti: string,
    sid: string,
    sig: string
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    const token = requestHeaders.get("authorization")
    console.log("token", token)
    if (token) {
        console.log("decode token : ", jwtDecode(token as string));
        const shop: TokenProps = jwtDecode(token as string)
        cookies().set("shop", shop.dest)
    }

}
