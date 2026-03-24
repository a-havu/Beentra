'use client'
import { User } from '@/lib/generated/prisma/client'
import UserCard from './UserCard'

export default function PotentialFriends({ potentialFriends, currentUserId }: { potentialFriends: User[], currentUserId: string }) {
  if (!potentialFriends || potentialFriends.length === 0)
    return <>No potential Friends</>
  return (
    <div className="potential-friends flex gap-5">
      {potentialFriends.map(user => (
        <UserCard key={user.id} currentUserId={currentUserId} user={user} />
      ))}
    </div>
  )
}
