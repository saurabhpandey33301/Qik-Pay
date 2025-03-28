// "use client"
// import React from "react";

// export function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children?: React.ReactNode;
// }): JSX.Element {
//   return (
//     // <div
//     //   className="border-2 p-6 bg-slate-600 rounded-xl border-blue-400 "
//     // >
//     //   <h1 className="text-xl border-b pb-2 text-white font-mono">
//     //     {title}
//     //   </h1>
//     //   <p>{children}</p>
//     // </div>
// <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-blue-300 to-blue-500 shadow-md shadow-blue-300">
//   <div className="bg-slate-700 rounded-xl p-6 border-2 border-transparent bg-clip-border">
//     <h1 className="text-xl border-b pb-2 text-white font-mono">{title}</h1>
//     <p className="text-white">{children}</p>
//   </div>
// </div>


//   );
// }



"use client"; // Add this if you're using Next.js App Router (app directory)

import React, { JSX } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-blue-300 to-blue-500 shadow-md shadow-blue-300">
      <div className="bg-slate-700 rounded-xl p-6 border-2 border-transparent bg-clip-border">
        <h1 className="text-xl border-b pb-2 text-white font-mono">{title}</h1>
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
}
