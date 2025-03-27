"use client"
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { Appbar } from "./logbtn";

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
