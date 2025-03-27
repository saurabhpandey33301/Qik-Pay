"use client";

import { useState } from "react";
import { OnRampTransactions } from "./OnRampTransactions";
import { P2PTransactions } from "./P2Ptransaction";

export default function TxnClient({ transactionsA, transactionsB, transactionsC }: { 
    transactionsA: any[]; 
    transactionsB: any[]; 
    transactionsC: any[]; 
}) {
    const [selectedType, setSelectedType] = useState(1);

    return (
        <div className="p-4 flex flex-col gap-6">
            {/* Transaction Type Selector */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <label htmlFor="txn-type" className="text-xl font-mono">
                    Transaction Type:
                </label>
                <select
                    id="txn-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(Number(e.target.value))}
                    className="p-2 rounded-lg font-mono text-black w-full sm:w-1/2 bg-white shadow-md"
                >
                    <option value="1">All Transactions</option>
                    <option value="2">Bank Transactions</option>
                    <option value="3">P2P Transactions</option>
                </select>
            </div>

            {/* Transactions Display */}
            <div className="w-full">
                {selectedType === 1 && <P2PTransactions transactions={transactionsC} />}
                {selectedType === 2 && <OnRampTransactions transactions={transactionsA} />}
                {selectedType === 3 && <P2PTransactions transactions={transactionsB} />}
            </div>
        </div>
    );
}
