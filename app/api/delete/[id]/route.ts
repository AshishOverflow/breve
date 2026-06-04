import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

export async function DELETE(request: Request, { params }: Props) {
	const { id } = await params;

	const { error } = await supabase.from("urls").delete().eq("id", id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({
		success: true,
	});
}
