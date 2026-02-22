'use client';

import Image from 'next/image';
import { useState } from 'react';
import LogoutButton from "./LogoutButton"

interface avatar {
  avatar_url: string
}

export function Avatar({ avatar_url }: avatar) {

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <Image
          src={avatar_url}
          alt='Avatar picture'
          width={32}
          height={32}
          className='rounded-full'
        />
      </button >

      <div>
        {open ? <div className="absolute right-0 dropdown-menu-logHeader z-50">
          {<LogoutButton />}
        </div>
          : <></>}


      </div>
    </div>
  )
}
