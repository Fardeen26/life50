import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    try {
        const { data, error } = await supabase.from('listings').select('*').order("vote", { ascending: false });

        if (error) {
            return Response.json(
                {
                    success: false,
                    message: 'Error while fetching listing',
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