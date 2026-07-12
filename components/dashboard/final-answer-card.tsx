"use client";

import { motion } from "framer-motion";
import { Clock, Hash, Sparkles, TriangleAlert, Type } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/copy-button";
import { Markdown } from "@/components/shared/markdown";
import { formatMs } from "@/lib/utils";
import type { EvaluationResult } from "@/types";

export function FinalAnswerCard({ evaluation }: { evaluation: EvaluationResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden border-synth/50 bg-gradient-to-b from-synth/[0.08] to-transparent shadow-[0_0_40px_-12px_rgba(201,168,255,0.35)]">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-synth" />
            <Badge variant="synth">Synthesized</Badge>
          </div>
          <CopyButton text={evaluation.finalAnswer} />
        </CardHeader>
        <CardContent>
          {!evaluation.success ? (
            <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{evaluation.error || "The evaluator could not produce a final answer."}</span>
            </div>
          ) : (
            <Markdown content={evaluation.finalAnswer} />
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-ink-line pt-3 font-mono text-[0.7rem] text-ink-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {formatMs(evaluation.responseTimeMs)}
            </span>
            <span className="flex items-center gap-1">
              <Type className="h-3 w-3" /> {evaluation.wordCount} words
            </span>
            <span className="flex items-center gap-1">
              <Hash className="h-3 w-3" /> ~{evaluation.estimatedTokens} tokens
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
