import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";


export async function GET() {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: "Say Hello from Groq in one sentence.",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Groq connection failed",
      },
      { status: 500 }
    );
  }
}