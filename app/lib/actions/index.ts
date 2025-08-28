"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { type Poll } from "../types";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceKey = process.env.SUPABASE_SECRET_KEY as string;
  if (!url || !serviceKey) {
    throw new Error("Supabase env vars are missing");
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function createPoll(formData: FormData) {
  const supabase = getSupabaseAdmin();
  const question = String(formData.get("question") || "").trim();
  const options = String(formData.get("options") || "");
  const createdBy = String(formData.get("createdBy") || "anonymous");
  const expiresAt = String(formData.get("expiresAt") || "");

  if (!question) {
    return { error: "Question is required" };
  }
  const optionList = options
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((text) => ({ text, votes: 0 }));
  if (optionList.length < 2) {
    return { error: "Provide at least two options" };
  }

  try {
    const { data, error } = await supabase
      .from("polls")
      .insert({
        question,
        options: optionList,
        created_by: createdBy,
        expires_at: expiresAt || null,
      })
      .select("id")
      .single();

    if (error) throw error;

    const pollId = data.id as string;
    const shareUrl = `/polls/${pollId}`;
    await supabase
      .from("polls")
      .update({ share_url: shareUrl })
      .eq("id", pollId);

    revalidatePath("/polls");
    return { ok: true, id: pollId } as const;
  } catch (err: any) {
    return { error: err.message || "Failed to create poll" };
  }
}

export async function submitVote(formData: FormData) {
  const supabase = getSupabaseAdmin();
  const pollId = String(formData.get("pollId") || "");
  const optionIndex = Number(formData.get("optionIndex"));
  const voterId = String(formData.get("voterId") || "anonymous");

  if (!pollId || Number.isNaN(optionIndex)) {
    return { error: "Invalid vote" };
  }

  try {
    const { data: poll, error: fetchErr } = await supabase
      .from("polls")
      .select("id, options")
      .eq("id", pollId)
      .single();
    if (fetchErr) throw fetchErr;

    const options = poll.options as Array<{ text: string; votes: number }>;
    if (optionIndex < 0 || optionIndex >= options.length) {
      return { error: "Option out of range" };
    }
    options[optionIndex].votes += 1;

    const { error: updateErr } = await supabase
      .from("polls")
      .update({ options })
      .eq("id", pollId);
    if (updateErr) throw updateErr;

    await supabase.from("votes").insert({
      poll_id: pollId,
      option_index: optionIndex,
      voter_id: voterId,
    });

    revalidatePath(`/polls/${pollId}`);
    revalidatePath(`/polls/${pollId}/results`);
    return { ok: true } as const;
  } catch (err: any) {
    return { error: err.message || "Failed to submit vote" };
  }
}

export async function fetchPolls(): Promise<Poll[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("polls")
    .select(
      "id, question, options, created_by, created_at, expires_at, share_url"
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((p: any) => ({
    id: p.id,
    question: p.question,
    options: p.options,
    createdBy: p.created_by,
    createdAt: p.created_at,
    expiresAt: p.expires_at,
    shareUrl: p.share_url,
  }));
}

export async function fetchPollById(id: string): Promise<Poll | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("polls")
    .select(
      "id, question, options, created_by, created_at, expires_at, share_url"
    )
    .eq("id", id)
    .single();
  if (error) return null;
  return {
    id: data.id,
    question: data.question,
    options: data.options,
    createdBy: data.created_by,
    createdAt: data.created_at,
    expiresAt: data.expires_at,
    shareUrl: data.share_url,
  };
}
