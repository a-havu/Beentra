import MyFirends from './MyFriends'
import PotintialFriends from './PotintialFriends'
import { User } from '@/lib/generated/prisma/client'
import UserCard from '@/components/profile/UserCard'


export default function FriendsSection({ users }: { users: User[] }) {

  return (
    <div className="firends-section">
      <div>
        <ul>

          {users.map((user: User) =>
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          )}

        </ul>
        <h3>My Friends</h3>
        <MyFirends />
      </div>
      <div>Users list:</div>
      <PotintialFriends />
    </div >
  )
}
