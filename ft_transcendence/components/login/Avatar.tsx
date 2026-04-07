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
          priority
        />
      </button>

      {open && (
        <div className="flex flex-col absolute right-0 top-11 w-40 bg-[#daf6fb] rounded-lg z-50 p-2 text-[#2a5159]">
          <Link href={`/profile/${userId}`} onClick={() => setOpen(false)}>
            <button className="flex h-8 items-center w-full cursor-pointer hover:bg-[#c8e6f4] rounded-md p-2">My Profile</button>{" "}
          </Link>
          <Link href={`/users/${userId}/events`} onClick={() => setOpen(false)}>
            {" "}
            <button className="flex h-8 items-center w-full cursor-pointer hover:bg-[#c8e6f4] rounded-md p-2"> My Events</button>{" "}
          </Link>
          <Link href={`/users/${userId}/projects`} onClick={() => setOpen(false)}>
            {" "}
            <button className="flex h-8 items-center w-full cursor-pointer hover:bg-[#c8e6f4] rounded-md p-2"> My Projects</button>{" "}
          </Link>
          <Link href={`/users/${userId}/friends`} onClick={() => setOpen(false)}>
            <button className="flex h-8 items-center w-full cursor-pointer hover:bg-[#c8e6f4] rounded-md p-2"> My Friends</button>{" "}
          </Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
