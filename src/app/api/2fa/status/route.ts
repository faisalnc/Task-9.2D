// src/app/api/2fa/status/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    const client = await clientPromise;
    const db = client.db("devatdeakin");
    const users2FA = db.collection("users2FA");

    const record = await users2FA.findOne({ uid });
    return NextResponse.json({ twoFactorEnabled: record?.twoFactorEnabled || false });
  } catch {
    return NextResponse.json({ error: "Failed to fetch 2FA" }, { status: 500 });
  }
}
