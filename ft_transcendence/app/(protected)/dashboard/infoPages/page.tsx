import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from '@/lib/prisma';
import AddingPage from "@/components/dashboard/pages/AddingPage";
import FetchPages from "@/components/dashboard/pages/FetchPages";
export const metadata ={
  title:'Dashboard'
}



export default async function InfoPages() {
  const session = await getSession();

  if(!session || session.role != 'admin'){
    redirect('/')
  }

 
  return (
    <div>
      <div>
        <h3>Welcome, {session.email}, you are {session.role}!</h3>
      </div>
      
      <div>
        <h3> Info pages management</h3>
      </div>
      
      <div className="adding-page m-7 bg-white p-4">
        <AddingPage/>
        </div>
      

      <div className="">
        <FetchPages />
      </div>
      
    </div>
  );
}
