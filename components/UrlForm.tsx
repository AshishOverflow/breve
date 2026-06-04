"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

const UrlForm = () => {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	async function handleSubmit() {
		const response = await fetch("api/shorten", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url }),
		});

		const data = await response.json();

		if (data.shortCode) {
			setShortUrl(`${window.location.origin}/${data.shortCode}`);
		}
	}

	return (
		<div className="space-y-4">
			<input
				type="url"
				placeholder="https://example.com"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				className="w-full border rounded p-3"
			/>

			<button
				onClick={handleSubmit}
				className="bg-black text-white px-4 py-2 rounded"
			>
				Shorten
			</button>
            {
                shortUrl && (
                    <div className = "p-3 border rounded">
                        <p>Short URL:</p>
                        <a href = {shortUrl} target="_blank" className="text-blue-600 underline">
                            {shortUrl}
                        </a>

						<CopyButton text={shortUrl} />
                    </div>
                )
            }
		</div>
	);
}

export default UrlForm;
