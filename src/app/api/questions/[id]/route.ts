//src/app/api/questions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("devatdeakin");

    await db.collection("questions").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: "Question deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
