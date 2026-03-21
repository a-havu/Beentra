import MyFirends from './MyFriends'
import PotintialFriends from './PotintialFriends'




export default function FriendsSection() {

  return (
    <div className="firends-section">
      <div>
        <h3>My Friends</h3>
        <MyFirends />
      </div>
      <div>Users list:</div>
      <PotintialFriends />
    </div>
  )
}
