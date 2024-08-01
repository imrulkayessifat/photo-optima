import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers";

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

function applySetCookie(req: NextRequest, res: NextResponse) {
  // 1. Parse Set-Cookie header from the response
  const setCookies = new ResponseCookies(res.headers);

  // 2. Construct updated Cookie header for the request
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
  //    on a dummy response
  // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

  // 4. Copy the “request header overrides” headers from our dummy response to the real response
  dummyRes.headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, response: NextResponse) {
  
  const requestHeaders = new Headers(request.headers)
  const token = requestHeaders.get("authorization")
  let res = NextResponse.next()
  // console.log("req headers : ",requestHeaders)
  if (token) {
    console.log("decode token : ", jwtDecode(token as string));
    const shop: TokenProps = jwtDecode(token as string)
    res.cookies.set("shop", shop.dest.replace(/^https?:\/\//, ''))
  }
  applySetCookie(request, res);
  return res;

}

export const config = {
  matcher: ['/', '/batch', '/plans', '/settings'],
}
