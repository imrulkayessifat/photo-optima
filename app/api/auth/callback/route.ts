import { storeSession } from "@/lib/db/session-storage";
import shopify from "@/lib/shopify/initialize-context";
import {
  CookieNotFound,
  InvalidOAuthError,
  InvalidSession,
  Session,
} from "@shopify/shopify-api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { beginAuth } from "../auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");

  console.log("host", host)

  // todo: validate hmac

  if (!shop) {
    throw new Error("No shop provided");
  }

  try {
    const callbackResponse = await shopify.auth.callback<Session>({
      rawRequest: req,
    });

    const { session } = callbackResponse;

    if (!session || !session.accessToken) {
      throw new Error("Could not validate auth callback");
    }

    await storeSession(session);

    await shopify.webhooks.register({ session });

    if (!host || host == null) {
      return new NextResponse("Missing host parameter", { status: 400 });
    }

    const sanitizedHost = shopify.utils.sanitizeHost(host || "");
    console.log("sanitizedHost", sanitizedHost)


    let redirectUrl = `/?shop=${session.shop}&host=${encodeURIComponent(sanitizedHost!)}`;
    console.log("redirectUrl", redirectUrl)
    if (shopify.config.isEmbeddedApp) {
      redirectUrl = await shopify.auth.getEmbeddedAppUrl({
        rawRequest: req,
        rawResponse: new NextResponse(),
      });
    }
    cookies().set("shop", session.shop, {
      maxAge: 60 * 60 * 24 * 7,
    });

    const getAccessToken = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'client_id': `${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}`,
        'client_secret': `${process.env.NEXT_PUBLIC_SHOPIFY_API_SECRET}`,
        'grant_type': 'client_credentials'
      })
    })

    const getAccessTokenRes = await getAccessToken.json();

    const productsReq = await fetch(`https://${shop}/admin/api/2024-04/products.json`, {
      headers: {
        'X-Shopify-Access-Token': `${getAccessTokenRes.access_token}`,
      },
    })

    const { products } = await productsReq.json();

    for (const product of products) {

      const { id, images } = product

      const productExits = await db.product.findFirst({
        where: {
          id: id.toString()
        }
      })

      if (!productExits) {
        const productRes = await db.product.create({
          data: {
            id: id.toString(),
            storename: shop,
            title: product.title,
          }
        })
      }

      for (const image of images) {
        const { id: imageId, src: url, alt } = image
        const imageIdStr = imageId.toString();
        const newUrl = new URL(url);
        const name = newUrl.pathname.split('/').pop() || null;

        const imageExist = await db.image.findFirst({
          where: {
            id: imageIdStr
          }
        })

        if (!imageExist) {
          const imageRes = await db.image.create({
            data: {
              id: imageIdStr,
              url,
              name,
              fileRename: false,
              altRename: false,
              productId: id.toString(),
              status: 'NOT_COMPRESSED'
            }
          })
        }

      }

    }

    return NextResponse.redirect(redirectUrl);
  } catch (e: any) {
    console.warn(e);
    switch (true) {
      case e instanceof InvalidOAuthError:
        return new NextResponse(e.message, { status: 403 });
      case e instanceof CookieNotFound:
      case e instanceof InvalidSession:
        // This is likely because the OAuth session cookie expired before the merchant approved the request
        return beginAuth(shop!, req, false);
      default:
        return new NextResponse("An error occurred", { status: 500 });
    }
  }
}
