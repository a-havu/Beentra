'use server'
import { prisma } from '@/lib/prisma';
import {getSession} from '@/lib/auth'




export async function createPage(formData:FormData){
try{
   const session = await getSession()
    if (!session?.userId) {
        throw new Error('Unauthorized')
  }
    
    const title=  formData.get("pageTitle")
    const text=  formData.get("pageText")

      if (typeof title !== 'string' || typeof text !== 'string') {
    throw new Error('Invalid form data')
  }

    const result = await prisma.page.create({
        data: {title, text, authorId: session.userId,}
    })

    return ({success: true, data:result})
}   catch(error){
  console.log('error creating page', error)
  return{
    success:false,
    error: error instanceof Error ? error.message : 'Unknown error' // innstance of Error is to check if the error is a real error object

  }
}
 
}
