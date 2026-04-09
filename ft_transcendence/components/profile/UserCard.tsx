"use client";
import { Button } from "@/components/ui/Button"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/lib/generated/prisma/client";
import {
  addFriend,
  removeFriend,
} from "@/app/(public)/users/[userId]/friends/friends";
import FriendStatus from './FriendStatus'
import { useIsMobile } from "@/hooks/useIsMobile";

export default function UserCard({
  user,
  currentUserId,
  isFriend = false,
}: {
  user: User;
  currentUserId: string;
  isFriend?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      if (isFriend) {
        await removeFriend(currentUserId, user.id);
      } else {
        await addFriend(currentUserId, user.id);
      }
      // Server actions revalidate on the server; client-side UI will update when the page re-renders
    } catch (err) {
      console.error("Friend action failed", err);
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  const isMobile = useIsMobile();

  return (
    <article className="flex flex-col gap-2 items-center w-full">
      <Link href={`/profile/${user.id}`}>
        <Image
          src={user.avatarUrl ?? "/default-profile-picture.png"}
          alt="user avatar"
          width={isMobile ? 100 : 150}
          height={isMobile ? 100 : 150}
          priority
          className="rounded-xl hover:opacity-80 transition-opacity md:h-30 md:w-30 h-20 w-20 object-cover"
        />
      </Link>
	  <div className="flex gap-2 align-middle">
      <Link href={`/profile/${user.id}`} className="leading-none hover:underline">
        {user.username}
      </Link>
      {isFriend?<FriendStatus user={user} />:<></>}
	  </div>
      <div className="flex justify-center"><Button
        onClick={handleClick}
        disabled={loading}
		variant={isFriend ? "edit" : "primary"}
		size="small"
      >
        {loading
          ? isFriend
            ? "Removing..."
            : "Adding..."
          : isFriend
            ? "Remove Friend"
            : "Add Friend"}
      </Button></div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </article>
  );
}
