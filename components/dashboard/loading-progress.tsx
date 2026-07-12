"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  "Sending prompt...",
  "Waiting for OpenAI...",
  "Waiting for Gemini...",
  "Waiting for Llama...",
  "Comparing responses...",
  "Synthesizing final answer...",
];

export function LoadingProgress() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass mx-auto max-w-md rounded-2xl p-6">
      <ul className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "flex items-center gap-3 text-sm",
                done && "text-ink-muted",
                current && "text-inherit",
                !done && !current && "text-ink-muted/50"
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink-line">
                {done ? (
                  <Check className="h-3 w-3 text-openai" />
                ) : current ? (
                  <Loader2 className="h-3 w-3 animate-spin text-synth" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-line" />
                )}
              </span>
              {step}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
