import FriendsSection from "@/components/profile/FriendsSection"
import { prisma } from "@/lib/prisma"

export default async function friendsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      friends: true,
    }
  })

  return (
    <>
      <h2>Friends page</h2>
      <FriendsSection users={user.friends} />
    </>
  )
}
