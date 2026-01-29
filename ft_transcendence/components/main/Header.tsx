import Menu from "./Menu";
// import LoginForm from '../../components/login/LoginForm'
import Link from "next/link";
import {getSession} from "@/lib/auth";
import LogoutButton from "@/components/login/LogoutButton";

export default async function Header() {
  const session = await getSession();
    
  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 p-4 h-16 w-full">
      <h3><Link href="/">My events&projects</Link></h3>
      <Menu />
      <div className="header-login-form">
        {session? <LogoutButton /> :<Link href='/login'>Login</Link>}
      </div>
      
    </header>
  );
}
