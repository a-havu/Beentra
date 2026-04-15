'use client'
import { User } from '@/lib/generated/prisma/client'
import UserCard from './UserCard'

export default function PotentialFriends({ potentialFriends, currentUserId }: { potentialFriends: User[], currentUserId: string }) {
  if (!potentialFriends || potentialFriends.length === 0)
    return <p className="flex justify-center text-gray-500">Everyone's your friend! No friends left to suggest</p>
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {potentialFriends.map(user => (
        <UserCard key={user.id} currentUserId={currentUserId} user={user} />
      ))}
    </div>
  )
}


