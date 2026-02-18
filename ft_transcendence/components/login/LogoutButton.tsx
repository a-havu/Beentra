"use client"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        }
      }
    })
  }

  return <button onClick={handleSignOut}>Sign out</button>
}
