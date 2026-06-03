import UrlForm from "@/components/UrlForm";

export default function Home() {
    return (
    <main className="min-h-screen flex items-center justify-center">
        <div className = "w-full max-w-xl p-4">
            <h1 className = "text-5xl font-bold text-center mb-8">
                Breve
            </h1>
            <UrlForm />
        </div>
    </main>
    );
}