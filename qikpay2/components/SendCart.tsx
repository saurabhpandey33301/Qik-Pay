// "use client"

// import { Button } from "@repo/ui/button";
// import { Card } from "@repo/ui/card";
// import { Center } from "@repo/ui/center";
// import { TextInput } from "@repo/ui/textinput";
// import { useState } from "react";
// import { P2Ptransfer } from "../app/lib/actions/P2Ptransfer";
// import { useSearchParams } from "next/navigation";

// export default function SendCart (){
    
//     const [amt , setAmt ] = useState("");
//     const [loading , setLoading] = useState(false);
//     const searchParams = useSearchParams();
//     const number = searchParams.get("number");
//     const name = searchParams.get("name");
    
//     return (
        
//           <div className="flex justify-center items-center w-full h-full">
//              <Center>
//                 <Card title={`Send to ${name}`}>
//                     <div>
                        
//                         <TextInput placeholder={"Amount"} label="Amount"  value={amt} onChange={(value)=>{
//                             setAmt(value);
//                         }} />
//                         <div className="w-full flex justify-center mt-5 ">
//                         <Button
//                             onClick={async () => {
//                                 setLoading(true)
//                                 try {
//                                     if (number) {
                                       
//                                         await P2Ptransfer(number, Number(amt) * 100);
                                        
                                        
//                                     } else {
//                                         alert("Number is missing, please try again.");
//                                     }
//                                     alert("Transfer Successful!");
//                                 } catch (error) {
//                                     console.error("Transfer failed", error);
//                                     alert("Transfer failed, please try again.");
//                                 }finally{
//                                     setLoading(false)
//                                 }
//                             }}
//                         >
//                            {loading ? <span className="loader"></span> : "Send"}
//                         </Button>

//                         </div>

//                     </div>
//                 </Card>
//              </Center>
//           </div>
        
//     )
// }



"use client";
import React from "react";
import { Button } from "@/packages/ui/button";
import { Card } from "@/packages/ui/card";
import { Center } from "@/packages/ui/Center";
import { TextInput } from "@/packages/ui/TextInput";
import { useState, Suspense } from "react";
import { P2Ptransfer } from "../app/lib/actions/P2Ptransfer";
import { useSearchParams } from "next/navigation";

export default function SendCartWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SendCart />
    </Suspense>
  );
}

function SendCart() {
  const [amt, setAmt] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const number = searchParams.get("number");
  const name = searchParams.get("name");

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Center>
        <Card title={`Send to ${name}`}>
          <div>
            <TextInput
              placeholder="Amount"
              label="Amount"
              value={amt}
              onChange={(value) => {
                setAmt(value);
              }}
            />
            <div className="w-full flex justify-center mt-5">
              <Button
                onClick={async () => {
                  setLoading(true);
                  try {
                    if (number) {
                      await P2Ptransfer(number, Number(amt) * 100);
                    } else {
                      alert("Number is missing, please try again.");
                    }
                    alert("Transfer Successful!");
                  } catch (error) {
                    console.error("Transfer failed", error);
                    alert("Transfer failed, please try again.");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? <span className="loader"></span> : "Send"}
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
