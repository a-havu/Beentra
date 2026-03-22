import { User } from '@/lib/generated/prisma/client'
import UserCard from './UserCard'

export default function PotentialFriends({ potentialFriends }: { potentialFriends: User[] }) {
  return (
    <div className="potential-friends">
      {potentialFriends.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
