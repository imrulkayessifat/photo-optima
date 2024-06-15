'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const authenticate = async (data: any) => {
    try {

        await signIn('credentials', data)
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'Something went wrong.'
            }
        }
    }
}