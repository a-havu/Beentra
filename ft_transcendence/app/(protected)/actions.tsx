'use server'
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { headers } from "next/headers"
import { redirect } from "next/navigation";


export async function createPage(formData: FormData) {
  try {

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session || session.user.role != 'admin') {
      redirect('/')
    }

    const title = formData.get("pageTitle")
    const text = formData.get("pageText")

    if (typeof title !== 'string' || typeof text !== 'string') {
      throw new Error('Invalid form data')
    }

    const result = await prisma.page.create({
      data: { title, text, authorId: session?.user.id, }
    })
    revalidatePath('/dashboard/infoPages')
    return ({ success: true, data: result })
  } catch (error) {
    console.log('error creating page', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error' // innstance of Error is to check if the error is a real error object

    }
  }

}


export async function deletePage(id: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session || session.user.role != 'admin') {
      redirect('/')
    }

    const foundId = await prisma.page.findUnique({ where: { id: id } })
    if (!foundId)
      return ({ success: false, error: "this page is not existed" })
    const deleted = await prisma.page.delete({ where: { id: id } })
    revalidatePath('/dashboard/infoPages')
    return ({ success: true, data: deleted })
  }
  catch (error) {
    return ({ success: false, error: error })
  }
}

export async function updatePage(id: number, formData: FormData) {
  try {

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session || session.user.role != 'admin') {
      redirect('/')
    }

    if (!formData)
      throw new Error("no data send from form")

    const title = formData.get("pageTitle") as string
    const text = formData.get("pageText") as string

    if (!title || !text)
      throw new Error("Title and text are required")

    const updateUser = await prisma.page.update({
      where: {
        id: id,
      },
      data: { title, text, authorId: session.userId, }

    })
    revalidatePath("/infoPages"); // for cache revalidation
    return ({ success: true, data: updateUser })


  } catch (error) {
    console.error("Update page error:", error)
    return ({ success: false, error: error instanceof Error ? error.message : "Faild to update page" })
  }




}
