import { User } from '@/lib/generated/prisma/client'
import UserCard from '@/components/profile/UserCard'

export default function MyFriends({ myFriends }: { myFriends: User[] }) {

  return (
    <div className="myfriends">
      {myFriends.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
