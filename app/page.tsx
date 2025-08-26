import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Welcome to ALX Polly</h1>
      <div className="flex gap-4">
        <Link href="/dashboard/polls">
          <button className="bg-black text-white px-4 py-2 rounded">
            My Polls
          </button>
        </Link>
        <Link href="/dashboard/create">
          <button className="bg-black text-white px-4 py-2 rounded">
            Create Poll
          </button>
        </Link>
      </div>
    </main>
  );
}
// ...existing code...
