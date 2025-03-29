"use server"

import * as auth  from '@/app/lib/auth'

export const signOut = async()=>{
    return auth.signOut({redirect:false})
}