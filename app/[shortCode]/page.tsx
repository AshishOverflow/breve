import { notFound, redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
    params: Promise<{
        shortCode: string;
    }>;
}

export default async function RedirectPage({
    params,
}:Props){
    const { shortCode } = await params;

    const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("short_code",shortCode)
    .single();

    if (error || !data)
    {
        notFound();
    }

    await supabase
    .from("urls")
    .update({ clicks: data.clicks + 1})
    .eq("short_code", shortCode);
    
    redirect(data.original_url);
}