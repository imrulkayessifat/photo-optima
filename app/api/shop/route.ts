import { NextResponse } from "next/server";
export async function GET(req: Request,res:Response) {
    const url = new URL(req.url);
    const shop = url.searchParams.get("shop");
    const host = url.searchParams.get("host");

    return NextResponse.json({ data: shop }, { status: 200 });
}