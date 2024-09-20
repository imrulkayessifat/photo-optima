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
        callback: async (_topic, shop, _body) => {
         
          await AppInstallations.delete(shop);
        },
      },
    });
   
  } else {
    
  }
}

export async function registerWebhooks(session: Session) {


  addHandlers();
  const responses = await shopify.webhooks.register({ session });

}
