import { User } from '@/lib/generated/prisma/client'
import UserCard from './UserCard'

export default function PotentialFriends({ potentialFriends }: { potentialFriends: User[] }) {
  if (potentialFriends.length == 0)
    return (<>No potential Friends</>)
  return (
    <div className="potential-friends flex">
      {potentialFriends.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
