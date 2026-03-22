"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { getSession } from "@/lib/auth";

interface avatarProps {
  avatar_url: string;
  userId: string;
}

export function Avatar({ avatar_url, userId }: avatarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative z-150" ref={ref}>
      <button className="cursor-pointer" onClick={() => setOpen(!open)}>
        <Image
          src={avatar_url || "/default-profile-picture.jpg"}
          alt="Avatar picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      </button>

      {open && (
        <div className="flex flex-col gap-2 absolute right-0 top-16 w-40 bg-[#FDF7D2] rounded-lg z-50 p-2">
          <Link href={`/profile/${userId}`}>
            {" "}
            <button className="cursor-pointer">My Profile</button>{" "}
          </Link>
          <Link href={`/users/${userId}/events`}>
            {" "}
            <button className="cursor-pointer"> My Events</button>{" "}
          </Link>
          <Link href={`/users/${userId}/projects`}>
            {" "}
            <button className="cursor-pointer"> My Projects</button>{" "}
          </Link>
          <Link href={`/users/${userId}/friends`}>
            <button className="cursor-pointer"> My Friends</button>{" "}
          </Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
