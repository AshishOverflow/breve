import {NextResponse} from "next/server";
import {generateCode} from "@/lib/generateCode";
import {supabase} from "@/lib/supabase";

export async function POST(req: Request) {
    try{
        const { url } = await req.json();
        if (!url){
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const shortCode = generateCode();

        const { error } = await supabase
        .from("urls")
        .insert({
            original_url: url,
            short_code: shortCode,
        });
        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json({ shortCode });
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}