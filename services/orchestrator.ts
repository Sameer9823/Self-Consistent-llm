import { evaluateResponses, generateOpenAIResponse } from "./openai";
import { generateGeminiResponse } from "./gemini";
import { generateLlamaResponse } from "./openrouter";
import type { FinalResponse, ModelResponse } from "@/types";

function settledToResponse(
  result: PromiseSettledResult<ModelResponse>,
  provider: ModelResponse["provider"],
  label: string
): ModelResponse {
  if (result.status === "fulfilled") {
    return result.value;
  }
  return {
    provider,
    label,
    content: "",
    success: false,
    error:
      result.reason instanceof Error
        ? result.reason.message
        : "Unexpected failure",
    responseTimeMs: 0,
    wordCount: 0,
    estimatedTokens: 0,
  };
}

/**
 * Runs the full Self-Consistency workflow:
 * 1. Calls OpenAI, Gemini, and Llama (via OpenRouter) in parallel.
 * 2. Waits for all to settle (a single provider failure does not block the others).
 * 3. Sends whatever succeeded to the OpenAI evaluator to synthesize one final answer.
 */
export async function runSelfConsistency(
  question: string
): Promise<FinalResponse> {
  const totalStart = performance.now();

  const [openaiResult, geminiResult, llamaResult] = await Promise.allSettled([
    generateOpenAIResponse(question),
    generateGeminiResponse(question),
    generateLlamaResponse(question),
  ]);

  const openai = settledToResponse(openaiResult, "openai", "OpenAI");
  const gemini = settledToResponse(geminiResult, "gemini", "Gemini");
  const llama = settledToResponse(llamaResult, "llama", "Llama");

  const successCount = [openai, gemini, llama].filter((r) => r.success).length;

  let evaluation;
  if (successCount === 0) {
    evaluation = {
      finalAnswer: "",
      success: false,
      error: "All model providers failed. Unable to synthesize a final answer.",
      responseTimeMs: 0,
      wordCount: 0,
      estimatedTokens: 0,
    };
  } else {
    evaluation = await evaluateResponses(
      question,
      openai.content,
      gemini.content,
      llama.content
    );
  }

  return {
    question,
    openai,
    gemini,
    llama,
    evaluation,
    totalTimeMs: performance.now() - totalStart,
  };
}
