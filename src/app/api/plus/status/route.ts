//src/app/api/plus/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ hasPlus: false }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");

    const subscription = await db.collection("plusSubscriptions").findOne({
      userId,
      active: true,
    });

    return NextResponse.json({ hasPlus: !!subscription }, { status: 200 });
  } catch (err) {
    console.error("❌ Status check failed", err);
    return NextResponse.json({ hasPlus: false }, { status: 500 });
  }
}
