import { DeliveryMethod, Session } from "@shopify/shopify-api";
import { setupGDPRWebHooks } from "@/helpers/gdpr";
import shopify from "./initialize-context";
import { AppInstallations } from "@/lib/db/app-installations";

let webhooksInitialized = false;

export function addHandlers() {
  if (!webhooksInitialized) {
    webhooksInitialized = true;
    setupGDPRWebHooks("/api/webhooks");
    shopify.webhooks.addHandlers({
      ["APP_UNINSTALLED"]: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        // callback: async (_topic, shop, _body) => {
        //   console.log("Uninstalled app from shop: " + shop);
        //   await AppInstallations.delete(shop);
        // },
      },
    });
    shopify.webhooks.addHandlers({
      PRODUCTS_CREATE: [{
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "https://app1.photooptima.com/webhooks/product/create",
      }],
      PRODUCTS_UPDATE: [{
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "https://app1.photooptima.com/webhooks/product/update",
      }],
    });
    
    console.log("Added handlers");
  } else {
    console.log("Handlers already added");
  }
}

export async function registerWebhooks(session: Session) {

  console.log("registerWebhooks :", session)
  addHandlers();
  const responses = await shopify.webhooks.register({ session });
  console.log("Webhooks added", responses);
}
