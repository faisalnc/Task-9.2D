export type Tag = "frontend" | "backend" | "devops" | "uiux" | "other";

export interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string | null;
  userId: string;
  createdAt: string;
  answers?: string[]; // optional for now
}
