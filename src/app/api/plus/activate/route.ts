//src/app/api/plus/activate/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Missing userId" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");

    // Upsert so if they already had a sub, it just refreshes
    await db.collection("plusSubscriptions").updateOne(
      { userId },
      { $set: { plan: "plus", active: true, createdAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ message: "Plus activated!" }, { status: 200 });
  } catch (err) {
    console.error("❌ Activate failed", err);
    return NextResponse.json(
      { message: "Activation failed" },
      { status: 500 }
    );
  }
}
