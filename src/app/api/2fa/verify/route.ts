// src/app/api/2fa/verify/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { uid, code } = await req.json();

    const client = await clientPromise;
    const db = client.db("devatdeakin");
    const codes = db.collection("twoFactorCodes");

    const record = await codes.findOne({ uid });

    if (record && record.code === code) {
      await codes.deleteOne({ uid }); // cleanup
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid/expired code" });
  } catch {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
