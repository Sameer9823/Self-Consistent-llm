"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />

      <div className="container relative flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-6 rounded-full border border-ink-line px-4 py-1.5 text-ink-muted"
        >
          Self-Consistency Prompting · Multi-LLM Orchestration
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl"
        >
          Generate better AI answers by{" "}
          <span className="text-synth">converging</span> multiple minds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-xl text-balance text-ink-muted md:text-lg"
        >
          Ask once. Compare OpenAI, Gemini, and Llama. Let an AI evaluator
          synthesize the strongest, most accurate answer using
          Self-Consistency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/dashboard">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#how-it-works">
              <PlayCircle className="h-4 w-4" /> View Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-16 w-full max-w-3xl"
        >
          <ConvergenceDiagram />
        </motion.div>
      </div>
    </section>
  );
}

function ConvergenceDiagram() {
  const nodes = [
    { label: "OpenAI", x: 90, color: "#2FBF8F" },
    { label: "Gemini", x: 260, color: "#5B8DF6" },
    { label: "Llama", x: 430, color: "#F0B429" },
  ];
  const targetX = 260;
  const targetY = 210;

  return (
    <svg
      viewBox="0 0 520 260"
      className="mx-auto w-full max-w-2xl"
      role="img"
      aria-label="Diagram showing OpenAI, Gemini, and Llama responses flowing into a single synthesized answer"
    >
      <rect x="20" y="16" width="130" height="42" rx="10" className="fill-ink-panel stroke-openai/40" strokeWidth="1" />
      <rect x="195" y="16" width="130" height="42" rx="10" className="fill-ink-panel stroke-gemini/40" strokeWidth="1" />
      <rect x="365" y="16" width="130" height="42" rx="10" className="fill-ink-panel stroke-llama/40" strokeWidth="1" />

      {nodes.map((n, i) => (
        <text
          key={n.label}
          x={n.x}
          y={42}
          textAnchor="middle"
          className="font-mono text-[13px] uppercase tracking-wider"
          fill={n.color}
        >
          {n.label}
        </text>
      ))}

      {nodes.map((n) => (
        <path
          key={n.label + "-line"}
          d={`M ${n.x} 58 C ${n.x} 120, ${targetX} 120, ${targetX} ${targetY - 40}`}
          fill="none"
          stroke={n.color}
          strokeWidth="1.5"
          className="thread animate-flow-line"
          opacity={0.55}
        />
      ))}

      <circle cx={targetX} cy={targetY} r="4" fill="#C9A8FF" className="animate-pulse-dot" />
      <rect
        x={targetX - 95}
        y={targetY - 18}
        width="190"
        height="46"
        rx="12"
        className="fill-ink-panel stroke-synth/60"
        strokeWidth="1.5"
      />
      <text
        x={targetX}
        y={targetY + 10}
        textAnchor="middle"
        className="font-display text-[14px] font-semibold"
        fill="#C9A8FF"
      >
        Synthesized Answer
      </text>
    </svg>
  );
}
