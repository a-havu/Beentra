import { User } from '@/lib/generated/prisma/client'
import UserCard from '@/components/profile/UserCard'

export default function MyFriends({ myFriends }: { myFriends: User[] }) {
  if (myFriends.length == 0)
    return (<>No friends</>)
  return (
    <div className="myfriends">
      {myFriends.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
