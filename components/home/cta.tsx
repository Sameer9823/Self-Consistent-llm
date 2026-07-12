"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="container mt-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="glass relative overflow-hidden rounded-2xl px-8 py-16 text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
        <h2 className="relative font-display text-3xl font-semibold md:text-4xl">
          Ready to generate better AI answers?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-ink-muted">
          Sign in and ask your first question — three models, one synthesized answer.
        </p>
        <Button asChild size="lg" className="relative mt-8">
          <Link href="/dashboard">
            Start Now <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
