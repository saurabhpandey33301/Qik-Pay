
import { getServerSession } from "next-auth";
import React from "react";



import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { authOptions } from "../../lib/auth";
import TxnClient from "../../../components/txn";


export default async function() {
   
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
        return <div>Please log in to view transactions.</div>;
    }

    const transactionsA = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session.user.id),
        },
    });
    const transactionsB = await prisma.p2Ptransaction.findMany({
        where: {
            fromUserId: Number(session.user.id),
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