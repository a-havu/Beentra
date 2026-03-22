import MyFriends from './MyFriends'
import PotentialFriends from '@/components/profile/PotintialFriends'
import { User } from '@/lib/generated/prisma/client'
import { prisma } from "@/lib/prisma"

type FriendsSectionProps = {
  id: string
  myFriends: User[]
}

export default async function FriendsSection({ id, myFriends }: FriendsSectionProps) {
  const users = await prisma.user.findMany({ where: { role: "user" } })
  const potentialFriends = users.filter(user =>
    user.id !== id && !myFriends.some(friend => friend.id === user.id)
  )

  if (myFriends.length === 0) return <div>No friends yet</div>

  return (
    <div className="friends-section">
      <div>
        <h3>My Friends</h3>
        <MyFriends myFriends={myFriends} />
      </div>
      <div>
        <h3>potintial list</h3>
        <PotentialFriends potentialFriends={potentialFriends} />
      </div>
    </div>
  )
}
