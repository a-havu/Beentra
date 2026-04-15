import FriendsSection from "@/components/profile/FriendsSection";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "My Friends",
};

export default async function FriendsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      friends: {
        include: { friend: true },
      },
    },
  });
  if (!user) return <div>User not found</div>;
  const myFriends = user.friends.map((f) => f.friend);

  return <FriendsSection myFriends={myFriends} id={user.id} />;
}
