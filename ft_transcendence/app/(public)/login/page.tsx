import { LoginForm } from "@/components/login/LoginForm"
import { getSession } from "@/lib/auth"
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'login page',
  description: 'Sign in to your account'
}
export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect('/')
  }


  return (
    <div className="flex flex-1 w-full items-center justify-center">
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>

    </div>
  )
}
