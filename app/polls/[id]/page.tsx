import Link from "next/link";
import { fetchPollById, submitVote } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";

export default async function PollDetail({
  params,
}: {
  params: { id: string };
}) {
  const poll = await fetchPollById(params.id);
  if (!poll)
    return <div className="max-w-3xl mx-auto mt-10">Poll not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{poll.question}</h1>
        <Link href={`/polls/${poll.id}/results`} className="underline">
          Results
        </Link>
      </div>
      <form action={submitVote} className="space-y-3">
        <input type="hidden" name="pollId" value={poll.id} />
        {poll.options.map((opt, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 border rounded p-3"
          >
            <input type="radio" name="optionIndex" value={idx} required />
            <span>{opt.text}</span>
          </label>
        ))}
        <input type="hidden" name="voterId" value="anonymous" />
        <Button type="submit">Submit Vote</Button>
      </form>
      <div>
        <Link href={poll.shareUrl || `/polls/${poll.id}`} className="underline">
          Share Link
        </Link>
      </div>
    </div>
  );
}
