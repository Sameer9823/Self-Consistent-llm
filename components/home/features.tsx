"use client";

import { motion } from "framer-motion";
import {
  Copy,
  FileText,
  Layers,
  Lock,
  ScanEye,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Layers,
    title: "Multiple AI Models",
    description: "OpenAI, Gemini, and Llama answer the same question independently.",
  },
  {
    icon: ScanEye,
    title: "Self-Consistency",
    description: "An evaluator model cross-checks answers and merges the strongest parts.",
  },
  {
    icon: Zap,
    title: "Fast Parallel Processing",
    description: "All three models are called simultaneously with Promise.allSettled.",
  },
  {
    icon: Sparkles,
    title: "OpenAI Evaluation",
    description: "A dedicated pass removes hallucinations and duplicated content.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Clerk-protected dashboard keeps your prompts and history private.",
  },
  {
    icon: Smartphone,
    title: "Responsive UI",
    description: "A clean experience across desktop, tablet, and mobile.",
  },
  {
    icon: FileText,
    title: "Markdown Support",
    description: "Responses render with full markdown and syntax highlighting.",
  },
  {
    icon: Copy,
    title: "Copy Responses",
    description: "Grab any individual response or the final answer in one click.",
  },
];

export function Features() {
  return (
    <section className="container mt-28">
      <div className="mb-12 text-center">
        <span className="eyebrow text-synth">What you get</span>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Built for accuracy, not guesswork
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full transition-colors hover:border-synth/40">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <f.icon className="h-5 w-5 text-synth" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription>{f.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
