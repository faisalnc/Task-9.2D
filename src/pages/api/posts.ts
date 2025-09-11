// pages/api/posts.ts
import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const client = await clientPromise;
    const db = client.db("devatdeakin");
    const collection = db.collection("posts");

    const { title, body, tags, imageBase64, userId } = req.body;

    const result = await collection.insertOne({
      title,
      body,
      tags,
      imageBase64,
      userId,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Post created", id: result.insertedId });
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
}
