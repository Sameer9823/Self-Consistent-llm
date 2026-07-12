"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Enter your prompt",
    description: "Type a question once. No need to pick a model up front.",
  },
  {
    title: "Three models answer in parallel",
    description: "OpenAI, Gemini, and Llama each generate an independent response.",
  },
  {
    title: "OpenAI evaluates all three",
    description: "The evaluator compares accuracy, clarity, and completeness.",
  },
  {
    title: "Get one synthesized answer",
    description: "Hallucinations are stripped out; the strongest ideas are merged.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container mt-28">
      <div className="mb-12 text-center">
        <span className="eyebrow text-synth">The workflow</span>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          How it works
        </h2>
      </div>

      <div className="relative mx-auto max-w-2xl">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-ink-line md:left-1/2" />
        <div className="flex flex-col gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="relative flex gap-5 md:justify-center"
            >
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-synth/40 bg-ink-panel font-mono text-xs text-synth md:absolute md:left-1/2 md:-translate-x-1/2">
                {i + 1}
              </div>
              <div className="md:w-[calc(50%-2.5rem)] md:pl-0 md:pr-8 md:text-right md:even:ml-auto md:even:pl-8 md:even:pr-0 md:even:text-left">
                <h3 className="font-display text-lg font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
