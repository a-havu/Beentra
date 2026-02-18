import { redirect } from "next/navigation";
import FetchPages from "@/components/dashboard/pages/FetchPages";
import PageForm from "@/components/dashboard/pages/PageForm";
import { auth } from '@/lib/auth'
import { headers } from "next/headers"

export const metadata = {
  title: 'Dashboard'
}



export default async function InfoPages() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || session.user.role != 'admin') {
    redirect('/')
  }


  return (
    <div>
      <div>
        <h3>Welcome, {session.user.email}, you are {session.user.email}!</h3>
      </div>

      <div>
        <h3> Info pages management</h3>
      </div>

      <div className="adding-page m-7 bg-white p-4">
        <PageForm />
      </div>


      <div className="">
        <FetchPages />
      </div>

    </div>
  );
}
