
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import FetchPages from "@/components/pages/FetchPages";

export const metadata = {
  title: 'Dashboard'
}

export default async function Home() {
  const session = await getSession();

  let userEmail = session?.email;

  if (!userEmail) {
    userEmail = "testuser@beentra.com"
  }

  if (session?.role != 'admin') {
    redirect('/')
  }
  // because the FetchPages is a server component, then we can send it as props.

  return (
    <DashboardContent userEmail={userEmail} fetchPages={<FetchPages />} />
  );
}
