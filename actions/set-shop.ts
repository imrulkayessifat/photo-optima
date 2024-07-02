"use server";
import { cookies } from "next/headers";

export const setShop = async (shop: string) => {
    const cookieStore = cookies();
    cookieStore.set("shop", shop)
}