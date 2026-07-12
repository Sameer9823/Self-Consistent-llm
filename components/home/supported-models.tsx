"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const models = [
  {
    name: "OpenAI",
    tag: "openai" as const,
    role: "Generator + Evaluator",
    description: "Answers accurately and clearly, then compares and synthesizes all three responses.",
  },
  {
    name: "Gemini",
    tag: "gemini" as const,
    role: "Generator",
    description: "Provides detailed explanations with examples for depth and context.",
  },
  {
    name: "Llama",
    tag: "llama" as const,
    role: "Generator via OpenRouter",
    description: "Offers concise, efficient reasoning as a third independent perspective.",
  },
];

export function SupportedModels() {
  return (
    <section className="container mt-28">
      <div className="mb-12 text-center">
        <span className="eyebrow text-synth">Under the hood</span>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Supported models
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {models.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="h-full">
              <CardHeader>
                <Badge variant={m.tag}>{m.name}</Badge>
                <CardTitle className="mt-3">{m.role}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{m.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
