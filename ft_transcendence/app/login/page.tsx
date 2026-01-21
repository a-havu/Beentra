import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login/LoginForm"
import { prisma } from "@/lib/prisma"

export const metadata ={
  title:'login page'
}
export default async function LoginPage() {

  const users = await prisma.user.findMany()
  console.log("users:",users)
  return (
            <div className="flex flex-1 w-full items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
      </div>

  
  )
}
