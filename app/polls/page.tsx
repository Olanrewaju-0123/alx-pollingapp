import Link from "next/link";
import { fetchPolls } from "../lib/actions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default async function PollsPage() {
  const polls = await fetchPolls();
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">All Polls</h2>
        <Link href="/polls/create" className="underline">
          Create poll
        </Link>
      </div>
      {polls.length === 0 && (
        <Card>
          <CardContent className="py-6">No polls yet.</CardContent>
        </Card>
      )}
      {polls.map((p) => (
        <Card key={p.id}>
          <CardHeader>
            <Link
              href={`/polls/${p.id}`}
              className="text-lg font-semibold underline"
            >
              {p.question}
            </Link>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Options: {p.options.length}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
