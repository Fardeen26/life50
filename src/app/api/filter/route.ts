import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const range1 = parseInt(url.searchParams.get('range1') || '0');
    const range2 = parseInt(url.searchParams.get('range2') || '0');

    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .match({ category })
        .range(range1, range2);

    if (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }

    return Response.json({ success: true, message: data }, { status: 200 });
}