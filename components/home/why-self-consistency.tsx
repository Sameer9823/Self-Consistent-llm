"use client";

import { motion } from "framer-motion";
import { Eye, Gauge, ShieldCheck, Sparkle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const benefits = [
  {
    icon: Gauge,
    title: "Better accuracy",
    description: "Cross-checking three answers surfaces mistakes a single model would miss.",
  },
  {
    icon: ShieldCheck,
    title: "Reduced hallucination",
    description: "The evaluator actively strips out claims that don't hold up across responses.",
  },
  {
    icon: Eye,
    title: "Multiple perspectives",
    description: "Each model brings its own training and reasoning style to the question.",
  },
  {
    icon: Sparkle,
    title: "Higher reliability",
    description: "One synthesized answer beats betting on whichever model you happened to pick.",
  },
];

export function WhySelfConsistency() {
  return (
    <section className="container mt-28">
      <div className="mb-12 text-center">
        <span className="eyebrow text-synth">Why it matters</span>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Why Self-Consistency
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Card className="h-full text-center">
              <CardHeader className="items-center">
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-synth/10">
                  <b.icon className="h-5 w-5 text-synth" />
                </div>
                <CardTitle className="text-base">{b.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription>{b.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
