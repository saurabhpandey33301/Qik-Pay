"use client";

import React , {JSX} from "react";
import { useState } from "react";
import { SidebarItem } from "../../components/SidebarItem";
import { AppbarClient } from "../../components/AppbarClient";
import { redirect } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex font-mono text-lg relative">
      {/* Overlay (only for mobile when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 h-screen bg-white/10 backdrop-blur-lg shadow-lg border-r rounded-md border-slate-500
                    transition-transform duration-300 z-50 md:z-auto md:bg-slate-900 md:backdrop-blur-none  md:shadow-none 
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-72"} md:translate-x-0  `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center text-4xl text-blue-400 font-extrabold font-mono p-6 hover:cursor-pointer" onClick={()=>{
           redirect("/")
        }}>
          <div className="hover:cursor-pointer">QikPay</div>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col w-full gap-7 p-4">
          <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Dashboard" />
          <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Bank Transfer" />
          <SidebarItem href={"/p2p"} icon={<TransactionsIcon />} title="P2P Transfer" />
          <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
          <AppbarClient/>
         
        </div>
        
      </div>

      {/* Sidebar Toggle Button (Visible only on mobile) */}
      <button
        className="fixed top-3 right-4 md:hidden text-white bg-blue-500 p-2 rounded-lg z-50 shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Main Content */}
      <div className={`w-full min-h-screen p-4 pt-[56px]  rouded transition-all md:pl-72`}>
        {children}
      </div>
    </div>
  );
}

// Icons from https://heroicons.com/
function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}
