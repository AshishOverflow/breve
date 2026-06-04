"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
	const router = useRouter();

	async function handleDelete() {
		const confirmed = window.confirm("Delete this URL?");

		if (!confirmed) return;

		const response = await fetch(`/api/delete/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			router.refresh();
		}
	}

	return (
		<button
			onClick={handleDelete}
			className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950"
		>
			<Trash2 size={18} />
		</button>
	);
}
