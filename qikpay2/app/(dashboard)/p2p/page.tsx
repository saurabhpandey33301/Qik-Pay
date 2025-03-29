

import React from "react";
import { prisma } from "@/index";
import P2Plist from "../../../components/P2Plist";
import { auth } from "@/app/lib/auth";


async function list(){
    
    const Users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email : true,
        },
    })
    const AllUser = Users.map((user:any) => {
        return {
            id: user.id,
            name: user.name,
            number: user.number,
            email: user.email,
        }
    })
    return AllUser;
}

export default async function() {
    const session = await auth()
 
    if (!session?.user?.name) {
        return (
            <>
            <div className="flex justify-center items-center text-gray-400 text-lg mt-50">Please login first.</div>;
            </>
        )
        
    }
    const Alluser = await list();
    return <div className="w-full">
        <P2Plist Alluser={Alluser}></P2Plist>
    </div>
}