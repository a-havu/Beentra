import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata ={
  title:'Dashboard'
}



export default async function Home() {
  const session = await getSession();

  if(session.role != 'admin'){
    redirect('/')
  }

  return (
    <div>
      <h3>Welcome, {session.userEmail}, you are {session.role}!</h3>
      <h3> Dashboard Page</h3>
      <Link href="/infoPages">manage pages</Link>
      <></>
    </div>
  );
}
