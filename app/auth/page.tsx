"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
	const supabase = createClient();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSignUp() {
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			alert(error.message);
			return;
		}

		router.replace("/");
		router.refresh();
	}
	async function handleLogin() {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			alert(error.message);
			return;
		}

		router.replace("/");
		router.refresh();
	}
	return (
		<main className="flex min-h-screen items-center justify-center p-6">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Breve</CardTitle>
				</CardHeader>

				<CardContent>
					<Tabs defaultValue="login">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="login">Login</TabsTrigger>

							<TabsTrigger value="signup">Sign Up</TabsTrigger>
						</TabsList>

						<TabsContent value="login" className="space-y-4 mt-4">
							<div className="space-y-2">
								<Label>Email</Label>

								<Input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<Label>Password</Label>

								<Input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<Button className="w-full" onClick={handleLogin}>
								Login
							</Button>
						</TabsContent>

						<TabsContent value="signup" className="space-y-4 mt-4">
							<div className="space-y-2">
								<Label>Email</Label>

								<Input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<Label>Password</Label>

								<Input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<Button className="w-full" onClick={handleSignUp}>
								Create Account
							</Button>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</main>
	);
}
