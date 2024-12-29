import { supabase } from "@/lib/supabaseClient";

type listingDataType = {
    title: string,
    description: string,
    username: string,
    user_twitter: string,
    resource_link: string,
    category: string,
}

export async function POST(req: Request) {
    try {
        const listingData: listingDataType = await req.json();
        const { data, error } = await supabase.from('listings').insert([{
            title: listingData.title,
            description: listingData.description,
            username: listingData.username,
            user_twitter: listingData.user_twitter,
            resource_link: listingData.resource_link,
            category: listingData.category
        }]).select('*')

        if (error) {
            return Response.json(
                {
                    success: false,
                    message: 'Error while adding listing',
                },
                { status: 500 }
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
        return Response.json(
            {
                success: false,
                message: `Something went wrong while adding listing: ${error}`,
            },
            { status: 500 }
        );
    }
}


