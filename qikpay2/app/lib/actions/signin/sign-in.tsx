"use server"

import * as auth  from '@/app/lib/auth'

export const signIn = async()=>{
    return auth.signIn()
}