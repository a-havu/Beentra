import MyFriends from "./MyFriends";
import PotentialFriends from "@/components/profile/PotintialFriends";
import { User } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type FriendsSectionProps = {
  id: string;
  myFriends: User[];
};

export default async function FriendsSection({
  id,
  myFriends,
}: FriendsSectionProps) {
  const users = await prisma.user.findMany({ where: { role: "user" } });
  const potentialFriends = users.filter(
    (user) =>
      user.id !== id && !myFriends.some((friend) => friend.id === user.id),
  );
  return (
    <div className="flex flex-col md:flex-row items-start gap-3">
		<div className="md:w-1/2 min-w-0 p-5 bg-[#dff5fa] shadow-sm rounded-xl overflow-hidden">
		<h3 className="flex justify-center text-[#007d99]">My Friends</h3><br />
        <MyFriends myFriends={myFriends} currentUserId={id} />
		</div>
		<div className="md:w-1/2 min-w-0 p-5 bg-[#e7e1fb] shadow-sm rounded-xl">
        <h3 className="flex justify-center text-[#4323ae]">Friend suggestions</h3><br />
        <PotentialFriends
          potentialFriends={potentialFriends}
          currentUserId={id}
        />
		</div>
    </div>
  );
}
