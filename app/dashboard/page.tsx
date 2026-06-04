import CopyButton from "@/components/CopyButton";
import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
	const { data } = await supabase.from("urls").select("*").order("created_at", {
		ascending: false,
	});

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

								<CopyButton
									text={url.short_code}
								/>
							</div>
                            </td>

							<td className="px-4 py-3 max-w-sm truncate">
								{url.original_url}
							</td>

							<td className="px-4 py-3">{url.clicks}</td>

							<td className="px-4 py-3">
								{new Date(url.created_at).toLocaleDateString()}
							</td>

						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
