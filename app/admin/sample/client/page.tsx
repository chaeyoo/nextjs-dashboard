"use client"

import { Button } from "antd";
import { signIn, signOut, useSession } from "next-auth/react"


export default function Navbar() {
    const { data: session, status } = useSession();
    return (
        <nav>
            {session ? (
              <>
                <Button onClick={() => signOut()}>Sign Out</Button>
                <p>
                  status : {status} | data: {session.user?.email}
                </p>
              </>
            ) : (
              <>
                 <Button onClick={() => signIn()}>Sign In</Button>
                 <p>
                  status:{status}
                </p>
              </>
            )}
        </nav>
    );
  }