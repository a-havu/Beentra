import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { User } from '@/lib/generated/prisma/client'

export default function UserCard({ user }: { user: User }) {
  return (
    <article className="user-card flex flex-col">
      <Image
        src={user.avatarUrl ?? '/default-profile-picture.png'}
        alt="user avatar"
        width={150}
        height={150}
      />
      <Button>Add Friend</Button>
    </article>
  )
}
