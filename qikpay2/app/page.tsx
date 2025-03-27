// "use client";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const session = useSession();
//   const router = useRouter(); // ✅ Use router inside the component

//   const handleSignOut = async () => {
//     await signOut();
//     router.push("/api/auth/signin"); // ✅ Redirect after sign-out
//   };

//   return (
//     <div>
//       <button
//         className="p-3 bg-red-500 text-black"
//         onClick={() => (session.data?.user ? handleSignOut() : signIn())} // ✅ Fix function call
//       >
//         {session.data?.user ? "Logout" : "Login"}
//       </button>
//     </div>
//   );
// }


import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}
