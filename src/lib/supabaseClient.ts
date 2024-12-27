import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.SUPABASE_URL;
const supabase_anon = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(
    supabase_url as string,
    supabase_anon as string
);