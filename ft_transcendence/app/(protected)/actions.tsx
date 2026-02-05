'use server'
import { prisma } from '@/lib/prisma';
import {getSession} from '@/lib/auth'




export async function createPage(formData:FormData){
    'use server'
   
    const session = await getSession()
    if (!session?.userId) {
        throw new Error('Unauthorized')
  }
    
    const title=  formData.get("pageTitle")
    const text=  formData.get("pageText")

      if (typeof title !== 'string' || typeof text !== 'string') {
    throw new Error('Invalid form data')
  }

    const result = prisma.page.create({
        data: {title, text, authorId: session.userId,}
    })
}