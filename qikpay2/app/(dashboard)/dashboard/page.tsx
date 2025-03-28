
import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";

import { prisma } from "@/index";

import { authOptions } from "@/app/lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {

        return { amount: 0, locked: 0 };
    }
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id) 
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return <div className="flex justify-center items-center text-gray-400 text-lg mt-50">Please login first.</div>;
    }
    const balance = await getBalance();

    return (
        <div className="m-5  flex flex-col gap-6  ">
            {/* Welcome Section */}
            <div className="flex flex-col gap-2 animate-fade-in">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-lime-500">
                    Welcome, {session?.user?.name}
                </h1>
                <p className="text-lg font-mono font-semibold text-lime-300 tracking-wide transform translate-x-2">
                    Pay Fast, Live Free! 🚀
                </p>
            </div>

            {/* Balance Card */}
            <div className="w-full  animate-slide-up">
                <BalanceCard amount={balance?.amount} />
            </div>
        </div>
    );
}
