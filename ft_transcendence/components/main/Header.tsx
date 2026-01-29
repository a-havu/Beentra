import Menu from "./Menu";
// import LoginForm from '../../components/login/LoginForm'
import Link from "next/link";
import {getSession} from "@/lib/auth";

export default async function Header() {
  let flag: boolean = true;
  const session = await getSession();
  if(!session){
    flag = false;}
    
  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 p-4 h-16 w-full">
      <h3><Link href="/">My events&projects</Link></h3>
      <Menu />
      <div className="header-login-form">
        {flag? <Link href='/login'>Login</Link> : <Link href='/logout'>Logout</Link> }
      </div>
      
    </header>
  );
}
