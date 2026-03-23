import { Prisma } from "@/lib/generated/prisma/client"
import { User } from "@/lib/generated/prisma/client"

export default function FriendStatus({ user } : {user: User}){

    return(
    <>{user.isOnline ?  <p>Online</p> : <p>Offline</p>}</>
    )
}
