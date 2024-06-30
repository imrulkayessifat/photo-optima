export async function GET(request: Request) {
    const url = new URL(request.url)
    const shop = url.searchParams.get("shop");
    const host = url.searchParams.get("host");

    console.log("next api host", host)
    console.log("next api shop",shop)

    return Response.json({ data: shop })
}