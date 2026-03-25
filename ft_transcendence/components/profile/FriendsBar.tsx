import Image from "next/image";

type FriendBarItem = {
  id: string;
  username: string;
  avatarUrl: string | null;
  isOnline: boolean | null;
};

export default function FriendsBar({ friends }: { friends: FriendBarItem[] }) {
  if (friends.length === 0) return null;

  return (
    <div className="flex w-full gap-4  p-2 scrollbar-thin scrollbar-color bg-white rounded-full">
      {friends.map((friend) => (
        <a
          key={friend.id}
          href={`/users/${friend.id}`}
          className="flex items-center gap-2 group shrink-0 shadow-md rounded-full pr-2"
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
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full  ${friend.isOnline === true ? "bg-green-400" : "bg-gray-300"
                }`}
            />
          </div>
          <span className="text-xs text-gray-600 truncate max-w-24">
            {friend.username}
          </span>
        </a>
      ))}
    </div>
  );
}
