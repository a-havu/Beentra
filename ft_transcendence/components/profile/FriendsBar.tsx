import Image from "next/image";

type FriendBarItem = {
  id: string;
  username: string;
  avatarUrl: string | null;
  isOnline: boolean | null;
};

function FriendItem({ friend }: { friend: FriendBarItem }) {
  return (
    <a
      href={`/profile/${friend.id}`}
      className="flex items-center gap-2 group shrink-0 shadow-md bg-white/50 hover:bg-white/70 rounded-full pr-2 transition-all ease-in-out hover:scale-105"
    >
      <div className="relative shrink-0">
        {friend.avatarUrl ? (
          <Image
            src={friend.avatarUrl}
            alt={friend.username}
            width={48}
            height={48}
            className="rounded-full object-cover w-8 h-8 shadow-sm group-hover:shadow-md transition-shadow"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#cdceff] flex items-center justify-center text-sm font-semibold shadow-sm">
            {friend.username[0].toUpperCase()}
          </div>
        )}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-grey-500 ${
            friend.isOnline === true ? "bg-[#aae396]" : "bg-white"
          }`}
        />
      </div>
      <span className="text-xs text-gray-600 truncate max-w-24">
        {friend.username}
      </span>
    </a>
  );
}

export default function FriendsBar({ friends }: { friends: FriendBarItem[] }) {
  if (friends.length === 0) return null;

  return (
    <div className="relative overflow-hidden h-10 bg-[#e2f7fe6f] rounded-full inset-shadow-sm inset-shadow-gray-200">
      <div className="absolute left-full flex items-center gap-4 h-full animate-marquee">
        {friends.map((friend) => (
          <FriendItem key={`a-${friend.id}`} friend={friend} />
        ))}
        <div className="min-w-screen shrink-0" />
        {friends.map((friend) => (
          <FriendItem key={`b-${friend.id}`} friend={friend} />
        ))}
        <div className="min-w-screen shrink-0" />
      </div>
    </div>
  );
}
