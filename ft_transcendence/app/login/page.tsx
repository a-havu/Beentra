import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login/LoginForm"

export const metadata ={
  title:'login page'
}
export default function LoginPage() {
  return (
            <div className="flex flex-1 w-full items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
      </div>

  
  )
}
