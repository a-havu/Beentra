import Menu from "./Menu";
import Link from "next/link";
import LogHeader from "../login/LogHeader";

export default async function Header() {

  return (
    <header className="header flex flex-row items-center justify-between p-6 h-16 w-full overflow-visible">
      <h3><Link href="/">Beentra</Link></h3>
      <Menu />
      <LogHeader />
    </header >
  );
}
