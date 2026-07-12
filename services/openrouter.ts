import { countWords, estimateTokens } from "@/lib/utils";
import type { ModelResponse } from "@/types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const LLAMA_MODEL = process.env.OPENROUTER_LLAMA_MODEL || "meta-llama/llama-3.1-70b-instruct";

const LLAMA_INSTRUCTION = "Provide concise reasoning. Be precise and avoid padding.";

export async function generateLlamaResponse(
  prompt: string
): Promise<ModelResponse> {
  const start = performance.now();
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }

    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Self-Consistency AI",
      },
      body: JSON.stringify({
        model: LLAMA_MODEL,
        messages: [
          { role: "system", content: LLAMA_INSTRUCTION },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`OpenRouter error ${res.status}: ${errBody.slice(0, 300)}`);
    }

    const data = await res.json();
    const content: string = data.choices?.[0]?.message?.content?.trim() || "";
    const responseTimeMs = performance.now() - start;

    return {
      provider: "llama",
      label: "Llama",
      content,
      success: true,
      responseTimeMs,
      wordCount: countWords(content),
      estimatedTokens: estimateTokens(content),
    };
  } catch (err) {
    return {
      provider: "llama",
      label: "Llama",
      content: "",
      success: false,
      error: err instanceof Error ? err.message : "Unknown OpenRouter error",
      responseTimeMs: performance.now() - start,
      wordCount: 0,
      estimatedTokens: 0,
    };
  }
}
