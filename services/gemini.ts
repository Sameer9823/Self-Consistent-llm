import { GoogleGenerativeAI } from "@google/generative-ai";
import { countWords, estimateTokens } from "@/lib/utils";
import type { ModelResponse } from "@/types";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-pro";

const GEMINI_INSTRUCTION =
  "Provide a detailed explanation with examples. Be thorough but well organized.";

export async function generateGeminiResponse(
  prompt: string
): Promise<ModelResponse> {
  const start = performance.now();
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent(
      `${GEMINI_INSTRUCTION}\n\nQuestion: ${prompt}`
    );

    const content = result.response.text().trim();
    const responseTimeMs = performance.now() - start;

    return {
      provider: "gemini",
      label: "Gemini",
      content,
      success: true,
      responseTimeMs,
      wordCount: countWords(content),
      estimatedTokens: estimateTokens(content),
    };
  } catch (err) {
    return {
      provider: "gemini",
      label: "Gemini",
      content: "",
      success: false,
      error: err instanceof Error ? err.message : "Unknown Gemini error",
      responseTimeMs: performance.now() - start,
      wordCount: 0,
      estimatedTokens: 0,
    };
  }
}
