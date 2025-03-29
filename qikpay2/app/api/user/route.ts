
import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";


export const GET = async () => {
    const session = await auth()
    
    if (session && session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}