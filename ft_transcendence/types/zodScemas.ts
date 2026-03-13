import * as z from 'zod'

export const loginZodSchema = z.object({
  userEmail: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})
export type loginFormTypes = z.infer<typeof loginZodSchema> // this will create the types also from zod object so no need to re declare it again


export const UserEmailZodSchema = z.object({
  userEmail: z.email({ message: "Invalid email address" })
})
export type EmailInputType = z.infer<typeof UserEmailZodSchema>

export const PageZodSchema = z.object({
  title: z.string({ message: "must be text only" }).max(40, "please use shorter text").min(3, "larger text needed"),
  slug: z.string({ message: "must be text only" }).max(40, "please use shorter text").min(3, "larger text needed"),
  text: z.string({ message: "must be text only" }).max(5000, "please use shorter text only 5000 allowed").min(3, "larger text needed"),
})
export type PageZodType = z.infer<typeof PageZodSchema>
