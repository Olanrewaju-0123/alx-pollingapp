import CreatePollForm from "./CreatePollForm";

export default function CreatePollPage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Create a New Poll</h2>
      <CreatePollForm />
    </div>
  );
}
