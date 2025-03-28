// "use client"
// import { Button } from "@repo/ui/button";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";



// export default function P2Plist({Alluser}:{Alluser:any}){
//     const [searchList , setSearchList] = useState(Alluser);
//     const [search , setSearch] = useState("");
//     const router = useRouter();

//     useEffect(() => {
//         if (search === "") {
//             setSearchList(Alluser); // Show all users if search box is empty
//         } else {
//             setSearchList(Alluser.filter((user: any) => 
//                 user.name.toLowerCase().includes(search.toLowerCase()) // Case-insensitive search
//             ));
//         }
//     }, [search, Alluser]); // Run effect when search or Alluser changes

//     return(
      
//             <div className="flex flex-col justify-around items-center  gap-4">
//                 <div className="w-2/3">
//                 <input className="p-3 rounded-xl w-full" type="text" placeholder="name" value={search} onChange={(e)=>{
//                     setSearch(e.target.value);
//                 }} />
//                 </div>
//                <div className="w-full flex justify-center items-center  ">
//                 <div className=" w-2/3 flex gap-4 flex-col ">
//                     {searchList.map((user:any) => {
//                             return <div key={user.id} 
//                             className="grid grid-cols-6 w-full p-3 rounded-2xl transition-transform duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg "> 
//                                 <p className="col-span-5 text-white font-mono text-xl ">{user.name}</p>
//                                 <div className="col-span-1">
//                                 <Button  onClick={()=>{
//                                     router.push(`/SendP2P?number=${user.number}&name=${user.name}`);

//                                 }}>Send</Button>

//                                 </div>
                                
//                             </div>
//                         })}
//                 </div>
//                </div>
//             </div>
        
//     )
// }





"use client";
import React from "react";
import { Button } from "@/packages/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function P2Plist({ Alluser }: { Alluser: any }) {
  
  const [searchList, setSearchList] = useState(Alluser);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (search === "") {
      setSearchList(Alluser);
    } else {
      setSearchList(
        Alluser.filter((user: any) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, Alluser]);

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      {/* Search Input */}
      <div className="w-full max-w-xl">
        <input
          className="p-3 rounded-xl w-full text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User List */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {searchList.map((user: any) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg transition-transform duration-300 hover:scale-105"
            >
              {/* Name */}
              <p className="text-white font-mono text-xl sm:text-lg">
                {user.name}
              </p>

              {/* Send Button */}
              <Button
               
                onClick={() =>
                  router.push(`/SendP2P?number=${user.number}&name=${user.name}`)
                }
              >
                Send
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
