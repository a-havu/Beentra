'use client'
import { User } from '@/lib/generated/prisma/client'
import UserCard from './UserCard'

export default function MyFriends({ myFriends, currentUserId }: { myFriends: User[], currentUserId: string }) {
  if (!myFriends || myFriends.length === 0)
    return <p className="flex justify-center text-gray-500">You have no friends :(</p>
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-hidden">
      {myFriends.map(user => (
        <UserCard key={user.id} user={user} isFriend currentUserId={currentUserId} />
      ))}
    </div>
  )
}
