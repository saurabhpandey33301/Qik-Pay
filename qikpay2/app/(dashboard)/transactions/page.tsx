

import React from "react";



import { prisma } from "@/index";


import TxnClient from "../../../components/txn";
import { auth } from "@/app/lib/auth";


export default async function() {
   
    const session = await auth();
    
    if (!session?.user?.name) {
        return <div className="flex justify-center items-center text-gray-400 text-lg mt-50">Please login first.</div>;
    }

    const transactionsA = await prisma.onRampTransaction.findMany({
        where: {
            userId: (session.user.id),
        },
    });
    const transactionsB = await prisma.p2Ptransaction.findMany({
        where: {
            fromUserId: (session.user.id),
        },
        select:
        {   
            toUserId : true,
            fromUserId : true,
            amount : true,
            timestamp : true,
            User_P2Ptransaction_toUserIdToUser:{
               select :
               {
                name :true
               }
            }
        }
    });

    const formattedTransactionsA = transactionsA.map((t:any) => ({
        time: new Date(t.startTime), // Convert to Date object for proper sorting
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
    
    const formattedTransactionsB = transactionsB.map((t:any) => ({
        time: new Date(t.timestamp), // Convert to Date object for proper sorting
        amount: t.amount,
        status: "UNKNOWN", // Default value
        provider: "N/A", // Default value
        from: t.fromUserId,
        to: t.toUserId,
        name : t.User_P2Ptransaction_toUserIdToUser.name
        
    }));
    
    // Merge both transaction lists
    const allTransactions = [...formattedTransactionsA, ...formattedTransactionsB];
    
    // Sort transactions by latest time first
    allTransactions.sort((a: any, b: any) => b.time.getTime() - a.time.getTime());
    formattedTransactionsA.sort((a: any, b :any) => b.time.getTime() - a.time.getTime());
    formattedTransactionsB.sort((a:any, b:any) => b.time.getTime() - a.time.getTime());

    return(
        <div className="w-full p-3 text-white ">
             <TxnClient transactionsA={formattedTransactionsA} transactionsB={formattedTransactionsB} transactionsC={allTransactions} />
        </div>
    );
}