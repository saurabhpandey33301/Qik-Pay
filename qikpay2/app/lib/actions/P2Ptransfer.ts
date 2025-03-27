"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@/index";

export async function P2Ptransfer(to : string, amount : number) {
    // Implement P2P transfer here
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return{
            status: 401,
            message: "Not authorized"
        }
    }
    const toUser  = await prisma.user.findFirst({
        where:{
            number: to
        }
    })
    if(!toUser){
        return{
            status: 404,
            message: "User not found"
        }
    }
    await prisma.$transaction(async(tx:any)=>{
        //locking in database during transaction
        //make transaction sequential and only allow second transaction after first transaction is completed or failed.
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where:{
                userId : Number(from)
            }
        });
        if(!fromBalance || fromBalance.amount < amount ){
            throw new Error("Insufficient balance")
        }
        await tx.balance.update({
            where:{
                userId: Number(from)
            },
            data:{
                amount:{
                    decrement: amount
                }
            }
        })
        await tx.balance.upsert({
            where:{
                userId: toUser.id
            },
            update:{},
            create:{
                userId: toUser.id,
                amount: 0,
                locked: 0
            }
        })
        await tx.balance.update({
            where:{
                userId: toUser.id
            },
            data:{
                amount:{
                    increment: amount
                }
            }
        })
        await tx.p2Ptransaction.create({
            data:{
                fromUserId: Number(from),
                toUserId: toUser.id,
                amount: -amount,
                timestamp: new Date()
            }
        })
        await tx.p2Ptransaction.create({
            data:{
                fromUserId: Number(toUser.id),
                toUserId: Number(from),
                amount: +amount,
                timestamp: new Date()
            }
        })
    })
    
}