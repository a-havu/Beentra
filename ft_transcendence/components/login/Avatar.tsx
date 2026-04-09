"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

interface avatarProps {
  avatar_url?: string | null;
  userId: string;
}

export function Avatar({ avatar_url, userId }: avatarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return; // Only add listener when dropdown is open

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    // Small delay to prevent immediate closing when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]); // Add 'open' to dependency array

  return (
    <div className="relative" ref={ref}>
      <button 
        className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#2a5159] focus:ring-offset-2"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User menu"
      >
        {avatar_url ? (
          <Image
            src={avatar_url}
            alt="Avatar picture"
            width={32}
            height={32}
            className="rounded-full w-8 h-8 object-cover"
            priority
          />
        ) : (
          <Image
            src="/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="Default avatar"
            width={32}
            height={32}
            className="rounded-full w-8 h-8 object-cover"
            priority
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-40 bg-[#daf6fb] rounded-lg shadow-lg p-2 text-[#2a5159] z-50">
          <nav className="flex flex-col gap-1">
            <Link 
              href={`/profile/${userId}`} 
              onClick={() => setOpen(false)}
              className="flex h-8 items-center px-2 rounded-md hover:bg-[#c8e6f4] transition-colors"
            >
              My Profile
            </Link>
            <Link 
              href={`/users/${userId}/events`} 
              onClick={() => setOpen(false)}
              className="flex h-8 items-center px-2 rounded-md hover:bg-[#c8e6f4] transition-colors"
            >
              My Events
            </Link>
            <Link 
              href={`/users/${userId}/projects`} 
              onClick={() => setOpen(false)}
              className="flex h-8 items-center px-2 rounded-md hover:bg-[#c8e6f4] transition-colors"
            >
              My Projects
            </Link>
            <Link 
              href={`/users/${userId}/friends`} 
              onClick={() => setOpen(false)}
              className="flex h-8 items-center px-2 rounded-md hover:bg-[#c8e6f4] transition-colors"
            >
              My Friends
            </Link>
            <LogoutButton />
          </nav>
        </div>
      )}
    </div>
  );
}