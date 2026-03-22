import FriendsSection from "@/components/profile/FriendsSection"
import { prisma } from "@/lib/prisma"

export default async function friendsPage() {
  const users = await prisma.user.findMany({
    where: { role: "user" }
  })

  return (
    <>
      <h2>Friends page</h2>
      <FriendsSection users={users} />
    </>
  )
}
