import { Card, CardHeader, CardContent } from "../components/ui/card";

export default function CreatePollPage() {
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <h2 className="text-xl font-bold">Create a New Poll</h2>
      </CardHeader>
      <CardContent>
        {/* TODO: Add poll creation form here */}
        <p>Poll creation form will go here.</p>
      </CardContent>
    </Card>
  );
}
