import { Prisma } from "@/lib/generated/prisma/client"
import { User } from "@/lib/generated/prisma/client"

export default function FriendStatus({ user } : {user: User}){

    return(
    <>
	{user.isOnline ?  <span className="w-3 h-3 rounded-full border border-gray-500 bg-[#aae396]"/> 
	: <span className="w-3 h-3 rounded-full border border-gray-500 bg-white"/>}
	</>
    )
}
