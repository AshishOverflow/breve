"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(`${window.location.origin}/${text}`);

		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	}

	return (
		<button
			onClick={handleCopy}
			className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
			aria-label="Copy link"
		>
			{copied ? <Check size={18} /> : <Copy size={18} />}
		</button>
	);
}
