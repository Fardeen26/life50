import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const body = await req.json();
    console.log("body", body)
    const { id, newVote } = body;
    const { error } = await supabase.from("listings").update({ vote: newVote }).match({ id });

    if (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }

    return Response.json({ success: true, message: "Vote updated successfully" }, { status: 200 });
}