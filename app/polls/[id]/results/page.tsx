import { fetchPollById } from "@/app/lib/actions";
import { QRCodeSVG } from "qrcode.react";

export default async function PollResults({
  params,
}: {
  params: { id: string };
}) {
  const poll = await fetchPollById(params.id);
  if (!poll)
    return <div className="max-w-3xl mx-auto mt-10">Poll not found.</div>;

  const total = poll.options.reduce((sum, o) => sum + o.votes, 0) || 1;
  const shareUrl = poll.shareUrl || `/polls/${poll.id}`;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Results: {poll.question}</h1>
      <div className="space-y-2">
        {poll.options.map((opt, idx) => {
          const pct = Math.round((opt.votes / total) * 100);
          return (
            <div key={idx}>
              <div className="flex justify-between text-sm">
                <span>{opt.text}</span>
                <span>
                  {opt.votes} ({pct}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-black rounded"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-6">
        <div>
          <p className="text-sm mb-2">Share or scan to vote:</p>
          <a className="underline" href={shareUrl}>
            {shareUrl}
          </a>
        </div>
        <QRCodeSVG value={shareUrl} size={128} />
      </div>
    </div>
  );
}
