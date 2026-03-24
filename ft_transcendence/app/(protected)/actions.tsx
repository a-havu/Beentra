'use server'
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { PageZodSchema } from '@/types/zodScemas'

export async function createPage(formData: FormData) {
  try {
    const session = await getSession()
    if (!session?.userId) {
      throw new Error('Unauthorized')
    }

    const title = formData.get("pageTitle") as string ?? "";
    const text = formData.get("pageText") as string ?? "";
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const parsed = PageZodSchema.safeParse({ title })
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message }
    }

    if (text.length < 3) {
      return { success: false, error: "Content too short" }
    }

    const existed = await prisma.page.findUnique({ where: { slug } })
    if (existed) {
      return { success: false, error: "A page with this title already exists" }
    }

    const result = await prisma.page.create({
      data: { title: parsed.data.title, slug, text, authorId: session.userId }
    })

    revalidatePath('/dashboard/infoPages')
    return { success: true, data: result }

  } catch (error) {
    console.log('error creating page', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function deletePage(id: number) {
  try {
    const session = await getSession()
    if (!session?.userId) {
      throw new Error('Unauthorized')
    }

    const found = await prisma.page.findUnique({ where: { id } })
    if (!found) {
      return { success: false, error: "Page not found" }
    }

    const deleted = await prisma.page.delete({ where: { id } })
    revalidatePath('/dashboard/infoPages')
    return { success: true, data: deleted }

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function updatePage(id: number, formData: FormData) {
  try {
    const session = await getSession()
    if (!session?.userId) {
      throw new Error('Unauthorized')
    }

    const title = formData.get("pageTitle") as string ?? "";
    const text = formData.get("pageText") as string ?? "";
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const parsed = PageZodSchema.safeParse({ title })
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message }
    }

    if (text.length < 3) {
      return { success: false, error: "Content too short" }
    }

    // check slug conflict only against other pages
    const existed = await prisma.page.findUnique({ where: { slug } })
    if (existed && existed.id !== id) {
      return { success: false, error: "A page with this title already exists" }
    }

    const result = await prisma.page.update({
      where: { id },
      data: { title: parsed.data.title, slug, text, authorId: session.userId }
    })

    revalidatePath('/dashboard/infoPages')
    return { success: true, data: result }

  } catch (error) {
    console.error("Update page error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update page'
    }
  }
}