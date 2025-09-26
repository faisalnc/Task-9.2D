export type Tag =
  | "frontend"
  | "backend"
  | "devops"
  | "uiux"
  | "mobile"
  | "database"
  | "security"
  | "testing"
  | "general"
  | "other";

export interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string | null;
  code?: string;          
  userId: string;
  createdAt: string;
  answers?: string[];     
}
