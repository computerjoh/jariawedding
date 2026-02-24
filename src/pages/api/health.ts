import type { APIRoute } from "astro";
import { supabase } from "../../db/supabase";

export const prerender = false;

export const GET: APIRoute = async () => {
    const { count, error } = await supabase
        .from("rsvps")
        .select("*", { count: "exact", head: true });

    if (error) {
        return new Response("DB error", { status: 500 });
    }

    return new Response(`ok: ${count}`);
};