import CopyButton from "@/components/CopyButton";
import DeleteButton from "@/components/DeleteButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect("/auth");
	}

	const { data } = await supabase
		.from("urls")
		.select("*")
		.eq("user_id", user.id)
		.order("created_at", {
			ascending: false,
		});

	if (!data || data.length === 0) {
		return (
			<main className="max-w-4xl mx-auto p-8">
				<h1 className="text-4xl font-bold mb-6">Dashboard</h1>

				<div className="border rounded-lg p-8 text-center">
					<p className="text-muted-foreground mb-4">
						You haven't created any short URLs yet.
					</p>

					<Link href="/" className="underline">
						Create your first short URL
					</Link>
				</div>
			</main>
		);
	}
	return (
		<main className="max-w-6xl mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Dashboard</h1>

			<table className="w-full border border-zinc-800 rounded-lg overflow-hidden">
				<thead>
					<tr className="border-b border-zinc-800">
						<th className="px-4 py-3 text-left font-medium">Short URL</th>
						<th className="px-4 py-3 text-left font-medium">Original URL</th>
						<th className="px-4 py-3 text-left font-medium">Clicks</th>
						<th className="px-4 py-3 text-left font-medium">Created</th>
					</tr>
				</thead>

				<tbody>
					{data?.map((url: any) => (
						<tr
							key={url.id}
							className="border-b border-zinc-800 hover:bg-zinc-900/30"
						>
							<td className="px-4 py-3">
								<div className="flex items-center gap-2">
									<span>{url.short_code}</span>

									<CopyButton text={url.short_code} />
								</div>
							</td>

							<td className="px-4 py-3 max-w-sm truncate">
								{url.original_url}
							</td>

							<td className="px-4 py-3">{url.clicks}</td>

							<td className="px-4 py-3">
								{new Date(url.created_at).toLocaleDateString()}
							</td>

							<td className="px-4 py-3">
								<DeleteButton id={url.id} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
