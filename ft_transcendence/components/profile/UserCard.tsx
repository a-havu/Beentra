"use client";
import { Button } from "@/components/ui/Button"
import React, { useState } from "react";
import Image from "next/image";
import { User } from "@/lib/generated/prisma/client";
import {
  addFriend,
  removeFriend,
} from "@/app/(public)/users/[userId]/friends/friends";
import FriendStatus from './FriendStatus'
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

  return (
    <article className="flex flex-col gap-2 items-center w-full">
      <Image
        src={user.avatarUrl ?? "/default-profile-picture.png"}
        alt="user avatar"
        width={150}
        height={150}
        priority
		className="rounded-xl"
      />
      <span className="leading-none">{user.username}</span>
      {isFriend?<FriendStatus user={user} />:<></>}
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
