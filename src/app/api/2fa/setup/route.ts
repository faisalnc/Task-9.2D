// src/app/api/2fa/setup/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { uid, email, twoFactorEnabled } = await req.json();
    if (!uid || !email) {
      return NextResponse.json(
        { error: "uid and email required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");
    const users2FA = db.collection("users2FA");

    await users2FA.updateOne(
      { uid },
      {
        $set: {
          uid,
          email,
          twoFactorEnabled: !!twoFactorEnabled, // use value from request
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "2FA status updated" });
  } catch (err) {
    console.error("2FA setup error:", err);
    return NextResponse.json(
      { error: "Failed to update 2FA record" },
      { status: 500 }
    );
  }
}
