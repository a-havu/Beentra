import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/dashboard/Header";

export const metadata ={
  title:'Dashboard'
}

export default async function Home() {
  const session = await getSession();

  let userEmail = session.email;

  if (!userEmail) {
    userEmail = "testuser@beentra.com"
  } 

  if(session.role != 'admin'){
    redirect('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Header userEmail={userEmail} />
    </div>
  );

  /*
  return (
    <div>
      <h3>Welcome, {session.userEmail}, you are {session.role}!</h3>
      <h3> Dashboard Page</h3>
      <Link href="/infoPages">manage pages</Link>
      <></>
    </div>
  ); */
}
