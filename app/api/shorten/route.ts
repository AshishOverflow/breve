import { NextResponse } from "next/server";
import { generateCode } from "@/lib/generateCode";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
	const supabase = await createClient();
	try {
		const { url } = await req.json();
		if (!url) {
			return NextResponse.json({ error: "URL is required" }, { status: 400 });
		}

		const {
			data: { user },
		} = await supabase.auth.getUser();
		const shortCode = generateCode();

		const { error } = await supabase.from("urls").insert({
			original_url: url,
			short_code: shortCode,
            user_id: user?.id ?? null,
		});
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ shortCode });
	} catch {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
}
