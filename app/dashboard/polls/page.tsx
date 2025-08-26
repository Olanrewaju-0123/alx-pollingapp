
import { Card, CardHeader, CardContent } from "../../components/ui.card";
import { Button } from "../../components/ui/button";

type PollSummary = {
  id: number;
  title: string;
  description: string;
  options: number;
  votes: number;
  created: string;
};

// In a real app, fetch polls from API or props
const polls: PollSummary[] = [
  {
    id: 1,
    title: "Favorite Programming Language",
    description: "What programming language do you prefer to use?",
    options: 5,
    votes: 42,
    created: "10/15/2023",
  },
  {
    id: 2,
    title: "Best Frontend Framework",
    description: "Which frontend framework do you think is the best?",
    options: 4,
    votes: 38,
    created: "10/10/2023",
  },
  {
    id: 3,
    title: "Preferred Database",
    description: "What database do you prefer to work with?",
    options: 5,
    votes: 27,
    created: "10/5/2023",
  },
];

function PollCard({ poll }: { poll: PollSummary }) {
  return (
    <a href={`/dashboard/polls/${poll.id}`} className="block">
      <Card className="shadow-md p-6 cursor-pointer transition hover:shadow-lg hover:border-blue-500">
        <CardHeader>
          <h3 className="text-lg font-semibold">{poll.title}</h3>
          <p className="text-gray-600">{poll.description}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{poll.options} options</p>
          <p className="text-sm text-gray-500">{poll.votes} total votes</p>
          <p className="text-xs text-gray-400 mt-2">Created on {poll.created}</p>
        </CardContent>
      </Card>
    </a>
  );
}

export default function PollsDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-8 py-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-black">ALX Polly</h1>
        <div className="flex items-center gap-4">
          <a href="/dashboard/create">
            <Button className="bg-black text-white">Create New Poll</Button>
          </a>
          <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center font-bold text-black">
            U
          </div>
        </div>
      </header>
      <nav className="flex justify-center gap-8 py-4 bg-white border-b">
        <a href="/dashboard/polls" className="font-bold text-black">
          My Polls
        </a>
        <a href="/dashboard/create" className="font-bold text-black">
          Create Poll
        </a>
      </nav>
      <main className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-8 text-black">My Polls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
        <footer className="mt-16 text-center text-gray-400 text-sm">
          © 2025 ALX Polly. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
