import { LoginForm } from "@/components/login/LoginForm"
import { getSession } from "@/lib/auth"
import Link from "next/link"
export const metadata ={
  title:'login page'
}
export default async function LoginPage() {

  return (
          <div className="flex flex-1 w-full items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
            
          </div>
         
      </div>
  )
}
