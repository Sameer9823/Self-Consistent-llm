export type ModelProvider = "openai" | "gemini" | "llama";

export interface ModelResponse {
  provider: ModelProvider;
  label: string;
  content: string;
  success: boolean;
  error?: string;
  responseTimeMs: number;
  wordCount: number;
  estimatedTokens: number;
}

export interface EvaluationResult {
  finalAnswer: string;
  success: boolean;
  error?: string;
  responseTimeMs: number;
  wordCount: number;
  estimatedTokens: number;
}

export interface FinalResponse {
  question: string;
  openai: ModelResponse;
  gemini: ModelResponse;
  llama: ModelResponse;
  evaluation: EvaluationResult;
  totalTimeMs: number;
}

export interface GenerateRequestBody {
  prompt: string;
}

export interface HistoryItem {
  id: string;
  question: string;
  finalAnswer: string;
  createdAt: string;
}
