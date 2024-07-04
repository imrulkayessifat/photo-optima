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

    // const sanitizedHost = Buffer.from(host || '', 'base64').toString('utf-8');
    // console.log("sanitizedHost", sanitizedHost)

    console.log("callback api host : ",host)
    const sanitizedHost = shopify.utils.sanitizeHost(host || "");

    let redirectUrl = `/?shop=${session.shop}&host=${encodeURIComponent(sanitizedHost!)}`;
    console.log("redirectUrl", redirectUrl)
    if (shopify.config.isEmbeddedApp) {
      redirectUrl = await shopify.auth.getEmbeddedAppUrl({
        rawRequest: req,
        rawResponse: new NextResponse(),
      });
    }
    // cookies().set("shop", session.shop, {
    //   maxAge: 60 * 60 * 24 * 7,
    // });

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("shopifySession", session.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // in 1 week
    });
    return response;
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
