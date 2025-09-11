// src/app/api/questions/[id]/route.ts

export const runtime = "nodejs"; // ✅ Force Node.js runtime for Netlify

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: NextRequest,
  contextPromise: Promise<{ params: { id: string } }>
) {
  try {
    // ✅ Await context before accessing params
    const context = await contextPromise;
    const id = context.params.id;

    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");

    await db.collection("questions").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Question deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
