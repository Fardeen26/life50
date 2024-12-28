import { z } from 'zod'

export const listingSchema = z.object({
    title: z
        .string()
        .min(5, { message: 'Title must be at least 5 characters' })
        .max(100, { message: 'Title must be less then 50 characters' }),
    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters' })
        .max(300, { message: 'Description must be less then 300 characters' }),
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: 'Username must be less then 20 characters' }),
    user_twitter: z.string(),
    resource_link: z
        .string()
        .url({ message: "Resource URL is invalid" })
        .optional(),
    category: z.string()
})