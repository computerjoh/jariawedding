import type { APIRoute } from "astro";
import { supabase } from "../../db/supabase";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();

    const inviteCode = Number(formData.get("invite_code"));
    const attending = formData.get("primary_attending") === "yes";
    const plusOneAttending = formData.get("plus_one_attending") === "yes";
    const plusOneName = formData.get("plus_one_name")?.toString() || null;

    if (!inviteCode || !formData.get("primary_attending")) {
        return new Response("Invalid submission", { status: 400 });
    }

    const { error } = await supabase
        .from("rsvps")
        .update({
            primary_attending: attending,
            plus_one_attending: attending ? plusOneAttending : false,
            plus_one_name: attending && plusOneAttending ? plusOneName : null,
            submitted_at: new Date().toISOString(),
        })
        .eq("invite_code", inviteCode);

    if (error) {
        console.error("RSVP update failed:", error);
        return new Response("Failed to save RSVP", { status: 500 });
    }

    return new Response(null, {
        status: 303,
        headers: {
            Location: "/thanks",
        },
    });
};
