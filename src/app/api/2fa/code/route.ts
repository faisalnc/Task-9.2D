// src/app/api/2fa/code/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { uid, email, code }: { uid: string; email: string; code: string } =
      await req.json();

    if (!uid || !email || !code) {
      return NextResponse.json(
        { error: "uid, email, and code are required" },
        { status: 400 }
      );
    }

    // Save code temporarily in Mongo
    const client = await clientPromise;
    const db = client.db("devatdeakin");
    const codes = db.collection("twoFactorCodes");

    await codes.updateOne(
      { uid },
      { $set: { code, createdAt: new Date() } },
      { upsert: true }
    );

    // ---  Decide recipient based on environment ---
    const isDev = process.env.NODE_ENV !== "production";
    const recipient = isDev ? "faisal.e924@gmail.com" : email;

    // Send via Resend
    const { error } = await resend.emails.send({
      from: "DEV@Deakin <onboarding@resend.dev>", // can replace once domain verified
      to: recipient,
      subject: "Your DEV@Deakin 2FA Code",
      html: `<h2>${code}</h2><p>This code will expire in 5 minutes.</p>
             <p><em>Sent to: ${recipient}</em></p>`,
    });

    if (error) {
      console.error("Resend failed:", error);
      return NextResponse.json({ error: "Resend failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Code sent" });
  } catch (err) {
    console.error("Unexpected 2FA send error:", err);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}
