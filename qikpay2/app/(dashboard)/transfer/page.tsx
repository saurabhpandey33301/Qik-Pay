
import React from "react";
import { AddMoney } from "../../../components/AddMoneyCard";
import { auth } from "@/app/lib/auth";



export default async function TransferPage() {
    const session = await auth()

    if (!session?.user?.name) {
        return (
            <div className="flex justify-center items-center text-gray-400 text-lg mt-50">
                Please login first.
            </div>
        );
    }
   
    return <div className="w-full min-h-screen flex flex-col items-center justify-start py-20  px-4">
    <div className="w-full max-w-md">
        <AddMoney />
    </div>
</div>

           
        
    
}