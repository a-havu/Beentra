
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata = {
  title: 'Dashboard'
}

export default async function Home() {
  const session = await getSession();

  let userEmail = session?.email;

  if (!userEmail) {
    userEmail = "testuser@beentra.com"
  }

  if(session?.role != 'admin'){
    redirect('/')
  }

  return (
  <DashboardContent userEmail={userEmail} />
  );
}
