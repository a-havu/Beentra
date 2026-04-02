import Menu from "./Menu";
import Link from "next/link";
import LogHeader from "../login/LogHeader";
import Image from "next/image";

export default async function Header() {
  return (
    <header className="header flex flex-row items-center justify-between md:p-6 h-16 w-full overflow-visible">
      <div className="flex flex-row gap-3">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
        </Link>
        <h3 className="hidden md:block">
          <Link href="/">Beentra</Link>
        </h3>
      </div>
      <Menu />
      <LogHeader />
    </header>
  );
}
