import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Define a type for the message objects
    type Message = { role: "user" | "assistant"; content: string };

    const userContent = (messages as Message[])
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    // Free tier supports gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userContent);
    const text = result.response.text();

    return NextResponse.json({ content: text });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Gemini API error:", err.message);
    } else {
      console.error("Gemini API error:", err);
    }
    return NextResponse.json({ error: "Gemini request failed" }, { status: 500 });
  }
}
