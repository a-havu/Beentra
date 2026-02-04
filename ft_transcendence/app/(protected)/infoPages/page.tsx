import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from '@/lib/prisma';
import AddingPage from "@/components/dashboard/AddingPage";

export const metadata ={
  title:'Dashboard'
}



export default async function InfoPages() {
  const session = await getSession();

  if(!session || session.role != 'admin'){
    redirect('/')
  }

  const pages = await prisma.page.findMany()

  return (
    <div>
      <div>      <h3> Info pages management</h3>
      <h3>Welcome, {session.userEmail}, you are {session.role}!</h3></div>

      <div className="adding-page"><AddingPage /></div>
      <div className="page-list">
          <ul>
        {pages.map(page => (
          <li key={page.id}>{page.title}</li>
        )
          
        )}
        </ul>
      </div>
      
      
    </div>
  );
}
