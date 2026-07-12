"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, TriangleAlert } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/dashboard/prompt-form";
import { LoadingProgress } from "@/components/dashboard/loading-progress";
import { ModelResponseCard } from "@/components/dashboard/model-response-card";
import { FinalAnswerCard } from "@/components/dashboard/final-answer-card";
import { toast } from "@/hooks/use-toast";
import type { FinalResponse } from "@/types";

const HISTORY_KEY = "self-consistency-history";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<FinalResponse | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleGenerate(prompt: string) {
    setIsLoading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed with status ${res.status}`);
      }

      const data: FinalResponse = await res.json();
      setResult(data);
      saveToHistory(data);

      if (!data.evaluation.success) {
        toast({
          title: "Synthesis incomplete",
          description: data.evaluation.error,
          variant: "destructive",
        });
      } else {
        toast({ title: "Answer generated" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(message);
      toast({ title: "Generation failed", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  function saveToHistory(data: FinalResponse) {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const history = raw ? JSON.parse(raw) : [];
      history.unshift({
        id: crypto.randomUUID(),
        question: data.question,
        finalAnswer: data.evaluation.finalAnswer,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
    } catch {
      // localStorage may be unavailable (private browsing) — fail silently
    }
  }

  function exportMarkdown() {
    if (!result) return;
    const md = `# ${result.question}\n\n## Final Synthesized Answer\n\n${result.evaluation.finalAnswer}\n\n---\n\n### OpenAI\n${result.openai.content}\n\n### Gemini\n${result.gemini.content}\n\n### Llama\n${result.llama.content}\n`;
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "self-consistency-answer.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Navbar />
      <main className="container pb-28 pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-semibold md:text-4xl">
            Ask your question
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Your prompt is sent to OpenAI, Gemini, and Llama at the same time.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-14"
            >
              <LoadingProgress />
            </motion.div>
          )}

          {!isLoading && errorMessage && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-10 flex max-w-md items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-300"
            >
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">Something went wrong</p>
                <p className="mt-1 text-red-300/80">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {!isLoading && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-14"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Results</h2>
                <Button variant="outline" size="sm" onClick={exportMarkdown}>
                  <Download className="h-4 w-4" /> Export Markdown
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <ModelResponseCard response={result.openai} />
                <ModelResponseCard response={result.gemini} />
                <ModelResponseCard response={result.llama} />
              </div>

              <div className="mt-6">
                <FinalAnswerCard evaluation={result.evaluation} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
