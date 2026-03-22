'use client'
import { User } from '@/lib/generated/prisma/client'
import UserCard from './UserCard'

export default function MyFriends({ myFriends, currentUserId }: { myFriends: User[], currentUserId: string }) {
  if (!myFriends || myFriends.length === 0)
    return <>No friends</>
  return (
    <div className="myfriends flex">
      {myFriends.map(user => (
        <UserCard key={user.id} user={user} isFriend currentUserId={currentUserId} />
      ))}
    </div>
  )
}
