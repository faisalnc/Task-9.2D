import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import clientPromise from "@/lib/mongodb";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("devatdeakin");
    const subscribers = db.collection("subscribers");

    const existing = await subscribers.findOne({ email });

    if (existing) {
      // Send a friendly "already subscribed" email
      const msg = {
        to: email,
        from: "faisal.e924@gmail.com", // must be verified in SendGrid
        subject: "You're already subscribed to Dev@Deakin!",
        text: "Looks like you're already part of the Dev@Deakin community. Thanks for staying with us!",
        html: "<strong>Looks like you're already part of the Dev@Deakin community. Thanks for staying with us!</strong>",
      };

      await sgMail.send(msg);

      return NextResponse.json({
        message: "Already subscribed. Sent friendly reminder email.",
      });
    }

    // Insert new subscriber
    await subscribers.insertOne({
      email,
      createdAt: new Date(),
    });

    // Send welcome email
    const msg = {
      to: email,
      from: "faisal.e924@gmail.com",
      subject: "Welcome to Dev@Deakin!",
      text: "Thanks for subscribing to Dev@Deakin. We're excited to have you on board!",
      html: "<strong>Thanks for subscribing to Dev@Deakin. We're excited to have you on board!</strong>",
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "Subscribed and email sent!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
