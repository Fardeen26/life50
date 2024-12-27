import { supabase } from "@/lib/supabaseClient";

type listingType = {
    title: string,
    description: string,
    username: string,
    user_twitter: string,
    resource_link: string,
    category: string
}

export async function POST(req: Request) {
    try {
        const listingData: listingType = await req.json();
        const { data, error } = await supabase.from('listings').insert([{
            title: listingData.title,
            description: listingData.description,
            username: listingData.username,
            user_twitter: listingData.user_twitter,
            resource_link: listingData.resource_link,
            category: 'Books'
        }]).select('*')

        if (error) {
            console.log(error)
            return Response.json(
                {
                    success: false,
                    message: 'Error while adding listing',
                },
                { status: 400 }
            );
        }

        if (data) {
            return Response.json(
                {
                    success: true,
                    message: data,
                },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error(error)
    }
}


