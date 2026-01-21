import Menu from "./Menu";
import LoginForm from '../../components/login/LoginForm'
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-gray-800 p-4 h-16 w-full">
      <h3>My events&projects</h3>
      <Menu />
      <div className="header-login-form">
        <Link href='/login'>Login</Link>
      </div>
      
    </header>
  );
}
