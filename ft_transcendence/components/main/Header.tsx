import Menu from "./Menu";
import Link from "next/link";
import LogHeader from "../login/LogHeader";
import Image from 'next/image';

export default async function Header() {

  return (
    <header className="header flex flex-row items-center justify-between p-6 h-16 w-full overflow-visible">
		<div className="flex flex-row gap-3"><Image
		src="/favicon.ico"
		alt="logo"
		width={32}
		height={32}
		/>
      <h3><Link href="/">Beentra</Link></h3></div>
      <Menu />
      <LogHeader />
    </header >
  );
}
