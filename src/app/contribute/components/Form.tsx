"use client"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
    Form as UIForm,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { bricolage_grotesque } from '@/lib/fonts';
import { listingSchema } from '@/schema/listingSchema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function CustomForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof listingSchema>>({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            title: '',
            description: '',
            username: '',
            user_twitter: '',
            category: ''
        },
    });

    const onSubmit = async (data: z.infer<typeof listingSchema>) => {
        setIsSubmitting(true)
        try {
            await axios.post('/api/add', data)
            toast.success('Entry added successfully')
            router.push('/')
        } catch (error) {
            console.error("Error while adding entry", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={`flex justify-center items-center min-h-screen ${bricolage_grotesque}`}>
            <div className="w-full max-w-3xl p-8 max-sm:px-4 space-y-8 rounded-lg">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
                        Contribute to Someones Life
                    </h1>
                </div>
                <UIForm {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 max-sm:px-0">
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <Input {...field} placeholder='Atomic Habits by James Clear' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <Input {...field} placeholder='A great book on habits' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input {...field} placeholder='fardeen' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="user_twitter"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Twitter Username</FormLabel>
                                    <Input {...field} placeholder='fardeen14693425' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="resource_link"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resource URL (if any)</FormLabel>
                                    <Input {...field} placeholder='https://notion.com' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="category"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Books">Books</SelectItem>
                                            <SelectItem value="Videos">Videos</SelectItem>
                                            <SelectItem value="Quotes">Quotes</SelectItem>
                                            <SelectItem value="Courses">Courses</SelectItem>
                                            <SelectItem value="Articles">Articles</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full bg-white hover:bg-gray-300 rounded-[7px] text-black'>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </form>
                </UIForm>
            </div>
        </div>
    )
}