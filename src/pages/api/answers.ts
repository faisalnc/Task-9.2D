// src/pages/api/answers.ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { questionId, answer } = req.body;
    if (!questionId || !answer) {
      return res.status(400).json({ message: "Missing questionId or answer" });
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");

    const result = await db.collection("questions").updateOne(
      { _id: new ObjectId(questionId) },
      { $push: { answers: answer } }
    );

    res.status(200).json({ message: "Answer added", result });
  } catch (err) {
    console.error("Error saving answer:", err);
    res.status(500).json({ message: "Server error" });
  }
}
