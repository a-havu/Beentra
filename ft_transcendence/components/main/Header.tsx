import Menu from "./Menu";
// import LoginForm from '../../components/login/LoginForm'
import Link from "next/link";
import { auth } from '@/lib/auth'
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import LogoutButton from "@/components/login/LogoutButton";

export default async function Header() {

  const session = await auth.api.getSession({
    headers: await headers()
  })


  return (
    <header className="flex flex-row items-center justify-between p-4 h-16 w-full">
      <h3><Link href="/">Beentra</Link></h3>
      <Menu />
      <div className="header-login-form">
        {session ? <LogoutButton /> : <Link href='/login'>Login</Link>}
      </div>

    </header>
  );
}
