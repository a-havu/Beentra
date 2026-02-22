'use client';
import Image from 'next/image';
import { useState } from 'react';
import LogoutButton from "./LogoutButton"
import Link from 'next/link';

interface avatar {
  avatar_url: string
}

export function Avatar({ avatar_url }: avatar) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative z-150">
      <button onClick={() => setOpen(!open)}>
        <Image
          src={avatar_url}
          alt='Avatar picture'
          width={32}
          height={32}
          className='rounded-full'
        />
      </button>

      {open && (
        <div className="flex flex-col gap-2 absolute right-0 top-16 w-40 bg-gray-800 rounded-lg z-50 p-2">

          <Link href="/events"> <button>My Profile</button> </Link>
          <Link href="/events"> <button> My Events</button> </Link>
          <Link href="/events"><button> My Projects</button> </Link>
          <LogoutButton />
        </div>
      )}
    </div>
  )
}
