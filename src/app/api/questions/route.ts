// src/app/api/questions/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const runtime = "nodejs"; // ✅ Netlify compatible

// ========== POST ==========
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
      userId,
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

// ========== GET ==========
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("devatdeakin");

    const questions = await db
      .collection("questions")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

// ========== DELETE ==========
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");

    const result = await db
      .collection("questions")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Question deleted" }, { status: 200 });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
