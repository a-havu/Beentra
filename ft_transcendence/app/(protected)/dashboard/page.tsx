import { headers } from "next/headers"
import { auth } from '@/lib/auth'
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata = {
  title: 'Dashboard'
}

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  let userEmail = session?.user.email
  if (!userEmail) {
    userEmail = "testuser@beentra.com"
  }

  if (session?.user.role != 'admin') {
    redirect('/')
  }

  return (
    <DashboardContent userEmail={userEmail} />
  );
}
