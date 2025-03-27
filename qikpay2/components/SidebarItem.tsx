"use client"

import React, { JSX } from "react";
import { usePathname, useRouter } from "next/navigation";


export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex  ${selected ? "text-lime-400" : "text-slate-500 hover:transform hover:translate-x-2"} cursor-pointer  p-2 pl-8 font-bold`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2 ">
            {icon}
        </div>
        <div className={` ${selected ? "text-lime-400" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}