"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Clock, Hash, TriangleAlert, Type } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/copy-button";
import { Markdown } from "@/components/shared/markdown";
import { cn, formatMs } from "@/lib/utils";
import type { ModelResponse } from "@/types";

const badgeVariantFor = {
  openai: "openai",
  gemini: "gemini",
  llama: "llama",
} as const;

export function ModelResponseCard({ response }: { response: ModelResponse }) {
  const [open, setOpen] = React.useState(true);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <Badge variant={badgeVariantFor[response.provider]}>{response.label}</Badge>
        <div className="flex items-center gap-1">
          <CopyButton text={response.content} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-ink-muted hover:bg-white/5"
            aria-label={open ? "Collapse response" : "Expand response"}
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
            />
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        {!response.success ? (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{response.error || "This provider failed to respond."}</span>
          </div>
        ) : (
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="max-h-80 overflow-y-auto pr-2 scroll-smooth">
              <Markdown content={response.content} />
            </div>
          </motion.div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-ink-line pt-3 font-mono text-[0.7rem] text-ink-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {formatMs(response.responseTimeMs)}
          </span>
          <span className="flex items-center gap-1">
            <Type className="h-3 w-3" /> {response.wordCount} words
          </span>
          <span className="flex items-center gap-1">
            <Hash className="h-3 w-3" /> ~{response.estimatedTokens} tokens
          </span>
        </div>
      </CardContent>
    </Card>
  );
}