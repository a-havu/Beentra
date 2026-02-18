// app/api/logout/route.ts
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST() {
  await auth.api.signOut({
    headers: await headers()
  })

  return Response.json({ success: true })
}
