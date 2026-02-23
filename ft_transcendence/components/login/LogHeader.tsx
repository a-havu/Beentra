

import { getSession } from "@/lib/auth"
import { Avatar } from "./Avatar"
import Link from "next/link"


export default async function LogHeader() {
  const session = await getSession()
  return (
    <div className="header-login-form">
      {session && session.avatar_url ? <Avatar avatar_url={session.avatar_url} /> : <Link href="/login">Login</Link>}
    </div>
  )
}
