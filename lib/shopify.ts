import { createAdminRestApiClient } from '@shopify/admin-api-client';

export const client = createAdminRestApiClient({
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
    apiVersion: '2023-04',
    accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
});
