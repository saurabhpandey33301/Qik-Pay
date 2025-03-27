import { Card } from "@/packages/ui/card";
import React from "react";
export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center font-mono pb-8 pt-8 text-gray-500">
          No Recent Transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-center p-4 bg-slate-900 rounded-lg shadow-md hover:bg-slate-800 transition"
          >
            {/* Left Side: Transaction Info */}
            <div className="text-center sm:text-left">
              <div className="text-white text-lg font-semibold">{t.provider}</div>
              <Status status={t.status} />
              <div className="text-slate-400 text-xs">{t.time.toDateString()}</div>
            </div>

            {/* Right Side: Amount */}
            <div className="mt-2 sm:mt-0">
              <Amt amount={t.amount} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const Amt = ({ amount }: { amount: number }) => {
  return (
    <span
      className={`font-mono text-lg ${
        amount > 0 ? "text-green-500" : "text-red-500"
      }`}
    >
      {amount > 0 ? `+₹${amount / 100}` : `-₹${Math.abs(amount) / 100}`}
    </span>
  );
};

const Status = ({ status }: { status: string }) => {
  return (
    <div
      className={`text-sm font-semibold ${
        status === "Success" ? "text-green-400" : "text-red-400"
      }`}
    >
      {status}
    </div>
  );
};
