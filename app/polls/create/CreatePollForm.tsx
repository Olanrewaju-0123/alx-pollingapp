"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPoll } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .string()
    .transform((v) => v.trim())
    .refine((v) => v.split("\n").filter(Boolean).length >= 2, {
      message: "Provide at least two options (one per line)",
    }),
  expiresAt: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreatePollForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    const form = new FormData();
    form.set("question", values.question);
    form.set("options", values.options);
    if (values.expiresAt) form.set("expiresAt", values.expiresAt);
    form.set("createdBy", "anonymous");
    const res = await createPoll(form);
    if ("error" in res) {
      alert(res.error);
      return;
    }
    window.location.href = `/polls/${res.id}`;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Question</label>
        <Input
          placeholder="What should we do for lunch?"
          {...register("question")}
        />
        {errors.question && (
          <p className="text-red-600 text-sm mt-1">{errors.question.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Options (one per line)
        </label>
        <textarea
          className="w-full border rounded p-2"
          rows={6}
          placeholder={"Pizza\nBurgers\nSushi"}
          {...register("options")}
        />
        {errors.options && (
          <p className="text-red-600 text-sm mt-1">{errors.options.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Expires At (optional)
        </label>
        <Input type="datetime-local" {...register("expiresAt")} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Poll"}
      </Button>
    </form>
  );
}
