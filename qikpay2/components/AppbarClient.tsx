"use client"
import {  useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { Appbar } from "./logbtn";
import { signIn } from "@/app/lib/actions/signin/sign-in";
import { signOut } from "@/app/lib/actions/signout/sign-out";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("/home")
      }} user={session.data?.user} />
   </div>
  );
}
