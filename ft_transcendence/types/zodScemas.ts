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
  title: z.string().max(40, "please use shorter text").min(3, "title too short"),
});
export type PageZodType = z.infer<typeof PageZodSchema>
