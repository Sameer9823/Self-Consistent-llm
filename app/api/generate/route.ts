import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { runSelfConsistency } from "@/services/orchestrator";
import type { GenerateRequestBody } from "@/types";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: GenerateRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = body.prompt?.trim();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  if (prompt.length > 6000) {
    return NextResponse.json(
      { error: "Prompt is too long (max 6000 characters)" },
      { status: 400 }
    );
  }

  try {
    const result = await runSelfConsistency(prompt);
    return NextResponse.json(result);
  } catch (err) {
    console.error("generate route error", err);
    return NextResponse.json(
      { error: "Internal server error while generating the response" },
      { status: 500 }
    );
  }
}
