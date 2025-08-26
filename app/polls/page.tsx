import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function PollsPage() {
  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <h2 className="text-xl font-bold">View Polls</h2>
      </CardHeader>
      <CardContent>
        {/* TODO: List polls here */}
        <p>Polls list will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
