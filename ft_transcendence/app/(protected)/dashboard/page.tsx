// import { getSession } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { UsersTable } from "@/components/dashboard/UsersTable";

// export const metadata = {
//   title: "Dashboard",
// };

// export default async function Home() {
//   const session = await getSession();

//   if (!session || session.role != "admin") {
//     redirect("/login");
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
// 		{/* Sidebar */}
//       <Sidebar userEmail={session.email} />

// 	  <main className="flex-1 p-8">
// 		<UsersTable/>
// 	  </main>
//     </div>
//   );
// }


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

  return <DashboardContent userEmail={userEmail} />;
}
