'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addFriend(userId: string, friendId: string) {
  await prisma.friend.createMany({
    data: [
      { userId, friendId },
      { userId: friendId, friendId: userId }
    ],
    skipDuplicates: true
  })
  revalidatePath(`/users/${userId}/friends`)
}

export async function removeFriend(userId: string, friendId: string) {
  await prisma.friend.deleteMany({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId }
      ]
    }
  })
  revalidatePath(`/users/${userId}/friends`)
}
