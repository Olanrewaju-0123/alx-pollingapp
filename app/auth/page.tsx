import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <h2 className="text-xl font-bold">User Authentication</h2>
      </CardHeader>
      <CardContent>
        {/* TODO: Add authentication form here */}
        <p>Authentication form will go here.</p>
      </CardContent>
    </Card>
  );
}
