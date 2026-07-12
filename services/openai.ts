import OpenAI from "openai";
import { countWords, estimateTokens } from "@/lib/utils";
import type { EvaluationResult, ModelResponse } from "@/types";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

const GENERATOR_MODEL = process.env.OPENAI_GENERATOR_MODEL || "gpt-4o";
const EVALUATOR_MODEL = process.env.OPENAI_EVALUATOR_MODEL || "gpt-4o";

const GENERATOR_SYSTEM_PROMPT =
  "Answer accurately and clearly. Be direct, well-structured, and avoid unnecessary hedging.";

const EVALUATOR_SYSTEM_PROMPT = `You are an expert AI evaluator performing self-consistency synthesis.

You will be given a user question and three independent AI-generated responses.

Your job:
- Compare all three responses.
- Identify strengths and weaknesses in each.
- Remove hallucinations or factual mistakes wherever possible.
- Merge the strongest ideas, explanations, and details into a single response.
- Do not simply copy one model's answer.
- Do not mention which model said what, and do not mention that multiple models were used.
- Return ONLY the final synthesized answer, with no preamble like "Here is the final answer:".`;

export async function generateOpenAIResponse(
  prompt: string
): Promise<ModelResponse> {
  const start = performance.now();
  try {
    const openai = getClient();
    const completion = await openai.chat.completions.create({
      model: GENERATOR_MODEL,
      messages: [
        { role: "system", content: GENERATOR_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const content = completion.choices[0]?.message?.content?.trim() || "";
    const responseTimeMs = performance.now() - start;

    return {
      provider: "openai",
      label: "OpenAI",
      content,
      success: true,
      responseTimeMs,
      wordCount: countWords(content),
      estimatedTokens: estimateTokens(content),
    };
  } catch (err) {
    return {
      provider: "openai",
      label: "OpenAI",
      content: "",
      success: false,
      error: err instanceof Error ? err.message : "Unknown OpenAI error",
      responseTimeMs: performance.now() - start,
      wordCount: 0,
      estimatedTokens: 0,
    };
  }
}

export async function evaluateResponses(
  question: string,
  openaiText: string,
  geminiText: string,
  llamaText: string
): Promise<EvaluationResult> {
  const start = performance.now();
  try {
    const openai = getClient();

    const evaluatorPrompt = `User Question:
${question}

OpenAI Response:
${openaiText || "(no response - provider failed)"}

Gemini Response:
${geminiText || "(no response - provider failed)"}

Llama Response:
${llamaText || "(no response - provider failed)"}

Now compare these responses. Determine which answer is most accurate, which explanation is easiest to understand, and which contains the most useful details. Remove duplicated and incorrect information. Produce one refined, synthesized answer. Return only the final answer.`;

    const completion = await openai.chat.completions.create({
      model: EVALUATOR_MODEL,
      messages: [
        { role: "system", content: EVALUATOR_SYSTEM_PROMPT },
        { role: "user", content: evaluatorPrompt },
      ],
      temperature: 0.3,
    });

    const finalAnswer = completion.choices[0]?.message?.content?.trim() || "";
    const responseTimeMs = performance.now() - start;

    return {
      finalAnswer,
      success: true,
      responseTimeMs,
      wordCount: countWords(finalAnswer),
      estimatedTokens: estimateTokens(finalAnswer),
    };
  } catch (err) {
    return {
      finalAnswer: "",
      success: false,
      error: err instanceof Error ? err.message : "Unknown evaluator error",
      responseTimeMs: performance.now() - start,
      wordCount: 0,
      estimatedTokens: 0,
    };
  }
}
