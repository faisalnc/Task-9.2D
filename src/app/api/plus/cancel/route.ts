import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");

    await db.collection("plusSubscriptions").updateOne(
      { userId },
      { $set: { active: false, cancelledAt: new Date() } }
    );

    return NextResponse.json({ message: "Plus subscription cancelled" }, { status: 200 });
  } catch (err) {
    console.error("❌ Cancel Plus error", err);
    return NextResponse.json({ error: "Cancel failed" }, { status: 500 });
  }
}
