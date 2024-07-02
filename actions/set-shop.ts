"use server";
import { cookies } from 'next/headers'

export const setShop = async (shop: string) => {
    cookies().set("shop", shop)
}