import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url)
    const shop = url.searchParams.get("shop");
    const host = url.searchParams.get("host");

    console.log("next api shop", shop)

    return NextResponse.json({ data: shop }, { status: 200 })
}