import { Prisma } from "@/lib/generated/prisma/client"
import { User } from "@/lib/generated/prisma/client"

export default function FriendStatus({ user } : {user: User}){

    return(
    <>{user.isOnline ?  <p className="text-sm text-[#00566A] leading-none">Online</p> : <p className="text-sm text-[#4017c8] leading-none">Offline</p>}</>
    )
}
