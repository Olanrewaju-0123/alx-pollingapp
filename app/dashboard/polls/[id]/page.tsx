import { Button } from "@/components/ui/button";
import React from "react";

type PollOption = {
  id: number;
  label: string;
};

type PollData = {
  id: number;
  title: string;
  description: string;
  options: PollOption[];
  createdBy: string;
  createdOn: string;
};

// In a real app, fetch poll data by id (SSR or client fetch)
const poll: PollData = {
  id: 1,
  title: "Favorite Programming Language",
  description: "What programming language do you prefer to use?",
  options: [
    { id: 1, label: "JavaScript" },
    { id: 2, label: "Python" },
    { id: 3, label: "Java" },
    { id: 4, label: "C#" },
    { id: 5, label: "Go" },
  ],
  createdBy: "John Doe",
  createdOn: "10/15/2023",
};

function PollInfo({ poll }: { poll: PollData }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <a
          href="/dashboard/polls"
          className="text-blue-600 text-sm hover:underline"
        >
          ← Back to Polls
        </a>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm px-4 py-2">
            Edit Poll
          </Button>
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 text-sm px-4 py-2"
          >
            Delete
          </Button>
        </div>
      </div>
      <h2 className="text-xl font-bold text-black mb-2">{poll.title}</h2>
      <p className="text-gray-600 mb-6">{poll.description}</p>
      <div className="space-y-3 mb-6">
        {poll.options.map((option) => (
          <div
            key={option.id}
            className="w-full px-4 py-3 border border-gray-200 rounded text-sm bg-white"
          >
            {option.label}
          </div>
        ))}
      </div>
      <Button className="bg-gray-600 text-white w-full mb-6 hover:bg-gray-700">
        Submit Vote
      </Button>
      <div className="flex justify-between text-xs text-gray-400">
        <span>Created by {poll.createdBy}</span>
        <span>Created on {poll.createdOn}</span>
      </div>
    </div>
  );
}

function SharePoll() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h3 className="font-bold mb-4 text-black text-lg">Share this poll</h3>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 text-sm">
          Copy Link
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 text-sm"
        >
          Share on Twitter
        </Button>
      </div>
    </div>
  );
}

export default function PollDetailPage() {
  // Placeholder for future vote logic
  // const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-black">ALX Polly</h1>
        <div className="flex items-center gap-4">
          <a
            href="/dashboard/create"
            className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
          >
            Create Poll
          </a>
          <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center font-bold text-black text-sm">
            U
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="flex justify-center gap-8 py-4 bg-white border-b">
        <a href="/dashboard/polls" className="font-bold text-black">
          My Polls
        </a>
        <a href="/dashboard/create" className="font-bold text-black">
          Create Poll
        </a>
      </nav>
      <main className="px-8 py-10">
        <div className="max-w-2xl mx-auto">
          <PollInfo poll={poll} />
          <SharePoll />
        </div>
      </main>
    </div>
  );
}
