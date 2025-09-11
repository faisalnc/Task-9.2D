// src/app/api/questions/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, tags, imageUrl, userId } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");

    const newQuestion = {
      title,
      description,
      tags: tags || [],
      imageUrl: imageUrl || null,
      userId, // ✅ FIXED: store as plain string
      createdAt: new Date(),
    };

    const result = await db.collection("questions").insertOne(newQuestion);

    return NextResponse.json(
      { message: "Question saved", id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Mongo insert error", err);
    return NextResponse.json(
      { message: "Failed to save question" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("devatdeakin");
    const questions = await db.collection("questions").find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json({ message: "Failed to fetch questions" }, { status: 500 });
  }
}
