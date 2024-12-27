import { z } from 'zod'

export const listingSchema = z.object({
    title: z
        .string()
        .min(5, { message: 'Password must be at least 5 characters' })
        .max(50, { message: 'Password must be less then 50 characters' }),
    description: z
        .string()
        .min(10, { message: 'Password must be at least 10 characters' })
        .max(300, { message: 'Password must be less then 300 characters' }),
    username: z
        .string()
        .min(3, { message: 'Password must be at least 3 characters' })
        .max(20, { message: 'Password must be less then 20 characters' }),
    user_twitter: z.string(),
    resource_link: z
        .string()
        .url({ message: "Resource URL is invalid" }),
    category: z.string()
})