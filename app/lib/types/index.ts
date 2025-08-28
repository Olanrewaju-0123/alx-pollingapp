export type PollOption = {
  text: string;
  votes: number;
};

export type Poll = {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  createdAt: string;
  expiresAt?: string | null;
  shareUrl?: string | null;
};

export type Vote = {
  id: string;
  pollId: string;
  optionIndex: number;
  voterId?: string | null;
  votedAt: string;
};
