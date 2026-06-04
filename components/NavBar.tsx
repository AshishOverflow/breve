import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogOutButton";

export default async function Navbar() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<nav className="border-b">
			<div className="container mx-auto flex items-center justify-between py-4 px-4">
				<Link href="/" className="text-xl font-bold">
					Breve
				</Link>

				<div className="flex items-center gap-4">
					{user ? (
						<>
							<Link href="/dashboard">Dashboard</Link>
							<LogoutButton />
						</>
					) : (
						<Link href="/auth">Login</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
