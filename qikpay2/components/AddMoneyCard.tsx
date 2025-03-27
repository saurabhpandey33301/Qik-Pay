"use client";

import React from "react";
import { Button } from "@/packages/ui/button";
import { Card } from "@/packages/ui/card"
import { Select } from "@/packages/ui/Select";
import { useState } from "react";
import { TextInput } from "@/packages/ui/TextInput";
import { createOnrampTxn } from "../app/lib/actions/createOnrampTxn";

const SUPPORTED_BANKS = [
    { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
    { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" }
];

export const AddMoney = () => {
   
    const [amount, setAmount] = useState("");
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

    const [loading, setLoading] = useState(false);

    const handleAddMoney = async () => {
      setLoading(true); // Start loading
      try {
        await createOnrampTxn(Number(amount)*100, provider); // Simulating a server action
        alert("Bank transfer successful!");
      } catch (error) {
        alert("Error processing transaction.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    return (
        <Card title="Add Money">
            <div className="w-full text-white font-mono font-medium text-lg flex flex-col gap-6">
                
                {/* Amount Input */}
                <TextInput
                    label="Amount:"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(value) => setAmount(value)}
                />

                {/* Bank Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <span className="text-left text-lg">Bank:</span>
                    <Select
                        onSelect={(value) => {
                            const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
                           
                            setProvider(selectedBank?.name || "");
                        }}
                        options={SUPPORTED_BANKS.map(x => ({
                            key: x.name,
                            value: x.name
                        }))}
                    />
                </div>

                {/* Add Money Button */}
                <div className="flex justify-center pt-4">
                    <Button onClick={handleAddMoney} >
                        {loading? <span className="loader"></span> : "Send Money"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};
